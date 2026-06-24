---
title: MBBS Bangladesh Module
type: app-dev
sources: [raw/brain-v1/00_MBBS_INDEX.md, raw/brain-v1/02_MBBS_PRODUCT_SPEC.md]
created: 2026-06-24
updated: 2026-06-24
---

# MBBS Bangladesh Module

BMDC-faithful digital twin of the paper Continuous Assessment Card for Bangladeshi medical students.

## R3.0 Redesign Thesis
The module is a **digital twin** — it mirrors exactly what BMDC 2021 prescribes. No gamification. No social features. No content platform. Just the card, made digital.

## Design Principles
1. BMDC 2021 is the single source of truth
2. Additive-only migrations — never break existing data
3. Flag-gate every feature
4. Ethical-floor features always free
5. Never break Exam or University modes

## Build Order (10 Sessions)
R0 → R9, each with explicit dependencies. See [[MBBS Build Sessions]] for prompts.

## Key Features
- 4 professional phases with eligibility gates
- Per-subject card/item tracking (Anatomy 9 cards, Physiology 8, etc.)
- Attendance tracking per class type
- Formative assessment (embedded 10%)
- Two-board oral examinations
- Integrated teaching tracker
- Field placements
- Pass probability projection
- Phase-1 lockout enforcement

## What It Is NOT
- Not a content/MCQ platform
- Not a social network
- Not gamified (no streaks, badges, leaderboards for MBBS-BD)

## Related
[[BMDC Curriculum Reference]], [[MBBS Data Model]], [[MBBS Decisions Log]], [[MBBS Build Log]]
