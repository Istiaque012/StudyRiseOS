# StudyRise — Framer Motion Animation Plan

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


A room-by-room rollout guide. Each section lists **exactly what to animate**, **which variant to use**, and **the implementation pattern**. Work top-to-bottom — screens first, then components.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done — uses registry |
| ⚠️ | Has Framer Motion but inline (not registry) |
| ❌ | No animation at all |

---

## 1. Screens

### 1A. Dashboard ❌ → HIGH PRIORITY

The most-visited screen. Currently zero animation.

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper `<div>` | `fadeUp` | Wraps the whole page; fires on mount |
| KPI tiles row (6 tiles) | `staggerTight` parent + `scaleIn` per tile | Tiles pop in one by one |
| Readiness `Ring` card | `scaleIn` with slight delay | Hero metric — deserves a beat |
| Today's task card | `fadeUp` with `delay: 0.1` | Draws the eye after KPIs load |
| SR overdue banner | `fadeUp` | Only renders when overdue — should slide in |
| Phase progress bars | `stagger` parent + `fadeLeft` per bar | Bars cascade in left→right |
| AI Advisor card | `fadeUp` with `delay: 0.15` | Last to load — last to enter |

**Pattern:**
```jsx
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, staggerTight, scaleIn } from '../lib/animations'

const reduced = useReducedMotion()

// Screen wrapper
<motion.div variants={reduced ? {} : fadeUp} initial="hidden" animate="visible">

// KPI row
<motion.div variants={reduced ? {} : staggerTight} initial="hidden" animate="visible">
  {kpis.map(k => <motion.div key={k.id} variants={scaleIn}><KPITile /></motion.div>)}
</motion.div>
```

---

### 1B. SR Module ❌ → HIGH PRIORITY

Subject cards and compliance stats appear instantly.

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page-level entry |
| Overdue banner | `fadeUp` + `AnimatePresence` | Appears/disappears based on overdue count |
| SR subject cards list | `stagger` parent + `fadeUp` per card | Cards cascade in |
| Compliance Ring | `scaleIn` | Hero metric |
| Due-today list items | `staggerTight` parent + `fadeLeft` per row | Right sidebar list |
| Retention heatmap cells | `staggerTight` parent + `scaleIn` per cell | Grid of colored squares |

---

### 1C. Analytics ❌ → MEDIUM PRIORITY

10 chart sections just appear. Should feel like a dashboard loading in.

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page entry |
| Chart cards (10 total) | `stagger` parent + `fadeUp` per card | Stagger at 0.05s — 10 cards × 50ms = 0.5s total |
| Empty state inside charts | `fade` | Replaces no-data message |

**Note:** Do NOT animate Recharts internals — Recharts has its own `isAnimationActive` prop. Keep chart entry animation on the **card wrapper**, not the SVG.

---

### 1D. History ❌ → MEDIUM PRIORITY

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page entry |
| Calendar grid | `fadeUp` | Whole grid fades in on mount and on month change |
| Day detail panel (desktop) | `slideFromRight` | Slides in when a date is selected |
| Mobile bottom sheet | `slideFromBottom` + `AnimatePresence` | Already has open/close state — add motion |
| Month nav (prev/next) | `fade` on the grid | Quick fade when month changes |

**Pattern for month change:**
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={`${year}-${month}`}
    variants={reduced ? {} : fade}
    initial="hidden" animate="visible" exit="exit"
  >
    {/* calendar grid */}
  </motion.div>
</AnimatePresence>
```

---

### 1E. Mistakes ❌ → MEDIUM PRIORITY

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page entry |
| Mistake cards list | `stagger` parent + `fadeUp` per card | Main content |
| New card on add | `scaleIn` + `AnimatePresence` | Card appears from top of list |
| Card removal | `exit: { opacity: 0, y: -8 }` via `fadeUp` exit | Smooth removal |
| Type distribution bars | `staggerTight` + `fadeLeft` | Right sidebar bars |

---

### 1F. Mock Exams ❌ → MEDIUM PRIORITY

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page entry |
| Hero score card | `scaleIn` | Score trend chart card |
| Mock history list | `stagger` + `fadeUp` per row | History items cascade |
| New mock on add | `AnimatePresence` + `scaleIn` | Appears at top of list |

---

### 1G. Questions ❌ → MEDIUM PRIORITY

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page entry |
| 4 KPI tiles | `staggerTight` + `scaleIn` | Same pattern as Dashboard |
| Session history rows | `stagger` + `fadeLeft` | Left sidebar list |
| Accuracy trend chart card | `fadeUp` with slight delay | After KPIs |

---

### 1H. Auth ❌ → LOW PRIORITY

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Auth card | `scaleIn` | Card pops into center of screen |
| Login → Register toggle | `AnimatePresence` + `fade` | Form content fades when mode switches |
| Error message | `fadeUp` + `AnimatePresence` | Error appears from below input |

---

### 1I. Profile ❌ → LOW PRIORITY

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Screen wrapper | `fadeUp` | Page entry |
| Avatar | `scaleIn` | Hero element |
| Form fields | `stagger` + `fadeUp` | Fields stagger in below avatar |

---

### 1J. Settings ❌ → LOW PRIORITY

Settings is content-dense. Keep it subtle.

**What to animate:**

| Element | Variant | Notes |
|---------|---------|-------|
| Active tab content | `AnimatePresence` + `fade` | Fade between tabs (not slide — content is tall) |
| Tab indicator pill | `layoutId` spring | Sliding pill under active tab |

---

## 2. Components (inline → registry migration)

These already use Framer Motion but with hand-rolled inline values. Replace with registry imports.

### 2A. Plan components ⚠️

| File | Current issue | Fix |
|------|--------------|-----|
| `Plan/ListView.jsx` | Inline `{ opacity: 0, y: 8 }` per row | Replace with `staggerTight` parent + `fadeUp` per row |
| `Plan/FilterBar.jsx` | Inline scale on active tab | Replace with `btnPress` for filter buttons |
| `Plan/ContextPanel.jsx` | Inline `{ opacity: 0, x: 20 }` | Replace with `slideFromRight` |
| `Plan/TaskDetailDrawer.jsx` | No `reduced` check, inline x/y | Replace with `drawerSlide(isMobile)` + `backdrop`, add `useReducedMotion` |

### 2B. Layout components ⚠️

| File | Current issue | Fix |
|------|--------------|-----|
| `Layout/BottomTabBar.jsx` | Inline active indicator animation | Use `layoutId` spring + `btnPress` for tab buttons |
| `Layout/PageWrapper.jsx` | Inline `{ opacity: 0, y: 8 }` | Replace with `fadeUp` |

### 2C. UI primitives ⚠️

Low risk, high consistency. These are used everywhere so getting them right propagates through the whole app.

| File | Current issue | Fix |
|------|--------------|-----|
| `ui/Badge.jsx` | Inline scale on hover | Replace with `btnPress` when Badge is interactive |
| `ui/Button.jsx` | Inline `whileTap` | Replace with `btnPress` |
| `ui/Card.jsx` | Inline hover | Replace with `cardHover` where Card is clickable |
| `ui/KPITile.jsx` | Inline number counter animation | Keep — KPITile's counter is bespoke, not in registry |
| `ui/Tabs2.jsx` | Inline `layoutId` for active pill | Already correct pattern; add `btnPress` to tab buttons |
| `ui/Bar.jsx` | Inline width transition | Keep — progress bar fill is a one-off CSS/motion pattern |
| `ui/EmptyState.jsx` | Inline `fadeIn` | Replace with `fade` |
| `ui/LoadingState.jsx` | Inline pulse | Replace with `pulseDot` for the spinner dot |
| `ui/Toggle.jsx` | Inline spring thumb | Keep — toggle thumb spring is bespoke |
| `ui/Ring.jsx` | Inline SVG animation | Keep — Ring draws its own stroke; not a standard variant |
| `ui/Field.jsx` | Inline error message animation | Replace with `fadeUp` + `AnimatePresence` for error text |
| `ui/SectionHeader.jsx` | Inline hover on action link | Replace with `rowHover` |

---

### 2D. Landing page components ⚠️

| File | Current issue | Fix |
|------|--------------|-----|
| `Landing/Navbar.jsx` | Inline entry + mobile menu | Replace entry with `sidebarEntry`; mobile menu with `slideFromTop` (add to registry) |
| `Landing/FeatureCard.jsx` | Inline `{ opacity:0, y:20 }` | Replace with `fadeUp` |
| `Landing/StepCard.jsx` | Inline `{ opacity:0, y:20 }` | Replace with `fadeUp` |
| `Landing/AudienceCard.jsx` | Inline `{ opacity:0, scale:0.95 }` | Replace with `scaleIn` |

---

## 3. New variants needed in `animations.js`

During the above work, add these to the registry:

| Name | Description | Pattern |
|------|-------------|---------|
| `slideFromTop` | Menus/dropdowns entering from top | `{ hidden: { opacity:0, y:-12 }, visible: { opacity:1, y:0, ... }, exit: ... }` |
| `listItem` | Single list row — alias for `fadeUp` with tighter duration | Convenience alias |
| `pageTransition` | Full-page route change wrapper | `fadeUp` with `mode="wait"` on the `AnimatePresence` in `Layout.jsx` |

---

## 4. Page transition wiring (`Layout.jsx`)

Currently `Layout.jsx` imports `AnimatePresence` but doesn't use it for route transitions. Add route-level transitions:

```jsx
// Layout.jsx
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { fadeUp } from '../../lib/animations'

const location = useLocation()

<AnimatePresence mode="wait" initial={false}>
  <motion.main
    key={location.pathname}
    variants={reduced ? {} : fadeUp}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{ flex: 1, overflowY: 'auto' }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

This is the single highest-impact change — every screen gets a transition for free without touching screen files.

---

## 5. Implementation order (recommended)

Work in this order to get the most visible impact first:

| Priority | Task | Impact |
|----------|------|--------|
| 1 | Wire page transitions in `Layout.jsx` | All screens animated instantly |
| 2 | Dashboard — KPI stagger + hero cards | Most visited screen |
| 3 | SR Module — subject card stagger | Second most visited |
| 4 | `Plan/ListView` + `Plan/ContextPanel` → registry | Already in Plan, quick win |
| 5 | History — month fade + day detail slide | Feels very static now |
| 6 | Analytics — chart card stagger | 10 cards, big visual improvement |
| 7 | Mistakes + MockExams + Questions | Content screens |
| 8 | `ui/` primitives → registry | Propagates everywhere |
| 9 | Auth + Profile | Onboarding path |
| 10 | Landing page components → registry | Marketing page |
| 11 | Add `slideFromTop` + `pageTransition` to registry | Registry completeness |

---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
