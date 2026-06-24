# Blog Page Animation & Motion Guide

> **Implementation note (2026-06-21).** The motions described in this guide are now implemented
> centrally in `/assets/studyrise-chrome.js` and `/assets/studyrise-core.css` — scroll reveal
> (`.rev`), the reading-progress bar, sticky table-of-contents highlighting, and the
> `prefers-reduced-motion` fallback. Treat this guide as the design *intent*; the shared shell
> files are the source of truth for the actual behaviour. Don't hand-reimplement these per page.
> See `10_SITE_SHELL.md`.

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


How the animations on **https://www.studyrise.app/blog** (`public/blog.html`) are built — and how to reuse them on any other **static marketing HTML page** (`features.html`, `pricing.html`, `study-planner.html`, `mbbs-bangladesh.html`, blog posts, etc.).

> **Key fact:** The blog page uses **zero JavaScript** for motion. Everything is **pure CSS** — `@keyframes` for entrances/loops and `transition` for hover/interactive states. This is deliberate: the marketing pages are server-rendered native HTML for SEO (see `CLAUDE.md` → "SEO note"), so they must animate without a JS framework. **Do not reach for Framer Motion here** — that's only for the React app (`src/`). Copy the CSS below instead.

---

## 1. The motion inventory (what's on the page)

| # | Effect | Type | Selector | Trigger |
|---|--------|------|----------|---------|
| 1 | Progress **ring fills** from empty → 70% | `@keyframes` (run once) | `.mockup-ring-fill` | On page load |
| 2 | Progress **bars grow** from width 0 | `@keyframes` (run once, staggered) | `.mockup-bar-fill` | On page load |
| 3 | **Floating badge** bobs up & down forever | `@keyframes` (infinite) | `.mockup-float-badge` | Continuous loop |
| 4 | **Card lift** on hover (translateY + bigger shadow) | `transition` | `.featured-card`, `.article-card`, `.audience-tile` | Hover |
| 5 | **Top accent line** wipes in left→right | `transition` on `transform: scaleX()` | `.article-card::before` | Hover |
| 6 | **Pill / tile / button** background + border fade | `transition` | `.hero-pill`, `.audience-tile`, `.btn` | Hover |
| 7 | **Reduced-motion** kill switch | media query | all of the above | `prefers-reduced-motion` |

Two motion philosophies are combined:

- **Entrance animations** (1, 2) play once on load using `animation: … both` so the element holds its final state.
- **Ambient + interactive** (3, 4, 5, 6) give the page life without being distracting — one slow infinite loop + snappy hover feedback.

---

## 2. The reusable animation primitives (copy-paste)

All of these are self-contained. Drop the `@keyframes` + the class into any static page's `<style>` block and apply the class to your element. Colors use the page's CSS custom properties (`--blue`, `--green`, etc.) defined in `:root` — copy those tokens too (see §5).

### 2.1 — Ring fill (SVG circular progress)

The ring is an SVG `<circle>` whose `stroke-dasharray` = circumference and `stroke-dashoffset` animates from "empty" to the target. `r=26` → circumference ≈ `2 * π * 26 ≈ 163`. Offset `49` ≈ 70% filled.

```css
.mockup-ring { transform: rotate(-90deg); }        /* start the arc at 12 o'clock */

.mockup-ring-bg {
  fill: none;
  stroke: rgba(255,255,255,0.12);
  stroke-width: 4;
}

.mockup-ring-fill {
  fill: none;
  stroke: var(--blue);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 163;       /* full circumference */
  stroke-dashoffset: 49;       /* final resting state = ~70% */
  animation: ring-fill 2.4s cubic-bezier(0.4,0,0.2,1) both;
}

@keyframes ring-fill {
  from { stroke-dashoffset: 163; }   /* fully empty */
  to   { stroke-dashoffset: 49; }    /* 70% */
}
```

```html
<div class="mockup-ring-container">
  <svg class="mockup-ring" width="56" height="56" viewBox="0 0 56 56">
    <circle class="mockup-ring-bg"   cx="28" cy="28" r="26"/>
    <circle class="mockup-ring-fill" cx="28" cy="28" r="26"/>
  </svg>
  <span class="mockup-ring-center">70%</span>
</div>
```

**To re-target the percentage:** `offset = circumference * (1 − percent)`. For 85% with r=26: `163 * 0.15 ≈ 24`.

### 2.2 — Bar grow (horizontal progress fill)

The bar's final width is set inline (`style="width: 88%"`); the keyframe just animates *from* zero. `!important` in the keyframe beats the inline width during the animation, then the inline value holds.

```css
.mockup-bar-track {
  height: 5px;
  background: rgba(255,255,255,0.10);
  border-radius: 999px;
  overflow: hidden;
}

.mockup-bar-fill {
  height: 100%;
  border-radius: 999px;
  animation: bar-grow 1.8s cubic-bezier(0.4,0,0.2,1) both;
}

@keyframes bar-grow {
  from { width: 0 !important; }
}
```

```html
<div class="mockup-bar-track">
  <div class="mockup-bar-fill" style="width: 88%; background: var(--blue);"></div>
</div>
```

**Stagger trick** (the part that makes it feel premium): add an inline `animation-delay` per bar so they cascade.

```html
<div class="mockup-bar-fill" style="width: 64%; background: var(--purple); animation-delay: 0.15s;"></div>
<div class="mockup-bar-fill" style="width: 51%; background: var(--green);  animation-delay: 0.3s;"></div>
```

### 2.3 — Floating badge (infinite gentle bob)

The one ambient loop on the page. 3.6s, ease-in-out, ±5px. Slow + small = "alive," not "annoying."

```css
.mockup-float-badge {
  position: absolute;
  top: -16px;
  right: -12px;
  /* …visual styling… */
  animation: float-badge 3.6s ease-in-out infinite;
}

@keyframes float-badge {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-5px); }
}
```

Use for any "live status" chip, notification pip, or floating accent over a mockup.

### 2.4 — Card lift on hover

The workhorse hover. `translateY(-Npx)` + a larger shadow. Always `transition` only the cheap properties (`transform`, `box-shadow`) — never `top`/`margin`.

```css
.article-card {
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

Lift distances on this page: article cards `-4px`, featured card `-3px`, audience tiles `-2px`. Bigger card = bigger lift.

### 2.5 — Top accent line wipe (the "scaleX reveal")

A 3px bar sits at the top of each article card, hidden at `scaleX(0)` anchored left, and wipes to full width on hover. The classiest micro-interaction on the page.

```css
.article-card { position: relative; }

.article-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--blue);
  transform: scaleX(0);
  transform-origin: left;                                   /* grows from the left edge */
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  z-index: 1;
}

.article-card:hover::before { transform: scaleX(1); }
```

Reuse for nav underlines, tab indicators, list-row reveals.

### 2.6 — Soft hover (pills, tiles, buttons)

Background/border color fade. Keep it fast (0.15s) for buttons, slightly slower (0.2s) for larger tiles.

```css
.hero-pill {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  transition: background 0.15s, border-color 0.15s;
}
.hero-pill:hover {
  background: rgba(255,255,255,0.14);
  border-color: rgba(255,255,255,0.28);
}

.btn { transition: background 0.15s; }
.btn:hover { background: var(--blue-hover); }
```

Audience tiles combine a soft hover *with* a lift (§2.4):

```css
.audience-tile { transition: background 0.2s, border-color 0.2s, transform 0.2s; }
.audience-tile:hover {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.20);
  transform: translateY(-2px);
}
```

---

## 3. The non-negotiable rule: reduced-motion

**Every** animated page on this site must respect `prefers-reduced-motion`. Entrances snap to their final state, loops stop, transitions are removed. Copy this block verbatim and extend the selector lists with your page's animated classes.

```css
@media (prefers-reduced-motion: reduce) {
  /* Entrances → jump to final state */
  .mockup-ring-fill { animation: none; stroke-dashoffset: 49; }
  .mockup-bar-fill  { animation: none; }

  /* Loops → off */
  @keyframes float-badge { from, to { transform: none; } }
  .mockup-float-badge { animation: none; }

  /* Hover transitions → off */
  .article-card,
  .featured-card,
  .audience-tile,
  .hero-pill,
  .btn,
  .cta-btn-primary,
  .cta-btn-secondary { transition: none; }
  .article-card::before { transition: none; }
}
```

> Note the pattern: for a once-only entrance you turn `animation: none` **and** hard-set the final value (`stroke-dashoffset: 49`) so the element doesn't reset to its empty start state.

---

## 4. House conventions (so reuse stays consistent)

| Property | Convention on this site |
|----------|-------------------------|
| Easing (entrances & wipes) | `cubic-bezier(0.4,0,0.2,1)` — the standard "ease-out" / Material curve |
| Easing (ambient loops) | `ease-in-out` |
| Hover transition duration | `0.15s` buttons/pills, `0.2s` cards/tiles |
| Entrance duration | `1.8s`–`2.4s` (slow, premium reveal for hero mockups) |
| Loop duration | `3.6s` (slow bob) |
| Animated properties | **only** `transform`, `opacity`, `box-shadow`, `stroke-dashoffset`, `width` (on `overflow:hidden` tracks). Never `top`/`left`/`margin`/`height` of layout. |
| Run-once entrances | always `animation: … both` (holds the final frame) |
| Color in animations | CSS vars only (`var(--blue)`), never hardcoded hex — matches `CLAUDE.md` "no hardcoded hex" rule |

---

## 5. Tokens these animations depend on

The animation snippets reference these custom properties. They live in the `:root` block at the top of `blog.html`'s `<style>` — copy them into any page you're adding the animations to (or just reuse the page's existing tokens).

```css
:root {
  --navy:        #0D1B3E;
  --blue:        #2563EB;
  --blue-hover:  #1D4ED8;
  --blue-mid:    #BFDBFE;
  --purple:      #7C3AED;
  --green:       #059669;
  --amber:       #D97706;
  --surface:     #FFFFFF;
  --border:      #E2E8F0;
  --shadow-sm:   0 1px 3px  rgba(13,27,62,0.08);
  --shadow-md:   0 4px 16px rgba(13,27,62,0.10);
  --shadow-lg:   0 8px 32px rgba(13,27,62,0.12);
}
```

---

## 6. What's NOT here (and how to add it if you want it)

The blog page has **no scroll-triggered animations** — nothing fades in as you scroll. Every entrance fires on page load. If you want scroll-reveal on a static marketing page, the lightweight no-dependency pattern is an `IntersectionObserver` that toggles a class:

```html
<style>
  .reveal { opacity: 0; transform: translateY(16px); transition: opacity .5s, transform .5s; }
  .reveal.in { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }
</style>

<script>
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
```

This keeps the "static HTML, SEO-safe, no framework" constraint intact (the content is in the DOM at load; JS only toggles a visual class). Add `.reveal` to any section and stagger with inline `style="transition-delay: .1s"`.

---

## 7. Quick reuse checklist

1. Copy the `:root` tokens (§5) if the target page doesn't have them.
2. Copy the `@keyframes` + classes for the effects you want (§2).
3. Apply classes; set per-element values inline (`width`, `animation-delay`, ring `stroke-dashoffset`).
4. **Always** add/extend the `prefers-reduced-motion` block (§3).
5. Animate only `transform` / `opacity` / `box-shadow` / `stroke-dashoffset` — never layout properties.
6. Keep colors as `var(--token)`.

**Source of truth:** `public/blog.html` lines 280–472 (mockup animations), 710–745 (card hover + accent line), 648–661 (tile hover), 1011–1034 (reduced-motion block).


---
<!-- docnav-related -->
### Related docs
- [01 · CONTEXT — Read This First, Every Time](01_CONTEXT.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [03 · SEO STRATEGY — What to Make and Why](03_SEO_STRATEGY.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End](06_PRODUCTION_PLAYBOOK.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [09 · AUDIT PLAYBOOK — Periodic SEO Health Checks](09_AUDIT_PLAYBOOK.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)
- [README — How to Use the StudyRise Content & SEO Brain](README.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
