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

## [2026-07-01] audit | Downloads organization scan blocked before moves | files: none

## [2026-07-01] audit | Google Drive organization audit and duplicate cleanup plan | files: Google Drive Organization Audit 2026-07-01.md, wiki/index.md

## [2026-07-02] strategy | Rewrote EXAM_HELP_CENTER_BUILD_PLAN into 7 sessionised Claude Code sessions (S0 recon/routing → S6 indexing); grounded paths against real repos, locked 4 decisions (own vercel.json /help rewrite, placeholders-first, H1, AMC link), corrected to two-repo model (website exec + Content OS brain/wiki) | files: EXAM_HELP_CENTER_BUILD_PLAN.md

## [2026-07-02] refactor | Help Center S0: branched content/help-exam-wave1, added /help rewrites to vercel.json (above /app.html catch-all), created public/help/{exam,images/exam-getting-started} dirs, captured help template skeleton; build_site.py green, check_blog.py leaves /help alone | files: (website repo) vercel.json, public/help/ dirs

## [2026-07-02] deploy | Help Center S1: built cornerstone /help/exam/getting-started.html (first-run journey: account → wizard → tour → Day-0 dashboard → first Today session → FAQ), full schema TechArticle+BreadcrumbList+HowTo+FAQPage, 11 screenshot placeholders w/ exact filenames+alt, OG brief; passes §4 gate + build_site.py green; PR notes captured | files: (website) public/help/exam/getting-started.html; (Content OS) docs/_audit/HELP_WAVE1_PR_NOTES.md

## [2026-07-02] deploy | Help Center S2: built help home /help/index.html (3 mode cards — Exam live, MBBS+University coming-soon/unlinked, most-read links) and Exam hub /help/exam/index.html (Wave-1 articles grouped Getting started / Daily use, other-modes coming-soon); both CollectionPage+BreadcrumbList; cornerstone now non-orphan (home↔hub↔cornerstone); §4 gate green, build_site.py green | files: (website) public/help/index.html, public/help/exam/index.html

## [2026-07-02] strategy | Help Center plan expanded to FULL Exam Mode coverage per Istiaque: Wave 1 grows from 6 pages to ~15 articles (added subjects-and-tasks, spaced-repetition, logging-questions, plan-and-schedule, staying-on-track, dashboard, readiness-and-projections, history, analytics-and-reports, revision-sprint, settings, faq); re-sessionised to S3–S12; added article build recipe, Pro-feature copy rule, global image capture-size spec, §5.0 session status log, and a mandatory "update the plan every session" rule; answered image capture sizes (full 1200w / cropped 900–1000w / OG 1200×630 / motion MP4-WebM≤4s) | files: EXAM_HELP_CENTER_BUILD_PLAN.md

## [2026-07-02] strategy | Help Center plan: NO screenshots decision — all feature illustrations become Claude-authored HTML/CSS mocks (final, not placeholders); added §6 rewrite (mock authoring rules §6.1, full per-session mock inventory §6.2 covering every Exam-mode window, ChatGPT OG prompt §6.3 for one shared help-og.webp); updated §1.2 decision, build recipe step 7, §4 gate image row, Session 1 image note (11 markers → mocks in S11), Session 12 step 6; confirmed S0–S2 built/committed on both repos, S3 not yet built | files: EXAM_HELP_CENTER_BUILD_PLAN.md

## [2026-07-02] deploy | Help Center S3: built /help/exam/build-your-plan.html (3-step wizard in depth — 4 exam types by name, dates, load sliders, generate + build animation, the 3 phases, Start-a-new-plan rebuild) and /help/exam/subjects-and-tasks.html (Settings→Subjects add/edit/reorder/remove, Settings→Tasks, the task-detail drawer); each TechArticle+BreadcrumbList+HowTo+FAQPage with schema↔visible FAQ parity; HTML/CSS mocks authored per §6.2 (exam-type cards, load sliders, step-3 summary, phase timeline / subject list, task row, task drawer) — no screenshots; hub re-grouped to §3 headings (Getting started + Your daily study loop) and hasPart now lists all 7 S3–S5 articles; §4 gate green, build_site.py green; only AMC has live exam content so AMC MCQ links to /blog/amc-mcq-study-plan while PLAB 1/USMLE named without dead links (link-debt noted) | files: (website) public/help/exam/build-your-plan.html, public/help/exam/subjects-and-tasks.html, public/help/exam/index.html

## [2026-07-02] deploy | Help Center S4: built /help/exam/daily-study-session.html (Today end to end — day planner 50/10 blocks + 30-min long break every 3, fixed commitments immovable, block timers w/ Pause re-time + Done/Continue, SR recall prompt, sidebar Pomodoro/Insert-Break/Quick-Stats/SR-due, Log modal Complete/Partial/Missed/Rest + questions field, floating "+" quick-logger) and /help/exam/spaced-repetition.html (define SR plainly, unified review queue Subject-blue/Topic-purple + compliance ring + Next-7-Days, recall ratings Blackout/Hard/Medium/Easy → 3/7/14/21 days, retention heatmap, SR Settings SR1/grace/SR2-SR3 multipliers w/ live preview); each TechArticle+BreadcrumbList+HowTo+FAQPage, schema↔visible FAQ parity; 8 HTML/CSS mocks total per §6.2; §4 gate green, build_site.py green; already listed in hub hasPart | files: (website) public/help/exam/daily-study-session.html, public/help/exam/spaced-repetition.html

## [2026-07-02] deploy | Help Center S5: built /help/exam/logging-questions.html (Questions screen — log form w/ source/mode Timed-Untimed-Tutor/first-attempt-vs-review/confidence + live accuracy vs average + Strong/Improving/Needs-work badge, 30-day trend, session history, subject panel; Paste-results auto-parse → editable table → import; Flag-for-review → SR Topic Review; floating "+" quick-logger) and /help/exam/mock-exams.html (Add-Mock form title/date/total/correct/time/notes + live band, readiness bands Unsafe<55/Improving55-60/Borderline61-64/Exam-ready≥65, per-subject breakdown + total-mismatch warning, score trend vs 65% line, average pace vs 72s default); each TechArticle+BreadcrumbList+HowTo+FAQPage, schema↔visible FAQ parity; 7 HTML/CSS mocks total per §6.2; §4 gate green, build_site.py green; already in hub hasPart. **Wave-1 daily-loop + setup clusters (S3–S5) all built — 6 new articles, hub complete for the 7 shipped** | files: (website) public/help/exam/logging-questions.html, public/help/exam/mock-exams.html

## [2026-07-02] deploy | Help Center S6: built /help/exam/plan-and-schedule.html (four Plan views — List w/ filter counts + sort + phase strip, Kanban drag-to-Completed, Timeline w/ mock+subject lanes/heavy-week amber/stop-new-material dashed line/exam-day red line, Sprint view deferred to revision-sprint; task-detail drawer) and /help/exam/staying-on-track.html (the no-guilt recovery playbook — Backdate, Skip Today, Pause re-timing, question deficit, rest-days-never-red, honest Missed logging, overload/burnout coach card); TechArticle+BreadcrumbList+HowTo+FAQPage w/ parity; 4 HTML/CSS mocks per §6.2; §4 gate green | files: (website) public/help/exam/plan-and-schedule.html, public/help/exam/staying-on-track.html

## [2026-07-02] deploy | Help Center S7: built /help/exam/dashboard.html (full §4 card catalogue — 5 time-sensitive banners incl. T-minus checklist + Sprint nudge [Pro] + overload note, 8 always-on cards incl. six KPI tiles + first-pass ring + AI Study Advisor [Pro], right column readiness trio one-line-each + phone Today/Progress split) and /help/exam/readiness-and-projections.html (the three readiness numbers kept distinct — compliance ring effort vs Readiness Projection forecast vs Go/No-Go verdict [Pro, final 35 days]; what feeds each; behaviour not maths); 6 HTML/CSS mocks; full schema + parity; §4 gate green | files: (website) public/help/exam/dashboard.html, public/help/exam/readiness-and-projections.html

## [2026-07-02] deploy | Help Center S8: built /help/exam/history.html (colour-coded month calendar green/amber/red/blue, day detail, pattern-spotting) and /help/exam/analytics-and-reports.html (Pro stated up front; charts walked as questions incl. Focus Areas + Pass Probability Trajectory + confidence-vs-accuracy ≥5 tagged sessions; Progress Report /report w/ both entry points + light-mode PDF; weekly habit framing); 3 HTML/CSS mocks; full schema + parity; §4 gate green | files: (website) public/help/exam/history.html, public/help/exam/analytics-and-reports.html

## [2026-07-02] deploy | Help Center S9: built /help/exam/revision-sprint.html (Pro; weakness-weighted sprint w/ mock days + final-3-day taper; opt-in only via Dashboard nudge ≤28 days, never auto-activates; Sprint tab in Plan; sprint mocks ~every 4 days; T-minus tie-in) and /help/exam/settings.html (reference map of all 11 tabs, each cross-linked to its guide; Billing w/ compliant trial sentence, no "upgrade"; Danger Zone type-to-confirm; Take-the-tour replay); 5 HTML/CSS mocks; full schema; §4 gate green | files: (website) public/help/exam/revision-sprint.html, public/help/exam/settings.html

## [2026-07-02] deploy | Help Center S10: built /help/exam/faq.html (7 curated Q&As — card-free start w/ compliant trial sentence, Custom Exam, missed days, reset vs new-plan data safety, Pro feature list, readiness-numbers distinction, tour replay — FAQPage ↔ visible parity, each answer links its full article); hub re-grouped to all six §3 headings w/ hasPart listing 15 articles; help-home most-read expanded; sitemap.xml registers all 18 help URLs w/ help-og.webp image entries (XML validated); build green | files: (website) public/help/exam/faq.html, public/help/exam/index.html, public/help/index.html, public/sitemap.xml

## [2026-07-02] strategy | Help Center S11: brain + wiki made Help Center a first-class content type and PR opened — 12_INTERNAL_LINKS.md +18 registry rows (new types help/help-hub, link graph, H-series link debt), 05_CONTENT_PIPELINE.md Help Center section (18 pages 🟨 pending merge) + log row, new 13_HELP_CENTER.md spec, CHANGELOG entry; wiki/content/Help Center.md created + index entry; PR notes S6–S11 appended; website PR "Content: Exam Help Center — Wave 1" opened to main. Outstanding: help-og.webp raster (Istiaque, §6.3 prompt); S12 post-merge (live-route check, inbound links, GSC) | files: raw/brain-v1/12_INTERNAL_LINKS.md, raw/brain-v1/05_CONTENT_PIPELINE.md, raw/brain-v1/13_HELP_CENTER.md, raw/brain-v1/CHANGELOG.md, wiki/content/Help Center.md, wiki/index.md, docs/_audit/HELP_WAVE1_PR_NOTES.md, EXAM_HELP_CENTER_BUILD_PLAN.md

## [2026-07-02] deploy | Help Center Exam Wave 1 merged + Session 12 live-route verification | 05_CONTENT_PIPELINE.md, wiki/content/Help Center.md, EXAM_HELP_CENTER_BUILD_PLAN.md
PR #61 squash-merged to `main` (CI "Web app" red = pre-existing Supabase-env test gap affecting all PRs, unrelated to static-HTML content — verified zero src/tests touched). Vercel deployed; all 18 help URLs verified live: HTTP 200, self-referential canonical, exactly one h1, GA present, no SPA fallthrough. vercel.json rewrites confirmed ordered above the /(.*) catch-all. Inbound links from /features + /blog/amc-mcq-study-plan to the getting-started cornerstone built, built_site.py green, pushed as PR #62 (self-approval guard blocks agent auto-merge — awaits Istiaque). GSC: sitemap already registered (last downloaded 2026-07-01); write-submit blocked by read-only OAuth scope (not needed); cornerstone index status `unknown to Google` on go-live day — organic re-crawl pending, UI "Request Indexing" is manual. Flipped all 18 pipeline rows to ✅ live. ⚠️ OUTSTANDING: help-og.webp not yet generated — every help og:image currently 404s to the SPA shell until Istiaque produces it (§6.3 prompt).

## [2026-07-02] deploy | Help Center discoverability — footer link + shared OG card (PR #63) | wiki/content/Help Center.md
- Consolidated on canonical clone `~/Downloads/StudyRIse Main/StudyRise App` (fast-forwarded `main` to origin `e2da3ba`; `~/Desktop/StudyRise` copy retired). PRs #61 + #62 both already merged to `main`.
- Added "Help Center → /help" to the Product column of the sitewide footer: shared partial `templates/partials/footer.html` (re-injects into all 18 help pages via build_site.py) + 6 frozen marketing pages (landing, features, pricing, blog, study-planner, amc-study-planner) whose footers lack the include anchor.
- Shipped shared OG card `public/help/images/help-og.webp` (1731×909, ~1.9:1) — every /help/* og:image previously 404'd. Website PR #63 opened.
- Header nav left unchanged (marketing-focused); in-app contextual links remain a follow-up in the app UI.
