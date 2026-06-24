---
title: Image Protocol
type: content
sources: [raw/brain-v1/07_IMAGE_PROTOCOL.md]
created: 2026-06-24
updated: 2026-06-24
---

# Image Protocol

## Four Locked Rules

### Rule 1: OG Image
Always from Canva/ChatGPT brief. 1200×630 WebP. Saved to `/blog/images/{slug}-og.webp`.

### Rule 2: Hero Image
By importance — not every article needs one. When used: 1200×675.

### Rule 3: In-Article Images
Both generated and sourced. Alt text required. WebP format.

### Rule 4: Listing Card Thumbnails (INVARIANT)
Blog listing card thumbnails MUST wire to the OG image. Gradient-only thumbnail = bug. This is checked in [[Pre-Deploy Checklist]].

## OG Image Brief Format
Structured brief sent to Canva with: title, subtitle, visual concept, brand colors. See source for exact format.
