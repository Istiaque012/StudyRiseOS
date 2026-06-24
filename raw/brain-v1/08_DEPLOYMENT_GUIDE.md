# 08 · DEPLOYMENT GUIDE — Delivering the Finished File

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** Exactly what you hand Istiaque at the end of an article session, and the simple steps he follows to put it live. The brain produces; Istiaque deploys. This keeps the handoff clean and repeatable — followable at 11pm without mistakes.

> **Current state (2026-06-21).** Only the homepage (`/`) is live. The blog hub (`/blog`), all prior `/blog/*` articles, and the marketing pages (`/study-planner`, `/pricing`, `/mbbs-bangladesh`) were deleted in the clean-slate pass, **and their `vercel.json` rewrites were removed with them.** So when the first rebuilt page ships, its rewrite must be added back to `vercel.json` (and a blog article also needs the `/blog` hub + `/blog/*` rewrite restored) — otherwise the clean URL falls through to the React app shell. Don't assume any deleted page still exists when verifying.

---

## What You Deliver (the handoff package)

At the end of every article, present these together:

1. **The complete HTML file** — passing the full Pre-Delivery Technical Gate (file 04).
2. **The filename** — `{slug}.html`, lowercase, hyphenated, matching the canonical URL.
3. **The sitemap line** — the exact `<url>` block to add to `sitemap.xml`.
4. **The image deliverables** — OG brief (always) + any hero/in-article briefs (file 07).
5. **The internal-link note** — the inbound links to add, derived from `12_INTERNAL_LINKS.md`.
   Read the registry (§3–4), pick the 1–3 highest-relevance existing live pages that should
   link *to* this new page, **live-fetch each** (Vercel `web_fetch_vercel_url`, full body), and
   write the inbound edits as surgical exact-string find-and-replace blocks — never from memory.
   Cap at 3 inbound edits. Then update `12_INTERNAL_LINKS.md` (new registry row, link-graph
   entry, and clear any debt/worklist rows resolved).
6. **The indexing reminder** — submit the URL in Search Console.
7. **The ready-to-paste Claude Code deploy prompt** — a single block Istiaque pastes
   into the app-dev Claude Code project that does the whole publish: places the HTML at
   `public/blog/{slug}.html`, creates `public/blog/images/`, adds/repairs the `/blog` +
   `/blog/:path*` rewrites in `vercel.json` (ordered above `/` and `?auth`), adds the
   sitemap `<url>` block (with the `xmlns:image` namespace), **wires the article's listing
   card thumbnails** (Image Protocol Rule 4 — see the mandatory step below), runs local
   PASS/FAIL checks (canonical, GA id, the three JSON-LD types, valid vercel.json,
   well-formed sitemap, **and that the hub + category cards for this slug carry a
   `background-image`, not a bare gradient**), commits + pushes, then verifies the Vercel
   deploy status and live-fetches the URL to confirm it returns the article and not the
   React app shell. The prompt explicitly leaves exactly two manual to-dos for Istiaque:
   (a) drop the OG image webp into `public/blog/images/`, and (b) request indexing in GSC.
   Image generation is never automated — it is always a separate ChatGPT/Canva brief.

   > **Mandatory deploy-prompt step — wire the listing thumbnails (Rule 4).** The deploy
   > prompt MUST include this, so the blog hub never shows a blank gradient card:
   > *"In `public/blog.html` and in `public/blog/{category}.html`, find the card whose link is
   > `/blog/{slug}` and set its thumbnail `<div>` style to include
   > `background-image:url('/blog/images/{slug}-og.webp');background-size:cover;background-position:center`,
   > keeping any existing gradient as the fallback layer. The image file itself is dropped in by
   > Istiaque — wiring the reference is automatic and must happen even before the file exists, so
   > the card lights up the moment the webp lands."*

> **Deliver the handoff in sequenced Claude Code sessions, not one mega-paste.** Shipping the
> page and wiring every inbound link and verifying all at once overflows a single session.
> **Session 1 — Ship & register:** place the HTML, add the rewrite + sitemap entry, the page's
> own outbound links, run the gate, verify live, and update `12_INTERNAL_LINKS.md` (registry row
> + link-graph entry). **Session 2+ — Wire inbound:** live-fetch each existing target page, apply
> the surgical inbound edits from the internal-link note, re-verify, and tick the resolved
> debt/worklist rows in file 12. Split Session 2 further when many pages link in. Each session
> ends with a PASS/FAIL check before the next begins.

Keep the handoff tight. The file is the product; don't bury it in explanation.

---

## File Naming & Location

- Lives at: `public/blog/{slug}.html` → serves at `https://www.studyrise.app/blog/{slug}`
- Slug rules: lowercase, words separated by hyphens, no stop-word padding, keyword-bearing.
  - Good: `bmdc-continuous-assessment-card`
  - Bad: `understanding-your-bmdc-continuous-assessment-card-a-complete-guide`
- Images (if re-hosted locally): `public/blog/images/{slug}-og.webp`, `{slug}-hero.webp`, etc.

---

## Page Types & Rewrites (shared shell)

Non-article page types now exist alongside articles. Each is plain static HTML in `public/`, and **each needs its own `vercel.json` rewrite** mapping its clean URL to its file:

| Type | File | URL |
|---|---|---|
| Marketing | `public/{slug}.html` | `/{slug}` |
| Blog hub | `public/blog.html` | `/blog` |
| Category | `public/blog/{category}.html` | `/blog/{category}` |
| Article | `public/blog/{slug}.html` | `/blog/{slug}` |

Every page (all types) depends on two things being in place: the shared assets `/assets/studyrise-core.css` + `/assets/studyrise-chrome.js` existing, and the nav/footer partials being reproduced verbatim from `templates/partials/nav.html` and `templates/partials/footer.html` into each page — there is no `build_site.py` / build step in this content project. The two `/assets/` files are static and need no rewrite. Full spec: `10_SITE_SHELL.md`.

---

## Istiaque's Deploy Steps (the manual part)

These four steps are all that's needed. They never change.

```
1. Save {slug}.html into  public/blog/
2. Add the sitemap <url> block to  public/sitemap.xml
3. (Optional) Add OG/hero images to  public/blog/images/
4. git add -A  &&  git commit -m "Add blog: {title}"  &&  git push
   → Vercel auto-deploys in ~1 minute
```

> **Default delivery is now the Claude Code prompt, not the manual 4 steps.** The manual
> steps above remain the fallback if Istiaque ever publishes by hand. By default, every
> article handoff ends with the single ready-to-paste Claude Code prompt described in item
> 7 of the handoff package. It must: prep folders → place the file → fix vercel.json
> rewrites (ordered correctly) → patch the sitemap → run local checks → commit/push →
> verify deploy + live URL. It must leave only the OG image and the GSC indexing click to
> Istiaque.

> If Istiaque uses Claude Code for the git step, hand him a one-line instruction:
> *"Place this file at public/blog/{slug}.html, add the provided sitemap entry, commit as 'Add blog: {title}', and push."*

---

## The Sitemap Entry to Provide

Give the exact block, with today's date:

```xml
<url>
  <loc>https://www.studyrise.app/blog/{slug}</loc>
  <lastmod>{{YYYY-MM-DD}}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  <image:image>
    <image:loc>https://www.studyrise.app/blog/images/{slug}-og.webp</image:loc>
  </image:image>
</url>
```

(Requires the `xmlns:image` namespace on the `<urlset>` — it's already there if other articles have image entries; flag it if the sitemap doesn't have it yet.)

---

## Verifying the Deploy (using the Vercel tool)

After Istiaque says he's pushed, you can confirm it's live:

1. Use the Vercel tool to check the latest deployment on project **studyrise** — confirm status is **Ready**, not Error/Building.
2. Fetch `https://www.studyrise.app/blog/{slug}` and confirm it returns the article (200, correct title).
3. If the fetch 404s, the file path or Vercel rewrite is likely off — tell Istiaque exactly what to check.

**Run `PRE_DEPLOY_CHECKLIST.md` as the post-deploy verification step** — especially **Section A**, which confirms the live URL returns the page itself and not the React app shell (a generic homepage title, a bare `<div id="root">`, an `app.html` response, or a canonical pointing at the homepage all mean the rewrite is missing).

---

## Getting It Indexed (Search Console)

A live page isn't a found page until Google crawls it.

1. In **Google Search Console** → URL Inspection → paste `https://www.studyrise.app/blog/{slug}` → **Request Indexing**.
2. Confirm the sitemap is still submitted and processing (GSC → Sitemaps).
3. You can use the connected Search Console tool to check the sitemap status and, over the following days, whether the URL starts gaining impressions.

Indexing takes hours to days. Don't expect instant ranking; do confirm it's *indexable* (no accidental noindex, canonical correct, in sitemap).

---

## Post-Publish Checklist

- [ ] File live at correct URL (verified by fetch)
- [ ] Vercel deploy status Ready
- [ ] Sitemap updated with new entry + real lastmod
- [ ] URL submitted for indexing in GSC
- [ ] OG image either embedded or brief delivered
- [ ] Listing cards wired (Rule 4): blog-hub card + category-page card for this slug point at `/blog/images/{slug}-og.webp` — no bare-gradient thumbnail left behind
- [ ] 1–2 existing articles updated to link to the new one (kills orphan status)
- [ ] `05_CONTENT_PIPELINE.md` updated → Status ✅ Live + slug + log line

---

## Auth Route Contract (Option A)

The CTAs in every page point at `?auth=*` on the homepage. Here is the mechanism they rely on (full spec in `04_SEO_TECHNICAL_RULES.md` Rule 0.6):

**Auth contract (Option A — no redirect, param not persisted):**

- Sign-up CTAs link to `https://www.studyrise.app/?auth=register`
- Returning-user copy links to `https://www.studyrise.app/?auth=login` (legacy `?auth=signup` is accepted and treated as register).
- Mechanism: a `vercel.json` rewrite serves `/app.html` (the React app) when an `?auth=*` query param is present. This is a 200 rewrite, NOT a 3xx redirect, and is ordered BEFORE the `/` → `/landing.html` rewrite. `LandingPageStatic.jsx` detects `?auth=*` and lazy-loads `<LandingPage />`, which opens the auth modal and immediately calls `history.replaceState({}, '', '/')` so `?auth=*` never persists in the address bar or browser history.
- SEO effect: crawlers never add `?auth=*`, so the indexable homepage at `/` is still served from static `landing.html`. There is no redirect chain, and `?auth=*` never becomes an indexable URL. The homepage canonical is `https://www.studyrise.app/`, so any `?auth=` variant consolidates to the clean homepage.
- Never link CTAs to `/login` or `/register` directly. Auth routes never appear in `sitemap.xml`.

---

## When Something's Off

- **404 after deploy** → wrong path in `public/blog/`, or Vercel rewrite for `/blog/*` missing. Check `vercel.json`.
- **Page live but not indexing after a week** → check canonical points to itself, robots isn't blocking, page is in sitemap, and there's at least one internal link pointing to it.
- **OG image not showing on social** → image not yet uploaded to the referenced path, or wrong dimensions. The tag references a predicted path; the image must actually exist there.
- **Blog hub / category card shows a flat gradient block instead of the article image** → the listing card thumbnail was never wired to the OG image (Image Protocol Rule 4). Either the `background-image` is missing from the card's thumbnail `<div>`, or the `-og.webp` file isn't in `public/blog/images/` yet. Add the `background-image` (and drop in the webp). This is the exact failure Rule 4 + the C2 pre-deploy check exist to prevent.


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
