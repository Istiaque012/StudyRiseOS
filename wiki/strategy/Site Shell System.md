---
title: Site Shell System
type: strategy
sources: [raw/brain-v1/10_SITE_SHELL.md]
created: 2026-06-24
updated: 2026-07-03
---

# Site Shell System

Shared shell for all static HTML pages: `studyrise-core.css` + `studyrise-chrome.js` + nav/footer partials.

> **No local copy lives in this repo.** `footer.html`, `nav.html`, `studyrise-core.css`, and
> `studyrise-chrome.js` used to be duplicated at this repo's root for a pre-Claude-Code workflow
> (manually re-uploading them to a separate content project's knowledge). That workflow is
> superseded — Claude Code now has direct filesystem access to both repos. The root-level copies
> were removed 2026-07-03 after they were found ~2 weeks stale relative to the live files (missing
> a shipped SEO fix and an in-progress layout change). **To see the current shell, read it live
> from `StudyRise App`:** `public/assets/studyrise-core.css`, `public/assets/studyrise-chrome.js`,
> `templates/partials/nav.html`, `templates/partials/footer.html`. Never trust a cached/local copy.

## 8 Golden Rules
1. No re-declared tokens — use studyrise-core.css tokens only
2. Page CSS in one `<style id="page-styles">` block
3. 3-font stack required on every page
4. Hero rule: dark=marketing, light=blog/MBBS-BD, art-head=article
5. Nav/footer from `templates/partials/` — pages carry `<!--#include nav-->` / `<!--#include footer-->` anchors and `build_site.py` injects the partials; never hand-author or modify nav/footer per-page
6. Menu items: **Features · Pricing · Study Planner · Blog** (Study Planner shipped 2026-07-02)
7. All pages must reference studyrise-core.css and studyrise-chrome.js
8. Mobile-first, 375px floor

## Uniform shell — canonical = `landing.html` (2026-07-02)

Every static page's nav + footer must be **byte-identical to `landing.html`**. Enforced by the
shared partials + `build_site.py` include model in the website repo — all 34 static pages
(marketing + blog + help) verified identical after the 2026-07-02 unification (which fixed drift
into 4 nav / 5 footer variants). React legal pages (`/privacy`, `/terms`) wear the same chrome via
`MarketingNav.jsx` + `MarketingFooter.jsx`, kept in sync by hand. Footer Product column:
Features · Pricing · Study Planner · Blog · [[Help Center]]. See [[Help Center]] for the footer
default rule.

## Page-Type Recipes
Each page type (marketing, blog article, blog listing, segment landing) has a defined structure. See source for full recipes.

### Article shell — symmetric 3-column + sticky rail (2026-07-03, PR #68 + #73)
Blog and Help Center articles (`.art-wrap` in `studyrise-core.css`) now render as a 3-column
grid — `200px` TOC | `minmax(0,1fr)` content (~620px, ~64-char measure) | `216px` sticky right
rail — instead of the old lopsided `210px 1fr` two-column layout that left dead space on the
right and put the body's left edge out of step with the centered 760px hero above it. The rail
holds a "Continue reading" list (sourced from the page's own `.related`/`.sib` block — no new
data) plus a compact CTA card, and is `position:sticky` like the TOC. Responsive ladder: **≤960px**
(lowered from an initial 1080px after real-device testing in PR #73) drops the rail → 2-column;
**≤920px** collapses to single-column with the TOC static, matching the 760px hero width. This is
a **durable rule**, not a one-off: every new blog/help article must include the
`<aside class="rail">…</aside>` markup (3rd `.art-wrap` grid child) — the copy-paste skeleton
lives in the App repo's `docs/dev-os/static-site-notes.md`. Applies to all 21 existing article
pages (5 blog + 16 [[Help Center]] articles); marketing pages (`.wrap`, symmetric already) are
untouched.

## Component & Token Inventory
Full appendix of all available tokens and components in the shell system.

## Related
[[Brand Visual System]], [[Motion & Animation]], [[SEO Technical Checklist]]
