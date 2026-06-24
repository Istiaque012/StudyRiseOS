---
title: App Features Spec
type: app-dev
sources: [raw/brain-v1/FEATURES.md]
created: 2026-06-24
updated: 2026-06-24
---

# App Features Spec

Comprehensive feature specification for all three modes.

## Exam Mode — 12 Screens
Dashboard, Today, Plan, SR Module, Questions, Mocks, History, Analytics, Mistakes, Settings. AI Study Planner (deterministic, zero OpenAI). Scheduling/rescheduling system.

## University Student Mode — 10 Screens
UniDashboard, SemesterPlan, Grades, Timetable, analytics. LMS iCal import + daily re-sync.

## MBBS Bangladesh Mode
Gate system (attendance/formative/items/prev-prof), dashboard, card tracking. See [[MBBS Bangladesh Module]] for full details.

## Cross-Module
- Free vs Pro gate matrix
- Supabase backend with RLS
- Recharts for analytics
- Framer Motion for animations
- dnd-kit for drag-drop
- Sentry for error tracking

## Data Flow
Cross-module data tables documented. Each mode has isolated tables with shared auth.
