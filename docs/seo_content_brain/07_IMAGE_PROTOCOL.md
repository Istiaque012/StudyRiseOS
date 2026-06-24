# 07 · IMAGE PROTOCOL — The Locked Image Rules

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** Exactly how images are handled for every article. These three rules are fixed — follow them every time without being asked. They balance speed (real images embedded automatically) with brand quality (briefs for the pieces that matter).

---

## The Four Rules (locked)

| Image type | Rule |
|---|---|
| **OG image** | **Always** a Canva/ChatGPT brief. Never sourced from a stock site. Every article, no exceptions. |
| **Hero image** | **Important article** → Canva/ChatGPT brief. **Quick article** → real Unsplash/Pexels URL, embedded directly in the HTML. |
| **In-article images** | **Both, automatically:** embed a real Unsplash/Pexels URL directly in the HTML **and** write a Canva/ChatGPT brief as a backup option. |
| **Listing card thumbnail** | **Always wired to the article's real OG image.** Every card on the blog hub (`public/blog.html`) and on the article's category page (`public/blog/{category}.html`) MUST set `background-image:url('/blog/images/{slug}-og.webp')`. A bare gradient thumbnail is a **placeholder, never a finished state** — see "Rule 4" below. |

"Important vs quick" is decided in Phase 1 of the playbook. When unsure, treat segment-landing-adjacent and cornerstone pieces as important; treat long-tail informational pieces as quick.

---

## Rule 4 — Listing card thumbnails (the rule that prevents blank blog cards)

> **Why this rule exists.** The blog hub and category pages render each article as a card whose thumbnail is a `<div>` carrying *only* a CSS gradient by default. That gradient is a styling placeholder, not a finished thumbnail — and because it looks deliberate (no broken-image icon), a missing image is invisible until someone notices the hub is all flat gradient blocks. **An article is not "shipped" until its listing cards point at its real OG image.**

**The locked behaviour — every time an article goes live, with no reminder:**

1. The article's OG image already lives (or will live) at `public/blog/images/{slug}-og.webp` (same file the `og:image` tag points to — one image, reused).
2. **On the blog hub** (`public/blog.html`) and **on the article's category page** (`public/blog/{category}.html`), the card linking to `/blog/{slug}` must have its thumbnail wired to that image. Keep the existing gradient as a fallback layer (it shows only if the image ever fails to load).

**Exact snippet — featured `.fthumb` card:**
```html
<div class="fthumb" style="background-image:url('/blog/images/{slug}-og.webp');background-size:cover;background-position:center"></div>
```

**Exact snippet — grid `.thumb` card (gradient kept as fallback):**
```html
<div class="thumb" style="background:linear-gradient(135deg,#2563EB,#06B6D4);background-image:url('/blog/images/{slug}-og.webp');background-size:cover;background-position:center"></div>
```

**The invariant to check:** any card whose `href` is `/blog/{slug}` AND whose article has an OG image file present must have a `background-image` on its thumbnail. A gradient-only thumbnail on such a card = bug. This is verified in `PRE_DEPLOY_CHECKLIST.md` (gate), wired automatically by the deploy prompt in `08_DEPLOYMENT_GUIDE.md` (handoff item 7), and swept periodically in `09_AUDIT_PLAYBOOK.md`.

---

## Dimensions & Technical Specs

| Image | Size | Format | Notes |
|---|---|---|---|
| OG image | 1200 × 630 | WebP/PNG | Referenced in `og:image`; filename `{slug}-og.webp` |
| Hero image | 1200 × 675 (16:9) | WebP/JPG | Top of article |
| In-article | ≤ 1200 wide | WebP/JPG | Sized to content; `loading="lazy"` if below fold |

Every `<img>` always carries **alt + width + height** (file 04). Alt text describes the image honestly; include the keyword only where it reads naturally.

---

## Sourcing Real Images (Unsplash / Pexels)

For hero (quick pieces) and in-article images, embed a **real, working** image URL. Process:

1. Search Unsplash or Pexels for a relevant, professional, non-cheesy image (study, medicine, planning, focus — match the article).
2. Use a direct image URL with sizing parameters, e.g. Unsplash's `?w=1200&q=80&fm=webp` style, or a Pexels-hosted size.
3. **Verify the URL actually loads** before putting it in the HTML (fetch it). Never embed a guessed or constructed URL that you haven't confirmed resolves.
4. Note in the delivery that Istiaque can later download and re-host as a local WebP in `/blog/images/` for best performance — embedding hotlinked stock is fine to launch, local is better long-term.
5. Respect licensing: Unsplash and Pexels are free for commercial use; still pick images that look on-brand, not generic stock clichés.

If you genuinely can't find a fitting real image, fall back to a Canva/ChatGPT brief for that slot and say so.

---

## Canva / ChatGPT Brief Template

Every brief gives Istiaque enough to produce the image in 5 minutes — in Canva (manually or via the connected Canva tool) or via ChatGPT/image generation. Use this exact shape:

```
IMAGE BRIEF — {{article title}} · {{OG / Hero / In-article #n}}
─────────────────────────────────────────────
Purpose:      {{what this image is for}}
Dimensions:   {{e.g. 1200×630}}
Filename:     {{slug}}-og.webp   (or -hero / -fig1)

Concept:      {{one-sentence visual idea}}
Composition:  {{layout — what's where, focal point}}
Text overlay: "{{exact text, if any}}"  (keep ≤ 6 words for OG)
Brand colours: gradient #7C3AED → #06B6D4 → #2563EB; navy #0D1B3E for text
              (per BRAND_KIT.md v2.1 — gradient/navy unchanged; ensure text holds
               contrast on both light and dark backings, see §14 dark mode)
Font:         Plus Jakarta Sans (700/800 for headings); Inter for any smaller body text
Mood:         {{calm, focused, professional — match brand}}
Must include: StudyRise logo (bottom-right, small) for OG images
Avoid:        cheesy stock clichés, stethoscope-on-keyboard, fake "AI" glow
─────────────────────────────────────────────
```

For OG images specifically: text overlay should be the article's hook in ≤ 6 words, legible at small sizes, high contrast against the gradient. Because the site now supports dark mode (BRAND_KIT.md §14), don't rely on the *page* background for contrast — bake the contrast into the image itself (gradient or solid panel behind the text), so the OG card reads the same whether it's shown on a light or dark surface.

---

## Using the Connected Canva Tool (optional)

Canva is connected to this project. When Istiaque asks, you can go beyond the brief and actually create or autofill a Canva design from a template, then export it — rather than just describing it. Default to the **brief** (Istiaque's stated preference for control); offer to generate in Canva directly when it would clearly save time.

---

## What Every Article's Image Deliverable Looks Like

When you finish an article, the image section of your handoff contains:

- **1 × OG image brief** (always)
- **Hero:** either an embedded real URL (quick) **or** a hero brief (important) — already reflected in the HTML
- **Each in-article image:** the embedded real URL (already in the HTML) **+** a matching backup brief
- **Listing thumbnails wired** (Rule 4): the deploy prompt has pointed the blog-hub card and the category-page card at `/blog/images/{slug}-og.webp` — so the hub never shows a blank gradient card once the OG image is dropped in.

So Istiaque always has: a live article with real images already in it, its listing cards wired to the OG image, plus briefs to upgrade the OG (mandatory) and any image he wants to replace with branded artwork.


---
<!-- docnav-related -->
### Related docs
- [01 · CONTEXT — Read This First, Every Time](01_CONTEXT.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [03 · SEO STRATEGY — What to Make and Why](03_SEO_STRATEGY.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End](06_PRODUCTION_PLAYBOOK.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [09 · AUDIT PLAYBOOK — Periodic SEO Health Checks](09_AUDIT_PLAYBOOK.md)
- [Blog Page Animation & Motion Guide](BLOG_ANIMATIONS_GUIDE.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)
- [README — How to Use the StudyRise Content & SEO Brain](README.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
