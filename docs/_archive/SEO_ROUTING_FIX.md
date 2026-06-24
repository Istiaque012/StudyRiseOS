# SEO Routing Fix — Homepage Native HTML (2026-06-19)

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


## Problem

The StudyRise homepage (`/`) was only reachable as native HTML by crawlers in theory — in practice, `index.html` at the repo root physically blocked the Vercel rewrite that would have served `public/landing.html`.

### Root Cause

Vercel evaluates rewrites **only when no physical file matches the requested path**. Because Vite produces `dist/index.html` as its build output, Vercel served that file at `/` — the React SPA shell — before the `"source": "/", "destination": "/landing.html"` rewrite could fire.

All other marketing pages (`/features`, `/pricing`, `/blog`) worked correctly because no physical files existed at those paths, allowing the rewrites to fire normally.

### SEO Impact (before fix)

| Issue | Detail |
|---|---|
| Crawler visibility | Googlebot had to execute JS + load the iframe to see homepage content |
| PageRank flow | Links inside an iframe don't reliably pass PageRank to the destination |
| Non-Google crawlers | Bing, GPTBot, CommonCrawl — less reliable with dynamically injected iframes |
| JSON-LD schema | `Organization` + `WebSite` schema inside an iframe is not associated with the root domain |
| Core Web Vitals | Double load cycle: React shell → iframe → landing.html = extra FCP/LCP penalty |

---

## Fix

### 1. Renamed `index.html` → `app.html`

The Vite SPA entry point was renamed so the build no longer produces `dist/index.html`. With no physical file at `/`, Vercel now evaluates rewrites and serves `dist/landing.html` natively.

```bash
# Before: build produced dist/index.html (shadowed the / rewrite)
# After:  build produces dist/app.html   (/ rewrite fires normally)
```

### 2. Updated `vite.config.js`

Added `input: 'app.html'` to `rollupOptions` so Vite knows the new entry point:

```js
build: {
  rollupOptions: {
    input: 'app.html',   // ← was 'index.html' (default)
    output: { manualChunks: { ... } }
  }
}
```

### 3. Updated `vercel.json`

Two changes:

```json
// Cache-control header source
{ "source": "/app.html", ... }   // was /index.html

// SPA fallback (catch-all)
{ "source": "/(.*)", "destination": "/app.html" }   // was /index.html
```

The `/ → /landing.html` rewrite was already present and correct — it just never fired before.

### 4. Added auth redirect to `public/landing.html`

Authenticated users who land on `/` (e.g. from a bookmark or external link) now get bounced into the app without seeing the marketing page. A synchronous inline script runs before any content paints:

```html
<script>
(function(){try{var s=[localStorage,sessionStorage];for(var i=0;i<s.length;i++){var st=s[i];for(var j=0;j<st.length;j++){var k=st.key(j);if(k&&/^sb-.+-auth-token$/.test(k)){var v=st.getItem(k);if(v){try{var d=JSON.parse(v);if(d&&d.access_token){window.location.replace('/settings');return;}}catch(e){}}}}}}catch(e){}})();
</script>
```

- Checks both `localStorage` and `sessionStorage` (Supabase `hybridStorage` uses either depending on the "Remember Me" setting)
- Redirects to `/settings` — the only route valid in all three app modes (exam, university, MBBS)
- `window.location.replace` so the back button skips the landing page

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | **Deleted** |
| `app.html` | **Created** (copy of deleted `index.html`) |
| `vite.config.js` | Added `input: 'app.html'` to `rollupOptions` |
| `vercel.json` | Updated two references: cache-header source + SPA fallback destination |
| `public/landing.html` | Added auth-redirect inline script in `<head>` |
| `CLAUDE.md` | Updated 3 spots: project structure entry, LandingPageStatic section, font-families note |

---

## Verification

```bash
npm run build
# ✓ dist/app.html exists (2.96 kB)
# ✓ dist/index.html does NOT exist
# ✓ dist/landing.html exists (copied from public/)
# 4211 modules transformed in 9.94s
```

### After deploying, do this in Google Search Console

1. Go to **URL Inspection** → enter `https://www.studyrise.app/`
2. Click **Request Indexing**
3. Check **Coverage** → confirm the page is indexed as "Discovered" or moves to "Crawled"
4. Optionally: **Sitemaps** → re-submit `sitemap.xml` to trigger a fresh crawl

> The sitemap URLs themselves are unchanged — public-facing URLs are identical before and after this fix. `index.html` / `app.html` are implementation details that crawlers never see directly.

---

## What Crawlers See Now

```
GET https://www.studyrise.app/
→ Vercel: no physical file at / → fires rewrite → serves dist/landing.html
→ Crawler gets: real HTML with all meta tags, JSON-LD, Open Graph, body content
→ No JavaScript required to see the page
```

Animations in `landing.html` still work for users (they load after HTML renders). Crawlers see the HTML without needing to execute the animation scripts.


---
<!-- docnav-related -->
### Related docs
- [StudyRise — Blog Article Master List](BLOG_ARTICLE_LIST.md)
- [StudyRise SEO Audit Report](SEO_AUDIT_REPORT.md)
- [Homepage SEO Fixes — 2026-06-19](SEO_HOMEPAGE_FIXES_2026-06-19.md)
- [StudyRise — SEO Master Blueprint](SEO_MASTER_BLUEPRINT.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
