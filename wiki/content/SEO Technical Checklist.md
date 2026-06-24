---
title: SEO Technical Checklist
type: content
sources: [raw/brain-v1/04_SEO_TECHNICAL_RULES.md]
created: 2026-06-24
updated: 2026-06-24
---

# SEO Technical Checklist

Non-negotiable requirements for every HTML page.

## Mandatory
- [ ] GA snippet G-R38JK89PP5 present
- [ ] Canonical URL with `www.studyrise.app`
- [ ] OG + Twitter meta tags complete
- [ ] JSON-LD schema (BlogPosting, FAQPage, Organization, SoftwareApplication as applicable)
- [ ] Heading structure: one H1, logical H2/H3 hierarchy
- [ ] Images: alt text, WebP, lazy loading
- [ ] Auth route contract: `?auth=register` (Option A)
- [ ] studyrise-core.css + studyrise-chrome.js linked
- [ ] Visible freshness date line

## Core Web Vitals Targets
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

## Mobile
- Mobile-first design
- 375px minimum viewport floor
- Touch targets 44px minimum

## Schema Types by Page
- Blog article → BlogPosting + FAQPage
- Comparison page → ItemList
- Product page → SoftwareApplication
- All pages → Organization
