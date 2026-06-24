---
title: Content Pipeline
type: strategy
sources: [raw/brain-v1/05_CONTENT_PIPELINE.md]
created: 2026-06-24
updated: 2026-06-25
---

# Content Pipeline

Master content queue rebuilt 2026-06-22 from SERP research. 41 pieces across 4 flagship pillars and 5 clusters.

## Structure
- **Segment landing pages** — one per audience mode
- **Blog hub** + 4 category pages
- **4 Flagship Pillars** — cornerstone long-form articles
- **5 Clusters** (A/B/D/E/F) — topical article groups

## Wave Plan
- **Wave 1** — Foundation: segment pages + flagships
- **Wave 2** — Cluster build-out
- **Wave 3** — Product-incorporation articles
- **Wave 4** — Expansion (PLAB/USMLE currently parked)

## Key Target Keywords
- "how to make a study plan" → flagship
- "spaced repetition for exams" → flagship
- "what is studyrise" → brand article
- "amc mcq study plan" → [EXAM] cluster
- BMDC-related keywords → [MBBS-BD] cluster

## Status Tracking
Each piece has: status (idea/queued/writing/deployed), target keyword, SERP difficulty (qualitative), audience segment, wave assignment.

## Live Article Maintenance
Published articles tracked with: URL, publish date, last refresh, performance notes.

### Deployed Articles & Landing Pages
| Slug | Title | Audience | Keyword | Published | Status |
|---|---|---|---|---|---|
| amc-mcq-pass-standard-2026 | The 2026 AMC MCQ Pass-Standard Change — What It Means for You | [EXAM] | amc mcq pass standard 2026 | 2026-06-25 | deployed |
| study-planner | Study Planner App — Turn Your Syllabus Into a Daily Plan | ALL | study planner | 2026-06-25 | deployed |
| amc-study-planner | AMC MCQ Study Planner App for IMGs | [EXAM] | amc mcq study planner | (live) | deployed |

> `/study-planner` ⚠️ uses `/og-image.png` as a fallback OG — make a dedicated `study-planner-og.webp` per [[Image Protocol]] when convenient. Links out to `/amc-study-planner`; linked from nav, footer, and 3 blog "related" cards.

### Resolved (from [[SEO Remediation 2026-06]])
- ~~`/amc-mcq-study-planner` landing page~~ — not needed; `/amc-study-planner` already exists and serves this transactional intent. Ghost slug removed from routing.
- ✅ Slug rename 301 shipped: `/blog/how-to-pass-amc-mcq-in-4-months` → `/blog/amc-mcq-study-plan`.

## Backlog
PLAB 1 and USMLE content parked until Exam Mode gains traction in those markets.
