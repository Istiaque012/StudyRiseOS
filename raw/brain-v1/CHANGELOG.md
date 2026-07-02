# SEO Content Brain — Changelog

Most recent entry first.

---

## 2026-07-02 — Help Center introduced at `/help/` + new file 13

Exam Wave 1 of the public Help Center built in the website repo on branch
`content/help-exam-wave1`: `/help` home, `/help/exam` hub, 15 Exam Mode articles
(full feature coverage — cornerstone, plan building, subjects/tasks, daily loop, SR,
questions, mocks, plan views, staying on track, dashboard, readiness/projections, history,
analytics/report, revision sprint, settings, FAQ). Routing via `vercel.json` `/help` rewrites;
all help URLs registered in `sitemap.xml` with image entries.

- **New file `13_HELP_CENTER.md`** — the Help Center spec: architecture, article map, template
  delta, schema rules (TechArticle/CollectionPage, FAQ parity), HTML/CSS-mock illustration
  rules (no screenshots; only raster = shared `help-og.webp`), Pro-copy rule, and the standing
  rule **help ≠ blog** (never in blog feeds/listings).
- **`12_INTERNAL_LINKS.md`** — 18 help rows added to the Page Registry (new types `help`,
  `help-hub`), help link-graph note, H-series link debt (post-merge inbound links; PLAB/USMLE
  exam-content links deferred).
- **`05_CONTENT_PIPELINE.md`** — Help Center section with all 18 pages at 🟨 built/pending-merge;
  maintenance-log row added.
- Indexing and inbound-link wiring are gated on the post-merge live-route check (plan Session 12).

---

## 2026-06-25 — Social media brain: files 10, 10A, 10B, 10C, 10D

Five new files completing the social media and paid promotion layer. These are supplementary
knowledge files that sit alongside 01–12 and are ingested into the Obsidian wiki via Claude Code.
All five depend on `02_BRAND_VOICE.md`, `11_PRICING_MODEL.md`, Brand Kit v2.2, and
`07_IMAGE_PROTOCOL.md`. MBBS-BD restrained tone enforced throughout.

- **New file `10_SOCIAL_PLAYBOOK.md`** — the operating system for StudyRise's social media
  presence. Covers four platforms (Facebook @studyriseapp, Instagram @studyrise.app, YouTube
  @studyriseapp, LinkedIn /company/studyriseapp). Audience-to-platform mapping: [MBBS-BD]
  lives on Facebook; [EXAM] spans Facebook + YouTube; [UNI] is Instagram-first. Voice
  adaptation per channel (Facebook = warm peer-level; Instagram = visual-first concise;
  YouTube = knowledgeable explainer; LinkedIn = founder/professional). Four content pillars:
  Study Technique 40%, Exam Strategy 25%, Product in Action 20%, Community & Credibility 15%.
  Social-specific copy rules (CTA language, banned phrases, pricing guardrails from file 11).
  Platform algorithm notes current as of June 2026. Minimum posting cadence for a solo
  operator (3–5 posts/week per platform). Pre-built hashtag clusters per segment. Cross-posting
  rules. UTM tracking structure. Community engagement guidelines.

- **New file `10A_SOCIAL_CONTENT_FORMATS.md`** — reusable post template library. 21 templates
  across 7 categories:
  - Static images: S1 single-stat, S2 myth/fact, S3 tip card, S4 before/after (4 templates)
  - Carousels: C1 step-by-step guide, C2 comparison, C3 listicle (3 templates)
  - Video/Reels/Shorts: V1 screen walkthrough 30–60s, V2 animated tip 15–30s, V3 data story
    30–45s, V4 "how I'd do it" plan 45–90s, V5 full tutorial 2–5min, V6 YouTube thumbnail
    spec (6 templates — all no-face-on-camera: screen recordings, voiceover, animated text)
  - LinkedIn: L1 build-in-public, L2 data insight, L3 professional take (3 templates)
  - Facebook groups: F1 helpful answer (1 template)
  - Stories: ST1 article launch sequence 3–5 stories, ST2 quick poll (2 templates)
  - Article-to-social adaptation cheat sheet mapping article types to template selections.
  Every template includes structure, worked example, audience/pillar/funnel tags, and a
  plug-and-play AI image generation prompt with brand palette hex values and Inter font.

- **New file `10B_SOCIAL_CALENDAR.md`** — the timing layer. Article Echo Protocol: 7-step
  post-publish promotion sequence (Day 0 launch → Day 1 insight pull → Day 3 carousel/Reel →
  Day 5 group share → Day 7 video companion → Day 14 secondary insight → Day 30+ evergreen
  reshare) with a decision tree (flagship = full echo, segment = abbreviated, quick = minimum).
  Weekly posting grid with batching rules and time-of-day guidelines per timezone (BST for
  Bangladesh, AEST for Australia, UTC for global). Three segment-specific 12-month content
  calendars:
  - [EXAM] AMC: 5-stage preparation arc (Decision → Planning → Execution → Final Stretch →
    Post-exam) rotated monthly, with per-month themes + suggested posts + template references.
    AMC is year-round (Feb–Nov, Pearson VUE) so the calendar is cycle-driven, not event-driven.
  - [MBBS-BD] Bangladesh: anchored to the May and November BMDC professional exam windows.
    Includes ASCII timeline of the academic cycle, restrained-tone reminders baked into every
    month, reduced posting during exam weeks (max 1–2/week, no product CTAs), BMDC event
    triggers table (exam announcements, results, supplementary windows), supplementary content
    sensitivity rules. BMDC facts sourced from FEATURES.md.
  - [UNI] University: dual-hemisphere model covering both Northern (Jan–Dec) and Southern
    (Feb–Nov) semester cycles with hemisphere-neutral content where possible.
  Cross-segment evergreen rotation (study technique topics + product feature showcase).
  Paid promotion triggers with hard stop-rules (no ads during exam weeks, no ads to broken
  product). Master 12-month seasonal calendar (single-view grid of all three segments).
  Content repurposing cycle with 6-week minimum reshare gap.

- **New file `10C_PAID_PROMOTION.md`** — advertising playbook for a bootstrapped founder.
  Spend-readiness checklist (5 yes/no gates — if any is "no," spend $0). Budget framework:
  4 tiers from $0 to $500/month ($0 is the default; most months should be here). Platform
  selection by segment with 2026 cost benchmarks: Bangladesh Facebook CPM $1–3 (a $50/month
  budget is meaningful); Australia CPM $8–18 (spend only with strong creative). Three
  funnel-stage campaign types (Awareness → Consideration → Conversion) with Meta objectives,
  creative types, CTAs, and 40/30/30 budget split. Audience targeting blueprints per segment
  using Meta Advantage+ 2026 approach (signals over micromanagement): [EXAM] AMC (Australia
  + IMG source countries, medical interests), [MBBS-BD] (Bangladesh, 18–28, medical college
  interests, maximum restraint in ad copy, BDT pricing only, no ads during exam weeks),
  [UNI] (English-speaking countries, 18–25, university interests). Retargeting setup: 4
  pixel-based audiences (all visitors, article readers, landing page visitors, registration
  started-didn't-complete) with frequency caps and creative rules. Ad creative rules aligned
  with files 02 and 11 (same banned words, same CTA language). 3-second test for every
  creative. 5-variation testing framework. Ad specs for Meta, YouTube, LinkedIn. KPI
  benchmarks: cost per registration < $5 global / < $1 Bangladesh; registration rate > 5%
  landing page / > 2% article; CTR > 1% feed. Five ready-to-run campaign playbooks: boost
  a top post, promote a new article, retarget site visitors, pre-exam MBBS-BD push, YouTube
  pre-roll. Monthly paid review checklist.

- **New file `10D_CREATIVE_PRODUCTION.md`** — the production manual for creating social media
  visual assets. Brand asset reference card (all hex values, font weights, logo files, visual
  style rules in one place). AI image generation master prompt library: base prefix block +
  8 prompt templates (P1 stat card, P2 myth/fact, P3 tip card, P4 before/after, P5 carousel
  slides, P6 YouTube thumbnail, P7 Reel cover frame, P8 LinkedIn document cover) — each with
  exact brand hex values, Inter font specs, and logo placement. Three video production methods
  for no-face-on-camera: Method A animated text (Canva/CapCut, easiest), Method B screen
  recording with voiceover, Method C hybrid (branded frames + screen recording, most polished).
  Voiceover recording tips. Three complete video scripts with second-by-second VISUAL/VOICEOVER
  columns: 30-second animated tip, 60-second screen walkthrough, 45-second data story. Canva
  workflow guide (one-time brand kit setup + per-post 6-step workflow). Screenshot production
  guide with demo data specs per audience (fictional names, realistic plans). Background music
  guide (lo-fi ambient, 15–20% volume, calmer for MBBS-BD). Asset naming convention
  ({platform}_{format}_{audience}_{topic-slug}_{date}.{ext}). 12-item pre-publish quality
  checklist. Production time estimates (stat card = 10 min, carousel = 20 min, Reel = 30–45
  min, full article echo set = 90–120 min).

- **No existing files edited.** These are net-new supplementary files. The social media voice
  rules in `02_BRAND_VOICE.md` §6.3 remain authoritative; files 10–10D expand on them with
  platform-specific depth. The pricing copy rules in `11_PRICING_MODEL.md` §7 remain
  authoritative; files 10–10D inherit and enforce them.

---

## 2026-06-24 — New segment landing page: /amc-study-planner [EXAM]
- Built `public/amc-study-planner.html` on the marketing-page recipe (dark hero), SoftwareApplication + BreadcrumbList + FAQPage schema. AMC MCQ facts sourced from amc.org.au. Freemium copy (30-day full access free, no card); no prices hard-coded. Passed the Pre-Delivery Technical Gate.
- Registered the slug `/amc-study-planner` in file 12 (distinct from the deleted test page `/amc-mcq-study-planner`).
- Revised layout: habits grid → 2×2 (was an orphaned 3+1), removed a feature grid that duplicated the habits, added a product preview image (wires amc-study-planner-hero.webp).
- Wired one inbound link from `/blog/amc-mcq-study-plan` (descriptive anchor "dedicated AMC MCQ study planner").
- Git brought back in sync with prod (Session 1 had been deployed uncommitted; commit fea9a6c).

---

## 2026-06-24 (latest) — One canonical nav + footer across every public page

Unified the marketing nav + footer so the SEO Brain's certified shell is the single
source of truth everywhere; the bespoke landing-page shell and the React legal pages
were brought into line with it.

- **`public/landing.html`** — replaced its bespoke inlined nav + footer with the canonical
  markup. Now uses the correct footer logo (`studyrise-logo-tagline-footer.svg`, replacing
  `studyrise-logo-white.svg`), real links instead of dead `#showcase` / `#faq` anchors, and
  the "Try StudyRise free" CTA. Added the missing inline CSS rules (`.flogo`, `.flegal`,
  `.brand .icon`) so it renders identically to the shared-shell pages.
- **Source partials + all 11 shared-shell pages** — `templates/partials/nav.html` +
  `templates/partials/footer.html`, plus `pricing.html`, `features.html`, `blog.html`, the 7
  blog posts, and `_shell-check.html`: removed the broken **Study Planner** and **Contact**
  nav/footer links (menu is now the 3-link set). Body CTAs, related-cards, and prose that
  mention the study planner were preserved — only nav/footer links were touched.
- **React legal pages (`/privacy`, `/terms`)** — new `src/components/Landing/MarketingNav.jsx`
  + `MarketingFooter.jsx` (theme-independent replicas styled to the marketing palette), wired
  into `LegalDoc.jsx` to replace the old minimal logo bar. These pages now carry the same nav
  + footer for the first time; `/terms#changelog` deep-link anchor intact.
- **Brain docs updated to match** — `04_SEO_TECHNICAL_RULES.md` + `PRE_DEPLOY_CHECKLIST.md`
  gates updated to the new 3-link menu; `10_SITE_SHELL.md` documents the 3-link menu and adds
  a rule that future React public pages use the two new components.
- **Note:** the landing page's **Features** link now routes to `/features` (the page) rather
  than scrolling to an on-page section — the cost of one consistent menu. Static-page links
  use absolute `www.studyrise.app` URLs (Brain convention) and resolve in production via the
  Vercel rewrites.
- **Verification:** `npm run build` clean; no nav/footer study-planner/contact links remain
  anywhere; no `studyrise-logo-white.svg` in any page; nav + footer visually identical on
  `landing.html`, `pricing.html`, `blog/mbbs.html`, and `/privacy`; no console errors. Deployed.

---

## 2026-06-24 — Fix blank blog thumbnails + lock the rule into the Brain

- **Bug fixed:** the blog hub (`public/blog.html`) showed flat gradient blocks instead of
  article images. The card thumbnails (`.fthumb` / `.thumb`) carried only a CSS gradient
  placeholder and never referenced the per-article `-og.webp` files (which existed in
  `public/blog/images/` all along). Wired all four cards (featured What-Is-StudyRise + AMC
  MCQ + Spaced Repetition + How-to-Make-a-Study-Plan) to their real OG image via
  `background-image:url('/blog/images/{slug}-og.webp')`, gradient kept as fallback. Deployed.
- **System fix so it never recurs** — added **Image Protocol Rule 4 (Listing card thumbnails)**
  and threaded the invariant through every gate:
  - `07_IMAGE_PROTOCOL.md` — new locked Rule 4 + reusable snippets; promoted "The Three Rules"
    → "The Four Rules"; image-deliverable section now lists thumbnail wiring.
  - `08_DEPLOYMENT_GUIDE.md` — the ready-to-paste deploy prompt (handoff item 7) now MUST wire
    the hub + category card thumbnails automatically and PASS/FAIL-check them; added a
    Post-Publish checkbox and a "blank gradient card" troubleshooting entry.
  - `PRE_DEPLOY_CHECKLIST.md` — new section **C2** verifying no listing card is left as a bare
    gradient when its `-og.webp` exists.
  - `06_PRODUCTION_PLAYBOOK.md` — "After Building" step 2 now includes Rule 4 thumbnail wiring.
  - `09_AUDIT_PLAYBOOK.md` — monthly technical spot-check gains a listing-thumbnail sweep to
    catch regressions across the hub + all category pages.

---

## 2026-06-24 (later) — Blog hub + category pages

- Built public/blog.html (blog hub: Blog + BreadcrumbList schema, light hero, link-style
  category tabs, featured What-Is-StudyRise + 3-card latest grid, get-notified block, CTA).
- Built category pages public/blog/study-skills.html (CollectionPage, 2 live articles,
  indexable) and public/blog/mbbs.html + public/blog/university-courses.html (CollectionPage,
  calm empty state, robots noindex/follow until first article; excluded from sitemap).
- sitemap.xml corrected: added /blog, /blog/study-skills, and the live-but-missing
  /blog/medical-licensing-exams and /blog/amc-mcq-study-plan (with image entries).
- KNOWN DEBT to reconcile: publisher.logo.url is inconsistent across pages — three
  filenames in use (studyrise-logo-deep.svg, /logo.svg, studyrise-logo-tagline-footer.svg).
  Standardise on one verified asset in a later pass.

---

## 2026-06-24
- Built `/blog/medical-licensing-exams` category page (file 10 §5.3 recipe; CollectionPage + BreadcrumbList). Populated with the live amc-mcq-study-plan card. Passes Pre-Delivery Gate. Pipeline (05) + registry (12) rows set to live; corrected the stale how-to-pass-amc-mcq-in-4-months note in 12.
- **Built flagship #2** `spaced-repetition-for-exams.html` ([ALL], Study Skills). Direct-answer + fan-out passages, 1–3–7–14–30 schedule as inline accessible table, Cepeda et al. 2008 + Khan Academy externals. Outbound: how-to-make-a-study-plan, what-is-studyrise, study-planner, ?auth=register. Inbound edits to #1 and #3 queued. OG brief delivered; no hero/in-article image (article header + inline figure).

---

## 2026-06-23 — Retire "early access" language across all live surfaces

- `public/features.html` — replaced all 5 occurrences of stale "early access" / "free for a
  limited time" copy: meta description, OG description, Twitter description, FAQ JSON-LD answer,
  and FAQ visible answer. New copy: "Free for 30 days — no card required."
- `src/content/legal/terms-v1.0.0.md` — §8 "Free trial" bullet renamed "Free access period";
  duration corrected from 14 days to 30 days to match the live offer.
- `src/screens/Profile.jsx` — plan badge label changed from "Free Trial" to "Free — 30 days".
- `public/amc-mcq-study-planner.html` — already deleted (separate commit). All known live
  surfaces are now free of the retired "early access" phrase.

---

## 2026-06-23 — Deleted amc-mcq-study-planner.html

- Removed `public/amc-mcq-study-planner.html` from the repo and redeployed to purge it from
  the live site. No other pages, internal links, or nav entries referenced this file.

---

## 2026-06-23 — Pricing model v2: per-mode plans, regional pricing, gate keys

- `11_PRICING_MODEL.md` fully rewritten (v2). Expanded from copy-rules-only to the full
  pricing reference. All v1 copy rules preserved verbatim. Added: per-mode pricing plans
  (Exam Pass; MBBS 6-month/yearly + Batch Pass; University two-tier — BD via bKash, global
  via card); payment-rail-as-PPP-fence regional architecture; batch/campus channel +
  ambassador rewards; audited Free-vs-Pro feature summary per mode; per-mode upgrade copy.
  Three price pairs remain UNCONFIRMED ([ISTIAQUE: confirm]) — not to be hard-coded into
  any live HTML until sign-off.
- `01_CONTEXT.md` — file-index row for 11 updated to reflect the expanded scope.
- New dev-project artifact (NOT in this repo): StudyRise_Gate_Keys_Config.md — flat
  gate-key list + caps per mode, for the app-dev project to implement paywalls against.
  Referenced from 11 §5.
- Unchanged: copy rules, CTA patterns, tone rules, approved/banned phrases (all preserved
  from v1); files 02–10, 12, FEATURES.md, and all live pages. No HTML touched.

---

## 2026-06-22 — Removed stale build-mechanism references (verbatim-partials alignment)

- Removed the remaining stale `<!--#include-->` / `build_site.py` references from
  `06_PRODUCTION_PLAYBOOK.md` (the "THE ARTICLE HTML TEMPLATE" block — `<!--#include nav-->` /
  `<!--#include footer-->` replaced with the verbatim-partial directive) and
  `08_DEPLOYMENT_GUIDE.md` (the "Page Types & Rewrites" sentence — rewritten to state nav/footer
  partials are reproduced verbatim from `templates/partials/nav.html` and `footer.html`, with no
  `build_site.py` / build step in this content project).
- Aligned to the verbatim-partials mechanism per `10_SITE_SHELL.md`. In `10_SITE_SHELL.md` the
  bootstrap-appendix `build_blog.py` / `<!--#include-->` injection line was labelled SUPERSEDED
  (historical context preserved, not deleted).
- No live page edited — knowledge files only.

---

## 2026-06-22 — New file 12: internal-link registry + build-time wiring

- **New file `12_INTERNAL_LINKS.md`** — the site map + internal link registry. Holds the page
  registry, the live-page link graph (links-out / linked-from), the linking rules (no orphans;
  hub-and-spoke; ≥1 inbound per page; cap 1–3 inbound edits; descriptive anchors; inbound edits
  always from a live fetch, never memory), a link-debt ledger seeded from the 2026-06-22 live
  inventory, and a do-now worklist (W1: cross-link the two live articles).
- **`08_DEPLOYMENT_GUIDE.md`** — handoff item 5 (internal-link note) rewritten to derive inbound
  links from file 12 via live fetch; added a session-sequencing rule (Session 1 ship & register,
  Session 2+ wire inbound) so no single Claude Code paste does everything.
- **`06_PRODUCTION_PLAYBOOK.md`** — "After Building" gains an internal-link pass step (read file
  12, add outbound + inbound links, update the registry) ahead of the file 05 update.
- **`09_AUDIT_PLAYBOOK.md`** — monthly Technical spot-check gains an orphan / broken-internal-link
  sweep reconciled against file 12.
- **`01_CONTEXT.md`** — file index and related-docs list updated to include file 12.
- **Decisions captured:** footer category links left as-is (tracked as debt F1, not fixed);
  homepage→/features link parked until /features confirmed 200 (debt H1); the deleted test page
  `/amc-mcq-study-planner` excluded from the registry.
- **No live page edited by this change** — knowledge files only. The W1 article cross-links and
  all future inbound edits run in separate live-fetch sessions.

---

## 2026-06-22 — GEO patch: fan-out coverage, ItemList/comparison rules, visible freshness, GA4 AI-referral tracking

Closed four 2026 GEO gaps across the brain (patch-only; GA snippet, www-canonical rules, `?auth=` URLs, freemium copy, [MBBS-BD] tone, and FAQPage-retired-but-keep guidance all left untouched).

- **Fan-out coverage** — `06_PRODUCTION_PLAYBOOK.md`: added Phase 2 step **2.1b — Map the fan-out** (list the 3–6 sub-queries an AI engine decomposes the head query into; each answered by a self-contained passage), and a Phase 3 outline checklist line requiring every fan-out sub-query to be answered in its own extractable passage (40–60 words, conclusion-first). `PRE_DEPLOY_CHECKLIST.md` §C gained the matching check.
- **Comparison / listicle schema + layout** — `04_SEO_TECHNICAL_RULES.md`: new Structured Data row — comparison / "best/top-N" / listicle pages require `ItemList` stacked with `BlogPosting` + `FAQPage` in one JSON-LD block (ItemList for genuine ranked-list/comparison pages only, never standard articles); new **Comparison Pages** section requiring a summary comparison table within the first screen. `PRE_DEPLOY_CHECKLIST.md` §C gained the matching (comparison-only) check.
- **Visible freshness line** — `04_SEO_TECHNICAL_RULES.md`: new **Freshness Signal** rule (visible `Last updated: {Month YYYY}` near the H1, value must equal JSON-LD `dateModified`). Both article skeletons (`06_PRODUCTION_PLAYBOOK.md` HTML template + `10_SITE_SHELL.md` Appendix B) now render the visible `Last updated: {{Month YYYY}}` line bound to `dateModified`. `PRE_DEPLOY_CHECKLIST.md` §C gained the matching check.
- **GA4 AI-referral tracking** — `03_SEO_STRATEGY.md`: Baseline Setup now configures a GA4 channel/segment/referral filter for `chatgpt.com` / `perplexity.ai` / `gemini.google.com` / `copilot.microsoft.com`; Metrics & KPIs gained an "AI referral sessions & sign-ups (GA4)" monthly KPI row; added a per-type **Freshness cadence by content type** subsection (exam-sensitive/pricing every [CONFIRM: 90 days], evergreen every [CONFIRM: 6 months]; refresh = update facts/dates + bump dateModified + sitemap lastmod + visible "Last updated" line). `09_AUDIT_PLAYBOOK.md`: AI-Visibility Check now pulls the GA4 AI-referral numbers alongside the manual citation count, and the Maintenance Mindset references the file-03 per-type cadence.

---

## 2026-06-22
- **Article handoff now auto-includes a Claude Code deploy prompt.** 08_DEPLOYMENT_GUIDE.md
  handoff package expanded from 6 to 7 items (adds the ready-to-paste Claude Code prompt that
  runs publish end-to-end: folders → file → vercel.json rewrites → sitemap → local checks →
  commit/push → deploy + live-URL verification). 06_PRODUCTION_PLAYBOOK.md "After Building"
  updated to require the prompt with every file, never optional, never split across turns.
  Image generation stays a separate manual ChatGPT/Canva brief; GSC indexing stays a manual
  click. Aligns articles with the marketing-page flow already promised in 10_SITE_SHELL.md §8.

---

## 2026-06-22 — Content pipeline rebuilt from fresh SERP research

- Retired the entire previous article queue (Tiers 1–5, #1–#84) from `05_CONTENT_PIPELINE.md`
  and replaced it with a research-driven structure: **4 flagship pillars** + **Cluster A**
  (AMC MCQ, 5 articles) + **Cluster B** (University, 11 articles incl. multi-scale calculator
  tools) + **Cluster D** (MBBS Bangladesh, 6 articles) + **Cluster E** (Study technique, 5
  articles) + **Cluster F** (Planner/tracker comparisons, 5 articles) + **Product-incorporation
  set** (5 articles) = **41 pieces total**.
- Research method: live Google SERP / People Also Ask / autocomplete analysis (2026-06-22).
  No search-volume figures recorded — Semrush MCP was plan-gated and GSC/Trends/GA were not
  connected. `Diff` column is qualitative SERP difficulty, not a KD score. Rows marked `✓`
  (SERP-validated this pass) or `∘` (confirm volume + SERP at Brief stage before writing).
- PLAB 1/UKMLA and USMLE Step 1 clusters, their segment landing pages, and their product
  setup guides moved to a new **"Backlog — not in this build"** section (parked, not deleted).
- Segment landing pages trimmed to four: study-planner (general), MBBS Bangladesh, AMC MCQ
  Planner, University Planner. Blog hub + 4 category pages retained.
- All BMDC curriculum facts sourced from `FEATURES.md` only — confirmed in the cluster D
  header note and the keyword-research caveat block.

---

## 2026-06-22 — Pricing model update: early access → freemium

- **New file: `11_PRICING_MODEL.md`** — canonical pricing reference. Defines the freemium
  model (30-day full access → Free forever + Pro subscription), approved/banned copy phrases,
  tone rules per audience, CTA patterns per surface, and the pricing page spec. All other
  brain files reference this document for pricing copy.
- **`02_BRAND_VOICE.md`** — 6 targeted edits: §7.2 banned-words table split "premium/unlock"
  from "upgrade" (upgrade now permitted on pricing page only); §7.2 "free trial" reason
  updated; §7.4 renamed from "Early Access Copy Rules" to "Pricing Copy Rules" with new
  approved/banned phrase list; §6.3 social bio templates replaced "Free during early access"
  with "Try it free"; §6.4 email framing rewritten for 30-day model; §6.5 ad rule updated.
- **`06_PRODUCTION_PLAYBOOK.md`** — article template CTA band secondary line changed from
  "Start free — full access, no card required" to "Start free — no card required."
- **`10_SITE_SHELL.md`** — both skeleton templates (marketing + article) CTA band secondary
  line updated identically.
- **`01_CONTEXT.md`** — file index table and related-docs list updated to include file 11.
- **`DOCS_MAP.md`** — seo_content_brain description updated to mention pricing model.
- **Retired phrases:** "free during early access," "full app access is free for a limited
  time," "start free — full access, no card required" (as permanent CTA). These belonged to
  the early-access era and are no longer accurate.
- **What didn't change:** 03 (SEO strategy), 04 (technical rules), 05 (pipeline), 07 (images),
  08 (deployment), 09 (audit), PRE_DEPLOY_CHECKLIST, MOTION_GUIDE, BLOG_ANIMATIONS_GUIDE,
  BRAND_KIT, FEATURES.md, 02_MBBS_PRODUCT_SPEC — all confirmed clean of pricing copy.

---

## 2026-06-22 — Content pipeline rebuilt from fresh SERP research

- Retired the old 05 article queue (Tiers 1–5, #1–#84) and replaced it with a
  research-driven structure: 4 flagship pillars + Cluster A (AMC MCQ), Cluster B
  (University, incl. multi-scale calculator tools), Cluster D (MBBS Bangladesh),
  Cluster E (study technique), Cluster F (planner comparisons), and the product-
  incorporation set — 41 pieces total.
- Researched 2026-06-22 via live Google SERP/PAA/autocomplete + FEATURES.md.
  No search volumes recorded (Semrush MCP plan-gated; GSC/Trends/GA not connected);
  difficulty is qualitative; rows marked ✓ SERP-validated or ∘ confirm-at-brief.
- PLAB 1/UKMLA and USMLE clusters, their landing pages, and their setup guides moved
  to a new "Backlog — not in this build" section (parked, retained).
- Segment landing pages trimmed to AMC / University / MBBS-BD (+ general study-planner);
  blog hub + 4 category pages retained.

---

## 2026-06-21 — Nav/footer mechanism simplified

- Dropped the build-time include-placeholder approach (`<!--#include nav-->` +
  build_site.py/build_blog.py). Pages now reproduce templates/partials/nav.html and
  footer.html verbatim; partials are the single source of truth and are uploaded into the
  content project's knowledge. Gate updated to verify verbatim nav/footer and the
  studyrise-logo-deep.svg footer logo (never studyrise-logo-white.svg). No build script
  in the content project.

---

## 2026-06-21 (later still)

- **Anti-drift hardening (after the /features page reinvented the design system):** added
  Appendix F (Component & Token Inventory) and Appendix G (full marketing-page skeleton) to
  10_SITE_SHELL.md; strengthened the Golden Rules and the gate (04 + PRE_DEPLOY_CHECKLIST) to
  forbid re-declared `:root` tokens / hard-coded fonts, require page CSS in one small head
  `page-styles` block, require the full 3-font stack, and require reuse of existing core classes.
  Process: keep studyrise-core.css + studyrise-chrome.js uploaded to the content project so the
  builder can read the real styles.

---

## 2026-06-21 (later)

- **New shared shell system + 10_SITE_SHELL.md.** Added a site-wide frame: studyrise-core.css
  (tokens, nav, footer, buttons, type, heroes, prose, blog/article components) and
  studyrise-chrome.js (nav scroll, mobile menu, reveal, reading-progress, TOC, share, notify
  form — all feature-detected) at /public/assets/; nav.html + footer.html partials at
  /templates/partials/ as the single source of truth for menu and footer (injected at build
  via #include placeholders). Every page now links the two assets and includes the partials.
- **Page-type recipes locked** (marketing / blog index / category / article) in 10_SITE_SHELL.md.
- **Hero rule:** marketing = dark hero; blog + all [MBBS-BD] pages = light hero; articles use
  the article header.
- **Footer brand fixed:** deep lockup /assets/brand/studyrise-logo-deep.svg at 80px, directly
  above the tagline; tagline trimmed to "Plan today. Rise tomorrow." (Resolves the broken
  footer logo — the old studyrise-logo-white.svg never existed.)
- **Fonts:** Plus Jakarta Sans added site-wide for display headings (was Inter-only).
- **Blog categories locked:** Medical Licensing Exams, MBBS, University Courses, Study Skills,
  each with a real category page (/blog/medical-licensing-exams, /blog/mbbs,
  /blog/university-courses, /blog/study-skills).
- **04 gate extended** with shared-shell checks; **06 article template replaced** with the
  shell-based skeleton.
- **Nav adds Contact** (/contact); menu is now edited in one place (nav.html).
- **Brain files synced to the shell:** PRE_DEPLOY_CHECKLIST.md (mirror gate), 09 (audit
  spot-check), 08 (non-article page types + asset/partial dependency), 01/README/DOCS_MAP
  (file index), all updated. 05 adds the blog hub + 4 category pages to the queue. 07 image-brief
  font switched to Plus Jakarta Sans for headings. MOTION_GUIDE + BLOG_ANIMATIONS_GUIDE now
  cross-reference studyrise-chrome.js as the source of truth for motion.
- **Deferred:** 03_SEO_STRATEGY.md category taxonomy / keyword→URL placement — pending keyword
  research; to be updated in a later session.

---

## 2026-06-21

- **Clean slate on live pages.** All static marketing + blog pages and their OG/blog images
  were deleted; only the homepage (/) remains live. sitemap.xml reset to homepage-only;
  vercel.json marketing/blog rewrites removed. Deleted: /study-planner, /pricing,
  /mbbs-bangladesh, /features, mbbs-landing, /blog/what-is-studyrise,
  /blog/how-to-pass-amc-mcq-in-4-months. Pipeline rows for these reset to
  "rebuild-pending" (plans/keywords retained); strategy/context/audit files updated to stop
  treating them as live. Rebuild will follow a new page-creation framework.
- **Auth contract set to as-built Option A (no redirect, param not persisted).** CTAs link to
  /?auth=register and /?auth=login. A vercel.json 200-rewrite serves /app.html when ?auth=* is
  present (ordered before / -> /landing.html); LandingPageStatic.jsx lazy-loads <LandingPage />,
  which opens the modal and calls history.replaceState to wipe ?auth=* to /. No 308 redirect.
  The 3 old ?auth=* 308 redirects were removed. Documented in 04, 08 (and 09).
- **FAQ schema reframed** as an AI/GEO extraction signal (Google retired FAQ rich results
  2026-05-07). New rule: FAQ answers lead with the answer in ~40 words (conclusion first).
  Updated in 03, 04, 06.
- **New PRE_DEPLOY_CHECKLIST.md** added and wired into 01, 06, 08, DOCS_MAP — verifies a page
  is actually served as static HTML (not the app shell) before going live.
- Author remains the StudyRise Organization — no personal byline (deliberate).
- Note: a brain-framework rework is planned next; these edits keep the current brain truthful
  in the interim.

---

## 2026-06-20

**SEO Sessions — historical completions (resolved into pipeline 2026-06-20):**
- **SEO Session 0** ✅: `?auth=signup` / `?auth=login` URL-param support added to `LandingPage.jsx` (`useEffect` reads `window.location.search`, sets `authMode` + `showAuth`).
- **SEO Session 1** ✅: `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png` created; `app.html` SEO meta / OG / canonical tags added; `vercel.json` rewrites scaffolded (entries for `/features` and `/blog/how-to-create-a-study-plan` deferred alongside Sessions 3 and 5).
- **SEO Session 2** ✅: `public/study-planner.html` built and live at `/study-planner`.
- **SEO Session 4** ✅: `public/pricing.html` built and live at `/pricing`.

Brain reconciled to live site:

- **Auth redirect updated**: `?auth=*` query params 308-redirect to `/login` or `/register`; auth-route contract documented in `04_SEO_TECHNICAL_RULES.md` and `08_DEPLOYMENT_GUIDE.md`.
- **`/features` status**: page removed from indexable list pending restore; `09_AUDIT_PLAYBOOK.md` notes it must appear under `Allow` in `robots.txt` before the restored page is deployed.
- **CTA targets corrected**: sign-up CTAs now point to `https://www.studyrise.app/?auth=register`; returning-user copy points to `https://www.studyrise.app/?auth=login` (updated in `04_SEO_TECHNICAL_RULES.md`).
- **Vercel project name corrected**: `amc-tracker` → `studyrise` in `08_DEPLOYMENT_GUIDE.md`.
- **Bare-host → www**: bare `https://studyrise.app/...` URLs replaced with `https://www.studyrise.app/...` across `02_BRAND_VOICE.md`, `04_SEO_TECHNICAL_RULES.md`, `05_CONTENT_PIPELINE.md`, `08_DEPLOYMENT_GUIDE.md`.
- **Homepage JSON-LD**: `landing.html` `WebSite` + `Organization` schema blocks documented as maintained structural assets in `04_SEO_TECHNICAL_RULES.md`.
- **Root-level brain dupes deleted**: all `.md` files at repo root whose names exactly matched a file inside `docs/seo_content_brain/` were removed (14 files); unique-content files (`BLOG_ARTICLE_LIST.md`, `SEO_MASTER_BLUEPRINT.md`, `SEO_ROUTING_FIX.md`, `CLAUDE.md`) were preserved.
