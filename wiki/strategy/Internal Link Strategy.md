---
title: Internal Link Strategy
type: strategy
sources: [raw/brain-v1/12_INTERNAL_LINKS.md]
created: 2026-06-24
updated: 2026-06-24
---

# Internal Link Strategy

Living site map and internal link registry for studyrise.app.

## Architecture
Hub-and-spoke model:
- **Hubs** = segment pages, blog category pages
- **Spokes** = individual articles linking back to hubs
- No orphan pages allowed — every page has at least one inbound link

## Page Registry
Every live page tracked with: URL, title, status (live/draft), primary keyword.

## Link Graph
Maintained as outbound/inbound link counts per page. Identifies:
- Pages with zero inbound links (orphans → fix immediately)
- Pages with low outbound links (missed cross-reference opportunities)

## Link-Debt Ledger
Tracks known issues:
- **O-series** — orphan pages needing inbound links
- **D-series** — dead links needing removal or redirect
- **F-series** — freshness issues
- **H-series** — hub connection gaps

## Rules
- New articles must link to at least 2 existing articles
- Existing articles must be updated to link back to new articles (Session 2+ pattern from [[Deployment Guide]])
- Inbound link edits always done from live-fetched HTML, never from memory
