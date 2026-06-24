# StudyRise — SEO Remediation Plan

**Audit date:** 2026-06-24
**Scope:** Live production pages on `https://www.studyrise.app/`
**Method:** Live HTML fetch (Vercel) of homepage, sitemap, robots, blog category, both AMC URLs; Google Search Console page + query data for 2026-05-25 → 2026-06-23.

> **Owner key:** **[CONTENT]** = this project (I produce the file/snippet). **[DEV]** = development project (routing, redirects, deploy). Some items need both: I specify, dev implements.

---

## Summary

Two issues are actively costing traffic right now (P0). Both come from the same root cause: URLs that should be static pages or redirects are instead falling through to the React app catch-all, returning `200` with an empty shell and a canonical pointing at the homepage.

The rest are accuracy and consolidation fixes — most leverage is in P0 and P1. Overall search volume is still small and mostly branded ("studyrise", "study rise"); the only non-branded traction you have is AMC, and it's sitting on a broken URL. Fixing that is the highest-value move on the site.

| # | Issue | Priority | Owner |
|---|---|---|---|
| 1 | Renamed AMC article not redirected — ranking stranded on dead URL | **P0** | DEV |
| 2 | `/amc-mcq-study-planner` is a ghost page in the sitemap | **P0** | CONTENT + DEV |
| 3 | Homepage FAQ contradicts the freemium model | **P1** | CONTENT |
| 4 | `/study-planner` (and likely `/mbbs-bangladesh`) missing from sitemap | **P1** | CONTENT + DEV |
| 5 | `/?auth=login` is indexed and showing in results | **P1** | DEV |
| 6 | Homepage meta description is ungrammatical | **P2** | CONTENT |
| 7 | Em-dashes/colons stripped throughout homepage body copy | **P2** | CONTENT |
| 8 | Homepage favicon relative path + stray bare-domain URLs indexed | **P2** | DEV |
| — | Verification pass on pricing / features / study-planner / mbbs-bangladesh | follow-up | CONTENT |

---

## P0 — Structural, losing traffic now

### 1. The renamed AMC article wasn't redirected

**What's wrong.** The old slug `/blog/how-to-pass-amc-mcq-in-4-months` still holds all your AMC traffic — **69 impressions at position ~22** over the audit window, and the source of every non-branded impression you have ("amc exam preparation", "amc preparation", "mcq preparation"). But the live URL now returns **`200` with the empty React app shell** (`<div id="root"></div>`) and a canonical pointing to the **homepage**. There is no 301 to the new slug `/blog/amc-mcq-study-plan`.

**Consequence.** No link equity transfers to the new slug, so it starts from zero. Google keeps the old URL indexed but finds no content and a homepage canonical, so the ranking decays and dies. You lose the one non-branded foothold you've built.

**Recommended fix [DEV].** Add a permanent redirect, old → new:

```
Source:      /blog/how-to-pass-amc-mcq-in-4-months
Destination: /blog/amc-mcq-study-plan
Status:      301 (permanent)
```

In `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/blog/how-to-pass-amc-mcq-in-4-months",
      "destination": "/blog/amc-mcq-study-plan",
      "permanent": true
    }
  ]
}
```

**After deploy:** confirm the old URL returns `308/301` (not `200`), then in GSC use URL Inspection → Request Indexing on the **new** slug so Google recrawls and consolidates.

---

### 2. `/amc-mcq-study-planner` is a ghost page in the sitemap

**What's wrong.** This URL is listed in `sitemap.xml` at priority `0.8` with its own OG image (`amc-mcq-study-planner-og.webp`) — i.e. you're telling Google it's an important page. But the live URL serves the **empty SPA shell** with a canonical to the homepage. There is no AMC content there. The route is falling through to the app catch-all.

This is worse than "stale early-access copy": the page does not exist as a static page. The sitemap promises a page; the server hands back the homepage.

**Recommended fix — pick one:**

- **Option A (preferred) [CONTENT]:** I build the real static `/amc-mcq-study-planner` landing page — a proper [EXAM]-audience commercial page targeting "AMC MCQ study planner". This is a transactional-intent keyword and a strong fit for the product. It also gives the redirected blog article (#1) a relevant internal-link target.
- **Option B (interim) [DEV]:** Remove `/amc-mcq-study-planner` from `sitemap.xml` until the real page ships, so the sitemap stops lying to Google.

Do **not** leave it as-is. Right now it's the worst of both: indexed-by-request, content-by-none.

**Recommendation:** Option A, and until it's live, Option B. Building it is in my lane — say the word and it goes into the pipeline.

---

## P1 — Accuracy and consolidation

### 3. Homepage FAQ contradicts the freemium model

**What's wrong.** The "Is StudyRise free?" answer reads (paraphrased): *core features are free, and a paid tier for advanced analytics and the AI Study Advisor is "on the roadmap."* That's the retired positioning. Under the current model, Pro is live: 30 days full access, then basic features free forever, Pro for advanced. On your most-crawled page, this is both a copy-rule miss and an E-E-A-T / AI-answer accuracy problem — exactly the kind of "what is X / is X free" query that gets pulled into AI Overviews.

Secondary: the FAQ block has **no `FAQPage` JSON-LD**, so you're missing a free rich-result + AI-citation opportunity on a page that already has the Q&A content.

**Recommended fix [CONTENT].** Two parts.

**(a) Rewrite the answer to the freemium reality.** Draft:

> **Is StudyRise free?**
> Yes — every new account gets 30 days of full access free, no card required. After that, the core planning, study logging, spaced repetition and mock tracking stay free for good. Advanced analytics and the AI Study Advisor are part of StudyRise Pro. You can build your whole plan and study daily without paying.

*(No "premium", "unlock", "free trial", or "upgrade" — compliant with the copy rules. "Pro" used as the tier name. Confirm phrasing against `11_PRICING_MODEL.md` before build.)*

**(b) Add `FAQPage` schema** covering the existing eight questions. Ready-to-paste JSON-LD scaffold (fill the remaining answers from the live FAQ, applying the freemium correction above):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is StudyRise free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every new account gets 30 days of full access free, no card required. After that, core planning, study logging, spaced repetition and mock tracking stay free for good. Advanced analytics and the AI Study Advisor are part of StudyRise Pro."
      }
    }
    /* + the remaining 7 Q&A pairs, text mirroring the on-page copy */
  ]
}
</script>
```

> Note: schema answer text must match the visible on-page answer, so fix the on-page copy (a) and the schema (b) together in the same change.

---

### 4. `/study-planner` (and likely `/mbbs-bangladesh`) missing from the sitemap

**What's wrong.** `/study-planner` is live, indexed, and ranking — **27 impressions at position ~6.8** — yet it is **not** in `sitemap.xml`. It's one of your better-performing commercial pages and you're under-feeding it to Google. `/mbbs-bangladesh` is referenced as a live page in the project notes but is also absent from the sitemap.

**Recommended fix [CONTENT → DEV].** Add the missing `<url>` blocks. Ready to paste:

```xml
  <url>
    <loc>https://www.studyrise.app/study-planner</loc>
    <lastmod>2026-06-24</lastmod><changefreq>monthly</changefreq><priority>0.8</priority>
  </url>
```

```xml
  <!-- [VERIFY] Confirm /mbbs-bangladesh returns 200 as a static page before adding. -->
  <url>
    <loc>https://www.studyrise.app/mbbs-bangladesh</loc>
    <lastmod>2026-06-24</lastmod><changefreq>monthly</changefreq><priority>0.8</priority>
  </url>
```

I did not fetch `/mbbs-bangladesh` in this pass, so its block is flagged `[VERIFY]` — confirm it's a real static page (not another SPA fallthrough like the AMC URLs) before adding it.

---

### 5. `/?auth=login` is indexed and surfacing in search

**What's wrong.** The login entry point is indexed and pulling **27 impressions (1 click)**. An auth screen is competing in your own SERPs and splitting signals with the homepage. `robots.txt` correctly keeps `/login` and `/register` out of the sitemap, but the `?auth=` query-param form on `/` is being treated by Google as a separate indexable URL.

**Recommended fix [DEV].** Make the `?auth=` parameter variants canonicalise to `/` (the homepage already self-canonicalises; ensure the param URLs inherit `<link rel="canonical" href="https://www.studyrise.app/">` rather than self-referencing). Low effort, removes the duplicate.

---

## P2 — Polish

### 6. Homepage meta description is ungrammatical

**What's wrong.** Current: *"StudyRise is a study planner that turns your syllabus into a day-by-day schedule tasks, spaced repetition, mocks and analytics. Core features free."* A connector/punctuation mark is missing after "schedule", so it reads as broken. This is your SERP snippet.

**Recommended fix [CONTENT].** Tightened, ~155 chars, freemium-safe:

> Turn your syllabus into a day-by-day plan — tasks, spaced repetition, mocks and analytics in one workspace. Core features free, no card required.

---

### 7. Em-dashes and colons stripped throughout homepage body copy

**What's wrong.** Across the homepage, dashes/colons are missing where the sentence needs them — e.g. "exam-prep plan a structured daily schedule", "No deciding what to do just start", "Data that informs decisions, not decorates dashboards" reads fine but several others don't. It looks like a processing artifact that ate the punctuation. This is **isolated to `landing.html`** — `/blog/mbbs` renders its em-dashes correctly — so it's a one-file cleanup, not sitewide.

**Recommended fix [CONTENT].** Re-punctuate the homepage body copy (hero lede, feature blurbs, FAQ answers) so each sentence resolves. I can produce a find-and-replace patch list against the live `landing.html` so dev applies it cleanly.

---

### 8. Homepage favicon relative path + stray bare-domain URLs indexed

**What's wrong.** Two minor items:
- Homepage `<link rel="icon">` uses a relative path (`assets/brand/favicon.svg`, no leading slash). It resolves on `/` but is fragile and inconsistent with the rest of the site, which uses `/assets/brand/favicon.svg`.
- GSC still shows some **bare-domain** (`https://studyrise.app/...`) URLs in the index for `/features`, `/pricing`, `/study-planner`. The bare domain 308-redirects to `www`, so Google will consolidate over time.

**Recommended fix [DEV].** Make the homepage favicon path absolute (`/assets/brand/favicon.svg`). No action needed on the bare-domain URLs beyond the existing 308 — monitor that they drop out of the index over the next few crawls.

---

## Follow-up — Verification pass (not yet done)

I full-gated the homepage but only spot-checked these via GSC, not page-by-page HTML:

- `/pricing`
- `/features`
- `/study-planner`
- `/mbbs-bangladesh`

Given the retired pricing language found in the homepage FAQ (#3), these four warrant the same copy-and-canonical check — specifically: (a) no "premium / unlock / free trial / free during early access" language, (b) correct `www` canonical and `?auth=` CTAs, (c) GA snippet present, (d) confirm each is a real static page and not an SPA fallthrough. I'd run this as the next pass.

---

## Suggested order of execution

1. **#1** — AMC 301 redirect [DEV]. One line of config, biggest payoff. Do first.
2. **#2 Option B** — pull the ghost AMC planner URL from the sitemap [DEV], same deploy as #1.
3. **#3** — homepage FAQ rewrite + FAQPage schema [CONTENT]. I can deliver immediately.
4. **#4** — add `/study-planner` to sitemap [CONTENT → DEV]; verify and add `/mbbs-bangladesh`.
5. **#6 / #7** — homepage meta + punctuation cleanup [CONTENT], one patch.
6. **#5 / #8** — auth-param canonical + favicon path [DEV], low priority.
7. **#2 Option A** — build the real `/amc-mcq-study-planner` page [CONTENT], scheduled into the pipeline.
8. Run the verification pass on the four marketing pages.

Nothing here touches the app, infrastructure, or admin beyond specifying SEO requirements for the dev project to implement. The content items (#3, #4, #6, #7, and #2A) are mine to produce on request.
