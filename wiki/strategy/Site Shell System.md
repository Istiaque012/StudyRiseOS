---
title: Site Shell System
type: strategy
sources: [raw/brain-v1/10_SITE_SHELL.md]
created: 2026-06-24
updated: 2026-06-24
---

# Site Shell System

Shared shell for all static HTML pages: `studyrise-core.css` + `studyrise-chrome.js` + nav/footer partials.

## 8 Golden Rules
1. No re-declared tokens — use studyrise-core.css tokens only
2. Page CSS in one `<style id="page-styles">` block
3. 3-font stack required on every page
4. Hero rule: dark=marketing, light=blog/MBBS-BD, art-head=article
5. Nav/footer from `templates/partials/` — verbatim, never modified per-page
6. Menu items: Features · Pricing · Blog
7. All pages must reference studyrise-core.css and studyrise-chrome.js
8. Mobile-first, 375px floor

## Page-Type Recipes
Each page type (marketing, blog article, blog listing, segment landing) has a defined structure. See source for full recipes.

## Component & Token Inventory
Full appendix of all available tokens and components in the shell system.

## Related
[[Brand Visual System]], [[Motion & Animation]], [[SEO Technical Checklist]]
