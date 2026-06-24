# 10 · SITE SHELL — The Shared Frame Every Page Wears

> **What this file is.** The rulebook for StudyRise's shared page frame: one set of
> styles, one set of behaviours, one menu, one footer — inherited by every marketing
> page, the blog, and every article. Read it before building any page. It sits on top of
> `04_SEO_TECHNICAL_RULES.md` (the per-file gate) and `06_PRODUCTION_PLAYBOOK.md` (how to
> write an article). Nothing here overrides the non-negotiables in 01/04.

---

## 1. What the system is (plain version)

Four shared files give every page the same look and behaviour:

| File | Lives at | Job |
|---|---|---|
| `studyrise-core.css` | `/public/assets/studyrise-core.css` | All colours, fonts, buttons, nav, footer, heroes, prose, and the blog/article components. |
| `studyrise-chrome.js` | `/public/assets/studyrise-chrome.js` | Nav scroll, mobile menu, scroll reveal, reading-progress, table-of-contents, share buttons, notify form. All self-detecting. |
| `nav.html` | `/templates/partials/nav.html` | The menu markup. The one place menu links are defined. |
| `footer.html` | `/templates/partials/footer.html` | The footer markup, including the logo and tagline. |

**The rule of thumb:** every page links the two `/assets/` files and reproduces the two
partials verbatim. Change a colour → edit `core.css` once. Change a menu link → edit
`nav.html` once, re-upload it to the content project's knowledge, then regenerate the pages.

---

## 2. The shell model (linked assets + verbatim partials)

- **Styling & behaviour (linked):** pages *link* `studyrise-core.css` and
  `studyrise-chrome.js`. They are never copied inline. One file, one source of truth.
- **Nav & footer (verbatim):** pages reproduce `nav.html` and `footer.html` verbatim — see
  the rule below. There is no build step that swaps placeholders.

### Nav & footer — reproduce the partials verbatim (no build step)

Single source of truth: templates/partials/nav.html and templates/partials/footer.html.
Both are uploaded into the content project's knowledge so the authoring chat reads them
directly.

Authoring any page:
- Copy the current nav.html verbatim as the first element inside <body>, and footer.html
  verbatim just before the closing chrome.js script.
- Never hand-write, summarise, or reconstruct nav/footer from memory.
- Do NOT use `<!--#include nav-->` / `<!--#include footer-->` placeholders. There is no
  build step that resolves them.
- Footer logo is /assets/brand/studyrise-logo-deep.svg at 80px, directly above the exact
  tagline "Plan today. Rise tomorrow." There is no studyrise-logo-white.svg; if it
  appears, it is wrong.

When a partial changes: update it in templates/partials/, re-upload the changed file to
the content project's knowledge, then regenerate affected pages (or find-and-replace
across public/).

React public pages (legal): /privacy and /terms render inside the SPA, not as static HTML,
so they cannot copy the partials. They wear the same chrome via the React replicas
src/components/Landing/MarketingNav.jsx + MarketingFooter.jsx (kept visually in sync with
nav.html / footer.html). If you change the menu or footer, update those two components too.

Current menu: Features · Pricing · Blog. (Study Planner and Contact were removed from the
nav/footer until those pages exist — re-add a single <a> line in both marked spots of
nav.html, and the matching footer columns, when they ship.)

There is intentionally no build_site.py / build_blog.py include step in this content
project. Build tooling, if ever needed, belongs to the development project.

---

## 3. Golden rules

1. **Every page** links `studyrise-core.css` in `<head>` and `studyrise-chrome.js` before
   `</body>`. No exceptions.
2. **Compose from what exists first.** Before writing any CSS, build the page from the classes
   already in `core.css` (full list in **Appendix F — Component & Token Inventory**). Only write
   new CSS for things that genuinely aren't in the inventory (e.g. a feature-mode grid or a
   product mockup). Do **not** re-create a class that already exists (e.g. `.overline`, `.lede`,
   `.hero-cta`, `.cta-band`).
3. **Page-specific CSS** goes in **one small `<style id="page-styles">` block in the `<head>`** —
   never in the `<body>`, never in `core.css`. If that block is more than ~60 lines, you are
   probably reinventing the shell; stop and reuse.
4. **Never re-declare tokens or fonts.** Use the `var(--…)` tokens from `core.css` for every
   colour, gradient, shadow, and font (`var(--navy)`, `var(--blue)`, `var(--grad)`, `var(--fd)`,
   `var(--fs)`, `var(--fm)`). Do **not** define a parallel `:root { --… }` palette or hard-code
   `font-family:'Inter'` / `'Plus Jakarta Sans'`. A page that redefines the palette stops
   following a brand change made in `core.css`.
5. **Load the full font stack** (the shell uses all three): Plus Jakarta Sans 500–800 + Inter
   400–800 + JetBrains Mono 400–500. Drop one and bold text fakes itself and the footer's mono
   line falls back.
6. **Menu links** are edited only in `nav.html` (both the desktop and mobile lists).
7. **Footer logo** is the deep lockup (`/assets/brand/studyrise-logo-deep.svg`), 80px tall,
   directly above the tagline. The tagline reads exactly **"Plan today. Rise tomorrow."** —
   nothing else.
8. All the non-negotiables from 01/04 still apply on every page: GA snippet, `www`
   canonical, `?auth=` CTAs, early-access wording, the technical gate.

> **Why this section exists.** A builder that links `core.css` but cannot *see* its contents will
> reinvent it — its own classes, its own tokens, its own font rules — and the page drifts from the
> system even though every "rule" was followed. The two defences are: (1) read **Appendix F** (the
> class/token inventory travels with this file, so it is always available), and (2) keep
> `studyrise-core.css` and `studyrise-chrome.js` uploaded to the content project's knowledge so the
> builder can read the real styles. Do both.

---

## 4. Hero rule (which header a page gets)

| Page type | Hero |
|---|---|
| Marketing / conversion (`/features`, `/pricing`, `/contact`, segment landing) | **Dark** hero (`.hero-dark`) |
| Blog homepage, category pages, **all `[MBBS-BD]` pages** | **Light** hero (`.hero-light`) |
| Individual articles | **Article header** (`.art-head`) — kicker, H1, meta, share — not a hero |

`[MBBS-BD]` restraint is mandatory: those pages always use the calm light hero, never the
bold dark one.

---

## 5. Page-type recipes

Each recipe = the head schema + the body skeleton. All share nav, core.css, chrome.js, footer.

### 5.1 Marketing page → `public/{slug}.html` → `/{slug}`
- Schema: `WebPage` + `BreadcrumbList` (add `FAQPage` if a real Q&A is on the page).
- Body: `.hero-dark` (with `.hero-in` + `.overline` + `h1` + `.lede` + `.hero-cta`) → content
  sections in `.wrap` (use `.sh`, `.prose`, and the component classes in Appendix F) → `.cta-band`
  (with `.ctag` + `h2.display` + `.sub` + `.ctab`) → footer.
- **Full skeleton: Appendix G.** Compose the page from it and from Appendix F's classes; write
  page CSS only for genuinely new sections (feature grids, product mockups), in a small head
  `page-styles` block using `var(--…)` tokens.

### 5.2 Blog homepage → `public/blog.html` → `/blog`
- Schema: `Blog` + `BreadcrumbList`.
- Body: `.hero-light` with `.cats` tabs → `.featured` → `.grid` of cards → `.notify` →
  `.cta-band` → footer.
- Categories (locked): **Medical Licensing Exams · MBBS · University Courses · Study Skills**.

### 5.3 Category page → `public/blog/{category}.html` → `/blog/{category}`
- Schema: `CollectionPage` + `BreadcrumbList`.
- Body: `.hero-light` (category name as H1) with `.cats` (this category marked `is-all`) →
  `.grid` of that category's cards → `.cta-band` → footer.
- Slugs (locked): `/blog/medical-licensing-exams`, `/blog/mbbs`,
  `/blog/university-courses`, `/blog/study-skills`.

### 5.4 Article → `public/blog/{slug}.html` → `/blog/{slug}`
- Schema: `BlogPosting` + `BreadcrumbList` + `FAQPage` (mirrors the on-page FAQ exactly).
- Body: `.progress` bar → article header (`.art-head` with `.share`) → `.answer`
  (40–60 word direct answer) → `.art-wrap` [`.toc` + `.main`] where `.main` holds
  `.takeaways`, the `.prose` body (with `.figure` and one `.inline-cta`), and the `.faq` →
  `.related` (auto-filled by shared category/tag) → `.cta-band` → footer.
- Author stays the **StudyRise Organization** (no personal byline).
- The full article skeleton is the new template in `06_PRODUCTION_PLAYBOOK.md` (Appendix B).

---

## 6. Pre-Delivery Gate — added checks

In addition to the gate in `04_SEO_TECHNICAL_RULES.md`, every page must also satisfy:

- [ ] Links `/assets/studyrise-core.css` in `<head>` and `/assets/studyrise-chrome.js`
      before `</body>`.
- [ ] Contains the nav and footer reproduced verbatim from the partials (no
      `<!--#include nav-->` / `<!--#include footer-->` placeholders).
- [ ] Any page CSS is in **one small `<style id="page-styles">` in the `<head>`** — nothing in
      the `<body>`, no shared-chrome CSS duplicated.
- [ ] **No re-declared tokens or fonts:** the page defines no `:root { --… }` palette and
      hard-codes no `font-family`; it uses `var(--…)` from `core.css`.
- [ ] **Full font link present:** Plus Jakarta Sans 500–800 + Inter 400–800 + JetBrains Mono 400–500.
- [ ] **Reuses core classes** where they exist — `.overline` / `.lede` / `.hero-cta`, and a
      `.cta-band` with its `.ctag` + `.sub` + `h2.display`. Page CSS only for genuinely new components.
- [ ] Footer logo is the deep lockup at 80px; tagline is exactly "Plan today. Rise tomorrow."

---

## 7. How to add a link to the menu

1. Open `/templates/partials/nav.html`.
2. Add one `<a href="https://www.studyrise.app/{slug}">Label</a>` line in the
   **desktop** list (between the ADD/END markers) **and** the same line in the **mobile**
   list.
3. Re-upload the changed `nav.html` to the content project's knowledge, then regenerate the
   affected pages (or find-and-replace the nav block across `public/`) and deploy.

That's the whole job. Because the menu lives in one source file, every regenerated page
carries the same nav.

---

## 8. How to make a new page (worked example: "Mission & Vision")

This is the standard flow. Your part is two steps; the rest is automatic.

1. **Ask, in the content project:** *"Make a Mission and Vision page."* Add a sentence or
   two on what it should say, or let it be drafted for you.
2. Claude confirms the audience and angle, writes it in StudyRise voice, builds it on the
   **marketing-page recipe** (so it inherits nav, dark hero, footer, buttons, fonts),
   runs the technical gate, and hands back:
   - the finished file `public/mission.html`,
   - a one-line `vercel.json` rewrite (`/mission` → `public/mission.html`),
   - if it should appear in the menu, the `nav.html` line to add,
   - a ready-to-paste **Claude Code prompt** that places all of the above.
3. **Paste that prompt into Claude Code.** It writes the file, adds the rewrite, (optionally)
   adds the menu link, rebuilds, deploys.
4. Done — the page is live, matches the site, and is in the menu if you chose that.

> Company pages like Mission & Vision are commonly kept in the **footer** rather than the
> top menu, so the top menu stays focused on sign-up-driving links. Your call each time.

---

## APPENDIX A — Patch for the TWO gates: `04_SEO_TECHNICAL_RULES.md` **and** `PRE_DEPLOY_CHECKLIST.md`

These two files hold the same gate (04 is the spec; `PRE_DEPLOY_CHECKLIST.md` is the live
final gate that mirrors it). **Both** must get the shell checks, or the checklist actually run
before publish won't catch a missing shell.

**A.1 — `04_SEO_TECHNICAL_RULES.md`.** Add to the **Pre-Delivery Technical Gate** list:

```md
- [ ] Links `/assets/studyrise-core.css` (head) and `/assets/studyrise-chrome.js` (before </body>)
- [ ] Nav + footer present (via partials); no shared-chrome CSS duplicated inline
- [ ] Page CSS is one small `<style id="page-styles">` in the <head> — none in the <body>
- [ ] No re-declared tokens/fonts: no page `:root{ --… }`, no hard-coded font-family; uses var(--…)
- [ ] Full font link: Plus Jakarta Sans 500–800 + Inter 400–800 + JetBrains Mono 400–500
- [ ] Reuses core classes where they exist (.overline/.lede/.hero-cta; .cta-band with .ctag+.sub+h2.display)
- [ ] Footer logo = /assets/brand/studyrise-logo-deep.svg at 80px, directly above the tagline
- [ ] Footer tagline reads exactly "Plan today. Rise tomorrow."
```

Add a one-line pointer under the `<head>` Requirements table:

```md
| Shared shell | Every page links `studyrise-core.css` + `studyrise-chrome.js` and includes the nav/footer partials. Full spec: `10_SITE_SHELL.md`. |
```

**A.2 — `PRE_DEPLOY_CHECKLIST.md`.** Add these checks to **Section B — Technical gate**:

```md
- [ ] Links `/assets/studyrise-core.css` (head) + `/assets/studyrise-chrome.js` (before </body>); no shared-chrome CSS inlined.
- [ ] Page CSS is one small `<style id="page-styles">` in the <head> (none in <body>); no re-declared `:root` tokens or hard-coded fonts — uses var(--…).
- [ ] Full font link present (Plus Jakarta 500–800 + Inter 400–800 + JetBrains Mono 400–500); reuses core classes instead of re-creating them.
- [ ] Nav + footer present via partials; footer logo = `/assets/brand/studyrise-logo-deep.svg` at 80px above the tagline; tagline is exactly "Plan today. Rise tomorrow."
```

Note: Section A of the checklist already covers non-article pages (`public/{page}.html`); the
new page types (`public/blog.html`, `public/blog/{category}.html`) fit that rule as-is.

---

## APPENDIX B — Patch for `06_PRODUCTION_PLAYBOOK.md` (replace THE ARTICLE HTML TEMPLATE)

Replace the old inline-everything template with this shell-based skeleton. Fill every
`{{...}}`; the GA snippet stays exactly as-is.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{{TITLE — under 60 chars, primary keyword near front}}</title>
  <meta name="description" content="{{140–160 chars}}">
  <meta name="author" content="StudyRise">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://www.studyrise.app/blog/{{slug}}">

  <meta property="og:type" content="article">
  <meta property="og:site_name" content="StudyRise">
  <meta property="og:title" content="{{og title}}">
  <meta property="og:description" content="{{og description}}">
  <meta property="og:url" content="https://www.studyrise.app/blog/{{slug}}">
  <meta property="og:image" content="https://www.studyrise.app/blog/images/{{slug}}-og.webp">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{title}}">
  <meta name="twitter:description" content="{{description}}">
  <meta name="twitter:image" content="https://www.studyrise.app/blog/images/{{slug}}-og.webp">

  <link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-R38JK89PP5"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-R38JK89PP5');
  </script>

  <!-- SHARED SHELL -->
  <link rel="stylesheet" href="/assets/studyrise-core.css">

  <!-- JSON-LD: BlogPosting + BreadcrumbList + FAQPage (mirror on-page FAQ exactly) -->
  {{json-ld blocks}}

  <!-- page-only CSS, if any -->
  <style id="page-styles">{{optional small overrides}}</style>
</head>
<body>
  <div class="progress" id="progress" aria-hidden="true"></div>

  {{nav.html reproduced VERBATIM here — copy from templates/partials/nav.html; never a placeholder}}

  <header class="art-head">
    <a href="https://www.studyrise.app/blog/{{category-slug}}"><span class="kicker {{p-exam|p-mbbs|p-uni|p-skill}}">{{Category}}</span></a>
    <h1>{{H1 with primary keyword}}</h1>
    <div class="art-meta">
      <span>By StudyRise</span><span>·</span><span>{{n}} min read</span><span>·</span><span class="last-updated">Last updated: {{Month YYYY}}</span><!-- visible freshness line; MUST equal JSON-LD dateModified -->
      <div class="share" aria-label="Share this article">
        <a id="shareX" href="#" target="_blank" rel="noopener" aria-label="Share on X">{{x icon}}</a>
        <a id="shareFb" href="#" target="_blank" rel="noopener" aria-label="Share on Facebook">{{fb icon}}</a>
        <a id="shareLi" href="#" target="_blank" rel="noopener" aria-label="Share on LinkedIn">{{li icon}}</a>
        <button id="copyLink" aria-label="Copy link">{{link icon}}</button>
      </div>
    </div>
  </header>

  <div class="answer"><p>{{40–60 word direct answer, right under H1}}</p></div>

  <div class="art-wrap">
    <aside>
      <nav class="toc" id="toc" aria-label="On this page">
        <div class="toc-h">On this page</div>
        {{<a href="#id">Section</a> per H2}}
      </nav>
    </aside>
    <main class="main">
      <div class="takeaways"><h2>Key takeaways</h2><ul>{{3–4 bullets}}</ul></div>
      <article class="prose">
        {{body — H2s with id matching the TOC; lead each section with its answer;
          one .figure; one .inline-cta; 2–3 internal links + ≥1 verified external link}}
      </article>
      <section class="faq" id="faq">
        <h2>Frequently asked questions</h2>
        {{<details><summary>Q</summary><div class="ans">A (lead with the answer in ~40 words)</div></details> ×3–5}}
      </section>
    </main>
  </div>

  <section class="related">
    <h2>Keep reading</h2><p class="sub">{{category}}.</p>
    <div class="rgrid">{{3 .rcard auto-filled from shared category/tag}}</div>
  </section>

  <section class="cta-band">
    <div class="ctag"></div>
    <div class="wrap">
      <h2 class="display rev">{{value line}}</h2>
      <p class="sub rev">Start free — no card required. {{topic tie-in}}</p>
      <div class="ctab rev">
        <a class="btn bl blg" href="https://www.studyrise.app/?auth=register">Try StudyRise free</a>
        <a class="btn bol blg" href="https://www.studyrise.app/study-planner">See the study planner</a>
      </div>
    </div>
  </section>

  {{footer.html reproduced VERBATIM here — copy from templates/partials/footer.html; never a placeholder}}

  <script src="/assets/studyrise-chrome.js"></script>
</body>
</html>
```

---

## APPENDIX C — CHANGELOG entry (prepend to `CHANGELOG.md`)

```md
## 2026-06-21 (later)

- **New shared shell system + 10_SITE_SHELL.md.** Added a site-wide frame: studyrise-core.css
  (tokens, nav, footer, buttons, type, heroes, prose, blog/article components) and
  studyrise-chrome.js (nav scroll, mobile menu, reveal, reading-progress, TOC, share, notify
  form — all feature-detected) at /public/assets/; nav.html + footer.html partials at
  /templates/partials/ as the single source of truth for menu and footer (injected at build
  via #include placeholders). Every page now links the two assets and includes the partials.
- **Page-type recipes locked** (marketing / blog index / category / article) in 10_SITE_SHELL.md.
- **Hero rule:** marketing = dark hero; blog + all [MBBS-BD] pages = light hero; articles use
  the article header.
- **Footer brand fixed:** deep lockup /assets/brand/studyrise-logo-deep.svg at 80px, directly
  above the tagline; tagline trimmed to "Plan today. Rise tomorrow." (Resolves the broken
  footer logo — the old studyrise-logo-white.svg never existed.)
- **Fonts:** Plus Jakarta Sans added site-wide for display headings (was Inter-only).
- **Blog categories locked:** Medical Licensing Exams, MBBS, University Courses, Study Skills,
  each with a real category page (/blog/medical-licensing-exams, /blog/mbbs,
  /blog/university-courses, /blog/study-skills).
- **04 gate extended** with shared-shell checks; **06 article template replaced** with the
  shell-based skeleton.
- **Menu = Features · Pricing · Blog** (Study Planner and Contact removed until those pages exist); the menu is edited in one place (nav.html).
- **Brain files synced to the shell:** PRE_DEPLOY_CHECKLIST.md (mirror gate), 09 (audit
  spot-check), 08 (non-article page types + asset/partial dependency), 01/README/DOCS_MAP
  (file index), all updated. 05 adds the blog hub + 4 category pages to the queue. 07 image-brief
  font switched to Plus Jakarta Sans for headings. MOTION_GUIDE + BLOG_ANIMATIONS_GUIDE now
  cross-reference studyrise-chrome.js as the source of truth for motion.
- **Deferred:** 03_SEO_STRATEGY.md category taxonomy / keyword→URL placement — pending keyword
  research; to be updated in a later session.
- **Anti-drift hardening (after the /features page reinvented the design system):** added
  Appendix F (Component & Token Inventory) and Appendix G (full marketing-page skeleton) to
  10_SITE_SHELL.md; strengthened the Golden Rules and the gate (04 + PRE_DEPLOY_CHECKLIST) to
  forbid re-declared `:root` tokens / hard-coded fonts, require page CSS in one small head
  `page-styles` block, require the full 3-font stack, and require reuse of existing core classes.
  Process: keep studyrise-core.css + studyrise-chrome.js uploaded to the content project so the
  builder can read the real styles.
```

---

## APPENDIX D — Installing it (two destinations)

This change lands in **two separate places** — keep them straight:

1. **The website** (`public/`, `templates/`) — the shell files that make pages render:
   `studyrise-core.css`, `studyrise-chrome.js`, `nav.html`, `footer.html`.
2. **The brain** (`docs/seo_content_brain/`) — the documentation: **this file goes to
   `docs/seo_content_brain/10_SITE_SHELL.md`**, plus the patches to `04`, `06`, `01`, and the
   `CHANGELOG` entry (Appendices A, B, C above). The brain is the source of truth; after Claude
   Code edits it in the repo, **re-upload the changed `.md` files to BOTH Claude Projects** so
   the projects match the repo.

Claude Code can do both — the brain files live in the same repo. The complete, ready-to-paste
prompt is also delivered as the standalone file **`CLAUDE_CODE_INSTALL.md`**; it is reproduced
here so this rulebook stays self-contained. Every step is spelled out, including the 05 / 07 /
motion-guide edits. The few large blocks point back to the appendices above (06 template →
Appendix B, 05 section → Appendix E.1, CHANGELOG → Appendix C); everything else is written out.

```text
Install the StudyRise "shared shell" system in this repo. Do PARTS 1–3 in order, then STOP and
report. Do NOT deploy until I confirm.

I am providing five files: studyrise-core.css, studyrise-chrome.js, nav.html, footer.html,
10_SITE_SHELL.md.

PART 1 — WEBSITE FILES
1. Place these exactly:
   - public/assets/studyrise-core.css
   - public/assets/studyrise-chrome.js
   - templates/partials/nav.html
   - templates/partials/footer.html
2. Confirm public/assets/brand/studyrise-logo-deep.svg exists. If its filename contains a space,
   rename it to studyrise-logo-deep.svg (no spaces).
3. Build injection: update build_blog.py (or add build_site.py) so that for EVERY page it
   outputs, it replaces <!--#include nav--> and <!--#include footer--> with the contents of
   templates/partials/nav.html and templates/partials/footer.html. Apply to articles AND to
   marketing / blog / category pages.
   [SUPERSEDED — historical: the <!--#include--> / build_site.py injection step was retired in
   favour of reproducing nav.html/footer.html VERBATIM into each page; there is no build step in
   this content project. Kept here as bootstrap history only — see the current rule above.]
4. Do NOT create index.html at the repo root (it would shadow / -> public/landing.html).

PART 2 — BRAIN FILES (docs/seo_content_brain/ unless noted)
5. Place the rulebook FIRST: save 10_SITE_SHELL.md to docs/seo_content_brain/10_SITE_SHELL.md.
   Large blocks below are copied VERBATIM from its appendices.
6. 06_PRODUCTION_PLAYBOOK.md: replace the entire "THE ARTICLE HTML TEMPLATE" block with the
   skeleton in Appendix B.
7. 05_CONTENT_PIPELINE.md: insert the "BLOG HUB + CATEGORY PAGES" section and the maintenance-log
   line from Appendix E.1, right after the "SEGMENT LANDING PAGES" section.
8. CHANGELOG.md: prepend the entry in Appendix C.
9. 04_SEO_TECHNICAL_RULES.md — add to the "Pre-Delivery Technical Gate" list:
   - [ ] Links /assets/studyrise-core.css (head) and /assets/studyrise-chrome.js (before </body>)
   - [ ] Nav + footer present (via partials); no shared-chrome CSS duplicated inline
   - [ ] Footer logo = /assets/brand/studyrise-logo-deep.svg at 80px, directly above the tagline
   - [ ] Footer tagline reads exactly "Plan today. Rise tomorrow."
   ...and add this row under the <head> Requirements table:
   | Shared shell | Every page links studyrise-core.css + studyrise-chrome.js and includes the nav/footer partials. Full spec: 10_SITE_SHELL.md. |
10. PRE_DEPLOY_CHECKLIST.md — add to "Section B — Technical gate" (mirrors 04; MUST match it):
    - [ ] Links /assets/studyrise-core.css (head) + /assets/studyrise-chrome.js (before </body>); no shared-chrome CSS inlined.
    - [ ] Nav + footer present via partials; footer logo = /assets/brand/studyrise-logo-deep.svg at 80px above the tagline; tagline is exactly "Plan today. Rise tomorrow."
11. 09_AUDIT_PLAYBOOK.md — add to the "Technical spot-check" list:
    - [ ] Page links /assets/studyrise-core.css and /assets/studyrise-chrome.js
    - [ ] Footer logo src = /assets/brand/studyrise-logo-deep.svg (not the old missing white logo)
12. 08_DEPLOYMENT_GUIDE.md — add a short note that non-article page types now exist, each needing
    its own vercel.json rewrite: marketing public/{slug}.html -> /{slug}; blog hub
    public/blog.html -> /blog; category public/blog/{category}.html -> /blog/{category}; and that
    every page depends on the two /assets/ files and the injected nav/footer partials.
13. 01_CONTEXT.md — add a row to the "Files in This Brain" table:
    | 10 | SITE_SHELL | Building any page — the shared frame |
    ...and add 10_SITE_SHELL.md to the related-docs list.
14. README.md — in "How the Files Fit Together", add: 10 SITE_SHELL → the shared frame every page wears.
15. docs/DOCS_MAP.md — add 10_SITE_SHELL.md to the seo_content_brain file list.
16. 07_IMAGE_PROTOCOL.md — in the Canva/ChatGPT Brief Template, change the Font line to:
    Font:         Plus Jakarta Sans (700/800 for headings); Inter for any smaller body text
17. MOTION_GUIDE.md AND BLOG_ANIMATIONS_GUIDE.md — prepend this note to the top of BOTH:
    > Implementation note (2026-06-21). The motions described in this guide are now implemented
    > centrally in /assets/studyrise-chrome.js and /assets/studyrise-core.css — scroll reveal
    > (.rev), the reading-progress bar, sticky table-of-contents highlighting, and the
    > prefers-reduced-motion fallback. Treat this guide as the design intent; the shared shell
    > files are the source of truth for the actual behaviour. See 10_SITE_SHELL.md.

DEFERRED — do NOT touch 03_SEO_STRATEGY.md (separate keyword-research session).

PART 3 — VERIFY & REPORT
18. Confirm no index.html at the repo root.
19. Rebuild; confirm the nav/footer placeholders were injected into at least one output page
    (not the empty app shell).
20. List every changed file, split into "Website" and "Brain".
21. STOP — do not deploy. After I confirm, remind me to re-upload these brain .md files to BOTH
    Claude Projects: 10_SITE_SHELL, 04, PRE_DEPLOY_CHECKLIST, 06, 05, 01, 09, 08, 07, README,
    DOCS_MAP, MOTION_GUIDE, BLOG_ANIMATIONS_GUIDE, CHANGELOG. (03 is deferred — not changed.)
```

---

## APPENDIX E — Part 2b approved edits (05, 07, motion guides)

### E.1 — `05_CONTENT_PIPELINE.md`

Add this section (after the "SEGMENT LANDING PAGES" section; category hubs are distinct from
the transactional landing pages):

```md
## BLOG HUB + CATEGORY PAGES (shared-shell rebuild)

The blog index and its four category hubs, built on the blog-homepage / category recipes in
`10_SITE_SHELL.md`. The hub anchors internal linking from every article — build it first, then
each category page once that category has ~3+ articles. Keyword / IA mapping for the category
pages is pending the `03_SEO_STRATEGY.md` update (deferred).

| Page | Deliverable | Audience | Status | Notes |
|---|---|---|---|---|
| Blog hub `/blog` | `public/blog.html` + `/blog` rewrite | [ALL] | ⬜ Not started | Blog-homepage recipe (file 10): featured + grid + category tabs + get-notified + CTA. |
| `/blog/medical-licensing-exams` | `public/blog/medical-licensing-exams.html` + rewrite | [EXAM] | ⬜ Not started | Category recipe (file 10). |
| `/blog/mbbs` | `public/blog/mbbs.html` + rewrite | [MBBS-BD] | ⬜ Not started | Category recipe; light hero + [MBBS-BD] restraint. |
| `/blog/university-courses` | `public/blog/university-courses.html` + rewrite | [UNI] | ⬜ Not started | Category recipe (file 10). |
| `/blog/study-skills` | `public/blog/study-skills.html` + rewrite | [ALL] | ⬜ Not started | Category recipe (file 10). |
```

Add to the **Maintenance Log** table:

```md
| 2026-06-21 | Queued | Blog hub + 4 category pages | Added under the shared-shell framework (file 10). |
```

### E.2 — `07_IMAGE_PROTOCOL.md`

In the **Canva / ChatGPT Brief Template**, change the `Font:` line:

```md
Font:         Plus Jakarta Sans (700/800 for headings); Inter for any smaller body text
```

(was: `Font:  Inter (700/800 for headings)`). Reason: the live site and the shared shell use
Plus Jakarta Sans for display headings; image text should match. Body/supporting text stays
Inter. Note for later: `BRAND_KIT.md` may still list Inter for headings — reconcile there too
(that's a brand-asset file, handled outside this content project).

### E.3 — `MOTION_GUIDE.md` **and** `BLOG_ANIMATIONS_GUIDE.md`

Prepend this note to the top of **both** files (just under the title):

```md
> **Implementation note (2026-06-21).** The motions described in this guide are now implemented
> centrally in `/assets/studyrise-chrome.js` and `/assets/studyrise-core.css` — scroll reveal
> (`.rev`), the reading-progress bar, sticky table-of-contents highlighting, and the
> `prefers-reduced-motion` fallback. Treat this guide as the design *intent*; the shared shell
> files are the source of truth for the actual behaviour. Don't hand-reimplement these per page.
> See `10_SITE_SHELL.md`.
```

---

## APPENDIX F — Component & Token Inventory (read before styling any page)

This is the vocabulary `core.css` already provides. **Compose from these. Do not re-create them
and do not invent parallel tokens.** If something you need is not here, it is a genuine
page-specific component — write it in the page's small head `page-styles` block, using the tokens
below.

**Design tokens (use `var(--…)`; never re-declare):**
- Colour: `--navy --navy2 --blue --blue2 --cyan --purple` · surfaces `--bg --bg2 --surface` ·
  tints `--soft-blue --soft-purple --soft-green --soft-amber` · lines `--border --border2` ·
  text `--ink --ink3 --ink4 --ink5 --ink6` · status `--green --amber --red`
- Brand: `--grad` (the StudyRise gradient)
- Shadow: `--shadow-soft --shadow-lift`
- Fonts: `--fs` (Inter, body) · `--fd` (Plus Jakarta Sans, display/headings) · `--fm` (JetBrains Mono, overlines/labels)
- Layout: `--wrap` (max content width) · `--measure` (reading width)

**Layout:** `.wrap` (centred container) · `section`

**Type & helpers:** `.display` (big display heading) · `.accent` · `.ag` (gradient text) ·
`.overline` (mono eyebrow) · `.lede` (intro paragraph) · `.ey` (eyebrow with rule) ·
`.sh` / `.sh.cx` (section-heading block, `.cx` = centred)

**Buttons:** `.btn` + one of `.bp` (primary blue) · `.bg` (ghost on light) · `.bl` (white, for
dark backgrounds) · `.bol` (outline, for dark backgrounds); size modifier `.blg` (large)

**Nav & footer:** provided by the partials — never rebuild. (`.nav .brand .wm .nl .nc .mob-menu`;
`.foot .fg .flogo .ptag .fsoc .flegal`.)

**Heroes:** `.hero-dark` (marketing) and `.hero-light` (blog / `[MBBS-BD]`), each with `.hbg`
(glow layer), `.hero-in`, `h1`, `.lede`, and **`.hero-cta`** (the hero button row — use this, not
`.ctab`).

**Prose:** `.prose` styles all nested `h2 h3 a strong ul ol blockquote code pre img table` — wrap
article/long-form body copy in it.

**CTA band:** `.cta-band` with `.ctag` (radial glow), `h2.display`, `.sub` (sub-paragraph), and
`.ctab` (button row). Use all four parts.

**Scroll reveal:** `.rev` (fades up when in view; needs `studyrise-chrome.js`); stagger with
`data-d="1|2|3"`.

**Blog / article components:** tabs `.cats .cat(.is-all)` · pills `.pill` + `.p-exam .p-mbbs
.p-uni .p-skill` · featured `.featured .fcard .fthumb .fbody .meta` · grid `.seg-head .grid .card
.thumb .cbody` · notify `.notify .nform .nnote .nok` · article `.progress`, `.art-head .kicker
.art-meta .share`, `.answer`, `.art-wrap .toc .main`, `.takeaways`, `.figure`, `.inline-cta`,
`.faq`, `.related .rgrid .rcard .rthumb`.

> If you catch yourself writing `--ft-navy`, `ft-kicker`, `ft-lead`, or a second `:root{}` — stop.
> `--navy`, `.overline`, and `.lede` already exist. That duplication is exactly the drift this
> inventory prevents.

---

## APPENDIX G — Marketing page skeleton (compose from this)

Fill every `{{...}}`. The page CSS lives in **one small `<style id="page-styles">` in the `<head>`**
and uses `var(--…)` only — for sections that aren't in Appendix F (feature grids, product mockups).
GA snippet stays exactly as-is.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{{TITLE — under 60 chars}}</title>
  <meta name="description" content="{{140–160 chars}}">
  <meta name="author" content="StudyRise">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://www.studyrise.app/{{slug}}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="StudyRise">
  <meta property="og:title" content="{{og title}}">
  <meta property="og:description" content="{{og description}}">
  <meta property="og:url" content="https://www.studyrise.app/{{slug}}">
  <meta property="og:image" content="https://www.studyrise.app/{{slug}}-og.webp">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{title}}">
  <meta name="twitter:description" content="{{description}}">
  <meta name="twitter:image" content="https://www.studyrise.app/{{slug}}-og.webp">

  <link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- FULL font stack — all three families, do not trim -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-R38JK89PP5"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-R38JK89PP5');
  </script>

  <!-- SHARED SHELL -->
  <link rel="stylesheet" href="/assets/studyrise-core.css">

  <!-- JSON-LD: WebPage + BreadcrumbList (+ FAQPage only if a real on-page FAQ exists) -->
  {{json-ld blocks — all URLs https://www.studyrise.app/...}}

  <!-- Page-specific CSS ONLY. Uses var(--…); no :root, no hard-coded fonts. Keep it small. -->
  <style id="page-styles">
    /* e.g. .mode-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px}
       Colours/fonts come from tokens: color:var(--ink); font-family:var(--fd); background:var(--grad); */
  </style>
</head>
<body>

  {{nav.html reproduced VERBATIM here — copy from templates/partials/nav.html; never a placeholder}}

  <header class="hero-dark">
    <div class="hbg"></div>
    <div class="wrap hero-in">
      <span class="overline">{{Kicker}}</span>
      <h1 class="display">{{H1}}</h1>
      <p class="lede">{{One- or two-sentence promise}}</p>
      <div class="hero-cta rev">
        <a class="btn bl blg" href="https://www.studyrise.app/?auth=register">Try StudyRise free</a>
        <a class="btn bol blg" href="#{{anchor}}">{{secondary}}</a>
      </div>
    </div>
  </header>

  <section class="wrap" id="{{anchor}}">
    <div class="sh cx rev"><span class="overline">{{eyebrow}}</span><h2 class="display">{{section title}}</h2><p class="lede">{{section lede}}</p></div>
    {{content — reuse Appendix F components; only new sections get page-styles CSS}}
  </section>

  <!-- optional FAQ (only if real Q&A; then add FAQPage schema mirroring it) -->
  <section class="faq wrap" id="faq">
    <h2>{{Questions, answered.}}</h2>
    {{<details><summary>Q</summary><div class="ans">A</div></details> ×N}}
  </section>

  <section class="cta-band">
    <div class="ctag"></div>
    <div class="wrap">
      <h2 class="display rev">{{value line}}</h2>
      <p class="sub rev">Start free — no card required. {{tie-in}}</p>
      <div class="ctab rev">
        <a class="btn bl blg" href="https://www.studyrise.app/?auth=register">Try StudyRise free</a>
        <a class="btn bol blg" href="https://www.studyrise.app/study-planner">See the study planner</a>
      </div>
    </div>
  </section>

  {{footer.html reproduced VERBATIM here — copy from templates/partials/footer.html; never a placeholder}}

  <script src="/assets/studyrise-chrome.js"></script>
</body>
</html>
```
