# Session 5 Audit — Project Structure Tree & Internal Contradictions

**Audit date:** 2026-06-20  
**Scope:** Part A — verify CLAUDE.md file tree against disk, catalogue undocumented files. Part B — identify internal contradictions across docs. Code is the source of truth over docs. No files were edited during this audit.  
**Prior sessions:** `_s1_routes.md`, `_s2_hooks.md`, `_s3_migrations.md`, `_s4_flags.md`

---

## Part A — File Tree Verification

### A-1. Files claimed by CLAUDE.md that are MISSING from disk

| Path (CLAUDE.md claim) | Session note | Status |
|---|---|---|
| `src/components/mbbs/index.js` | Redesign Session R1: *"Barrel-exported from `src/components/mbbs/` (new `index.js`)"* | **MISSING.** The directory contains `GradeBadge.jsx`, `NextExamsWidget.jsx`, `ContextualQuestionPanel.jsx` — no `index.js`. Any `from 'src/components/mbbs'` barrel import would fail at runtime. |

No other files from the CLAUDE.md tree were found missing. All documented `src/lib/`, `src/hooks/`, `src/screens/`, `api/`, and `migrations/` entries that were spot-checked exist.

---

### A-2. Files on disk NOT documented in CLAUDE.md tree

#### HIGH severity (entire screen / API route absent from all docs)

**`studyrise-admin/src/screens/Security.jsx`**  
A complete admin auth-security control screen. Imports `ShieldCheck`, `Info`, `fetchAuthSecurity`, `updateAuthSecurity`. Renders toggle controls for captcha, OTP, email verification, and rate-limiting settings. Uses its own inline `Toggle` component.  
- Not listed in the CLAUDE.md structure block for `studyrise-admin/src/screens/`.  
- Not mentioned in any admin session note (Sessions 1–6 or v2.0 Sessions).  
- Not referenced in Admin API Actions Reference table.  
- The Auth/Security session spec (Sessions 2, 7–10) mentions admin toggles for `captcha_enabled`, `otp_required`, `email_verification_required`, `rate_limit_*` but marks them as "Session 2 deliverables that were never built" — yet this file exists and appears complete.  
- **Impact:** a developer reading CLAUDE.md would not know this screen exists, would not know the auth-security admin UI was built, and could duplicate the work or wire up the wrong endpoint.

---

#### MEDIUM severity (new file, no mention anywhere)

**`migrations/mbbs_R03_term_unique.sql`**  
Purpose decoded from the file: adds a `UNIQUE(user_id, phase, term_number)` constraint to `mbbs_terms` after cleaning up any pre-existing duplicate rows. Idempotent guard via `pg_constraint` lookup.  
- Not in CLAUDE.md migration list.  
- Not in FEATURES.md migration table.  
- Follows the documented `mbbs_R02_integrated_teaching.sql`; appears to address a duplicate-term-row bug exposed in v2.0 Session 7 or later.

**`api/log-failed-login.js`**  
Serverless endpoint that receives `{ email }` and inserts a row into `auth_failed_attempts` using the service role key. Returns `{ ok: true }` even when the service key is missing (client-side rate-limiting is the primary defence).  
- Referenced by name in CLAUDE.md Auth/Security Session 10 prose: *"logs to `/api/log-failed-login`"* — but the API Routes section documents only `ai-advisor.js`, `admin.js`, `ical-fetch.js` (and mentions `send-otp.js`, `verify-captcha.js`, `verify-otp.js` from Auth/Security sessions). `log-failed-login.js` appears in none of these lists.

---

#### MEDIUM severity (file exists, mentioned only in prose — absent from tree)

**`src/screens/Onboarding/OnboardingShell.jsx`**  
Mentioned in CLAUDE.md Onboarding section: *"OnboardingShell: Reusable frame for exam and USM wizards … Top: BrandBar. Center: GlassCard. Footer: action buttons."* The component is described in detail but is not listed in the project structure tree under `src/screens/Onboarding/`.

**`src/screens/Onboarding/AIPlanChat.jsx`**  
Exists on disk. Not mentioned anywhere in CLAUDE.md — not in the tree, not in any session note, not in any prose section. Purpose unknown from name alone; may be an abandoned interactive plan-import screen.

**`src/screens/Onboarding/PlanPreview.jsx`**  
Exists on disk. Mentioned in CLAUDE.md only as part of a list of "old screens kept on disk, unimported," but never listed in the file tree.

---

#### LOWER severity (entire lib and hooks subdirectories absent from tree)

The CLAUDE.md project structure tree lists `src/lib/` and `src/hooks/` as flat directories. Neither `src/lib/mbbs/`, `src/lib/examModules/`, `src/lib/services/`, nor `src/hooks/mbbs/` appear in the tree at all. These are large, active subdirectories. Key omissions:

**`src/lib/` — files on disk not listed in tree:**

| File | Evidence of existence |
|---|---|
| `audit.js` | Disk |
| `bulkParser.js` | Disk |
| `calculations.js` | Disk |
| `captcha.js` | Disk; mentioned in Auth/Security S7 prose |
| `chartTheme.js` | Disk |
| `feasibility.js` | Disk |
| `fieldNormalizer.js` | Disk |
| `index.js` | Disk |
| `legalVersions.js` | Disk; documented in Auth/Security S1 prose but not in tree |
| `passwordStrength.js` | Disk; documented in Auth/Security S5 prose but not in tree |
| `quickPlanGenerator.js` | Disk; mentioned in EMP S9 prose but not in tree |
| `recipeHours.js` | Disk |
| `scheduleEngine.js` | Disk |
| `taskHelpers.js` | Disk |
| `services/` (directory) | Disk; completely undocumented |
| `mbbs/` (entire subdirectory) | Active; 15+ files. CLAUDE.md describes contents in MBBS session notes but never adds them to the structure tree. Notable: `passProjection.js`, `formativeHelpers.js`, `eligibility.js`, `supplementaryPlan.js`, `analytics.js`, `mbbsBmdcCurriculum.js`, etc. |
| `examModules/` (entire subdirectory) | Described in "Exam Module System" prose section but never added to the structure tree |

**`src/hooks/` — hooks on disk not listed in the Hooks section:**

| Hook | Status in docs |
|---|---|
| `useAuthSecuritySettings.js` | Referenced in Auth/Security session prose; absent from Hooks section |
| `useCookieConsent.js` | Documented in Auth/Security S11 prose; absent from Hooks section |
| `useFeatureFlags.js` | Mentioned in a footnote re: legacy `feature_flags` table; absent from Hooks section |
| `usePlanView.js` | Mentioned in EMP session notes; absent from Hooks section |
| `useRealtimeRefetch.js` | No mention anywhere in CLAUDE.md |
| `useReviewReminders.js` | Documented in USM S13 prose; absent from Hooks section |
| `useSchedules.js` | No mention anywhere |
| `useStepsForTask.js` | No mention anywhere |
| `useTaskActions.js` | No mention anywhere |
| `useTheme.js` | Referenced in dark mode prose; absent from Hooks section |
| `useToast.js` | No mention anywhere |
| `useTopics.js` | No mention anywhere |
| `useUserFeatureFlags.js` | Documented in Admin v2 S5 prose; absent from Hooks section |

---

### A-3. Spot-checks passed

| Claim | Result |
|---|---|
| `src/lib/mbbs/passProjection.js` is at that path (not `src/lib/passProjection.js`) | **PASS** — file exists at `src/lib/mbbs/passProjection.js`; no file at the root `src/lib/` level |
| `src/components/ui/PasswordStrengthMeter.jsx` (Auth/Security S5) | **PASS** |
| `src/lib/mbbs/mbbsBmdcCurriculum.js` (R0) | **PASS** |
| `src/hooks/mbbs/` subdirectory with all T2-session hooks | **PASS** |
| `src/screens/mbbs/MbbsIntegratedTeaching.jsx` (R7) | **PASS** |
| `src/screens/mbbs/MbbsFieldPlacements.jsx` (R8) | **PASS** |
| `studyrise-admin/src/screens/QuestionBankAdmin.jsx` (v2.0 S4) | **PASS** |
| `studyrise-admin/src/screens/VivaAdmin.jsx` (v2.0 S5) | **PASS** |
| `studyrise-admin/src/screens/HolidayAdmin.jsx` (v2.0 S11 / R7) | **PASS** |

---

## Part B — Internal Contradictions

### B-a. Migration run status: FEATURES.md vs CLAUDE.md

**Contradiction severity: MEDIUM**

FEATURES.md (§3.4 migration table) marks four migrations as `RUN`:

| Migration | FEATURES.md status | CLAUDE.md language |
|---|---|---|
| `mbbs_001_foundation.sql` | **RUN** | "run manually in Supabase" |
| `mbbs_002_exam_prep.sql` | **RUN** | "FILE ONLY — run manually in Supabase" |
| `mbbs_003_card_exams.sql` | **RUN** | "FILE ONLY — run manually in Supabase" |
| `mbbs_004_questions_restore.sql` | **RUN** | "FILE ONLY — run manually in Supabase" |

FEATURES.md rows 5 onwards (`mbbs_005_*` through `mbbs_R02_*`) all say "Run manually" — consistent with CLAUDE.md.

**Interpretation:** FEATURES.md's "RUN" column likely reflects the live Supabase state (these have been applied to the production DB). CLAUDE.md's "FILE ONLY" language describes the deployment pattern for new installs (there is no CI migration runner; a developer must paste them into the Supabase SQL editor manually). Both statements can be simultaneously true, but the terminology is inconsistent and would confuse a new developer setting up a fresh environment: "RUN" implies the migration was automatically applied, while "FILE ONLY" implies it was not.

Additionally: `mbbs_R03_term_unique.sql` exists on disk but does not appear in the FEATURES.md migration table or CLAUDE.md. Its "run status" is unknown.

---

### B-b. Honours threshold (≥75% vs ≥85%)

**No contradiction found.**

The audit prompt suggested a possible ≥85% claim somewhere. Exhaustive search found no such claim. All sources agree:

| Source | Value |
|---|---|
| FEATURES.md §3.6 (Table 13) | `A \| ≥75 \| 3.75 — Honours threshold` |
| `docs/mbbs/03_MBBS_CURRENT_STATE.md` | "Corrections: honours 75%…" (R1 row) |
| `src/lib/mbbs/mbbsBmdcCurriculum.js` `gradeFor()` | `pct >= 75` → `{ letter:'A', …}` |
| CLAUDE.md Redesign Session R1 | "Honour = A (≥75%)" |

Honours threshold is consistently ≥75% across all docs and code. No source uses 85%.

---

### B-c. Admin screen count: structure block vs session notes vs disk

**Contradiction severity: HIGH**

The CLAUDE.md structure block (`studyrise-admin/` section) lists:

```
screens/{Login, AccessDenied, Layout, Dashboard, Users, Subscriptions, FeatureFlags, Announcements}.jsx
```

That is the original Session 1 scaffold — 8 files, 5 content screens (Dashboard, Users, Subscriptions, FeatureFlags, Announcements). The structure block was never updated as sessions added screens.

Later session notes document 3 additional screens added after Session 1:
- `QuestionBankAdmin.jsx` — v2.0 Session 4
- `VivaAdmin.jsx` — v2.0 Session 5
- `HolidayAdmin.jsx` — v2.0 Session 11 (Redesign R7)

And on disk there is one screen mentioned in NO session note at all:
- `Security.jsx` — implements `fetchAuthSecurity` / `updateAuthSecurity` toggles for captcha, OTP, rate-limiting

**Summary:**

| Category | Count | Names |
|---|---|---|
| Listed in structure block | 5 content + 3 utility | Login, AccessDenied, Layout, Dashboard, Users, Subscriptions, FeatureFlags, Announcements |
| Added in session notes | +3 | QuestionBankAdmin, VivaAdmin, HolidayAdmin |
| On disk but unmentioned anywhere | +1 | **Security.jsx** |
| **Total on disk** | **12** | — |

The structure block is stale by 4 screens (3 documented in notes, 1 completely undocumented). `Security.jsx` is the highest-priority finding: the Auth/Security sessions describe the captcha/OTP/rate-limit toggles as "Admin Session 2 deliverables never built" — but the screen implementing them exists. Either: (a) the screen was built outside the session system and never logged, or (b) the "never built" annotation is wrong.

---

### B-d. Phase-1 lockout wording (alleged "Phase-2 lockout" in CLAUDE.md)

**No contradiction found.**

The audit prompt suggested CLAUDE.md might use "Phase-2 lockout" in one location. Exhaustive search of CLAUDE.md found only:
- "Phase-1 lockout" (used consistently throughout)
- "full Phase-1 lockout" (FEATURES.md §3.3)
- "phase1_lockout" (the jsonb key in `mbbs_config`)

No "Phase-2 lockout" claim exists anywhere. Both CLAUDE.md and FEATURES.md are internally consistent on this point.

---

## Summary Table

| Finding | Severity | File(s) |
|---|---|---|
| `src/components/mbbs/index.js` missing from disk | HIGH | CLAUDE.md Redesign Session R1 |
| `studyrise-admin/src/screens/Security.jsx` entirely unmentioned | HIGH | All CLAUDE.md admin sections |
| Admin structure block stale by 4 screens | HIGH | CLAUDE.md structure block |
| `migrations/mbbs_R03_term_unique.sql` undocumented | MEDIUM | CLAUDE.md, FEATURES.md |
| `api/log-failed-login.js` absent from API Routes section | MEDIUM | CLAUDE.md API Routes |
| Migration run-status language inconsistency (FEATURES.md "RUN" vs CLAUDE.md "FILE ONLY") | MEDIUM | FEATURES.md §3.4 vs CLAUDE.md MBBS session notes |
| `src/screens/Onboarding/OnboardingShell.jsx` in prose but not in tree | LOW | CLAUDE.md structure tree |
| `src/screens/Onboarding/AIPlanChat.jsx` undocumented | LOW | CLAUDE.md |
| `src/lib/mbbs/`, `src/lib/examModules/`, `src/lib/services/` absent from tree | LOW | CLAUDE.md structure tree |
| 13 undocumented hooks in `src/hooks/` | LOW | CLAUDE.md Hooks section |
| 12+ undocumented `src/lib/` files | LOW | CLAUDE.md structure tree |
| Honours threshold: no contradiction found | — | — |
| Phase-1 lockout wording: no contradiction found | — | — |
