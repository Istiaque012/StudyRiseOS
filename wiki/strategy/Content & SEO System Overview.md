---
title: Content & SEO System Overview
type: overview
sources: [raw/brain-v1/README.md, raw/brain-v1/01_CONTEXT.md]
created: 2026-06-24
updated: 2026-06-24
---

# Content & SEO System Overview

The StudyRise Content & SEO Brain is a Claude project that runs the entire content and SEO operation.

## What It Does
- **Researches** keywords using GSC, Semrush, Google Trends
- **Writes** SEO- and AI-optimised articles
- **Produces** ready-to-deploy HTML files (with GA snippet baked in)
- **Audits** search health (monthly + on-demand)
- **Plans** what to publish next via the [[Content Pipeline]]

## The Core Publishing Loop
1. Brain researches keyword + SERP (automated)
2. Brain writes the article HTML (automated)
3. Brain produces OG image brief for Canva (automated)
4. You create the OG image in Canva (manual)
5. Brain builds final HTML + handoff package (automated)
6. You deploy via `git push` (manual)
7. Brain updates sitemap + requests GSC indexing (automated)
8. You verify the live page (manual)

## Connected Tools
Google Search Console, Google Analytics, Google Trends, Canva, Google Drive, Vercel, web search. Semrush optional.

## Standing Rules
1. Never guess a medical or curriculum fact — always verify
2. GA snippet (G-R38JK89PP5) must be present on every page

## Key Files
- [[SEO Strategy]] — keyword mapping and clustering
- [[Article Production Playbook]] — the 5-phase article process
- [[Content Pipeline]] — the master content queue
- [[SEO Technical Checklist]] — non-negotiable technical requirements
- [[Audit Playbook]] — recurring health checks
