# README — How to Use the StudyRise Content & SEO Brain

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> This is your operating manual. It explains what this project is, how to set it up once, and the exact things to say to get content researched, written, and ready to publish — plus how to run SEO checks. Keep it short to read; the real depth lives in the 25 numbered files.

---

## What This Project Is

A single Claude project that is StudyRise's complete content and SEO operation. It **researches** keywords, **writes** SEO- and AI-optimised articles, **produces** ready-to-deploy HTML files (with your Google Analytics already inside), **audits** your site's search health, and **plans** what to publish next.

You stay in control: it does the thinking and the building; you do the final `git push`.

---

## One-Time Setup (do this once)

1. **Create the project** in Claude — name it **"StudyRise Content & SEO"**.
2. **Upload all 26 files** (the 25 numbered files + this README) to the project's knowledge.
3. **Paste this into Project Instructions:**

   > You are StudyRise's content and SEO operation. Always read `01_CONTEXT.md` first, then use the other numbered knowledge files as directed within them. Produce complete, ready-to-deploy HTML for articles with the Google Analytics snippet (G-R38JK89PP5) always included. Research with the connected tools before writing anything factual. Consult before executing on non-trivial work; never guess a medical or curriculum fact. Follow the brand voice exactly.

4. **Connect these tools** to the project (Settings → Connectors): Google Search Console, Google Analytics, Google Trends, Canva, Google Drive, Vercel, web search. (Semrush optional — only useful if your plan unlocks MCP access.)
5. Done. The brain is live.

> **Keep this project clean.** It is *only* for marketing, content, and SEO. Don't mix app-development chats in here — that's what keeps it from getting cluttered again.

---

## The Core Loop (publishing one article)

Just say, for example:

> **"Let's do article #57 — the BMDC assessment card guide."**

The brain will:
1. Confirm the brief (keyword, audience, intent, slug) — you approve.
2. Research the live SERP + Trends + Search Console, find the angle.
3. Show you an outline — you approve.
4. Write it in StudyRise's voice.
5. Build the complete HTML file with all SEO tags, schema, your GA snippet, and real images embedded.
6. Hand you: the HTML file, the sitemap line, the OG image brief, and the indexing reminder.

Then you:
1. Save the file into `public/blog/`.
2. Add the sitemap line.
3. `git push` → Vercel deploys.
4. Request indexing in Search Console (the brain reminds you).

That's the whole loop.

---

## Things You Can Say

**Plan & strategy**
- "What should I publish next month?"
- "Give me a content plan for the MBBS Bangladesh segment."
- "Which articles are the fastest wins right now?"

**Produce content**
- "Write article #22 — PLAB 1 study plan."
- "Build the `/mbbs-bangladesh` landing page."
- "Draft a comparison: AMC vs PLAB vs USMLE."

**Images**
- "Give me the OG image brief for this article." (always available)
- "Make this hero image in Canva instead of a brief."

**Audit & monitor**
- "Run the monthly SEO health check."
- "Is StudyRise showing up in AI answers? Check our top queries."
- "Why did blog traffic drop this month?"
- "Audit the spaced-repetition article against what's ranking."

**Deploy support**
- "I've pushed it — confirm it's live and indexable."

---

## How the Files Fit Together (you don't need to memorise this)

```
01 CONTEXT            → who StudyRise is (read first, always)
02 BRAND_VOICE        → how it sounds in writing
03 SEO_STRATEGY       → what to make and why
04 SEO_TECHNICAL_RULES→ the rules every HTML file obeys
05 CONTENT_PIPELINE   → the queue of 84 articles + landing pages
06 PRODUCTION_PLAYBOOK→ the step-by-step for making one article
07 IMAGE_PROTOCOL     → the locked image rules
08 DEPLOYMENT_GUIDE   → how the finished file gets to live
09 AUDIT_PLAYBOOK     → periodic SEO health checks
10 SITE_SHELL         → the shared frame every page wears
```

The brain navigates these itself. You just give it the job.

---

## What's Automated vs What's Yours

| Step | Who |
|---|---|
| Keyword & SERP research | 🤖 Brain |
| Writing the article | 🤖 Brain |
| Building the SEO HTML (with GA) | 🤖 Brain |
| Embedding real images | 🤖 Brain |
| OG image (brief, or Canva) | 🤖 Brain (you execute the brief) |
| Saving file + `git push` | 👤 You |
| Requesting indexing | 👤 You (brain reminds + can verify) |
| Confirming it's live | 🤖 Brain (via Vercel + fetch) |

---

## Two Standing Rules the Brain Follows

1. **Never guesses a medical or curriculum fact.** If it can't verify something (especially BMDC subject-to-phase placement), it flags it and asks you — because one wrong fact in a medical-niche article costs more trust than it's worth.
2. **The GA snippet (G-R38JK89PP5) is in every file.** You never have to ask.

---

## Keeping the Pipeline Current

The brain updates `05_CONTENT_PIPELINE.md` as it works — marking pieces in-progress/live and logging them. Periodically, re-upload the updated pipeline file to the project so its memory of "what's done" stays accurate. (Same for any file you ask it to revise.)

---

## First Three Moves (suggested)

1. **"Run a baseline SEO check"** — so you know where you stand today.
2. **"Build the `/mbbs-bangladesh` landing page"** — your biggest uncontested opportunity.
3. **"Write article #57"** — a genuine quick win to get the loop working end to end.

That's it. Tell the brain what you want, approve the brief and outline, and let it build.
