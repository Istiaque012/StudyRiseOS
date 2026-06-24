# StudyRise — Design Implementation Prompts

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

_Rewritten 2026-06-02 · §-refs remapped to BRAND_KIT.md v2.1 on 2026-06-19 · Cross-referenced against live DesignMD kits_

---

## DesignMD Source Kits

Every rule below traces to one of these five kits. Read the actual kit before implementing — each URL is live.

| Kit | URL | What StudyRise takes |
|-----|-----|----------------------|
| **DocuForge** | https://designmd.ai/chef/docuforge | `#2563EB` + `#7C3AED` colour pair · Plus Jakarta Sans + Inter type stack · sidebar active pattern (left border 2px + `#EEF2FF` tint) · button specs · input focus ring `rgba(37,99,235,0.12)` · 8px card radius |
| **CorpScale** | https://designmd.ai/chef/corpscale | `#F8FAFC` page bg · navy anchor · enterprise data density · 4px base grid · table rules · JetBrains Mono · navy-tinted shadow scale · **max animation 200ms rule** · bulk actions on every list |
| **PulsePoint** | https://designmd.ai/chef/pulsepoint | Status chip system: critical `#E63946` / warning `#F59E0B` / success `#22C55E` / info `#3B82F6` · alert hierarchy is sacred · large tabular-numeral KPIs · scan-zone layout · **never hide critical data behind hover** |
| **LearnFlow** | https://designmd.ai/chef/learnflow | Progress visible everywhere · **incomplete ≠ error** (gray, never red) · milestone celebrations · streak counters · clear next-action on empty states |
| **CampusKit** | https://designmd.ai/chef/campuskit | Deadline prominence · sticky table headers · dense academic data · **no casual language, no exclamation marks** · explicit confirmation for destructive actions |

> **Key correction from live kits:** CorpScale's headline font is Noto Serif (not Inter). StudyRise intentionally overrides this with Plus Jakarta Sans for a more modern feel — that override is intentional and already set in `tokens.css`.

---

## What Is Already Done — Do Not Redo

```
✅ BRAND_KIT.md                  — full brand kit (v2.1)
✅ src/styles/tokens.css         — all CSS custom properties + motion tokens
✅ tailwind.config.js            — brand colours, font families, shadow scale, radius
✅ index.html                    — fonts (Inter, Plus Jakarta Sans, JetBrains Mono), meta tags
✅ framer-motion                 — installed
✅ src/screens/LandingPage.jsx   — complete redesign with brand tokens, real screenshots,
                                   font-display headings, auth routing, no hardcoded hex
✅ src/components/ui/            — Button2, Card2, Badge2, KPITile, Ring, Bar, Tabs2,
                                   Toggle, EmptyState, LoadingState, Field, SectionHeader
✅ src/components/Layout/Sidebar.jsx    — animated, gradient S icon, staggered nav, layoutId
✅ src/components/Layout/BottomTabBar.jsx — animated, layoutId dot
✅ src/components/Layout/Layout.jsx     — AnimatePresence page transition wrapper
✅ src/components/Layout/PageWrapper.jsx — fade-up page transition
```

---

## Global Conventions — Apply Everywhere

```
Colour source:    var(--token) from tokens.css, or Tailwind token class (text-ink, bg-blue, etc.)
Never:            text-[#hex] / bg-[#hex] hardcoded Tailwind arbitrary hex values
Never:            inline hex strings e.g. color: '#2563EB' — use color: 'var(--blue)'
Font:             font-sans (Inter) for body · font-display (Plus Jakarta Sans) for h1/h2 hero
Spacing grid:     8px base — all padding/margin/gap values multiples of 4px or 8px
Border radius:    max 12px in app UI (CorpScale rule) · 8px default · 9999px for pills
Shadows:          use var(--shadow-*) tokens, never write raw box-shadow values
Animations:       ≤ 200ms for UI interactions (CorpScale) · landing page may go to 450ms
Reduced motion:   every Framer Motion component must read useReducedMotion()
```

---

## Framer Motion — Master Reference

Install (already done): `npm install framer-motion`

### Import pattern
```js
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
```

### Reduced motion hook — wrap EVERY animated component
```js
function MyComponent() {
  const reduced = useReducedMotion()
  const initial = reduced ? { opacity: 1 } : { opacity: 0, y: 16 }
  const animate = { opacity: 1, y: 0 }
  return <motion.div initial={initial} animate={animate} transition={{ duration: 0.3 }} />
}
```

### Easing presets (match tokens.css)
```js
const ease = {
  out:    [0.0, 0.0, 0.2, 1],    // entering elements — use for mount, fade-up
  in:     [0.4, 0.0, 1.0, 1],    // exiting elements
  inout:  [0.4, 0.0, 0.2, 1],    // toggles, sliders
  spring: [0.34, 1.56, 0.64, 1], // buttons, badge pop, modal open
}

// Framer spring object (use for layoutId transitions, modals)
const spring = { type: 'spring', stiffness: 400, damping: 30 }
const springSnappy = { type: 'spring', stiffness: 500, damping: 35 }
```

### Core animation patterns
```js
// ── Page mount fade-up (PageWrapper already handles this — do NOT re-add per screen)
const pageVariants = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0,0,0.2,1] } },
  exit:     { opacity: 0, y: -8,  transition: { duration: 0.2,  ease: [0.4,0,1,1] } },
}

// ── Staggered list (tasks, SR cards, subjects)
const listContainer = {
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }
}
const listItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0,0,0.2,1] } },
}

// ── Card mount (individual cards)
const cardMount = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.34,1.56,0.64,1] } },
}

// ── Card hover lift (CorpScale: 200ms, shadow-hover token)
const cardHover = {
  whileHover: { y: -3, boxShadow: 'var(--shadow-hover)' },
  transition: { duration: 0.2, ease: [0,0,0.2,1] },
}

// ── Button press (all clickable elements)
const btnTap = { whileTap: { scale: 0.96 }, transition: { duration: 0.1, ease: [0.34,1.56,0.64,1] } }

// ── Modal backdrop + panel (BRAND_KIT.md §7 Animation System)
const backdrop = {
  initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 },
  transition: { duration: 0.2 },
}
const modalPanel = {
  initial: { opacity: 0, scale: 0.95, y: 16 },
  animate: { opacity: 1, scale: 1,    y: 0  },
  exit:    { opacity: 0, scale: 0.97, y: 8  },
  transition: { duration: 0.25, ease: [0.34,1.56,0.64,1] },
}

// ── Dropdown / select menu
const dropdown = {
  initial: { opacity: 0, scaleY: 0.9, y: -4, originY: 'top' },
  animate: { opacity: 1, scaleY: 1,   y: 0  },
  exit:    { opacity: 0, scaleY: 0.95,y: -2 },
  transition: { duration: 0.15 },
}

// ── Toast (top-right slide in, auto-dismiss 4s)
const toast = {
  initial: { opacity: 0, x: 48, scale: 0.9 },
  animate: { opacity: 1, x: 0,  scale: 1   },
  exit:    { opacity: 0, x: 48              },
  transition: { duration: 0.3, ease: [0.34,1.56,0.64,1] },
}

// ── Bottom sheet (mobile)
const bottomSheet = {
  initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' },
  transition: { duration: 0.35, ease: [0,0,0.2,1] },
}

// ── Sidebar nav indicator (layoutId — Framer handles animation)
// <motion.div layoutId="sidebar-indicator" transition={springSnappy} />

// ── Tab underline (layoutId)
// <motion.div layoutId="tab-underline" transition={springSnappy} />

// ── whileInView scroll entrance (landing + analytics cards)
const scrollFadeUp = {
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.45, ease: [0,0,0.2,1] },
}

// ── Progress ring draw (SVG strokeDashoffset)
// initial: { strokeDashoffset: circumference }
// animate: { strokeDashoffset: circumference - (pct / 100) * circumference }
// transition: { duration: 1.2, ease: [0,0,0.2,1], delay: 0.3 }

// ── Progress bar fill (slide from left)
const progressBar = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.8, ease: [0,0,0.2,1], delay: 0.2 },
}

// ── Success flash (task complete, SR hit, plan saved)
// animate={{ backgroundColor: ['var(--surface)', 'var(--green-soft)', 'var(--surface)'] }}
// transition={{ duration: 0.6 }}

// ── Error shake (form validation fail)
// animate={{ x: [0, -8, 8, -6, 6, -4, 4, 0] }}
// transition={{ duration: 0.5, ease: 'easeInOut' }}

// ── Streak/badge pop (milestone hit)
// animate={{ scale: [1, 1.25, 1] }}
// transition={{ duration: 0.4, ease: [0.34,1.56,0.64,1] }}

// ── KPI count-up (use with useMotionValue + animate)
// import { useMotionValue, animate } from 'framer-motion'
// useEffect(() => { const ctrl = animate(mv, target, { duration: 0.8, ease: 'easeOut' }); return ctrl.stop }, [target])
```

---

## PROMPT 1 — Global Styles Cleanup

**Goal:** Align `globals.css` and `App.css` base styles with brand kit. One session, low risk.

**Read first:**
```
BRAND_KIT.md (§4 Typography, §5 Spacing & Layout)
src/styles/tokens.css
src/styles/globals.css
src/App.css
tailwind.config.js
```

**DesignMD rules that apply:**
- CorpScale: `#F8FAFC` page background, `-webkit-font-smoothing: antialiased`, long-session eye comfort
- CorpScale: `JetBrains Mono` for `code/pre/kbd`
- DocuForge: Inter body, Plus Jakarta Sans display
- PulsePoint: WCAG AA contrast minimum on all text
- CampusKit: no casual copy, no exclamation marks

**Tasks:**

1. **`globals.css`** — add/verify:
   ```css
   body {
     font-family: var(--font-sans);
     background: var(--bg);
     color: var(--ink);
     font-size: 14px;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
   h1, h2, h3, h4, h5, h6 { font-family: var(--font-sans); color: var(--ink); }
   /* Hero/landing headings override to display font in JSX via font-display class */
   code, pre, kbd { font-family: var(--font-mono); }

   /* Custom scrollbar — CorpScale restrained style */
   ::-webkit-scrollbar       { width: 4px; height: 4px; }
   ::-webkit-scrollbar-track { background: var(--border); }
   ::-webkit-scrollbar-thumb { background: var(--ink-6); border-radius: 9999px; }

   /* Selection */
   ::selection { background: var(--soft-blue); color: var(--blue-ink); }

   /* Reduced motion — required by BRAND_KIT.md §7 Animation System */
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

2. **Add skeleton animation** (BRAND_KIT.md §7 Animation System):
   ```css
   @keyframes shimmer {
     0%   { background-position: -400px 0; }
     100% { background-position:  400px 0; }
   }
   .skeleton {
     background: linear-gradient(90deg, var(--surface-3) 25%, var(--border) 50%, var(--surface-3) 75%);
     background-size: 800px 100%;
     animation: shimmer 1.4s ease-in-out infinite;
     border-radius: var(--r-sm);
   }
   ```

3. **`App.css`** — remove any IBM Plex/old font refs, hardcoded old colours. Keep only structural rules needed by the app shell.

4. **Verify:** `npm run build` — zero errors, zero warnings.

---

## PROMPT 2 — Landing Page ✅ COMPLETE

Landing page was fully rebuilt on 2026-06-02. Screenshots are live at `/public/screenshots/`.

**What was done:**
- All hardcoded hex replaced with `var(--token)` or Tailwind token classes
- Auth routing: `href="/login"` / `href="/signup"` → `onClick={() => handleShowAuth(mode)}`
- Logo: `<img src="/favicon.svg">` + split wordmark `Study`(var(--ink)) `Rise`(var(--blue))
- `font-display` on all h1/h2 hero and section headings
- Screenshot tabs: `dashboard · today · plan · sr · analytics` — real PNGs loaded
- `PlaceholderScreenshot` shows real images with graceful "Screenshot coming soon" fallback
- No exclamation marks in copy
- App.jsx passes `onShowAuth` prop correctly

**Do not redo.** If changes are needed, edit `src/screens/LandingPage.jsx` directly.

---

## PROMPT 3 — Auth Screen

**Goal:** Redesign `src/screens/Auth.jsx` — centred card, brand tokens, Framer Motion entrance + form transitions.

**Read first:**
```
BRAND_KIT.md (§6 Component Specs — buttons, inputs, cards)
src/styles/tokens.css
src/screens/Auth.jsx
src/components/ui/index.js   (Button2, Field, Tabs2, LoadingState)
```

**DesignMD rules that apply:**
- DocuForge: input focus ring `2px var(--blue)` + `0 0 0 3px rgba(37,99,235,0.12)`
- DocuForge: Primary button `#2563EB` bg, hover `#1D4ED8`, `whileTap scale(0.96)`
- CorpScale: modal/card shadow `var(--shadow-float)` — `0 8px 32px rgba(13,27,62,0.08)`
- PulsePoint: error state uses `var(--red)` border + `rgba(230,57,70,0.12)` ring — never for non-errors

**Framer Motion patterns:**
```js
// Card entrance — spring from slight scale-down
initial={{ opacity: 0, y: 24, scale: 0.97 }}
animate={{ opacity: 1, y: 0,  scale: 1    }}
transition={{ duration: 0.3, ease: [0.34,1.56,0.64,1] }}

// Error shake
animate={{ x: [0, -8, 8, -6, 6, -4, 4, 0] }}
transition={{ duration: 0.5 }}

// AnimatePresence — name field slides in for register mode
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={   { opacity: 0, height: 0 }}
transition={{ duration: 0.25 }}

// Tab switcher (Login / Register) — layoutId spring underline
<motion.div layoutId="auth-tab-indicator" transition={springSnappy} />
```

**Tasks:**

1. **Layout:** Full-screen `bg-bg`, centred vertically + horizontally
2. **Card:** `max-w-[400px]` · `bg-surface` · `border border-border` · `rounded-modal` · `p-8` · `shadow-float`
3. **Logo area:** `favicon.svg` (40px) + "StudyRise" wordmark (Study=`var(--ink)`, Rise=`var(--blue)`) · `font-display font-bold text-2xl` · centred above card
4. **Tagline:** "Plan today. Rise tomorrow." · `text-ink-4 text-sm` · centred below logo
5. **Tab switcher:** `Tabs2` component — Log in / Register — `layoutId="auth-tab"` spring transition
6. **Inputs:** `Field` component — email · password · name (register only, `AnimatePresence` height slide)
7. **Submit button:** `Button2 variant="primary"` full-width — spinner (`LoadingState` inline) while `loading`
8. **Error message:** `AnimatePresence` — `initial={{ opacity:0, y:-4 }}` → `animate={{ opacity:1, y:0 }}` · `text-red text-sm`
9. **Error shake:** wrap card `motion.div`, on error trigger `animate={{ x: [0,-8,8,-6,6,0] }}`
10. **Success state** (email confirmation): green card slides in, `bg-green-soft text-green-ink`
11. **Mode cross-fade:** `AnimatePresence mode="wait"` between login and register content blocks
12. **`useReducedMotion`:** disable all y/scale transitions if `reduced === true`
13. **Verify:** `npm run build` passes.

---

## PROMPT 4 — Dashboard Screen

**Goal:** Brand tokens, animated KPI tiles, rings, SR overdue banner, AI advisor card.

**Read first:**
```
BRAND_KIT.md (§8 Dashboard & Data Display Rules, §7 Animation System — Progress & Data Animations)
src/styles/tokens.css
src/screens/Dashboard.jsx
src/components/ui/index.js   (KPITile, Ring, Card2, Badge2, Bar)
src/components/AIAdvisor/AIAdvisor.jsx
```

**DesignMD rules that apply:**
- CorpScale: 12-col grid · 24px gap · KPI row 4-tile · bulk actions visible
- PulsePoint: SR overdue banner — `var(--red)` left border · never hidden · always above the fold
- PulsePoint: KPI numerals — Inter 700 tabular-nums · large · high contrast
- LearnFlow: readiness ring visible on every load · progress bars animated on mount
- CampusKit: deadline dates prominently visible — never buried

**Framer Motion patterns:**
```js
// KPI tiles — stagger mount (4 tiles, 60ms apart)
const kpiContainer = { animate: { transition: { staggerChildren: 0.06 } } }
const kpiItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0,0,0.2,1] } },
}

// Readiness ring — SVG draw on mount
// Pass to Ring component: animate strokeDashoffset from circumference → target over 1.2s

// SR overdue banner — slide in from left
initial={{ opacity: 0, x: -16 }}
animate={{ opacity: 1, x: 0   }}
transition={{ duration: 0.3, ease: [0,0,0.2,1] }}

// Pulsing red dot on overdue badge
animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}

// AI advisor card — mount with delay after KPI tiles
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0  }}
transition={{ duration: 0.3, delay: 0.3 }}
```

**Tasks:**

1. **Page header:** "Good morning / afternoon / evening, [name]" — `font-display font-bold text-[30px] text-ink` · date subtitle `text-ink-4 text-sm`
2. **KPI row:** 4 × `KPITile` (already has count-up) — pass `delay={0 | 0.06 | 0.12 | 0.18}` · tiles: Readiness Score · Tasks Complete · SR Compliance · Study Streak
3. **Readiness ring:** `Ring` (120px, `color="gradient"`, stroke 8) in a `Card2` · animated draw · label `text-ink-4 text-caption uppercase tracking-wide` below
4. **SR overdue banner:** show only when overdue records exist · `bg-red-soft border-l-4 border-red rounded-card` · pulsing `Badge2` dot · "X reviews overdue" + "Review now" → `/sr`
5. **AI advisor card:** `bg-blue-soft border-l-4 border-blue rounded-card` · Brain icon · advice text · animate in with 300ms delay
6. **Today's task card:** `Card2 hoverable` · task title `font-semibold text-ink` · phase `Badge2` · `Bar` progress animated
7. **Grid:** desktop 12-col — ring (4-col) + today card (8-col) · stacks on mobile
8. **Replace every hardcoded colour** with CSS token or Tailwind token class
9. **`useReducedMotion`:** skip count-up and ring draw animation if `reduced === true`
10. **Verify:** `npm run build` passes.

---

## PROMPT 5 — Today Screen

**Goal:** The daily workhorse. Animated task card, steps checklist completion, DayPlanner block states.

**Read first:**
```
BRAND_KIT.md (§7 Animation System — task completion flash, §8 Dashboard & Data Display Rules — Scan Zone)
src/styles/tokens.css
src/screens/Today.jsx
src/components/today/TaskChecklist.jsx
src/components/DayPlanner/DayPlanner.jsx
src/components/Timer/PomodoroTimer.jsx
```

**DesignMD rules that apply:**
- PulsePoint scan zone: current task → timer → steps → DayPlanner → log (top to bottom, never reorder)
- PulsePoint: active state uses left border `3px var(--blue)` + `var(--soft-blue)` tint
- LearnFlow: task completion is a milestone — celebrate it (green flash, not just a state change)
- CorpScale: DayPlanner block active state: `bg-blue-soft border-l-[3px] border-blue`
- LearnFlow: checked step rows fade to 60% — incomplete is neutral (never red)

**Framer Motion patterns:**
```js
// Task card — mount
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0  }}
transition={{ duration: 0.3, delay: 0.1 }}

// Mark complete — green flash on card
animate={{ backgroundColor: ['var(--surface)', 'var(--green-soft)', 'var(--surface)'] }}
transition={{ duration: 0.6 }}

// Steps — stagger entry
const stepsContainer = { animate: { transition: { staggerChildren: 0.04 } } }
const stepItem = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
}

// Step checkbox bounce on check
whileTap={{ scale: 1.25 }}
transition={{ duration: 0.15, ease: [0.34,1.56,0.64,1] }}

// Checked step row — fade + shift
animate={{ opacity: 0.55, x: 4 }}
transition={{ duration: 0.3, delay: 0.1 }}

// DayPlanner blocks — stagger entry 30ms
staggerChildren: 0.03

// Timer pulse dot (sidebar replication)
animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
```

**Tasks:**

1. **Layout:** 2-col desktop (task + steps left, DayPlanner right) · 1-col mobile · `gap-6` · `bg-bg`
2. **Current task card:** `Card2` · phase `Badge2` · title `font-bold text-xl text-ink` · subject `text-xs text-ink-4 uppercase tracking-wide` · `Bar color="gradient"` animated · "Mark Complete" → green flash
3. **Steps checklist:** stagger entry · checkbox `whileTap` spring · checked = strikethrough + 55% opacity + `x: 4px` · all steps done → container green flash
4. **Pomodoro timer:** `Ring` 160px `color="gradient"` · digits `font-mono font-bold text-[40px] tabular-nums text-ink` centred in ring · mode label `text-caption uppercase text-ink-5` · `Button2 primary` start/pause with `whileTap`
5. **DayPlanner blocks:** stagger mount · active block `bg-blue-soft border-l-[3px] border-blue` · completed `bg-green-soft opacity-70` · state transitions 300ms · drag handle `opacity-0 group-hover:opacity-100`
6. **Study log modal:** `AnimatePresence` · spring modal panel (see master ref above)
7. **Replace every hardcoded colour**
8. **Verify:** `npm run build` passes.

---

## PROMPT 6 — Plan Screen

**Goal:** Phase tabs, task rows, drag-and-drop, modals — all brand-consistent with motion.

**Read first:**
```
BRAND_KIT.md (§6 Component Specs, §7 Animation System — Hover & Tab switching)
src/styles/tokens.css
src/screens/Plan.jsx
src/components/ui/index.js
```

**DesignMD rules that apply:**
- DocuForge: sidebar/tab active = left border `2px var(--blue)` + `var(--soft-blue)` bg
- CorpScale: data tables — sticky header `bg-bg` · 48px min row height · hover `bg-bg` · `border-bottom border-border-soft`
- CorpScale: bulk actions visible — never hidden in context menu only
- PulsePoint: due date overdue = `var(--red)` · due today = `var(--amber)` · future = `var(--ink-4)`
- LearnFlow: `not_started` status chip = gray (`var(--ink-5)`) — **never red**
- CampusKit: deadline dates always visible in task rows

**Framer Motion patterns:**
```js
// Phase tab content cross-fade
<AnimatePresence mode="wait">
  <motion.div key={activePhase}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }} />
</AnimatePresence>

// Tab underline layoutId
<motion.div layoutId="plan-phase-underline" transition={springSnappy} />

// Task rows — stagger on mount
staggerChildren: 0.03

// Task row hover
whileHover={{ backgroundColor: 'var(--surface-2)' }}
transition={{ duration: 0.15 }}

// Dragging task
whileDrag={{ scale: 1.02, boxShadow: 'var(--shadow-float)', zIndex: 50 }}

// Delete confirm tooltip — spring scale pop
initial={{ scale: 0.85, opacity: 0 }}
animate={{ scale: 1,    opacity: 1 }}
transition={{ duration: 0.15, ease: [0.34,1.56,0.64,1] }}
```

**Tasks:**

1. **Phase tabs:** `Tabs2` — Phase 1 / 2 / 3 — `layoutId="plan-phase-underline"` · `AnimatePresence mode="wait"` for content
2. **Task rows:** stagger entry · hover bg · `whileDrag` scale · status `Badge2` semantic colours (gray/blue/green/red) · due date coloured by urgency
3. **Phase summary:** `Bar` component showing phase % complete · KPI tiles: tasks done/total + estimated hours
4. **Add/edit modal:** `AnimatePresence` spring panel · `Field` components for all inputs
5. **Delete confirm:** small `motion.div` spring pop tooltip — "Delete?" + confirm/cancel — NOT a full modal (CorpScale: no over-engineering simple actions)
6. **Empty phase:** `EmptyState` component — CalendarPlus icon + "Add your first task" CTA
7. **Replace every hardcoded colour**
8. **Verify:** `npm run build` passes.

---

## PROMPT 7 — SR Module Screen

**Goal:** SR compliance ring, subject cards with hit indicators, due-today banner, completion flash.

**Read first:**
```
BRAND_KIT.md (§7 Animation System — SR flash green on completion, §3 Color Palette — SR severity scale)
src/styles/tokens.css
src/screens/SRModule.jsx
src/components/SR/SRSubjectCard.jsx
src/components/SR/SRModal.jsx
```

**DesignMD rules that apply:**
- PulsePoint: alert hierarchy — overdue 3+ days = `var(--red)` · due today = `var(--amber)` · done = `var(--green)` · never swap these
- PulsePoint: overdue data is NEVER hidden — due-today section pinned above grid
- LearnFlow: SR hit completion is a milestone — flash green, make it feel earned
- PulsePoint SR severity from BRAND_KIT.md §3 Color Palette: due today `#F59E0B` · 1–2 days `#F59E0B` · 3+ days `#E63946` · done `#22C55E`

**Framer Motion patterns:**
```js
// Compliance ring — draw on mount (same SVG strokeDashoffset pattern as Dashboard)
// delay: 0.1, duration: 1.2

// SR subject cards — stagger 40ms
staggerChildren: 0.04

// SR completion flash — green background pulse
animate={{ backgroundColor: ['var(--surface)', 'var(--green-soft)', 'var(--surface)'] }}
transition={{ duration: 0.6, times: [0, 0.3, 1] }}

// Overdue card pulse dot
animate={{ opacity: [1, 0.4, 1] }}
transition={{ duration: 3, repeat: Infinity }}

// Due-today banner — slide down from top
initial={{ opacity: 0, y: -12 }}
animate={{ opacity: 1, y: 0  }}
transition={{ duration: 0.3, ease: [0,0,0.2,1] }}

// SR modal rating button selection — scale pop
whileTap={{ scale: 1.05 }}
// selected: animate={{ scale: 1.05 }} (stays slightly larger)
```

**Tasks:**

1. **SR compliance ring:** `Ring` 120px `color="gradient"` · count-up % · "X of Y reviewed on time" `text-ink-4 text-sm` · `delay={0.1}`
2. **Due-today banner:** amber/red strip at top of page · `motion.div` slide from top · list of subject names · "Review all" link
3. **Subject card grid:** `Card2 hoverable` · stagger entry · subject name `font-semibold text-ink` · 3 hit circles (SR1/SR2/SR3): filled `var(--green)` if done, `var(--border)` if pending, `var(--red)` if overdue · `Badge2` due date with semantic colour · on completion → green flash
4. **SR modal:** `AnimatePresence` spring · rating buttons (Easy/Medium/Hard/Blackout) as `Button2` with semantic colours · `whileTap` on each · selected state scales up 1.05
5. **Empty state:** `EmptyState` — CheckCircle icon `text-green` · "All caught up" · no exclamation mark (CampusKit rule)
6. **Replace every hardcoded colour**
7. **Verify:** `npm run build` passes.

---

## PROMPT 8 — Settings Screen (9 tabs)

**Goal:** All 9 tabs — brand tokens, animated tab switching, Field/Button2/Toggle components throughout.

**Read first:**
```
BRAND_KIT.md (§6 Component Specs)
src/styles/tokens.css
src/screens/Settings.jsx
src/components/Settings/DailyScheduleSettings.jsx
src/components/ui/index.js
```

**DesignMD rules that apply:**
- DocuForge: persistent sidebar nav (left side) for desktop — tab list 160px, content fills right
- CorpScale: destructive actions require explicit confirmation (CampusKit rule too) — never single-click delete
- CorpScale: form density — compact inputs, 20px field gap, labels 13px weight 500
- PulsePoint: danger zone elements use `var(--red)` border — never use red casually (reserved for destructive only)

**Framer Motion patterns:**
```js
// Tab content cross-dissolve
<AnimatePresence mode="wait">
  <motion.div key={activeTab}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }} />
</AnimatePresence>

// Desktop tab active indicator (vertical)
<motion.div layoutId="settings-tab-bar" transition={springSnappy} />

// Save success — checkmark scale pop next to button
animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
transition={{ duration: 0.35, ease: [0.34,1.56,0.64,1] }}

// Danger zone warning icon — wiggle on mount (attention-grabbing)
animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
transition={{ duration: 0.5, delay: 0.3 }}

// Import drop zone — border pulse on dragover
whileHover={{ borderColor: 'var(--blue)' }}
transition={{ duration: 0.15 }}
```

**Tasks:**

1. **Tab layout:** desktop — vertical tab list 160px left + content right · mobile — horizontal scrollable strip · `layoutId="settings-tab-bar"` spring indicator
2. **Tab content:** `AnimatePresence mode="wait"` cross-dissolve 200ms between all 9 tabs
3. **All inputs:** replace raw `<input>` with `Field` component
4. **All buttons:** `Button2` — destructive actions use `variant="danger"`
5. **All toggles:** `Toggle` component (has spring animation built in)
6. **Save feedback:** green checkmark `motion.div` scale pop next to save button
7. **Danger Zone tab:** `bg-red-soft/30 border border-red/20 rounded-card` · warning icon wiggle on mount · `Button2 variant="danger"` with `whileTap` · confirmation typed-input required before delete
8. **Import/Export tab:** export button shows spinner · import drop zone `whileHover` border → blue · `AnimatePresence` for upload progress
9. **Section headers within tabs:** `SectionHeader` component
10. **Replace every hardcoded colour**
11. **Verify:** `npm run build` passes.

---

## PROMPT 9 — Analytics Screen

**Goal:** 10 charts with brand palette, animations, consistent Card2 containers, date range selectors.

**Read first:**
```
BRAND_KIT.md (§8 Dashboard & Data Display Rules — chart rules, §3 Color Palette — Dashboard Chart Palette)
src/styles/tokens.css
src/screens/Analytics.jsx
src/components/Charts/   (all files)
```

**DesignMD rules that apply:**
- CorpScale: chart grid lines `var(--border)` — never darker
- CorpScale: chart tooltip: `bg-surface border border-border rounded-card p-[10px_14px]` — no drop shadow
- PulsePoint: smooth data transitions — no jarring number jumps
- LearnFlow: `isAnimationActive={true}` on all Recharts series

**Chart colour palette** (apply to all series in this order):
```js
const chartColors = {
  1: 'var(--blue)',    // Task completion
  2: 'var(--purple)',  // SR compliance
  3: 'var(--cyan)',    // Question accuracy
  4: 'var(--green)',   // Correct answers
  5: 'var(--amber)',   // Overdue / warning series
  6: '#EC4899',        // SR hit tracking (pink — only exception to token rule, no token exists)
}
```

**Framer Motion patterns:**
```js
// Each chart card — whileInView scroll entrance, stagger 80ms
{...scrollFadeUp}  // from master ref above
// Container stagger:
const chartGrid = { animate: { transition: { staggerChildren: 0.08 } } }

// Date range tab underline
<motion.div layoutId="analytics-date-underline" transition={springSnappy} />
```

**Tasks:**

1. **Layout:** 12-col grid · 24px gap · charts pair in 2-col desktop · 1-col mobile · `Card2` for each chart
2. **All Recharts series:** `isAnimationActive={true}` · `animationDuration={800}` · `animationEasing="ease-out"` on every `<Bar>` `<Line>` `<Area>` `<Pie>`
3. **Custom tooltip:** `bg-surface border border-border rounded-card` · `text-caption text-ink` · no shadow
4. **Legend:** below chart · 8px colour dots · `text-caption text-ink-4`
5. **Date range:** `Tabs2` — 7d / 30d / 90d / All — `layoutId="analytics-date-underline"`
6. **Chart card headers:** `SectionHeader` — chart title + date range selector
7. **Loading skeleton:** `LoadingState skeleton lines={4}` in each card while fetching
8. **Empty chart:** `EmptyState` — BarChart2 icon · "No data yet — start studying to see your analytics"
9. **Forgetting Curves** (`ForgettingCurves.jsx`): curve `var(--purple)` — connects to SR theming
10. **Study Heatmap** (`StudyHeatmap.jsx`): colour scale `var(--soft-blue)` (low) → `var(--blue)` (high)
11. **Chart card entrance:** `whileInView` stagger from master ref · `once: true`
12. **Replace every hardcoded colour**
13. **Verify:** `npm run build` passes.

---

## PROMPT 10 — Questions, Mistakes, Mock Exams, History

**Goal:** Apply brand tokens + motion to all four secondary screens in one session.

**Read first:**
```
BRAND_KIT.md (§6 Component Specs)
src/styles/tokens.css
src/screens/Questions.jsx
src/screens/Mistakes.jsx
src/screens/MockExams.jsx
src/screens/History.jsx
```

**DesignMD rules that apply (all four):**
- LearnFlow: list items stagger entry — makes dense lists feel alive
- CorpScale: data tables — sticky header, 48px row height, hover `bg-bg`
- PulsePoint: status colours consistent — green=done, amber=warning, red=critical only
- CampusKit: deadline/date always visible, never buried

**Apply to ALL four screens:**
```
Replace raw divs    → Card2
Replace raw buttons → Button2
Replace raw badges  → Badge2
Replace raw inputs  → Field
Replace hex colours → var(--token) or Tailwind token class
Add whileInView stagger (listContainer / listItem from master ref) to all grids/lists
Add AnimatePresence spring to all modals
Add whileTap={{ scale: 0.96 }} to all interactive elements
```

**Questions screen:**
```js
// Form submit feedback — input row green flash on success
animate={{ backgroundColor: ['var(--surface)', 'var(--green-soft)', 'var(--surface)'] }}
transition={{ duration: 0.5 }}

// Accuracy trend: Recharts Line with var(--blue) stroke, isAnimationActive, custom tooltip
// Subject filter: Badge2 filter chips, whileTap spring, selected chip scale 1.05
```

**Mistakes screen:**
```js
// 9-type filter chips: whileTap spring, selected: scale 1.05 + bg-blue-soft border-blue
// Mistake cards: Card2 hoverable, stagger entry
// Rules sidebar: Card2 bg-blue-soft (info tint from DocuForge)
```

**Mock Exams screen:**
```js
// Score: Inter 800 tabular-nums, large display
// Score trend: Recharts Line var(--blue), isAnimationActive
// Threshold lines: ReferenceLine stroke="var(--amber)" strokeDasharray="4 4" (amber = 60% pass)
//                  ReferenceLine stroke="var(--green)"  (green = 80% comfortable)
// Subject breakdown table: brand table rules (sticky header, hover bg-bg)
```

**History screen:**
```js
// Calendar day cells:
whileHover={{ scale: 1.08 }}
transition={{ duration: 0.15, ease: [0.34,1.56,0.64,1] }}

// Day status colours:
// complete: var(--green)  · partial: var(--amber)
// missed:   var(--red)    · rest:    var(--ink-5)

// Day detail panel — slide in from right (desktop)
initial={{ x: 48, opacity: 0 }}
animate={{ x: 0,  opacity: 1 }}
transition={{ duration: 0.3, ease: [0,0,0.2,1] }}

// Mobile bottom sheet — slide up
initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
transition={{ duration: 0.35, ease: [0,0,0.2,1] }}
```

**Verify:** `npm run build` passes.

---

## PROMPT 11 — Onboarding Flow

**Goal:** 5-step wizard — step transitions, card selectors, animated progress indicator, save feedback.

**Read first:**
```
BRAND_KIT.md (§7 Animation System — Component Entry & Tab Switching)
src/styles/tokens.css
src/screens/Onboarding/OnboardingFlow.jsx
src/screens/Onboarding/QuickTaskBuilder.jsx
src/screens/Onboarding/PlanPreview.jsx
```

**DesignMD rules that apply:**
- DocuForge: card selectors — selected state `border-2 border-blue bg-blue-soft`
- LearnFlow: progress always visible — animated bar across top · step indicators with completed=green
- LearnFlow: next step always clear — "Continue" is the dominant action at every step
- CampusKit: plan save is a serious action — show a real loading state, not a spinner blink

**Framer Motion patterns:**
```js
// Step transition — next slides in from right, back exits to left
const stepVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0,0,0.2,1] } },
  exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48, transition: { duration: 0.2 } }),
}
// Use: const [dir, setDir] = useState(1) — set +1 for next, -1 for back
// <AnimatePresence mode="wait" custom={dir}>
//   <motion.div key={step} variants={stepVariants} custom={dir} />

// Step indicator — completed state spring
// completed circle: animate={{ scale: [0.8, 1.1, 1], backgroundColor: 'var(--green)' }}
// transition: { duration: 0.35, ease: [0.34,1.56,0.64,1] }

// Progress bar
initial={{ scaleX: 0, originX: 0 }}
animate={{ scaleX: step / totalSteps }}
transition={{ duration: 0.4, ease: [0,0,0.2,1] }}

// Card selectors (exam type, schedule style)
whileTap={{ scale: 0.98 }}
// selected: border-2 border-blue bg-blue-soft (CSS — Framer not needed)

// Subject cards in QuickTaskBuilder — stagger entry 30ms
staggerChildren: 0.03

// Save Plan button spinner + success
// On save: Button2 shows LoadingState spinner
// On success: full card green flash → navigate to /
animate={{ backgroundColor: ['var(--bg)', 'var(--green-soft)', 'var(--bg)'] }}
transition={{ duration: 0.8 }}

// Back button arrow nudge
whileHover={{ x: -3 }}
transition={{ duration: 0.15 }}
```

**Tasks:**

1. **Shell bar:** favicon.svg + wordmark · `Bar` component progress bar animated width · step number `text-ink-4 text-sm`
2. **Step transitions:** `AnimatePresence mode="wait"` with directional `custom` prop · next=slide right, back=slide left
3. **Step indicators:** numbered circles · active=`bg-blue text-white` · completed=`bg-green text-white` + checkmark · upcoming=`bg-border text-ink-5` · spring transition between states
4. **Step 1 (Choose Path):** `Card2 hoverable` for Quick Task Builder · `whileTap` spring · selected: `border-2 border-blue bg-blue-soft`
5. **Step 2 (Exam + Dates):** `Field` for all inputs · exam type = card selectors with `whileTap` + selected state
6. **Step 3 (Schedule Style):** 3 option cards (Aggressive/Balanced/Relaxed) · same card selector pattern
7. **Step 4 (Quick Task Builder):** subject cards stagger entry · checkbox `whileTap scale(1.2)` · difficulty buttons `whileTap` + semantic selected colours
8. **Step 5 (Plan Preview):** table rows stagger 20ms · `Badge2` phase colours · "Save Plan" → `Button2 primary` with spinner → success flash → navigate
9. **Nav buttons:** `Button2 primary` (Next) + `Button2 ghost` (Back) · back arrow `whileHover x:-3`
10. **Verify:** `npm run build` passes.

---

## PROMPT 12 — Toast Notification System

**Goal:** Animated toasts with auto-dismiss progress bar, 4 variants, stacked queue.

**Read first:**
```
BRAND_KIT.md (§7 Animation System — Toast spec)
src/styles/tokens.css
src/contexts/ToastContext.jsx
src/components/ToastContainer.jsx
```

**DesignMD rules that apply:**
- PulsePoint: toast colours match status system exactly — no custom colours
- DocuForge: info toast = `var(--soft-blue)` bg, `var(--blue)` border
- LearnFlow: success toast celebrates completion (task done, plan saved, SR hit) — feels earned

**Toast variant specs:**
```js
const toastVariants = {
  success: { bg: 'var(--green-soft)',  text: 'var(--green-ink)',  border: 'var(--green)',  Icon: CheckCircle  },
  error:   { bg: 'var(--red-soft)',    text: 'var(--red-ink)',    border: 'var(--red)',    Icon: XCircle      },
  info:    { bg: 'var(--soft-blue)',   text: 'var(--blue-ink)',   border: 'var(--blue)',   Icon: Info         },
  warning: { bg: 'var(--amber-soft)',  text: 'var(--amber-ink)',  border: 'var(--amber)',  Icon: AlertTriangle},
}
```

**Framer Motion patterns:**
```js
// Toast enter/exit (from master ref above: toast = {initial,animate,exit})

// Progress bar auto-dismiss (4s)
initial={{ scaleX: 1, originX: 0 }}
animate={{ scaleX: 0 }}
transition={{ duration: 4, ease: 'linear' }}

// Stack — offset older toasts slightly (CSS transform, not Framer)
// toast n-1: scale(0.95) translateY(-6px) opacity(0.85)
// toast n-2: scale(0.90) translateY(-12px) opacity(0.70)
```

**Tasks:**

1. **Toast component:** `motion.div` with toast animation spec · left border `4px solid var(--color)` · icon + message + dismiss X
2. **Progress bar:** `motion.div` linear 4s · at bottom of toast · same colour as border
3. **4 variants:** success/error/info/warning with correct tokens above
4. **Container:** `fixed top-4 right-4 z-[9999] flex flex-col gap-2.5` · `AnimatePresence` · max 4 visible
5. **Stack:** CSS scale+translateY for stacked appearance on 2nd+ toast
6. **Dismiss:** X button `whileHover={{ scale: 1.1 }}` · removes immediately via `AnimatePresence`
7. **Wire showToast() calls:** task complete · SR hit recorded · plan saved · settings saved · export success
8. **Verify:** `npm run build` passes.

---

## PROMPT 13 — Admin Panel

**Goal:** Brand tokens, table polish, delete confirmation, loading skeletons.

**Read first:**
```
BRAND_KIT.md (§8 Dashboard & Data Display Rules — Data Tables)
src/styles/tokens.css
src/screens/Admin/AdminPanel.jsx
src/components/ui/index.js
```

**DesignMD rules that apply:**
- CorpScale: data tables — sticky header `bg-bg` · 48px rows · hover `bg-bg` · `border-bottom border-border-soft` · bulk actions visible
- CampusKit: destructive actions (delete user) require explicit confirmation — never single-click
- CorpScale: admin tools feel instant — keep all animations ≤ 200ms

**Framer Motion patterns:**
```js
// Table rows — stagger mount 20ms
staggerChildren: 0.02

// Delete confirmation modal — spring panel (same as master modal ref)

// Loading — 5 skeleton rows
// <div className="skeleton h-12 w-full rounded-card" />  (uses .skeleton CSS class from Prompt 1)
```

**Tasks:**

1. **Page header:** `font-bold text-h1 text-ink` + subtitle `text-ink-4 text-sm` · user count `Badge2 variant="blue"`
2. **Table:** sticky header `bg-bg` · `text-overline text-ink-5 uppercase` column labels · 48px rows · hover `bg-bg` · `border-b border-border-soft` · stagger entry 20ms
3. **Loading:** 5 `.skeleton` rows while fetching
4. **Empty:** `EmptyState` component
5. **Delete button:** `Button2 variant="danger" size="sm"` · opens spring confirmation modal — "Delete [email]?" + `Button2 danger` confirm + `Button2 ghost` cancel
6. **Replace every hardcoded colour**
7. **Verify:** `npm run build` passes.

---

## PROMPT 14 — Final Polish + Reduced Motion Audit

**Goal:** Eliminate any remaining hardcoded colours, verify reduced motion everywhere, final production build.

**Read first:**
```
BRAND_KIT.md (§7 Animation System — Reduced Motion, §12 Do's and Don'ts)
src/styles/tokens.css
src/styles/globals.css
```

**Tasks:**

1. **Colour audit** — grep and fix all remaining hardcoded hex:
   ```bash
   # Find hardcoded hex in Tailwind arbitrary classes
   grep -rn 'text-\[#\|bg-\[#\|border-\[#\|fill-\[#\|stroke-\[#' src/ --include="*.jsx"

   # Find hardcoded hex in inline styles
   grep -rn "'#[0-9A-Fa-f]" src/ --include="*.jsx"
   grep -rn '"#[0-9A-Fa-f]' src/ --include="*.jsx"
   ```
   Replace every hit with the correct `var(--token)` or Tailwind token class.
   Exception: the chart pink `#EC4899` has no token — leave as is.

2. **Reduced motion hook** — create `src/hooks/useReducedMotion.js`:
   ```js
   export { useReducedMotion } from 'framer-motion'
   // Usage: const reduced = useReducedMotion()
   // When true: pass initial={false} or collapse initial/animate to same values
   ```

3. **Verify globals.css** has the `@media (prefers-reduced-motion: reduce)` block from Prompt 1.

4. **Mobile safe area:** verify all screens have `pb-[72px] md:pb-0` for bottom nav clearance.

5. **Animation length audit:**
   - App UI: all durations ≤ 200ms (CorpScale rule) — except modals (250ms) and progress ring draw (1200ms which is ambient)
   - Landing: up to 450ms permitted for scroll entrances (more expressive context)

6. **Copy audit** (CampusKit + BRAND_KIT.md §10 Voice & Tone):
   ```bash
   grep -rn '!' src/ --include="*.jsx" | grep -v '//' | grep -v '!== \|!== \|!props\|!user\|!loading\|! '
   ```
   Remove any `!` from UI copy strings.

7. **Final build:** `npm run build` — zero errors, zero warnings.

8. **Deploy:** `npx vercel --prod` — confirm https://studyrise.app loads.

---

## Quick Reference — Brand Tokens

```
Primary blue:    var(--blue)      #2563EB   bg-blue / text-blue
Navy:            var(--navy)      #0D1B3E   bg-navy / text-ink
Violet:          var(--purple)    #7C3AED   bg-purple / text-purple
Cyan:            var(--cyan)      #06B6D4   text-cyan
Page bg:         var(--bg)        #F8FAFC   bg-bg
Card bg:         var(--surface)   #FFFFFF   bg-surface
Border:          var(--border)    #E2E8F0   border-border
Input border:    var(--border-2)  #CBD5E1   border-border-2 (or border-[var(--border-2)])
Text primary:    var(--ink)       #0D1B3E   text-ink
Text secondary:  var(--ink-4)     #64748B   text-ink-4
Text muted:      var(--ink-5)     #94A3B8   text-ink-5
Success:         var(--green)     #22C55E   text-green / bg-green
Warning:         var(--amber)     #F59E0B   text-amber / bg-amber
Critical:        var(--red)       #E63946   text-red / bg-red
Soft blue:       var(--soft-blue) #EEF2FF   bg-blue-soft / bg-[var(--soft-blue)]
Blue hover:      var(--blue-ink)  #1D4ED8   hover:bg-blue-ink
Text on dark:    var(--ink-inv)   #FFFFFF   (use on navy bg only)
```

## Quick Reference — Framer Motion Patterns

```js
// Card hover lift
whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
transition={{ duration: 0.2, ease: [0,0,0.2,1] }}

// Button press
whileTap={{ scale: 0.96 }}
transition={{ duration: 0.1, ease: [0.34,1.56,0.64,1] }}

// Stagger list
const list = { animate: { transition: { staggerChildren: 0.04 } } }
const item = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0,0,0.2,1] } } }

// Modal spring (backdrop + panel)
// backdrop: initial opacity:0 → animate opacity:1, duration 0.2
// panel: initial {opacity:0, scale:0.95, y:16} → animate {opacity:1, scale:1, y:0}, duration 0.25 spring ease

// layoutId (tabs, nav, dots — Framer handles the animation automatically)
<motion.div layoutId="unique-id" transition={{ type:'spring', stiffness:400, damping:35 }} />

// Success flash
animate={{ backgroundColor: ['var(--surface)', 'var(--green-soft)', 'var(--surface)'] }}
transition={{ duration: 0.6 }}

// Error shake
animate={{ x: [0, -8, 8, -6, 6, -4, 4, 0] }}
transition={{ duration: 0.5 }}

// whileInView scroll entrance
initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.45, ease:[0,0,0.2,1] }}

// Reduced motion guard
const reduced = useReducedMotion()
const anim = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
```

---

## Session Order Recommendation

```
1  → Globals (foundation — do first)
3  → Auth (high traffic, users see it first)
4  → Dashboard (most visited app screen)
5  → Today (daily use — highest impact)
6  → Plan
7  → SR Module
8  → Settings
9  → Analytics
10 → Questions + Mistakes + Mocks + History (batch)
11 → Onboarding
12 → Toast system (can be done any time after Prompt 3)
13 → Admin (low priority, single-user)
14 → Final polish (always last)
```

---

_Rewritten: 2026-06-02_
_Sources: BRAND_KIT.md v2.1 + live DesignMD kits (DocuForge · CorpScale · PulsePoint · LearnFlow · CampusKit)_
_Framer Motion: installed and ready_
_Landing page: complete — start from Prompt 1 (globals) or jump to any screen_


---
<!-- docnav-related -->
### Related docs
- [StudyRise — Framer Motion Animation Plan](ANIMATION_PLAN.md)
- [StudyRise — Brand Kit](BRAND_KIT.md)
- [Deployment Architecture → moved (superseded)](Deployment%20Architecture.md)
- [StudyRise — Full Feature Specification](FEATURES.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
