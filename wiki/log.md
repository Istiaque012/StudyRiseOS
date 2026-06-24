---
title: Wiki Log
updated: 2026-06-25

---

# Wiki Log

> Chronological, append-only record of all wiki operations.

---

## [2026-06-25] refactor | Task 7 wiki de-sync — strip duplicated rule values, link to source | Content & SEO System Overview.md, StudyRise Overview.md, Pricing Strategy.md, Brand Voice.md, Paid Promotion.md, Social Playbook.md, SEO Strategy.md
- Stripped literal GA ID (G-R38JK89PP5) from 2 wiki pages → linked to [[SEO Technical Checklist]]
- Replaced 5 drifted partial banned-phrase lists with links to [[11_PRICING_MODEL]] §7.2 / [[02_BRAND_VOICE]] §7.2
- Fixed dangling [[wiki/entities/]] wikilink in SEO Strategy → plain text
- Conservative pass: kept verbatim CTA strings, social-specific quick-ref lists, freemium summaries, and checklist items untouched

## [2026-06-25] fix | Task 4 contradiction fixes in raw/brain-v1 | 01_CONTEXT.md, 02_BRAND_VOICE.md, 11_PRICING_MODEL.md, README.md
- Committed four previously-uncommitted surgical edits across raw/brain-v1/:
  - 01_CONTEXT.md: bare `www.studyrise.app` → clickable markdown link
  - 02_BRAND_VOICE.md: four social bio template domains → clickable links (lines 430–433)
  - 11_PRICING_MODEL.md: social bios CTA table domain → clickable link
  - README.md: stale file counts ("25 numbered files" / "all 26 files") → "twelve numbered files (01–12) plus the 10A–10D companions"
- Font-stack fix (02_BRAND_VOICE.md line 32) was already committed in bbb99f71

## [2026-06-25] ingest | Paid Promotion + Creative Production (10C, 10D)
- **Sources**: Copied `10C_PAID_PROMOTION.md` and `10D_CREATIVE_PRODUCTION.md` → `raw/brain-v1/`
- **Created 2 new pages**:
  - [[Paid Promotion]] — spend-readiness checklist, $0–500/mo budget tiers, platform selection by segment with 2026 cost benchmarks, funnel-stage campaigns, targeting blueprints (AMC/MBBS-BD/UNI), retargeting pixel setup, 5 ready-to-run playbooks, ad creative rules, KPI targets, tracking setup
  - [[Creative Production]] — brand asset reference card (colours/typography/logo/visual style), 8 AI image prompt templates (P1–P8), 3 video production methods (animated text/screen recording/hybrid), 3 complete video scripts, Canva workflow, screenshot production with demo data personas, background music guide, asset naming convention, 12-item quality checklist
- **Updated 2 pages**:
  - [[Social Playbook]] — all 4 companion files now marked as ingested with wikilinks, sources list expanded
  - `wiki/index.md` — added both new pages under Social & Marketing

## [2026-06-25] ingest | Social Content Formats + Social Calendar (10A, 10B)
- **Sources**: Copied `10A_SOCIAL_CONTENT_FORMATS.md` and `10B_SOCIAL_CALENDAR.md` → `raw/brain-v1/`
- **Created 2 new pages**:
  - [[Social Content Formats]] — 21 reusable post templates (S1–S4, C1–C3, V1–V6, L1–L3, F1, ST1–ST2), AI image prompts, article-to-social cheat sheet, all no-face-on-camera
  - [[Social Calendar]] — Article Echo Protocol (7-step Day 0–30+), weekly posting grid, 3 segment calendars (AMC 5-stage arc, MBBS-BD May/Nov exam anchoring, UNI dual-hemisphere), paid triggers, repurposing cycle, when-not-to-post rules
- **Updated 3 pages**:
  - [[Social Playbook]] — companion files section updated from "pending" to "ingested" with wikilinks, sources list expanded
  - [[Content Pipeline]] — social distribution section now references Article Echo Protocol and Content Formats cheat sheet
  - `wiki/index.md` — added both new pages under Social & Marketing

## [2026-06-25] ingest | Social Playbook (10_SOCIAL_PLAYBOOK.md)
- **Source**: Copied `10_SOCIAL_PLAYBOOK.md` → `raw/brain-v1/10_SOCIAL_PLAYBOOK.md`
- **Created 1 new page**: [[Social Playbook]] — platform registry (4 accounts), audience-to-platform map, per-platform voice adaptation, 4 content pillars (40/25/20/15 split), non-negotiable copy rules, posting cadence, hashtag clusters, cross-posting rules, UTM tracking, community engagement, 2026 algorithm notes
- **Updated 5 pages**:
  - [[Brand Voice]] — added social-specific banned phrases section, linked social register adaptation
  - [[Content Pipeline]] — added social distribution section with pillar percentages and cadence
  - [[Image Protocol]] — added social image dimensions table and no-stock-photos rule
  - [[Pricing Strategy]] — added social CTA rules (approved/banned phrases)
  - [[SEO Strategy]] — added social distribution & SEO section (YouTube keyword targeting, UTM structure)
- **Updated** `wiki/index.md` — added Social & Marketing section

## [2026-06-25] update+deploy | Study Planner OG image + nav links site-wide
- **Repo**: `/Users/istiaque/Desktop/StudyRise` → committed `b7399ec`, pushed to `main` (Vercel auto-deploy)
- **OG image**: added `study-planner-og.webp` (1200×630, dark navy, weekly calendar mockup); updated `og:image` + `twitter:image` meta in `study-planner.html` (was using generic `/og-image.png`)
- **Nav link**: added "Study Planner" to navbar (desktop + mobile) and footer on all pages: `landing.html`, `features.html`, `pricing.html`, `blog.html`, `what-is-studyrise.html` — now consistent with `study-planner.html` and `amc-study-planner.html` which already had it
- **Updated wiki pages**: [[Content Pipeline]] (follow-up resolved: OG image done), log entry

## [2026-06-25] generate+deploy | /study-planner landing page + SEO fixes shipped
- **Repo**: `/Users/istiaque/Desktop/StudyRise` → committed `121ac97`, pushed to `main` (Vercel auto-deploy)
- **New page**: `public/study-planner.html` — generic "study planner" landing page (all exams + university), cloned from amc-study-planner shell; SoftwareApplication + BreadcrumbList + FAQPage JSON-LD; freemium-safe copy. Wired rewrite in `vercel.json`, added to `sitemap.xml`. Nav/footer/robots already referenced it (was dead-ending).
- **Updated pages**: [[Content Pipeline]] (deployed table + resolved queue), [[Internal Link Strategy]] (registered links, D-series 301 resolved), [[SEO Remediation 2026-06]] (#4 done)
- **Follow-up**: ~~make a dedicated `study-planner-og.webp`~~ ✅ done (2026-06-25, commit `b7399ec`)

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
