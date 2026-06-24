# 10C · PAID PROMOTION — Advertising Playbook

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> **What this file is.** The decision framework for when and how to spend money on social media advertising. It covers budget allocation for a bootstrapped solo founder, platform-specific ad specs, audience targeting blueprints for each segment, retargeting setup, campaign types mapped to the funnel, and realistic KPI benchmarks for an early-stage edtech. This file tells you when spending is worth it, when it's not, and how to avoid wasting money.

> **Depends on:** `10_SOCIAL_PLAYBOOK.md` (voice, account registry, platform specs), `10A_SOCIAL_CONTENT_FORMATS.md` (creative templates), `10B_SOCIAL_CALENDAR.md` (paid triggers and seasonal timing), `11_PRICING_MODEL.md` (CTA + pricing copy rules), `02_BRAND_VOICE.md` (tone).

> **Key principle:** At StudyRise's stage, organic content is the foundation. Paid promotion amplifies what's already working — it doesn't replace content quality or product readiness. Never spend money to drive traffic to a broken experience or content that doesn't exist yet.

---

## 1. Should You Spend Money Right Now?

Before allocating any budget to paid promotion, run through this checklist. If you can't answer "yes" to all five, spend $0 on ads and invest the time in organic content instead.

### 1.1 The spend-readiness checklist

| # | Question | Why it matters |
|---|---|---|
| 1 | Is the product stable? (No critical bugs, onboarding works, core features function) | Paid traffic to a broken product burns money and first impressions. |
| 2 | Is the landing page or article you want to promote live and passing the Pre-Delivery Technical Gate? | Don't advertise content that doesn't exist or has errors. |
| 3 | Do you have at least 3–5 pieces of organic content performing well on the target platform? | The algorithm uses your existing engagement signals to find similar audiences. Cold accounts with no organic presence pay more for worse results. |
| 4 | Can you commit to at least $5/day for at least 7 consecutive days? | Below this threshold, the algorithm can't exit the learning phase and your data is meaningless. |
| 5 | Do you know what success looks like for this campaign? (A specific number — registrations, article views, followers) | "More visibility" is not a goal. A number is. |

**If the answer to any of these is "no":** stop. Build organic content, fix the product, or define the goal first. Come back when all five are "yes."

---

## 2. Budget Framework for a Bootstrapped Founder

StudyRise is bootstrapped. Every dollar matters. This framework is designed for $0–500/month in ad spend — not enterprise budgets.

### 2.1 Budget tiers

| Tier | Monthly spend | What's possible | When to use |
|---|---|---|---|
| **$0** | Nothing | Organic only. This is the default. | Always the starting point. Most months should be here. |
| **Micro** | $50–150/month | Boost 2–3 top-performing organic posts. Test one audience. | When you have a post that's performing well organically and you want to amplify it. |
| **Starter** | $150–300/month | One focused campaign (traffic or conversions) + occasional boosts. | When you have a specific article or landing page to promote and a clear audience target. |
| **Growth** | $300–500/month | Two campaigns running simultaneously (e.g., traffic + retargeting). | When organic + content is established, product is stable, and you're ready to scale signups. |

### 2.2 Allocation rules

- **Never spend more than you can afford to lose.** Treat ad spend as experimentation budget, not guaranteed ROI.
- **70/30 split:** 70% of budget on the single best-performing campaign. 30% on testing new audiences or creatives. Don't spread thin across five campaigns at $3/day each.
- **Retargeting gets priority.** If you can only afford one campaign, retarget site visitors who didn't register. These people already know you — converting them is 5–10× cheaper than acquiring cold traffic.
- **Kill what doesn't work within 7 days.** If a campaign shows no signal of working after 7 days and 50+ link clicks, turn it off. Don't "give it more time" on a $5/day budget.

### 2.3 The math behind minimum budget

Meta's algorithm needs approximately 50 conversion events per ad set per week to exit the learning phase and optimise effectively. Work backward:

```
Target CPA × 50 ÷ 7 = minimum daily budget per ad set

Example (registration as conversion):
  If target CPA is $2 → ($2 × 50) ÷ 7 = ~$14/day = ~$420/month
  If target CPA is $1 → ($1 × 50) ÷ 7 = ~$7/day = ~$210/month
```

At StudyRise's stage, you probably won't hit 50 conversions/week on a small budget. That's fine — optimise for link clicks (a more achievable event) and track registrations as a secondary metric. Switch to conversion optimisation once you have enough pixel data (typically after 200+ total conversions).

---

## 3. Platform Selection for Paid

Not every platform deserves ad spend. Choose based on where your audience is and where your budget goes furthest.

### 3.1 Platform recommendation by segment

| Segment | Primary paid platform | Why | Secondary | Skip |
|---|---|---|---|---|
| **[EXAM] AMC** | Facebook + Instagram (Meta) | IMGs are active in Facebook groups; Instagram catches the planning-aesthetic audience. Meta's targeting by location (Australia) + interest (medical, USMLE, IELTS) works well. | YouTube (pre-roll on medical study content) | LinkedIn (too expensive for this goal) |
| **[MBBS-BD]** | Facebook (Meta) | Bangladesh's dominant social platform. Extremely low CPM (~$1–3 in BD). | YouTube (pre-roll) | Instagram, LinkedIn (low audience overlap) |
| **[UNI]** | Instagram (Meta) | University students are Instagram-first. Reels ads perform well for this demographic. | YouTube Shorts ads | Facebook (lower relevance for global uni students), LinkedIn |

### 3.2 Platform-specific ad costs (2026 benchmarks)

These are reference ranges. Your actual costs will vary by creative quality, targeting, and competition.

| Metric | Facebook (global avg) | Facebook (Australia) | Facebook (Bangladesh) | Instagram (global avg) | YouTube |
|---|---|---|---|---|---|
| CPM | ~$11 | $8–18 | $1–3 | ~$12 | $4–10 |
| CPC | ~$0.83 | $0.80–2.50 | $0.05–0.20 | ~$1.50–3.50 | $0.10–0.30 |
| CPA (registration) | $5–15 (edtech avg) | $8–20 | $0.50–3 | $8–20 | $3–10 |

**Key insight:** Bangladesh is extraordinarily cheap for Facebook ads. A $50/month budget in Bangladesh can generate meaningful reach. Australia is 10–20× more expensive per action — spend there only with strong creative and clear targeting.

---

## 4. Campaign Types Mapped to the Funnel

### 4.1 The three campaign types StudyRise should use

```
AWARENESS (cold audience)       → "This exists and it's useful"
CONSIDERATION (warm audience)   → "Here's why it's worth trying"
CONVERSION (hot audience)       → "Sign up now"
```

| Stage | Meta objective | What you promote | Creative type | CTA | Budget share |
|---|---|---|---|---|---|
| **Awareness** | Traffic or Video Views | Blog article or study-tip Reel | Value-first content. No hard sell. Article excerpt, tip video, data graphic. | "Read more" or no CTA (let the content do the work) | 40% of spend |
| **Consideration** | Traffic | Landing page (`/study-planner`, `/amc-study-planner`, `/mbbs-bangladesh`) or product walkthrough video | Before/after (S4), screen recording (V1), comparison carousel (C2) | "Try StudyRise free" | 30% of spend |
| **Conversion** | Conversions (optimise for registration) | Registration page (`/?auth=register` with UTM) | Direct benefit statement + demo screenshot + CTA | "Start free — no card required." | 30% of spend |

### 4.2 Campaign structure (simplified)

Keep it simple. One campaign per objective. One ad set per audience. 3–5 ad variations per ad set. That's it.

```
Campaign: [EXAM] AMC — Traffic
  └── Ad Set: Australia, 25–45, broad + interest suggestions
        ├── Ad 1: Article excerpt (image + link)
        ├── Ad 2: Tip video (Reel format)
        └── Ad 3: Stat card (S1) + link

Campaign: [EXAM] AMC — Retargeting
  └── Ad Set: Website visitors (last 30 days) who didn't register
        ├── Ad 1: Before/after screenshot (S4)
        ├── Ad 2: Screen recording walkthrough (V1)
        └── Ad 3: Direct benefit + CTA
```

---

## 5. Audience Targeting Blueprints

In 2026, Meta's Advantage+ handles most targeting automatically. Your job is to give the algorithm the right signals, not micromanage demographics. These blueprints define the signals.

### 5.1 [EXAM] AMC — Targeting blueprint

**Location (hard constraint):** Australia (primary). India, Pakistan, UK, Bangladesh, Philippines, Egypt, Sri Lanka (secondary — these are top IMG source countries).

**Interest suggestions (not hard constraints):** Medical, USMLE, IELTS, Medical licensing, Pearson VUE, Australian Medical Council. Let Advantage+ expand from these.

**Age suggestion:** 25–40. Most IMGs sit the AMC in this range.

**Custom audiences (when pixel data is available):**
- Website visitors: last 30 days, visited `/amc-study-planner` or `/blog/amc-*`
- Lookalike: 1–3% of website visitors (requires 1,000+ visitors in the source audience)

**Exclusions:** Exclude existing registered users (when a customer list is available).

**Creative angle:** "You have 4 months. Here's the plan." / "AMC MCQ pass rates are ~50%. Structure is what separates passers from failers."

### 5.2 [MBBS-BD] — Targeting blueprint

**Location (hard constraint):** Bangladesh.

**Interest suggestions:** Medical, MBBS, Medical student, Dhaka Medical College, Mymensingh Medical College (and other major medical colleges as interests if available). Bangla-language content targeting.

**Age suggestion:** 18–28.

**Custom audiences:**
- Website visitors: last 30 days, visited `/mbbs-bangladesh`
- Facebook page engagers: last 90 days

**Creative angle:** "Track your attendance, formatives, and eligibility — all in one place." / Calm, practical — never pressure framing.

**Special rules:**
- **Maximum restraint in ad copy.** The [MBBS-BD] tone rules from `02_BRAND_VOICE.md` apply doubly to paid content, because ads reach people who didn't choose to see them.
- **Never run ads during professional exam weeks (May, November).**
- **Never imply a student needs Pro to pass.** The ethical floor is free.
- **BDT pricing only** in any ad that mentions cost. Never USD for this audience.

### 5.3 [UNI] — Targeting blueprint

**Location:** Broad — start with English-speaking countries (US, UK, Canada, Australia, NZ). Add Bangladesh if running BDT-priced campaigns.

**Interest suggestions:** University, College, Study tips, Exam preparation, Student life. Let Advantage+ expand.

**Age suggestion:** 18–25.

**Custom audiences:**
- Website visitors: last 30 days, visited `/study-planner` or blog articles tagged [UNI]
- Instagram engagers: last 90 days

**Creative angle:** "Plan your semester in 15 minutes." / "Your study planner, finally." / Visual-first, clean, aspirational-but-real.

---

## 6. Retargeting — The Highest-ROI Spend

If you only spend money on one thing, spend it on retargeting. People who have already visited studyrise.app and didn't register are the warmest audience you have.

### 6.1 Retargeting setup (Meta Pixel)

**Prerequisites:**
- Meta Pixel installed on `www.studyrise.app` (all pages). The pixel fires on page load.
- Conversions API (CAPI) configured for server-side event tracking (more reliable than pixel alone).
- Registration event (`CompleteRegistration`) fires when a user completes `/?auth=register`.

**Retargeting audiences to create:**

| Audience name | Source | Window | Use for |
|---|---|---|---|
| All visitors — didn't register | Pixel: all page views, exclude `CompleteRegistration` | Last 30 days | Primary retargeting |
| Article readers | Pixel: visited any `/blog/*` URL | Last 14 days | Content retargeting — serve product-focused ads |
| Landing page visitors | Pixel: visited `/study-planner`, `/amc-study-planner`, `/mbbs-bangladesh` | Last 14 days | High-intent retargeting — serve conversion ads |
| Registration started — didn't complete | Pixel: visited `/?auth=register` but no `CompleteRegistration` event | Last 7 days | Highest-intent retargeting — "Still thinking about it?" |

### 6.2 Retargeting creative rules

- **Don't repeat what they already saw.** If they read the AMC article, don't serve them the same article. Show them the product — a screen recording, a before/after, a direct benefit statement.
- **Frequency cap:** 3–5 impressions per person per week maximum. Beyond this, you're annoying them.
- **CTA:** "Try StudyRise free — no card required." Direct and clear. They've already seen the value proposition — now remove friction.
- **Budget:** $3–5/day is enough for retargeting when your website traffic is under 5,000 visitors/month.

---

## 7. Ad Creative Rules

All ad creative follows the brand voice and pricing rules. These are the ad-specific additions.

### 7.1 Copy rules for ads

| ✅ Always | ❌ Never |
|---|---|
| "Try StudyRise free" | "Free trial" |
| "Start free — no card required." | "Premium" / "Unlock" |
| "Free for 30 days — every feature, no card required." | "Upgrade" (banned in ads — only pricing page) |
| Lead with the benefit, not the feature | "Download now!" (we're a web app, not a download) |
| Honest claims only — never guarantee outcomes | "Pass your exam guaranteed" |
| Specific numbers: "4-month plan," "20 cards/day" | Vague hype: "Revolutionary study tool" |

### 7.2 Visual rules for ads

- **Brand palette only.** Navy (#0D1B3E), purple (#7C3AED), cyan (#06B6D4), blue (#2563EB), white.
- **Inter font** for all text overlays.
- **No stock photos.** Use real screenshots, branded graphics, or screen recordings.
- **No face on camera.** Consistent with the organic content approach.
- **Thumbnails and static images:** Use templates S1–S4 from `10A_SOCIAL_CONTENT_FORMATS.md` with the AI image prompts.
- **Video ads:** Use templates V1–V4 from `10A_SOCIAL_CONTENT_FORMATS.md`. 15–60 seconds. Vertical (9:16) for Stories/Reels placement. Square (1:1) for feed placement.

### 7.3 The 3-second test

Every ad creative must pass this test: **if someone sees only the first 3 seconds (or the first glance of a static image), do they understand what this is and who it's for?**

- Good: A screen recording of a study planner with text overlay "Plan your AMC MCQ in under 2 minutes."
- Bad: A gradient background with the StudyRise logo slowly fading in.

### 7.4 Ad variation framework

For every campaign, produce 3–5 creative variations to test. Use this framework:

| Variation | Hook type | Format | Example |
|---|---|---|---|
| A | Specific outcome | Static image (S1/S4) | "Set up a 16-week AMC plan in under 2 minutes." |
| B | Question | Video (V2) | "Why do 50% of AMC candidates fail?" |
| C | Pain point | Carousel (C1) | "Your study plan fails by week 3. Here's why." |
| D | Social proof (when available) | Static + testimonial | "I wish I had this when I was studying for AMC." |
| E | Direct benefit | Screen recording (V1) | "Here's what your analytics dashboard shows after 2 weeks." |

Run all variations simultaneously. After 7 days and 1,000+ impressions per variation, kill the bottom 2 and scale the top 2.

---

## 8. Ad Specs Quick Reference

### 8.1 Meta (Facebook + Instagram)

| Placement | Dimensions | Max file size | Video length | Text limits |
|---|---|---|---|---|
| Feed (image) | 1080×1080 (square) or 1080×1350 (portrait) | 30 MB | — | Primary: 125 chars. Headline: 40 chars. Description: 30 chars. |
| Feed (video) | 1080×1080 or 1080×1350 | 4 GB | 1–240 sec (15–60 rec.) | Same as image |
| Stories / Reels | 1080×1920 (9:16) | 4 GB | 1–60 sec (15–30 rec.) | Minimal text — overlay in creative |
| Carousel | 1080×1080 per card | 30 MB/card | 1–60 sec/card | Same as feed |

### 8.2 YouTube

| Placement | Dimensions | Max file size | Video length | Notes |
|---|---|---|---|---|
| In-feed (discovery) | 1920×1080 or 1080×1920 | — | Any | Thumbnail + title drive clicks |
| Shorts ads | 1080×1920 (9:16) | — | 10–60 sec | Skippable. Hook must land in 3 sec. |
| Pre-roll (skippable) | 1920×1080 | — | 15–180 sec | User can skip after 5 sec. Deliver value before the skip. |

### 8.3 LinkedIn (reference only — low priority for StudyRise)

| Placement | Dimensions | Text limits |
|---|---|---|
| Single image | 1200×627 | Intro: 150 chars (before truncation). Headline: 70 chars. |
| Video | 1920×1080 or 1080×1080 | 3 sec–30 min (15–30 sec rec.) |
| Document (carousel) | PDF, 1080×1080 per page | Up to 10 pages |

---

## 9. Measurement and KPIs

### 9.1 Metrics that matter (ranked by importance)

| Rank | Metric | What it tells you | Target (early-stage edtech) |
|---|---|---|---|
| 1 | **Cost per registration** | How much it costs to acquire a new user | < $5 (global avg), < $1 (Bangladesh) |
| 2 | **Registration rate** | % of ad clickers who register | > 5% (landing page), > 2% (article) |
| 3 | **Cost per click (CPC)** | How efficiently you're driving traffic | < $1 (Facebook), < $2 (Instagram) |
| 4 | **Click-through rate (CTR)** | How compelling your creative is | > 1% (feed), > 0.5% (Stories) |
| 5 | **Frequency** | How often the same person sees your ad | < 3 per week (cold), < 5 per week (retargeting) |
| 6 | **ROAS** | Return on ad spend | Not measurable yet (no payment gateway). Track registrations per dollar instead. |

### 9.2 Metrics that don't matter (ignore these)

| Metric | Why it's misleading |
|---|---|
| Impressions | High impressions with low clicks = bad creative, not good reach. |
| Reach | Meaningless without engagement. |
| Post engagement (likes) | Likes don't pay bills. Track clicks and registrations. |
| Video views (3-second) | Meta counts a 3-second view as a "view." It's almost meaningless. Track 50%+ view rate instead. |
| CPM in isolation | A low CPM with a high CPA means you're reaching cheap-but-wrong people. |

### 9.3 Tracking setup

**UTM parameters (mandatory on every ad link):**
```
https://www.studyrise.app/?auth=register
  &utm_source={platform}
  &utm_medium=paid_social
  &utm_campaign={campaign_name}
  &utm_content={ad_variation}
```

**GA4 events to track:**
- `page_view` — baseline (automatic)
- `sign_up` or custom `complete_registration` — the conversion event
- Source/medium report filtered to `paid_social` — weekly review

**Meta Pixel events:**
- `PageView` — all pages (automatic with pixel)
- `CompleteRegistration` — fires on successful registration
- `ViewContent` — fires on article pages (for retargeting audience building)

---

## 10. Campaign Playbooks — Ready to Run

### 10.1 Playbook A: Boost a top-performing organic post

**When:** An organic post gets 2–3× your normal engagement within 24 hours.
**Budget:** $5–10/day for 3–5 days.
**How:** Use Meta's "Boost Post" button (simple) or create a campaign with the Engagement objective (more control). Target the post's natural audience — if it's an [EXAM] post, target AMC-relevant countries and interests.
**Goal:** Amplify reach. Don't change the post — it's already working.
**Kill condition:** If CPC exceeds $2 after 48 hours, stop.

### 10.2 Playbook B: Promote a new article

**When:** A flagship or high-priority article launches.
**Budget:** $5–10/day for 7 days.
**Objective:** Traffic.
**Audience:** Segment-matched targeting blueprint (§5).
**Creative:** 3 variations — article excerpt image, stat card, short video teaser.
**Landing page:** The article URL with UTM parameters.
**Goal:** 500+ article views, 10+ registrations from in-article CTAs.
**Kill condition:** If CTR < 0.5% after 3 days, refresh creative. If still low after 5 days, stop.

### 10.3 Playbook C: Retarget site visitors

**When:** You have 500+ monthly visitors to studyrise.app and a working pixel.
**Budget:** $3–5/day, always on.
**Objective:** Conversions (optimise for registration).
**Audience:** "All visitors — didn't register" (last 30 days). See §6.1.
**Creative:** Before/after screenshots, screen recording walkthrough, direct benefit + CTA.
**Landing page:** `/?auth=register` with UTM.
**Goal:** Convert 5–10% of retargeted visitors.
**Kill condition:** If CPA exceeds $10 (global) or $3 (Bangladesh) after 14 days, refresh creative.

### 10.4 Playbook D: Pre-exam seasonal push ([MBBS-BD])

**When:** 4–6 weeks before May or November professional exams. **Stop ads 1 week before exams begin.**
**Budget:** $3–5/day for 3–4 weeks.
**Objective:** Traffic → `/mbbs-bangladesh` landing page.
**Audience:** Bangladesh, 18–28, interest suggestions: Medical, MBBS.
**Creative:** Calm, practical. "Track your eligibility — attendance, formatives, components — in one place." Screen recording of the eligibility dashboard. **No pressure framing. No countdown urgency.**
**Kill condition:** Standard CPC/CTR thresholds. **Hard stop 1 week before exams regardless of performance.**

### 10.5 Playbook E: YouTube pre-roll on medical study content

**When:** You have a strong 15–30 second video ad (adapted from V2 or V3).
**Budget:** $5–10/day for 7–14 days.
**Objective:** Video views → website traffic.
**Audience:** YouTube viewers of medical study content, AMC preparation videos, PLAB preparation videos. Target by topic/keyword: "AMC MCQ preparation," "PLAB 1 study plan," "medical exam study tips."
**Creative:** 15–30 second video. Hook in first 5 seconds (before skip). Value statement + CTA: "Try StudyRise free — link below."
**Goal:** 1,000+ views at 50%+ watch rate. Track clicks to studyrise.app.
**Kill condition:** If 50%+ view rate drops below 20% after 7 days, creative isn't working.

---

## 11. What Never to Do with Paid Promotion

| Rule | Why |
|---|---|
| Never spend money without a specific, measurable goal | "More visibility" is not a goal. "50 registrations this month" is. |
| Never run ads to a page that hasn't passed the Pre-Delivery Technical Gate | Broken pages waste money and damage first impressions permanently. |
| Never run [MBBS-BD] ads during exam weeks (May, November) | Tone-deaf, wasteful, and violates the restrained-tone principle. |
| Never use "premium," "unlock," "free trial," or "upgrade" in ad copy | Banned words from `11_PRICING_MODEL.md`. No exceptions for paid. |
| Never guarantee exam outcomes in ad copy | "Pass your AMC guaranteed" is dishonest and violates the Trustworthy pillar. |
| Never run the same creative for more than 3 weeks without refreshing | Creative fatigue sets in. Performance degrades. Refresh or kill. |
| Never increase budget by more than 20% per day | Large budget jumps reset the learning phase and spike costs. Scale gradually. |
| Never run more campaigns than you can check daily | At this budget level, you are the media buyer. If you can't review it every morning, don't run it. |
| Never run ads when the product has known critical bugs | Fix first, promote second. |
| Never boost a post that violates brand voice rules just because it performed well | Engagement from the wrong tone builds the wrong audience. |

---

## 12. Monthly Paid Review Checklist

On the **1st of each month**, review the previous month's paid activity:

1. **Total spend** — was it within the planned tier (§2.1)?
2. **Registrations from paid** — how many? What was the CPA?
3. **Best-performing creative** — which variation won? Why?
4. **Worst-performing creative** — what can you learn from it?
5. **Audience insights** — any surprising demographics in the converting audience?
6. **Next month's plan** — maintain, increase, decrease, or pause spend?
7. **Creative refresh needed?** — is any ad older than 3 weeks?

Log the answers in a simple monthly note. Over time, this builds a record of what works for StudyRise's specific audiences.

---

## CHANGELOG

| Date | Change |
|---|---|
| 2026-06-25 (v1) | File created. Spend-readiness checklist. Budget framework for bootstrapped founder ($0–500/month tiers). Platform selection by segment with 2026 cost benchmarks. Three funnel-stage campaign types. Audience targeting blueprints for [EXAM] AMC, [MBBS-BD], [UNI] with Meta Advantage+ 2026 approach. Retargeting setup (pixel audiences, creative rules, frequency caps). Ad creative rules aligned with 02_BRAND_VOICE.md and 11_PRICING_MODEL.md. Ad specs for Meta, YouTube, LinkedIn. KPI benchmarks for early-stage edtech. Five ready-to-run campaign playbooks. Monthly review checklist. |

---

<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
