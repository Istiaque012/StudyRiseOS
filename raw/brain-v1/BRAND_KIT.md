# StudyRise — Brand Kit

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> **Version:** 2.2  
> **Tagline:** PLAN TODAY. RISE TOMORROW.  
> **Product:** Smart study planning and tracking platform for any serious student.  
> **External name:** StudyRise · **Internal app name:** StudyOS  
> **Live URL:** https://studyrise.app  
> **Last updated:** 2026-06-19

> **v2.1 is additive.** Nothing in v2.0 was removed, recolored, or renamed. The core
> palette, logo, type stack, voice, and all existing component specs are unchanged and
> remain authoritative. v2.1 only *adds* three opt-in layers — Dark Mode (§14), the
> Expressive Landing Layer (§15), and Refined Depth & Glass (§16) — plus a changelog (§17).
> Existing pages stay on-brand with zero retrofit.

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Logo System](#2-logo-system)
3. [Color Palette](#3-color-palette)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Component Specs](#6-component-specs)
7. [Animation System](#7-animation-system)
8. [Dashboard & Data Display Rules](#8-dashboard--data-display-rules)
9. [Landing Page Style](#9-landing-page-style)
10. [Voice & Tone](#10-voice--tone)
11. [CSS Custom Properties](#11-css-custom-properties)
12. [Do's and Don'ts](#12-dos-and-donts)
13. [DesignMD Reference Map](#13-designmd-reference-map)
14. [Dark Mode Tokens *(v2.1)*](#14-dark-mode-tokens)
15. [Expressive Landing Layer *(v2.1)*](#15-expressive-landing-layer)
16. [Refined Depth & Glass Surfaces *(v2.1)*](#16-refined-depth--glass-surfaces)
17. [Changelog](#17-changelog)

---

## 1. Brand Overview

### What StudyRise Is

StudyRise is a smart study planning and tracking platform for **any serious student** — school exams, university finals, professional certifications, licensing tests, and custom study goals. It combines spaced repetition, Pomodoro-based scheduling, analytics, and AI-powered advice into one structured system.

### Brand Personality

**Archetype: The Intelligent Coach**

StudyRise is serious enough for a student with a high-stakes exam, warm enough to keep them going at 11pm. It does not celebrate trivially — but it makes meaningful progress feel visible and earned.

| Pillar | What It Means in Practice |
|---|---|
| **Structured** | Every screen has a clear hierarchy. Nothing competes for attention. |
| **Momentum-driven** | Progress is always visible — SR compliance, readiness score, streaks. |
| **Trustworthy** | Data is shown honestly. No inflated scores. Overdue means overdue. |
| **Quietly ambitious** | Serious about the goal. Encouraging, but never hollow or performative. |
| **Intelligent** | AI surfaces at the right moment. Data informs decisions, not just decorates screens. |

### Who It's For

- School and university students preparing for high-stakes exams
- Professional certification candidates (medical, legal, accounting, engineering, etc.)
- Self-directed learners with long-term study plans
- Anyone who needs a structured, data-driven study system

---

## 2. Logo System

### Logo Files

| File | Path | Use |
|------|------|-----|
| Full lockup — full color (SVG) | `/assets/brand/studyrise-logo-full-color.svg` | Landing page hero, email headers, splash screen |
| Full lockup — reversed / white (SVG) | `/assets/brand/studyrise-logo-white.svg` | Dark / navy backgrounds, footers, sidebars |
| Favicon / icon (SVG) | `/assets/brand/favicon.svg` | Browser tab, app icon, small UI placements, sidebar |
| App / PWA tile (SVG) | `/assets/brand/app-icon-512.svg` | PWA manifest, Apple touch icon source |

> **These are the authoritative logo files. Never recreate the logo in CSS or JSX unless using the React component below.**

#### Extended variant set (additive — v2.2)

Full set of cleaned, technically-correct exports. Same mark, same gradient, unique gradient IDs per file (so two marks on one page can't collide). Use the full-color primary by default; reach for the others only in the contexts noted.

| File | Path | Use |
|------|------|-----|
| `studyrise-logo-full-color.svg` | `/assets/brand/studyrise-logo-full-color.svg` | **Primary** full lockup — light backgrounds |
| `studyrise-logo-white.svg` | `/assets/brand/studyrise-logo-white.svg` | **Reversed** lockup — dark / navy (`#0D1B3E`) backgrounds, sidebars, footers |
| `studyrise-logo-black.svg` | `/assets/brand/studyrise-logo-black.svg` | Monochrome black — single-color print |
| `studyrise-logo-grayscale.svg` | `/assets/brand/studyrise-logo-grayscale.svg` | Grayscale — muted / document placements |
| `studyrise-icon-color.svg` | `/assets/brand/studyrise-icon-color.svg` | Icon only — avatars, compact header |
| `studyrise-icon-white.svg` | `/assets/brand/studyrise-icon-white.svg` | Icon only on dark backgrounds |
| `studyrise-icon-black.svg` · `studyrise-icon-grayscale.svg` | `/assets/brand/studyrise-icon-black.svg` · `/assets/brand/studyrise-icon-grayscale.svg` | Mono / grayscale icon |
| `favicon.svg` | `/assets/brand/favicon.svg` | Tight-square browser-tab favicon (legible at 16px) |
| `app-icon-512.svg` | `/assets/brand/app-icon-512.svg` | Navy rounded app / PWA tile (gradient mark, optically centered) |

> **Dark-background rule of thumb:** on `#0D1B3E` use `studyrise-logo-white.svg` (full) or
> `studyrise-icon-white.svg` (icon). The full-color lockup's "Study" text is navy and would
> disappear on a navy surface. Where you want the *gradient* mark to keep its color on navy,
> use `app-icon-512.svg`, which is tuned to read against `#0D1B3E`.

### Logo Elements

```
Icon (favicon.svg):
  Shape:      Four ascending bars topped by an upward chevron (arrow tip)
              — an ascending bar chart that conveys progress and "rise"
  Gradient:   Purple (#7C3AED) → Cyan (#06B6D4) → Blue (#2563EB)
  Direction:  Bars step up left-to-right; chevron points up — conveys rise and momentum
  Background: Transparent

Wordmark (logo.svg):
  "Study"    Deep Navy (#0D1B3E), weight 800
  "Rise"     Electric Blue (#2563EB), weight 800
  Font:      Inter / geometric sans-serif
```

> **The tagline is NOT part of the logo.** "PLAN TODAY. RISE TOMORROW." is a layout/copy
> element placed *near* the logo when context calls for it (landing hero, email header,
> splash, footer) — never baked into the logo files. Style it as live text: Inter 300,
> uppercase, letter-spacing `0.15em`, color Slate `#64748B`, and never below 10px. Keeping
> it out of the mark keeps the logo clean and reusable at every size.

### Logo Color Reference

| Element | Color | Hex |
|---|---|---|
| Icon gradient — bottom | Purple/Violet | `#7C3AED` |
| Icon gradient — mid | Cyan | `#06B6D4` |
| Icon gradient — top/tip | Electric Blue | `#2563EB` |
| "Study" wordmark | Deep Navy | `#0D1B3E` |
| "Rise" wordmark | Electric Blue | `#2563EB` |
| Tagline *(layout element, not in logo)* | Slate | `#64748B` |

### Usage Variants

| Variant | When to Use |
|---|---|
| **Full lockup** (`studyrise-logo-full-color.svg`) | Landing page hero, email headers, splash screen, onboarding header — light backgrounds |
| **Full lockup reversed** (`studyrise-logo-white.svg`) | Dark / navy backgrounds, footers, sidebars |
| **Icon only** (`studyrise-icon-color.svg`) | Sidebar (32px), compact headers, avatars |
| **Favicon** (`favicon.svg`) | Browser tab (16/32px), PWA manifest |

### React Logo Component

```jsx
// src/components/Logo.jsx
export default function Logo({ variant = 'full', size = 32, className = '', darkBg = false }) {
  if (variant === 'icon') {
    const iconSrc = darkBg
      ? '/assets/brand/studyrise-icon-white.svg'
      : '/assets/brand/studyrise-icon-color.svg';
    return <img src={iconSrc} height={size} width={size} alt="StudyRise" className={className} />;
  }
  const lockupSrc = darkBg
    ? '/assets/brand/studyrise-logo-white.svg'
    : '/assets/brand/studyrise-logo-full-color.svg';
  return <img src={lockupSrc} height={size} alt="StudyRise — Plan Today. Rise Tomorrow." className={className} />;
}

// Usage:
// <Logo />                          — full lockup, 32px tall, light background
// <Logo darkBg />                   — reversed/white lockup, for dark/navy backgrounds
// <Logo variant="icon" size={24} /> — icon mark only, 24px tall
// <Logo variant="icon" size={40} darkBg /> — white icon, 40px tall, dark background
```

### Logo Rules

- **Minimum clear space:** Equal to the height of the icon mark on all four sides
- **Minimum sizes:** Icon 24px height · Full lockup 120px wide
- **Never** recolor the gradient — purple-cyan-blue is fixed (it comes from the SVG file)
- **Never** place on a busy or patterned background without a solid backing
- **Never** stretch, rotate, or apply drop shadows to the logo
- **Never** use the tagline (a layout element, not part of the logo) at sizes below 10px
- **Dark backgrounds:** Use as-is — the SVG has transparent background and works on any dark surface
- **The gradient is exclusive to the logo icon and progress rings.** Nowhere else in UI.

---

## 3. Color Palette

> Single source of truth for all colors. Always reference these tokens — never hardcode hex values in components.

### Core Brand Colors

| CSS Token | Name | Hex | Usage |
|---|---|---|---|
| `--navy` | Deep Navy | `#0D1B3E` | Sidebar, dominant headings, "Study" wordmark |
| `--blue` | Electric Blue | `#2563EB` | Primary CTAs, links, active nav, "Rise" wordmark |
| `--purple` | Violet | `#7C3AED` | Logo gradient, progress ring accent, milestone badges |
| `--cyan` | Cyan | `#06B6D4` | Logo gradient mid (use sparingly in UI) |

### Surface & Layout Colors

| CSS Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F8FAFC` | Page canvas, app background |
| `--surface` | `#FFFFFF` | Cards, panels, modals |
| `--bg-sidebar` | `#0F172A` | Sidebar background |
| `--soft-blue` | `#EEF2FF` | Icon containers, hover fills, active tints |
| `--border` | `#E2E8F0` | Card borders, dividers, table rows |
| `--border-2` | `#CBD5E1` | Input borders at rest |

### Text Colors

| CSS Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0D1B3E` | All body text, headings |
| `--ink-4` | `#64748B` | Labels, metadata, timestamps |
| `--ink-5` | `#94A3B8` | Placeholders, disabled states |
| `--ink-inv` | `#F1F5F9` | Text on dark backgrounds (sidebar, CTA sections) |

### Status Colors

> **Rule:** Never use `--red` for anything except genuinely overdue/dangerous states. Reserve it so it always commands attention. Incomplete tasks are `--ink-5` (gray), never red.

| CSS Token | Hex | Usage |
|---|---|---|
| `--red` | `#E63946` | SR overdue 3+ days, missed day, blackout rating, errors |
| `--amber` | `#F59E0B` | SR due today, partial completion, deadline close |
| `--green` | `#22C55E` | SR completed, task done, streak active |
| `--blue-info` | `#3B82F6` | AI advisor, tooltips, announcements |
| `--gray-inactive` | `#6B7280` | Not started, rest day, no data |

### SR Overdue Severity Scale

| State | Color Token | Hex |
|---|---|---|
| Completed | `--green` | `#22C55E` |
| Due today | `--amber` | `#F59E0B` |
| 1–2 days overdue | `--amber` | `#F59E0B` |
| 3+ days overdue | `--red` | `#E63946` |

### Soft Tint Fills (for backgrounds/badges)

| CSS Token | Hex | Pair with text |
|---|---|---|
| `--soft-blue` | `#EEF2FF` | `--blue` |
| `--soft-green` | `#DCFCE7` | `--green` |
| `--soft-amber` | `#FEF3C7` | `--amber` |
| `--soft-red` | `rgba(230,57,70,0.08)` | `--red` |
| `--soft-purple` | `#EDE9FE` | `--purple` |

### Dashboard Chart Palette (Recharts series)

```
Series 1 — Task completion:    #2563EB  (Electric Blue)
Series 2 — SR compliance:      #7C3AED  (Violet)
Series 3 — Question accuracy:  #06B6D4  (Cyan)
Series 4 — Correct answers:    #22C55E  (Emerald)
Series 5 — Overdue/warning:    #F59E0B  (Amber)
Series 6 — SR hit tracking:    #EC4899  (Pink)
```

---

## 4. Typography

### Typeface Stack

| Role | Font | Weight | Notes |
|---|---|---|---|
| **Display / Landing Hero** | Plus Jakarta Sans | 700–800 | Emotional headlines, landing H1 |
| **UI Headings** | Inter | 600–700 | Screen titles, card headers, sidebar nav |
| **Body / Reading** | Inter | 400–500 | All UI text, descriptions, settings |
| **Data / KPI Numbers** | Inter | 700 | `font-variant-numeric: tabular-nums` |
| **Mono / Admin** | JetBrains Mono | 400 | JSON, admin panel, import/export |
| **Overline / Caps Labels** | Inter | 600 | `letter-spacing: 0.08em` — table headers |

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap');
```

### Type Scale

| Level | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|
| Display | 56px desktop / 36px mobile | 800 | 1.1 | -0.02em | Landing H1 |
| H1 | 30px | 700 | 1.2 | -0.01em | Screen page titles |
| H2 | 22px | 600 | 1.3 | 0 | Section headers |
| H3 | 18px | 600 | 1.35 | 0 | Card titles |
| Body | 14px | 400 | 1.6 | 0.01em | All UI text |
| Small | 13px | 400 | 1.45 | 0.01em | Metadata, timestamps |
| Caption | 12px | 500 | 1.4 | 0.02em | Badges, labels |
| Overline | 11px | 600 | 1.4 | 0.08em | Table headers, section caps |
| Mono | 13px | 400 | 1.5 | 0 | Import/export, admin |

### CSS Font Variables

```css
--font-sans:    'Inter', system-ui, sans-serif;
--font-display: 'Plus Jakarta Sans', 'Inter', sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

---

## 5. Spacing & Layout

### Base Unit: 8px

```
4px   — Inline icon gaps, micro spacing
8px   — Tight padding, chip gaps
12px  — Input inner padding (compact)
16px  — Card content padding (compact)
24px  — Card content padding (default), section gaps
32px  — Major section breaks, card-to-card
48px  — Page-level vertical rhythm
64px  — Large section separation (landing)
96px  — Hero section padding
```

### Layout Shell

```
Shell:            100vw / 100vh flex row
Sidebar:          240px fixed, hidden on mobile (< md breakpoint)
Main content:     flex-1, overflow-y-auto, bg var(--bg)
Content width:    max-width 1200px, margin 0 auto, padding 24px 32px
Section gap:      32px between major sections
Mobile clearance: pb-[72px] md:pb-0 (bottom nav clearance)
```

### Sidebar Specs

```
Background:     var(--bg-sidebar)  → #0F172A
Width:          240px desktop / hidden mobile
Nav item:       Inter 14px 500, color var(--ink-5)
Nav active:     Inter 14px 600, color #FFFFFF
                + left border 3px var(--blue)
                + background rgba(255,255,255,0.06)
Nav hover:      background rgba(255,255,255,0.04)
Section label:  Inter 11px 600 uppercase tracking-widest var(--ink-4), px 16px py 8px
Icon size:      20px Lucide, matches text color
Logo area:      48px height, favicon.svg (32px) + "StudyRise" Inter 700 16px white
Bottom:         email var(--ink-4), sign out ghost button
```

### Border Radius

```
0px     — Full-width banners, section dividers
4px     — Inline status indicators, table row badges
8px     — Buttons, inputs, standard cards   ← default
12px    — Feature cards, modal containers
9999px  — Pills, status chips, avatars
```

### Elevation (Shadows)

```
Rest:    0 1px 3px rgba(13,27,62,0.08)    — cards at rest
Hover:   0 4px 12px rgba(13,27,62,0.10)   — hovered cards, dropdowns
Float:   0 8px 24px rgba(13,27,62,0.12)   — modals, slide-out panels
Overlay: 0 20px 60px rgba(13,27,62,0.15)  — full-screen overlays
```

### Responsive Breakpoints

```
Mobile:   < 768px   (md breakpoint in Tailwind)
Tablet:   768px–1024px
Desktop:  > 1024px  (lg breakpoint in Tailwind)
```

---

## 6. Component Specs

### Buttons

```
PRIMARY
  bg: #2563EB · text: #FFFFFF · radius: 8px · pad: 10px 20px
  font: Inter 600 14px
  hover: bg #1D4ED8 · transition: background 150ms ease
  active: bg #1E40AF
  whileTap: scale(0.96)

SECONDARY
  bg: #FFFFFF · border: 1.5px solid #2563EB · text: #2563EB · radius: 8px
  hover: bg #EEF2FF

GHOST
  bg: transparent · text: #64748B · radius: 8px
  hover: bg #F1F5F9 · text: #0D1B3E

DANGER
  bg: #E63946 · text: #FFFFFF · radius: 8px
  hover: bg #C1121F

DISABLED
  opacity: 0.4 · cursor: not-allowed · no hover state

SIZES
  sm:  height 32px · pad 8px 14px  · font 12px
  md:  height 38px · pad 10px 20px · font 14px  ← default
  lg:  height 46px · pad 14px 28px · font 16px
```

### Cards

```
STANDARD CARD
  bg: #FFFFFF · border: 1px solid #E2E8F0 · radius: 8px · pad: 20px 24px
  shadow: 0 1px 3px rgba(13,27,62,0.08)
  hover shadow: 0 4px 12px rgba(13,27,62,0.10) · transition: 200ms ease
  whileHover: y(-3), shadow-hover

KPI TILE
  Standard card +
  Value:  Inter 700 28px #0D1B3E tabular-nums (count-up animation on mount)
  Label:  Inter 600 11px #64748B uppercase letter-spacing 0.08em
  Delta:  12px · #22C55E (positive) or #E63946 (negative) + arrow icon

TASK CARD (Plan screen)
  Standard card +
  Top: phase badge + status chip
  Body: task title (H3) + subject label + due date
  Footer: estimated hours + action buttons

SECTION HEADER (above content groups)
  bg: #F8FAFC · border-bottom: 1px solid #E2E8F0
  No side/top border · no radius · pad: 12px 24px
```

### Status Chips / Badges

```
NOT STARTED    bg: #F1F5F9          text: #475569
IN PROGRESS    bg: #DBEAFE          text: #1E40AF
COMPLETED      bg: #DCFCE7          text: #15803D
OVERDUE        bg: rgba(230,57,70,0.10)  text: #E63946
SR DUE TODAY   bg: rgba(245,158,11,0.10) text: #D97706
MILESTONE      bg: #EDE9FE          text: #5B21B6
REST DAY       bg: #F1F5F9          text: #6B7280

All chips:
  radius: 9999px · pad: 3px 10px · font: Inter 11px 600 uppercase
```

### Inputs & Forms

```
INPUT
  border: 1.5px solid #CBD5E1 · bg: #FFFFFF · radius: 8px
  pad: 10px 14px · font: Inter 14px 400 #0D1B3E
  placeholder: #94A3B8

  :hover    → border-color: #94A3B8
  :focus    → border: 2px solid #2563EB
              box-shadow: 0 0 0 3px rgba(37,99,235,0.12)
  :error    → border: 2px solid #E63946
              box-shadow: 0 0 0 3px rgba(230,57,70,0.12)
  :disabled → bg: #F8FAFC · color: #94A3B8 · cursor: not-allowed

LABEL     Inter 13px 500 #374151 · margin-bottom: 6px
HELPER    Inter 12px 400 · #64748B (default) or #E63946 (error)
FIELD GAP 20px between fields
```

### Progress Rings

```
Track fill:   #E2E8F0
Active fill:  gradient #2563EB → #7C3AED (matches logo gradient direction)

Sizes:
  Large:   120px diameter · 8px stroke  — Readiness score, SR compliance
  Medium:   72px diameter · 6px stroke  — Phase progress, subject rings
  Small:    48px diameter · 4px stroke  — Inline compact rings
```

### Data Tables

```
Header row:   bg #F8FAFC · Inter 11px 600 uppercase · color #64748B · sticky on scroll
Body rows:    bg #FFFFFF · min-height 48px · border-bottom 1px #F1F5F9
Hover row:    bg #F8FAFC
Padding:      12px 16px per cell
Alignment:    Text left · Numbers right · Status chips left
```

### Empty States

```
Layout:    Centered vertically and horizontally
Icon:      48px Lucide · color #CBD5E1
Title:     Inter 600 16px #0D1B3E
Subtitle:  Inter 400 14px #64748B · max-width 280px
CTA:       Primary button (optional)
No filler illustrations or stock imagery
```

---

## 7. Animation System

> All animations use Framer Motion unless specified. Max duration: 300ms in app UI. Landing page allows up to 600ms.

### Motion Tokens

```
Duration fast:   150ms  — color transitions, hover states
Duration base:   250ms  — mount/unmount, modal open
Duration slow:   350ms  — page transitions, list stagger
Duration float:  5000ms — dashboard mockup float (CSS)

Easing standard:  [0.0, 0.0, 0.2, 1]    (ease-out)
Easing spring:    [0.34, 1.56, 0.64, 1] (spring-like bounce)
Easing linear:    linear                (progress bars)
```

### Core Animation Patterns

**Card hover lift:**
```js
whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(13,27,62,0.10)' }}
transition={{ duration: 0.2 }}
```

**Button press:**
```js
whileTap={{ scale: 0.96 }}
transition={{ duration: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
```

**Mount fade-up (standard):**
```js
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1] }}
```

**Mount fade-up (whileInView, once):**
```js
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-60px' }}
transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1] }}
```

**Stagger children container:**
```js
const container = {
  animate: { transition: { staggerChildren: 0.04 } }
}
const item = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
}
```

**Spring modal:**
```js
initial={{ opacity: 0, scale: 0.95, y: 16 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 8 }}
transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
```

**Tab / nav active indicator (layoutId):**
```jsx
<motion.div layoutId="tab-indicator" />
// transition: { type: 'spring', stiffness: 400, damping: 35 }
```

**Success flash (task complete, SR hit):**
```js
animate={{ backgroundColor: ['#fff', '#DCFCE7', '#fff'] }}
transition={{ duration: 0.6 }}
```

**Error shake:**
```js
animate={{ x: [0, -8, 8, -6, 6, -4, 4, 0] }}
transition={{ duration: 0.5 }}
```

**Page transition (handled by PageWrapper):**
```js
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -8 }}
transition={{ duration: 0.25 }}
```

**Step wizard transition (next = slide left, back = slide right):**
```js
// Next step slides in from right
initial={{ opacity: 0, x: 48 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -48 }}
transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
```

**Progress bar (timer/toast countdown):**
```js
animate={{ width: '0%' }}
transition={{ duration: 4, ease: 'linear' }}
```

**Floating dashboard mockup (CSS):**
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-8px) rotate(-1deg); }
}
animation: float 5s ease-in-out infinite;
```

**Skeleton shimmer (loading state):**
```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
```

### Reduced Motion

Always include:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Dashboard & Data Display Rules

### Grid

```
Desktop:    12-column · gap 24px
Tablet:     8-column  · gap 16px
Mobile:     4-column  · gap 12px

KPI row:    4 tiles × 3-col (desktop) → 2×2 (tablet) → 1-col (mobile)
Charts:     6-col pairs or 12-col full-width
Side panel: 8-col main + 4-col sidebar (desktop only)
```

### Charts (Recharts)

```
Container:           Standard card
Chart background:    #F8FAFC (not pure white)
Grid lines:          #E2E8F0 (never darker)
Tooltip:             bg #FFFFFF · border 1px #E2E8F0 · Inter 12px · no shadow
Legend:              Below chart · 8px dot indicators · Inter 12px #64748B
Animation:           isAnimationActive={true} animationDuration={800} animationEasing="ease-out"
No decorative chart borders or gradient backgrounds
```

### Today Screen Scan Zone (Priority Order)

```
1. Current task + subject label     (top, most prominent)
2. Pomodoro timer                   (large, center or right)
3. Task steps checklist             (below task)
4. DayPlanner blocks                (lower section)
5. Log / note input                 (bottom, least urgent)
```

---

## 9. Landing Page Style

### Mood

Calm, confident, intelligent. Built for the student who has tried three apps that didn't stick. The landing page should feel exactly like the product.

### Section Structure

```
1. Hero              Full-width · headline + subhead + CTA + dashboard mockup
2. Social proof      Student count · exam types
3. Features          3-column icon cards
4. How It Works      3-step numbered flow
5. For All Students  Audience cards (School · University · Professional · Custom)
6. Analytics preview Dashboard screenshot with annotation overlays
7. Testimonials      Quote cards
8. CTA Footer        Dark navy panel
```

### Landing Design Tokens

```
Hero bg:              #FFFFFF with radial gradient → #EEF2FF at top-right
Hero H1:              Plus Jakarta Sans 800 56px #0D1B3E (desktop) / 36px (mobile)
Hero accent word:     "Rise" in #2563EB
Hero subhead:         Inter 400 18px #64748B max-width 520px
Feature icon bg:      #EEF2FF · icon #2563EB · radius 12px · 48px square
Alt section bg:       #F8FAFC (every other section)
Dark CTA footer:      bg #0D1B3E · text #F1F5F9 · button: white bg + navy text
Dividers:             1px solid #E2E8F0
```

### Landing Animation Rules

- Fade-up on scroll: `whileInView`, once, 300–350ms, 24px translateY, ease-out
- Dashboard mockup: `float` CSS keyframe, 5s ease-in-out infinite, 8px vertical, `rotate(-1deg)` at rest
- Hero text: words/words groups stagger 40ms apart
- Feature cards: stagger 80ms apart
- **No parallax. No auto-playing anything. No aggressive motion.**

---

## 10. Voice & Tone

### Principles

- **Direct and plain.** "3 tasks due today" not "You've got this, champ! 🎉"
- **Honest about progress.** Show the real number, even when it's low.
- **Encouraging without being cheerful.** "You're 2 days behind. Here's how to recover." is the right tone.
- **No exclamation marks in UI copy.** Reserve energy for actual milestones.
- **Never assume the exam.** Language should apply to any study goal, not just medical licensing.

### Status Message Examples

```
daysAhead > 0   →  "On track · X days ahead of schedule"
daysAhead = 0   →  "On track · right on schedule"
daysAhead < -1  →  "Behind by X days — consider rescheduling"
```

### Copy Do's

```
✅ "3 SR reviews due today"
✅ "You're 2 days behind. Here's how to recover."
✅ "Phase 1 complete."
✅ "No study log for today."
✅ "74% readiness score — 3 weeks before exam"
```

### Copy Don'ts

```
❌ "You're crushing it! 🔥"
❌ "Don't forget to study!"
❌ "Amazing work, superstar!"
❌ Exclamation marks in UI copy — ever
❌ Medical-specific language when a general term works
```

---

## 11. CSS Custom Properties

> Copy-paste this block into `src/styles/tokens.css`. This is the authoritative token definition.

```css
:root {
  /* === BRAND COLORS === */
  --navy:              #0D1B3E;
  --blue:              #2563EB;
  --blue-light:        #3B82F6;
  --blue-info:         #3B82F6;
  --purple:            #7C3AED;
  --cyan:              #06B6D4;

  /* === SURFACES === */
  --bg:                #F8FAFC;
  --surface:           #FFFFFF;
  --bg-sidebar:        #0F172A;
  --soft-blue:         #EEF2FF;
  --soft-green:        #DCFCE7;
  --soft-amber:        #FEF3C7;
  --soft-red:          rgba(230, 57, 70, 0.08);
  --soft-purple:       #EDE9FE;

  /* === BORDERS === */
  --border:            #E2E8F0;
  --border-2:          #CBD5E1;

  /* === TEXT === */
  --ink:               #0D1B3E;
  --ink-4:             #64748B;
  --ink-5:             #94A3B8;
  --ink-6:             #CBD5E1;
  --ink-inv:           #F1F5F9;

  /* === STATUS === */
  --green:             #22C55E;
  --green-ink:         #15803D;
  --amber:             #F59E0B;
  --amber-ink:         #D97706;
  --red:               #E63946;
  --red-ink:           #C1121F;
  --gray-inactive:     #6B7280;

  /* === TYPOGRAPHY === */
  --font-sans:         'Inter', system-ui, sans-serif;
  --font-display:      'Plus Jakarta Sans', 'Inter', sans-serif;
  --font-mono:         'JetBrains Mono', monospace;

  /* === SHAPES === */
  --rounded-card:      8px;
  --rounded-modal:     12px;
  --rounded-pill:      9999px;

  /* === SHADOWS === */
  --shadow-card:       0 1px 3px rgba(13, 27, 62, 0.08);
  --shadow-hover:      0 4px 12px rgba(13, 27, 62, 0.10);
  --shadow-float:      0 8px 24px rgba(13, 27, 62, 0.12);
  --shadow-overlay:    0 20px 60px rgba(13, 27, 62, 0.15);

  /* === MOTION === */
  --duration-fast:     150ms;
  --duration-base:     250ms;
  --duration-slow:     350ms;
  --ease-out:          cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Tailwind Config Extensions

```js
// tailwind.config.js — extend theme section
theme: {
  extend: {
    colors: {
      navy:     '#0D1B3E',
      blue:     '#2563EB',
      purple:   '#7C3AED',
      cyan:     '#06B6D4',
      green:    '#22C55E',
      amber:    '#F59E0B',
      red:      '#E63946',
      surface:  '#FFFFFF',
      'soft-blue':   '#EEF2FF',
      'soft-green':  '#DCFCE7',
      'soft-amber':  '#FEF3C7',
      'soft-purple': '#EDE9FE',
    },
    fontFamily: {
      sans:    ['Inter', 'system-ui', 'sans-serif'],
      display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      mono:    ['JetBrains Mono', 'monospace'],
    },
    borderRadius: {
      card:  '8px',
      modal: '12px',
      pill:  '9999px',
    },
    boxShadow: {
      card:    '0 1px 3px rgba(13,27,62,0.08)',
      hover:   '0 4px 12px rgba(13,27,62,0.10)',
      float:   '0 8px 24px rgba(13,27,62,0.12)',
      overlay: '0 20px 60px rgba(13,27,62,0.15)',
    },
  },
},
```

---

## 12. Do's and Don'ts

### Design Do's

- ✅ Use `#2563EB` as the single primary action color — every CTA, every link
- ✅ Keep the logo gradient (purple → cyan → blue) exclusive to `favicon.svg`, `logo.svg`, and progress rings
- ✅ Show progress on every screen — rings, bars, streaks, completion percentages
- ✅ Design for long study sessions — low-contrast surfaces, readable type sizes
- ✅ Give deadlines visual prominence — SR and task due dates always visible
- ✅ Use `--gray-inactive` for not-started items, never red
- ✅ Use sticky headers on all data tables
- ✅ Follow the 8px spacing grid for all layout decisions
- ✅ `whileHover={{ y: -3 }}` on all hoverable cards
- ✅ `whileTap={{ scale: 0.96 }}` on all clickable elements
- ✅ Borders over shadows at rest — shadow only on hover/float

### Design Don'ts

- ❌ Never use `--red` for anything except genuinely overdue or destructive states
- ❌ Never use the brand gradient in the app UI (only logo files and progress rings)
- ❌ Never use `border-radius` larger than 12px in app UI
- ❌ Never hide critical actions behind hover states or context menus only
- ❌ Never use animations longer than 300ms in the app (landing: 600ms max)
- ❌ Never use decorative illustrations — empty states use Lucide icons only
- ❌ Never use more than 2 font families on a single screen
- ❌ Never hardcode hex values in components — always use CSS token variables

### Copy Do's & Don'ts

- ✅ Specific: "3 SR reviews due today"
- ✅ Honest + forward: "2 days behind. Here's how to recover."
- ❌ Hollow praise: "You're crushing it! 🔥"
- ❌ Exclamation marks anywhere in UI
- ❌ Medical-specific language when a general term works

---

## 13. DesignMD Reference Map

| DesignMD Kit | What StudyRise Borrows |
|---|---|
| **DocuForge** | `#2563EB` + `#7C3AED` color pair, Plus Jakarta Sans + Inter type stack, sidebar nav active pattern (left border + tint), button specs, input focus ring |
| **CorpScale** | `#0F172A` sidebar, `#F8FAFC` page background, enterprise information density, 4px base grid, data table rules, JetBrains Mono, shadow system, 200ms animation ceiling |
| **PulsePoint** | Status chip system (critical/warning/normal/info), alert hierarchy rules, large tabular KPI display, scan zone layout, glow-free elevation |
| **LearnFlow** | Progress-visibility-everywhere, "incomplete ≠ error" (gray not red), milestone recognition, clear next-action in empty states |
| **CampusKit** | Academic data density, deadline prominence, sticky table headers, formal-but-usable tone, no exclamation marks |

---

## 14. Dark Mode Tokens

> **Status:** v2.1 · opt-in. Activated via `data-theme="dark"` on `<html>`. Light mode
> remains the default — never assume dark. All tokens below are *overrides* of the §11
> variables; any token not listed here inherits its light value unchanged.

### Activation

```html
<html data-theme="dark"> ... </html>
```

```js
// Respect OS preference on first load, then user choice persists in localStorage.
const saved = localStorage.getItem('sr-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('theme', saved ?? (prefersDark ? 'dark' : 'light'));
```

### Design principles for dark

- **Base is true dark `#0B1120`** (OLED-friendly). Surfaces step *up* in lightness, never down.
- **Shadows barely read on dark** — depth comes from lighter borders + subtle glows, not drop shadows. Elevation = surface lightness, not shadow weight.
- **Status colors are de-saturated and lightened** so they don't vibrate against the dark base. Pure `--red #E63946` is too hot on dark; dark uses `#FF6B75`.
- **Ink never goes pure white** — `#E8EDF7` max, to reduce halation during long sessions.
- **The gradient is the one thing that gets *more* vivid on dark** — it's allowed slightly higher luminance in progress rings and the landing glow.

### Dark Surface & Layout

| CSS Token | Dark Hex | Notes |
|---|---|---|
| `--bg` | `#0B1120` | True-dark page canvas |
| `--surface` | `#131C2E` | Cards, panels — one step up from canvas |
| `--surface-2` | `#1B2538` | Raised surface (modals, popovers) |
| `--bg-sidebar` | `#070C16` | Sidebar — darkest layer, anchors the shell |
| `--soft-blue` | `#16223D` | Icon containers, active tints |
| `--border` | `#243049` | Card borders, dividers — does the work shadows did |
| `--border-2` | `#33415C` | Input borders at rest |

### Dark Text

| CSS Token | Dark Hex | Notes |
|---|---|---|
| `--ink` | `#E8EDF7` | Body + headings — off-white, not pure white |
| `--ink-4` | `#94A3B8` | Labels, metadata (unchanged — already reads on dark) |
| `--ink-5` | `#64748B` | Placeholders, disabled |
| `--ink-inv` | `#0D1B3E` | Text on light surfaces inside dark mode (e.g. white buttons) |

### Dark Status (recalibrated for dark backgrounds)

| CSS Token | Dark Hex | vs Light |
|---|---|---|
| `--blue` | `#4F8BFF` | Lifted for contrast on dark |
| `--green` | `#3DDC84` | Lifted |
| `--amber` | `#FBBF45` | Lifted |
| `--red` | `#FF6B75` | De-hotted from `#E63946` |
| `--purple` | `#9D6BFF` | Lifted |
| `--cyan` | `#22D3EE` | Lifted |

### Dark Soft Tints

| CSS Token | Dark Hex |
|---|---|
| `--soft-blue` | `#16223D` |
| `--soft-green` | `rgba(61,220,132,0.12)` |
| `--soft-amber` | `rgba(251,191,69,0.12)` |
| `--soft-red` | `rgba(255,107,117,0.12)` |
| `--soft-purple` | `rgba(157,107,255,0.14)` |

### Dark Elevation (glow-based, not shadow-based)

```
Rest:    0 0 0 1px var(--border)                    — borders carry rest elevation
Hover:   0 0 0 1px var(--border-2), 0 4px 16px rgba(0,0,0,0.4)
Float:   0 8px 32px rgba(0,0,0,0.5)                 — modals
Glow:    0 0 24px rgba(79,139,255,0.18)             — focused/active accent elements
```

### Dark Mode CSS Block

```css
/* Append to src/styles/tokens.css — overrides only */
[data-theme="dark"] {
  /* surfaces */
  --bg:           #0B1120;
  --surface:      #131C2E;
  --surface-2:    #1B2538;
  --bg-sidebar:   #070C16;
  --border:       #243049;
  --border-2:     #33415C;

  /* text */
  --ink:          #E8EDF7;
  --ink-4:        #94A3B8;
  --ink-5:        #64748B;
  --ink-inv:      #0D1B3E;

  /* status — recalibrated for dark */
  --blue:         #4F8BFF;
  --green:        #3DDC84;
  --amber:        #FBBF45;
  --red:          #FF6B75;
  --purple:       #9D6BFF;
  --cyan:         #22D3EE;

  /* soft tints */
  --soft-blue:    #16223D;
  --soft-green:   rgba(61,220,132,0.12);
  --soft-amber:   rgba(251,191,69,0.12);
  --soft-red:     rgba(255,107,117,0.12);
  --soft-purple:  rgba(157,107,255,0.14);

  /* elevation — glow-based */
  --shadow-card:    0 0 0 1px var(--border);
  --shadow-hover:   0 0 0 1px var(--border-2), 0 4px 16px rgba(0,0,0,0.4);
  --shadow-float:   0 8px 32px rgba(0,0,0,0.5);
  --shadow-overlay: 0 20px 60px rgba(0,0,0,0.6);
  --glow-accent:    0 0 24px rgba(79,139,255,0.18);
}
```

### Dark Mode Rules

- ✅ Toggle lives in settings + a header icon; default follows OS, then persists user choice
- ✅ Keep the §10 voice identical — dark mode changes pixels, never tone
- ✅ Progress-ring gradient stays; it's allowed to read slightly brighter on dark
- ❌ Never use pure `#000` or pure `#FFF` — use the tokens above
- ❌ Never rely on drop shadows for elevation in dark — borders and surface-lightness do that job
- ❌ Never ship a half-themed screen — if a component reads a raw hex (violating §12), it breaks in dark. This is the strongest reason to honor "no hardcoded hex."

---

## 15. Expressive Landing Layer

> **Status:** v2.1 · landing/marketing surface ONLY. This is the one place "attractive,
> modern, catchy" is allowed to breathe. **It must never appear in the app UI.** The §12
> rule "no brand gradient in app UI" still holds absolutely — here the gradient is used as
> *ambient background light*, not as a UI surface or control color.

### The gradient glow (hero ambiance)

A soft, blurred mesh of the logo gradient sitting behind the hero — felt, not seen. It
signals "rise/momentum" without shouting.

> **Implementation lives in `MOTION_GUIDE.md` §5.2 — that is the canonical `.sr-hero`
> definition.** Do not redefine `.sr-hero` here or anywhere else. This section states the
> *brand intent* (when and why the glow is allowed); the motion guide owns the exact CSS
> (navy base, purple→cyan→blue radial wash, two slow drifting glow orbs, `aria-hidden`).
> For a motion-free variant, use the §5.2 wash without the `.sr-orb` elements.

**Brand rules for the glow (the motion guide implements these):**

- The glow is the *one* sanctioned marketing use of the brand gradient. It is forbidden in
  app UI (per §12) and allowed only on a dark marketing hero canvas.
- Same hues as the logo gradient — no new brand color is ever introduced.
- It must never reduce text contrast below WCAG AA; it sits behind content at low opacity.
- On `data-theme="dark"` pages, the hues read at slightly higher luminance (see §14).
- It honors §9 ("no auto-playing anything" beyond the sanctioned slow ambient drift) and
  the §8.1 reduced-motion baseline in the motion guide, which snaps the orbs static.

### Fluid display type (clamp)

Replaces the single desktop/mobile jump with smooth scaling. Applies to landing display
levels only — app type scale (§4) is unchanged.

| Level | Fluid size | Weight | Use |
|---|---|---|---|
| Hero display | `clamp(2.25rem, 1.2rem + 5.2vw, 4rem)` | 800 | Landing H1 (36 → 64px) |
| Hero subhead | `clamp(1rem, 0.9rem + 0.6vw, 1.25rem)` | 400 | Sub-headline (16 → 20px) |
| Section title | `clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)` | 700 | Landing section H2 (24 → 36px) |

```css
/* Landing-only display type */
.sr-hero-h1    { font-family: var(--font-display); font-weight: 800;
                 font-size: clamp(2.25rem, 1.2rem + 5.2vw, 4rem);
                 line-height: 1.05; letter-spacing: -0.02em; color: var(--ink); }
.sr-hero-h1 .accent { color: var(--blue); }      /* "Rise" stays Electric Blue */
.sr-hero-sub   { font-family: var(--font-sans); font-weight: 400;
                 font-size: clamp(1rem, 0.9rem + 0.6vw, 1.25rem);
                 line-height: 1.6; color: var(--ink-4); max-width: 540px; }
.sr-section-h2 { font-family: var(--font-display); font-weight: 700;
                 font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
                 line-height: 1.2; letter-spacing: -0.01em; color: var(--ink); }
```

### Expressive landing rules

- ✅ Glow + fluid type live ONLY on `landing.html`, `/features`, `/pricing`, `/blog` hubs
- ✅ "Rise" accent word stays `--blue` — the one consistent thread from logo to hero
- ✅ Keep generous whitespace; modern = restraint + space, not more elements
- ✅ Honors existing §9 landing animation rules (fade-up on scroll, 600ms max)
- ❌ Never bring the glow, mesh, or fluid display type into the app UI
- ❌ Never introduce a new brand hue — the glow is the *existing* gradient, blurred
- ❌ Never let the glow reduce text contrast below WCAG AA — it sits behind, low-opacity

---

## 16. Refined Depth & Glass Surfaces

> **Status:** v2.1 · marketing/landing surfaces and large overlays only. The app's
> "borders over shadows at rest" rule (§12) is unchanged. This section adds an optional
> frosted-glass treatment and a slightly richer shadow ramp for *marketing* cards and
> floating nav — places where a little depth reads as modern, not noisy.

### Frosted glass surface

For sticky landing nav and feature cards over the gradient glow.

```css
.sr-glass {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(12px) saturate(1.4);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: var(--rounded-modal);   /* 12px — still within the app's max */
}
[data-theme="dark"] .sr-glass {
  background: rgba(19,28,46,0.62);
  border: 1px solid rgba(255,255,255,0.08);
}
```

### Refined shadow ramp (landing cards)

A softer, layered shadow than the app's flat single-layer shadows — modern depth without
heaviness. **Landing only**; app cards keep §5 elevation.

```css
:root {
  --shadow-soft:   0 1px 2px rgba(13,27,62,0.04), 0 4px 12px rgba(13,27,62,0.06);
  --shadow-lift:   0 2px 4px rgba(13,27,62,0.05), 0 12px 28px rgba(13,27,62,0.10);
  --shadow-hero:   0 8px 16px rgba(13,27,62,0.06), 0 24px 56px rgba(13,27,62,0.14);
}
[data-theme="dark"] {
  --shadow-soft:   0 0 0 1px var(--border);
  --shadow-lift:   0 0 0 1px var(--border-2), 0 12px 28px rgba(0,0,0,0.45);
  --shadow-hero:   0 24px 56px rgba(0,0,0,0.55), 0 0 40px rgba(79,139,255,0.10);
}
```

### Depth & glass rules

- ✅ Use glass for sticky landing nav and cards floating over the hero glow
- ✅ Use the refined ramp (`--shadow-soft/lift/hero`) on landing/marketing cards
- ✅ Always provide a solid fallback — `backdrop-filter` degrades to the rgba base color
- ❌ Never use glass or the soft ramp inside the app — long-session readability wins
- ❌ Never stack glass on glass (one frosted layer max per region)
- ❌ Never let `border-radius` exceed 12px, even on landing (the §12 cap holds everywhere)

---

## 17. Changelog

### v2.3 — 2026-06-20
**Path update only. No artwork or token changes.**

- **Moved all logo/icon assets to `/assets/brand/`** — the full variant set
  (`studyrise-logo-full-color.svg`, `studyrise-logo-white.svg`, all icons, `favicon.svg`,
  `app-icon-512.svg`) now lives at `public/assets/brand/` and is served at `/assets/brand/`.
- **Updated §2 Logo System** — all paths in the primary table, extended variant set table,
  Usage Variants table, and React Logo Component updated to reflect the new canonical location.
- **Logo component gains `darkBg` prop** — boolean that switches between full-color and
  white-reversed variants automatically. Backward-compatible: `darkBg` defaults to `false`.
- **Old `/logo.svg` and `/favicon.svg` at public root** — kept as-is until all live HTML
  pages are migrated. Do not delete them until Phase 3 cleanup is complete.

### v2.2 — 2026-06-19
**Correction + additive. No palette, type, or voice changes.**

- **Corrected §2 Logo System** — the icon was described as a "3D ribbon forming an 'S'."
  The actual, authoritative artwork (`/logo.svg`, `/favicon.svg`) is **four ascending bars
  topped by an upward chevron** — an ascending bar chart conveying progress and "rise."
  Updated the shape description, the component comments, and the clear-space rule to match
  the real mark. No artwork changed; only the wording was brought in line with the files.
- **Added the extended logo variant set** — full-color / white-reversed / black / grayscale
  lockups and icons, plus a tight-square `favicon.svg` and a navy `app-icon-512.svg` tile.
  Each export uses a unique gradient-ID namespace to prevent cross-file collisions.
- **Tagline is now a layout element, not part of the logo** — "PLAN TODAY. RISE TOMORROW."
  was previously specified inside the logo lockup but is absent from the actual `logo.svg`.
  §2 now treats it as standalone copy placed near the logo (hero, email, splash, footer),
  styled Inter 300 / uppercase / 0.15em / Slate `#64748B`, keeping the mark clean at all sizes.

### v2.1 — 2026-06-19
**Additive only. No breaking changes; zero retrofit required.**

- **Added §14 Dark Mode Tokens** — true-dark `#0B1120` base, `data-theme="dark"` override
  block, recalibrated status colors, glow-based elevation, OS-preference activation.
- **Added §15 Expressive Landing Layer** — ambient gradient glow (brand intent + rules;
  canonical `.sr-hero` CSS deferred to MOTION_GUIDE.md §5.2 to avoid drift) and fluid
  `clamp()` display type. Landing/marketing surfaces only.
- **Added §16 Refined Depth & Glass** — frosted-glass surface + layered shadow ramp for
  marketing cards and sticky nav. App elevation unchanged.
- **Unchanged:** core palette, logo system, type stack, voice & tone, all app component
  specs, spacing grid, and every existing rule. v2.0 remains fully authoritative.

### v2.0 — 2026-06-02
- Established the full system: palette tokens, type scale, components, motion, dashboard
  rules, landing style, voice, and DesignMD reference map.

---

*End of BRAND_KIT.md*  
*Apply all changes via `src/styles/tokens.css` before touching components.*  
*Logo files: `/assets/brand/` — primary lockup `studyrise-logo-full-color.svg` · reversed `studyrise-logo-white.svg` · favicon `favicon.svg`*  
*v2.1 layers (§14–16) are opt-in: dark mode app-wide, expressive + glass on marketing only.*


---
<!-- docnav-related -->
### Related docs
- [StudyRise — Framer Motion Animation Plan](ANIMATION_PLAN.md)
- [StudyRise — Design Implementation Prompts](DESIGN_PROMPTS.md)
- [Deployment Architecture → moved (superseded)](Deployment%20Architecture.md)
- [StudyRise — Full Feature Specification](FEATURES.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
