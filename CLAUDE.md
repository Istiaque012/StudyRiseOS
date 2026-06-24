# SakibOS — LLM Wiki Schema

> This file tells Claude how the wiki is structured and how to operate on it.
> Co-evolved by Istiaque and Claude. Last updated: 2026-06-24.

---

## Architecture

Three layers:

### 1. `raw/` — Immutable Sources
Your curated collection of source documents. Claude reads from these but **never modifies** them.

| Subfolder | What goes here |
|---|---|
| `raw/brain-v1/` | Original StudyRise Content & SEO Brain files (01–12) + MBBS docs + planning + deployment |
| `raw/competitor-clips/` | Web-clipped competitor articles (use Obsidian Web Clipper) |
| `raw/keyword-research/` | GSC exports, Semrush dumps, keyword spreadsheets |
| `raw/social-references/` | Social media posts, campaign screenshots, marketing references |
| `raw/app-dev-sources/` | Architecture docs, API references, technical articles |
| `raw/assets/` | Images from clipped articles |

### 2. `wiki/` — LLM-Generated Wiki
Claude owns this layer entirely. Claude creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; Claude writes it.

| Subfolder | What lives here |
|---|---|
| `wiki/entities/` | Entity pages — competitors, platforms, tools, people |
| `wiki/keywords/` | Keyword analysis pages — clusters, gaps, opportunities |
| `wiki/content/` | Content summaries — articles, social posts, campaigns, content calendar |
| `wiki/strategy/` | Synthesized strategy pages — SEO strategy, marketing strategy, growth plans |
| `wiki/app-dev/` | App development wiki — architecture, features, decisions, build status |

### 3. This file (`CLAUDE.md`) — The Schema
Tells Claude how the wiki is structured, what conventions to follow, and what workflows to run.

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

---

## Special Files

### `wiki/index.md`
Content-oriented catalog. Every wiki page listed with link, one-line summary, and category. Claude updates this on every ingest. **Read this first** when answering any query.

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

## What Claude Should NOT Do
- Never modify files in `raw/` — they are immutable sources
- Never delete wiki pages — mark them as `status: archived` instead
- Never guess medical or BMDC curriculum facts — flag as `⚠️ NEEDS VERIFICATION`
- Never create pages without updating `index.md` and `log.md`
