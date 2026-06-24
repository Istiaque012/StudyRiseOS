---
title: "[Dev project] Resolve canonical conflict + delete duplicate app-dev folders"
status: open
raised-by: content/SEO project
date: 2026-06-25
scope: DEV PROJECT ONLY — do not action from the content project
---

## Summary
Three folders under docs/ are byte-identical duplicates (body content) of the same-named
files in raw/brain-v1/. They are app-dev specs, so the canonical decision and the deletion
belong to the development project, not the content/SEO project. This ticket hands that
decision over with the investigation already done.

## Folders in scope
- docs/mbbs/ (8 files)
- docs/planning/ (ANIMATION_PLAN.md, BRAND_KIT.md, DESIGN_PROMPTS.md, FEATURES.md)
- docs/deployment/ (deployment-architecture.md)

## Verified findings (content project, 2026-06-25)
- Bodies are byte-identical to raw/brain-v1/ counterparts for all 13 files. After the
  footer-sync commit, the docs/ and raw/ copies are identical including footers (confirm
  current state before acting — see "Pre-flight" below).
- Zero app code, build tooling, scripts, or config reference these three paths. Only
  referrers are docs/README.md, docs/DOCS_MAP.md, the docs/_audit/ reports, and a website-
  repo CLAUDE.md snapshot in raw/app-dev-sources/ (which points at the *website repo's* docs,
  not this one).

## The blocking conflict
docs/README.md currently labels docs/planning/BRAND_KIT.md, docs/planning/DESIGN_PROMPTS.md,
and docs/deployment/deployment-architecture.md as "Canonical," while ALSO declaring
raw/brain-v1/ the canonical source. Both cannot be canonical for the same content. This
must be resolved before deletion, or the docs map will point at deleted files.

## Required sequence (dev project executes)
1. DECIDE the single canonical home for these app-dev specs (raw/brain-v1/ or elsewhere).
2. MOVE the "Canonical" labels in docs/README.md AND docs/DOCS_MAP.md to the chosen home;
   update the newcomer reading-order in docs/README.md that currently routes through
   docs/planning/ and docs/deployment/.
3. PRE-FLIGHT: re-diff each of the 13 files against its raw/brain-v1/ counterpart and
   confirm byte-identical. If any differs, reconcile before deleting — do not delete a file
   that contains anything its counterpart lacks.
4. DELETE the three folders (git rm -r), one folder per commit for a readable history.
5. ACKNOWLEDGE that docs/_audit/ files cite line numbers in these paths and will go stale —
   acceptable, they are archival; do not rewrite them.

## Out of scope for this ticket
No app/runtime change. No content-brain change. The content project will not action any of
the above.
