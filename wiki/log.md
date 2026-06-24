---
title: Wiki Log
updated: 2026-06-25
---

# Wiki Log

> Chronological, append-only record of all wiki operations.

---

## [2026-06-25] generate+deploy | /study-planner landing page + SEO fixes shipped
- **Repo**: `/Users/istiaque/Desktop/StudyRise` → committed `121ac97`, pushed to `main` (Vercel auto-deploy)
- **New page**: `public/study-planner.html` — generic "study planner" landing page (all exams + university), cloned from amc-study-planner shell; SoftwareApplication + BreadcrumbList + FAQPage JSON-LD; freemium-safe copy. Wired rewrite in `vercel.json`, added to `sitemap.xml`. Nav/footer/robots already referenced it (was dead-ending).
- **Updated pages**: [[Content Pipeline]] (deployed table + resolved queue), [[Internal Link Strategy]] (registered links, D-series 301 resolved), [[SEO Remediation 2026-06]] (#4 done)
- **Follow-up**: make a dedicated `study-planner-og.webp` (currently uses `/og-image.png` fallback)

## [2026-06-25] fix | SEO Remediation — implemented in StudyRise repo
- **Repo**: `/Users/istiaque/Desktop/StudyRise`
- **P0 #1**: added 301 `vercel.json` `/blog/how-to-pass-amc-mcq-in-4-months` → `/blog/amc-mcq-study-plan` (target article confirmed real: 3761 words, self-canonical)
- **P0 #2**: removed stale dead rewrite `/amc-mcq-study-planner` (file never existed; canonical page is `/amc-study-planner`, already in sitemap)
- **P1 #3**: rewrote "Is StudyRise free?" FAQ to freemium reality + added `FAQPage` JSON-LD (8 Q&A) to landing.html @graph
- **P1 #5**: confirmed already handled — `?auth` noindex header present
- **P2 #6/#7/#8**: meta description rewritten, 4 punctuation spots re-punctuated, favicon path made absolute
- **Build**: `python3 build_site.py` → 0 errors. JSON-LD + vercel.json validated.
- **N/A #4**: `/study-planner` page doesn't exist — not added to sitemap; queued in [[Content Pipeline]] pending decision
- Not yet committed/pushed/deployed (awaiting user go-ahead). See [[SEO Remediation 2026-06]].

## [2026-06-25] ingest | SEO Remediation Report (2026-06-24)
- **Source**: Copied `SEO_FIXES_2026-06-24.md` → `raw/app-dev-sources/SEO-Remediation-2026-06-24.md`
- **Created 1 new page**: [[SEO Remediation 2026-06]] — 8 issues (2 P0, 3 P1, 3 P2), owners ([CONTENT]/[DEV]), full fix snippets, execution order
- **Updated 3 pages**:
  - [[SEO Strategy]] — added Active Remediation section (301 + no-SPA-fallthrough rule)
  - [[Content Pipeline]] — queued `/amc-mcq-study-planner` landing page; flagged AMC slug 301
  - `wiki/index.md` — listed new page under Strategy
- **Root cause**: SPA catch-all serves `200` empty shell + homepage canonical for URLs that should be static pages/redirects. Highest-value fix = AMC blog 301.

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
