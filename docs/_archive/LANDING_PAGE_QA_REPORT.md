# Landing Page QA Report — StudyRise

**Date:** 2026-06-19  
**File audited:** `public/landing.html`  
**Auditor:** Claude Code  

---

## Summary

Full button and link audit of the redesigned v2 landing page. **10 broken links fixed**, 1 in-page anchor corrected (footer bottom nav). All auth CTAs now use the correct `/?auth=` query-param pattern that the React SPA handles. "See it in action" / "See the product" buttons now scroll to the `#features` section instead of the product showcase.

---

## Fixed Links

| Location | Element | Was | Fixed to | Status |
|---|---|---|---|---|
| Desktop nav | Log In button | `/login` | `/?auth=login` | ✅ Fixed |
| Mobile menu | Log in link | `/login` | `/?auth=login` | ✅ Fixed |
| Mobile menu | Get Started Free → | `/register` | `/?auth=register` | ✅ Fixed |
| Mobile menu | Features | `/features` | `#features` | ✅ Fixed |
| Desktop nav | Features | `/features` | `#features` | ✅ Fixed |
| Hero CTA | "Start free — build my plan" | `/register` | `/?auth=register` | ✅ Fixed |
| Hero CTA | "See it in action" | `#showcase` | `#features` | ✅ Fixed |
| Final CTA section | "Get started free" | `/register` | `/?auth=register` | ✅ Fixed |
| Final CTA section | "See the product" | `#showcase` | `#features` | ✅ Fixed |
| Footer — Company | "Get started" | `/register` | `/?auth=register` | ✅ Fixed |
| Footer — Account | "Log in" | `/login` | `/?auth=login` | ✅ Fixed |
| Footer — Account | "Sign up" | `/register` | `/?auth=register` | ✅ Fixed |
| Footer bottom nav | Features | `/features` | `#features` | ✅ Fixed |

---

## All Buttons & Links — Full Inventory

### Navigation (Desktop)

| Element | Target | Type | Status |
|---|---|---|---|
| StudyRise logo / brand | `/` | Internal | ✅ Working |
| Features | `#features` | In-page anchor | ✅ Working |
| Pricing | `/pricing` | Future page | ⚠️ Placeholder |
| Study Planner | `/study-planner` | Future page | ⚠️ Placeholder |
| Blog | `/blog` | Future page | ⚠️ Placeholder |
| Log In | `/?auth=login` | Auth CTA | ✅ Working |
| Hamburger menu (mobile toggle) | JS toggle | UI action | ✅ Working |

### Navigation (Mobile Menu)

| Element | Target | Type | Status |
|---|---|---|---|
| Features | `#features` | In-page anchor | ✅ Working |
| Pricing | `/pricing` | Future page | ⚠️ Placeholder |
| Study Planner | `/study-planner` | Future page | ⚠️ Placeholder |
| Blog | `/blog` | Future page | ⚠️ Placeholder |
| Log in | `/?auth=login` | Auth CTA | ✅ Working |
| Get Started Free → | `/?auth=register` | Auth CTA | ✅ Working |

### Hero Section

| Element | Target | Type | Status |
|---|---|---|---|
| "Start free — build my plan" (primary CTA) | `/?auth=register` | Auth CTA | ✅ Working |
| "See it in action" (secondary CTA) | `#features` | In-page anchor | ✅ Working |
| University mode toggle | JS (in-page mock) | UI action | ✅ Working (JS-only) |
| Exam mode toggle | JS (in-page mock) | UI action | ✅ Working (JS-only) |
| Medical mode toggle | JS (in-page mock) | UI action | ✅ Working (JS-only) |

### Showcase Section (Product Demo Tabs)

| Element | Target | Type | Status |
|---|---|---|---|
| Today tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| Plan tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| SR Module tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| Questions tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| Mock Exams tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| Analytics tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| Mistakes tab button | JS (screen switch) | UI action | ✅ Working (JS-only) |
| "✓ Done" button in mock | JS (in-page demo) | UI action | ✅ Intentional demo element |
| "Log Day" button in mock | JS (in-page demo) | UI action | ✅ Intentional demo element |
| "▶ Start" timer button in mock | JS (in-page demo) | UI action | ✅ Intentional demo element |

### Features Section

| Element | Target | Type | Status |
|---|---|---|---|
| Feature cards (6 cards) | No action (informational) | — | ✅ Intentional display-only |

### Social Proof / Testimonials

| Element | Target | Type | Status |
|---|---|---|---|
| All testimonial cards | No action (informational) | — | ✅ Intentional display-only |

### Pricing Section

| Element | Target | Type | Status |
|---|---|---|---|
| "Start for free" (Free plan CTA) | `/?auth=register` | Auth CTA | ✅ Working |
| "Start building" (Pro plan CTA) | `/?auth=register` | Auth CTA | ✅ Working |

### FAQ Section

| Element | Target | Type | Status |
|---|---|---|---|
| All FAQ items (`<details>`/`<summary>`) | Native expand/collapse | HTML native | ✅ Working (no JS needed) |

### Final CTA Section

| Element | Target | Type | Status |
|---|---|---|---|
| "Get started free" | `/?auth=register` | Auth CTA | ✅ Working |
| "See the product" | `#features` | In-page anchor | ✅ Working |

### Footer

| Element | Target | Type | Status |
|---|---|---|---|
| StudyRise logo | `/` | Internal | ✅ Working |
| **Product section** | | | |
| Today | `#showcase` | In-page anchor | ✅ Working |
| SR Module | `#showcase` | In-page anchor | ✅ Working |
| Questions | `#showcase` | In-page anchor | ✅ Working |
| Mock Exams | `#showcase` | In-page anchor | ✅ Working |
| Analytics | `#showcase` | In-page anchor | ✅ Working |
| **Company section** | | | |
| FAQ | `#faq` | In-page anchor | ✅ Working |
| How it works | `#how` | In-page anchor | ✅ Working |
| Features | `#features` | In-page anchor | ✅ Working |
| Get started | `/?auth=register` | Auth CTA | ✅ Working |
| **Account section** | | | |
| Log in | `/?auth=login` | Auth CTA | ✅ Working |
| Sign up | `/?auth=register` | Auth CTA | ✅ Working |
| **Social links** | | | |
| Facebook | `#` | Placeholder | ⚠️ No account yet |
| Instagram | `#` | Placeholder | ⚠️ No account yet |
| YouTube | `#` | Placeholder | ⚠️ No account yet |
| LinkedIn | `#` (`.soon` tooltip) | Placeholder | ⚠️ Marked "Coming soon" |
| X / Twitter | `#` (`.soon` tooltip) | Placeholder | ⚠️ Marked "Coming soon" |
| **Footer bottom nav** | | | |
| Features | `#features` | In-page anchor | ✅ Working |
| Pricing | `/pricing` | Future page | ⚠️ Placeholder |
| Study Planner | `/study-planner` | Future page | ⚠️ Placeholder |
| Blog | `/blog` | Future page | ⚠️ Placeholder |
| Privacy | `/privacy` | React route | ✅ Working |
| Terms & Conditions | `/terms` | React route | ✅ Working |

---

## Known Placeholders (Not Bugs)

These links intentionally point to pages that don't exist yet. They will hit the React catch-all and redirect to `/`. They should be built out in Phase 3.

| Link | Intended destination |
|---|---|
| `/pricing` | Dedicated pricing page |
| `/study-planner` | Study planner marketing page |
| `/blog` | Blog index |
| Social: Facebook | Facebook page (no account yet) |
| Social: Instagram | Instagram profile (no account yet) |
| Social: YouTube | YouTube channel (no account yet) |

---

## Auth Button Pattern

All auth CTAs on the landing page now use the correct pattern:

- **Log in:** `href="/?auth=login"` — loads the React SPA at `/`, which detects `?auth=login` via `Auth.jsx` and shows the login modal
- **Register / Get started:** `href="/?auth=register"` — loads the React SPA at `/`, which detects `?auth=register` and shows the registration modal

The inline redirect script in `<head>` of `landing.html` intercepts already-logged-in users before the page renders and sends them to `/settings`.

---

## "See it in action" / "See the product" Decision

Both secondary CTA buttons previously pointed to `#showcase` (the interactive product demo section). Per user request, they now point to `#features` (the Features section further down the page). This gives visitors a marketing-first view of features before showing the live demo.

- **Hero:** "See it in action" → `#features`  
- **Final CTA:** "See the product" → `#features`  

The `#showcase` anchor still exists and is correctly used by the footer Product section links (Today, SR Module, etc.).

---

## Verdict

**All interactive buttons and auth links are functional.** Remaining `⚠️ Placeholder` items are intentional stubs for future marketing pages and social accounts — not bugs.
