---
title: SakibOS — Second Brain
---

# SakibOS

Your LLM-maintained second brain for StudyRise — content, SEO, marketing, social, and app development.

## How It Works
- **You** curate sources → drop them in `raw/`
- **Claude** maintains the wiki → reads, synthesizes, cross-references in `wiki/`
- **You** browse in Obsidian → graph view, search, Dataview tables

## Quick Start
| Say this to Claude Code | What happens |
|---|---|
| "Ingest the new file in raw/competitor-clips/" | Claude reads it, updates 5-15 wiki pages, logs the operation |
| "What keywords are we missing?" | Claude reads index → relevant wiki pages → synthesizes answer |
| "Lint the wiki" | Claude checks for contradictions, orphans, gaps, staleness |

## Structure
- `raw/` — Your immutable sources (never edited by Claude)
- `wiki/` — LLM-generated knowledge base (Claude owns this)
- `docs/` — Original engineering docs (preserved as reference)
- `CLAUDE.md` — Wiki schema and operating instructions

## Key Pages
- [[wiki/index]] — Master catalog of all wiki pages
- [[wiki/log]] — What happened and when
