---
title: Wiki Log
updated: 2026-06-25
---

# Wiki Log

> Chronological, append-only record of all wiki operations.

---

## [2026-06-25] ingest | StudyRise CLAUDE.md → App-Dev Wiki Expansion
- **Source**: Copied StudyRise repo `CLAUDE.md` (370KB, full current state + schema + project structure) to `raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md`
- **Created 4 new pages**:
  - [[Unified App Architecture]] — three-mode SPA, tech stack, shared infra, deferred work
  - [[Component Architecture]] — full source tree (screens/components/hooks/lib) by mode
  - [[Migration & Schema History]] — 25+ SQL migrations, core schema, table inventory
  - [[Feature Flags Registry]] — flag system, Pro gating, subscription state, known issues
- **Updated 2 existing pages**:
  - [[App Features Spec]] — expanded from brief summaries to full screen-by-screen feature tables for all three modes
  - [[Deployment Architecture]] — already accurate, no changes needed
- **Updated** `wiki/index.md` — reorganized App Development section into System-Wide + MBBS Bangladesh subsections

## [2026-06-25] generate | AMC MCQ Pass-Standard 2026 Article
- Deep-researched the 2026 AMC MCQ pass-standard change (97 agents, 15 sources, 25 claims verified)
- Created `public/blog/amc-mcq-pass-standard-2026.html` in StudyRise repo
- Added bidirectional internal links with `amc-mcq-study-plan`
- Added sitemap.xml entry
- Updated [[Content Pipeline]] — added to deployed articles table
- Updated [[Internal Link Strategy]] — registered new link pairs
- OG image pending: `amc-mcq-pass-standard-2026-og.webp` (1200×630 WebP, Canva)

## [2026-06-24] setup | Wiki System Initialized
- Initialized LLM Wiki system (Karpathy pattern) in SakibOS Obsidian vault
- Moved 28 existing docs to `raw/brain-v1/` as immutable sources
- Created wiki schema in `CLAUDE.md`
- Created `wiki/index.md` with 25 initial page entries
- Created 25 initial wiki pages by ingesting brain-v1 sources:
  - 2 overview pages
  - 4 strategy pages
  - 4 brand & design pages
  - 5 content production pages
  - 10 app development pages
  - 1 deployment page
- Entities and Keywords sections empty — awaiting first competitor clips and keyword research ingestion
