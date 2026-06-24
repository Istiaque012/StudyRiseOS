---
title: Motion & Animation
type: strategy
sources: [raw/brain-v1/MOTION_GUIDE.md, raw/brain-v1/BLOG_ANIMATIONS_GUIDE.md, raw/brain-v1/ANIMATION_PLAN.md]
created: 2026-06-24
updated: 2026-06-24
---

# Motion & Animation

Two separate animation systems for two contexts.

## Static HTML Pages (SEO Surface) — CSS Only
No Framer Motion on static pages (SEO constraint). Pure CSS animations:
- Ring fill SVG animation
- Bar grow keyframes with stagger
- Floating badge infinite loop
- Card lift hover
- Accent wipe (scaleX)
- Soft hover states
- Scroll reveal via IntersectionObserver + class toggle
- `prefers-reduced-motion` kill-switch on everything

Motion tokens mirror `tokens.css` from [[Brand Visual System]].

## React App — Framer Motion
Room-by-room rollout across all app screens. Animation registry in `src/lib/animations.js`.
- Per-screen animation tables with status (done/inline/none)
- Variants: slideFromTop, listItem, pageTransition
- `useReducedMotion` baseline everywhere
- CorpScale 200ms animation ceiling

## Key Rule
Static pages and app pages use completely different animation systems. Never mix them.
