# Admin Panel v2 — Session Prompts for Claude Code

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Paste each session into Claude Code on the `emp` branch. Each session is self-contained, ends with `npm run build`, and leaves the codebase in a working state._

_Branch: `emp` | Source of truth: `CLAUDE.md` | Design refs: `BRAND_KIT.md`, `00_REFERENCE.md`_

---

## Model Recommendations

| Session | Recommended Model | Rationale |
|---------|------------------|-----------|
| 1 | **Sonnet** | Scaffold boilerplate, OAuth wiring, layout shell — mechanical, high-volume file creation |
| 2 | **Sonnet** | Dashboard KPI tiles + Recharts chart — straightforward queries + UI |
| 3 | **Opus** | Complex user management: search, filters, paginated table, detail drawer, role-gated actions, suspend flow across both apps — many interacting pieces |
| 4 | **Sonnet** | Migrating existing subscription UI + CSV export — mostly porting known code |
| 5 | **Opus** | New `user_feature_flags` table, cross-app hook, gate system integration — architectural decisions with ripple effects across both codebases |
| 6 | **Sonnet** | Announcement composer (simple form) + deletion of old admin code — cleanup-heavy, low ambiguity |

---

## Pre-Session Checklist (do this before every session)

```
git checkout emp
git pull origin emp
npm run build   # confirm clean starting state
```

After every session:

```
npm run build   # confirm clean ending state
git add . && git commit -m "Admin v2 Session N: <description>" && git push origin emp
```

---

## Pre-Session 1 Manual Steps (do these BEFORE pasting Session 1)

Run in **Supabase SQL Editor**:

```sql
-- migrations/admin_001_roles.sql
ALTER TABLE user_settings
  ADD COLUMN IF NOT EXISTS admin_role TEXT DEFAULT NULL;
-- values: NULL (regular user), 'super_admin', 'support'

UPDATE user_settings
  SET admin_role = 'super_admin'
  WHERE user_id = (
    SELECT id FROM auth.users WHERE email = 'ias.ndc@gmail.com'
  );
```

Then in **Supabase Dashboard → Auth → URL Configuration → Redirect URLs**:
- Add `https://admin.studyrise.app` as an allowed redirect URL
- Add `https://admin.studyrise.app/**` as an allowed redirect URL

---

## Session 1 — Scaffold + Auth + Layout Shell + Deploy-Ready

> **Model: Sonnet** — Boilerplate-heavy scaffolding session.
> Estimated scope: ~1200 lines across ~15 new files. Medium-heavy session.

```
Read CLAUDE.md for full project context. Read BRAND_KIT.md for design tokens and color palette. Read 00_REFERENCE.md for component patterns.

This session creates a brand-new Vite + React project at `studyrise-admin/` (sibling to `AMC Tracker/`). It will be deployed as a separate Vercel project at `admin.studyrise.app`, sharing the same Supabase project.

## Part A — Project Scaffold

Create `studyrise-admin/` at the repo root (sibling to `AMC Tracker/`):

```
studyrise-admin/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local
├── vercel.json
├── public/
│   └── favicon.svg              # Copy from AMC Tracker/public/favicon.svg
├── api/
│   └── admin-actions.js         # Vercel serverless — service role key
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   ├── tokens.css            # Copy from AMC Tracker/src/styles/tokens.css — same design tokens
    │   └── globals.css           # Tailwind directives + minimal reset
    ├── lib/
    │   ├── supabase.js           # Supabase client init (anon key, for auth)
    │   └── adminApi.js           # All admin queries — calls /api/admin-actions
    ├── components/
    │   └── ui/
    │       ├── Button.jsx        # Minimal button (primary/secondary/ghost/danger variants)
    │       ├── Badge.jsx         # Status badge (green/amber/red/blue/gray/navy)
    │       ├── Card.jsx          # Card container
    │       └── Table.jsx         # Data table with sortable headers
    └── screens/
        ├── Login.jsx
        ├── AccessDenied.jsx
        ├── Layout.jsx
        ├── Dashboard.jsx         # Empty placeholder — "Dashboard coming in Session 2"
        ├── Users.jsx             # Empty placeholder — "User management coming in Session 3"
        ├── Subscriptions.jsx     # Empty placeholder
        ├── FeatureFlags.jsx      # Empty placeholder
        └── Announcements.jsx     # Empty placeholder
```

package.json dependencies:
- react, react-dom (^18.3)
- react-router-dom (^6.30)
- @supabase/supabase-js (^2)
- lucide-react
- date-fns
- Dev: vite, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer, eslint

vite.config.js: Standard React plugin config. No special aliases needed.

tailwind.config.js: Copy the extended theme from `AMC Tracker/tailwind.config.js` — same color tokens, font families, border-radius, shadows. Content path points to `./src/**/*.{js,jsx}`.

vercel.json:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

.env.local (same values as main app):
```
VITE_SUPABASE_URL=<same>
VITE_SUPABASE_ANON_KEY=<same>
SUPABASE_SERVICE_ROLE_KEY=<same>
```

## Part B — Serverless API Endpoint

Create `studyrise-admin/api/admin-actions.js`:
- A Vercel serverless function that accepts POST requests
- Initializes a Supabase client with `SUPABASE_SERVICE_ROLE_KEY` (server-side only, bypasses RLS)
- Accepts `{ action, payload }` in the request body
- Action handlers:
  - `get_user_role`: takes `user_id`, returns `admin_role` from `user_settings`
  - `get_dashboard_metrics`: returns counts (total users, active today, trials, etc.) — placeholder, Session 2 fills this in
  - `get_users`: returns paginated user list — placeholder, Session 3 fills this in
- Auth guard: Every request must include the user's Supabase JWT in the `Authorization` header. The endpoint verifies the JWT, fetches the caller's `admin_role`, and rejects if NULL.
- Error handling: returns `{ error: message }` with appropriate HTTP status codes

Create `studyrise-admin/src/lib/adminApi.js`:
- Export async functions that call `/api/admin-actions` with the correct action and payload
- Include the user's JWT from `supabase.auth.getSession()` in the Authorization header
- Functions: `fetchUserRole(userId)`, `fetchDashboardMetrics()`, `fetchUsers(params)`

## Part C — Auth Flow

In `src/lib/supabase.js`:
- Standard Supabase client init using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- This is for auth only — all data queries go through the serverless API (service role key)

In `src/App.jsx`:
- Auth state management: `supabase.auth.onAuthStateChange()` listener
- On login: fetch `admin_role` via `adminApi.fetchUserRole(user.id)`
- Route logic:
  - Not logged in → redirect to `/login`
  - Logged in but `admin_role` is NULL → redirect to `/access-denied`
  - Logged in with `super_admin` or `support` → render `<Layout />` with child routes
- Store `{ user, role }` in React state, pass as context or props to all screens
- Routes:
  - `/login` → Login.jsx
  - `/access-denied` → AccessDenied.jsx
  - `/` → redirect to `/dashboard`
  - `/dashboard` → Dashboard.jsx
  - `/users` → Users.jsx
  - `/subscriptions` → Subscriptions.jsx
  - `/feature-flags` → FeatureFlags.jsx
  - `/announcements` → Announcements.jsx

## Part D — Login Screen

`src/screens/Login.jsx`:
- Clean centered card with StudyRise branding
- "StudyRise Admin" title in `font-serif`, navy color
- Subtitle: "Internal management panel"
- Single "Sign in with Google" button (use the same Google OAuth branded pattern from the main app — `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })`)
- No email/password option — admin is Google-only
- Footer text: "Access restricted to authorized administrators"
- Background: subtle gradient or solid `var(--bg)` — keep it clean

## Part E — Access Denied Screen

`src/screens/AccessDenied.jsx`:
- Centered card with `ShieldX` icon from lucide-react
- "Access Denied" heading
- "Your account does not have admin privileges. Contact the super admin if you believe this is an error."
- "Sign out" button (calls `supabase.auth.signOut()`, redirects to `/login`)
- Show the logged-in email so they know which account was used

## Part F — Layout Shell

`src/screens/Layout.jsx`:
- Left sidebar (260px on desktop, hidden on mobile with hamburger toggle):
  - StudyRise Admin logo/title at top
  - Nav links with lucide icons:
    - LayoutDashboard → /dashboard → "Dashboard"
    - Users → /users → "Users"
    - CreditCard → /subscriptions → "Subscriptions"
    - ToggleLeft → /feature-flags → "Feature Flags"
    - Megaphone → /announcements → "Announcements"
  - Active link: `var(--soft-blue)` background with `var(--blue-ink)` text
  - Inactive: `var(--ink-3)` text, hover `var(--bg-2)` background
  - Bottom of sidebar: user avatar (Google photo), display name, role badge (`Badge` component — navy for super_admin, blue for support), "Sign out" link
- Top bar (mobile only): hamburger + "StudyRise Admin" + avatar
- Main content area: `<Outlet />` from react-router-dom
- Color scheme: sidebar uses navy background (`var(--navy)`) with white text, matching the main app's sidebar aesthetic

## Part G — UI Components

Create minimal but polished UI components in `src/components/ui/`:

`Button.jsx`:
- Props: `variant` (primary/secondary/ghost/danger), `size` (sm/md), `loading`, `disabled`, `children`, `onClick`, `className`, `type`
- Primary: `var(--navy)` bg, white text
- Use CSS vars throughout, no hardcoded hex

`Badge.jsx`:
- Props: `variant` (green/amber/red/blue/gray/navy), `children`
- Pill shape, matching main app's Badge2 style

`Card.jsx`:
- Props: `children`, `className`, `padding` (default true)
- White background, `var(--border)` border, `rounded-token` radius, subtle shadow

`Table.jsx`:
- Props: `columns` (array of { key, label, sortable, render }), `data`, `onSort`, `sortBy`, `sortDir`, `onRowClick`
- Clean table with hover rows, sortable column headers with chevron indicators
- Responsive: horizontal scroll wrapper on mobile

## Before finishing

- Run `cd studyrise-admin && npm install && npm run build` and fix any errors
- Verify the project builds independently from the main app
- Verify login flow: Google OAuth → role check → layout shell (or access denied)
- Verify all nav links render their placeholder screens
- Verify sidebar shows correct user info and role badge
- Do NOT touch anything in `AMC Tracker/` this session
- Update CLAUDE.md: add the `studyrise-admin/` folder to the project structure section, document the admin_role column, document the admin auth flow
```

---

## Session 2 — Metrics Dashboard

> **Model: Sonnet** — Query writing + KPI tile UI. Straightforward.
> Estimated scope: ~600 lines across 3 files. Light-medium session.

```
Read CLAUDE.md for full project context. Read BRAND_KIT.md for design tokens. Read studyrise-admin/src/screens/Dashboard.jsx (placeholder from Session 1). Read studyrise-admin/api/admin-actions.js for the serverless endpoint pattern.

This session builds the admin dashboard home screen — real metrics from Supabase, displayed as KPI tiles and a signup chart.

## Part A — Dashboard Metrics API

In `studyrise-admin/api/admin-actions.js`, implement the `get_dashboard_metrics` action handler:

Queries (all via service role Supabase client):

1. **Total users**: `user_settings` count
2. **Active today**: `study_log` distinct `user_id` where `date = today` (exam mode) UNION `study_sessions` distinct `user_id` where `date = today` (USM)
3. **Active this week**: same as above but `date >= 7 days ago`
4. **New this week**: `user_settings` where `created_at >= 7 days ago` count
5. **Trials active**: `user_settings` where `subscription_tier = 'trial'` AND `trial_ends_at > now()` count
6. **Trials expiring (7d)**: `user_settings` where `subscription_tier = 'trial'` AND `trial_ends_at` between now and 7 days from now
7. **Pro users**: `user_settings` where `subscription_tier = 'pro'` count
8. **Free (expired)**: `user_settings` where `subscription_tier = 'free'` OR (`subscription_tier = 'trial'` AND `trial_ends_at < now()`) count
9. **Exam mode users**: `user_settings` where `app_mode = 'exam'` OR `app_mode IS NULL` count
10. **USM users**: `user_settings` where `app_mode = 'university'` count
11. **Top exam types**: group by `exam_type`, count each, return top 5
12. **Signups last 30 days**: `user_settings` grouped by `created_at::date`, last 30 days, return array of `{ date, count }`

Return all as a single JSON response object.

In `studyrise-admin/src/lib/adminApi.js`:
- Implement `fetchDashboardMetrics()` that calls the action and returns the parsed response

## Part B — Dashboard Screen

Replace `studyrise-admin/src/screens/Dashboard.jsx` placeholder:

Layout (responsive grid):

**Row 1 — Core KPIs (4 tiles):**
- Total Users (icon: Users, color: navy)
- Active Today (icon: Activity, color: green)
- Active This Week (icon: TrendingUp, color: blue)
- New This Week (icon: UserPlus, color: purple)
- Grid: `grid-cols-2 lg:grid-cols-4` gap-4

**Row 2 — Subscription KPIs (4 tiles):**
- Trials Active (icon: Clock, color: blue)
- Trials Expiring 7d (icon: AlertTriangle, color: amber)
- Pro Users (icon: Crown, color: purple — show 0 for now since subscription not activated)
- Free / Expired (icon: UserX, color: gray)

**Row 3 — Mode Split (2 cards):**
- Left card: "App Modes" — show Exam Mode count and USM count as a horizontal stacked bar or two tiles side by side
- Right card: "Top Exam Types" — horizontal bar breakdown showing AMC MCQ, PLAB 1, USMLE Step 1, USMLE Step 2 CK, Custom counts. Use colored bars inside a Card.

**Row 4 — Signups Chart (full width card):**
- "Signups — Last 30 Days" title
- Simple Recharts `BarChart` with date on X-axis, count on Y-axis
- Bar color: `var(--brand-blue)`
- Tooltip showing date + count
- Install recharts as a dependency if not already present

## KPI Tile Component

Create `studyrise-admin/src/components/KPITile.jsx`:
- Props: `label`, `value`, `icon`, `color`, `sub` (optional subtitle)
- Card with icon in a colored soft-background circle, large value in `font-mono text-[28px]`, label below
- Use CSS vars for all colors: `var(--soft-blue)`, `var(--blue-ink)`, etc.

## Loading State

- Show skeleton loading tiles while metrics are being fetched
- Use a simple pulse animation on placeholder divs (CSS animation, not Framer Motion — keep admin app lightweight)
- If fetch fails, show error state with "Failed to load metrics" and a retry button

## Auto-refresh

- Refresh metrics every 60 seconds while the dashboard is active
- Show a subtle "Last updated: X seconds ago" text at the top-right
- Use `useEffect` with interval, clean up on unmount

## Before finishing

- Run `cd studyrise-admin && npm run build` and fix any errors
- Verify all 12 metric values display correctly (even if some are 0)
- Verify the signups chart renders with real data
- Verify loading and error states work
- Update CLAUDE.md: document the dashboard metrics and their data sources
```

---

## Session 3 — User Management

> **Model: Opus** — Complex session: paginated table, search, filters, detail drawer, role-gated actions, cross-app suspend guard. Many interacting pieces.
> Estimated scope: ~1500 lines across 5-6 files. Heavy session.

```
Read CLAUDE.md for full project context. Read BRAND_KIT.md for design tokens. Read studyrise-admin/api/admin-actions.js for the existing serverless pattern. Read studyrise-admin/src/components/ui/Table.jsx for the table component.

This session builds the full user management screen — the most complex screen in the admin panel.

## Pre-Session SQL (run in Supabase SQL Editor before starting)

```sql
ALTER TABLE user_settings
  ADD COLUMN IF NOT EXISTS account_suspended BOOLEAN DEFAULT FALSE;
```

## Part A — Users API Actions

In `studyrise-admin/api/admin-actions.js`, add these action handlers:

**`get_users`**: Accepts `{ page, perPage, search, filter, sortBy, sortDir }`
- Default: page 1, perPage 25, no search, no filter, sortBy 'created_at', sortDir 'desc'
- Search: filter by `display_name ILIKE %search%` OR `email ILIKE %search%` (join auth.users for email)
- Filters:
  - 'all' — no filter
  - 'exam' — `app_mode = 'exam'` OR `app_mode IS NULL`
  - 'university' — `app_mode = 'university'`
  - 'trial' — `subscription_tier = 'trial'` AND `trial_ends_at > now()`
  - 'pro' — `subscription_tier = 'pro'`
  - 'free' — `subscription_tier = 'free'`
  - 'expired' — `subscription_tier = 'trial'` AND `trial_ends_at <= now()`
  - 'suspended' — `account_suspended = true`
- Sort options: 'created_at', 'last_active', 'display_name'
- Return: `{ users: [...], total: count, page, perPage }`
- Each user object: `{ id, user_id, display_name, email (from auth.users), avatar_url, app_mode, exam_type, subscription_tier, trial_ends_at, subscription_period_end, created_at, last_active (latest study_log or study_session date), account_suspended, admin_role }`

**`get_user_detail`**: Accepts `{ user_id }`
- Full profile: everything from `get_users` plus phone_number, exam_date, exam_display_name
- Study stats: count of tasks, count of SR records, count of question_logs, count of mock_exams, count of study_log entries
- USM stats (if university mode): count of units, count of assessments, count of classes
- Return as single object

**`extend_trial`**: Accepts `{ user_id, days }` (7, 14, or 30)
- Updates `trial_ends_at = GREATEST(trial_ends_at, now()) + interval 'N days'`
- Sets `subscription_tier = 'trial'` if currently 'free'
- Role check: requires `super_admin` or `support`

**`change_tier`**: Accepts `{ user_id, tier }` ('free', 'trial', 'pro')
- Updates `subscription_tier`, clears/sets relevant date fields
- Role check: requires `super_admin`

**`suspend_user`**: Accepts `{ user_id, suspended }` (boolean)
- Updates `account_suspended`
- Role check: requires `super_admin`

**`delete_user`**: Accepts `{ user_id }`
- Deletes from `auth.users` (cascades to user_settings via FK)
- Role check: requires `super_admin`
- NEVER allow self-deletion (check caller user_id !== target user_id)

In `studyrise-admin/src/lib/adminApi.js`:
- Add corresponding functions for each action

## Part B — Users Screen

Replace `studyrise-admin/src/screens/Users.jsx`:

**Top bar:**
- Search input (debounced 300ms): `Search` icon, placeholder "Search by name or email..."
- Filter chips in a horizontal scroll row: All | Exam Mode | University | Trial | Pro | Free | Expired | Suspended
- Active filter chip: solid `var(--navy)` bg, white text. Inactive: outline style.

**User table:**
- Use the `Table` component from Session 1
- Columns: Avatar (40px circle, initials fallback) | Name + Email (stacked) | Mode (Badge: "Exam" blue / "USM" purple) | Subscription (Badge: "Trial" amber / "Pro" green / "Free" gray / "Expired" red) | Joined (relative date) | Last Active (relative date or "Never") | Suspended (red dot if true)
- Sortable columns: Name, Joined, Last Active
- Click any row → opens User Detail Drawer
- Pagination at bottom: "Showing 1-25 of 142 users" + Previous/Next buttons

**Empty states:**
- No users matching search: "No users match your search"
- No users matching filter: "No users in this category"

## Part C — User Detail Drawer

Create `studyrise-admin/src/components/UserDrawer.jsx`:

Slide-in panel from the right (320px width on desktop, full-width on mobile):
- Backdrop overlay, click to close
- Close button (X) at top-right

**Sections:**

1. **Profile header:**
   - Avatar (64px), display name, email, phone (if set)
   - Join date, last active
   - Role badge if admin (super_admin/support)
   - Suspended banner (red) if account_suspended

2. **Subscription card:**
   - Current tier badge
   - Trial ends / Pro expires date (if applicable)
   - Status: Active / Expiring Soon / Expired

3. **App details:**
   - Mode: Exam / University
   - Exam type + exam date (if exam mode)
   - Term name (if USM)

4. **Study stats:**
   - Tasks completed / total
   - SR records count
   - Question logs count
   - Mock exams count
   - Days studied

5. **Actions section (bottom):**
   - **Extend trial**: dropdown (7 / 14 / 30 days) + "Extend" button
   - **Change tier**: dropdown (Free / Trial / Pro) + "Apply" button
   - **Suspend / Unsuspend**: toggle button with confirm dialog
   - **Delete account**: red danger button, requires typing "DELETE" to confirm
   - **Copy user ID**: ghost button, copies `user_id` to clipboard with toast

**Role restrictions:**
- `support` role: Extend trial button works. Change tier, Suspend, Delete buttons are disabled with tooltip "Requires super_admin access"
- `super_admin`: full access
- Never show Delete on the admin's own account

## Part D — Suspend Guard in Main App

In `AMC Tracker/src/App.jsx`:
- After user auth resolves, fetch `account_suspended` from `user_settings`
- If `account_suspended === true`: sign out the user immediately and show a toast/alert: "Your account has been suspended. Contact support if you believe this is an error."
- This check runs on every app load, not just login

## Before finishing

- Run `cd studyrise-admin && npm run build` and fix any errors
- Run `cd "AMC Tracker" && npm run build` and fix any errors (for the suspend guard)
- Verify user table loads with real data
- Verify search filters work (test with a known user email)
- Verify drawer opens, shows correct data, and all actions fire
- Verify role restrictions: mentally trace the support role path
- Verify self-deletion is blocked
- Update CLAUDE.md: document account_suspended column, suspend guard in App.jsx, admin user management
```

---

## Session 4 — Subscription Controls

> **Model: Sonnet** — Migrating known UI patterns + adding CSV export. Lower ambiguity.
> Estimated scope: ~700 lines across 3-4 files. Medium session.

```
Read CLAUDE.md for full project context. Read BRAND_KIT.md for design tokens. Read AMC Tracker/src/screens/Admin/AdminPanel.jsx to understand the existing subscription management tabs. Read studyrise-admin/api/admin-actions.js for the serverless pattern.

This session migrates the subscription management from the main app's admin panel into the standalone admin app, then adds bulk actions and CSV export.

## Part A — Subscription API Actions

In `studyrise-admin/api/admin-actions.js`, add these action handlers:

**`get_subscription_settings`**:
- Reads from `app_settings` table: `subscription_activated`, `trial_duration_days`, `announcement`
- Returns the global config object

**`update_subscription_settings`**:
- Accepts `{ subscription_activated, trial_duration_days, announcement }`
- Updates `app_settings` row
- Role check: `super_admin` only
- If toggling `subscription_activated` to true, require a `confirm: 'ACTIVATE'` field in payload

**`bulk_extend_trials`**:
- Accepts `{ days }` (number of days to add)
- Updates all users where `subscription_tier = 'trial'` AND `trial_ends_at > now()`
- Extends `trial_ends_at` by `N days`
- Returns count of affected users
- Role check: `super_admin` only

**`export_users_csv`**:
- Returns all users as a JSON array with: email, display_name, app_mode, exam_type, subscription_tier, trial_ends_at, subscription_period_end, created_at
- The CSV formatting happens client-side

In `studyrise-admin/src/lib/adminApi.js`:
- Add corresponding functions

## Part B — Subscriptions Screen

Replace `studyrise-admin/src/screens/Subscriptions.jsx`:

**Section 1 — Global Settings Card:**
- Status indicator: large dot + text — "Free Preview Mode (subscriptions inactive)" in amber, or "Subscriptions Active" in green
- "Enable Subscriptions" button (if inactive):
  - On click: modal appears asking to type "ACTIVATE" to confirm
  - On confirm: calls `update_subscription_settings({ subscription_activated: true, confirm: 'ACTIVATE' })`
  - Shows warning: "This will enforce trial limits for all users. This cannot be easily undone."
- "Disable Subscriptions" button (if active): requires typing "DEACTIVATE"
- Trial duration field: number input, default 14, with "days" label. "Save" button.
- Announcement text: textarea, with "Save" button and "Clear" button
- Last updated timestamp

**Section 2 — Bulk Actions Card:**
- **Extend all active trials**: number input (days) + "Extend All" button
  - Confirm modal: "This will extend trials for X active trial users by N days. Continue?"
  - Success: "Extended trials for X users"
- **Export user list**: "Download CSV" button
  - Generates CSV client-side from the full user list (call `get_users` with perPage: 99999)
  - Columns: Email, Name, Mode, Exam Type, Tier, Trial Ends, Pro Ends, Joined, Last Active
  - Triggers browser download of `studyrise_users_YYYY-MM-DD.csv`

**Section 3 — Subscription Overview (read-only summary):**
- Horizontal bar showing tier distribution: Trial (blue) | Pro (green) | Free (gray)
- Numbers below each segment
- Total users count at the right

## Part C — Remove Subscription Tabs from Main App

In `AMC Tracker/src/screens/Admin/AdminPanel.jsx`:
- Remove the "Subscription Settings" tab and its content
- Remove the "User Subscriptions" tab and its content
- Keep the remaining admin panel tabs (if any) intact for now — full removal happens in Session 6
- If no tabs remain after removal, remove the entire screen and route now instead of waiting for Session 6

## Before finishing

- Run `cd studyrise-admin && npm run build` and fix any errors
- Run `cd "AMC Tracker" && npm run build` and fix any errors
- Verify global settings save and load correctly
- Verify the ACTIVATE confirmation flow works
- Verify bulk trial extension works and shows correct count
- Verify CSV downloads with correct data and formatting
- Verify the removed tabs no longer appear in the main app's admin panel
- Update CLAUDE.md: document subscription controls migration, note which tabs were removed
```

---

## Session 5 — Feature Flags (Global + Per-User)

> **Model: Opus** — New database table, cross-app hook integration, gate system changes. Architectural session with ripple effects.
> Estimated scope: ~900 lines across 6-7 files in both projects. Medium-heavy session.

```
Read CLAUDE.md for full project context, especially the subscription gates section. Read BRAND_KIT.md for design tokens. Read AMC Tracker/src/lib/subscriptionGates.js to understand the existing gate system. If AMC Tracker/src/lib/uniGates.js exists, read that too.

This session builds the feature flag system — both global flags and per-user overrides. This is the most architecturally significant session because it touches the gate system in the main app.

## Pre-Session SQL (run in Supabase SQL Editor before starting)

```sql
-- migrations/admin_002_feature_flags.sql
CREATE TABLE IF NOT EXISTS user_feature_flags (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flag_name  TEXT NOT NULL,
  enabled    BOOLEAN NOT NULL DEFAULT TRUE,
  set_by     UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, flag_name)
);

ALTER TABLE user_feature_flags ENABLE ROW LEVEL SECURITY;

-- Users can read their own flags
CREATE POLICY "users read own flags"
  ON user_feature_flags FOR SELECT
  USING (auth.uid() = user_id);
```

## Part A — Feature Flags API Actions

In `studyrise-admin/api/admin-actions.js`, add these action handlers:

**`get_global_flags`**:
- Returns the current state of all global feature flags from `app_settings`
- Flag list (define these as a constant array at the top of the file):
  ```
  GLOBAL_FLAGS = [
    { key: 'subscription_activated', label: 'Subscription Gates Active', description: 'Enforce free/trial/pro feature limits' },
    { key: 'kanban_enabled', label: 'Kanban View (Exam Mode)', description: 'Enable drag-and-drop kanban board in Plan screen' },
    { key: 'dark_mode_enabled', label: 'Dark Mode', description: 'Allow users to switch to dark theme' },
    { key: 'ai_advisor_enabled', label: 'AI Study Advisor', description: 'AI-powered study advice on Dashboard' },
    { key: 'usm_beta_enabled', label: 'USM Beta Access', description: 'Allow new users to choose University Student Mode' },
  ]
  ```
- Read from `app_settings` — add columns if they don't exist yet (with defaults of false)

**`update_global_flag`**: Accepts `{ flag_key, enabled }`
- Updates the flag in `app_settings`
- Role check: `super_admin` only
- If flag_key is 'subscription_activated', require confirm: 'ACTIVATE' or 'DEACTIVATE'

**`get_user_flags`**: Accepts `{ user_id }`
- Returns all `user_feature_flags` rows for that user

**`set_user_flag`**: Accepts `{ user_id, flag_name, enabled }`
- Upserts into `user_feature_flags` (insert on conflict update)
- Sets `set_by` to the admin's user_id
- Role check: `super_admin` only

**`remove_user_flag`**: Accepts `{ user_id, flag_name }`
- Deletes the override, so the user falls back to global/tier behavior
- Role check: `super_admin` only

In `studyrise-admin/src/lib/adminApi.js`:
- Add corresponding functions

## Part B — Feature Flags Screen

Replace `studyrise-admin/src/screens/FeatureFlags.jsx`:

**Section A — Global Feature Flags:**
- Card with title "Global Feature Flags"
- Subtitle: "These flags control features for ALL users"
- Table/list of flags, each row:
  - Flag label + description
  - Toggle switch (on/off)
  - On toggle: call `update_global_flag`, show success/error toast
  - subscription_activated toggle requires the ACTIVATE/DEACTIVATE confirm flow (reuse from Subscriptions screen)

**Section B — Per-User Feature Flag Overrides:**
- Card with title "User Overrides"
- Subtitle: "Override feature access for individual users — takes priority over global flags and subscription tier"
- Search input: find user by name or email (reuse the user search from Session 3's API)
- When a user is selected, show:
  - User avatar + name + email + current tier
  - List of all flags (combine the global flag list with any gate keys from subscriptionGates.js):
    ```
    Flag Name | Global State | User Override | Action
    ```
  - Each row shows:
    - Flag name
    - Global state (on/off badge, read-only)
    - User override: "No override" (gray) / "Enabled" (green badge) / "Disabled" (red badge)
    - Action buttons: "Enable" / "Disable" / "Remove override" (resets to default behavior)
  - On any action: call the appropriate API function, refresh the list
  - Show a note: "Overrides take priority. If a flag is globally OFF but the user has an 'Enabled' override, they will see the feature."

## Part C — Main App Integration (useFeatureFlags hook)

In `AMC Tracker/src/hooks/useFeatureFlags.js` (new file):
- Custom hook: `useFeatureFlags(userId)`
- On mount: fetch all rows from `user_feature_flags` where `user_id = userId`
- Returns: `{ flags, hasFlag(flagName) }` — `hasFlag` returns true if the flag exists and is enabled
- Cache in React state, refetch on user change
- This is a lightweight read — uses the anon key + RLS (the policy allows users to read their own flags)

In `AMC Tracker/src/lib/subscriptionGates.js` (or wherever gates are checked):
- Modify the gate check function to accept an optional `userFlags` parameter
- Logic: if `userFlags.hasFlag(gateName)` is true → feature is unlocked regardless of tier
- If `userFlags.hasFlag(gateName)` is false (explicitly disabled) → feature is locked regardless of tier
- If no override exists → fall back to existing tier-based logic
- This change must be backward-compatible: if `userFlags` is not passed, behavior is unchanged

In `AMC Tracker/src/App.jsx`:
- Import and call `useFeatureFlags(user?.id)`
- Pass the result down to wherever subscription gates are checked
- This is a small wiring change — the hook handles its own data fetching

## Before finishing

- Run `cd studyrise-admin && npm run build` and fix any errors
- Run `cd "AMC Tracker" && npm run build` and fix any errors
- Verify global flag toggles work in admin panel
- Verify per-user override: set a flag for your own account, confirm the main app respects it
- Verify removing an override reverts to default behavior
- Verify the existing gate system is unaffected for users with no overrides
- Run the pre-session SQL migration (admin_002_feature_flags.sql) is documented
- Update CLAUDE.md: document user_feature_flags table, useFeatureFlags hook, modified gate logic
```

---

## Session 6 — Announcement Composer + Main App Cleanup

> **Model: Sonnet** — Simple form + bulk deletion of old code. Low ambiguity.
> Estimated scope: ~500 lines new, ~800 lines deleted. Medium session.

```
Read CLAUDE.md for full project context. Read BRAND_KIT.md for design tokens. Read AMC Tracker/src/screens/Admin/AdminPanel.jsx to see what's being removed. Read AMC Tracker/src/App.jsx to understand the /admin route. Read AMC Tracker/src/components/Layout/Sidebar.jsx to find the admin link.

This session has two parts: build the announcement composer in the admin app, and remove the entire old admin panel from the main app.

## Part A — Announcement Composer

Replace `studyrise-admin/src/screens/Announcements.jsx`:

**Composer card:**
- Title: "Announcement Composer"
- Subtitle: "Push a message to all users or a specific audience segment"

**Form fields:**
- **Message** (textarea, 3 rows, max 500 chars): the announcement text
  - Character count at bottom-right: "123 / 500"
- **Audience** (radio group):
  - All users (default)
  - Trial users only
  - Free / expired users only
- **Type** (radio group):
  - Info (blue banner)
  - Warning (amber banner)
  - Urgent (red banner)

**Actions:**
- "Preview" button (ghost): shows a mock banner below the form matching how it will appear in the main app
- "Clear" button (ghost): clears the form
- "Push to users →" button (primary): saves to `app_settings` as a JSON object:
  ```json
  {
    "text": "...",
    "audience": "all" | "trial" | "free",
    "type": "info" | "warning" | "urgent",
    "pushed_at": "ISO timestamp",
    "pushed_by": "admin_user_id"
  }
  ```
- Confirm modal before push: "This will display a banner to [X] users. Continue?"

**Preview section:**
- Below the form, a live preview of the banner exactly as users will see it
- Color-coded border/icon based on type: info (blue, Info icon), warning (amber, AlertTriangle), urgent (red, AlertCircle)
- Shows the message text
- "Dismiss" button (preview-only, non-functional)

**History:**
- Below the composer, a "Recent Announcements" list showing last 5 announcements (store history as a JSON array in app_settings, separate field `announcement_history`)
- Each entry: message preview (truncated), audience, type, date, pushed by
- "Reuse" button: copies text back into the composer

## Part B — Announcement API

In `studyrise-admin/api/admin-actions.js`, add:

**`push_announcement`**: Accepts `{ text, audience, type }`
- Saves to `app_settings.announcement` as JSON (see schema above)
- Appends to `app_settings.announcement_history` (keep last 20)
- Role check: `super_admin` or `support`

**`clear_announcement`**:
- Sets `app_settings.announcement` to NULL
- Role check: `super_admin` or `support`

**`get_announcement_history`**:
- Returns `app_settings.announcement_history` array

## Part C — Announcement Banner in Main App

In `AMC Tracker/src/components/`, create `AnnouncementBanner.jsx`:
- Reads `announcement` from `app_settings` (the main app already fetches app_settings — piggyback on that)
- If announcement is NULL or empty: render nothing
- If announcement exists:
  - Check audience filter: if 'trial' and user is not trial → don't show; if 'free' and user is not free/expired → don't show
  - Render a top banner (sticky, below topbar):
    - Color based on type: info = `var(--soft-blue)` bg + `var(--blue-ink)` text, warning = `var(--soft-amber)` + `var(--amber-ink)`, urgent = `var(--soft-red)` + `var(--red-ink)`
    - Icon on the left matching type
    - Message text
    - "×" dismiss button on the right
  - On dismiss: set a localStorage key `studyrise:dismissed_announcement:<pushed_at>` so it doesn't show again for this announcement
  - On new announcement (different `pushed_at`): show again even if a previous announcement was dismissed

Mount in `AMC Tracker/src/App.jsx` or `Layout.jsx`:
- Render `<AnnouncementBanner />` at the top of the authenticated layout, above the main content area
- Pass user tier info and app_settings as props (or let it fetch its own)

## Part D — Remove /admin from Main App (THE BIG CLEANUP)

Delete these files from `AMC Tracker/`:
1. `src/screens/Admin/AdminPanel.jsx` — the entire admin panel screen
2. `src/screens/Admin/` — the directory if now empty
3. `api/admin.js` — the old admin serverless function
4. `src/lib/adminApi.js` — the old admin API client (if it exists in the main app)

Modify these files:
1. `src/App.jsx`:
   - Remove the `/admin` route entirely
   - Remove the `AdminPanel` import
   - Remove any `ADMIN_EMAIL` constant or `isAdmin` checks used for routing
   - Keep the `isAdmin` check ONLY if it's used elsewhere (e.g., to show debug info) — otherwise remove
2. `src/components/Layout/Sidebar.jsx`:
   - Remove the "Admin" nav link (the one that linked to `/admin`)
   - Remove any `isAdmin` conditional rendering for the nav item
3. Any other file that imports from `AdminPanel.jsx` or `adminApi.js` or references the `/admin` route

**Do NOT remove:**
- The `admin_role` column in the database
- The `app_settings` table
- The `subscription_activated` check in the main app
- Any subscription/gate logic — that stays

**Verify after deletion:**
- Navigating to `/admin` in the main app shows 404 or redirects to dashboard
- No console errors about missing imports
- The main app bundle no longer includes any admin UI code

## Before finishing

- Run `cd studyrise-admin && npm run build` and fix any errors
- Run `cd "AMC Tracker" && npm run build` and fix any errors
- Verify announcement composer works: write, preview, push
- Verify the main app shows the announcement banner when one exists
- Verify dismiss works and persists via localStorage
- Verify audience filtering works (trial-only announcement hidden from non-trial users)
- Verify `/admin` route is completely gone from the main app
- Verify no broken imports or console errors in the main app
- Update CLAUDE.md:
  - Remove all references to `AdminPanel.jsx`, `api/admin.js`, `/admin` route
  - Add `AnnouncementBanner.jsx` to the component list
  - Add `studyrise-admin/` project documentation
  - Document the announcement system (JSON schema in app_settings, banner component, dismiss logic)
  - Note: "Admin panel is now a separate project at admin.studyrise.app"
```

---

## Standing Rules (apply to every session above)

These are non-negotiable. Every session prompt inherits them:

1. **Branch is `emp`.** All commits go to the `emp` branch.
2. **Both projects must build.** If a session touches both `studyrise-admin/` and `AMC Tracker/`, run `npm run build` in BOTH directories before finishing.
3. **Service role key stays server-side.** The `SUPABASE_SERVICE_ROLE_KEY` is ONLY used in Vercel serverless functions (`api/` directory). Never expose it to the client bundle. The admin app's client code uses the anon key for auth only — all data queries go through `/api/admin-actions`.
4. **Role checks are server-side.** Every destructive action in `admin-actions.js` verifies the caller's `admin_role` before executing. Client-side role checks are for UI only (disabling buttons) — the API is the real guard.
5. **CSS var tokens only.** No hardcoded hex in the admin app either. Copy `tokens.css` from the main app and use the same `var(--token)` pattern.
6. **Admin app is lightweight.** No Framer Motion, no complex animation library. CSS transitions only. Keep dependencies minimal.
7. **`npm run build` is the gate** on every session.
8. **Ask before fixing unrelated bugs.** If you find a bug in a module you're touching, note it and ask — don't silently change unrelated behavior.
9. **Update CLAUDE.md** at the end of every session so the next Claude Code instance has full context.
10. **Mobile-responsive.** The admin panel should work on mobile (sidebar collapses, tables scroll horizontally, drawers go full-width) even though it's primarily a desktop tool.

---

## Summary Table

| Session | Builds | Removes from main app | Model |
|---------|--------|----------------------|-------|
| 1 | Scaffold, auth, layout shell, deploy-ready | Nothing | Sonnet |
| 2 | Metrics dashboard (KPIs + chart) | Nothing | Sonnet |
| 3 | User management (table, drawer, actions, suspend) | Nothing (but adds suspend guard to main app) | **Opus** |
| 4 | Subscription controls + CSV export | Subscription tabs in AdminPanel | Sonnet |
| 5 | Feature flags (global + per-user + main app hook) | Nothing (but adds useFeatureFlags to main app) | **Opus** |
| 6 | Announcement composer + full /admin cleanup | Entire /admin route, AdminPanel.jsx, api/admin.js | Sonnet |

---

## Post-Session 6 Verification

After all 6 sessions are complete, do a full sweep:

1. `admin.studyrise.app` — login, dashboard, all screens functional
2. `studyrise.app` — no `/admin` route, no admin code in bundle, announcement banner works
3. Feature flags: set one for yourself in admin → verify main app respects it
4. Suspend: suspend a test user in admin → verify main app blocks them
5. CSV export: download and verify data accuracy
6. Mobile: check admin panel on phone — sidebar collapses, tables scroll, drawers work

---

_End of ADMIN_V2_SESSIONS.md — 6 sessions building the standalone admin panel at admin.studyrise.app_


---
<!-- docnav-related -->
### Related docs
- [Auth & Security Sessions — StudyRise](AUTH_SECURITY_SESSIONS.md)
- [StudyRise SEO Fix Sessions](SEO_FIX_SESSIONS.md)
- [StudyRise — SEO Implementation Sessions](SEO_SESSIONS.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
