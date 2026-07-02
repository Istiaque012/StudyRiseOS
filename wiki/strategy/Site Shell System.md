---
title: Site Shell System
type: strategy
sources: [raw/brain-v1/10_SITE_SHELL.md]
created: 2026-06-24
updated: 2026-07-02
---

# Site Shell System

Shared shell for all static HTML pages: `studyrise-core.css` + `studyrise-chrome.js` + nav/footer partials.

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

## Component & Token Inventory
Full appendix of all available tokens and components in the shell system.

## Related
[[Brand Visual System]], [[Motion & Animation]], [[SEO Technical Checklist]]
