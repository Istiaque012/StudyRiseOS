---
title: Social Playbook
type: strategy
sources: [raw/brain-v1/10_SOCIAL_PLAYBOOK.md, raw/brain-v1/10A_SOCIAL_CONTENT_FORMATS.md, raw/brain-v1/10B_SOCIAL_CALENDAR.md, raw/brain-v1/10C_PAID_PROMOTION.md, raw/brain-v1/10D_CREATIVE_PRODUCTION.md]
created: 2026-06-25
updated: 2026-06-25
---

# Social Playbook

Operating system for StudyRise's social media presence. Defines platforms, audience mapping, voice adaptation, content pillars, and posting rules. Foundation file — companion files (10A formats, 10B calendar, 10C paid, 10D creative production) build on top.

## Account Registry

| Platform | Handle | Primary Audience | Status |
|---|---|---|---|
| Facebook | @studyriseapp | [MBBS-BD], [EXAM] | Active |
| Instagram | @studyrise.app | [UNI], [EXAM] | Active |
| YouTube | @studyriseapp | [ALL] | Active |
| LinkedIn | StudyRise | [EXAM], professional educators | Active |

Every bio follows: **what we are → who it's for → CTA link.** Bio link is always `https://www.studyrise.app/` — never bare domain, never a link tree. Campaign links use UTM parameters (see §UTM below).

### Entity Disambiguation
An unrelated Indian company shares the "StudyRise" name. Every profile must maintain the tagline "Plan Today. Rise Tomorrow.", the canonical URL `www.studyrise.app`, and founder/location context.

## Audience-to-Platform Map

- **[MBBS-BD]**: Primary Facebook (groups, pages, Messenger). Secondary YouTube. Low priority IG/LinkedIn.
- **[EXAM]**: Primary Facebook (IMG groups) + YouTube (study vlogs). Secondary LinkedIn + Instagram. Present everywhere.
- **[UNI]**: Primary Instagram (study aesthetic, Reels) + YouTube Shorts. Secondary Facebook. Low priority LinkedIn.

## Voice Adaptation per Platform

The five [[Brand Voice]] pillars are constant; the *register* shifts:

| Platform | Register | Key Rules |
|---|---|---|
| **Facebook** | Warm, peer-level, community-oriented | 80–200 words, one genuine question, 0–3 hashtags, natural Bangla code-switching for [MBBS-BD] |
| **Instagram** | Visual-first, concise, aspirational-but-real | Image/video required, 3–5 hashtags, Reels primary growth format |
| **YouTube** | Knowledgeable peer explaining clearly | Shorts: hook-first <60s. Long-form: Ali Abdaal register, chapters mandatory, SEO titles |
| **LinkedIn** | Professional, data-informed, founder-building-in-public | First person (Istiaque's voice), 800–1500 chars, lead with strong opener |

## Content Pillars

| Pillar | Share | Audience | Examples |
|---|---|---|---|
| **Study Technique** | 40% | [ALL] | Spaced repetition, active recall, planning methods |
| **Exam Strategy** | 25% | [EXAM] or [MBBS-BD] (never mix exam types) | AMC MCQ strategy, BMDC structure, PLAB prep |
| **Product in Action** | 20% | [ALL] | Screen recordings, feature walkthroughs, before/after |
| **Community & Credibility** | 15% | [ALL] | Founder updates, user stories (with permission), milestones |

### Product in Action Rules
- Never show user data unless dummy/demo or consented
- Screenshots use the real app — never misrepresenting mockups
- CTA is "Try StudyRise free" — follow [[Pricing Strategy]] exactly

## Non-Negotiable Copy Rules

### CTA Language (from [[Pricing Strategy]])
- ✅ "Try StudyRise free" / "Start free — no card required." / "Free for 30 days — every feature, no card required."
- ❌ Banned phrases per [[11_PRICING_MODEL]] §7.2 (social — only OK on pricing page)

### Social-Specific Banned Phrases
"Link in bio" (as entire CTA), "Drop a 🔥 if you agree", "Tag someone who needs this", "No one is talking about this", "This changed everything", "STOP scrolling", "Life hack" / "Study hack" — all banned. Full list in [[Brand Voice]].

### [MBBS-BD] Social Tone
No gamification language, no pressure framing, no Western study-influencer clichés. Warm, calm, locally relevant. Bangla code-switching welcome; full Bangla posts only if Istiaque writes/approves.

### Medical/Exam Facts
Never guess. Every exam fact verified against authoritative source (AMC, GMC, ECFMG, BMDC). BMDC facts from FEATURES.md only. Date-sensitive content includes verification date.

## Image Standards

- Brand palette: Navy (#0D1B3E), purple (#7C3AED), cyan (#06B6D4), blue (#2563EB)
- Typography: Inter for all text overlays
- No stock photos — real screenshots, illustrations, or Canva-generated branded graphics
- See [[Image Protocol]] and [[Brand Visual System]] for full rules

### Platform Dimensions

| Platform | Feed | Story/Reel | Carousel |
|---|---|---|---|
| Facebook | 1200×630 | 1080×1920 | 1080×1080 |
| Instagram | 1080×1080 or 1080×1350 | 1080×1920 | 1080×1080 |
| YouTube | Thumb: 1280×720 | Short: 1080×1920 | N/A |
| LinkedIn | 1200×627 | N/A | 1080×1080 |

## Posting Cadence (Minimum Viable — Solo Operator)

| Platform | Posts/week | Format Split |
|---|---|---|
| Facebook | 3–4 | 2 text/image, 1 video/Reel, 1 article share |
| Instagram | 3–5 | 2 Reels, 1 carousel, 1 static, Stories as needed |
| YouTube | 1–2 | 1 Short/week min; 1 long-form/month min |
| LinkedIn | 2–3 | Text posts + occasional PDF carousel |

Consistency over volume. Batch recording and caption writing.

## Hashtag Clusters

Pre-approved sets — use 3–5 per post, never combine clusters:

- **[EXAM]**: #AMCExam #AMCMCQ #PLAB1 #IMGDoctor #MedicalExam #ExamPrep #StudyPlan
- **[MBBS-BD]**: #MBBS #MBBSBangladesh #BMDC #MedStudentBD #MedicalEducation
- **[UNI]**: #StudyPlanner #UniversityLife #ExamSeason #StudyTips #StudentLife
- **[PRODUCT]**: #StudyRise #PlanTodayRiseTomorrow #StudyPlanning #SpacedRepetition

## Cross-Posting Rules

- Adapt angle/length/tone/CTA per platform — never copy-paste captions
- Never post video with watermarks from other platforms (IG and YT penalise)
- Never reference platform-specific features cross-platform
- Workflow: core idea → primary platform version → adapt to secondary platforms

## UTM Tracking

Every social link to studyrise.app uses:
```
?auth=register&utm_source={platform}&utm_medium=social&utm_campaign={campaign_name}&utm_content={post_id}
```
Sources: `facebook`, `instagram`, `youtube`, `linkedin`. Medium: `social` (organic) or `paid_social` (ads).

## Community Engagement

| Type | Response Time | Owner |
|---|---|---|
| Product question | 4 hours | Istiaque |
| Study question in comments | 24 hours | Istiaque |
| Positive feedback | 24 hours | Istiaque |
| Negative feedback / bug | 4 hours | Istiaque → DM |

Same calm-coach voice. Never argue in comments. Never promote in others' comment sections unless directly relevant.

## Platform Algorithm Notes (2026)

- **Facebook**: Meaningful interactions > passive likes. Video/Reels get broader distribution. Groups > page posts. Link posts get lower reach (put link in first comment for groups).
- **Instagram**: Reels primary discovery. Priority: watch time > shares > saves > comments > likes. Hook by 1.5 seconds. 60–90s Reels perform best. Originality Score penalises cross-posted content.
- **YouTube**: Shorts aggressively pushed to non-subs; completion + replay rate matter. Long-form: CTR + avg view duration. Most search-driven platform.
- **LinkedIn**: Dwell time rewarded. Strong opener critical (first 150 chars). Comments in first hour boost distribution. External links reduce reach.

## Companion Files

| File | Wiki Page | Status |
|---|---|---|
| `10A_SOCIAL_CONTENT_FORMATS.md` | [[Social Content Formats]] | ✅ Ingested |
| `10B_SOCIAL_CALENDAR.md` | [[Social Calendar]] | ✅ Ingested |
| `10C_PAID_PROMOTION.md` | [[Paid Promotion]] | ✅ Ingested |
| `10D_CREATIVE_PRODUCTION.md` | [[Creative Production]] | ✅ Ingested |

## Sources
- [raw/brain-v1/10_SOCIAL_PLAYBOOK.md](../../raw/brain-v1/10_SOCIAL_PLAYBOOK.md)
- [raw/brain-v1/10A_SOCIAL_CONTENT_FORMATS.md](../../raw/brain-v1/10A_SOCIAL_CONTENT_FORMATS.md)
- [raw/brain-v1/10B_SOCIAL_CALENDAR.md](../../raw/brain-v1/10B_SOCIAL_CALENDAR.md)
