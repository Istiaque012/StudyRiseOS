# StudyRise — Deployment Architecture

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> Written 2026-06-14. Last updated 2026-06-15: `mbbs` branch merged into `main`; all stale branches (`emp`, `USM`, `mbbs`, `claude/auth-security-qa-hg1hz0`) deleted. Single-branch strategy is now fully in effect.

---

## 1. Project Overview

StudyRise consists of **two completely independent React/Vite applications** that live inside the same Git repository and deploy from the same `main` branch:

| App | URL | Vercel Project Name | Root in repo |
|---|---|---|---|
| Main student app | https://studyrise.app | `studyrise` | `/` (repo root) |
| Admin panel | https://admin.studyrise.app | `studyrise-admin` | `studyrise-admin/` |

Both apps talk to the **same Supabase project** but through different access patterns (anon key for auth, service role key only inside serverless functions).

---

## 2. Current Git / Vercel Architecture

```
GitHub repo: main branch
│
├── push to main
│       │
│       ├─── triggers: studyrise Vercel project
│       │              Root Directory = (empty = repo root)
│       │              → builds from /
│       │              → deploys to studyrise.app
│       │
│       └─── triggers: studyrise-admin Vercel project
│                      Root Directory = studyrise-admin/
│                      → builds from /studyrise-admin/
│                      → deploys to admin.studyrise.app
```

**Yes — pushing to `main` triggers BOTH projects simultaneously.** Vercel watches the same branch and fires independent build pipelines for each project. Each pipeline is completely isolated: different working directory, different `package.json`, different `vercel.json`, different env vars.

---

## 3. Main App Deployment Details

**Vercel project:** `studyrise`  
**Project ID:** `prj_s8R4XujA5enEEHqzph8N6wJPWBhx`  
**Org ID:** `team_V8AGP149vmOLOfxBVLXUf6a4`  
**Root Directory:** *(empty — repo root)*  
**Branch:** `main`  
**Build command:** `vite build` (from `package.json` → `npm run build`)  
**Output directory:** `dist/`  
**Local `.vercel/project.json`:** `/.vercel/project.json` at repo root

### What Vercel uses:
- `package.json` → installs main app's heavy dep tree (Framer Motion, dnd-kit, recharts, reCAPTCHA, Sentry, etc.)
- `vite.config.js` → Sentry plugin, manual chunk splitting, source map config
- `vercel.json` → full production config:
  - Function timeouts (`api/ai-advisor.js` = 60s, `api/admin.js` = 30s, `api/ical-fetch.js` = 30s)
  - Security headers on all routes: CSP, HSTS, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, X-Content-Type-Options
  - Cache headers (no-cache on `index.html`, 1-year immutable on `/assets/*`)
  - SPA rewrite catch-all: `/(.*) → /index.html`
  - Static marketing page rewrites: `/features`, `/pricing`, `/blog/*`, `/study-planner`

### Serverless API functions:
All files under `api/` at the repo root are deployed as Vercel serverless functions:
- `api/ai-advisor.js` — OpenAI proxy
- `api/admin.js` — in-app admin actions (still used by Settings Audit Log / Feature Flags tabs)
- `api/ical-fetch.js` — iCal CORS proxy
- `api/verify-captcha.js` — reCAPTCHA server-side verify
- `api/send-otp.js` — phone OTP send
- `api/verify-otp.js` — phone OTP verify
- `api/log-failed-login.js` — audit log for failed logins

---

## 4. Admin App Deployment Details

**Vercel project:** `studyrise-admin`  
**Project ID:** `prj_IDGEh1AkamPQhb654NdaDHXyrBc6`  
**Org ID:** `team_V8AGP149vmOLOfxBVLXUf6a4`  
**Root Directory:** `studyrise-admin/` *(set in Vercel cloud project settings)*

> **Note on Project IDs:** The Project ID and Org ID above are not secret keys — they identify which Vercel project to deploy to, similar to a URL. However, they should not appear in public/open-source documentation as they make it easier to target your Vercel account. Keep them internal to this private repo.

**Branch:** `main`  
**Build command:** `vite build` (from `studyrise-admin/package.json`)  
**Output directory:** `studyrise-admin/dist/`

### What Vercel uses (all paths relative to `studyrise-admin/` as root):
- `package.json` → lean dep tree (react, react-router-dom, supabase-js, lucide, date-fns, recharts only — no Framer Motion, no reCAPTCHA)
- `vite.config.js` → simple React plugin + dev proxy to `https://admin.studyrise.app` for `/api`
- `vercel.json` → minimal SPA config (filesystem handler + catch-all `/(.*) → /index.html`)

### Serverless API functions:
- `studyrise-admin/api/admin-actions.js` — single endpoint handling all admin operations

### Security headers (fixed — current state):
The admin `vercel.json` uses the modern Vercel v2 format and includes full security headers on all routes:
- `Content-Security-Policy` — admin-specific: allows only `self`, Supabase HTTPS/WSS, and Google Fonts; does **not** include reCAPTCHA or OpenAI (neither is used in the admin app)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 5. How Vercel Decides What to Build

The key mechanism is **Root Directory** configured per Vercel project in the cloud.

When Vercel builds the **main app**:
1. Clones the repo at `main`
2. `cd` to the repo root (Root Directory = empty)
3. Reads `./package.json` → installs deps
4. Reads `./vite.config.js` → runs build
5. Reads `./vercel.json` → applies headers/rewrites/function config
6. Outputs `./dist/`

When Vercel builds the **admin app**:
1. Clones the repo at `main`
2. `cd` to `studyrise-admin/` (Root Directory = `studyrise-admin/`)
3. Reads `studyrise-admin/package.json` → installs deps
4. Reads `studyrise-admin/vite.config.js` → runs build
5. Reads `studyrise-admin/vercel.json` → applies routes
6. Outputs `studyrise-admin/dist/`

The root `vercel.json` is **never seen** by the admin build. The admin `vercel.json` is **never seen** by the main app build. They are entirely isolated.

---

## 6. Deployment Flow Diagram

```
Developer pushes to main branch
            │
            ▼
    GitHub notifies Vercel
            │
     ┌──────┴──────┐
     │             │
     ▼             ▼
studyrise    studyrise-admin
Vercel project  Vercel project
     │             │
     │ Root Dir:   │ Root Dir:
     │  /          │  studyrise-admin/
     │             │
     ▼             ▼
 npm install    npm install
 (heavy deps)   (lean deps)
     │             │
     ▼             ▼
 vite build     vite build
 (with Sentry)  (plain React)
     │             │
     ▼             ▼
 dist/ output   dist/ output
     │             │
     ▼             ▼
studyrise.app   admin.studyrise.app
  + /api/*        + /api/admin-actions
  serverless      serverless
```

---

## 7. Required Vercel Settings for Both Projects

### Main app (`studyrise`) in Vercel Dashboard:

| Setting | Value |
|---|---|
| Repository | Same GitHub repo |
| Branch | `main` |
| Root Directory | *(leave empty)* |
| Framework Preset | Vite |
| Build Command | `vite build` |
| Output Directory | `dist` |
| Node.js Version | 20.x or 22.x |

### Admin app (`studyrise-admin`) in Vercel Dashboard:

| Setting | Value |
|---|---|
| Repository | Same GitHub repo |
| Branch | `main` |
| Root Directory | `studyrise-admin` |
| Framework Preset | Vite |
| Build Command | `vite build` |
| Output Directory | `dist` |
| Node.js Version | 22.x (currently 24.x per local `.vercel/project.json`) |

> **Critical:** The Root Directory for `studyrise-admin` must be set to `studyrise-admin` in the Vercel cloud project settings. If this is ever accidentally cleared, Vercel would try to build from the repo root using the main app's config — the build would succeed but produce the main app, not the admin panel.

---

## 8. Required Environment Variables

### Main app (`studyrise`) — set in Vercel project settings:

| Variable | Type | Used by | Notes |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Client | `src/lib/supabase.js` | Safe — public URL |
| `VITE_SUPABASE_ANON_KEY` | Client | `src/lib/supabase.js` | Safe — public key, RLS enforced |
| `VITE_RECAPTCHA_SITE_KEY` | Client | `src/components/ui/Captcha.jsx` | Public site key |
| `SUPABASE_URL` | Server | `api/admin.js` | Falls back to `VITE_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | `api/admin.js` | **SECRET — never prefix with VITE_** |
| `OPENAI_API_KEY` | **Server only** | `api/ai-advisor.js` | **SECRET** |
| `RECAPTCHA_SECRET_KEY` | **Server only** | `api/verify-captcha.js` | **SECRET** |
| `OTP_HASH_SALT` | **Server only** | `api/send-otp.js` | **SECRET — used for OTP hashing** |
| `SENTRY_AUTH_TOKEN` | Build-time | `vite.config.js` | Optional — enables source map upload |

### Admin app (`studyrise-admin`) — set in Vercel project settings:

| Variable | Type | Used by | Notes |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Client | `src/lib/supabase.js` | Same value as main app |
| `VITE_SUPABASE_ANON_KEY` | Client | `src/lib/supabase.js` | Same value as main app — auth/JWT only |
| `SUPABASE_URL` | **Server only** | `api/admin-actions.js` | Falls back to `VITE_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | `api/admin-actions.js` | **SECRET — bypasses all RLS** |

> Both apps share the same Supabase project, so `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are the same values in both Vercel projects.

---

## 9. What Must Never Be Exposed to the Frontend

| Variable | Why it's dangerous |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Bypasses ALL Row Level Security — anyone with this key can read/write/delete every row of every table for every user |
| `OPENAI_API_KEY` | Billed API key — exposure leads to cost abuse |
| `RECAPTCHA_SECRET_KEY` | Server-side reCAPTCHA verification key — exposure allows bypassing bot protection |
| `OTP_HASH_SALT` | Used to hash OTP codes before storage — exposure allows pre-computing valid codes |

**The rule:** If a variable name starts with `VITE_`, it is bundled into the client JavaScript and visible to anyone who opens the browser's network tab or downloads the JS bundle. Never put secrets behind `VITE_`.

The admin client (`studyrise-admin/src/lib/supabase.js`) is correctly written — it uses ONLY `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for auth session management. All data queries are routed through `api/admin-actions.js` where the service role key is accessed via `process.env.SUPABASE_SERVICE_ROLE_KEY` (server-side only).

---

## 10. The Local `.vercel/project.json` Files (Important Nuance)

There are two `.vercel/project.json` files in the repo:

**`/.vercel/project.json`** (repo root):
```json
{ "projectId": "prj_s8R4XujA5enEEHqzph8N6wJPWBhx", "orgId": "team_V8AGP149vmOLOfxBVLXUf6a4", "projectName": "studyrise" }
```
→ Running `npx vercel` from the repo root targets the **main app** project.

**`/studyrise-admin/.vercel/project.json`**:
```json
{ "projectId": "prj_IDGEh1AkamPQhb654NdaDHXyrBc6", ..., "settings": { "rootDirectory": null } }
```
→ `rootDirectory: null` in the local file means the CLI would upload from wherever it runs.  
→ Running `npx vercel` from the **repo root** WITHOUT explicit project IDs reads `/.vercel/project.json` → deploys the **main app** project, not the admin. ✗  
→ Running `npx vercel` from **inside** `studyrise-admin/` reads the correct project ID, but the **Vercel cloud project** has `rootDirectory: "studyrise-admin"` set. Vercel then looks for a `studyrise-admin/` sub-folder inside the uploaded content — which does not exist — and the build fails. ✗  
→ **The only safe admin deploy command:** run from the **repo root** with explicit project/org ID overrides (see Section 11, Mistake 2).

**CLAUDE.md deploy command for admin (must be run from repo root):**
```bash
VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 \
VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 \
npx vercel --prod --yes
```
The env var override forces Vercel CLI to target the admin project even when run from repo root. Vercel's cloud then uses the `rootDirectory: studyrise-admin/` setting stored in the cloud project config.

---

## 11. Common Mistakes and How to Avoid Them

### Mistake 1: Admin panel deploying the main app
**Cause:** Root Directory for `studyrise-admin` Vercel project was accidentally cleared or set to empty.  
**Symptom:** `admin.studyrise.app` shows the student dashboard.  
**Fix:** In Vercel Dashboard → `studyrise-admin` project → Settings → General → Root Directory → set to `studyrise-admin`.

### Mistake 2: Deploying admin from the wrong directory or without explicit project IDs

There are two common footguns — both produce the wrong result:

**Footgun A — repo root without project IDs:**  
`npx vercel --prod --yes` from repo root → reads `/.vercel/project.json` → deploys **main app** (`studyrise`), not the admin.

**Footgun B — running from inside `studyrise-admin/`:**  
`cd studyrise-admin && npx vercel --prod --yes` → the CLI reads the correct project ID from the local `.vercel/project.json`, but the **Vercel cloud project** has `rootDirectory: "studyrise-admin"` set in its cloud settings. Vercel then looks for a `studyrise-admin/` sub-folder inside what was uploaded, which does not exist. The build fails.

**Correct command — always run from repo root with explicit project IDs:**
```bash
VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 \
VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 \
npx vercel --prod --yes
```
The env var overrides force the CLI to target the admin project even from repo root. Vercel cloud correctly applies its `rootDirectory: "studyrise-admin"` setting from the cloud project configuration.

### Mistake 3: Adding `VITE_SUPABASE_SERVICE_ROLE_KEY` (service key in client)
**Cause:** Copy-pasting env vars and accidentally prefixing the service key with `VITE_`.  
**Symptom:** Service role key is visible in the browser's JavaScript bundle.  
**Fix:** The service key must only exist as `SUPABASE_SERVICE_ROLE_KEY` (no `VITE_` prefix). Double-check in Vercel project settings that no secret has the `VITE_` prefix.

### Mistake 4: Editing `vercel.json` for one app and breaking the other
**Cause:** There are TWO `vercel.json` files. Always confirm which one you're editing.  
- `/vercel.json` → main app only  
- `/studyrise-admin/vercel.json` → admin app only  
**Fix:** Make changes to the correct file. Run `npm run build` in the correct directory before pushing.

### Mistake 5: Missing env vars causing silent failures
**Cause:** A new serverless function uses an env var that isn't set in Vercel project settings.  
**Symptom:** Function returns 500; error message in Vercel function logs.  
**Fix:** After adding any `process.env.NEW_VAR` to a serverless function, add it to both the Vercel project's environment variables AND `.env.local` locally.

### Mistake 6: (Historical) Admin app lacked security headers — now fixed
**Was:** `studyrise-admin/vercel.json` used the old v1 `routes` format with no security headers.  
**Now fixed:** `studyrise-admin/vercel.json` is v2 format with `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` on all routes. The admin CSP is intentionally narrower than the main app — no reCAPTCHA or OpenAI origins, because the admin app uses neither.  
**Verify:** `curl -I https://admin.studyrise.app | grep -iE "content-security-policy|strict-transport-security|x-frame-options"`

---

## 12. Deployment Checklist Before Pushing to `main`

```
[ ] npm run build passes locally in the modified app (cd to the correct app dir first)
[ ] No VITE_ prefix on any secret environment variable
[ ] No hardcoded service role key, OpenAI key, or reCAPTCHA secret in source code
[ ] If you added a new /api/*.js serverless function in EITHER app, verify the env var is set in BOTH:
      - Local .env.local
      - Vercel project settings (for the correct project)
[ ] If you modified vercel.json, confirm you edited the correct one
[ ] If you changed Root Directory or project settings in Vercel, test a deploy before announcing it works
[ ] Check Vercel deployment logs for both projects after pushing (both fire simultaneously)
```

---

## 13. Troubleshooting Guide

### Wrong app is deployed at admin.studyrise.app
1. Go to Vercel Dashboard → `studyrise-admin` project → Settings → General
2. Check **Root Directory** — it must be `studyrise-admin`
3. If it's blank/empty: set it to `studyrise-admin`, save, and re-trigger a deploy

### admin.studyrise.app shows build error or blank page
1. Vercel Dashboard → `studyrise-admin` project → Deployments → open the latest
2. Check the build log — look for missing package or build command failure
3. Verify env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` are set in the `studyrise-admin` Vercel project (not just in the `studyrise` project)
4. Run locally: `cd studyrise-admin && npm install && npm run build`

### studyrise.app shows a blank page or React crash
1. Vercel Dashboard → `studyrise` project → Deployments → open latest
2. Check the build log
3. Check browser console for errors
4. Run locally: `npm run build` from the repo root (not from within `studyrise-admin/`)

### Admin API returns 500 / "Admin API not configured"
**Cause:** `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_URL` missing in `studyrise-admin` Vercel project.  
**Fix:**  
1. Vercel Dashboard → `studyrise-admin` → Settings → Environment Variables
2. Add `SUPABASE_SERVICE_ROLE_KEY` (value from Supabase Dashboard → Project Settings → API → service_role)
3. Add `SUPABASE_URL` (same as `VITE_SUPABASE_URL` but without the `VITE_` prefix)
4. Redeploy

### AI Advisor returns errors on studyrise.app
**Cause:** `OPENAI_API_KEY` missing or billing inactive.  
**Fix:**  
1. Vercel Dashboard → `studyrise` → Settings → Environment Variables → check `OPENAI_API_KEY`
2. Verify OpenAI billing at platform.openai.com

### Custom domain not working (admin.studyrise.app)
**DNS requirement:** An `A` record must exist at your registrar (Namecheap):  
- Host: `admin`  
- Value: `76.76.21.21`  
- TTL: automatic  

Check in Vercel Dashboard → `studyrise-admin` → Settings → Domains. If it shows a DNS error, add/verify the A record.

### Wrong Vercel project ID being picked up by CLI
If `npx vercel --prod` from repo root deploys to the wrong project, always use explicit overrides:
```bash
# Deploy admin app from repo root:
VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 \
VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 \
npx vercel --prod --yes

# Deploy main app from repo root (reads /.vercel/project.json automatically):
npx vercel --prod --yes
```

---

## 14. Post-Deploy Verification Checklist

After any deployment (push to `main` or manual CLI deploy), run through these checks:

```
[ ] Main app build passes locally:
      npm run build        (from repo root)

[ ] Admin app build passes locally:
      cd studyrise-admin && npm run build

[ ] Vercel deployment logs for both projects show green (no build errors)
      → Vercel Dashboard → studyrise → Deployments
      → Vercel Dashboard → studyrise-admin → Deployments

[ ] Main app is reachable and correct:
      https://studyrise.app

[ ] Admin app is reachable and correct:
      https://admin.studyrise.app

[ ] Admin security headers are present:
      curl -I https://admin.studyrise.app | grep -iE \
        "content-security-policy|strict-transport-security|x-frame-options|x-content-type-options|referrer-policy|permissions-policy"
      (All 6 headers must appear in the response)

[ ] No VITE_ prefix on any secret variable:
      Check Vercel project settings for both projects — SUPABASE_SERVICE_ROLE_KEY,
      OPENAI_API_KEY, RECAPTCHA_SECRET_KEY, and OTP_HASH_SALT must never start with VITE_

[ ] If you modified vercel.json, confirm it was the correct one:
      /vercel.json              → main app only
      /studyrise-admin/vercel.json  → admin app only
```

---

## 15. Final Recommended Architecture

The current architecture is **correct and well-separated**. Security headers on both apps are in place. Remaining actionable improvements are:

1. **Protect the Vercel Root Directory setting** — the single most important setting. If it's ever accidentally cleared for the admin project, the entire isolation breaks (admin URL would serve the student app). Check it first whenever the admin panel behaves unexpectedly.

2. **Keep `SUPABASE_SERVICE_ROLE_KEY` absent from the main app** once the in-app Settings tabs (Audit Log, Feature Flags) are eventually migrated to the admin panel — at that point `api/admin.js` can be removed and the main app's Vercel project no longer needs the service role key at all.

### Architecture summary (current, correct state):

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub: main branch                       │
│                                                             │
│  /                          /studyrise-admin/               │
│  ├── package.json           ├── package.json                │
│  ├── vite.config.js         ├── vite.config.js              │
│  ├── vercel.json            ├── vercel.json                 │
│  ├── src/ (main app)        ├── src/ (admin app)            │
│  └── api/ (serverless)      └── api/ (admin serverless)     │
│                                                             │
└────────────────────────┬────────────────────────────────────┘
                         │ git push
                         ▼
           ┌─────────────────────────┐
           │    Vercel Platform      │
           │                         │
           │  studyrise project    │  studyrise-admin project
           │  Root: /                │  Root: /studyrise-admin/
           │  Env: OPENAI_API_KEY    │  Env: SERVICE_ROLE_KEY
           │       SERVICE_ROLE_KEY  │       VITE_SUPABASE_*
           │       RECAPTCHA_*       │
           │       VITE_SUPABASE_*   │
           └─────────────────────────┘
                    │           │
                    ▼           ▼
          studyrise.app   admin.studyrise.app
          (public)        (admin-only, role-gated)
                    │           │
                    └─────┬─────┘
                          ▼
               Shared Supabase Project
               - anon key (client): RLS enforced
               - service role (server only): bypasses RLS
```


---
<!-- docnav-related -->
### Related docs
_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
