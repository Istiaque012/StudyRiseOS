# PRE-DEPLOY CHECKLIST — Run Before Any Page Goes Live

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> **What this file is.** The last gate before a page is considered live. The technical gate in
> `04_SEO_TECHNICAL_RULES.md` checks the *file*; this checklist also checks that the file is
> actually *served* — so a page can never silently fall through to the empty React app shell
> (the "serves app.html / canonical points at the homepage" failure).

---

## A — File is actually served (the failure this checklist exists to prevent)

- [ ] The HTML file exists at the right path: `public/blog/{slug}.html` (articles) or
      `public/{page}.html` (marketing pages).
- [ ] `vercel.json` has a rewrite mapping the clean URL → that `.html` file.
- [ ] After deploy, fetch the LIVE URL and confirm it returns the **page itself**, not the app
      shell. Tell-tales of the app shell (FAIL): the response filename is `app.html`; the
      `<body>` is just `<div id="root"></div>`; the `<title>` is the generic homepage title;
      the canonical points at `https://www.studyrise.app/`.
- [ ] The live page's `<link rel="canonical">` is its OWN URL (not the homepage).

## B — Technical gate (see 04_SEO_TECHNICAL_RULES.md for full detail)

- [ ] GA snippet present, correct ID (`G-R38JK89PP5`), unaltered.
- [ ] Title < 60 chars; meta description 140–160 chars; both unique.
- [ ] Exactly one self-referencing `canonical`, on `https://www.studyrise.app/...`.
- [ ] OG + Twitter tags complete; image path correct.
- [ ] JSON-LD: `BlogPosting` + `BreadcrumbList` (+ `FAQPage` whenever an on-page FAQ exists).
- [ ] Exactly one `<h1>` with the primary keyword; clean H2/H3 nesting.
- [ ] 2–3 internal links + ≥1 conversion link (descriptive anchors); ≥1 verified external source.
- [ ] Every `<img>` has alt + width + height; below-fold images `loading="lazy"`.
- [ ] Works at 375px; no obvious Core-Web-Vitals killers.
- [ ] No invented facts, statistics, or sources.
- [ ] Links `/assets/studyrise-core.css` (head) + `/assets/studyrise-chrome.js` (before </body>); no shared-chrome CSS inlined.
- [ ] Page CSS is one small `<style id="page-styles">` in the <head> (none in <body>); no re-declared `:root` tokens or hard-coded fonts — uses var(--…).
- [ ] Full font link present (Plus Jakarta 500–800 + Inter 400–800 + JetBrains Mono 400–500); reuses core classes instead of re-creating them.
- [ ] Nav and footer are copied verbatim from `templates/partials/nav.html` and `footer.html` — not hand-written or reconstructed. No `<!--#include ...-->` placeholders.
- [ ] Footer logo src is `/assets/brand/studyrise-logo-deep.svg` (80px); `studyrise-logo-white.svg` never appears.
- [ ] Nav links read exactly: Features · Pricing · Blog, with www URLs and `?auth=` CTAs.
- [ ] Footer tagline is exactly "Plan today. Rise tomorrow."

## C — AI-readability (GEO)

- [ ] A direct-answer opening (40–60 words) sits right under the H1.
- [ ] Each FAQ answer leads with the answer in ~40 words (conclusion first).
- [ ] `FAQPage` schema mirrors the on-page FAQ exactly.
- [ ] Each fan-out sub-query is answered in its own extractable passage.
- [ ] Visible "Last updated" line present and equals `dateModified`.
- [ ] (Comparison pages only) `ItemList` schema present and summary table is within the first screen.

## C2 — Listing cards (the "blank blog thumbnail" failure)

- [ ] On `public/blog.html` AND on the article's category page (`public/blog/{category}.html`),
      the card linking to `/blog/{slug}` has a thumbnail with
      `background-image:url('/blog/images/{slug}-og.webp')` — **not a gradient alone**
      (Image Protocol Rule 4). A gradient-only thumbnail on a card whose article has an OG
      image = FAIL.
- [ ] No card thumbnail across any listing page (`public/blog.html`, all
      `public/blog/{category}.html`) is left as a bare gradient placeholder when its article's
      `-og.webp` exists in `public/blog/images/`.

## D — Sitemap & freshness

- [ ] `sitemap.xml` has the new `<url>`, with `<lastmod>` equal to the page's schema
      `dateModified`, and an `<image:image>` entry.
- [ ] No auth or app routes in the sitemap.

## E — Index

- [ ] Submit the URL in GSC → URL Inspection → Request Indexing.

---
<!-- docnav-related -->
### Related docs
- [04 · SEO TECHNICAL RULES](04_SEO_TECHNICAL_RULES.md)
- [06 · PRODUCTION PLAYBOOK](06_PRODUCTION_PLAYBOOK.md)
- [08 · DEPLOYMENT GUIDE](08_DEPLOYMENT_GUIDE.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
