---
title: Article Production Playbook
type: content
sources: [raw/brain-v1/06_PRODUCTION_PLAYBOOK.md]
created: 2026-06-24
updated: 2026-07-03
---

# Article Production Playbook

## 5-Phase Process

### Phase 1: Brief
Define target keyword, audience segment, intent tier, and content angle.

### Phase 2: Research
Fan-out sub-query mapping — identify all "People Also Ask" and related queries. Research SERP competitors. Gather facts (never guess medical facts).

### Phase 3: Outline
Structure with H2/H3 hierarchy. Map sub-queries to sections. Plan internal links to existing articles.

### Phase 4: Write
Follow [[Brand Voice]] exactly. Direct-answer openings. FAQ section. Freshness date visible.

### Phase 5: Build
Produce complete HTML using the article template from [[Site Shell System]]:
- GA snippet (G-R38JK89PP5) included
- studyrise-core.css + studyrise-chrome.js linked
- Nav/footer partials included verbatim
- JSON-LD BlogPosting + FAQPage schema
- OG/Twitter meta tags
- Canonical URL with www
- Internal CTA links use the clean paths (`/login`, `/register`) — never `/?auth=login` or
  `/?auth=register`; see [[SEO Strategy]] 2026-07-03 addendum
- `<aside class="rail">…</aside>` sticky right-rail markup per the symmetric 3-column article
  shell (see [[Site Shell System]] § Article shell, 2026-07-03) — required on every new article,
  not optional

## After Building
1. Run [[SEO Technical Checklist]]
2. Run [[Pre-Deploy Checklist]]
3. Prepare [[Image Protocol]] deliverables
4. Create 7-item handoff package per [[Deployment Guide]]
5. Update [[Content Pipeline]] with new status
6. Update [[Internal Link Strategy]] with new links

## Image Deliverables
OG image brief → Canva → 1200×630 WebP. See [[Image Protocol]].
