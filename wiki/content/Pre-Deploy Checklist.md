---
title: Pre-Deploy Checklist
type: content
sources: [raw/brain-v1/PRE_DEPLOY_CHECKLIST.md]
created: 2026-06-24
updated: 2026-06-24
---

# Pre-Deploy Checklist

Last gate before any page goes live. Five sections.

## A: Page Actually Served
Verify the page renders as static HTML, not the app shell. Look for tell-tales of SPA fallback.

## B: Technical Gate
Full [[SEO Technical Checklist]] pass — GA, title, canonical, OG, JSON-LD, headings, images, mobile.

## C: AI-Readability (GEO)
- Direct-answer opening paragraph (no preamble)
- FAQ schema present
- Fan-out sub-query passages matching "People Also Ask"

## C2: Listing Card Thumbnail (Rule 4)
Thumbnail wires to OG image. No bare gradient. See [[Image Protocol]].

## D: Sitemap
- Entry added to sitemap.xml
- `<lastmod>` date set correctly

## E: GSC Indexing
Request indexing in Google Search Console after deploy.
