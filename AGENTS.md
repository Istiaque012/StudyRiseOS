# StudyRiseOS — LLM Wiki Schema

> This file tells Codex how the wiki is structured and how to operate on it.
> Co-evolved by Istiaque and Codex. Last updated: 2026-07-03.

---

## Architecture

Three layers:

### 1. `raw/` — Immutable Sources
Your curated collection of source documents. Codex reads from these but **never modifies** them.

| Subfolder | What goes here |
|---|---|
| `raw/brain-v1/` | Original StudyRise Content & SEO Brain files — twelve numbered files (01–12) plus companions (10A–10D) + MBBS docs + planning + deployment |
| `raw/competitor-clips/` | Web-clipped competitor articles (use Obsidian Web Clipper) |
| `raw/keyword-research/` | GSC exports, Semrush dumps, keyword spreadsheets |
| `raw/social-references/` | Social media posts, campaign screenshots, marketing references |
| `raw/app-dev-sources/` | Architecture docs, API references, technical articles |
| `raw/assets/` | Images from clipped articles |

### 2. `wiki/` — LLM-Generated Wiki
Codex owns this layer entirely. Codex creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; Codex writes it.

| Subfolder | What lives here |
|---|---|
| `wiki/entities/` | Entity pages — competitors, platforms, tools, people |
| `wiki/keywords/` | Keyword analysis pages — clusters, gaps, opportunities |
| `wiki/content/` | Content summaries — articles, social posts, campaigns, content calendar |
| `wiki/strategy/` | Synthesized strategy pages — SEO strategy, marketing strategy, growth plans |
| `wiki/app-dev/` | App development wiki — architecture, features, decisions, build status |

### 3. This file (`AGENTS.md`) — The Schema
Tells Codex how the wiki is structured, what conventions to follow, and what workflows to run.

---

## Wiki Page Conventions

Every wiki page uses this format:

```markdown
---
title: Page Title
type: entity | keyword | content | strategy | app-dev | overview | comparison
sources: [list of raw/ files this page draws from]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Page Title

Body content with [[wikilinks]] to other wiki pages.

## Sources
- Links to raw source files this page synthesizes from
```

### Rules
- Use `[[wikilinks]]` for all cross-references between wiki pages (Obsidian resolves these)
- Every wiki page must be listed in `wiki/index.md`
- Every operation must be logged in `wiki/log.md`
- When updating a page, always update the `updated:` frontmatter date
- Prefer updating existing pages over creating new ones
- Flag contradictions explicitly: `⚠️ CONTRADICTION: [old claim] vs [new claim] — source: [file]`

---

## Operations

### INGEST — Adding a new source

When the user says "ingest [source]" or drops a file in `raw/`:

1. Read the source file completely
2. Discuss key takeaways with the user (brief, 3-5 bullets)
3. Create or update a summary in the appropriate `wiki/` subfolder
4. Update `wiki/index.md` — add new entries or update summaries
5. Update ALL relevant existing wiki pages that this source touches:
   - Entity pages for any entities mentioned
   - Keyword pages for any keyword data
   - Strategy pages if strategic insights are present
   - App-dev pages if technical information is present
6. Append an entry to `wiki/log.md`
7. Report: "Updated X pages, created Y new pages"

A single source typically touches 5-15 wiki pages. Don't be conservative — update everything relevant.

### QUERY — Answering questions

When the user asks a question:

1. Read `wiki/index.md` to find relevant pages
2. Read the relevant wiki pages (usually 2-5)
3. Synthesize an answer with `[[wikilinks]]` to sources
4. If the answer reveals a useful synthesis, offer to file it as a new wiki page
5. If the answer required going to raw sources (wiki was insufficient), update the wiki pages with the missing information

### LINT — Health check

When the user says "lint the wiki" or "health check":

1. Scan for contradictions between pages
2. Find orphan pages (no inbound `[[wikilinks]]`)
3. Find missing pages (referenced by `[[wikilink]]` but don't exist)
4. Check for stale claims that newer sources have superseded
5. Identify gaps — important topics mentioned but lacking their own page
6. Suggest new sources to look for
7. Report findings and fix what can be fixed automatically

### END-OF-SESSION CAPTURE RITUAL

At the **end of every session** — not only INGEST, but any work session — before reporting done, append to `wiki/log.md` in this exact format:

```
## [YYYY-MM-DD] type | summary | files
```

Where `type` ∈ {ingest, deploy, fix, audit, strategy, refactor}, `summary` is one line, and `files` lists wiki pages created or changed during the session. Then: if any new wiki page was created, update `wiki/index.md` with its catalog entry.

This is mandatory. No session ends without a log entry.

### PROMOTION RULE

Before starting work, grep `wiki/log.md` for recurring corrections. If the **same correction** appears 3+ times, promote it before doing anything else:

1. Add the rule to the relevant numbered RULEBOOK file in `raw/brain-v1/` (01–12), written once, authoritatively
2. Log the promotion in `raw/brain-v1/CHANGELOG.md`
3. Replace the scattered restatements in wiki pages with a `[[wikilink]]` to the new authoritative rule

The point: a repeated fix becomes a permanent rule so it stops recurring.

### LINT CADENCE

Run the LINT operation at the start of each calendar month **or** after 5+ ingest/deploy operations since the last lint, whichever comes first. The agent checks the most recent `## [YYYY-MM-DD] audit` entry in `wiki/log.md` to decide if one is due.

---

## Special Files

### `wiki/index.md`
Content-oriented catalog. Every wiki page listed with link, one-line summary, and category. Codex updates this on every ingest. **Read this first** when answering any query.

### `wiki/log.md`
Chronological, append-only. Each entry:
```
## [YYYY-MM-DD] action | Title
Description of what happened. Pages created/updated listed.
```

---

## Domain-Specific Conventions

### SEO & Content
- Keyword pages include: volume, difficulty, current ranking, target URL, status (targeted/published/gap)
- Content pages include: status (idea/draft/scheduled/published), target keywords, platform (blog/social/email), publish date
- Always note which audience segment: [EXAM], [UNI], [MBBS-BD]

### App Development
- Feature pages track: status (planned/in-progress/shipped), session reference, related migrations
- Decision pages are append-only — never overwrite a decision, add a superseding note
- Always reference the build session (R0-R9) when applicable

### Marketing & Social
- Campaign pages include: platform, audience, goal, status, performance metrics (when available)
- Social post pages link to the blog article or feature they promote
- Track cross-channel promotion (blog → social → email chain)

---

## Content Generation Workflow

The wiki drives content creation for the StudyRise website and app. The website+app repo lives at `/Users/istiaque/Downloads/StudyRIse Main/StudyRise App` (GitHub: `Istiaque012/StudyRise`). The old `~/Desktop/StudyRise` location is retired — do not use it.

### GENERATE — Writing a new article

When the user says "write [article]" or "generate [content piece]":

1. **Read the wiki** — Pull context from [[Content Pipeline]], [[Article Production Playbook]], [[Brand Voice]], [[SEO Strategy]], [[Site Shell System]], [[Internal Link Strategy]], and any relevant entity/keyword pages.
2. **Confirm the brief** — Summarize: target keyword, audience segment, content angle, wave assignment. Get user approval.
3. **Write in the website repo** — Switch to `/Users/istiaque/Downloads/StudyRIse Main/StudyRise App` and generate the article files (HTML + any assets) following the 5-phase playbook.
4. **Run checks** — Apply [[SEO Technical Checklist]] and [[Pre-Deploy Checklist]] against the generated files. ALWAYS run `python3 build_site.py` (which now also runs `check_blog.py`) before deploying — it fails the build if an article has broken structure (unstyled FAQ/CTA, missing from the blog index or sitemap). For new articles, clone an existing article (e.g. `public/blog/amc-mcq-study-plan.html`) rather than hand-authoring the shell — the `.faq`, `.cta-band`, and `.related` scaffolding come for free.
5. **Commit & push** — Commit with a descriptive message, push to GitHub. Deployment happens automatically or via the deploy guide.
6. **Update the wiki** — Back in StudyRiseOS (the wiki repo, now at `~/Downloads/StudyRIse Main/StudyRise Content OS`):
   - Update [[Content Pipeline]] — mark the piece as `deployed`, add URL and publish date
   - Update [[Internal Link Strategy]] — register new inbound/outbound links
   - Update any entity/keyword pages that reference this content
   - Append to `wiki/log.md`
   - Commit and push StudyRiseOS

### Cross-Repo References
- **Website + app repo**: `/Users/istiaque/Downloads/StudyRIse Main/StudyRise App` → `git@github.com:Istiaque012/StudyRise.git` (formerly `~/Desktop/StudyRise`; that copy was retired 2026-07-02 — see `wiki/log.md`)
- **Wiki repo**: `/Users/istiaque/Downloads/StudyRIse Main/StudyRise Content OS` → `git@github.com:Istiaque012/StudyRiseOS.git` (local folder renamed from `StudyRIseOS`; GitHub repo name unchanged)
- The website repo's `docs/seo_content_brain/` is the old Brain (now frozen as `raw/brain-v1/` here)
- The wiki is the single source of truth for content strategy; the website repo is execution only

---

## What Codex Should NOT Do
- Never modify immutable source material — this includes `raw/competitor-clips/`, `raw/keyword-research/`, `raw/social-references/`, `raw/app-dev-sources/`, `raw/assets/`, and genuine verbatim transcripts like `docs/_archive/BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md`. The numbered RULEBOOK files in `raw/brain-v1/` (01–12, 10A–10D, and companions like `CHANGELOG.md`) and maintained MBBS docs (e.g. `00_MBBS_INDEX.md`, `01_BMDC_CURRICULUM_REFERENCE.md`) are content-project-owned and may be edited — the PROMOTION RULE depends on this
- Never delete wiki pages — mark them as `status: archived` instead
- Never guess medical or BMDC curriculum facts — flag as `⚠️ NEEDS VERIFICATION`
- Never create pages without updating `index.md` and `log.md`
