---
title: Feature Flags Registry
type: app-dev
sources: [raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md]
created: 2026-06-25
updated: 2026-07-03
---

# Feature Flags Registry

Two-layer flag system: global `app_feature_flags` DB table + per-user `user_feature_flags` overrides.

## How It Works

- **Registry**: `app_feature_flags` table — each row has a flag key, default-ON/OFF, tier (free/pro)
- **Hook**: `useFeatureRegistry.js` — `isEnabled(key)` / `tierOf(key)`
- **Per-user overrides**: `useUserFeatureFlags.js` — admin can override for specific users
- **Ethical floor**: certain rows locked free in both code AND a DB trigger (cannot be paywalled)
- **Pro gating**: `src/components/uni/ProGate.jsx` — blurred preview + pitch card for locked features
- **Gate matrix**: `src/lib/uniGates.js` — `UNI_GATES` + `FEATURE_MATRIX` + `configureGates/canUse`

## Subscription State

⚠️ CONTRADICTION (resolved): this page previously said the `subscription_activated` master
switch was **OFF (everything free)**, current as of 2026-06-25. It has been **ON in prod since
2026-06-14** — an expired-trial user is a live Free-tier user today, not a hypothetical future
state. Source: App repo `docs/dev-os/bug-history.md` 2026-07-03 "enforced Free tier reads as
'the app is broken'" incident (a QA tester's lapsed trial correctly hit the paywall; triage
nearly mis-diagnosed it as a bug because of this stale assumption).

- `app_settings.subscription.activated` master switch: **ON** (live in prod since 2026-06-14)
- Expired trial → tier drops to `plan:'free', isPro:false` — Pro-gated features (`canUse`/`ProGate`)
  and numeric caps (`capsApply`/`canAddUnit`) enforce immediately; nothing is "broken," it's
  working as designed
- Free-tier unit cap: **`FREE_UNIT_CAP = 2`** (a since-fixed doc/regression-checklist typo said 3 —
  code + tests assert 2; existing units already over the cap are never truncated, only *adding*
  more is blocked)
- Free basics that are **never** tier-gated: Dashboard, Today, Timetable, Grades
  calculator/what-do-I-need/what-if, Terms, unlimited assessments, notifications, LMS import,
  dark mode, the entire Settings screen
- Payments are **not yet live** (`UpgradeModal` = "coming soon") — an expired-trial user has no
  self-serve upgrade path today; only an admin comp moves them to Pro. This is an accepted
  product gap, not an open bug.
- When trial is active: 30-day full trial → Free Starter (limited) or Pro (full) at expiry
- Hook: `useSubscription.js` — derives tier/isPro/isTrial/trialDaysLeft

## Known Flag Issues (as of 2026-06-20)

- `mbbs.pass_projection` — gates analytics pass-projection (live)
- `mbbs.analytics_full` — **no live consumer** (reserved)
- `mbbs.mistakes_full` — **no current consumer** (MbbsMistakes.jsx deleted in Redesign S0)
- `mbbs.mocks` / `mbbs.mistakes` / `mbbs.viva` — DELETE-cleaned in `core_feature_flags.sql`

## Admin Management

Feature flags admin at admin.studyrise.app → FeatureFlags screen. Super admin (`ias.ndc@gmail.com`) can toggle flags globally and per-user.

## Related Pages

- [[Unified App Architecture]] — overall system
- [[Pricing Strategy]] — freemium model details
- [[MBBS Bangladesh Module]] — MBBS-specific flag gating
