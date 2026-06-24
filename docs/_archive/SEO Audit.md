# StudyRise SEO Audit Report

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


**Date:** 2026-06-14  
**Auditor:** Claude Sonnet (automated + manual code inspection)  
**Scope:** Full public website SEO — all crawlable pages, sitemap, robots.txt, structured data, content positioning, internal linking, images  
**Website:** https://studyrise.app  
**Sitemap reviewed:** https://studyrise.app/sitemap.xml  
**Audit basis:** Local source code inspection (`public/`, `vercel.json`, `src/`) + file analysis  
**Note on live vs local:** Audit is based on local code. Where live behaviour may differ (e.g. HTTP status codes, actual rendering), this is flagged. No curl/live verification was possible in this environment.

---

## Executive Summary

StudyRise has a solid blog content foundation and clean URL architecture, but a critical infrastructure flaw undermines homepage SEO entirely: **`landing.html` — the file served at `/` — is missing every standard SEO tag** (meta description, canonical, Open Graph, Twitter Card, JSON-LD schema). Because Vercel serves this static file directly (not the React `index.html`), search engine crawlers see a page with no description, no OG data, and no structured data at the site's most important URL.

A second critical issue is positioning: the features page, app `index.html`, and several meta descriptions frame StudyRise as an **exam study planner**, while the stated goal is to rank as a broad **study planner for university, exams, and every syllabus**. This mismatch means any organic traffic for university or general study planning terms finds pages that contradict the landing experience.

The blog is the strongest SEO asset — two published articles with proper BlogPosting schema, OG images, breadcrumbs, and targeted titles. But the blog page links to a meta-refresh redirect page as though it were a real article, which creates a crawlability trap.

**Headline issues to fix before anything else:**
1. Add SEO head tags to `landing.html` (one HTML block — 30 minutes of work)
2. Fix or remove `/blog/how-to-create-a-study-plan` redirect page (20 minutes)
3. Broaden positioning on features page and study-planner page titles/H1s

---

## Overall Score

| Dimension | Score | Notes |
|---|---|---|
| Technical SEO | 5/10 | Homepage missing all meta tags; redirect page mishandled |
| Indexability / Robots | 7/10 | Correctly allows public pages; references missing files |
| Sitemap | 7/10 | Valid, correct URLs; duplicate lastmod dates; no self-link on homepage image |
| Structured Data | 5/10 | Blog articles good; no schema on homepage, features, pricing, study-planner |
| Content & Keywords | 6/10 | Blog well-targeted; marketing pages over-indexed to "exam" framing |
| Internal Linking | 5/10 | Homepage footer has zero links to other pages; some footers missing /study-planner |
| Image SEO | 6/10 | Blog OG WebPs are correct; 1.4MB PNG duplicate sitting unused; og-image.png 198KB |
| Performance (code) | 6/10 | 3 render-blocking Google Font families; heavy landing page animations |
| Conversion / Trust | 7/10 | Social proof, disclaimer, FAQ present on blog; pricing page is clear |
| Overall | **6/10** | Strong blog baseline; homepage gap is the single biggest opportunity |

---

## Priority Findings

| ID | Priority | Page | Issue | Impact |
|---|---|---|---|---|
| F1 | **P0** | `/` (landing.html) | Missing `<meta name="description">`, `<link rel="canonical">`, all OG tags, Twitter Card, JSON-LD | Homepage invisible to crawlers for snippet, social sharing, and knowledge panels |
| F2 | **P0** | `/` (landing.html) | Homepage title "StudyRise — Plan today. Rise tomorrow." contains zero indexable keywords | Primary page cannot rank for any target query |
| F3 | **P0** | `/` (landing.html) | Footer contains only in-page anchor links (`#top`, `#showcase`, `#faq`) — no links to `/features`, `/pricing`, `/blog`, `/study-planner` | Crawlers cannot flow PageRank from homepage to any other page |
| F4 | **P0** | `/blog/how-to-create-a-study-plan` | Meta-refresh redirect (not 301) with `robots: index, follow`, wrong canonical (points to self), and linked from `blog.html` as a live article | Duplicate content risk; redirect destination loses link equity from blog page; crawlers may index the redirect shell |
| F5 | **P1** | `/features` | Title "Features — StudyRise Exam Study Planner" and H1 "Everything you need to stay on track until exam day" are exam-only | Contradicts broad study-planner positioning; misses university + general terms |
| F6 | **P1** | `/`, `/features`, `/pricing`, `/study-planner` | No JSON-LD structured data on any of these four pages | No Organization schema, WebSite schema, or WebPage schema for Google knowledge graph |
| F7 | **P1** | `/blog/how-to-pass-amc-mcq-in-4-months` | Related links section: `/study-planner` page linked with anchor text "What is StudyRise? →" — wrong anchor text for wrong destination | Confusing UX; signals wrong page relationship to crawlers |
| F8 | **P1** | `public/blog/what-is-studyrise-study-planner-og.png` | 1.4MB PNG file sitting in `public/blog/` — never referenced by any page (WebP exists); wasting storage | Not an active SEO issue but a hygiene/bloat problem |
| F9 | **P2** | `robots.txt` | References `apple-touch-icon.png`, `site.webmanifest`, `favicon.ico` — none of these files exist in `public/` | Crawlers following these hints hit 404s; very minor but pollutes crawl log |
| F10 | **P2** | All pages | All sitemap `<lastmod>` dates are identical: `2026-06-11` | Weak freshness signal; Google may de-weight lastmod as unreliable |
| F11 | **P2** | `/features`, `/pricing`, `/blog/what-is-studyrise`, `/blog/how-to-pass-amc-mcq-in-4-months` | Footer missing link to `/study-planner` | Study-planner page receives no footer PageRank from these pages |
| F12 | **P2** | `/study-planner` | Meta description "Turn your exam syllabus into a day-by-day study schedule" — exam-focused | Misses searches for "university study planner", "semester study planner" |
| F13 | **P2** | `public/og-image.png` | 198KB PNG used as OG image on `/`, `/features`, `/pricing`, `/study-planner` | Should be WebP for performance; large for a social preview image |
| F14 | **P3** | `/blog` | H1 is "StudyRise Blog" — no target keyword in H1 | Weak signal; should be "Study Planning Guides and Exam Prep Articles" or similar |
| F15 | **P3** | `/blog` | OG image uses generic `og-image.png` rather than a blog-specific image | Less compelling social share preview for the blog hub |
| F16 | **P3** | robots.txt | App routes (`/auth`, `/profile`, `/reset-password`, `/review-sheet`, `/report`, `/grades/report`) not blocked | Crawlers will discover and attempt to index authenticated SPA screens |

---

## Page-by-Page Audit

### Page 1: Homepage `/` (served from `landing.html`)

**Architecture note:** Vercel rewrites `{ "source": "/", "destination": "/landing.html" }`. This means Google crawls `landing.html` directly — not the React `index.html`. Any SEO tags in `index.html` are irrelevant for the homepage.

| Check | Status | Detail |
|---|---|---|
| `<title>` | ⚠️ Weak | "StudyRise — Plan today. Rise tomorrow." — zero indexable keywords |
| `<meta name="description">` | ❌ Missing | Completely absent from `landing.html` |
| `<link rel="canonical">` | ❌ Missing | Completely absent |
| Open Graph tags | ❌ Missing | No `og:title`, `og:description`, `og:url`, `og:image`, `og:type` |
| Twitter Card | ❌ Missing | No Twitter meta tags |
| JSON-LD schema | ❌ Missing | No Organization, WebSite, or WebPage schema |
| H1 | ⚠️ Weak | "Turn your syllabus into a plan you'll actually finish." — good copy, but no keyword like "study planner" |
| H2s | ⚠️ | "Your whole study system, one workspace." / "Built to keep you consistent, not just busy." / "From exam goal to daily action in five steps." — no keyword density |
| Internal links (nav) | ✅ | Nav links to `/features`, `/pricing`, `/study-planner`, `/blog` |
| Internal links (footer) | ❌ | Footer contains ONLY anchor links: `#top`, `#showcase`, `#faq`, `#how`, `#features` — zero links to other pages |
| Image alt text | Unknown | Could not inspect full 342KB file; high-animation page likely has decorative images |
| Page load | ⚠️ | Loads 3 Google Font families (DM Serif Display, Inter, JetBrains Mono) render-blocking; heavy scroll-animation CSS |
| Positioning | ⚠️ | Page content appears general/broad but title signals nothing indexable |

**Recommended fixes:**
```html
<!-- Add to <head> of landing.html -->
<meta name="description" content="StudyRise is a free study planner that turns your syllabus into a day-by-day schedule. Track progress, manage spaced repetition, and stay consistent — for exams, university, or any subject." />
<link rel="canonical" href="https://studyrise.app/" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://studyrise.app/" />
<meta property="og:title" content="StudyRise — Free Study Planner for Exams and University" />
<meta property="og:description" content="Turn your syllabus into a day-by-day plan. Track progress, stay consistent, and study smarter — for any exam or semester." />
<meta property="og:image" content="https://studyrise.app/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="StudyRise — Free Study Planner for Exams and University" />
<meta name="twitter:description" content="Turn your syllabus into a day-by-day plan. Track progress, stay consistent, and study smarter." />
<meta name="twitter:image" content="https://studyrise.app/og-image.png" />
```

Also update `<title>` to: `"StudyRise — Free Study Planner for Exams and University"`

---

### Page 2: `/features` (`public/features.html`)

| Check | Status | Detail |
|---|---|---|
| `<title>` | ⚠️ Exam-only | "Features — StudyRise Exam Study Planner" |
| `<meta name="description">` | ✅ | Present; mentions phase-based plans, spaced repetition, QBank tracking — but scoped to exam prep |
| `<link rel="canonical">` | ✅ | `https://studyrise.app/features` |
| Open Graph | ✅ | Present and complete |
| Twitter Card | ✅ | Present |
| JSON-LD schema | ❌ Missing | No WebPage or Product schema |
| H1 | ⚠️ Exam-only | "Everything you need to stay on track until exam day" |
| Internal links (footer) | ⚠️ | Links to `/`, `/features`, `/pricing`, `/blog` — missing `/study-planner` |
| Positioning | ❌ Exam-only | Title and H1 would not surface for university/general study planning searches |

**Recommended title:** `"Features — StudyRise Study Planner for Exams and University"`  
**Recommended H1:** `"Everything you need to plan, track, and stay consistent"`

---

### Page 3: `/pricing` (`public/pricing.html`)

| Check | Status | Detail |
|---|---|---|
| `<title>` | ✅ | "Pricing — StudyRise is Free" — clear and accurate |
| `<meta name="description">` | ✅ | Present |
| `<link rel="canonical">` | ✅ | Present |
| Open Graph | ✅ | Present |
| Twitter Card | ✅ | Present |
| JSON-LD schema | ❌ Missing | No PriceSpecification or WebPage schema |
| H1 | ✅ | "StudyRise is free" — simple and accurate |
| Internal links (footer) | ⚠️ | Missing `/study-planner` |
| Overall | ✅ Good | Positioning neutral; no exam-only framing |

---

### Page 4: `/study-planner` (`public/study-planner.html`)

| Check | Status | Detail |
|---|---|---|
| `<title>` | ✅ | "Study Planner App — StudyRise" — keyword present |
| `<meta name="description">` | ⚠️ Exam-focused | "Turn your exam syllabus into a day-by-day study schedule." — starts with "exam syllabus" |
| `<link rel="canonical">` | ✅ | `https://studyrise.app/study-planner` |
| Open Graph | ✅ | Present |
| Twitter Card | ✅ | Present |
| JSON-LD schema | ❌ Missing | No WebPage or SoftwareApplication schema |
| H1 | ✅ | "A study planner that turns your syllabus into a schedule" — good, broad |
| Internal links (footer) | ⚠️ | Missing self-link (fine) but also missing `/study-planner` from all OTHER pages' footers |
| Overall | ✅ Good | This is the right landing page for "study planner" searches; meta description could be broader |

**Recommended meta description:** `"Turn your syllabus into a day-by-day study schedule. StudyRise is a free study planner for university students and exam candidates — phase planning, daily tasks, spaced repetition, and progress tracking."`

---

### Page 5: `/blog` (`public/blog.html`)

| Check | Status | Detail |
|---|---|---|
| `<title>` | ✅ | "StudyRise Blog \| Study Planning, Exam Prep and University Study Guides" |
| `<meta name="description">` | ✅ | Present and broad |
| `<link rel="canonical">` | ✅ | Present |
| Open Graph | ⚠️ | Present but uses generic `og-image.png` rather than a blog-specific image |
| Twitter Card | ✅ | Present |
| JSON-LD schema | ✅ | CollectionPage with ItemList of 2 articles |
| H1 | ⚠️ Weak | "StudyRise Blog" — no keyword |
| Internal links (footer) | ✅ | Links to `/`, `/features`, `/pricing`, `/study-planner`, `/blog` — complete |
| CRITICAL: Blog article link | ❌ | Links to `/blog/how-to-create-a-study-plan` (a meta-refresh redirect page) as if it's a live article. This should either point to the real destination (`/blog/how-to-pass-amc-mcq-in-4-months`) or be removed until the actual article exists |
| Coming-soon cards | ℹ️ | 4 placeholder cards with no links — not an SEO problem unless they have unique URLs |

**Recommended H1:** `"Study Planning Guides and Exam Prep Articles"`

---

### Page 6: `/blog/what-is-studyrise` (`public/blog/what-is-studyrise.html`)

| Check | Status | Detail |
|---|---|---|
| `<title>` | ✅ | "What Is StudyRise? A Study Planner for Any Exam or Semester" (55 chars) |
| `<meta name="description">` | ✅ | Present; specific and keyword-rich |
| `<link rel="canonical">` | ✅ | `https://studyrise.app/blog/what-is-studyrise` |
| Open Graph | ✅ | Present, `og:type: "article"`, article-specific WebP image (79KB), `og:image:alt`, `og:image:secure_url` |
| Twitter Card | ✅ | Present with article-specific image |
| JSON-LD schema | ✅ | BlogPosting + BreadcrumbList |
| H1 | ✅ | "What Is StudyRise? A Study Planner for Any Exam or Semester" |
| Semantic structure | ✅ | Hero image in `<figure>`, `fetchpriority="high"`, breadcrumb nav |
| Disclaimer | ✅ | Present |
| FAQ section | ✅ | Present |
| Internal links (body) | ✅ | Links to `/features`, `/study-planner`, `/pricing` |
| Internal links (related) | ⚠️ | "How to Create a Study Plan That Actually Works →" links to `/blog/how-to-create-a-study-plan` — the redirect page |
| Internal links (footer) | ⚠️ | Missing `/study-planner` |
| Overall | ✅ Best page | Strongest SEO implementation on the site |

---

### Page 7: `/blog/how-to-pass-amc-mcq-in-4-months` (`public/blog/how-to-pass-amc-mcq-in-4-months.html`)

| Check | Status | Detail |
|---|---|---|
| `<title>` | ✅ | "How to Pass the AMC MCQ in 4 Months \| Study Plan for IMGs" |
| `<meta name="description">` | ✅ | Present and specific to AMC MCQ |
| `<link rel="canonical">` | ✅ | Self-referencing correctly |
| Open Graph | ✅ | Article type, specific WebP OG image (80KB) |
| Twitter Card | ✅ | Present |
| JSON-LD schema | ✅ | BlogPosting + BreadcrumbList |
| Image preload | ✅ | `<link rel="preload" as="image">` for hero image |
| Breadcrumb | ✅ | Present |
| Disclaimer | ✅ | Present |
| Related links | ❌ Bug | `/study-planner` page linked with anchor text **"What is StudyRise? →"** — this should be `/blog/what-is-studyrise` or the anchor text should be "Start planning free →" |
| Internal links (footer) | ⚠️ | Missing `/study-planner` |
| Duplicate self-links | ℹ️ | 4 links to this URL on the page (including canonical) — expected and fine |
| Overall | ✅ Strong | Well-structured; fix the related-links anchor text |

---

### Page 8 (orphan/redirect): `/blog/how-to-create-a-study-plan` (`public/blog/how-to-create-a-study-plan.html`)

**Status: BROKEN — should not exist as-is**

| Check | Status | Detail |
|---|---|---|
| `<title>` | ❌ Wrong | "How to Pass the AMC MCQ in 4 Months \| Study Plan for IMGs" — the AMC article title, not a study plan title |
| `<meta name="description">` | ❌ Wrong | "A practical 4-month AMC MCQ study plan…" — AMC content at wrong URL |
| `<link rel="canonical">` | ❌ Wrong | Points to `https://studyrise.app/blog/how-to-create-a-study-plan` — i.e., itself — but this page is a redirect. Should point to the destination |
| `og:url` | ❌ Wrong | Set to the AMC article URL while the canonical is the study plan URL |
| `robots` | ❌ Wrong | `content="index, follow"` — this redirect shell should be `noindex` |
| Redirect mechanism | ❌ Wrong | Uses `<meta http-equiv="refresh" content="0; url=/blog/how-to-pass-amc-mcq-in-4-months">` — a meta-refresh, not a proper 301 HTTP redirect |
| Listed in sitemap | ✅ | Correctly excluded from sitemap |
| Linked from `blog.html` | ❌ | Blog page presents this URL as a live article card |

**Correct fix options (choose one):**
1. **(Preferred) Convert to a proper 301 via `vercel.json` redirect** and remove the HTML file entirely. Add to vercel.json `"redirects"` array: `{ "source": "/blog/how-to-create-a-study-plan", "destination": "/blog/how-to-pass-amc-mcq-in-4-months", "permanent": true }`. Then delete `public/blog/how-to-create-a-study-plan.html`.
2. **(Acceptable) Make it noindex** — add `<meta name="robots" content="noindex, nofollow">` and fix the canonical to point to the destination.
3. **Don't link to it from blog.html** — update the blog article card to link directly to `/blog/how-to-pass-amc-mcq-in-4-months`.

---

## Sitemap Audit (`public/sitemap.xml`)

| Check | Status | Detail |
|---|---|---|
| Valid XML structure | ✅ | Well-formed, uses `sitemaps.org` namespace |
| Image namespace | ✅ | `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` |
| URL count | ✅ | 7 URLs |
| All live URLs present | ✅ | `/`, `/study-planner`, `/features`, `/pricing`, `/blog`, `/blog/what-is-studyrise`, `/blog/how-to-pass-amc-mcq-in-4-months` |
| Redirect page excluded | ✅ | `/blog/how-to-create-a-study-plan` correctly absent |
| App routes excluded | ✅ | `/dashboard`, `/today`, etc. not in sitemap |
| Priority values | ✅ | Logical: `/` → 1.0, `/study-planner` → 0.9, `/features` → 0.8, `/blog` → 0.8, `/pricing` → 0.7, articles → 0.7 |
| `<changefreq>` | ✅ | Present; homepage weekly, blog weekly, articles monthly |
| `<lastmod>` dates | ⚠️ | All 7 URLs have identical date: `2026-06-11`. Google may ignore lastmod when all dates are the same, treating it as auto-generated rather than content-driven |
| Image entries | ✅ | `/blog/what-is-studyrise` and `/blog/how-to-pass-amc-mcq-in-4-months` both have `<image:image>` entries |
| Image paths | ✅ | Both point to `.webp` files that exist |
| `Sitemap:` in robots.txt | ✅ | `Sitemap: https://studyrise.app/sitemap.xml` present |

**Recommended improvement:** Update `<lastmod>` dates per article to reflect actual publish or update dates, rather than using one date for all.

---

## Robots.txt Audit (`public/robots.txt`)

| Check | Status | Detail |
|---|---|---|
| Syntax | ✅ | Valid robots.txt syntax |
| Default allow | ✅ | `User-agent: *` with `Disallow:` (empty = allow all) |
| Sitemap reference | ✅ | `Sitemap: https://studyrise.app/sitemap.xml` at bottom |
| AI bot blocks | ✅ | `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot` all have `Disallow: /` |
| Public pages accessible | ✅ | Marketing pages, blog, sitemap all crawlable |
| App routes blocked | ❌ Missing | `/auth`, `/profile`, `/reset-password`, `/review-sheet`, `/report`, `/grades/report` are NOT listed. Crawlers will discover these routes via links, attempt to index them, and receive the React SPA shell. Not catastrophic (SPA content requires JS) but clutters crawl budget |
| Missing file references | ❌ | `Crawl-delay` comment block references `apple-touch-icon.png`, `site.webmanifest`, `favicon.ico` — none exist in `public/`. Only `favicon.svg` exists. |

**Recommended addition to `robots.txt`:**
```
Disallow: /auth
Disallow: /profile
Disallow: /reset-password
Disallow: /review-sheet
Disallow: /report
Disallow: /grades/report
Disallow: /admin
```

**Recommended:** Create `public/favicon.ico` (16×16 PNG or ICO) and `public/apple-touch-icon.png` (180×180 PNG) for completeness. `site.webmanifest` is optional unless PWA support is planned.

---

## Structured Data Audit

### What's present

| Page | Schema type | Status |
|---|---|---|
| `/blog` | CollectionPage + ItemList | ✅ Correct |
| `/blog/what-is-studyrise` | BlogPosting + BreadcrumbList | ✅ Correct |
| `/blog/how-to-pass-amc-mcq-in-4-months` | BlogPosting + BreadcrumbList | ✅ Correct |
| `/` | — | ❌ Missing |
| `/features` | — | ❌ Missing |
| `/pricing` | — | ❌ Missing |
| `/study-planner` | — | ❌ Missing |

### What's missing and recommended

**Homepage `/` — add Organization + WebSite + WebPage:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "StudyRise",
      "url": "https://studyrise.app",
      "logo": "https://studyrise.app/favicon.svg",
      "contactPoint": { "@type": "ContactPoint", "email": "hello@studyrise.app" }
    },
    {
      "@type": "WebSite",
      "name": "StudyRise",
      "url": "https://studyrise.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://studyrise.app/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "name": "StudyRise — Free Study Planner for Exams and University",
      "url": "https://studyrise.app/",
      "description": "Turn your syllabus into a structured daily schedule. Free study planner for any exam or university subject."
    }
  ]
}
```

**`/study-planner` — add SoftwareApplication:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "StudyRise",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://studyrise.app",
  "description": "Study planner that turns your syllabus into a day-by-day schedule with spaced repetition and progress tracking."
}
```

**`/features` and `/pricing` — add WebPage:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "...",
  "url": "https://studyrise.app/features",
  "isPartOf": { "@type": "WebSite", "url": "https://studyrise.app" }
}
```

### BlogPosting quality check

Both blog articles use correct schema. Spot-check fields:
- `headline` ✅
- `description` ✅
- `datePublished` / `dateModified` ✅
- `author` → verify this uses `{"@type": "Organization", "name": "StudyRise"}` rather than a generic string
- `image` → verify points to the `.webp` OG image (not the 1.4MB PNG)
- `publisher` → should match the Organization schema above

---

## Blog System Audit

### Published articles

| Article | URL | Schema | OG image | Quality |
|---|---|---|---|---|
| What Is StudyRise? | `/blog/what-is-studyrise` | ✅ BlogPosting | ✅ WebP 79KB | ✅ Strong |
| How to Pass AMC MCQ in 4 Months | `/blog/how-to-pass-amc-mcq-in-4-months` | ✅ BlogPosting | ✅ WebP 80KB | ✅ Strong |

### Redirect / broken pages

| URL | Status | Fix |
|---|---|---|
| `/blog/how-to-create-a-study-plan` | ❌ Meta-refresh redirect linked as live article | Convert to 301 redirect via vercel.json; delete HTML file; update blog.html card |

### Blog hub (`/blog`) issues

1. **H1 keyword gap:** "StudyRise Blog" should include a target keyword phrase
2. **OG image:** Generic site OG image used; a blog-specific image ("Study Planning Guides") would improve social previews
3. **Broken article card:** Blog page presents `/blog/how-to-create-a-study-plan` as a live article, but that page is a redirect shell. Either update the card link to the real destination, or leave the card as "coming soon" until the actual article is written
4. **Coming-soon placeholders:** 4 placeholder article cards are visible with no content. These don't have links, so no SEO issue currently, but publishing real content would be high-value

### Content gap: the redirect suggests demand

The slug `/blog/how-to-create-a-study-plan` was presumably created because of demand for that topic. "How to create a study plan" is a high-volume evergreen query. There are two options:
- Write a genuine, general-audience article at this URL (separate from the AMC-specific guide)
- Permanently redirect to AMC guide (acceptable but wastes the broader keyword opportunity)

---

## Internal Linking Plan

### Current state

```
landing.html (/) → nav: /features, /pricing, /study-planner, /blog
                  footer: #top, #showcase, #faq, #how, #features (INTERNAL ANCHOR ONLY)

features.html → footer: /, /features, /pricing, /blog (missing /study-planner)
pricing.html  → footer: /, /features, /pricing, /blog (missing /study-planner)
blog.html     → footer: /, /features, /pricing, /study-planner, /blog ✓
study-planner.html → footer: /, /features, /pricing, /blog (missing /study-planner self — fine)

blog/what-is-studyrise.html → body: /features, /study-planner, /pricing
                               related: /blog/how-to-create-a-study-plan (broken redirect)
                               footer: /, /features, /pricing, /blog (missing /study-planner)

blog/how-to-pass-amc-mcq-in-4-months.html → body: multiple
                                              related: /study-planner (labeled "What is StudyRise?" — WRONG)
                                              footer: /, /features, /pricing, /blog (missing /study-planner)
```

### Issues

| Issue | Pages affected | Fix |
|---|---|---|
| Homepage footer links nowhere except same-page anchors | `landing.html` | Add footer links to `/features`, `/pricing`, `/blog`, `/study-planner` |
| Footer missing `/study-planner` | `features.html`, `pricing.html`, article pages | Add `/study-planner` to footer link lists |
| Wrong anchor text on related link | `how-to-pass-amc-mcq-in-4-months.html` | Fix "What is StudyRise? →" → should be `/blog/what-is-studyrise` |
| Related links pointing to redirect page | `what-is-studyrise.html`, `blog.html` | Update to link to destination or real content |

### Recommended link additions

- Every article footer/related section should link back to `/blog` (hub) and cross-link to the other article
- `/study-planner` should appear in all footers as it is the primary conversion page for non-signup users
- Consider adding a "Featured in" or "Also read" section on both blog articles pointing to the other

---

## Image SEO Recommendations

### Inventory

| File | Size | Format | Used by | Status |
|---|---|---|---|---|
| `public/og-image.png` | 198KB | PNG | All 4 marketing pages (OG image) | ⚠️ Convert to WebP; 198KB is large for a social image |
| `public/blog/what-is-studyrise-study-planner-og.webp` | 79KB | WebP | `what-is-studyrise.html` | ✅ |
| `public/blog/what-is-studyrise-study-planner-og.png` | 1.4MB | PNG | **NOTHING** | ❌ Delete this file |
| `public/blog/amc-mcq-4-month-study-plan-studyrise-og.webp` | 80KB | WebP | `how-to-pass-amc-mcq-in-4-months.html` | ✅ |
| `public/how-to-pass-amc-mcq-in-4-months.png` | Unknown | PNG | Unclear (not the OG image) | ⚠️ Verify usage or delete |
| App screenshots: `analytics.png`, `dashboard.png`, `plan.png`, `sr.png`, `today.png` | Various | PNG | Possibly landing.html | ℹ️ Convert to WebP for performance |

### Recommendations

1. **Delete `public/blog/what-is-studyrise-study-planner-og.png`** (1.4MB) — the WebP version exists and is in use. This file is referenced nowhere.

2. **Convert `public/og-image.png` to WebP** — save as `og-image.webp`, update all 4 marketing pages. Facebook and Twitter both support WebP for OG images. Size would likely drop from 198KB to ~40-60KB.

3. **Check `public/how-to-pass-amc-mcq-in-4-months.png`** — if not referenced by any page, delete it. If used, rename to match the slug pattern and convert to WebP.

4. **App screenshots** — if they appear in `landing.html`, convert to WebP with lazy loading (`loading="lazy"`) and explicit width/height attributes to prevent layout shift.

5. **sitemap.xml image entries** — both blog articles already have `<image:image>` entries in the sitemap pointing to their `.webp` OG images. This is correct.

6. **Alt text audit** — the full landing.html file (342KB) could not be read entirely. Run a crawl tool or grep to verify all `<img>` tags have non-empty `alt=""` attributes.

---

## Performance SEO (Code Level)

### Render-blocking resources

**`landing.html` loads 3 Google Font families:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
This is render-blocking on mobile and slow connections. The `preconnect` hints help but don't eliminate the block.

**`blog/what-is-studyrise.html` and `how-to-pass-amc-mcq-in-4-months.html` also load Google Fonts** — each article individually loads Inter. These should use `font-display: swap` (which Google Fonts does by default with `display=swap` parameter — already present ✅) but the connection itself is still blocking.

**Recommendations:**
- Self-host the fonts (download WOFF2 files, serve from Vercel CDN) — eliminates the third-party DNS lookup and connection overhead
- Alternatively: subset Inter to the weights and characters actually used; reduce from 3 families to 2 if DM Serif Display is only used for 1-2 headings

### Animation / CSS

`landing.html` contains heavy scroll-reveal animations, gradient glow effects, and CSS keyframe animations. These can cause:
- Layout Shift (CLS) if elements start hidden and shift in
- Paint-heavy GPU compositing for gradient animations

Verify Core Web Vitals (LCP, FID, CLS) with PageSpeed Insights after fixing the meta tags.

### Static page architecture

The Vercel rewrite architecture (static HTML at `/`, `/features`, etc.) is performant — no server-side rendering delay. ✅

### Bot-facing considerations

Since the marketing pages are static HTML (not React), they do not require JavaScript execution for crawlers to read content. This is a SEO advantage over SPAs. ✅

---

## Conversion and Trust Audit

| Element | Status | Notes |
|---|---|---|
| Social proof on homepage | Unknown | Full landing.html not inspected; page appears to include testimonial-style content based on H2 structure |
| Free plan clearly stated | ✅ | `/pricing` H1 "StudyRise is free"; `/study-planner` has "Free. No credit card needed." |
| CTA consistency | ✅ | Primary CTA consistently links to `/?auth=signup` across marketing pages |
| Disclaimer on blog | ✅ | Both articles have a "not medical advice" type disclaimer |
| FAQ on blog | ✅ | `/blog/what-is-studyrise` has FAQ section |
| Contact information | ⚠️ | `hello@studyrise.app` mentioned in legal docs; not visible on marketing pages |
| Legal pages | ✅ | `/terms` and `/privacy` exist; accessible without auth |
| HTTPS | ✅ | Assumed (Vercel provides HTTPS by default) |
| Security headers | ✅ | `X-Frame-Options: DENY` set globally in vercel.json |
| Trust signals (schema) | ❌ | No Organization schema with contact info or social profiles for Google Knowledge Panel |

---

## Content Positioning Recommendations

### Current positioning vs target

| Where | Current framing | Target framing |
|---|---|---|
| Homepage title | "StudyRise — Plan today. Rise tomorrow." | "StudyRise — Free Study Planner for Exams and University" |
| Homepage H1 | "Turn your syllabus into a plan you'll actually finish." | ✅ (already broad — no changes needed) |
| Features title | "Features — StudyRise Exam Study Planner" | "Features — StudyRise Study Planner" |
| Features H1 | "Everything you need to stay on track until exam day" | "Everything you need to plan, track, and stay consistent" |
| study-planner meta desc | "Turn your **exam** syllabus…" | "Turn your syllabus into a day-by-day schedule…" |
| index.html meta | "StudyRise is an exam study planner…" | Only affects SPA routes, not public pages — still worth updating |

### Keyword clusters to target

**Primary cluster — broad study planning:**
- "study planner app"
- "free study planner"
- "online study planner"
- "study schedule maker"
- "how to make a study schedule"

**Secondary cluster — university:**
- "university study planner"
- "semester study planner"
- "college study schedule app"
- "assignment tracker for students"

**Secondary cluster — exam prep:**
- "exam study plan"
- "AMC MCQ study plan" (already targeting via blog)
- "PLAB study schedule"
- "USMLE study planner"

**Long-tail / informational:**
- "how to create a study plan" (high volume — currently served by a redirect, opportunity for real article)
- "spaced repetition study app"
- "pomodoro study tracker"

### Pages mapped to clusters

| Cluster | Ideal page |
|---|---|
| Broad study planning | `/study-planner` (already positioned here) + `/` (need keyword in title) |
| University | Create `/university-study-planner` landing page OR improve existing `/study-planner` to mention university explicitly |
| AMC MCQ | `/blog/how-to-pass-amc-mcq-in-4-months` ✅ |
| "How to create a study plan" | New article at `/blog/how-to-create-a-study-plan` (currently wasted as a redirect) |
| App features | `/features` |

---

## Suggested Next Articles / Content Gaps

The blog is the highest-ROI SEO channel for StudyRise. Two articles published; many high-value topics unclaimed:

| Topic | Target query | Priority |
|---|---|---|
| General study plan guide | "how to create a study plan that works" | **P0** — reclaim the wasted slug |
| Spaced repetition explained | "what is spaced repetition" / "spaced repetition study technique" | **P1** — StudyRise's core differentiator |
| University semester planning | "how to plan your university semester" | **P1** — targets the USM user segment |
| Pomodoro technique for students | "pomodoro technique studying" | **P1** — search volume + internal link to app |
| PLAB 1 study plan | "PLAB 1 study plan" | **P2** — exam-specific like the AMC article |
| USMLE Step 1 study schedule | "USMLE Step 1 study schedule" | **P2** |
| How to use spaced repetition for medical exams | "spaced repetition medical school" | **P2** |
| Study planner vs to-do list | "study planner app vs todo list" | **P3** — comparison content for conversion |

---

## Targeted Opus Audit Recommendations

If running a deeper Opus-level audit, focus investigation on:

1. **Full `landing.html` content analysis** — the file is 342KB and could not be read in full. A deep audit should: inspect all `<img>` tags for alt text; verify all CTA links; check if any app route links exist; measure estimated DOM size (may be causing slow LCP).

2. **Live HTTP status verification** — verify that `/blog/how-to-create-a-study-plan` actually returns 200 (not 301) and that all sitemap URLs return 200. Curl-based check or Screaming Frog crawl would confirm.

3. **Core Web Vitals measurement** — run PageSpeed Insights on all 7 sitemap pages. Landing page animation complexity may cause CLS or LCP issues not visible from code alone.

4. **Backlink and index status** — check Google Search Console (if connected) for: which pages are indexed, which queries the site currently ranks for, crawl errors, and coverage issues.

5. **JSON-LD validation** — run all three JSON-LD blocks (blog CollectionPage, two BlogPosting schemas) through Google's Rich Results Test to confirm no validation errors.

6. **Duplicate content audit** — `landing.html` and `index.html` both have different canonical tags both pointing to `https://studyrise.app/`. Since they're served at different routes (landing.html at `/`, index.html at all other routes), this is technically correct, but should be verified that Google isn't seeing both.

7. **Site architecture crawl** — use Screaming Frog (free up to 500 URLs) to map all discovered URLs, verify redirect chains, identify orphaned pages, and confirm internal link equity flow.

---

## Action Plan

### Quick wins — same session (< 1 hour total)

| Action | File | Time |
|---|---|---|
| Add SEO `<head>` block to `landing.html` (description, canonical, OG, Twitter Card) | `public/landing.html` | 20 min |
| Update `landing.html` `<title>` to include keywords | `public/landing.html` | 2 min |
| Add footer links to `landing.html` (at minimum: `/features`, `/pricing`, `/blog`, `/study-planner`) | `public/landing.html` | 10 min |
| Fix `/blog/how-to-create-a-study-plan`: add `noindex` meta + fix canonical OR add 301 in vercel.json + delete HTML | `vercel.json` / `public/blog/how-to-create-a-study-plan.html` | 10 min |
| Fix wrong anchor text on AMC article related link | `public/blog/how-to-pass-amc-mcq-in-4-months.html` | 5 min |
| Delete 1.4MB unused PNG | `public/blog/what-is-studyrise-study-planner-og.png` | 1 min |
| Add `robots.txt` Disallow blocks for app routes | `public/robots.txt` | 5 min |

### Same-day (1–3 hours)

| Action | File | Time |
|---|---|---|
| Add JSON-LD schema to homepage (Organization + WebSite + WebPage) | `public/landing.html` | 20 min |
| Add JSON-LD WebPage schema to `/features`, `/pricing`, `/study-planner` | 3 HTML files | 20 min |
| Add SoftwareApplication schema to `/study-planner` | `public/study-planner.html` | 10 min |
| Broaden `/features` title and H1 from "exam" to general | `public/features.html` | 5 min |
| Update `/study-planner` meta description to mention university | `public/study-planner.html` | 5 min |
| Add `/study-planner` to footers on features, pricing, and article pages | 4 HTML files | 15 min |
| Fix blog.html article card link for "how-to-create-a-study-plan" | `public/blog.html` | 5 min |
| Update `sitemap.xml` lastmod dates to reflect actual publish dates | `public/sitemap.xml` | 10 min |
| Convert `og-image.png` to WebP and update references | `public/og-image.png` + 4 HTML files | 20 min |

### Larger tasks (1–2 days)

| Action | Notes |
|---|---|
| Write real article at `/blog/how-to-create-a-study-plan` | High-volume general query; existing slug has domain authority from blog.html link |
| Add blog-specific OG image for `/blog` hub | Replace generic og-image.png reference |
| Self-host Google Fonts (Inter + DM Serif Display) | Performance improvement; eliminates third-party connection |
| Add `apple-touch-icon.png` and `site.webmanifest` | Complete browser/device support; clean up robots.txt references |
| Cross-link both blog articles from each other | "Related articles" section |
| Improve `/blog` H1 to include target keyword | "Study Planning Guides and Exam Prep Articles" |

### Future (content and growth)

| Action | Notes |
|---|---|
| Write PLAB 1 and USMLE Step 1 study plan articles | High-intent exam-specific traffic |
| Write "What is spaced repetition?" explainer | Evergreen; core feature marketing |
| Write university semester planning guide | Supports USM product positioning |
| Add FAQ schema to homepage | Improves SERP rich result chance |
| Set up Google Search Console | Required to monitor index coverage and ranking |
| Create `studyrise.app/sitemap.xml` image sitemap entries for homepage and features page | Once hero images are added with alt text |
| Consider a "Start Here" or "New to StudyRise?" nav link | Conversion funnel for organic traffic |

---

## Final Checklist

| # | Item | Status |
|---|---|---|
| 1 | Homepage has meta description | ❌ Fix first |
| 2 | Homepage has canonical tag | ❌ Fix first |
| 3 | Homepage has OG/Twitter tags | ❌ Fix first |
| 4 | Homepage title includes keywords | ❌ Fix first |
| 5 | Homepage footer links to other pages | ❌ Fix first |
| 6 | `/blog/how-to-create-a-study-plan` handled correctly (301 or noindex) | ❌ Fix first |
| 7 | All blog articles have BlogPosting schema | ✅ |
| 8 | Blog hub has CollectionPage schema | ✅ |
| 9 | Homepage has Organization + WebSite schema | ❌ |
| 10 | `/features`, `/pricing`, `/study-planner` have WebPage schema | ❌ |
| 11 | sitemap.xml is valid and complete | ✅ (minor: duplicate lastmod) |
| 12 | robots.txt allows all marketing pages | ✅ |
| 13 | robots.txt blocks app routes | ❌ |
| 14 | robots.txt doesn't reference missing files | ❌ |
| 15 | OG images exist and are <200KB | ✅ (blog WebPs); ⚠️ og-image.png 198KB |
| 16 | 1.4MB unused PNG deleted | ❌ |
| 17 | All pages have unique, keyword-rich titles | ⚠️ (features page exam-only) |
| 18 | Internal footer links include `/study-planner` everywhere | ❌ |
| 19 | Blog article related links have correct anchor text and destinations | ❌ |
| 20 | Positioning uses "study planner for exams and university" framing | ⚠️ (inconsistent) |

---

*This report covers all 7 sitemap URLs plus the discovered redirect page at `/blog/how-to-create-a-study-plan`. Live HTTP status codes, Core Web Vitals, and search console data were not verified — those require access to Vercel/GSC or a live crawl tool.*


---
<!-- docnav-related -->
### Related docs
- [SEO Agent — Blog Hub Redesign](SEO%20Agent.md)
- [StudyRise — USM Diagnostic Prompts](USM_DIAGNOSTIC.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
