# 10D · CREATIVE PRODUCTION — Image Generation, Video Scripts, and Asset Briefs

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> **What this file is.** The production manual for creating social media visual assets. It contains ready-to-paste AI image generation prompts, video production scripts, thumbnail briefs, and a brand-consistent prompt library — all designed so you can go from "I need a post" to "it's published" as fast as possible. No face on camera. No stock photos. Everything brand-aligned.

> **Depends on:** `10A_SOCIAL_CONTENT_FORMATS.md` (which template to produce), `10_SOCIAL_PLAYBOOK.md` (voice, platform specs), Brand Kit v2.2 (colours, typography, logo), `07_IMAGE_PROTOCOL.md` (OG image standards), `02_BRAND_VOICE.md` (tone), `11_PRICING_MODEL.md` (CTA language).

> **Video constraint:** Istiaque does not appear on camera. All video content uses screen recordings, voiceover-over-visuals, animated text, or motion graphics.

---

## 1. Brand Asset Reference Card

Pin this. Every prompt and every asset must reference these values.

### 1.1 Colours

| Name | Hex | When to use |
|---|---|---|
| Deep Navy | `#0D1B3E` | Primary background for all social graphics |
| Sidebar Navy | `#0F172A` | Darker variant for contrast panels |
| Electric Blue | `#2563EB` | CTAs, links, accent highlights |
| Violet / Purple | `#7C3AED` | Gradient accent, secondary emphasis |
| Cyan | `#06B6D4` | Data highlights, stat numbers, accent text |
| White | `#FFFFFF` | Primary text on dark backgrounds |
| Light Grey | `#D1D5DB` | Secondary/body text on dark backgrounds |
| Slate Grey | `#64748B` | Source attributions, metadata, captions |
| Background Light | `#F8FAFC` | Light-mode card backgrounds (rare in social) |

### 1.2 Typography

| Use | Font | Weight | Notes |
|---|---|---|---|
| Headlines / titles | Inter | Bold (700) or ExtraBold (800) | Primary heading font for all social graphics |
| Display headlines | Plus Jakarta Sans | Bold (700) or ExtraBold (800) | Hero-level text (landing-page style graphics only) |
| Body text | Inter | Regular (400) | Explanatory text, descriptions |
| Data / numbers | Inter | Bold (700) | Large stat numbers, tabular-nums |
| Labels / captions | Inter | Medium (500) | Small text, source lines |

### 1.3 Logo usage

- **Dark backgrounds:** Use the full-color logo (gradient icon + white "StudyRise" text). File: `studyrise-logo-full-color.svg`
- **Placement:** Bottom-right corner (default) or bottom-centre. Always small — the logo supports, never dominates.
- **Clear space:** Equal to the icon height on all sides.
- **Never** recolour, stretch, rotate, or add shadows to the logo.

### 1.4 Visual style

- **Minimal.** Clean backgrounds, generous whitespace, no clutter.
- **Data-forward.** Numbers and evidence are the visual focal point, not decoration.
- **No stock photos.** Real screenshots, branded graphics, or abstract gradients only.
- **No illustrations of people.** Unless they're simple, abstract silhouettes. No faces.
- **No emojis in graphics** (except where a template explicitly specifies one, like 💡 in tip cards).

---

## 2. AI Image Generation — Master Prompt Library

These are ready-to-paste prompts for ChatGPT (DALL-E), Midjourney, or any text-to-image tool. Each prompt is tagged with the template it produces (from `10A_SOCIAL_CONTENT_FORMATS.md`).

### 2.1 Base prompt prefix

Add this to the beginning of every prompt to ensure brand consistency:

```
STYLE: Clean, minimal, professional social media graphic. Dark navy
background (#0D1B3E). Inter font family. No stock photos, no people,
no illustrations of faces. High contrast white text on dark background.
StudyRise brand — study planning platform. Logo placement: small,
bottom-right corner unless specified otherwise.
```

### 2.2 Prompt templates by format

---

#### P1: Single-Stat Card (Template S1)

**Dimensions:** 1080×1080px (Instagram/Facebook feed) or 1200×630px (OG/LinkedIn)

```
[BASE PREFIX]

Create a 1080x1080px social media graphic.
Background: solid dark navy (#0D1B3E).
Centre of the image: the number "[STAT]" in very large Inter ExtraBold
font, colour cyan (#06B6D4), approximately 120pt.
Below the number: one line of text "[CONTEXT SENTENCE]" in white
Inter Regular, approximately 20pt, centred.
Bottom-left corner: small grey text "[SOURCE]" in Inter Regular, 12pt,
colour slate (#64748B).
Bottom-right corner: StudyRise logo (small).
No decorative elements, no borders, no gradients. Pure data card.
```

**Variables to fill:**
- `[STAT]` — the number (e.g., "67%", "150", "4 months")
- `[CONTEXT SENTENCE]` — one line explaining the stat
- `[SOURCE]` — citation (e.g., "Cepeda et al., 2006")

---

#### P2: Myth vs. Fact Split (Template S2)

**Dimensions:** 1080×1080px

```
[BASE PREFIX]

Create a 1080x1080px split-panel social media graphic.
Left half: muted dark red-grey background (#2D1A1A).
  - Top: "✗ MYTH" in white Inter Bold, 16pt.
  - Centre: "[MYTH TEXT]" in white Inter Regular, 18pt, left-aligned
    with 40px padding.
Right half: dark navy background (#0D1B3E).
  - Top: "✓ FACT" in cyan (#06B6D4) Inter Bold, 16pt.
  - Centre: "[FACT TEXT]" in white Inter Regular, 18pt, left-aligned
    with 40px padding.
Thin vertical divider line between panels in dark grey (#374151), 1px.
Bottom-centre: StudyRise logo, small.
No illustrations, no icons beyond the ✗ and ✓ marks.
```

---

#### P3: Quick Tip Card (Template S3)

**Dimensions:** 1080×1080px

```
[BASE PREFIX]

Create a 1080x1080px social media card.
Background: smooth gradient from dark navy (#0D1B3E) at top-left to
dark purple (#4C1D95) at bottom-right.
Top-left, small text in cyan (#06B6D4), Inter Bold, 14pt: "💡 STUDY TIP"
Centre: "[TIP TITLE]" in white Inter Bold, 28pt, centred.
Below: "[2–3 LINE EXPLANATION]" in light grey (#D1D5DB) Inter Regular,
16pt, centred, max 3 lines.
Bottom-right: StudyRise logo, small.
No borders, no illustrations. Clean and minimal.
```

---

#### P4: Before/After Split (Template S4)

**Dimensions:** 1080×1080px

```
[BASE PREFIX]

Create a 1080x1080px split-panel social media graphic.
Left half: light grey background (#F3F4F6).
  - Top: "BEFORE ❌" in dark grey (#374151) Inter Bold, 18pt.
  - Centre: [DESCRIBE THE "BEFORE" STATE — e.g., "a messy handwritten
    to-do list on paper" or "a blank spreadsheet with no structure"]
  - Bottom caption: "[BEFORE LABEL]" in dark grey Inter Regular, 14pt.
Right half: dark navy background (#0D1B3E).
  - Top: "AFTER ✅" in cyan (#06B6D4) Inter Bold, 18pt.
  - Centre: [DESCRIBE THE "AFTER" STATE — e.g., "a clean digital study
    planner dashboard showing a structured weekly plan with progress bars"]
  - Bottom caption: "[AFTER LABEL]" in white Inter Regular, 14pt.
Bottom-right: StudyRise logo, small.

NOTE: For the "AFTER" side, use a real screenshot from the app when
possible. Only use AI generation for the "BEFORE" side or when both
sides are abstract/conceptual.
```

---

#### P5: Carousel Slide (Template C1/C2/C3)

**Dimensions:** 1080×1080px per slide

**Cover slide:**
```
[BASE PREFIX]

Create a 1080x1080px carousel cover slide.
Background: dark navy (#0D1B3E).
Centre: "[CAROUSEL TITLE]" in white Inter Bold, 32pt, centred,
max 2 lines.
Below the title: a thin cyan (#06B6D4) horizontal accent line, 60px wide.
Bottom-right: StudyRise logo, small.
No other elements. The title is the visual.
```

**Content slide (numbered):**
```
[BASE PREFIX]

Create a 1080x1080px carousel content slide.
Background: dark navy (#0D1B3E).
Top-left: "[SLIDE NUMBER]" in large cyan (#06B6D4) Inter ExtraBold,
48pt (e.g., "01", "02", "03").
Below: "[STEP HEADING]" in white Inter Bold, 24pt.
Below: "[2–3 LINE EXPLANATION]" in light grey (#D1D5DB) Inter Regular,
16pt, left-aligned.
Bottom-right: StudyRise logo, small.
Consistent layout across all slides — same text positions.
```

**Final slide (CTA):**
```
[BASE PREFIX]

Create a 1080x1080px carousel CTA slide.
Background: gradient from dark navy (#0D1B3E) to dark purple (#4C1D95).
Centre: "Try StudyRise free" in white Inter Bold, 28pt.
Below: "Start free — no card required." in light grey (#D1D5DB)
Inter Regular, 16pt.
Below: "www.studyrise.app" in cyan (#06B6D4) Inter Regular, 14pt.
Centre-bottom: StudyRise logo, medium size.
```

---

#### P6: YouTube Thumbnail (Template V6)

**Dimensions:** 1280×720px

```
[BASE PREFIX but 1280x720px]

Create a YouTube thumbnail, 1280x720px.
Background: dark navy (#0D1B3E) with a subtle purple (#7C3AED)
radial glow in the top-right corner (soft, not harsh).
Left 60%: "[HEADLINE — 4–6 words max]" in white Inter Bold, 42pt,
left-aligned, max 2 lines.
Right 40%: [DESCRIBE VISUAL — e.g., "a clean mockup outline of a
phone screen showing a study planner interface, slightly angled,
with a cyan glow behind it" or "an abstract ascending bar chart
in cyan and purple"].
StudyRise logo bottom-left, small.
No face, no arrows, no emojis, no red circles. Professional, clean.
Must be readable at 168x94px (mobile thumbnail preview size).
```

---

#### P7: Reel/Short Cover Frame (Templates V1–V4)

**Dimensions:** 1080×1920px (vertical)

```
[BASE PREFIX but 1080x1920px vertical]

Create a vertical cover frame, 1080x1920px.
Background: dark navy (#0D1B3E).
Centre: "[HOOK TEXT — max 8 words]" in white Inter Bold, 40pt,
centred, max 2 lines.
Below: "[SUBTITLE — max 10 words]" in cyan (#06B6D4) Inter Regular,
20pt, centred.
Bottom-centre: StudyRise logo, small.
Upper-right corner: subtle purple (#7C3AED) gradient glow (soft, ambient).
No other elements. Text-only, high contrast, readable in Reels grid.
```

---

#### P8: LinkedIn Document/Carousel Cover

**Dimensions:** 1080×1080px (PDF page)

```
[BASE PREFIX]

Create a 1080x1080px LinkedIn document cover page.
Background: dark navy (#0D1B3E).
Top: "StudyRise" in white Inter Bold, 16pt (brand identifier).
Centre: "[DOCUMENT TITLE]" in white Plus Jakarta Sans ExtraBold, 36pt,
centred, max 2 lines.
Below: "[SUBTITLE OR CONTEXT LINE]" in light grey (#D1D5DB) Inter
Regular, 16pt.
Bottom: thin cyan accent line, 40px wide, centred.
Bottom-right: StudyRise logo, small.
Professional, authoritative, no decoration.
```

---

## 3. Video Production Guide

All videos are produced without face on camera. Three production methods, from simplest to most involved:

### 3.1 Method A: Animated Text (easiest — Canva or CapCut)

**What it is:** Text appears on screen in sequence, synced with voiceover. Background is static or slowly shifting gradient. No screen recording needed.

**Best for:** Templates V2 (animated tip), V3 (data story).

**Production steps:**
1. Write the script using the template from `10A_SOCIAL_CONTENT_FORMATS.md`.
2. Open Canva (video mode) or CapCut. Set canvas to 1080×1920 (vertical).
3. Background: solid navy (#0D1B3E) or slow-moving navy-to-purple gradient.
4. Add text elements one by one on the timeline, timed to the voiceover.
5. Text animation: "Fade up" or "Typewriter" — nothing flashy. Each line appears, holds for 2–3 seconds, then fades or stays as the next line appears below.
6. Record voiceover separately in a quiet room. Calm, clear, moderate pace.
7. Add background music: lo-fi ambient or soft electronic, volume at 15–20% of voiceover.
8. Export at 1080×1920, 30fps, MP4.

**Voiceover recording tips:**
- **Microphone:** Any decent phone mic or USB mic in a quiet room. Don't overthink equipment.
- **Pace:** Slower than conversational. Leave 0.5-second pauses between sentences.
- **Tone:** Calm coach, not presenter. Talk as if explaining to one person sitting across from you.
- **Script:** Read from the template scripts in `10A_SOCIAL_CONTENT_FORMATS.md`. Don't improvise the first few times — read it as written.

### 3.2 Method B: Screen Recording (medium effort)

**What it is:** Recording the StudyRise app in use, with voiceover narrating each step. Text overlays label key actions.

**Best for:** Templates V1 (walkthrough), V5 (full tutorial).

**Production steps:**
1. Write the script using the template from `10A_SOCIAL_CONTENT_FORMATS.md`.
2. Set up demo data in the app matching the target audience (AMC plan for [EXAM], MBBS phase for [MBBS-BD], university semester for [UNI]).
3. **For Reels/Shorts (vertical):** Record your phone screen using the built-in screen recorder (iOS: Control Centre → Screen Recording. Android: Quick Settings → Screen Recorder). Navigate through the app as the script dictates.
4. **For YouTube long-form (horizontal):** Use the web app in a browser. Record screen with OBS Studio, QuickTime, or the browser's built-in screen recorder.
5. Import recording into CapCut or a video editor.
6. Add voiceover track — record separately and sync to the screen actions.
7. Add text overlays (Inter Bold, white or cyan, semi-transparent dark background strip behind text) to label each step: "Step 1: Set your exam date," "Step 2: Choose your subjects."
8. Add intro hook frame (use prompt P7 for a branded opening frame).
9. Add outro CTA frame: "Try StudyRise free — link in bio/description."
10. Add background music at low volume.
11. Export: 1080×1920 for Shorts/Reels, 1920×1080 for YouTube long-form.

**Screen recording rules:**
- **Clear all notifications** before recording. No personal messages, no embarrassing app badges.
- **Use demo data only.** Never record with real user data visible.
- **Slow, deliberate taps.** Don't rush. Each tap should be visible and intentional.
- **Pause on each completed state** for 1–2 seconds so the viewer can absorb it.

### 3.3 Method C: Hybrid (animated text + screen recording)

**What it is:** Combines branded text frames (hook, transitions, CTA) with screen recordings of the app. The most polished format.

**Best for:** Templates V4 ("How I'd Do It" plan), ad creatives, product launch videos.

**Production steps:**
1. Create the branded frames (hook, transitions, CTA) using prompts from §2.
2. Record the screen sections per Method B.
3. Interleave in the editor: branded hook frame → screen recording section → branded transition → screen recording → branded CTA.
4. Voiceover runs continuously across all sections.
5. Export at the appropriate resolution.

---

## 4. Video Script Templates — Ready to Record

These are complete scripts. Fill in the `[BRACKETS]`, record the voiceover, produce using Method A, B, or C.

### 4.1 Script: The 30-Second Animated Tip (Method A)

```
VISUAL                              VOICEOVER
──────────────────────────────────  ──────────────────────────────────
[0–1.5s]                            (silence — let the text land)
Text appears: "[HOOK — counterintuitive
statement, max 8 words]"
e.g., "You're studying wrong."

[1.5–3s]                            (silence or soft "Here's why.")
Beat. Background shifts slightly.
Text: "Here's the fix ↓"

[3–8s]                              "[POINT 1 — one sentence explaining
Text fades in, line by line:         the problem or misconception]"
"[POINT 1 TEXT]"

[8–15s]                             "[POINT 2 — the evidence or
Text fades in:                       mechanism behind the fix]"
"[POINT 2 TEXT]"

[15–22s]                            "[POINT 3 — the actionable
Text fades in, stays on screen:      takeaway the viewer can use today]"
"[POINT 3 TEXT — the punchline]"

[22–27s]                            "[CLOSING LINE — one sentence
Text: large, bold, cyan:             that reframes everything]"
"[PUNCHLINE REFRAME]"
e.g., "Stop rereading. Start recalling."

[27–30s]                            (silence)
Text: "Follow @studyrise.app"
or "Try StudyRise free — link in bio"
Logo appears.
```

**Total word count target:** 50–70 words of voiceover.

---

### 4.2 Script: The 60-Second Screen Walkthrough (Method B)

```
VISUAL                              VOICEOVER
──────────────────────────────────  ──────────────────────────────────
[0–2s]                              (silence)
Branded hook frame (P7):
"[WHAT THE VIEWER WILL SEE]"
e.g., "Set up a 4-month AMC plan
in under 2 minutes."

[2–5s]                              "Here's exactly how I'd set up
Screen recording begins.             a study plan for [EXAM/SUBJECT]
App opens to the planning screen.    if I had [TIMEFRAME]."

[5–15s]                             "First, [STEP 1 — what you do
Text overlay: "Step 1: [LABEL]"      and why]. You can see it
Screen shows the action.             [DESCRIBE WHAT'S VISIBLE]."

[15–30s]                            "Next, [STEP 2 — what you do
Text overlay: "Step 2: [LABEL]"      and why]."
Screen shows the action.

[30–45s]                            "Then [STEP 3 — what you do].
Text overlay: "Step 3: [LABEL]"      [BRIEF EXPLANATION of what the
Screen shows the action.             app does with this input]."

[45–52s]                            "That's it. You now have
Screen shows the finished state      [CONCRETE RESULT — e.g., '16 weeks
— the completed plan/dashboard.      broken into daily targets with
Pause to let it register.            spaced repetition built in.']"

[52–58s]                            "[HONEST CAVEAT — e.g., 'Adjust
                                     the daily target to your schedule.
                                     This is a framework, not a rule.']"

[58–60s]                            (silence)
Branded CTA frame:
"Try StudyRise free"
"www.studyrise.app"
Logo.
```

---

### 4.3 Script: The 45-Second Data Story (Method A or C)

```
VISUAL                              VOICEOVER
──────────────────────────────────  ──────────────────────────────────
[0–2s]                              (silence)
Large stat on screen:
"[NUMBER]" in cyan, 72pt.
e.g., "50%"

[2–5s]                              "[STAT IN CONTEXT — e.g., '50% of
Below the number, text appears:      first-time AMC MCQ candidates
"[CONTEXT LINE]"                     don't pass.']"

[5–10s]                             "That's not because the exam is
Background shifts. New text:         impossible. [REFRAME — e.g.,
"[REFRAME STATEMENT]"                'It's because most people plan
                                     wrong.']"

[10–20s]                            "[EVIDENCE POINT 1 — cite source]"
Animated number or simple bar
appears. Source text in small grey.

[20–30s]                            "[EVIDENCE POINT 2]"
Second data point appears.

[30–38s]                            "[THE TAKEAWAY — one sentence
Text on screen, large, white:        that turns the data into action.
"[TAKEAWAY TEXT]"                    e.g., 'The difference between
                                     passing and failing is almost
                                     never intelligence. It's structure.']"

[38–45s]                            (silence)
CTA frame:
"Build your plan — link in bio."
Logo.
```

**Rules:**
- Every stat must be verified. Include the source on screen (small grey text).
- Never round misleadingly. "Roughly 50%" is honest. "Over 50%" when it's 48% is not.

---

## 5. Canva Workflow — Fastest Path to a Post

For solo production, Canva is the most efficient tool. Here's the workflow:

### 5.1 One-time setup

1. **Create a StudyRise brand kit in Canva:**
   - Colours: Navy (#0D1B3E), Purple (#7C3AED), Cyan (#06B6D4), Blue (#2563EB), White, Light Grey (#D1D5DB), Slate (#64748B).
   - Fonts: Upload Inter (all weights). Plus Jakarta Sans for display.
   - Logo: Upload `studyrise-logo-full-color.svg` (dark backgrounds) and `studyrise-logo-white.svg` (light backgrounds).

2. **Create master templates** — one Canva design for each of these, saved as templates:
   - 1080×1080 stat card (P1)
   - 1080×1080 myth vs fact (P2)
   - 1080×1080 tip card (P3)
   - 1080×1080 carousel slide (P5 — cover, content, CTA as separate pages)
   - 1280×720 YouTube thumbnail (P6)
   - 1080×1920 Reel cover frame (P7)
   - 1080×1920 video canvas (for Method A animated text videos)

3. **Save the template set.** Every new post starts by duplicating a template — never from scratch.

### 5.2 Per-post workflow

1. Decide which template to use (from `10A_SOCIAL_CONTENT_FORMATS.md`).
2. Duplicate the matching Canva template.
3. Swap the text placeholders with your content.
4. If the post needs an AI-generated visual element (abstract graphic, conceptual illustration), generate it using the prompts in §2 and place it into the Canva design.
5. Export: PNG for static images, MP4 for videos.
6. Write the caption using the caption structure from `10A_SOCIAL_CONTENT_FORMATS.md`.
7. Post.

---

## 6. Screenshot Production Guide

Many posts (especially Product in Action pillar) require real app screenshots.

### 6.1 Screenshot capture rules

- **Always use demo data.** Create a demo account with realistic but fictional data. Never capture real user data.
- **Demo data per audience:**
  - [EXAM] AMC: "Dr. Sarah Chen," 4-month AMC MCQ plan, 3 subjects, 120 days to exam.
  - [MBBS-BD]: "Rafiq Ahmed," 2nd Professional, Pharmacology + Forensic Medicine, Phase 2.
  - [UNI]: "Alex Torres," Spring Semester, 4 units, midterms in 3 weeks.
- **Clean the screen before capture.** No notification badges, no personal tabs, no browser bookmarks visible. Full-screen the app.
- **Capture at the right resolution:**
  - Phone screenshots: use a phone with a high-resolution display. iOS: Side button + Volume Up. Android: Power + Volume Down.
  - Web screenshots: browser dev tools → device toolbar → set to 1080px wide → capture.

### 6.2 Screenshot framing for social

- **Full-screen captures** work for screen recording walkthroughs (V1, V5).
- **Cropped/focused captures** work better for static posts (S4, product feature highlights). Crop to the specific feature being highlighted — don't show the full screen if only the analytics chart matters.
- **Device frames** (optional): Wrapping a screenshot in a phone mockup frame adds polish for Instagram feed posts. Canva has device mockup templates. Use a neutral phone frame (black or dark grey) — never brand-specific (no iPhone-specific notch).

---

## 7. Background Music Guide

### 7.1 Where to find royalty-free music

- **YouTube Audio Library** (free, no attribution required for YouTube)
- **Pixabay Music** (free, CC0)
- **Artlist** (paid, $10–17/month — best quality for serious production)

### 7.2 Music selection rules

- **Genre:** Lo-fi ambient, soft electronic, minimal piano. Nothing with lyrics. Nothing upbeat or energetic — it clashes with the calm-coach voice.
- **Volume:** 15–20% of voiceover level. Music supports, never competes.
- **Consistency:** Use 2–3 tracks and rotate them. A consistent sonic identity builds recognition.
- **For [MBBS-BD] content:** Even calmer. Ambient pads only. No rhythm-heavy tracks.

---

## 8. Asset Naming Convention

Every file you produce follows this naming pattern:

```
{platform}_{format}_{audience}_{topic-slug}_{date}.{ext}

Examples:
ig_reel_exam_amc-4-month-plan_2026-06-25.mp4
fb_stat-card_all_spaced-repetition-67pct_2026-06-25.png
yt_thumbnail_exam_amc-plan-walkthrough_2026-06-25.png
ig_carousel_uni_midterm-triage_2026-06-25.png
li_doc-cover_exam_build-update-500-users_2026-06-25.png
```

**Platform codes:** `ig` (Instagram), `fb` (Facebook), `yt` (YouTube), `li` (LinkedIn)
**Format codes:** `reel`, `short`, `stat-card`, `tip-card`, `myth-fact`, `carousel`, `thumbnail`, `cover-frame`, `doc-cover`, `before-after`
**Audience codes:** `exam`, `mbbs`, `uni`, `all`

---

## 9. Quality Checklist — Before Publishing Any Asset

Run through this before posting. Every item.

| # | Check | Pass? |
|---|---|---|
| 1 | **Brand colours correct?** Navy, purple, cyan, blue, white — no off-brand colours. | ☐ |
| 2 | **Inter font used?** (or Plus Jakarta Sans for display headlines). No other fonts. | ☐ |
| 3 | **Logo present and correctly placed?** Small, corner, not dominant. | ☐ |
| 4 | **Text readable at mobile size?** Preview on your phone before posting. Squint test. | ☐ |
| 5 | **No banned words?** Check against `02_BRAND_VOICE.md` §7.2 and `11_PRICING_MODEL.md` §7.2. | ☐ |
| 6 | **CTA language correct?** "Try StudyRise free" — not "free trial," "unlock," "premium," "upgrade." | ☐ |
| 7 | **No stock photos?** Real screenshots, branded graphics, or abstract visuals only. | ☐ |
| 8 | **Facts verified?** Every stat, pass rate, or exam detail checked against primary source. Source visible on graphic. | ☐ |
| 9 | **Correct dimensions?** Instagram: 1080×1080 or 1080×1920. YouTube: 1280×720 or 1080×1920. Facebook: 1200×630 or 1080×1080. | ☐ |
| 10 | **[MBBS-BD] tone check?** No gamification, no pressure, no imported clichés. | ☐ |
| 11 | **Demo data in screenshots?** No real user data visible. | ☐ |
| 12 | **File named correctly?** Following §8 convention. | ☐ |

---

## 10. Common Production Scenarios — Quick Reference

| I need to... | Use prompt | Method | Time estimate |
|---|---|---|---|
| Create a stat card for Instagram | P1 | Generate in AI tool or Canva template | 10 min |
| Create a myth vs. fact graphic | P2 | Generate in AI tool or Canva template | 10 min |
| Create a 5-slide carousel | P5 (×5 slides) | Canva template, duplicate pages | 20 min |
| Create a 30-second animated tip Reel | P7 (cover) + Script 4.1 | Method A (Canva video) | 30–45 min |
| Create a 60-second app walkthrough | P7 (cover) + Script 4.2 | Method B (screen recording) | 45–60 min |
| Create a YouTube thumbnail | P6 | Generate in AI tool or Canva template | 10 min |
| Create a LinkedIn document carousel | P8 (cover) + P5 (content pages) | Canva, export as PDF | 25 min |
| Create a complete article echo set (Day 0–7) | P1 + P7 + P5 + Script 4.1 or 4.2 | Mixed methods | 90–120 min |

---

## CHANGELOG

| Date | Change |
|---|---|
| 2026-06-25 (v1) | File created. Brand asset reference card (colours, typography, logo, visual style). AI image generation master prompt library: 8 prompt templates (P1–P8) for stat cards, myth/fact, tip cards, before/after, carousel slides, YouTube thumbnails, Reel covers, LinkedIn covers — all with brand-consistent hex values and font specs. Three video production methods (animated text, screen recording, hybrid) for no-face-on-camera constraint. Three complete video scripts (30s tip, 60s walkthrough, 45s data story). Canva workflow guide with one-time setup and per-post workflow. Screenshot production guide with demo data specs per audience. Background music guide. Asset naming convention. 12-item quality checklist. Production time estimates. Aligned with Brand Kit v2.2, 10A templates, 02 voice, 11 pricing. |

---

<!-- docnav-related -->
### Related docs
- [10 · SOCIAL PLAYBOOK — The Operating System](10_SOCIAL_PLAYBOOK.md)
- [10A · SOCIAL CONTENT FORMATS — Post Templates](10A_SOCIAL_CONTENT_FORMATS.md)
- [10B · SOCIAL CALENDAR — Schedule and Triggers](10B_SOCIAL_CALENDAR.md)
- [10C · PAID PROMOTION — Advertising Playbook](10C_PAID_PROMOTION.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [11 · PRICING MODEL — Tiers, Copy Rules, and CTAs](11_PRICING_MODEL.md)
- Brand Kit v2.2 (colours, typography, logo system)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
