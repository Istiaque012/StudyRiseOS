# StudyRise — Security Rules for Development

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


These rules apply to all code written for this project — by humans or AI assistants.
Every rule exists because of a real risk. Do not skip any of them.

---

## Environment Variables

1. **Never put secrets in `VITE_` variables.** Anything prefixed `VITE_` is bundled into the JavaScript that ships to the browser. Only put values there that you would be comfortable posting publicly (Supabase URL, anon key, Sentry DSN).
2. **Never commit `.env.local`, `.env.production`, or any file containing real keys.** The `.gitignore` already excludes `*.local`. Keep it that way.
3. **Server-side secrets go in Vercel environment variables only.** Never in the frontend code, never in git.
4. **Create `.env.example` with placeholder values.** Developers should never need to ask what variables to set.

---

## Supabase / Database

5. **Every new table must have RLS enabled before any other code touches it.**
   ```sql
   ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
   CREATE POLICY your_table_own ON your_table FOR ALL USING (auth.uid() = user_id);
   ```
6. **Never disable RLS "for convenience."** The comment `-- No RLS needed` is almost always wrong. If a table is accessed only through a service-role endpoint, enable RLS with no policies — the service role bypasses RLS, and regular users get nothing.
7. **Service role key is server-side only.** It must never appear in any `src/` file or any variable with a `VITE_` prefix.
8. **The anon key is public by design.** Treat it like a username, not a password. Never rely on it being secret.
9. **RLS policies must use `auth.uid() = user_id` pattern.** Do not use email-based checks (`auth.email() = ...`) — emails can change.
10. **Write a cross-user isolation test for every new table.** Verify User A cannot read User B's rows.

---

## API Routes (`/api/`)

11. **First line of every handler must verify auth.** Call `verifyAuth(req)` before any business logic. Return 401 if the user is not authenticated.
12. **Validate all inputs.** Check that required fields exist and are the right type. Do not trust the client.
13. **Never return internal error details to the client.** Return `{ error: 'Internal server error' }`. Log details server-side (Sentry, Vercel logs).
14. **Never return raw API responses (OpenAI output, Supabase errors) directly to the client.** Strip them to a simple error message.
15. **Every API route that costs money needs rate limiting.** The `/api/ai-advisor` endpoint calls OpenAI. Cap calls per user per hour.
16. **Admin-only endpoints must check `caller.email === ADMIN_EMAIL` (or `admin_roles` table) server-side.** A frontend check is not enough.
17. **Add `AbortController` timeouts to all external fetch calls.** Default: 30 seconds. This prevents runaway serverless function costs.

---

## Frontend Security

18. **Never put business logic that must be secret in client-side code.** The browser can see everything. Study algorithms, AI prompts, subscription gate logic — these are visible to any curious user with DevTools. If you need logic to be truly private, it must run on the server.
19. **Subscription/tier checks in the frontend are UI-only.** They control what buttons are shown. They do not protect server resources. All gated API functionality must check the user's tier server-side before executing.
20. **Admin checks in the frontend are UI-only.** They control sidebar links. The actual admin actions are protected by the server. Never skip the server-side check.
21. **Remove all `console.log` debug statements before merging to main.** Use `if (import.meta.env.DEV) console.log(...)` if you need dev-only logging.
22. **Production source maps must never be deployed.** The `vite.config.js` must have `sourcemap: process.env.NODE_ENV !== 'production'`.

---

## Authentication

23. **Use Supabase Auth for all authentication.** Do not roll custom JWT logic.
24. **Never store the access token in a non-httpOnly cookie or in a location an XSS attack can read.** Supabase stores it in localStorage by default — this is acceptable given the app is SPA-only with no user-generated HTML rendering.
25. **Protected routes must redirect to login if the user session is expired or missing.** Test this explicitly.
26. **The admin panel at `/admin` must be unreachable by non-admin users.** The server must reject all `/api/admin` calls that are not from the primary admin or assigned admins.

---

## Dependency Management

27. **Run `npm audit` before every release.** Fix all Critical and High vulnerabilities. Document any accepted Moderate vulnerabilities with a reason.
28. **Do not install packages with unusually broad filesystem or network access** without a specific reason.
29. **Keep the lockfile (`package-lock.json`) committed.** It pins exact dependency versions and prevents supply-chain attacks.

---

## Security Headers

30. **All HTTP responses must include these headers** (configured in `vercel.json`):
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY`
    - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Content-Security-Policy: ...` (see `vercel.json` for the current policy)

---

## Storage

31. **Every new storage bucket needs a documented access policy.** Decide: public read or authenticated-only? Per-user path restrictions?
32. **User files must be scoped to their user ID** in the storage path (`{userId}/filename`), so one user cannot guess another user's file path.
33. **Validate file types and sizes server-side, not just client-side.**

---

## Code Review Checklist (Security)

Before every PR is merged, the reviewer must verify:

- [ ] No new `VITE_` variable contains a secret
- [ ] No `.env` files are added or modified in the commit
- [ ] Every new Supabase table has RLS enabled and an owner-only policy
- [ ] Every new API route calls `verifyAuth` before any logic
- [ ] No `console.log` with sensitive data is added
- [ ] No raw external API response is forwarded to the client
- [ ] No hardcoded credentials, tokens, or keys appear in any source file
- [ ] If a new subscription gate is added, it is enforced server-side, not only client-side
- [ ] Source maps are still disabled for production builds

---

## If You Discover a Vulnerability

1. Do not commit a fix directly to `main` without a review
2. Rotate any exposed credentials immediately (before fixing the code)
3. Note the vulnerability in the git commit message so it is auditable
4. After fixing, run the security testing checklist from `SECURITY_AUDIT.md`


---
<!-- docnav-related -->
### Related docs
- [StudyRise Security Audit Report](SECURITY_AUDIT.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
