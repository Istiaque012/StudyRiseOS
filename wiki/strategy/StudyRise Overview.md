---
title: StudyRise Overview
type: overview
sources: [raw/brain-v1/01_CONTEXT.md, raw/brain-v1/FEATURES.md, raw/brain-v1/README.md]
created: 2026-06-24
updated: 2026-06-24
---

# StudyRise Overview

StudyRise is a study-planning web app at **studyrise.app** serving three distinct audience modes:

## Three Modes

1. **Exam Mode [EXAM]** — For anyone preparing for a high-stakes exam (AMC MCQ, PLAB 1, USMLE). 12 screens: Dashboard, Today, Plan, Spaced Repetition, Questions, Mocks, History, Analytics, Mistakes, Settings. Deterministic AI Study Planner (zero OpenAI calls).

2. **University Student Mode [UNI]** — For university students managing semester workload. 10 screens: Dashboard, SemesterPlan, Grades, Timetable, analytics. LMS iCal import with daily re-sync.

3. **MBBS Bangladesh Mode [MBBS-BD]** — For Bangladeshi medical students following BMDC 2021 curriculum. Digital twin of the paper Continuous Assessment Card. See [[MBBS Bangladesh Module]] for details.

## Tech Stack
- Vite + React frontend on Vercel (project: studyrise)
- Separate admin app (admin.studyrise.app, project: studyrise-admin)
- Supabase backend (auth, database, RLS)
- 6 serverless API functions
- Static HTML pages for SEO surface (blog, landing pages)

## Business Model
Freemium — 30-day full access, then Free Starter or Pro. See [[Pricing Strategy]].

## Canonical Domain
`https://www.studyrise.app/` — always with www, always HTTPS.

## Key Identifiers
- Google Analytics: G-R38JK89PP5
- Vercel project ID: prj_s8R4XujA5enEEHqzph8N6wJPWBhx
- Admin Vercel project ID: prj_IDGEh1AkamPQhb654NdaDHXyrBc6
