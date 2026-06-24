# 06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The exact process you follow to produce one complete, ready-to-deploy article. Follow it top to bottom every time. It pulls strategy from file 03, rules from file 04, the queue from file 05, and images from file 07 — and ends with a finished HTML file ready for file 08's deployment steps.

---

## The Five Phases

```
1. BRIEF      → confirm what we're making and why
2. RESEARCH   → live SERP + data, find the gap
3. OUTLINE    → structure approved before writing
4. WRITE      → draft following voice + SEO rules
5. BUILD      → assemble the final HTML file
```

For anything substantial, **pause after Phase 1 and Phase 3** for Istiaque's confirmation (consult-before-execute). Quick pieces can flow straight through — ask if unsure.

---

## Phase 1 — Brief

Before researching, lock these down. State them back to Istiaque in 4–5 lines.

- **Which piece?** Pull it from `05_CONTENT_PIPELINE.md` (number + title).
- **Primary keyword** it owns. Confirm no other page owns it.
- **Audience** ([EXAM]/[UNI]/[MBBS-BD]/[ALL]) and **intent** (T/C/I).
- **Slug** it will live at: `/blog/{slug}`.
- **Important or quick?** This decides hero-image treatment (file 07).

If anything's ambiguous, ask one question and stop. Don't assume.

---

## Phase 2 — Research (the part that makes content rank)

Do the real research. Never write from memory alone on anything factual.

**2.1 — Study the live SERP.** Search the primary keyword. Record:
- Does a **Google AI Overview** appear? What does it say, who does it cite?
- Top 3 ranking pages: their angle, H2 structure, rough length.
- **"People Also Ask"** questions — copy them verbatim; these become H2s.
- **"Related searches"** — secondary keywords to weave in.

Write the **differentiation statement**: *"This article beats what ranks because ___."* If you can't finish that sentence, change the angle.

**2.1b — Map the fan-out.** An AI engine doesn't answer the head query directly — it decomposes it into 3–6 narrower sub-queries, answers each, and synthesises. List the sub-queries your head keyword would fan out into, and make sure the page answers every one. Example: head `"amc mcq study plan"` fans out into:
- "how many questions per day amc"
- "amc mcq pass mark 2026"
- "amc mcq study schedule months"

Each fan-out sub-query must be answered by a **self-contained passage on the page** (a passage that stands alone without surrounding context, so an engine can lift it). Carry this list into Phase 3 — every sub-query needs its own extractable passage.

**2.2 — Use the connected data tools** (don't rely on guesses):
- **Google Trends** (`related_queries`, `interest_over_time`, `compare_terms`) — find rising sub-queries and seasonality. Use `geo` AU/GB/US/BD to match the segment.
- **Google Search Console** — is StudyRise already getting impressions for related terms? Any near-miss keyword (position 8–20) worth targeting?
- **Semrush** — if the plan allows, pull volume/difficulty/related keywords. If it returns a plan error, skip it and proceed; web + Trends + GSC cover it.
- **Web search/fetch** — verify every factual claim (exam dates, formats, pass rates, curriculum, fees) against **authoritative primary sources** (AMC, GMC, USMLE/ECFMG, BMDC, peer-reviewed research). Save the URLs — you'll link to them.

**2.3 — Accuracy gate.** For medical/exam/curriculum facts: if you cannot verify it from a credible source, do **not** state it. For BMDC curriculum specifics, follow the guardrail in file 03 — verify and confirm before writing.

---

## Phase 3 — Outline (approved before writing)

Produce a tight outline:
- **Working title** (the on-page H1; the `<title>` tag can differ slightly to fit 60 chars).
- **The direct-answer opening** — the 40–60 word paragraph that answers the query immediately (this is what earns the AI citation and respects the impatient reader).
- **H2/H3 structure** — map "People Also Ask" questions to H2s; logical flow; no skipped levels.
- **FAQ section** — 3–6 real questions (usually straight from PAA). Every FAQ answer LEADS with the direct answer in roughly 40 words or fewer (conclusion first), then may add one or two sentences of detail. AI engines cite a tight 40-word capsule and skip a 200-word essay.
- **Internal links** planned: which 2–3 StudyRise pages + which conversion surface.
- **External links** planned: which authoritative sources.
- **Where StudyRise is mentioned** naturally (mid-article + soft CTA near end).
- **Fan-out coverage:** every fan-out sub-query from 2.1b is answered in its own extractable passage (40–60 words, conclusion-first).

Get a thumbs-up on the outline for substantial pieces before drafting.

---

## Phase 4 — Write

Follow `02_BRAND_VOICE.md` to the letter. Key reminders:
- Lead every section with its answer.
- Short paragraphs (2–4 sentences). Vary sentence length.
- One concrete example per concept.
- Weave secondary/LSI keywords naturally — never stuff. If a sentence reads like it was written for a search engine, rewrite it for a person.
- Honest about difficulty and trade-offs. No invented statistics. No fabricated sources.
- Hit the target word count from file 05 as a guide, not a quota — completeness over length.
- For [MBBS-BD]: no gamification language; reflect the real BMDC system; clear, simple sentences.

---

## Phase 5 — Build the HTML File

Assemble everything into the template below. Then run the **Pre-Delivery Technical Gate** from `04_SEO_TECHNICAL_RULES.md`. Handle images per `07_IMAGE_PROTOCOL.md`. Deliver per `08_DEPLOYMENT_GUIDE.md`.

Before delivery, run `PRE_DEPLOY_CHECKLIST.md` — it verifies the page is actually served as static HTML and not the app shell.

---

## THE ARTICLE HTML TEMPLATE

The article skeleton is now **shell-based** — it *links* the shared stylesheet and behaviour script and *includes* the nav/footer partials instead of inlining everything. Copy this, fill every `{{...}}`, and remove guidance-only comments. The GA snippet stays exactly as-is. Full spec: `10_SITE_SHELL.md`.

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
  <!-- THUMBNAILS: write each .rcard's .rthumb with a plain gradient placeholder, e.g.
       <div class="rthumb" style="background:linear-gradient(135deg,#7C3AED,#2563EB)"></div>
       `python3 build_site.py` auto-fills it with the LINKED article's own og:image
       (read from that page's <meta property="og:image">), layered over the gradient as a
       fallback. No manual thumbnail step. A target with no resolvable og:image (off-site
       link or not-yet-built article) keeps the gradient and self-upgrades once it ships. -->

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

## After Building

1. Run the **Pre-Delivery Technical Gate** (file 04) — all boxes ticked.
2. Produce the **image deliverables** (file 07) — OG brief always; hero/in-article per rules.
   This includes **wiring the listing card thumbnails (Rule 4)**: point the blog-hub card and
   the category-page card for this slug at `/blog/images/{slug}-og.webp` so the hub never shows
   a blank gradient card. The deploy prompt (file 08, handoff item 7) does this automatically.
3. Hand off per **file 08** — and that handoff MUST include the ready-to-paste **Claude Code
   deploy prompt** (handoff item 7) that takes the article from file-placement through
   post-deploy verification in one paste. The only steps left to Istiaque are generating the
   OG image and clicking Request Indexing in GSC. Never make the deploy prompt optional and
   never split it across turns — deliver it with the file.
4. Run the **internal-link pass** (file 12). Read `12_INTERNAL_LINKS.md` §3–4: add the page's
   own outbound links (relevant landing page + 2–3 live sibling articles + the freemium CTA),
   then identify the 1–3 existing live pages that should link *in*. Inbound edits are produced
   from a **live fetch** of each target (never from memory) and delivered via the file 08
   handoff in sequenced sessions. Update `12_INTERNAL_LINKS.md` — add the registry row, the
   link-graph entry, and clear any resolved debt/worklist rows.
5. Update **file 05** — mark the piece 🟨/✅ and log it.

---

## A Note on Honesty Under Pressure

If research can't confirm a fact, the right move is to say so and leave it out — not to fill the gap with a confident guess. A single fabricated pass-rate or wrong exam date in a medical-niche article costs more trust than a dozen missing details. The brand's whole SEO edge is being the source experts don't wince at.


---
<!-- docnav-related -->
### Related docs
- [01 · CONTEXT — Read This First, Every Time](01_CONTEXT.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [03 · SEO STRATEGY — What to Make and Why](03_SEO_STRATEGY.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [09 · AUDIT PLAYBOOK — Periodic SEO Health Checks](09_AUDIT_PLAYBOOK.md)
- [Blog Page Animation & Motion Guide](BLOG_ANIMATIONS_GUIDE.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)
- [README — How to Use the StudyRise Content & SEO Brain](README.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
