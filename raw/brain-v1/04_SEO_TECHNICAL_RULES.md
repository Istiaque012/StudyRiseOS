# 04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The technical checklist every HTML file must satisfy before it's delivered. No narrative — just rules. If an output breaks a rule here, it's not finished. The full copy-paste HTML template lives in `06_PRODUCTION_PLAYBOOK.md`; this file is the spec that template implements.

---

## Rule 0 — The Google Analytics Snippet Is Mandatory

Every single HTML file includes this exact snippet in the `<head>`, before the closing `</head>`. Never omit, never alter the ID.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R38JK89PP5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-R38JK89PP5');
</script>
```

---

## Rule 0.5 — Canonical Domain: Always `www.studyrise.app`

**`https://www.studyrise.app/` is the canonical host.** Verified 2026-06-20: `https://studyrise.app` issues a permanent **308 redirect** to `https://www.studyrise.app/`. Social scrapers (OG preview fetchers), schema validators, and search engine crawlers all hit this redirect on the non-www host — wasting a round-trip and degrading signal integrity.

**Every absolute URL in every HTML file must use `https://www.studyrise.app/...`** — no exceptions:

| Field | Correct value |
|---|---|
| `<link rel="canonical">` | `https://www.studyrise.app/blog/{slug}` |
| `og:url` | `https://www.studyrise.app/blog/{slug}` |
| `og:image` | `https://www.studyrise.app/blog/images/{slug}-og.webp` |
| `twitter:image` | `https://www.studyrise.app/blog/images/{slug}-og.webp` |
| JSON-LD `"url"` / `"@id"` / `mainEntityOfPage` | `https://www.studyrise.app/...` |
| JSON-LD `publisher.logo.url` | `https://www.studyrise.app/logo.svg` |
| JSON-LD BreadcrumbList item values | `https://www.studyrise.app/`, `https://www.studyrise.app/blog`, etc. |
| In-body CTAs / sign-up links | `https://www.studyrise.app/?auth=register` for sign-up CTAs; `https://www.studyrise.app/?auth=login` for returning-user copy |
| Sitemap `<loc>` entries | `https://www.studyrise.app/blog/{slug}` |

Bare `https://studyrise.app/...` URLs are **never** used in any of the above fields. If a template, knowledge file, or prior example shows the non-www form, substitute `www` before delivering. Sign-up CTAs must link to `https://www.studyrise.app/?auth=register`; returning-user copy must link to `https://www.studyrise.app/?auth=login`.

**Homepage JSON-LD:** `landing.html` ships both a `WebSite` schema block and an `Organization` schema block. These are maintained structural assets — verify both schema blocks survive any future edit to `landing.html`.

---

## Rule 0.6 — Auth Route Contract (Option A)

Rebuilt 2026-06-21. Keep the Rule 0.5 table values (`?auth=register` / `?auth=login`) exactly as they are; this rule explains the mechanism behind them.

**Auth contract (Option A — no redirect, param not persisted):**

- Sign-up CTAs link to `https://www.studyrise.app/?auth=register`
- Returning-user copy links to `https://www.studyrise.app/?auth=login` (legacy `?auth=signup` is accepted and treated as register).
- Mechanism: a `vercel.json` rewrite serves `/app.html` (the React app) when an `?auth=*` query param is present. This is a 200 rewrite, NOT a 3xx redirect, and is ordered BEFORE the `/` → `/landing.html` rewrite. `LandingPageStatic.jsx` detects `?auth=*` and lazy-loads `<LandingPage />`, which opens the auth modal and immediately calls `history.replaceState({}, '', '/')` so `?auth=*` never persists in the address bar or browser history.
- SEO effect: crawlers never add `?auth=*`, so the indexable homepage at `/` is still served from static `landing.html`. There is no redirect chain, and `?auth=*` never becomes an indexable URL. The homepage canonical is `https://www.studyrise.app/`, so any `?auth=` variant consolidates to the clean homepage.
- Never link CTAs to `/login` or `/register` directly. Auth routes never appear in `sitemap.xml`.

---

## `<head>` Requirements

| Tag | Rule |
|---|---|
| `<title>` | Under **60 characters**. Primary keyword near the front. Ends with ` — StudyRise` only if it fits the limit. |
| `<meta name="description">` | **140–160 characters**, unique per page, benefit + differentiator, written to earn the click. |
| `<meta name="robots">` | `index, follow, max-image-preview:large` on all articles and marketing pages. Required — without `max-image-preview:large` Google defaults to small thumbnails in SERPs. |
| `<link rel="canonical">` | Exactly **one**, self-referencing, absolute URL: `https://www.studyrise.app/blog/{slug}`. Missing or duplicate canonicals quietly kill rankings. |
| `<meta name="author">` | `StudyRise` (unless told otherwise). |
| `<link rel="icon">` | `<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">` — required on every page |
| `<meta charset>` + `<meta viewport>` | Always present. Viewport: `width=device-width, initial-scale=1.0`. |
| `<html lang>` | `en` for English content. If a Bengali piece is ever produced, `bn`. |
| Shared shell | Every page links `studyrise-core.css` + `studyrise-chrome.js` and reproduces the nav/footer partials verbatim (no `<!--#include ...-->` placeholders). Full spec: `10_SITE_SHELL.md`. |

---

## Open Graph + Twitter (social/share preview)

Required on every article:

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="StudyRise">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.studyrise.app/blog/{slug}">
<meta property="og:image" content="https://www.studyrise.app/blog/images/{slug}-og.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://www.studyrise.app/blog/images/{slug}-og.webp">
```

The `og:image` path is a **forward reference** — the actual OG image is produced from the Canva/ChatGPT brief (see `07_IMAGE_PROTOCOL.md`). Use the predicted filename so the tag is correct once Istiaque exports the image to that path.

---

## Structured Data (JSON-LD) — Required Per Page Type

All schema as `<script type="application/ld+json">` in the `<head>`. Validate mentally against schema.org; aim for **zero errors** in Google's Rich Results Test.

| Page type | Required schema |
|---|---|
| Blog article | `BlogPosting` **+** `BreadcrumbList` **+** `FAQPage` (when the article has a genuine Q&A block — it almost always should) |
| Comparison / "best/top-N" / listicle page | `ItemList` **stacked with** `BlogPosting` **+** `FAQPage` in a single JSON-LD block. `ItemList` is for genuine ranked-list / comparison pages **only** — never stack it on a standard article. |
| Homepage | `Organization` + `WebSite` |
| `/study-planner` & segment landing pages | `SoftwareApplication` (+ `FAQPage` if Q&A present) |
| `/features`, `/pricing` | `WebPage` (+ `FAQPage` on pricing if present) |

**`BlogPosting` must include:** `headline`, `description`, `image`, `author` (`{"@type":"Organization","name":"StudyRise"}`), `publisher` (Organization with logo), `datePublished`, `dateModified`, `mainEntityOfPage`.

**`FAQPage`** is **required whenever a genuine on-page Q&A block exists**, and it mirrors the on-page FAQ exactly — same questions, same answers. Never put questions in schema that aren't visibly on the page.

**`FAQPage` is an AI-citation (GEO) lever, not a SERP-display lever.** FAQPage no longer produces a Google rich result (retired 2026-05-07). Keep it anyway: it remains a clean, machine-readable signal that AI search engines and Google's parsers use to extract Q&A.

**FAQ-answer content rule:** Every FAQ answer LEADS with the direct answer in roughly 40 words or fewer (conclusion first), then may add one or two sentences of detail. AI engines cite a tight 40-word capsule and skip a 200-word essay.

---

## Heading Structure

- **Exactly one `<h1>`** per page, containing the primary keyword.
- H2/H3 nest logically. **No skipped levels** (never H2 → H4).
- H2s should map to real sub-questions and "People Also Ask" entries where possible — this serves both readers and AI extraction.

---

## Comparison Pages

Comparison articles (e.g. "StudyRise vs Notion", "best free study planners 2026", any "best/top-N" listicle) carry an extra rule:

- **A summary comparison table must appear within the first screen of content** — above the fold, before the reader (or an AI engine) has to scroll. The detailed prose comparison follows below it. AI engines and skimming readers both lift the table first; burying it loses the citation and the click.
- These pages also require `ItemList` schema stacked with `BlogPosting` + `FAQPage` (see Structured Data above).

---

## Freshness Signal — Visible "Last updated" Line

- **Every article shows a visible `Last updated: {Month YYYY}` line near the H1** (in the article meta row).
- **Its value must equal the JSON-LD `dateModified`.** A visible freshness date that contradicts the schema is worse than none — keep them in lockstep. When you refresh a page, bump `dateModified`, the sitemap `lastmod`, and this visible line together.

---

## Internal Linking Rules

- **Every article links to at least 2–3 other StudyRise pages** (relevant blog articles or the matching segment/feature page). Descriptive anchor text — never "click here."
- **Every article links up to a conversion surface** (the relevant segment landing page or `https://www.studyrise.app/?auth=register` sign-up) at least once, naturally.
- Build topic clusters: articles in the same segment link to each other and to their segment landing page. The landing page links down to its best articles.
- No orphan pages. If you create an article, note in `05_CONTENT_PIPELINE.md` which existing pages should add a link *to* it.
- **Never use `target="_top"` on internal links.** This was a legacy workaround from when
  `landing.html` was rendered inside a React iframe. The iframe is gone. All internal navigation
  links should be plain `<a href="/page">` with no `target` attribute.

---

## External Linking Rules

- Link out to **authoritative primary sources** (official exam bodies — AMC, GMC/PLAB, USMLE, BMDC; peer-reviewed research; reputable institutions). Outbound links to trusted sources signal credibility and support E-E-A-T.
- External links open behaviour: standard. Use `rel="noopener"` if `target="_blank"`.
- Never link to competitors' commercial pages or low-quality sources. Never invent a source or a URL — if you can't verify it exists, don't cite it.

---

## Image Technical Rules

(Creative/sourcing rules are in `07_IMAGE_PROTOCOL.md`; these are the technical musts.)

- Every `<img>` has **descriptive `alt` text** (real description, keyword only where natural — never stuffing).
- Every `<img>` has explicit **`width` and `height`** attributes — this prevents layout shift (CLS).
- Below-the-fold images use **`loading="lazy"`**.
- Prefer **WebP**. For embedded Unsplash/Pexels images, use their URL with sizing params; note in the delivery that converting to local WebP later improves performance.
- OG image: 1200×630. Hero image: 1200×675 (16:9) target.

---

## Core Web Vitals Targets (mobile)

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

Levers you control in the HTML: sized images, lazy-loading below the fold, no heavy app bundle on marketing pages, system/Inter font with `font-display: swap`, minimal inline CSS, no render-blocking junk.

---

## Mobile-First

Google indexes the mobile version. Every page must work at **375px width**: no horizontal scroll, tap targets ≥ 44px, readable without zoom. The 375px floor is a hard StudyRise standard.

---

## Sitemap & Robots (delivery-time reminders)

- A new article means `sitemap.xml` gets a new `<url>` entry with a real `lastmod` date, and ideally an `<image:image>` entry. (Handled in `08_DEPLOYMENT_GUIDE.md`.)
- `sitemap.xml` lists **only** indexable static pages — never app routes.
- `robots.txt` keeps app routes disallowed, marketing/blog allowed, and a `Sitemap:` line present.

---

## The Pre-Delivery Technical Gate

Do not deliver an HTML file unless **all** of these are true:

- [ ] GA snippet present with correct ID
- [ ] Title < 60 chars, meta description 140–160 chars, both unique
- [ ] Exactly one self-referencing canonical
- [ ] OG + Twitter tags complete with correct predicted image path
- [ ] JSON-LD: BlogPosting + BreadcrumbList + FAQPage (FAQ matches on-page)
- [ ] Exactly one H1 with primary keyword; clean H2/H3 nesting
- [ ] 2–3 internal links + 1 conversion link, descriptive anchors
- [ ] ≥1 authoritative external link, all verified real
- [ ] Every image has alt + width + height; below-fold lazy-loaded
- [ ] Works at 375px; no obvious CWV killers
- [ ] No invented facts, statistics, or sources
- [ ] Links `/assets/studyrise-core.css` (head) and `/assets/studyrise-chrome.js` (before </body>)
- [ ] Nav and footer are copied verbatim from templates/partials/nav.html and footer.html — not hand-written or reconstructed. No `<!--#include ...-->` placeholders.
- [ ] Page CSS is one small `<style id="page-styles">` in the <head> — none in the <body>
- [ ] No re-declared tokens/fonts: no page `:root{ --… }`, no hard-coded font-family; uses var(--…)
- [ ] Full font link: Plus Jakarta Sans 500–800 + Inter 400–800 + JetBrains Mono 400–500
- [ ] Reuses core classes where they exist (.overline/.lede/.hero-cta; .cta-band with .ctag+.sub+h2.display)
- [ ] Footer logo src is /assets/brand/studyrise-logo-deep.svg (80px); studyrise-logo-white.svg never appears.
- [ ] Nav links read exactly: Features · Pricing · Blog, with www URLs and ?auth= CTAs.
- [ ] Footer tagline reads exactly "Plan today. Rise tomorrow."


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
