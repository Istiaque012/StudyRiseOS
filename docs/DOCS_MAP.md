# docs/ — Folder Map

**Active docs:** 11,600 lines across 32 markdown files  
**Archive:** 12,720 lines (8 files, including the 9,658-line BMDC curriculum)

---

## Tree

```
docs/
├── README.md                                           73 lines
│
├── deployment/
│   └── deployment-architecture.md                    480 lines
│
├── diagnostics/
│   └── USM_DIAGNOSTIC.md                             816 lines
│
├── mbbs/
│   ├── 00_MBBS_INDEX.md                               90 lines
│   ├── 01_BMDC_CURRICULUM_REFERENCE.md               356 lines
│   ├── 02_MBBS_PRODUCT_SPEC.md                       253 lines
│   ├── 03_MBBS_CURRENT_STATE.md                      159 lines
│   ├── 04_MBBS_DATA_MODEL.md                         181 lines
│   ├── 05_MBBS_DECISIONS.md                          171 lines
│   ├── 06_MBBS_BUILD_SESSIONS.md                     279 lines
│   └── 07_MBBS_BUILD_LOG.md                          208 lines
│
├── planning/
│   ├── ANIMATION_PLAN.md                             314 lines
│   ├── BRAND_KIT.md                                1,221 lines
│   ├── DESIGN_PROMPTS.md                           1,120 lines
│   └── FEATURES.md                                 1,827 lines
│
├── security/
│   └── SECURITY_RULES.md                            123 lines
│
├── sessions/
│   ├── AUTH_SECURITY_SESSIONS.md                  1,186 lines
│   └── SEO_FIX_SESSIONS.md                          590 lines
│
├── seo_content_brain/
│   ├── README.md                                    137 lines
│   ├── 01_CONTEXT.md                                146 lines
│   ├── 02_BRAND_VOICE.md                            122 lines
│   ├── 03_SEO_STRATEGY.md                           336 lines
│   ├── 04_SEO_TECHNICAL_RULES.md                    206 lines
│   ├── 05_CONTENT_PIPELINE.md                       252 lines
│   ├── 06_PRODUCTION_PLAYBOOK.md                    297 lines
│   ├── 07_IMAGE_PROTOCOL.md                         111 lines
│   ├── 08_DEPLOYMENT_GUIDE.md                       131 lines
│   ├── 09_AUDIT_PLAYBOOK.md                         143 lines
│   ├── 10_SITE_SHELL.md                             490 lines
│   ├── BLOG_ANIMATIONS_GUIDE.md                     327 lines
│   ├── CHANGELOG.md                                  23 lines
│   ├── MOTION_GUIDE.md                              444 lines
│   └── PRE_DEPLOY_CHECKLIST.md                       60 lines
│
└── _archive/                                        (retired — do not edit)
    ├── BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md  9,658 lines
    ├── ADMIN_V2_SESSIONS.md                           923 lines
    ├── SEO_AUDIT_REPORT.md                            712 lines
    ├── SECURITY_AUDIT.md                              695 lines
    ├── BLOG_ARTICLE_LIST.md                           244 lines
    ├── LANDING_PAGE_QA_REPORT.md                      191 lines
    ├── ADMIN_AUDIT_REPORT.md                          160 lines
    └── SEO_ROUTING_FIX.md                             137 lines
```

---

## Folder Summaries

| Folder | Purpose |
|---|---|
| `deployment/` | Vercel setup, deploy commands, env vars, admin app root-dir rules |
| `diagnostics/` | University mode debug reference (USM data flow, hook call traces) |
| `mbbs/` | Numbered MBBS docs: index → curriculum ref → product spec → current state → data model → decisions → build sessions → build log |
| `planning/` | Core product/design references: full USM feature spec, brand kit, design prompts, animation rules |
| `security/` | Auth hardening rules, RLS guidelines, secrets policy |
| `sessions/` | Build session plans for the auth/security track and SEO fix track |
| `seo_content_brain/` | Full SEO + content playbook: strategy, brand voice, pricing model, pipeline, image rules, deployment, audit |
| `_archive/` | Retired reports and superseded docs — the BMDC curriculum moved here post-consolidation |

---

## Biggest Active Files

| File | Lines | Why it's large |
|---|---|---|
| `planning/FEATURES.md` | 1,827 | Complete USM product spec (all 14 sessions) |
| `planning/BRAND_KIT.md` | 1,221 | Full brand system: typography, colour, tone, copy rules |
| `sessions/AUTH_SECURITY_SESSIONS.md` | 1,186 | Auth/security build session plans (sessions 1–12) |
| `planning/DESIGN_PROMPTS.md` | 1,120 | AI design generation prompts for all screens |
| `seo_content_brain/MOTION_GUIDE.md` | 444 | Blog/landing page animation guidelines |
| `seo_content_brain/10_SITE_SHELL.md` | 490 | Shared-shell rulebook: page-type recipes, hero rule, gate, partial/asset model |
| `diagnostics/USM_DIAGNOSTIC.md` | 816 | University mode data flow and hook diagnostics |
| `sessions/SEO_FIX_SESSIONS.md` | 590 | SEO routing fix session log |
| `deployment/deployment-architecture.md` | 480 | Full Vercel + DNS + env var reference |
