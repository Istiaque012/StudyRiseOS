---
title: Unified App Architecture
type: app-dev
sources: [raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md]
created: 2026-06-25
updated: 2026-06-25
---

# Unified App Architecture

StudyRise is a single React SPA serving three audience modes, lazy-chunk isolated so each mode only loads its own code.

## Three Modes

| Mode | `app_mode` value | Audience | Status |
|---|---|---|---|
| Exam Prep | `null` or `'exam'` | AMC MCQ / PLAB 1 / USMLE Step 1 / custom medical-licensing | Complete |
| University | `'university'` | General university students (any degree) | MVP complete (Sessions 1–14) |
| MBBS Bangladesh | `'mbbs'` | BMDC 2021 curriculum students | R3.0 shipped (R0–R9) |

Mode is derived in one place: `src/lib/appMode.js` → `getAppMode(settings)`.

## Tech Stack

- **Frontend**: React 18 + Vite 5 + React Router 6
- **Styling**: Tailwind CSS 3.4 with CSS-var tokens (no hardcoded hex)
- **Charts**: Recharts 2.15
- **Icons**: Lucide React
- **Dates**: date-fns 3.6
- **Drag-drop**: dnd-kit
- **Animation**: Framer Motion
- **Monitoring**: Sentry
- **Backend**: Supabase (PostgreSQL + Auth + RLS, owner-only policies)
- **AI**: OpenAI gpt-4o-mini via Vercel serverless proxy (`/api/ai-advisor.js`)
- **Hosting**: Vercel (static SPA + `/api` serverless functions)

## Shared Infrastructure

- **Auth/Security**: versioned legal + consent audit, password UX, reset flow, reCAPTCHA, phone OTP (mock-mode), email verification, failed-login rate limit, cookie consent
- **Subscriptions**: `subscription_activated` master switch (currently OFF — everything free), 30-day trial → Free Starter or Pro
- **Feature flags**: `app_feature_flags` DB registry + `useFeatureRegistry.js` hook. Ethical-floor rows locked free in code + DB trigger
- **Admin panel**: standalone app at `studyrise-admin/` → admin.studyrise.app (12 screens). See [[Deployment Architecture]]
- **Design system**: `src/components/ui/` — Card2, Button2, Badge2, Bar, Ring, Tabs2, Toggle, Field, KPITile, etc.
- **Notifications**: client-side scheduler with localStorage prefs, quiet hours, 5/day cap. FCM/APNs deferred

## Deferred / Parked

- MBBS R10+ (clinical posting cards, OSPE, resources, internship) — flag-gated
- Payments (bKash/Nagad + Stripe) — blocked on pricing
- Server-side notification cron + native push
- Canvas REST grades sync-back
- Syllabus-PDF AI parsing
- OTP Twilio swap (mock mode now)
- 2FA authenticator apps

## Related Pages

- [[App Features Spec]] — screen-level feature list per mode
- [[Deployment Architecture]] — Vercel setup, env vars, deploy commands
- [[MBBS Bangladesh Module]] — MBBS mode deep dive
- [[Migration & Schema History]] — database evolution
- [[Component Architecture]] — source tree by mode
- [[Feature Flags Registry]] — what's gated, what's free
- [[Pricing Strategy]] — freemium model
