---
title: Feature Flags Registry
type: app-dev
sources: [raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md]
created: 2026-06-25
updated: 2026-06-25
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

- `subscription_activated` master switch: **OFF** (everything free currently)
- When activated: 30-day full trial → Free Starter (limited) or Pro (full)
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
