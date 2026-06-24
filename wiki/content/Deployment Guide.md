---
title: Deployment Guide
type: content
sources: [raw/brain-v1/08_DEPLOYMENT_GUIDE.md]
created: 2026-06-24
updated: 2026-06-24
---

# Deployment Guide

## 7-Item Handoff Package
Every article deploy requires:
1. HTML file
2. OG image (WebP)
3. vercel.json rewrite entry
4. sitemap.xml entry with lastmod
5. Internal links added to existing articles
6. Claude Code deploy prompt
7. Post-publish verification

## Sequenced Session Pattern
- **Session 1:** Ship the article (HTML + image + config)
- **Session 2+:** Add inbound links from existing live pages

## File Naming
`public/blog/{slug}.html` — slug matches the target keyword URL.

## Sitemap Entry Format
Standard XML with `<lastmod>` set to publish date.

## Post-Publish Checklist
1. Verify live URL renders correctly
2. Check OG image in social share debuggers
3. Request GSC indexing
4. Verify GA tracking fires
5. Check mobile rendering

## Related
[[Pre-Deploy Checklist]], [[Deployment Architecture]], [[SEO Technical Checklist]]
