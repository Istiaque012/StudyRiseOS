---
title: SEO Remediation 2026-06
type: strategy
sources: [raw/app-dev-sources/SEO-Remediation-2026-06-24.md]
created: 2026-06-25
updated: 2026-06-25
---

# SEO Remediation 2026-06

Live-site SEO audit of `https://www.studyrise.app/` (audit date 2026-06-24, GSC window 2026-05-25 → 2026-06-23). Eight issues across P0/P1/P2. **Root cause of both P0s:** URLs that should be static pages or redirects fall through to the React app catch-all, returning `200` with an empty shell (`<div id="root"></div>`) and a canonical pointing at the homepage.

**Owner key:** **[CONTENT]** = this wiki project produces the file/snippet. **[DEV]** = StudyRise app repo implements routing/redirects/deploy. Some need both.

## Issue Register

> **Implementation note (2026-06-25):** Repo was already ahead of the live audit on #2/#4 — the sitemap no longer lists the ghost `/amc-mcq-study-planner`; it lists `/amc-study-planner` (a real file). And `/study-planner` does not exist as a page. Fixes below reflect the actual repo state.

| # | Issue | Priority | Owner | Status |
|---|---|---|---|---|
| 1 | Renamed AMC article not redirected — ranking stranded on dead URL | **P0** | DEV | ✅ done — 301 added to `vercel.json` |
| 2 | `/amc-mcq-study-planner` ghost page | **P0** | CONTENT + DEV | ✅ done — already out of sitemap; removed stale dead rewrite from `vercel.json` |
| 3 | Homepage FAQ contradicts the freemium model + no FAQPage schema | **P1** | CONTENT | ✅ done — FAQ answer rewritten + `FAQPage` JSON-LD added |
| 4 | `/study-planner` missing from sitemap | **P1** | CONTENT + DEV | ✅ done — built the page (nav/footer/robots already referenced it), wired rewrite, added to sitemap |
| 5 | `/?auth=login` is indexed | **P1** | DEV | ✅ already handled — `X-Robots-Tag: noindex,nofollow` on `/?auth` in `vercel.json` |
| 6 | Homepage meta description is ungrammatical | **P2** | CONTENT | ✅ done |
| 7 | Em-dashes/colons stripped in `landing.html` | **P2** | CONTENT | ✅ done — hero lede, two feature blurbs, import FAQ re-punctuated |
| 8 | Homepage favicon relative path | **P2** | DEV | ✅ done — made absolute; bare-domain URLs already 308 → monitor |

## P0 — Losing traffic now

### #1 AMC article not redirected (DEV)
Old slug `/blog/how-to-pass-amc-mcq-in-4-months` holds all AMC traffic (**69 impressions, position ~22**) and is the source of every non-branded impression ("amc exam preparation", "amc preparation", "mcq preparation"). It now returns `200` empty shell with homepage canonical — no 301 to the new slug `/blog/amc-mcq-study-plan`. Link equity doesn't transfer; ranking decays. Fix — add to `vercel.json`:
```json
{ "redirects": [ { "source": "/blog/how-to-pass-amc-mcq-in-4-months", "destination": "/blog/amc-mcq-study-plan", "permanent": true } ] }
```
After deploy: confirm old URL returns `308/301`, then GSC URL Inspection → Request Indexing on the new slug. **Highest-value move on the site.**

### #2 Ghost `/amc-mcq-study-planner` (CONTENT + DEV)
Listed in `sitemap.xml` at priority `0.8` with its own OG image, but serves the empty SPA shell with homepage canonical — no content exists. Sitemap promises a page that isn't there.
- **Option A (preferred, CONTENT):** build the real static `/amc-mcq-study-planner` landing page — [EXAM]-audience commercial page targeting transactional "AMC MCQ study planner"; also gives the redirected #1 article a relevant internal-link target. Goes into [[Content Pipeline]].
- **Option B (interim, DEV):** remove the URL from `sitemap.xml` until the real page ships.
- **Recommendation:** Option B now (same deploy as #1), Option A scheduled.

## P1 — Accuracy & consolidation

### #3 Homepage FAQ contradicts freemium model (CONTENT)
"Is StudyRise free?" still uses retired positioning (paid tier "on the roadmap"). Current model: Pro is live — 30 days full access, then basic free forever, Pro for advanced. E-E-A-T / AI-Overview accuracy risk on the most-crawled page. Also **no `FAQPage` JSON-LD** = missed rich-result + AI-citation. Fix both together (schema text must mirror on-page copy). Confirm phrasing against [[Pricing Strategy]] (`11_PRICING_MODEL.md`); no "premium/unlock/free trial/upgrade" per [[Brand Voice]]. Draft answer:
> Yes — every new account gets 30 days of full access free, no card required. After that, the core planning, study logging, spaced repetition and mock tracking stay free for good. Advanced analytics and the AI Study Advisor are part of StudyRise Pro.

### #4 `/study-planner` (+ likely `/mbbs-bangladesh`) missing from sitemap (CONTENT → DEV)
`/study-planner` is live, indexed, ranking (**27 impressions, position ~6.8**) but absent from `sitemap.xml` — under-fed. Add `<url>` block (priority 0.8, monthly). `/mbbs-bangladesh` is `[VERIFY]` — confirm it returns `200` as a real static page (not SPA fallthrough) before adding. See [[MBBS Bangladesh Module]].

### #5 `/?auth=login` indexed (DEV)
Login entry point indexed (**27 impressions, 1 click**), competing in own SERPs. `robots.txt` blocks `/login`+`/register` but the `?auth=` query-param form on `/` is treated as separate. Fix: `?auth=` variants should canonicalise to `/` rather than self-reference.

## P2 — Polish

### #6 Meta description ungrammatical (CONTENT)
Missing connector after "schedule". Replacement (~155 chars, freemium-safe):
> Turn your syllabus into a day-by-day plan — tasks, spaced repetition, mocks and analytics in one workspace. Core features free, no card required.

### #7 Stripped em-dashes/colons in `landing.html` (CONTENT)
Processing artifact ate punctuation across homepage body copy (hero lede, feature blurbs, FAQ). Isolated to `landing.html` — `/blog/mbbs` renders correctly. Produce a find-and-replace patch list for DEV.

### #8 Favicon path + bare-domain URLs (DEV)
Homepage `<link rel="icon">` uses relative `assets/brand/favicon.svg` — make absolute `/assets/brand/favicon.svg`. Bare-domain (`studyrise.app`) URLs already 308 → `www`; just monitor they drop out of index.

## Follow-up — Verification pass (not done)
Spot-checked only via GSC, not page-by-page HTML: `/pricing`, `/features`, `/study-planner`, `/mbbs-bangladesh`. Given the retired pricing language in #3, re-check each for: (a) no "premium/unlock/free trial/early-access" language, (b) correct `www` canonical + `?auth=` CTAs, (c) GA snippet present, (d) real static page not SPA fallthrough.

## Execution Order
1. **#1** AMC 301 redirect [DEV] — one line, biggest payoff
2. **#2 Option B** pull ghost URL from sitemap [DEV] — same deploy
3. **#3** FAQ rewrite + FAQPage schema [CONTENT]
4. **#4** add `/study-planner` to sitemap; verify + add `/mbbs-bangladesh`
5. **#6 / #7** homepage meta + punctuation patch [CONTENT]
6. **#5 / #8** auth-param canonical + favicon path [DEV]
7. **#2 Option A** build real `/amc-mcq-study-planner` page [CONTENT]
8. Verification pass on the four marketing pages

## Sources
- [raw/app-dev-sources/SEO-Remediation-2026-06-24.md](../../raw/app-dev-sources/SEO-Remediation-2026-06-24.md)
