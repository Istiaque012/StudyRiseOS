---
title: Deployment Architecture
type: app-dev
sources: [raw/brain-v1/deployment-architecture.md]
created: 2026-06-24
updated: 2026-06-24
---

# Deployment Architecture

## Two Vercel Projects, One Repo
- **studyrise** (prj_s8R4XujA5enEEHqzph8N6wJPWBhx) → studyrise.app
- **studyrise-admin** (prj_IDGEh1AkamPQhb654NdaDHXyrBc6) → admin.studyrise.app

Both are independent Vite apps in one GitHub repo. Main branch triggers both simultaneously.

## Env Vars
- Public vars need `VITE_` prefix
- Secrets (SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY) — server-side only, no VITE_ prefix

## Serverless Functions
6 API functions under `api/*.js`.

## Admin Deploy
Requires explicit project IDs from repo root.

## Common Mistakes (6 documented)
See raw source for the full list of deployment gotchas.

## Post-Deploy Verification
Security headers checked on both apps. See [[Pre-Deploy Checklist]] for content pages.
