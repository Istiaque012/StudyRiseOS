# StudyRise — Static Page Motion Guide

> **Implementation note (2026-06-21).** The motions described in this guide are now implemented
> centrally in `/assets/studyrise-chrome.js` and `/assets/studyrise-core.css` — scroll reveal
> (`.rev`), the reading-progress bar, sticky table-of-contents highlighting, and the
> `prefers-reduced-motion` fallback. Treat this guide as the design *intent*; the shared shell
> files are the source of truth for the actual behaviour. Don't hand-reimplement these per page.
> See `10_SITE_SHELL.md`.

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


How motion works on the **server-rendered marketing HTML pages** (`public/*.html` — `blog.html`, `features.html`, `pricing.html`, `study-planner.html`, `mbbs-bangladesh.html`, blog posts) and how to reuse it consistently across all of them.

> **Two hard constraints, both deliberate:**
> 1. **Motion here is pure CSS** (`@keyframes` + `transition`). These pages are native HTML for SEO — the content must be in the DOM at load and animate with **no JS framework**. The one exception (scroll-reveal, §6.4) uses a tiny vanilla `IntersectionObserver` that only toggles a class; the content still ships in the HTML.
> 2. **Do NOT use Framer Motion here.** Framer Motion is for the React app (`src/`) only. This guide is the CSS mirror of those same motions so the marketing site *feels* like the same product.

**Scope of this rewrite vs. the old blog-only guide:** tokens now match `src/styles/tokens.css` exactly; light-vs-dark surface rules are explicit; press / focus / touch states are added; the reduced-motion baseline is maintainable; and there's a per-page application map plus the primitives pricing/features pages need.

> **Canonical source:** the design system of record is **BRAND_KIT.md v2.1**. This guide is the static-CSS *mirror* of its motion and surface tokens. Where they overlap, BRAND_KIT.md defines the brand rules and this guide defines the CSS port. Two BRAND_KIT v2.1 layers are directly relevant here: **§14 Dark Mode Tokens** (the `[data-theme="dark"]` surface/status/elevation overrides referenced in §3 below) and **§15 Expressive Landing Layer** (which now *defers to §5.2 of this guide* as the canonical `.sr-hero` marketing-gradient implementation — see §5.2).

---

## 1. Motion principles (the brand framing)

StudyRise motion is **calm, not celebratory**. It reinforces the product's promise ("The Intelligent Coach") without the gamified dopamine loops the app deliberately avoids (no confetti, no bounce-for-applause, no streak fireworks — consistent with the "no exclamation marks, gray-not-red, no hollow praise" copy rules).

| Principle | In practice |
|---|---|
| **Restraint** | One slow ambient loop per viewport, max. Motion earns its place or it's cut. |
| **Borders at rest, shadow on hover** | Elements sit flat with a border; elevation appears only on interaction. |
| **Progress is the hero** | Rings filling, bars growing — the *one* place to spend a slow, premium reveal, because progress *is* the product. |
| **Functional motion is fast** | Hover/press/focus feedback is ≤ 250ms. Only hero showpieces go slow (§3). |
| **Nothing critical behind motion** | Never hide a CTA, price, or key info behind a hover-only reveal. |

---

## 2. Motion tokens (copy this — it's the whole system)

These mirror `src/styles/tokens.css` **exactly** (durations, easings, shadows) plus three marketing-only additions. Drop this block into each static page's `:root`. **Don't invent per-page names** (the old guide's `--shadow-sm/md/lg` and `cubic-bezier(0.4,0,0.2,1)` were drift — gone).

```css
:root {
  /* === BRAND COLORS (subset used by motion) === */
  --navy:    #0D1B3E;
  --blue:    #2563EB;
  --blue-hover: #1D4ED8;
  --purple:  #7C3AED;
  --cyan:    #06B6D4;
  --green:   #22C55E;
  --amber:   #F59E0B;

  /* === SURFACES === */
  --bg:      #F8FAFC;
  --surface: #FFFFFF;
  --border:  #E2E8F0;

  /* === SHADOWS (canonical names — match the app) === */
  --shadow-card:    0 1px 3px  rgba(13,27,62,0.08);
  --shadow-hover:   0 4px 12px rgba(13,27,62,0.10);
  --shadow-float:   0 8px 24px rgba(13,27,62,0.12);
  --shadow-overlay: 0 20px 60px rgba(13,27,62,0.15);

  /* === MOTION (canonical — match the app) === */
  --duration-fast:  150ms;   /* buttons, pills, press, focus            */
  --duration-base:  250ms;   /* cards, tiles, accent wipes              */
  --duration-slow:  350ms;   /* larger panels                          */
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);    /* entrances + wipes */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* "pop" interactions */

  /* === MOTION — marketing-page only (not in the app) === */
  --duration-reveal: 600ms;   /* scroll-reveal on long pages           */
  --duration-hero:   2000ms;  /* slow premium hero mockup entrances    */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* ambient infinite loops */
}
```

> **Why the easing changed:** the app's official ease-out is `cubic-bezier(0,0,0.2,1)` (a decelerate curve). The old blog page used `(0.4,0,0.2,1)`, which is actually *ease-in-out* — fine for loops, wrong for entrances. This guide assigns each its correct role.

---

## 3. Surface context: light vs dark (read this before pasting anything)

The default page surface is **light** (`--surface`/`--bg`). Hero zones and product mockups often sit on a **dark navy panel** (`--navy`). Overlay colors are *not* interchangeable between the two.

> **App-wide dark mode (v2.1):** the surface/dark distinction here is about *zones within a light page*. Full page-level dark mode is a separate concept defined in **BRAND_KIT.md §14** — when `data-theme="dark"` is set, `--bg`, `--surface`, `--border`, and the status tokens all flip to their dark values, and elevation becomes glow/border-based rather than shadow-based. If a marketing page opts into app-wide dark mode, read overlay colors from the §14 dark values, not the light ones below.

| You're on… | Use for faint fills/strokes | Don't use |
|---|---|---|
| **Dark zone** (navy hero, mockup panel) | `rgba(255,255,255, 0.08–0.14)` | navy-alpha (invisible) |
| **Light zone** (white card, page body) | `var(--border)`, `rgba(13,27,62, 0.04–0.10)`, `--soft-blue` | white-alpha (invisible) |

Every snippet below notes which context it assumes. The progress-mockup primitives (§4) assume a **dark** panel — that's where they live on the blog.

---

## 4. Entrance primitives (run once on load)

All use `animation: … both` so the element **holds its final frame**. Pattern: `animation: <name> <duration> <easing> both`.

### 4.1 Ring fill — SVG circular progress *(dark panel)*

`r=26` → circumference `2π·26 ≈ 163`. Offset = `circumference × (1 − percent)`. `49 ≈ 70%`.

```css
.sr-ring        { transform: rotate(-90deg); }              /* start at 12 o'clock */
.sr-ring-bg     { fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 4; }
.sr-ring-fill {
  fill: none; stroke: var(--blue); stroke-width: 4; stroke-linecap: round;
  stroke-dasharray: 163;
  stroke-dashoffset: 49;                                    /* final resting = ~70% */
  animation: sr-ring-fill var(--duration-hero) var(--ease-out) both;
}
@keyframes sr-ring-fill { from { stroke-dashoffset: 163; } } /* "to" is the rule above */
```

```html
<div class="sr-ring-wrap">
  <svg class="sr-ring" width="56" height="56" viewBox="0 0 56 56">
    <circle class="sr-ring-bg"   cx="28" cy="28" r="26"/>
    <circle class="sr-ring-fill" cx="28" cy="28" r="26"/>
  </svg>
  <span class="sr-ring-center">70%</span>
</div>
```

Re-target: 85% → `163 × 0.15 ≈ 24`. Brand note: the progress ring is the one sanctioned place to echo the logo gradient — set `stroke: url(#sr-grad)` with an SVG `<linearGradient>` (purple→cyan→blue) if you want the showcase version.

### 4.2 Bar grow — horizontal fill *(dark or light)*

Final width is inline; the keyframe animates *from* zero. `!important` beats the inline width only during the animation.

```css
.sr-bar-track { height: 5px; border-radius: 999px; overflow: hidden;
  background: rgba(255,255,255,0.10); }                     /* light zone: var(--border) */
.sr-bar-fill  { height: 100%; border-radius: 999px;
  animation: sr-bar-grow 1800ms var(--ease-out) both; }
@keyframes sr-bar-grow { from { width: 0 !important; } }
```

```html
<div class="sr-bar-track">
  <div class="sr-bar-fill" style="width:88%; background:var(--blue);"></div>
</div>
<!-- stagger the cascade with inline delays -->
<div class="sr-bar-fill" style="width:64%; background:var(--purple); animation-delay:.15s;"></div>
<div class="sr-bar-fill" style="width:51%; background:var(--green);  animation-delay:.30s;"></div>
```

### 4.3 Fade-up — the generic entrance *(any)*

The CSS twin of the app's mount transition (`initial:{opacity:0,y:16}`). Use for any hero text/card that should arrive on load.

```css
.sr-fade-up { animation: sr-fade-up 450ms var(--ease-out) both; }
@keyframes sr-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
```

### 4.4 Stagger utility — cascade a group *(any)*

Instead of hand-writing a delay per child, set a base delay and step with `nth-child`, or expose a `--i` index.

```css
.sr-stagger > * { animation: sr-fade-up 450ms var(--ease-out) both;
  animation-delay: calc(var(--i, 0) * 60ms); }
```
```html
<ul class="sr-stagger">
  <li style="--i:0">…</li><li style="--i:1">…</li><li style="--i:2">…</li>
</ul>
```

---

## 5. Ambient loops (continuous — use sparingly, one per viewport)

### 5.1 Floating badge — gentle bob *(any)*

For a "live status" chip or notification pip over a mockup. Slow + small = alive, not annoying.

```css
.sr-float { animation: sr-float 3600ms var(--ease-in-out) infinite; }
@keyframes sr-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
```

### 5.2 Hero gradient wash + drifting glow *(dark hero only)*

> **Canonical `.sr-hero` definition.** BRAND_KIT.md §15 (Expressive Landing Layer) defers to
> this block as the single source of truth for the marketing hero gradient. Don't define a
> competing `.sr-hero` elsewhere. If you need a static, non-animated variant (e.g. for a page
> that must avoid any ambient loop), drop the `.sr-orb` elements and keep only the `::before`
> wash — same hues, no motion.

The CSS port of the onboarding **ImmersiveBackdrop** — the *one* sanctioned marketing use of the brand gradient (it's forbidden in app UI, allowed on a dark marketing hero canvas). Navy base, purple→cyan→blue radial wash, two slow drifting glow orbs. Decorative → `aria-hidden`.

```css
/* overflow:hidden on the parent is REQUIRED — without it the orbs bleed outside
   the hero, causing horizontal scroll on mobile and a CLS hit on Core Web Vitals. */
.sr-hero { position: relative; background: var(--navy); overflow: hidden; }
.sr-hero::before {                                  /* 135° brand wash */
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(60% 60% at 80% 10%, rgba(124,58,237,0.18), transparent 60%),
    radial-gradient(50% 50% at 15% 90%, rgba(6,182,212,0.16),  transparent 60%);
}
.sr-orb { position:absolute; width:340px; height:340px; border-radius:50%;
  filter: blur(80px); opacity:.5; pointer-events:none; }
.sr-orb--purple { top:-80px;  right:-60px; background:var(--purple);
  animation: sr-drift-a 24s var(--ease-in-out) infinite; }
.sr-orb--cyan   { bottom:-90px; left:-70px; background:var(--cyan);
  animation: sr-drift-b 26s var(--ease-in-out) infinite; }
@keyframes sr-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-28px,22px)} }
@keyframes sr-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(26px,-20px)} }
```

---

## 6. Interactive states (hover / press / focus / scroll)

> **Wrap all `:hover` rules in `@media (hover: hover) and (pointer: fine)`** so they don't stick after a tap on touch devices. Shown once below; apply to every hover block.

### 6.1 Card lift *(any)* — the workhorse

CSS twin of `whileHover={{ y: -3 }}`. Transition only `transform` + `box-shadow`, never layout props.

```css
.sr-card { box-shadow: var(--shadow-card);
  transition: transform var(--duration-base), box-shadow var(--duration-base); }
@media (hover: hover) and (pointer: fine) {
  .sr-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
}
```
Lift scale: big card `-4px`, featured `-3px`, small tile `-2px`. Bigger card = bigger lift.

### 6.2 Press feedback *(any)* — matches the app's `whileTap`

```css
.sr-card:active, .btn:active { transform: scale(0.97); transition: transform var(--duration-fast); }
```

### 6.3 Accent-line wipe — the `scaleX` reveal *(any)*

Hidden bar that wipes left→right on hover. Reuse for nav underlines, tab indicators, list-row reveals.

```css
.sr-accent { position: relative; }
.sr-accent::before { content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background: var(--blue); transform: scaleX(0); transform-origin: left; z-index:1;
  transition: transform var(--duration-base) var(--ease-out); }
@media (hover: hover) and (pointer: fine) {
  .sr-accent:hover::before { transform: scaleX(1); }
}
```

### 6.4 Soft hover *(any)* — pills, tiles, buttons

```css
.sr-pill { background: var(--soft-blue, #EEF2FF); border:1px solid var(--border);
  transition: background var(--duration-fast), border-color var(--duration-fast); }
.btn { transition: background var(--duration-fast); }
@media (hover: hover) and (pointer: fine) {
  .sr-pill:hover { background:#E0E7FF; border-color:#C7D2FE; }
  .btn:hover     { background: var(--blue-hover); }
}
```

### 6.5 Spring pop *(any)* — small interactive cells

For calendar-day-style cells (mirrors the app's `whileHover={{ scale: 1.08 }}` spring).

```css
.sr-pop { transition: transform var(--duration-fast) var(--ease-spring); }
@media (hover: hover) and (pointer: fine) { .sr-pop:hover { transform: scale(1.08); } }
```

### 6.6 Focus ring *(any)* — keyboard accessibility, don't skip

Hover/press alone leave keyboard users behind. Parity with the app's input focus ring.

```css
.sr-card:focus-visible, .btn:focus-visible, .sr-pill:focus-visible {
  outline: 2px solid var(--blue); outline-offset: 2px; border-radius: 8px;
}
```

### 6.7 Scroll reveal *(long pages)* — promoted to first-class

The lightweight, SEO-safe way to fade sections in as they enter view (content is in the DOM at load; JS only toggles a class). Essential on `features`/`pricing`. Stagger via inline `--i`.

```css
.reveal { opacity:0; transform: translateY(16px);
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
  transition-delay: calc(var(--i, 0) * 80ms); }
.reveal.in { opacity:1; transform:none; }
```
```html
<script>
  const io = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: '-40px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
```

### 6.8 Count-up numbers *(pricing / stats — optional JS)*

For "10,000+ questions" or a price that ticks up. Minimal, dependency-free, with a reduced-motion guard.

> **SEO note:** always write the real number (or label) as the element's initial text content. The JS overwrites it to `0` and counts up visually — but Googlebot indexes the DOM before JS runs, so it captures the real value. Never initialise to `0` in the HTML if the number is a marketing claim you need indexed.

```html
<!-- ✅ Google indexes "10,000+" — JS counts up visually from 0 -->
<span class="sr-count" data-to="10000">10,000+</span>

<!-- ❌ Google indexes "0" -->
<span class="sr-count" data-to="10000">0</span>

<script>
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.sr-count').forEach(el => {
    const to = +el.dataset.to;
    if (rm) { el.textContent = to.toLocaleString(); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now(), d = 1200;
      (function tick(t){ const p = Math.min((t-t0)/d, 1);
        el.textContent = Math.round(to * (1-Math.pow(1-p,3))).toLocaleString();
        if (p < 1) requestAnimationFrame(tick); })(t0);
    }, { threshold: 0.6 });
    io.observe(el);
  });
</script>
```

---

## 7. Per-page application map

| Page | Entrance | Ambient | Interactive | Scroll-reveal |
|---|---|---|---|---|
| **blog.html** (index) | ring + bars in hero mockup | float badge | card lift + accent wipe on article cards; soft hover on tiles | — (short page) |
| **blog post** | fade-up on title/lede | — | accent wipe on "related posts"; focus rings on links | reveal on long body sections |
| **features.html** | fade-up hero; stagger the feature grid | one hero glow (§5.2) | card lift on feature cards; spring-pop on icons | **reveal per feature row** (the key one) |
| **pricing.html** | bars/ring if showing usage; fade-up cards | — | card lift on plan cards; **recommended plan**: persistent lift + accent line; soft-hover toggle | reveal on FAQ + comparison table |
| **study-planner.html** | full mockup set (ring + bars + float) on dark hero | hero glow + float | card lift on benefit cards | reveal on "how it works" steps |
| **mbbs-bangladesh.html** | fade-up; bars for eligibility/progress | restrained — calm tone (documented student stress) | card lift; focus rings | reveal on phase/year sections |

**Pricing extras** — monthly/annual toggle + recommended-plan emphasis:

```css
.sr-toggle__knob { transition: transform var(--duration-base) var(--ease-spring); }
.sr-toggle.is-annual .sr-toggle__knob { transform: translateX(24px); }

.plan--recommended { transform: translateY(-4px); box-shadow: var(--shadow-float); } /* persistent */
.plan--recommended::before { content:''; position:absolute; inset:0 0 auto 0; height:3px;
  background: var(--blue); }
```

> **mbbs-bangladesh tone:** keep motion minimal here. No glow orbs, no count-ups racing — the audience is documented as high-stress, and the product principle is "avoid gamification." Quiet fade-ups and reveals only.

---

## 8. Accessibility & performance (non-negotiable)

### 8.1 Reduced motion — maintainable baseline

Instead of enumerating every class (which rots across pages), use a near-universal kill-switch, then hard-set the *few* entrances whose final state isn't the CSS default (the ring).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* entrances whose held value ≠ default must be pinned to their final frame */
  .sr-ring-fill { stroke-dashoffset: 49; }
  .reveal       { opacity: 1; transform: none; }
}
```
This kills loops, snaps entrances, and removes hover transitions in one block — and you don't have to maintain a class list per page.

### 8.2 Performance rules

| Do | Don't |
|---|---|
| Animate `transform`, `opacity`, `box-shadow`, `stroke-dashoffset`, and `width` *only on `overflow:hidden` tracks* | Animate `top`/`left`/`margin`/`height`/`width` of layout (forces reflow) |
| Let cheap props composite on the GPU | Sprinkle `will-change` everywhere — it costs memory; add it only to a known-janky element, and remove it after |
| One ambient loop per viewport | Stack multiple infinite animations in view at once |

---

## 9. Conventions & housekeeping

| Property | Convention |
|---|---|
| Entrance / wipe easing | `var(--ease-out)` |
| "Pop" / overshoot easing | `var(--ease-spring)` |
| Ambient loop easing | `var(--ease-in-out)` |
| Hover/press/focus duration | `var(--duration-fast)` (buttons/pills) · `var(--duration-base)` (cards/tiles) |
| Hero showpiece entrance | `var(--duration-hero)` (2s) — **mockups only**, never functional UI |
| Scroll reveal duration | `var(--duration-reveal)` (600ms) |
| Run-once entrances | always `animation: … both` (holds final frame) |
| Color | `var(--token)` only — never hardcoded hex (matches the repo-wide rule) |
| Shadows | `var(--shadow-*)` tokens — never raw `box-shadow` values |
| **Class prefix** | `sr-*` for reusable motion utilities; keep page-specific mockup classes descriptive (`sr-ring`, `sr-bar`). Greppable, collision-free. |

**Source-of-truth caveat:** don't pin this guide to line numbers in `blog.html` (they rot on every edit). The authoritative motion *tokens* live in `src/styles/tokens.css`; this guide is the static-CSS mirror of them. When the app's tokens change, update §2 here.

Suggested repo home: `docs/MOTION_GUIDE.md`.

---

## 10. Reuse checklist

1. Copy the **§2 token block** into the page's `:root` (or confirm it already matches `tokens.css`).
2. Decide each zone's surface — **dark vs light (§3)** — before picking overlay colors.
3. Copy the `@keyframes` + classes for the effects you need (§4–6).
4. Apply classes; set per-element values inline (`width`, `animation-delay`, ring `stroke-dashoffset`, `--i`).
5. Wrap hover rules in `@media (hover: hover) and (pointer: fine)`.
6. Add **focus-visible** to anything interactive (§6.6).
7. Drop in the **§8.1 reduced-motion baseline** (same block on every page).
8. Animate only `transform`/`opacity`/`box-shadow`/`stroke-dashoffset`/`width`-on-tracks.
9. Keep all colors `var(--token)`.


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
