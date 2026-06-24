# StudyRise Security Audit Report

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

**Date:** 2026-06-10  
**Auditor:** Senior Security Engineer (via Claude Code)  
**Scope:** Full codebase, Supabase schema, API routes, environment variables, deployment config  
**Stack confirmed:** React 18 + Vite 5, Vercel serverless, Supabase (PostgreSQL + Auth + RLS), OpenAI proxy

---

## 1. Executive Summary

StudyRise has a solid foundation: the Supabase anon key is correctly separated from the service role key, all 12 core user-data tables have Row Level Security enabled with owner-only policies, the admin API verifies JWT tokens server-side before every action, and secrets are not committed to git.

However, four gaps need urgent attention before the app is safe for public users:

1. **Production source maps are publicly served**, handing attackers a complete, readable copy of your application source code.
2. **Two internal admin/audit tables (`admin_roles`, `audit_log`) have RLS disabled**, meaning any logged-in user can read all admin assignments and the full audit trail directly through Supabase's public endpoint.
3. **The API layer has no security headers** — no Content-Security-Policy, no HSTS, no clickjacking protection, no XSS mitigation.
4. **The `/api/ai-advisor` endpoint has no rate limiting**, so a malicious authenticated user can trigger unlimited OpenAI API calls at your expense.

Everything else ranges from medium to low risk and can be addressed over the following week.

---

## 2. Critical Findings

---

### CRITICAL-1 — Production source maps publicly served

- **Risk level:** Critical
- **Evidence:** `vite.config.js` line 15: `sourcemap: true` (unconditional)
- **Why this is dangerous:** Vite generates `.js.map` files alongside every JavaScript bundle. When `sourcemap: true` is set with no condition, these files are included in the Vercel build output and deployed to the CDN. Anyone who visits `https://studyrise.app/assets/index-xxxxx.js.map` gets a complete, human-readable copy of your source code — business logic, AI prompts, admin email hardcode, all internal comments, study algorithm, every file path. The Sentry plugin is only active when `SENTRY_AUTH_TOKEN` is set; without it the `.map` files are just served raw. Even with Sentry, `sourcemaps.deleteSourcemapsAfterUpload` must be explicitly set to `true` or the files remain on-disk and get deployed.
- **Exact fix:** Change line 15 of `vite.config.js`:
  ```js
  // BEFORE
  sourcemap: true,

  // AFTER
  sourcemap: process.env.NODE_ENV !== 'production',
  ```
  And in the `sentryVitePlugin` call, add `sourcemaps: { deleteSourcemapsAfterUpload: true }`.
- **Files affected:** `vite.config.js`

---

### CRITICAL-2 — `admin_roles` and `audit_log` tables have no RLS

- **Risk level:** Critical
- **Evidence:** `supabase/add_audit_log.sql` contains the comment: `-- No RLS needed — all access goes through service-role key via /api/admin`. Neither `ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY` nor `ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY` exists anywhere in the SQL files.
- **Why this is dangerous:** The Supabase anon key is intentionally public and is shipped in the frontend bundle. Any logged-in user can open the browser console and run:
  ```js
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
  const sb = createClient('YOUR_URL', 'YOUR_ANON_KEY');
  const { data } = await sb.from('audit_log').select('*');
  console.log(data); // ALL admin actions, actor emails, target user IDs
  ```
  This exposes: every admin action ever taken, the actor's email, every deleted user ID, every grant/revoke admin event. The `admin_roles` table similarly reveals which user IDs have admin access.
- **Exact fix:** Run this SQL in Supabase SQL Editor immediately:
  ```sql
  -- Protect admin_roles: only the server (service role) may access it
  ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
  -- No policies needed — service role bypasses RLS. Regular users get nothing.

  -- Protect audit_log: same pattern
  ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
  -- No policies needed — service role bypasses RLS.
  ```
  The `/api/admin` serverless functions use the service role key which bypasses RLS, so they continue to work. Authenticated frontend users can no longer query these tables.
- **Files affected:** `supabase/add_audit_log.sql` (add the ALTER statements), Supabase SQL Editor (run them live)

---

## 3. High-Risk Findings

---

### HIGH-1 — No security headers on any route

- **Risk level:** High
- **Evidence:** `vercel.json` only sets `Cache-Control` headers. No Content-Security-Policy, no Strict-Transport-Security, no X-Content-Type-Options, no X-Frame-Options, no Referrer-Policy, no Permissions-Policy.
- **Why this is dangerous:** Without a CSP, if any XSS vulnerability exists (injected user content, a compromised CDN package), the attacker can run arbitrary JavaScript in users' browsers and steal session tokens. Without HSTS, the first connection can be downgraded to HTTP. Without X-Frame-Options/frame-ancestors, the app can be iframed for clickjacking attacks.
- **Exact fix:** Add to `vercel.json` under `"headers"`:
  ```json
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options",   "value": "nosniff" },
      { "key": "X-Frame-Options",           "value": "DENY" },
      { "key": "Referrer-Policy",           "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy",        "value": "camera=(), microphone=(), geolocation=()" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      {
        "key": "Content-Security-Policy",
        "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.openai.com https://o4511530003857408.ingest.sentry.io; frame-ancestors 'none'"
      }
    ]
  }
  ```
  **Note:** Test this in a preview deployment first. `'unsafe-inline'` is included because Framer Motion and inline styles require it. Tighten as you go.
- **Files affected:** `vercel.json`

---

### HIGH-2 — No rate limiting on `/api/ai-advisor`

- **Risk level:** High
- **Evidence:** `api/ai-advisor.js` — no rate limiting, no per-user call counting, no spend cap check. The endpoint only validates that the caller has a valid JWT.
- **Why this is dangerous:** Any authenticated user can write a script to hit `/api/ai-advisor` in a loop, each call costing you real money via OpenAI. A single user could run up a $1,000+ OpenAI bill in minutes.
- **Exact fix (short term):** Add per-user rate limiting using Vercel's KV store or a simple Supabase table:
  ```js
  // At the top of handler, after verifyAuth:
  const rateLimitKey = `ai_rl_${user.id}_${new Date().toISOString().slice(0, 13)}`; // per hour
  const { data: rl } = await serviceClient.from('rate_limits')
    .select('count').eq('key', rateLimitKey).maybeSingle();
  const count = rl?.count || 0;
  if (count >= 10) return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
  await serviceClient.from('rate_limits')
    .upsert({ key: rateLimitKey, count: count + 1, expires_at: new Date(Date.now() + 3600000).toISOString() },
             { onConflict: 'key' });
  ```
  **Also:** Set a hard spend limit in your OpenAI dashboard (Settings → Billing → Usage limits).
- **Files affected:** `api/ai-advisor.js`

---

### HIGH-3 — `AIPlanChat.jsx` sends requests to `/api/ai-advisor` without auth token

- **Risk level:** High (broken security, not bypass)
- **Evidence:** `src/screens/Onboarding/AIPlanChat.jsx` lines ~90–105: `fetch('/api/ai-advisor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, ... })` — no Authorization header.
- **Why this is dangerous:** The `verifyAuth` function in `api/ai-advisor.js` requires a Bearer token and returns 401 without one. This means AI plan generation during onboarding is silently broken for all users (they hit 401). More critically, a future developer seeing the 401 might "fix" it by removing the auth check rather than adding the token — turning this into an unauthenticated OpenAI proxy.
- **Exact fix:** Import supabase and pass the session token:
  ```js
  import { supabase } from '../../lib/supabase'

  // Inside handleSend():
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await fetch('/api/ai-advisor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: controller.signal,
    body: JSON.stringify({ studyData: { ... } }),
  });
  ```
- **Files affected:** `src/screens/Onboarding/AIPlanChat.jsx`

---

## 4. Medium-Risk Findings

---

### MEDIUM-1 — Raw AI response returned to client in error path

- **Risk level:** Medium
- **Evidence:** `api/ai-advisor.js` lines 201 and 337:
  ```js
  return res.status(502).json({ error: 'Failed to parse AI response', raw: text.slice(0, 500) });
  ```
- **Why this is dangerous:** If OpenAI unexpectedly returns content containing a user's study data, an internal error message with PII, or a prompt injection attempt, the first 500 characters are sent directly to the browser. This is also a minor information-disclosure vector showing that the backend uses OpenAI internally.
- **Exact fix:** Remove the `raw` field:
  ```js
  return res.status(502).json({ error: 'Failed to parse AI response' });
  ```
  Log the raw text server-side if you need it for debugging.
- **Files affected:** `api/ai-advisor.js` (lines 201, 337)

---

### MEDIUM-2 — Debug console.log in production onboarding component

- **Risk level:** Medium
- **Evidence:** `src/screens/Onboarding/AIPlanChat.jsx` lines 79 and 117:
  ```js
  console.log('[AI Chat] Sending request:', { examDate, startDate, dailyHours, conversationLength: ... })
  console.log('[AI Chat] Response:', data)
  ```
- **Why this is dangerous:** Anyone using browser DevTools sees the full AI plan response object, exam dates, study schedule data, and API call metadata. The `console.log('[AI Chat] Response:', data)` dumps the full AI plan — including all task titles, subject list, and phase structure — into the browser console.
- **Exact fix:** Delete those two console.log lines. Keep `console.error` for genuine error cases but remove the success-path debug logs.
- **Files affected:** `src/screens/Onboarding/AIPlanChat.jsx`

---

### MEDIUM-3 — CORS whitelist includes external domain

- **Risk level:** Medium
- **Evidence:** `api/ai-advisor.js` and `api/admin.js` both allow:
  ```js
  'https://www.istiaqueahamed.com',
  'https://istiaqueahamed.com',
  ```
- **Why this is dangerous:** CORS allows `istiaqueahamed.com` to make credentialed cross-origin requests to your API. If that site is ever compromised (XSS on it, or if it shares a hosting account), an attacker can trigger calls to your StudyRise API on behalf of logged-in users.
- **Exact fix:** Remove those entries if `istiaqueahamed.com` is your personal site unrelated to StudyRise. If it IS a StudyRise subdomain or partner, keep it but ensure it is served over HTTPS only and never serves user-provided content without sanitization.
- **Files affected:** `api/ai-advisor.js`, `api/admin.js`

---

### MEDIUM-4 — No timeout on `handleAdvice` OpenAI fetch

- **Risk level:** Medium
- **Evidence:** `AIPlanChat.jsx` has a 45-second `AbortController` timeout. `handleAdvice()` in `api/ai-advisor.js` (lines 302–318) has **no timeout** on the OpenAI fetch call.
- **Why this is dangerous:** A Vercel serverless function has a 60-second max duration for the AI advisor route. If OpenAI is slow, the function hangs for the full 60 seconds, tying up resources and producing a poor user experience. Worse, it means the function keeps an open connection to OpenAI even if the user has navigated away.
- **Exact fix:**
  ```js
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    ...,
    signal: controller.signal,
  });
  clearTimeout(timeout);
  ```
- **Files affected:** `api/ai-advisor.js` (both `handleAdvice` and `handlePlanGeneration`)

---

### MEDIUM-5 — react-router open-redirect vulnerability

- **Risk level:** Medium
- **Evidence:** `npm audit` output: `react-router 6.7.0–6.30.3` — open redirect when a path starts with `//` (protocol-relative URL reinterpretation). CVE/Advisory: GHSA-2j2x-hqr9-3h42.
- **Why this is dangerous:** An attacker can craft a link like `https://studyrise.app//%2F%2Fevil.com/phishing` and the router may redirect users to an external site. Combined with a phishing email, this can steal credentials by sending users to a look-alike page.
- **Exact fix:** Run `npm audit fix` — it installs a patched react-router version. Test navigation after the upgrade.
- **Files affected:** `package.json`, `package-lock.json`

---

## 5. Low-Risk Findings

---

### LOW-1 — `admin_roles` write policy via `app_settings` uses inline email

- **Risk level:** Low
- **Evidence:** `supabase/app_settings_migration.sql`:
  ```sql
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'ias.ndc@gmail.com'))
  ```
- **Note:** The email is hardcoded in SQL. If you ever change your admin email or need to add another admin, you must run a manual SQL migration. Not an active security risk but a maintenance trap.
- **Recommendation:** After you've added RLS to `admin_roles`, use that table for the admin check instead of hardcoding the email in SQL.

---

### LOW-2 — No `.env.example` file

- **Risk level:** Low
- **Evidence:** Only `.env.local` exists; no template file for contributors.
- **Recommendation:** Create `.env.example` with placeholder values (no real keys) so developers know what variables to set.

---

### LOW-3 — vite/esbuild dev-server vulnerability

- **Risk level:** Low (development only)
- **Evidence:** `npm audit` — `esbuild <=0.24.2`, moderate severity, allows any website to read dev-server responses.
- **Note:** This only affects the local development server, not production builds. Your production users are not exposed. Fix with `npm audit fix --force` (installs Vite 8, a breaking change — test thoroughly).

---

### LOW-4 — `console.error` in browser console for production errors

- **Risk level:** Low
- **Evidence:** Multiple files (`AdminPanel.jsx`, `Today.jsx`, `SRModule.jsx`, `aiAdvisor.js`) use `console.error` with error objects that may contain Supabase error messages or stack traces.
- **Recommendation:** In production, route errors through Sentry (already configured) instead of printing them to the console. Wrap with: `if (import.meta.env.DEV) console.error(...)`.

---

## 6. Frontend DevTools Exposure Review

What is currently visible to anyone opening DevTools on studyrise.app:

| Item | Visible? | Risk | Action |
|------|----------|------|--------|
| `VITE_SUPABASE_URL` | Yes — in bundle | None (designed to be public) | Keep as-is |
| `VITE_SUPABASE_ANON_KEY` | Yes — in bundle | None (designed to be public) | Keep as-is |
| `VITE_SENTRY_DSN` | Yes — in bundle | None (DSNs are intentionally public) | Keep as-is |
| `OPENAI_API_KEY` | **No** — server-side only, not in bundle | — | Correct ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | **No** — server-side only | — | Correct ✓ |
| Full source code (`.map` files) | **Yes — critical** | Critical | Fix CRITICAL-1 |
| AI system prompts | Indirectly (in source maps) | Medium | Fix CRITICAL-1 |
| Admin email `ias.ndc@gmail.com` | Yes — in `adminApi.js` bundle | Low | Acceptable; not a secret |
| Business logic (plan generator, SR algorithm) | Indirectly (source maps) | Medium | Fix CRITICAL-1 |
| Console debug logs (AIPlanChat) | Yes | Medium | Fix MEDIUM-2 |

Once CRITICAL-1 is fixed and source maps are hidden, the DevTools exposure profile is acceptable for a production web app.

---

## 7. Supabase Security Review

### RLS Status — Table by Table

| Table | RLS Enabled | Policy | Status |
|-------|-------------|--------|--------|
| `user_settings` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `phases` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `subjects` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `tasks` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `schedule_templates` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `schedule_blocks` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `schedule_template_assignments` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `study_log` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `sr_records` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `question_logs` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `mock_exams` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `mock_exam_breakdown` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `mistake_logs` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `task_steps` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `topics` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `exam_import_logs` | ✅ Yes | `auth.uid() = user_id` (ALL) | ✅ Secure |
| `feature_flags` | ✅ Yes | read own + upsert own | ✅ Secure |
| `app_settings` | ✅ Yes | public read, admin write | ✅ Secure |
| **`admin_roles`** | ❌ **No RLS** | None | 🔴 **CRITICAL — Fix immediately** |
| **`audit_log`** | ❌ **No RLS** | None | 🔴 **CRITICAL — Fix immediately** |

### Storage Policies

The `avatars` bucket has user-scoped upload/update/delete policies plus public read. This is appropriate for avatar images. Ensure:
- The `avatars` bucket is set to **public** in Supabase Dashboard only for reads
- File size limits are enforced (currently 3 MB in code; verify this is also enforced in Supabase storage policy, not just client-side)

### Authentication Configuration

- ✅ Supabase Auth handles password hashing — correct
- ✅ Google OAuth implemented correctly
- ✅ Service role key only used server-side
- ⚠️ **Email confirmation is disabled** (per CLAUDE.md note). This means users can sign up with any email they don't own. For a medical study tracker, this is a medium risk — consider enabling email confirmation before or shortly after public launch.

### Service Role Key Safety

- ✅ `SUPABASE_SERVICE_ROLE_KEY` is only in `process.env` (server-side)  
- ✅ Not in any `VITE_` prefixed variable
- ✅ Not found in any `src/` file
- ✅ Not in git history

---

## 8. Environment Variable Review

| Variable | Found in | Frontend? | Safe? | Action |
|----------|----------|-----------|-------|--------|
| `VITE_SUPABASE_URL` | `.env.local` | Yes (VITE_ prefix) | ✅ Safe — designed to be public | None needed |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Yes (VITE_ prefix) | ✅ Safe — designed to be public | None needed |
| `VITE_SENTRY_DSN` | `.env.local` | Yes (VITE_ prefix) | ✅ Safe — DSNs are intentionally public | None needed |
| `OPENAI_API_KEY` | `.env.local` | **No** (no VITE_ prefix) | ✅ Safe — server-only | **Verify** same key is in Vercel env vars; rotate if ever exposed |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel env vars only | **No** | ✅ Safe | Rotate immediately if ever committed to git |
| `SENTRY_AUTH_TOKEN` | Vercel env vars only | **No** | ✅ Safe | Verify it is NOT set as VITE_SENTRY_AUTH_TOKEN anywhere |

**Key observation:** No secrets are exposed via `VITE_` prefix. The env var setup is correct. The `.env.local` file is in `.gitignore` (`*.local` pattern) and was **not** found in git history.

**Action required:** Create `.env.example` with placeholder values so future developers know what to set.

---

## 9. GitHub / Vercel Security Review

### GitHub

| Check | Status | Action |
|-------|--------|--------|
| `.env.local` in git history | ✅ Not committed | None |
| `.gitignore` covers `*.local` | ✅ Yes | None |
| Branch protection on `main` | Unknown | Enable: Settings → Branches → Add rule → require PR + status checks |
| Secret scanning | Unknown | Enable: Settings → Code security → Secret scanning |
| Push protection | Unknown | Enable alongside secret scanning |
| Dependabot | Unknown | Enable: Settings → Code security → Dependabot |
| 2FA on GitHub account | Unknown | Enable immediately if not done |

**If a secret is ever accidentally committed:**
1. Immediately rotate the key at the provider (OpenAI, Supabase)
2. Run `git filter-repo --path .env.local --invert-paths` to purge from history
3. Force-push all branches and ask collaborators to re-clone

### Vercel

| Check | Status | Action |
|-------|--------|--------|
| Environment variables set correctly | ✅ Based on app functioning | Verify in Vercel Dashboard → Settings → Environment Variables |
| Preview deployments accessible to public | Unknown | Add Vercel Authentication to preview deployments (Vercel Dashboard → Settings → Deployment Protection) |
| Production source maps deployed | 🔴 **Yes, currently** | Fix CRITICAL-1 |
| Security headers | 🔴 **Missing** | Fix HIGH-1 |
| Function timeouts set | ✅ `vercel.json` sets 60s/30s | Good |

---

## 10. Dependency Security Review

| Package | Version | Issue | Severity | Fix |
|---------|---------|-------|----------|-----|
| `react-router-dom` | ^6.30.1 | Open redirect via `//` path | **Moderate** | `npm audit fix` |
| `react-router` | 6.7.0–6.30.3 | Same as above | **Moderate** | `npm audit fix` |
| `vite` | ^5.4.19 | Dev server CORS via esbuild | **Moderate (dev only)** | `npm audit fix --force` (breaking, test first) |
| `esbuild` | ≤0.24.2 | Dev server only | **Moderate (dev only)** | Comes with vite fix above |

Run these commands:
```bash
# Safe fix (react-router only)
npm audit fix

# Check what changed
npm audit

# Breaking fix (vite upgrade — test in preview first)
npm audit fix --force
```

---

## 11. Overall Risk Score

**Score: 5 / 10** — Moderate risk, not suitable for public launch in current state

**What brings the score down:**
- Production source maps deployed (severe exposure of business logic)
- Two admin tables with no RLS (data leakage to any logged-in user)
- No security headers (missing baseline browser protections)
- No rate limiting on paid API (financial attack vector)

**What holds the score up:**
- All 18 user-data tables have correct RLS
- Service role key is properly isolated server-side
- Admin API verifies JWT before every action
- No secrets in git history
- Authentication properly delegated to Supabase
- Audit logging is implemented

With the four critical/high fixes applied, the score rises to approximately **8 / 10**.

---

## Phase 3: Security Hardening Plan

---

### Immediate Fixes — Today (≤ 2 hours)

#### Step 1 — Disable production source maps
**File:** `vite.config.js`
```js
build: {
  sourcemap: process.env.NODE_ENV !== 'production',
  // ...
}
```
And update the sentryVitePlugin call:
```js
sentryVitePlugin({
  org: 'o4511530003857408',
  project: 'studyrise-web',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  sourcemaps: { deleteSourcemapsAfterUpload: true },
})
```
**Test:** Deploy to Vercel preview → open DevTools → Network tab → click any `.js` file → confirm no "Source map detected" message and no `.map` URL.

#### Step 2 — Enable RLS on `admin_roles` and `audit_log`
Run in Supabase SQL Editor:
```sql
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
```
**Test:** Open browser console on studyrise.app while logged in as a non-admin user and run:
```js
const { supabase } = await import('/src/lib/supabase.js');
const { data, error } = await supabase.from('audit_log').select('*');
console.log(data, error); // data should be [] or null, error should mention RLS
```

#### Step 3 — Fix `AIPlanChat.jsx` auth token
Add the Authorization header (see HIGH-3 fix above).
**Test:** Go through onboarding → AI plan chat → confirm it no longer returns 401.

#### Step 4 — Remove raw AI response from error body
Remove the `raw:` field from lines 201 and 337 of `api/ai-advisor.js`.
**Test:** Verify the error still returns a useful message without leaking AI content.

#### Step 5 — Remove debug console.logs from AIPlanChat
Delete the two `console.log` lines in `AIPlanChat.jsx`.

---

### Short-Term Fixes — This Week (≤ 1 day of work)

#### Step 6 — Add security headers to vercel.json
Use the headers block from HIGH-1. Deploy to preview and test with [https://securityheaders.com](https://securityheaders.com).

#### Step 7 — Fix the react-router open-redirect vulnerability
```bash
npm audit fix
```
Test that all navigation still works correctly.

#### Step 8 — Add per-user rate limiting to `/api/ai-advisor`
Options (easiest first):
- **Option A:** Create a `rate_limits` Supabase table and check/increment per user per hour (see HIGH-2 code above)
- **Option B:** Use Vercel's built-in rate limiting if you're on a Pro plan

Also: **Set an OpenAI spending limit** in your OpenAI Dashboard → Settings → Billing → Usage limits. Set a hard monthly cap (e.g. $50).

#### Step 9 — Add fetch timeouts to `handleAdvice` and `handlePlanGeneration`
See MEDIUM-4 fix. Both functions should use `AbortController` with a 30-second timeout.

#### Step 10 — Remove/restrict personal domain from CORS whitelist
Remove `istiaqueahamed.com` entries from both API files unless actively needed.

#### Step 11 — Create `.env.example`
```bash
# .env.example — copy to .env.local and fill in real values
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SENTRY_DSN=https://xxx@o4511530003857408.ingest.sentry.io/xxx
OPENAI_API_KEY=sk-...
# Server-side only (Vercel env vars — never VITE_ prefix):
# SUPABASE_SERVICE_ROLE_KEY=
# SUPABASE_URL=
# SENTRY_AUTH_TOKEN=
```

---

### Medium-Term Fixes — Before Public Launch

#### Step 12 — Enable email confirmation in Supabase
Supabase Dashboard → Authentication → Email → Enable "Confirm email". Update the sign-up flow to show a "Check your email" screen.

#### Step 13 — Enable GitHub branch protection
- Settings → Branches → Add rule for `main`
- Require PR before merging
- Require status checks to pass
- Require 2FA for contributors

#### Step 14 — Enable GitHub secret scanning + push protection
- Settings → Code security and analysis → Secret scanning: Enable
- Push protection: Enable
This will block accidental commits of API keys.

#### Step 15 — Enable Dependabot
- Settings → Code security → Dependabot alerts: Enable
- Dependabot security updates: Enable

#### Step 16 — Protect Vercel preview deployments
Vercel Dashboard → Settings → Deployment Protection → Enable "Vercel Authentication" or "Password protection" for preview URLs. Preview deployments currently allow anyone who guesses the URL to see your unreleased features.

#### Step 17 — Subscription enforcement server-side (when activating subscriptions)
When you flip `subscription.activated = true`, subscription checks in `useSubscription` happen client-side and can be bypassed. Before activating:
- Add a server-side check in `/api/ai-advisor` that queries `user_settings.subscription_tier` and rejects expired/free users
- Add the same check to any other gated endpoints

#### Step 18 — RLS test suite
Write automated tests that verify cross-user data isolation:
```js
// Example (using Supabase client in test mode):
// 1. Create user A, create a study_log entry
// 2. Log in as user B
// 3. Attempt to SELECT * FROM study_log WHERE user_id = A.id
// 4. Assert: result is empty
```

---

### Long-Term Security Maintenance

- **Monthly:** Run `npm audit` and update vulnerable dependencies
- **Quarterly:** Review Supabase RLS policies, especially after adding new tables
- **On every new table:** Add `ALTER TABLE x ENABLE ROW LEVEL SECURITY` and an owner-only policy before any other code touches it
- **On every new API route:** Verify auth check on line 1, add rate limiting, validate inputs
- **Secret rotation:** Rotate `OPENAI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` at least annually, and immediately after any team-member departure or suspected exposure
- **Before every release:** Run the security checklist from Phase 5
- **Incident response:** If a key is exposed — rotate it within 5 minutes, audit OpenAI billing for unexpected calls, audit Supabase for unexpected deletions

---

## Phase 4: Implementation Details

### Fix CRITICAL-1 in detail (source maps)

**Problem:** `.map` files deployed to CDN expose full source code.  
**Why it matters:** Competitors and attackers get your business logic for free.  
**Files:** `vite.config.js` (line 15)  
**How to test:** `npm run build && ls dist/assets/*.map` — should show no `.map` files in a production build.  
**How to know it is working:** Deploy to Vercel preview. In Chrome DevTools Sources tab, you should see minified code, not your original files. Running `fetch('/assets/index-xxxxx.js.map')` should return 404.  
**What can go wrong:** Sentry will stop showing readable stack traces until you configure `sourcemaps.deleteSourcemapsAfterUpload: true` in the plugin. The plugin uploads maps to Sentry before deleting them, giving you readable traces in the Sentry dashboard while keeping them off the public CDN.

### Fix CRITICAL-2 in detail (RLS on admin tables)

**Problem:** `admin_roles` and `audit_log` are accessible to all authenticated users via the anon key.  
**Why it matters:** Any user can see who has admin access and every admin action ever taken.  
**SQL to run:**
```sql
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log   ENABLE ROW LEVEL SECURITY;
-- No SELECT/INSERT/UPDATE/DELETE policies are needed.
-- The service role key (used by /api/admin) bypasses RLS automatically.
-- Authenticated users with the anon key will now get zero rows.
```
**How to test:** Log in as a non-admin user. Open browser console. Run:
```js
const { data } = await window.__supabase__.from('audit_log').select('*');
console.log(data); // Should be [] — empty
```
(Or use the Supabase client from the browser console after finding it in the window scope.)  
**What can go wrong:** Nothing — the `/api/admin` route uses the service role key which bypasses RLS. It continues to work exactly as before.

---

## Phase 5: Security Testing Checklist

Before each release, manually verify:

- [ ] **User isolation:** Create User A and User B. Log in as B. Confirm `supabase.from('study_log').select('*')` returns only B's data, never A's.
- [ ] **Cross-user write blocked:** As User B, attempt `supabase.from('tasks').update({title:'hacked'}).eq('user_id', A_USER_ID)`. Confirm 0 rows affected.
- [ ] **Cross-user delete blocked:** As User B, attempt `supabase.from('phases').delete().eq('user_id', A_USER_ID)`. Confirm 0 rows affected.
- [ ] **Admin route protection:** Log in as a non-admin user. Navigate to `/admin`. Confirm redirect or access denied.
- [ ] **Admin API protection:** As a non-admin user, call `POST /api/admin` with `action: 'list_users'`. Confirm 403 Forbidden.
- [ ] **Unauthenticated API call blocked:** Call `POST /api/ai-advisor` with no Authorization header. Confirm 401.
- [ ] **Source maps not served:** In DevTools Sources tab on production, confirm minified code only. `fetch('/assets/index-xxxxx.js.map')` should return 404.
- [ ] **No secrets in DevTools:** Open Network tab, find the main JS bundle. Search for `sk-`, `service_role`, `eyJ`. None should appear.
- [ ] **Security headers present:** Visit https://securityheaders.com and enter your production URL. Expect grade A or B.
- [ ] **Storage file isolation:** User A uploads an avatar. User B attempts to download A's avatar URL directly. Confirm that private paths are protected (public `avatars` bucket is expected to be readable by design).
- [ ] **audit_log RLS works:** As non-admin, `supabase.from('audit_log').select('*')` returns empty, not all rows.
- [ ] **admin_roles RLS works:** As non-admin, `supabase.from('admin_roles').select('*')` returns empty.
- [ ] **Rate limiting works:** Hit `/api/ai-advisor` 11 times in a minute. 11th call should return 429.
- [ ] **Expired session handling:** Open the app, wait for token expiry (or manually clear localStorage). Confirm redirect to login, not broken state.
- [ ] **Error messages generic:** Trigger a 500 error. Confirm the response is `{ error: 'Internal server error' }` with no stack trace or internal details.

---

## Phase 6: `SECURITY_RULES.md` — Rules for Future Development

See the accompanying `SECURITY_RULES.md` file.

---

## Top 10 Security Risks (Prioritized Action List)

| # | Risk | Severity | Effort | Fix In |
|---|------|----------|--------|--------|
| 1 | Production source maps served publicly | Critical | 15 min | Today |
| 2 | `admin_roles` + `audit_log` have no RLS | Critical | 5 min SQL | Today |
| 3 | No security headers (CSP, HSTS, etc.) | High | 30 min | This week |
| 4 | No rate limiting on `/api/ai-advisor` | High | 2 hrs | This week |
| 5 | `AIPlanChat` missing auth token | High | 20 min | Today |
| 6 | Raw AI response exposed in error body | Medium | 5 min | Today |
| 7 | Debug console.logs in AIPlanChat | Medium | 5 min | Today |
| 8 | react-router open redirect | Medium | 10 min | This week |
| 9 | No OpenAI spend cap configured | High | 5 min (in OpenAI dashboard) | Today |
| 10 | No email confirmation enabled | Medium | 1 hr | Before launch |

---

## First 5 Fixes to Do Right Now

1. **`vite.config.js` line 15:** Change `sourcemap: true` → `sourcemap: process.env.NODE_ENV !== 'production'`
2. **Supabase SQL Editor:** Run `ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY; ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;`
3. **OpenAI Dashboard:** Set a hard monthly spending limit (e.g. $50)
4. **`api/ai-advisor.js` lines 201, 337:** Remove `raw: text.slice(0, 500)` from both error responses
5. **`src/screens/Onboarding/AIPlanChat.jsx`:** Delete the two `console.log` lines and add the Authorization header

---

## Re-Audit Prompt

Use this prompt to re-audit the app after fixes are applied:

```
You are a senior cybersecurity engineer. Re-audit the StudyRise app at /Users/istiaque/Downloads/StudyRise.

The last audit (2026-06-10) found these critical/high issues:
1. Production source maps exposed (vite.config.js sourcemap: true)
2. admin_roles and audit_log tables had no RLS
3. No security headers in vercel.json
4. No rate limiting on /api/ai-advisor
5. AIPlanChat.jsx sent requests without auth token
6. Raw AI response returned in error body
7. Debug console.logs in AIPlanChat.jsx
8. react-router open redirect vulnerability
9. No OpenAI spend cap

Please verify each of these has been fixed. Then check for any new security issues introduced since the last audit. Pay special attention to any new API routes, new Supabase tables, new environment variables, or any new client-side checks that gate sensitive functionality. Produce a delta report: what was fixed, what is still outstanding, and any new findings.
```


---
<!-- docnav-related -->
### Related docs
- [StudyRise — Security Rules for Development](SECURITY_RULES.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
