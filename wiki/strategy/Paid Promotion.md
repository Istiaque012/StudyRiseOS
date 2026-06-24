---
title: Paid Promotion
type: strategy
sources: [raw/brain-v1/10C_PAID_PROMOTION.md]
created: 2026-06-25
updated: 2026-06-25
---

# Paid Promotion

Decision framework for when and how to spend money on social advertising. Designed for a bootstrapped solo founder with $0–500/month. Organic is the foundation — paid amplifies what's already working. Companion to [[Social Playbook]], [[Social Content Formats]], and [[Social Calendar]].

## Spend-Readiness Checklist

All five must be "yes" before spending $1:
1. Product stable (no critical bugs, onboarding works)
2. Landing page / article live and passing technical gate
3. 3–5 organic posts performing well on target platform
4. Can commit ≥$5/day for ≥7 consecutive days
5. Specific success metric defined (a number, not "visibility")

## Budget Tiers

| Tier | Monthly | Use |
|---|---|---|
| **$0** | Default | Most months — organic only |
| **Micro** | $50–150 | Boost 2–3 top organic posts |
| **Starter** | $150–300 | One focused campaign + occasional boosts |
| **Growth** | $300–500 | Two simultaneous campaigns (e.g., traffic + retargeting) |

Rules: 70/30 split (best campaign / testing). Retargeting gets priority if only one campaign. Kill underperformers within 7 days. Never increase budget >20%/day.

## Platform Selection by Segment

| Segment | Primary Paid | Why | Skip |
|---|---|---|---|
| [EXAM] AMC | Meta (FB+IG) | IMGs active in FB groups; location+interest targeting works | LinkedIn (too expensive) |
| [MBBS-BD] | Facebook | Bangladesh dominant; CPM ~$1–3 | IG, LinkedIn |
| [UNI] | Instagram | Students are IG-first; Reels ads perform | LinkedIn |

### Cost Benchmarks (2026)

| Metric | FB Global | FB Australia | FB Bangladesh | IG Global | YouTube |
|---|---|---|---|---|---|
| CPC | ~$0.83 | $0.80–2.50 | $0.05–0.20 | $1.50–3.50 | $0.10–0.30 |
| CPA (registration) | $5–15 | $8–20 | $0.50–3 | $8–20 | $3–10 |

Bangladesh is 10–20× cheaper per action than Australia.

## Funnel-Stage Campaigns

| Stage | Objective | Promote | Budget Share |
|---|---|---|---|
| **Awareness** | Traffic / Video Views | Blog articles, tip Reels | 40% |
| **Consideration** | Traffic | Landing pages, walkthrough videos | 30% |
| **Conversion** | Registrations | Registration page with UTM | 30% |

## Audience Targeting Blueprints

- **[EXAM] AMC**: Australia primary + IMG source countries. Interests: Medical, USMLE, IELTS, AMC. Age 25–40. Retarget `/amc-study-planner` and `/blog/amc-*` visitors.
- **[MBBS-BD]**: Bangladesh only. Interests: Medical, MBBS, major medical colleges. Age 18–28. **Maximum restraint in copy. Never run during exam weeks. Never imply Pro needed to pass. BDT pricing only.**
- **[UNI]**: English-speaking countries. Interests: University, study tips. Age 18–25. Retarget `/study-planner` visitors.

## Retargeting (Highest-ROI Spend)

Four pixel audiences to create:
1. All visitors who didn't register (30 days)
2. Article readers (14 days)
3. Landing page visitors (14 days) — high intent
4. Registration started but incomplete (7 days) — highest intent

Rules: don't repeat what they saw, frequency cap 3–5/week, $3–5/day sufficient under 5K visitors/month.

## Ready-to-Run Playbooks

| Playbook | Trigger | Budget | Duration |
|---|---|---|---|
| **A: Boost organic** | Post gets 2–3× normal engagement | $5–10/day | 3–5 days |
| **B: Promote article** | Flagship article launches | $5–10/day | 7 days |
| **C: Retarget visitors** | 500+ monthly visitors + working pixel | $3–5/day | Always on |
| **D: MBBS-BD seasonal** | 4–6 weeks before May/Nov exams | $3–5/day | 3–4 weeks (hard stop 1 week before exams) |
| **E: YouTube pre-roll** | Strong 15–30s video ad ready | $5–10/day | 7–14 days |

## Ad Creative Rules

- CTA: "Try StudyRise free" / "Start free — no card required." Banned phrases per [[11_PRICING_MODEL]] §7.2
- Brand palette + [[Brand Visual System]] font stack only. No stock photos, no face on camera.
- 3-second test: viewer must understand what this is and who it's for within 3 seconds
- 3–5 variations per campaign; kill bottom 2 after 7 days
- Refresh creative every 3 weeks maximum

## KPIs (Early-Stage EdTech)

| Metric | Target |
|---|---|
| Cost per registration | <$5 global, <$1 Bangladesh |
| Registration rate | >5% (landing page), >2% (article) |
| CPC | <$1 FB, <$2 IG |
| CTR | >1% feed, >0.5% Stories |

Ignore: raw impressions, reach, 3-second video views, CPM in isolation.

## Tracking

UTM on every ad link: `utm_source={platform}&utm_medium=paid_social&utm_campaign={name}&utm_content={variation}`. Meta Pixel: PageView, CompleteRegistration, ViewContent. GA4: page_view, sign_up/complete_registration.

## What Never to Do

- Spend without a measurable goal
- Run ads to pages that haven't passed technical gate
- Run [MBBS-BD] ads during exam weeks (May, Nov)
- Guarantee exam outcomes
- Run more campaigns than you can check daily
- Boost posts that violate brand voice just because they performed

## Sources
- [raw/brain-v1/10C_PAID_PROMOTION.md](../../raw/brain-v1/10C_PAID_PROMOTION.md)
