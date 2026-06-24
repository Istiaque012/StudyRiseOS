<!-- docnav -->
> **Docs home.** Repo engineering source of truth: [`../CLAUDE.md`](../CLAUDE.md). Every file below links back here and to its sibling docs.

# StudyRise — Documentation Index

This folder holds all project documentation. The repo-wide engineering record — conventions, the `ui/` library, `animations.js`, mode derivation, schema, deploy commands, and the running build log — lives in **[`../CLAUDE.md`](../CLAUDE.md)** (kept at repo root because Claude Code reads it there). The files here are the topic-specific layers.

**Conventions for this docs set**
- Each file opens with a one-line `docnav` pointer (up to this index + `CLAUDE.md`) and closes with a **Related docs** footer linking its siblings.
- One canonical copy per topic. De-duplicated files are left as short pointer stubs to their canonical location.
- App code (`src/content/legal/*.md`) and `CLAUDE.md` are **not** part of this folder by design — legal markdown is imported as code; `CLAUDE.md` must stay at the repo root.

---

## Folders

### [`mbbs/`](mbbs/00_MBBS_INDEX.md) — MBBS Bangladesh module (BMDC R3.0 redesign)
Self-contained, numbered set with its own map. Start at [`00_MBBS_INDEX.md`](mbbs/00_MBBS_INDEX.md).
| File | Purpose |
|---|---|
| [00_MBBS_INDEX.md](mbbs/00_MBBS_INDEX.md) | The map + thesis for the BMDC-faithful redesign |
| [01_BMDC_CURRICULUM_REFERENCE.md](mbbs/01_BMDC_CURRICULUM_REFERENCE.md) | BMDC 2021 distilled — phases, subjects, cards, items, marks (the correctness authority) |
| [02_MBBS_PRODUCT_SPEC.md](mbbs/02_MBBS_PRODUCT_SPEC.md) | What the redesigned module is and why |
| [03_MBBS_CURRENT_STATE.md](mbbs/03_MBBS_CURRENT_STATE.md) | What is deployed now + keep/change/remove ledger |
| [04_MBBS_DATA_MODEL.md](mbbs/04_MBBS_DATA_MODEL.md) | Migration contract (existing + new tables, RLS) |
| [05_MBBS_DECISIONS.md](mbbs/05_MBBS_DECISIONS.md) | Binding decisions (R1–R12+) with reasoning |
| [06_MBBS_BUILD_SESSIONS.md](mbbs/06_MBBS_BUILD_SESSIONS.md) | Build prompts in dependency order |
| [07_MBBS_BUILD_LOG.md](mbbs/07_MBBS_BUILD_LOG.md) | Append-only implementation log |

### [`seo_content_brain/`](seo_content_brain/README.md) — the content & SEO "brain" (Claude-project knowledge set)
Self-contained, numbered set with its own [README](seo_content_brain/README.md). Files `01`–`09` plus motion/animation guides. SEO strategy, audit findings, blog pipeline, technical rules, and production playbook all live here — the former `docs/seo/` content was absorbed into [`03_SEO_STRATEGY.md`](seo_content_brain/03_SEO_STRATEGY.md).

### [`planning/`](planning/FEATURES.md) — product & design specs
| File | Purpose |
|---|---|
| [FEATURES.md](planning/FEATURES.md) | Full feature spec (exam mode + university student mode) |
| [BRAND_KIT.md](planning/BRAND_KIT.md) | **Canonical** brand system: logo, colour, type, spacing, components, voice |
| [DESIGN_PROMPTS.md](planning/DESIGN_PROMPTS.md) | **Canonical** design-implementation prompts |
| [ANIMATION_PLAN.md](planning/ANIMATION_PLAN.md) | Framer Motion rollout guide (pairs with `CLAUDE.md` animation system) |

### [`deployment/`](deployment/deployment-architecture.md) — infrastructure
| File | Purpose |
|---|---|
| [deployment-architecture.md](deployment/deployment-architecture.md) | **Canonical** — two Vercel projects, deploy commands, env vars, domains |

### [`security/`](security/SECURITY_RULES.md) — security
| File | Purpose |
|---|---|
| [SECURITY_RULES.md](security/SECURITY_RULES.md) | Dev rules: env vars, Supabase/RLS, API routes, source maps |

### [`sessions/`](sessions/) — build-session prompt sets
| File | Purpose |
|---|---|
| [AUTH_SECURITY_SESSIONS.md](sessions/AUTH_SECURITY_SESSIONS.md) | 12-session auth/legal/CAPTCHA/OTP/rate-limit plan |
| [SEO_FIX_SESSIONS.md](sessions/SEO_FIX_SESSIONS.md) | Audit-driven SEO fix sessions |

### [`diagnostics/`](diagnostics/) — one-off diagnostic / audit runs
| File | Purpose |
|---|---|
| [USM_DIAGNOSTIC.md](diagnostics/USM_DIAGNOSTIC.md) | University student mode diagnostic prompts |

### [`_archive/`](_archive/) — cold storage
Completed audit reports, QA sign-offs, and shipped session plans. No longer active references.
- [`BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md`](_archive/BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md) — verbatim BMDC 2021 curriculum transcript (reference only; runtime data was transcribed into `src/lib/mbbs/mbbsBmdcCurriculum.js` during Redesign Session R0)

---

## Reading order for a newcomer
1. [`../CLAUDE.md`](../CLAUDE.md) — the whole system at a glance
2. [`planning/FEATURES.md`](planning/FEATURES.md) — what the product does
3. [`planning/BRAND_KIT.md`](planning/BRAND_KIT.md) — how it looks and sounds
4. [`deployment/deployment-architecture.md`](deployment/deployment-architecture.md) — how it ships
5. Then the topic folder you need: `mbbs/`, `seo_content_brain/`, `security/`.
