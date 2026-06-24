# Brain Audit — StudyRise Content & SEO Knowledge Base

> Generated: 2026-06-25 · Read-only analysis — no files modified.

---

## A. Current State

### Layer Classification & Counts

| Layer | Count | Description |
|---|---|---|
| **RAW** (immutable source) | 37 | `raw/brain-v1/` (35 files), `raw/app-dev-sources/` (2 files) |
| **RULEBOOK** (authoritative procedure) | 12 | Numbered 01–12 in `docs/seo_content_brain/` plus MOTION_GUIDE, BLOG_ANIMATIONS_GUIDE |
| **LEDGER** (accumulating/stateful) | 8 | CHANGELOG, 05_CONTENT_PIPELINE, wiki/log.md, wiki content pages with pipeline/calendar state |
| **SCHEMA-INDEX** | 5 | CLAUDE.md, README (×2 copies), wiki/index.md, PRE_DEPLOY_CHECKLIST |
| **WIKI-SYNTHESIS** | 36 | All `wiki/` pages (strategy 14, content 9, app-dev 13) |
| **OUT-OF-SCOPE** | ~25 | docs/_archive/, docs/_audit/, docs/mbbs/, docs/planning/, docs/deployment/, docs/diagnostics/, docs/security/ |

**Ambiguous files:**
- `Article Production Playbook.md` (repo root, 0 bytes) — empty stub
- `2026-06-24.md` (repo root, 0 bytes) — empty stub
- `Welcome.md` (repo root) — Obsidian vault welcome, not brain content

### Canonical Numbered Set

The README and system prompt say "nine numbered files" (01–09) + README = "10 files." The actual set is **12 numbered files** (01–12) plus 4 sub-files (10A–10D), plus 6 supplementary files (MOTION_GUIDE, BLOG_ANIMATIONS_GUIDE, PRE_DEPLOY_CHECKLIST, CHANGELOG, BRAND_KIT, DESIGN_PROMPTS). The README has never been updated to reflect files 10–12, 10A–10D, or the supplementary files.

**Which copy is canonical?** `docs/seo_content_brain/` and `raw/brain-v1/` are **byte-identical** for 15 of 17 shared files. The two that differ:
- **05_CONTENT_PIPELINE.md** — `docs/` copy has a table-formatting update (wider columns); raw/ has the original compact formatting. Content is identical. `docs/` is newer (modified 2026-06-24).
- **CHANGELOG.md** — `docs/` copy is missing the 2026-06-25 social media entries; `raw/` copy is newer (modified 2026-06-25) and has 99 additional lines.

**Answer: `raw/brain-v1/` is the more current copy** (CHANGELOG was updated there last), but `docs/seo_content_brain/` was treated as the working copy earlier (CONTENT_PIPELINE was edited there). Neither is consistently canonical — they have drifted in opposite directions.

**Files only in `raw/brain-v1/`** (15 files not in `docs/seo_content_brain/`): All MBBS files (00–07), social files (10, 10A–10D), deployment-architecture, ANIMATION_PLAN, BRAND_KIT, DESIGN_PROMPTS, FEATURES. These exist as separate folders in `docs/` (docs/mbbs/, docs/planning/, docs/deployment/) — another layer of duplication.

### Duplication Map

| Topic | raw/brain-v1/ | docs/seo_content_brain/ | docs/{other} | wiki/ | Status |
|---|---|---|---|---|---|
| Context/Overview | 01_CONTEXT | 01_CONTEXT | — | StudyRise Overview | TRIPLICATED (raw≡docs, wiki is synthesis) |
| Brand Voice | 02_BRAND_VOICE | 02_BRAND_VOICE | — | Brand Voice | TRIPLICATED |
| SEO Strategy | 03_SEO_STRATEGY | 03_SEO_STRATEGY | — | SEO Strategy | TRIPLICATED |
| SEO Technical Rules | 04_SEO_TECHNICAL | 04_SEO_TECHNICAL | — | SEO Technical Checklist | TRIPLICATED |
| Content Pipeline | 05_CONTENT_PIPELINE | 05_CONTENT_PIPELINE | — | Content Pipeline | TRIPLICATED + DRIFTED |
| Production Playbook | 06_PRODUCTION | 06_PRODUCTION | — | Article Production Playbook | TRIPLICATED |
| Image Protocol | 07_IMAGE_PROTOCOL | 07_IMAGE_PROTOCOL | — | Image Protocol | TRIPLICATED |
| Deployment Guide | 08_DEPLOYMENT | 08_DEPLOYMENT | docs/deployment/ | Deployment Guide + Deployment Architecture | QUADRUPLICATED |
| Audit Playbook | 09_AUDIT_PLAYBOOK | 09_AUDIT_PLAYBOOK | — | Audit Playbook | TRIPLICATED |
| Site Shell | 10_SITE_SHELL | 10_SITE_SHELL | — | Site Shell System | TRIPLICATED |
| Pricing Model | 11_PRICING_MODEL | 11_PRICING_MODEL | — | Pricing Strategy | TRIPLICATED |
| Internal Links | 12_INTERNAL_LINKS | 12_INTERNAL_LINKS | — | Internal Link Strategy | TRIPLICATED |
| Social Playbook | 10_SOCIAL_PLAYBOOK | — | — | Social Playbook | DUPLICATED |
| Social Formats | 10A | — | — | Social Content Formats | DUPLICATED |
| Social Calendar | 10B | — | — | Social Calendar | DUPLICATED |
| Paid Promotion | 10C | — | — | Paid Promotion | DUPLICATED |
| Creative Production | 10D | — | — | Creative Production | DUPLICATED |
| MBBS Product Spec | 02_MBBS_PRODUCT_SPEC | — | docs/mbbs/02 | MBBS Product Spec | TRIPLICATED |
| MBBS (all 8 files) | ✓ | — | docs/mbbs/ | wiki/app-dev/ (8 pages) | TRIPLICATED each |
| CHANGELOG | CHANGELOG | CHANGELOG | — | wiki/log.md (different format) | DUPLICATED + DRIFTED |
| Brand Kit | BRAND_KIT | — | docs/planning/BRAND_KIT | Brand Visual System | TRIPLICATED |
| Design Prompts | DESIGN_PROMPTS | — | docs/planning/DESIGN_PROMPTS | — | DUPLICATED |
| Features | FEATURES | — | docs/planning/FEATURES | App Features Spec | TRIPLICATED |
| Motion Guide | MOTION_GUIDE | MOTION_GUIDE | — | Motion & Animation | TRIPLICATED |
| Animations Guide | BLOG_ANIMATIONS | BLOG_ANIMATIONS | docs/planning/ANIMATION_PLAN | — | TRIPLICATED |
| deployment-architecture | deployment-architecture | — | docs/deployment/ | Deployment Architecture | TRIPLICATED |
| README | README | README | docs/README | — | DUPLICATED (identical) |

**Summary: 12 core brain topics exist in 3+ identical copies each. Total duplication overhead: ~650 KB of the 1.25 MB in-scope content is redundant.**

### Rule Escape — Rules Restated Instead of Linked

| Rule | Authoritative source | Restated in (should link instead) |
|---|---|---|
| Canonical www domain | 04_SEO_TECHNICAL_RULES §canonical | wiki/SEO Remediation 2026-06:70, wiki/strategy/SEO Strategy, wiki/content/SEO Technical Checklist |
| `?auth=` CTA pattern | 04_SEO_TECHNICAL_RULES:62 | wiki/SEO Remediation 2026-06:55, 08_DEPLOYMENT_GUIDE:181, wiki/content/Pre-Deploy Checklist |
| Banned pricing phrases | 11_PRICING_MODEL §7 + 02_BRAND_VOICE §banned | wiki/Pricing Strategy:17+36+41, wiki/Brand Voice:26, wiki/Social Playbook:62, wiki/Paid Promotion:86, wiki/SEO Remediation 2026-06:48+70 |
| GA snippet ID | 04_SEO_TECHNICAL_RULES | README:25, wiki/content/SEO Technical Checklist, 01_CONTEXT:67 |
| Freemium framing | 11_PRICING_MODEL | wiki/Pricing Strategy (full restatement), 12_INTERNAL_LINKS:28 |
| [MBBS-BD] restrained tone | 02_BRAND_VOICE | wiki/Social Playbook, wiki/Creative Production, wiki/Social Content Formats |
| Inter font claim | 02_BRAND_VOICE:32 | wiki/Creative Production:56+118, wiki/Paid Promotion:87 |

---

## B. Contradictions & Stale Rules

### 1. Font: "Inter" stated as sole brand font

| File | Line | Current | Should be |
|---|---|---|---|
| `docs/seo_content_brain/02_BRAND_VOICE.md` | 32 | `**Font:** Inter` | `**Font:** Plus Jakarta Sans (headings) · Inter (body) · JetBrains Mono (code/overlines)` |
| `raw/brain-v1/02_BRAND_VOICE.md` | 32 | same | same fix |
| `wiki/content/Creative Production.md` | 56, 118 | "Inter font" as sole brand font | "Inter + Plus Jakarta Sans" or link to Brand Visual System |
| `wiki/strategy/Paid Promotion.md` | 87 | "Inter font only" | same |

The actual font stack is documented correctly in `10_SITE_SHELL.md` (lines 84–86, 577) and `BRAND_KIT.md` (full type section). `02_BRAND_VOICE` was never updated when Plus Jakarta Sans was added.

### 2. FAQPage rich result claim (retired May 2026)

| File | Line | Current | Should be |
|---|---|---|---|
| `wiki/strategy/SEO Remediation 2026-06.md` | 48 | "no `FAQPage` JSON-LD = missed **rich-result** + AI-citation" | "no `FAQPage` JSON-LD = missed AI-citation opportunity" (rich result retired) |
| `docs/_archive/SEO Audit.md` | 667 | "Add FAQ schema to homepage \| Improves SERP rich result chance" | Archived — stale but acceptable in archive |
| `docs/_archive/SEO_AUDIT_REPORT.md` | 667 | same | same |
| `raw/app-dev-sources/SEO-Remediation-2026-06-24.md` | 88 | "missing a free rich-result + AI-citation opportunity" | RAW — immutable, but note drift |

The canonical rulebook files (03_SEO_STRATEGY:90, 04_SEO_TECHNICAL_RULES:121) correctly state "FAQPage no longer produces a Google rich result (retired 2026-05-07)." The wiki synthesis page got it wrong.

### 3. File-count mismatch: "nine numbered files" / "upload all 10"

| File | Line | Current | Should be |
|---|---|---|---|
| `docs/seo_content_brain/README.md` | 7 | "the real depth lives in the nine numbered files" | "the real depth lives in the twelve numbered files (01–12) plus five social/paid companion files (10A–10D)" |
| `docs/seo_content_brain/README.md` | 22 | "Upload all 10 files" | "Upload all numbered files + this README" |
| `raw/brain-v1/README.md` | 7, 22 | same | same |

The README was written when only 01–09 existed. Files 10 (Site Shell), 11 (Pricing), 12 (Internal Links), and 10A–10D (Social) were added later without updating the README file listing.

### 4. Bare `studyrise.app` without `www`

Found in **41 locations** across docs and wiki. Most are in `docs/deployment/` and `wiki/app-dev/` (Vercel project names, admin subdomain) where the bare domain is the correct Vercel project identifier, not a user-facing URL. Genuine issues:

| File | Line | Current | Should be |
|---|---|---|---|
| `docs/seo_content_brain/02_BRAND_VOICE.md` | 430–433 | Social bio templates use "studyrise.app" | "www.studyrise.app" (user-facing URLs) |
| `docs/seo_content_brain/11_PRICING_MODEL.md` | 277 | "Try it free — studyrise.app" | "Try it free — www.studyrise.app" |
| `docs/seo_content_brain/01_CONTEXT.md` | 13 | "studyrise.app" in description | "www.studyrise.app" |
| `wiki/strategy/StudyRise Overview.md` | 11 | "studyrise.app" | "www.studyrise.app" |
| `wiki/strategy/Internal Link Strategy.md` | 11 | "studyrise.app" | "www.studyrise.app" |

Plus their `raw/brain-v1/` copies (identical files).

### 5. `/login` / `/register` as CTA targets

The SEO rules (04:62, 08:181) correctly ban direct CTA links to `/login` or `/register`. The `LANDING_PAGE_QA_REPORT.md` documents that these were all fixed to `?auth=login` / `?auth=register`. No active violations found in rulebook or wiki files — only historical references in archive and changelog. Clean.

### 6. Retired pricing phrases in body copy

No active violations found in body copy — all instances are in "banned phrases" lists or changelog entries documenting the retirement. The rules are working; they're just restated in 7+ locations (see Rule Escape table above).

---

## C. Connectivity & Orphans

### Wikilink Graph

**36 unique wikilink targets** found in `wiki/`. All resolve to existing wiki pages except:
- `[[wiki/entities/]]` — referenced as a directory, but the directory doesn't exist and has no pages.

**Orphan pages** (no inbound wikilinks):
- `wiki/strategy/Content & SEO System Overview.md` — only in index.md, never linked from other pages
- `wiki/content/Deployment Guide.md` — only in index.md

**Empty stubs at repo root:**
- `Article Production Playbook.md` — 0 bytes
- `2026-06-24.md` — 0 bytes

**"Related docs" footer boilerplate:** Found in **30 files** across `docs/` and `raw/brain-v1/`. Each is 5–15 lines listing sibling files. Estimated overhead: ~450 lines / ~15 KB total.

### Cross-folder coupling

Wiki synthesis pages correctly use `[[wikilinks]]` to other wiki pages, not raw file paths. The `sources:` frontmatter in wiki pages does reference raw files — this is the intended design. No problematic cross-folder coupling found.

---

## D. Token Weight & Sync Surface

### Size Ranking (top 15 in-scope files)

| File | Lines | Bytes | Est. Tokens |
|---|---|---|---|
| raw/brain-v1/FEATURES.md | 1,832 | 114,637 | ~28,700 |
| raw/brain-v1/BRAND_KIT.md | 1,244 | 46,593 | ~11,600 |
| raw/brain-v1/DESIGN_PROMPTS.md | 1,120 | 47,201 | ~11,800 |
| raw/brain-v1/10A_SOCIAL_CONTENT_FORMATS.md | 982 | 35,396 | ~8,800 |
| raw/brain-v1/10_SITE_SHELL.md | 720 | 38,607 | ~9,700 |
| raw/brain-v1/10D_CREATIVE_PRODUCTION.md | 637 | 27,867 | ~7,000 |
| raw/brain-v1/02_BRAND_VOICE.md | 591 | 33,825 | ~8,500 |
| raw/brain-v1/10_SOCIAL_PLAYBOOK.md | 484 | 25,687 | ~6,400 |
| raw/brain-v1/deployment-architecture.md | 480 | 23,589 | ~5,900 |
| raw/brain-v1/MOTION_GUIDE.md | 451 | 22,864 | ~5,700 |
| raw/brain-v1/CHANGELOG.md | 449 | 33,223 | ~8,300 |
| raw/brain-v1/10C_PAID_PROMOTION.md | 440 | 25,425 | ~6,400 |
| raw/brain-v1/10B_SOCIAL_CALENDAR.md | 406 | 30,203 | ~7,600 |
| raw/brain-v1/03_SEO_STRATEGY.md | 346 | 26,394 | ~6,600 |
| raw/brain-v1/11_PRICING_MODEL.md | 337 | 23,261 | ~5,800 |

### Total Token Estimates

| Scope | Bytes | Est. Tokens |
|---|---|---|
| All .md in repo | 3,286,715 | ~821,700 |
| In-scope (raw/brain-v1 + docs/seo_content_brain + wiki/) | 1,255,244 | ~313,800 |
| Duplication overhead (docs/seo_content_brain ≡ raw/brain-v1 shared files) | ~298,000 | ~74,500 |
| "Related docs" footer boilerplate | ~15,000 | ~3,750 |
| Wiki synthesis pages (total) | ~95,000 | ~23,750 |
| **Net unique content** | ~942,000 | **~235,500** |

### Recommended Sync Surface (what an operational agent loads)

**Tier 1 — Always loaded (~3,200 tokens):**
- CLAUDE.md (schema)
- wiki/index.md (catalog)

**Tier 2 — Loaded on demand per task (~15,000–30,000 tokens per session):**
- The relevant wiki synthesis page(s) (2–5 pages, ~1,000 tokens each)
- The authoritative rulebook file for the task (one of 01–12, ~5,000–10,000 tokens)

**Tier 3 — Never loaded unless explicitly referenced:**
- raw/brain-v1/ (immutable archive — for sourcing only)
- docs/seo_content_brain/ (should be deleted; it's a stale copy)
- docs/planning/, docs/mbbs/, etc. (already in raw/)

**Estimated per-session saving:** Currently loading all numbered files costs ~160,000 tokens. Tiered loading: ~3,200 (always) + ~20,000 (on-demand) = **~23,000 tokens per session** — an **85% reduction**.

---

## E. Self-Improvement Readiness

| Capability | Status | What's Needed |
|---|---|---|
| (a) Lean schema/router | **PRESENT** | CLAUDE.md defines operations (INGEST, QUERY, LINT) + wiki structure |
| (b) index.md catalog | **PRESENT** | 71-line index with one-line summaries per page; updated on ingest |
| (c) Append-only log.md | **PRESENT** | 108 lines, chronological, structured entries |
| (d) End-of-session capture ritual | **PARTIAL** | INGEST workflow defined (step 6: append to log.md). But no defined ritual for non-ingest sessions (e.g., "wrote an article" or "fixed a bug" doesn't automatically update the wiki). CLAUDE.md's GENERATE workflow (step 6) covers article deploys but not general work sessions. |
| (e) Promotion rule | **MISSING** | No defined mechanism to lift a repeated correction into the RULEBOOK. Corrections accumulate in log.md but never get promoted to authoritative rules. |
| (f) Periodic lint routine | **PRESENT** | LINT operation defined in CLAUDE.md with 6-step checklist. Also: 09_AUDIT_PLAYBOOK defines monthly SEO health checks. But no cadence is enforced — lint runs only when manually requested. |

---

## F. Recommended Architecture

### Single-Source RULEBOOK
Designate `raw/brain-v1/` as the sole authoritative copy of all numbered files. Delete `docs/seo_content_brain/` entirely (it's a stale duplicate). The wiki synthesis pages LINK to rules via `[[wikilinks]]`; they never restate them.

### LEDGER for Accumulation
These files accumulate state and should be the only mutable originals:
- `wiki/log.md` — session log (append-only)
- `wiki/strategy/Content Pipeline.md` — article queue status
- `wiki/strategy/Internal Link Strategy.md` — link registry
- `raw/brain-v1/CHANGELOG.md` — brain change history

### Schema/Index/Log Triad
Already in place: CLAUDE.md → wiki/index.md → wiki/log.md. No changes needed.

### The Self-Improvement Loop

**End-of-session ritual** (add to CLAUDE.md):
```
After every work session (not just INGEST), append to wiki/log.md:

## [YYYY-MM-DD] type | summary | files
- type: ingest | deploy | fix | audit | strategy
- summary: one-line description
- files: list of wiki pages created/updated

Then update wiki/index.md if any new pages were created.
```

**Promotion rule** (add to CLAUDE.md):
```
If the same correction has been made 3+ times (check log.md), promote it:
1. Add the rule to the relevant RULEBOOK file (01–12)
2. Log the promotion in CHANGELOG.md
3. Remove the restated copies from wiki pages, replacing with a link
```

**Lint cadence**: Add to CLAUDE.md: "Run LINT at the start of every month or after 5+ ingest operations, whichever comes first."

---

## G. Per-File Disposition Table

### `docs/seo_content_brain/` — DELETE ENTIRE FOLDER (stale copy of raw/brain-v1/)

| File | Disposition | Reason |
|---|---|---|
| 01_CONTEXT.md | DELETE (≡ raw/) | Byte-identical to raw/brain-v1/ |
| 02_BRAND_VOICE.md | DELETE (≡ raw/) | Identical |
| 03_SEO_STRATEGY.md | DELETE (≡ raw/) | Identical |
| 04_SEO_TECHNICAL_RULES.md | DELETE (≡ raw/) | Identical |
| 05_CONTENT_PIPELINE.md | MERGE-INTO raw/brain-v1/ | Formatting update; merge the table fix into raw/ then delete |
| 06_PRODUCTION_PLAYBOOK.md | DELETE (≡ raw/) | Identical |
| 07_IMAGE_PROTOCOL.md | DELETE (≡ raw/) | Identical |
| 08_DEPLOYMENT_GUIDE.md | DELETE (≡ raw/) | Identical |
| 09_AUDIT_PLAYBOOK.md | DELETE (≡ raw/) | Identical |
| 10_SITE_SHELL.md | DELETE (≡ raw/) | Identical |
| 11_PRICING_MODEL.md | DELETE (≡ raw/) | Identical |
| 12_INTERNAL_LINKS.md | DELETE (≡ raw/) | Identical |
| BLOG_ANIMATIONS_GUIDE.md | DELETE (≡ raw/) | Identical |
| CHANGELOG.md | DELETE (⊂ raw/) | raw/ copy is newer and superset |
| MOTION_GUIDE.md | DELETE (≡ raw/) | Identical |
| PRE_DEPLOY_CHECKLIST.md | DELETE (≡ raw/) | Identical |
| README.md | DELETE (≡ raw/) | Identical |

### `docs/mbbs/` — DELETE (≡ raw/brain-v1/)

All 8 files are byte-identical to their raw/brain-v1/ counterparts.

### `docs/planning/` — DELETE (≡ raw/brain-v1/)

| File | Disposition |
|---|---|
| BRAND_KIT.md | DELETE (≡ raw/) |
| DESIGN_PROMPTS.md | DELETE (≡ raw/) |
| FEATURES.md | DELETE (≡ raw/) |
| ANIMATION_PLAN.md | DELETE (≡ raw/) |

### `docs/deployment/`

| File | Disposition |
|---|---|
| deployment-architecture.md | DELETE (≡ raw/brain-v1/) |

### `docs/` other

| File | Disposition |
|---|---|
| docs/README.md | KEEP (docs index, but update to remove refs to deleted subfolders) |
| docs/DOCS_MAP.md | KEEP (structural reference) |
| docs/_archive/* | KEEP (archived, out of scope) |
| docs/_audit/* | KEEP (archived, out of scope) |
| docs/diagnostics/* | KEEP (out of scope) |
| docs/security/* | KEEP (out of scope) |

### Repo root stubs

| File | Disposition |
|---|---|
| Article Production Playbook.md | DELETE-STUB (0 bytes, orphan) |
| 2026-06-24.md | DELETE-STUB (0 bytes, orphan) |
| Welcome.md | KEEP (Obsidian vault welcome) |

### Wiki pages

| File | Disposition |
|---|---|
| All 36 wiki pages | KEEP |
| wiki/index.md | KEEP |
| wiki/log.md | KEEP |

**Action needed on wiki pages:** Remove restated rules (see Rule Escape table in §A) and replace with `[[wikilinks]]` to the authoritative rulebook file. This is a DE-SYNC operation — the wiki should synthesize and link, not copy.

---

## H. Contradiction Fix List

| # | File | Line | Current | Should Be |
|---|---|---|---|---|
| 1 | raw/brain-v1/02_BRAND_VOICE.md | 32 | `**Font:** Inter` | `**Font:** Plus Jakarta Sans (headings) · Inter (body) · JetBrains Mono (code)` |
| 2 | raw/brain-v1/02_BRAND_VOICE.md | 430–433 | `studyrise.app` (bare, in social bios) | `www.studyrise.app` |
| 3 | raw/brain-v1/11_PRICING_MODEL.md | 277 | `studyrise.app` (bare) | `www.studyrise.app` |
| 4 | raw/brain-v1/01_CONTEXT.md | 13 | `studyrise.app` (bare) | `www.studyrise.app` |
| 5 | raw/brain-v1/README.md | 7 | "nine numbered files" | "twelve numbered files (01–12) plus companion files (10A–10D)" |
| 6 | raw/brain-v1/README.md | 22 | "Upload all 10 files" | "Upload all numbered + companion files plus this README" |
| 7 | wiki/strategy/SEO Remediation 2026-06.md | 48 | "missed rich-result + AI-citation" | "missed AI-citation opportunity" (rich result retired) |
| 8 | wiki/strategy/StudyRise Overview.md | 11 | `studyrise.app` (bare) | `www.studyrise.app` |
| 9 | wiki/strategy/Internal Link Strategy.md | 11 | `studyrise.app` (bare) | `www.studyrise.app` |
| 10 | wiki/content/Creative Production.md | 56, 118 | "Inter font" as sole | "Inter + Plus Jakarta Sans" or link to [[Brand Visual System]] |
| 11 | wiki/strategy/Paid Promotion.md | 87 | "Inter font only" | "Brand fonts (see [[Brand Visual System]])" |

---

## I. Estimated Token Savings

| Change | Tokens Saved |
|---|---|
| Delete docs/seo_content_brain/ (17 files ≡ raw/) | ~74,500 |
| Delete docs/mbbs/ (8 files ≡ raw/) | ~40,000 |
| Delete docs/planning/ (4 files ≡ raw/) | ~54,000 |
| Delete docs/deployment/ (1 file ≡ raw/) | ~5,900 |
| Remove "Related docs" footers (30 files) | ~3,750 |
| De-sync wiki rule restatements | ~2,000 |
| **Total one-time reduction** | **~180,150** |
| **Per-session saving (tiered loading vs load-all)** | **~137,000** (~85% of current ~160K load) |

---

## J. Phased Fix Sequence

Each phase is a scoped session of 2–3 files max. **STOP gate before any deletion or move.**

### Phase 1 — Contradiction fixes in raw/brain-v1/ (no deletions)
- Fix `02_BRAND_VOICE.md` line 32 (font stack) + lines 430–433 (bare domain)
- Fix `01_CONTEXT.md` line 13 (bare domain)
- Fix `11_PRICING_MODEL.md` line 277 (bare domain)
- Fix `README.md` lines 7, 22 (file count)
- **STOP** — review & commit

### Phase 2 — Wiki contradiction fixes (no deletions)
- Fix `wiki/strategy/SEO Remediation 2026-06.md` line 48 (FAQPage)
- Fix `wiki/strategy/StudyRise Overview.md` line 11 (bare domain)
- Fix `wiki/strategy/Internal Link Strategy.md` line 11 (bare domain)
- Fix `wiki/content/Creative Production.md` lines 56, 118 (font)
- Fix `wiki/strategy/Paid Promotion.md` line 87 (font)
- **STOP** — review & commit

### Phase 3 — Delete docs/seo_content_brain/ (pure duplicate)
- Merge 05_CONTENT_PIPELINE table formatting into raw/ copy
- Delete all 17 files in docs/seo_content_brain/
- Update docs/README.md to remove references
- **STOP** — review & commit

### Phase 4 — Delete docs/mbbs/ + docs/planning/ + docs/deployment/ (pure duplicates)
- Delete docs/mbbs/ (8 files ≡ raw/)
- Delete docs/planning/ (4 files ≡ raw/)
- Delete docs/deployment/ (1 file ≡ raw/)
- Update docs/README.md + docs/DOCS_MAP.md
- **STOP** — review & commit

### Phase 5 — Clean up stubs and boilerplate
- Delete `Article Production Playbook.md` (0 bytes, repo root)
- Delete `2026-06-24.md` (0 bytes, repo root)
- Remove "Related docs" footers from raw/brain-v1/ files (30 instances)
- **STOP** — review & commit

### Phase 6 — De-sync wiki rule restatements
- In each wiki page listed in the Rule Escape table, replace restated rules with `[[wikilinks]]` to the authoritative source
- Create `wiki/entities/` directory with at least one placeholder note (currently a broken wikilink target)
- **STOP** — review & commit

### Phase 7 — Add self-improvement machinery to CLAUDE.md
- Add end-of-session capture ritual
- Add promotion rule
- Add lint cadence
- **STOP** — review & commit

---

> **This report is read-only. No files were modified. Review each phase and approve before execution.**
