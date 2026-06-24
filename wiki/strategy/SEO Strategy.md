---
title: SEO Strategy
type: strategy
sources: [raw/brain-v1/03_SEO_STRATEGY.md, raw/brain-v1/12_INTERNAL_LINKS.md]
created: 2026-06-24
updated: 2026-06-25
---

# SEO Strategy

## Keyword-to-URL Mapping
Every target keyword maps to exactly one URL. No keyword cannibalization. The [[Content Pipeline]] maintains the master list.

## Intent Tiers
- **T (Transactional)** — Ready to sign up. Target with product pages + landing pages.
- **C (Commercial)** — Comparing options. Target with comparison articles + feature pages.
- **I (Informational)** — Learning about the topic. Target with blog articles + guides.

## AI Overview Strategy (GEO)
Optimizing for Google AI Overviews, ChatGPT, Perplexity, and Gemini citations:
- Direct-answer opening paragraphs (no preamble)
- FAQ schema on every article
- Fan-out sub-query passages that match "People Also Ask"
- Entity building through consistent structured data

## Hub-and-Spoke Topical Clusters
- Hub pages = category/segment pages (e.g., `/blog/exam-prep/`)
- Spokes = individual articles linking back to hub
- Every spoke links to its hub; hub links to all spokes
- See [[Internal Link Strategy]] for the link graph

## Competitive Landscape
_(To be populated as competitor analyses are ingested)_

## Regional SEO
MBBS-BD content targets Bangladesh specifically. Exam content targets Australia (AMC), UK (PLAB), US (USMLE).

## Active Remediation
See [[SEO Remediation 2026-06]] for the live-site audit (2026-06-24). Key standing lesson: renamed/retired URLs must get a 301 in `vercel.json` and every real page must be a static page (not an SPA catch-all fallthrough that returns a homepage canonical). Two P0s — the AMC blog slug rename and the `/amc-mcq-study-planner` ghost sitemap entry — are currently bleeding the site's only non-branded traffic.

## Social Distribution & SEO
YouTube is the most search-driven social platform — titles and descriptions should include target keywords. Social posts that link to articles use UTM parameters for GA4 tracking. See [[Social Playbook]] for the full UTM structure and platform-specific SEO notes (YouTube titles, LinkedIn dwell-time optimization).

## Maintenance Cadence
- Evergreen content: review quarterly
- Data-driven content: refresh when data changes
- News/trend content: review monthly
- All content: freshness line visible on page
