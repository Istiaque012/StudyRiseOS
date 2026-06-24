# 10B · SOCIAL CALENDAR — Schedule, Triggers, and Content Calendars

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> **What this file is.** The timing layer of the social operation. It tells you *when* to post, *what* to promote after publishing an article, and *which seasonal moments* to build content around — broken down by audience segment. It also defines the Article Echo Protocol: the automatic social promotion sequence that follows every blog article.

> **Depends on:** `10_SOCIAL_PLAYBOOK.md` (voice, pillars, cadence, platform specs), `10A_SOCIAL_CONTENT_FORMATS.md` (which template to use), `05_CONTENT_PIPELINE.md` (article queue), `11_PRICING_MODEL.md` (CTA rules).

---

## 1. Article Echo Protocol

Every blog article gets a structured social promotion sequence. This is not optional — if you publish an article and don't run the echo, you've done half the work for half the result.

### 1.1 The sequence

| Timing | What | Template (from 10A) | Platforms |
|---|---|---|---|
| **Day 0** (publish day) | Launch announcement | ST1 (story sequence) + text post with excerpt | All four platforms |
| **Day 1** | Key insight pull | S1 (stat card) or S3 (tip card) | Instagram, Facebook |
| **Day 3** | Carousel or short-form video | C1 (step guide) or V2 (animated tip) | Instagram, YouTube Shorts |
| **Day 5** | Group share | F1 (helpful answer) | Facebook groups (segment-matched) |
| **Day 7** | Video companion | V1 (screen walkthrough) or V3 (data story) | YouTube, Instagram Reels |
| **Day 14** | Pull-quote or secondary insight | S1 or S2 (myth vs fact) | Instagram, LinkedIn |
| **Day 30+** | Evergreen reshare | Text post referencing the article, fresh angle | Facebook, LinkedIn |

### 1.2 Day 0 — Launch day specifics

The launch post is the most important. It runs on all four platforms simultaneously, adapted per channel:

**Facebook (page post):**
```
[Article title as the opening line — bold, direct]

[2–3 sentence excerpt from the article's opening — the hook]

[1 sentence on why this matters to the reader]

Read the full guide → [article URL with UTM: utm_source=facebook&utm_medium=social&utm_campaign={slug}-launch]
```

**Instagram (story sequence — Template ST1):**
- Story 1: Bold question or statement from the H1
- Story 2: One key stat or finding from the article
- Story 3: OG image
- Story 4: "Read the full guide ↓" + link sticker

**YouTube (community post or Short):**
- If a companion video exists: publish the Short/long-form and link the article in the description.
- If no video: community post with the key insight + article link.

**LinkedIn:**
- Professional-angle text post (Template L2 or L3). Frame the article's thesis as a professional insight. Link in the post body (LinkedIn is the one platform where links in the body are acceptable for launch posts because the goal is clicks, not engagement).

### 1.3 Deciding what to echo

Not every article gets the full 7-step sequence. Use this decision tree:

```
Is this a flagship pillar article or a high-priority cluster piece?
  → YES → Full 7-step echo (Day 0 through Day 30+)
  → NO → Is it segment-specific content?
           → YES → Abbreviated echo: Day 0, Day 3, Day 5
                    (only on that segment's primary platforms)
           → NO → Minimum echo: Day 0 + Day 3
```

### 1.4 Echo log

Track every echo in a simple table. This prevents double-posting and ensures nothing falls through.

```markdown
| Article slug | Day 0 | Day 1 | Day 3 | Day 5 | Day 7 | Day 14 | Day 30 |
|---|---|---|---|---|---|---|---|
| amc-mcq-study-plan | ✅ | ✅ | ✅ | ✅ | — | — | — |
| spaced-repetition-for-exams | ✅ | ✅ | — | — | — | — | — |
```

---

## 2. Weekly Posting Calendar — Template

This is the minimum viable weekly schedule from `10_SOCIAL_PLAYBOOK.md` §7, now mapped to specific days and content types. Adapt to your actual capacity — consistency matters more than volume.

### 2.1 Default weekly grid

| Day | Facebook | Instagram | YouTube | LinkedIn |
|---|---|---|---|---|
| **Monday** | Study tip (S3) or stat (S1) | Reel (V2) or carousel (C1) | — | Build update (L1) or data insight (L2) |
| **Tuesday** | — | Story (poll or tip) | — | — |
| **Wednesday** | Article share or group post (F1) | Static post (S1/S2/S4) | Short (V2 or V3) | — |
| **Thursday** | — | Story (if article echo due) | — | Professional take (L3) |
| **Friday** | Community post or reshare | Carousel (C1/C2/C3) | — | — |
| **Saturday** | — | Reel (V1 or V4) | Short (V1 or V4) | — |
| **Sunday** | Rest or batch-create next week's content | — | Long-form upload (if ready) | — |

### 2.2 Batching rules

- **Sunday or Monday:** Write all captions for the week. Prepare all image generation prompts.
- **One recording session per week:** Record all Reels and Shorts in one sitting (screen recordings, voiceover). Edit in the same session or the next day.
- **Never create and post on the same day** unless it's a time-sensitive echo (Day 0 launch). Same-day creation leads to rushed, lower-quality content.

### 2.3 Time-of-day guidelines

| Platform | Best posting windows (audience local time) | Notes |
|---|---|---|
| Facebook | 9–11 AM, 7–9 PM | [MBBS-BD]: Bangladesh Standard Time. [EXAM]: mix of AEST, GMT, EST. |
| Instagram | 7–9 AM, 11 AM–1 PM | Early morning catches students before classes. Lunch break is a second window. |
| YouTube | Upload any time; algorithm distributes over 24–48h | Shorts: publish by 10 AM. Long-form: weekday mornings. |
| LinkedIn | 8–10 AM weekdays | Professional hours. Never post on weekends. |

**Multi-timezone note:** StudyRise's audiences span Bangladesh (BST/UTC+6), Australia (AEST/UTC+10), UK (GMT/BST), and global. There is no single "best time." Default to **Bangladesh time for [MBBS-BD] content**, **Australian morning for [EXAM] AMC content**, and **global average (9 AM UTC) for [ALL] content**.

---

## 3. Segment Content Calendar — [EXAM] AMC MCQ

AMC MCQ is available year-round (February through November) at Pearson VUE centres worldwide. There are no fixed seasonal deadlines — candidates book within a 12-month authorisation window. This means the calendar is **not event-driven but cycle-driven**: content follows the natural preparation arc, not a single exam date.

### 3.1 The AMC preparation arc

Most AMC candidates plan 3–6 months of study. Content maps to where they are in that arc:

| Arc stage | Months out | Content focus | Example posts |
|---|---|---|---|
| **Decision** | 6+ months | "Should I sit the AMC?" / pathway overview / eligibility | "AMC MCQ vs Clinical: which comes first?" / "What does AMC authorisation actually involve?" |
| **Planning** | 4–6 months | How to build a plan / resource selection / daily targets | "How I'd plan 4 months for AMC MCQ" (V4) / "How many questions per day is realistic?" (S1) |
| **Execution** | 2–4 months | Study technique / weak-area management / progress tracking | "What to do when a topic won't stick" (V2) / "Your AMC dashboard after 2 weeks" (V1) |
| **Final stretch** | 0–2 months | Mock exam strategy / exam-day logistics / mental preparation | "3 things to do in your last week before AMC" (C1) / "What to bring to Pearson VUE" (S3) |
| **Post-exam** | After sitting | Results interpretation / next steps (Clinical) / retake strategy | "AMC results: what the score breakdown means" (L2) / "Failed AMC MCQ? Here's the recovery plan" (S3) |

### 3.2 Monthly content themes — AMC

Because candidates are at different stages year-round, **rotate through the arc stages monthly** so every follower encounters relevant content regardless of when they started following.

| Month | Primary theme | Secondary theme | Suggested posts (3–4) |
|---|---|---|---|
| **January** | Planning (new year, new study plans) | Decision (attract new candidates) | "How to plan your AMC year" (C1), "AMC MCQ: the 5 things nobody tells you" (V2), stat card on pass rates (S1) |
| **February** | Execution (exam season begins) | Study technique | Screen walkthrough: setting up a plan (V1), myth vs fact: rereading vs recall (S2), group post on daily targets (F1) |
| **March** | Study technique deep dive | Planning for mid-year sitters | Spaced repetition explainer (V3), carousel on weak-area management (C1), LinkedIn data post on retention research (L2) |
| **April** | Execution | Final stretch (for May/June sitters) | "What your analytics show after 6 weeks" (V1), tip card: mock exam strategy (S3), before/after planning screenshot (S4) |
| **May** | Final stretch | Post-exam (for Feb/March sitters) | "Last-week checklist" (C1), "What to expect at Pearson VUE" (S3), results interpretation (L2) |
| **June** | Post-exam + Decision | Planning (for late-year sitters) | Recovery plan for retakers (S3), "Is AMC right for you?" (L3), new-plan walkthrough (V4) |
| **July** | Planning | Execution | "How I'd plan 4 months from today" (V4), resource comparison carousel (C2), group post on study resources (F1) |
| **August** | Execution | Study technique | Recall technique Reel (V2), progress tracking walkthrough (V1), stat on question-per-day targets (S1) |
| **September** | Execution + Final stretch | Community stories | "What 30 days of structured study looks like" (S4), myth vs fact: cramming (S2), user story reshare if available (L1) |
| **October** | Final stretch | Post-exam (for Aug/Sep sitters) | "Your AMC in 3 weeks: what to focus on" (C1), exam logistics tip (S3), score breakdown explainer (V3) |
| **November** | Post-exam + Decision | Year-end reflection | "AMC 2026 wrap-up: what we learned" (L1), planning-for-2027 carousel (C1), next-steps after passing (L2) |
| **December** | Decision + Planning | Rest and recharge | Light content. "Planning your AMC timeline for 2027" (S3), year-in-review build update (L1). Reduced posting cadence. |

### 3.3 AMC-specific posting rules

- **Never guess a pass rate, fee, or format change.** Verify against the official AMC website before every post. Include "as of [Month Year]" on any date-sensitive claim.
- **Authorisation window content** is evergreen — "how to book at Pearson VUE," "what to bring to the exam" — and can be reshared quarterly.
- **Clinical exam content** is parked until StudyRise supports Clinical Mode. Don't create content that implies the app handles Clinical preparation.
- **Facebook groups for AMC** (e.g., "AMC MCQ Study Group," "IMG Australia") are high-value. Share there weekly using Template F1. Follow group rules.

---

## 4. Segment Content Calendar — [MBBS-BD] Bangladesh

The BMDC academic year is anchored by two fixed events: **professional examinations in May and November**. Everything in the MBBS calendar revolves around these two windows.

### 4.1 The BMDC academic cycle

```
         Jan    Feb    Mar    Apr    MAY     Jun    Jul    Aug    Sep    Oct    NOV     Dec
         ├──────────────────────────┤ EXAM  ├──────────────────────────┤ EXAM  ├──────┤
         │    Teaching period       │WINDOW │    Teaching period       │WINDOW │ Break│
         │    (attendance, items,   │       │    (attendance, items,   │       │      │
         │     formatives)          │       │     formatives)          │       │      │
         │                          │       │                          │       │      │
     ┌───┤                     ┌───┤       ┌───┤                  ┌───┤       │      │
     │Pre│                     │Pre│       │Pre│                  │Pre│       │      │
     │sem│                     │exam       │sem│                  │exam       │      │
     │start                    │prep│      │start                 │prep│      │      │
```

### 4.2 Monthly content themes — MBBS Bangladesh

| Month | Academic phase | Content focus | Suggested posts (2–3) | Tone reminder |
|---|---|---|---|---|
| **January** | Mid-teaching period | Attendance tracking, formative preparation | "How attendance is calculated per class type" (S1), walkthrough: logging attendance in StudyRise (V1) | Calm, informational |
| **February** | Teaching continues | Study technique adapted to MBBS, item completion | "Clearing your card items on time" (S3), carousel: SAQ writing strategy (C1) | Practical, no pressure |
| **March** | Pre-exam awareness | Eligibility check, formative score tracking | "Are you eligible to sit? A quick self-check" (C1), stat card on eligibility gates (S1) | Supportive, factual |
| **April** | Exam preparation begins | Exam prep mode, viva preparation, revision strategy | "Preparing for your professional viva" (C1), "How to revise 3 subjects in 4 weeks" (V4-adapted for MBBS) | Calm, structured. **No urgency framing.** |
| **May** | **PROFESSIONAL EXAMS** | Exam logistics, exam-day calm, light encouragement | "What to bring to your professional exam" (S3), "Your eligibility dashboard — final check" (V1). **Reduce posting frequency during exam weeks.** | **Maximum restraint.** No "you've got this!" No countdown pressure. |
| **June** | Results + new phase begins | Results interpretation, supplementary guidance, new-phase planning | "Understanding your grade breakdown" (S1), "Starting a new phase: what changes" (S3) | Honest, supportive. Supplementary content is handled with care — never shame. |
| **July** | Early teaching period | Fresh start, attendance habits, new-subject orientation | "Your 2nd/3rd/Final Prof: what's different" (C1), walkthrough: setting up a new phase in StudyRise (V1) | Welcoming, grounded |
| **August** | Teaching continues | Study technique, formative tracking, integrated teaching | "How formative marks feed into your written paper" (S1), "Integrated teaching: what counts" (S3) | Informational |
| **September** | Mid-teaching | Item completion, viva question bank, review techniques | "Using the question bank for viva prep" (V1), tip on SAQ technique (V2) | Practical |
| **October** | Pre-exam awareness | Eligibility self-check, revision planning | "Eligibility gates explained: attendance, formatives, components" (C1), "Planning your November revision" (S3) | Supportive. **No fear-of-failing copy.** |
| **November** | **PROFESSIONAL EXAMS** | Same as May — exam logistics, light support, reduced posting | Same templates as May, adapted. | **Maximum restraint.** |
| **December** | Break / results | Rest, results, supplementary planning if needed | Light content only. "Take a break — you earned it." Results guidance if they land in December. | Warm, calm |

### 4.3 MBBS-BD-specific posting rules

- **The restrained tone from `02_BRAND_VOICE.md` and `10_SOCIAL_PLAYBOOK.md` §5.3 applies to every post, every month.** No gamification. No pressure framing. No imported study-influencer energy.
- **During exam months (May, November):** reduce posting frequency to 1–2 posts per week maximum. Students are sitting exams — they don't want to be marketed to. Any posts during exam weeks should be purely supportive (exam logistics, calm encouragement) or not posted at all.
- **Supplementary exam content** requires extreme sensitivity. A student who failed a subject is under enormous stress. Content should be factual ("here's what the supplementary process looks like") and never framed as failure ("bounce back!" "don't give up!"). Acknowledge reality without performing optimism.
- **BMDC curriculum facts** are sourced exclusively from `FEATURES.md`. If the detail isn't there, flag it with `[VERIFY: BMDC source needed]` and don't post until confirmed.
- **Facebook groups for Bangladeshi medical colleges** are the primary discovery channel. Share there using Template F1 with full [MBBS-BD] tone compliance. Many groups use Bangla — natural code-switching is fine, full Bangla posts only with Istiaque's approval.
- **Never post content that implies a student needs Pro to pass.** The ethical floor is free. This audience's wellbeing comes before conversion metrics.

### 4.4 BMDC event triggers

These are fixed annual events. When they happen, the brain should proactively suggest social content.

| Event | Approximate timing | Social action |
|---|---|---|
| Professional exam dates announced by universities | ~4 weeks before May/November | Post: eligibility self-check reminder (C1). Group share (F1). |
| Exam week begins | Early May / Early November | Reduce posting. Optional: one calm "you're prepared" post. No product CTAs during exam week. |
| Results published | ~6–8 weeks after exams | Post: results interpretation guide. Supplementary guidance (with sensitivity). |
| New academic session begins | Varies by college | Post: new-phase setup walkthrough (V1). "What changes in [Phase X]" (C1). |
| Supplementary exam window | ~2–3 months after results | Post: factual supplementary preparation guidance. **Maximum sensitivity.** |
| BMDC policy announcements | Irregular, unpredictable | If relevant: factual explainer post. Verify from official source before posting. |

---

## 5. Segment Content Calendar — [UNI] University

University students follow semester cycles. The challenge: semesters vary by country, hemisphere, and institution. StudyRise's university audience is global, so the calendar uses a **dual-hemisphere model** with content that adapts to both Northern and Southern hemisphere academic years.

### 5.1 The dual semester cycle

```
Northern Hemisphere (US, UK, EU, Bangladesh universities):
Jan──────────Apr  May──Aug  Sep──────────Dec
│  Spring sem  │  Summer  │  Fall/Autumn  │
│  Midterms→   │  Break   │  Midterms→    │
│  Finals Apr  │          │  Finals Dec   │

Southern Hemisphere (Australia, NZ, parts of Asia):
Feb──────────Jun  Jul──Aug  Aug──────────Nov
│  Sem 1       │  Break   │  Sem 2        │
│  Midterms→   │          │  Midterms→    │
│  Finals Jun  │          │  Finals Nov   │
```

### 5.2 Monthly content themes — University

Content is designed to be hemisphere-neutral where possible. When hemisphere-specific, post both versions.

| Month | Northern hemisphere phase | Southern hemisphere phase | Content focus | Suggested posts (2–3) |
|---|---|---|---|---|
| **January** | Spring semester starts | Summer break / O-Week prep | New-semester planning, goal setting | "Setting up your semester in 15 minutes" (V1), "How many units is too many?" (S3), planning carousel (C1) |
| **February** | Teaching begins | Sem 1 starts | Study routine establishment, time management | "The weekly study schedule that actually works" (C1), tip: time-blocking for university (V2) |
| **March** | Midterm prep (N) | Teaching (S) | Midterm strategy, catch-up planning | "Midterms in 2 weeks: what to prioritise" (C1), "Behind on readings? Here's the triage plan" (S3) |
| **April** | Finals prep (N) | Teaching continues (S) | Revision techniques, exam strategy | "How to revise 5 units in 3 weeks" (V4), "Active recall for university finals" (V2), before/after planner screenshot (S4) |
| **May** | Finals + summer break (N) | Midterm prep (S) | Finals logistics + fresh midterm content | "Final exam week survival" (S3), "Midterm strategy" (C1 for S-hemisphere) |
| **June** | Summer break (N) | Finals prep (S) | Light content (N). Revision content (S). | "Planning your next semester over summer" (S3), finals revision carousel (C1 for S) |
| **July** | Summer (N) | Break / results (S) | Evergreen study technique content | "3 study methods you should try next semester" (C3), "Your study planner, explained" (V1) |
| **August** | Fall semester prep (N) | Sem 2 starts (S) | New-semester planning (both hemispheres) | "Back to uni: your first-week setup" (V1), semester planning carousel (C1) |
| **September** | Teaching begins (N) | Teaching continues (S) | Routine building, assignment planning | "How to plan around assignment deadlines" (V2), tip: don't study every subject every day (S3) |
| **October** | Midterms (N) | Pre-finals (S) | Midterm + revision content | "Midterm triage: what to study first" (C1), "How your planner adapts when you miss a day" (V1) |
| **November** | Pre-finals (N) | Finals (S) | Revision strategy for both | "Final stretch: 3 weeks to finals" (C1), active recall tip (V2) |
| **December** | Finals + break (N) | Summer break (S) | Finals logistics, then light/rest content | "Done for the year? Here's what to do with your data" (S3). Reduce posting late December. |

### 5.3 University-specific posting rules

- **Instagram is the primary platform.** University students are Instagram-first. Prioritise Reels and carousels on this platform.
- **YouTube Shorts** work well for quick study tips — the search-based discovery gives university content a long tail.
- **Facebook** is relevant for university-specific groups in some regions (Bangladesh, Southeast Asia, parts of Africa). Use Template F1 for group shares.
- **LinkedIn** is low priority for this segment — most university students aren't active there yet.
- **Tone:** The lightest of the three segments. Practical, peer-level, slightly more casual than [EXAM]. But still no hollow motivation, no "grind" culture, no gamification.
- **Hemisphere-sensitive content:** When posting about midterms or finals, acknowledge both cycles: "Whether you're heading into midterms or just getting started — here's how to plan your week." Or post two versions on different days.
- **Assignment/deadline content** is high-value and high-save-rate. "How to plan around 5 assignments due in 3 weeks" performs well because it's immediately actionable.

---

## 6. Cross-Segment Content Calendar

Some content serves all three audiences. These [ALL] posts fill the Study Technique pillar (40% of posting volume) and don't need segment-specific timing.

### 6.1 Evergreen study technique topics

These can be posted any week, any month. Rotate through them to keep the feed varied:

| Topic | Format | Frequency |
|---|---|---|
| Spaced repetition explained | V2 (animated tip), V3 (data story) | Every 6–8 weeks |
| Active recall technique | V2, C1 (how-to carousel) | Every 6–8 weeks |
| How to plan a study schedule | V4 ("How I'd do it"), C1 | Every 4–6 weeks |
| The Pomodoro technique | S3 (tip card), V2 | Every 8 weeks |
| What to do when you're behind | S3, V2 | Every 6 weeks |
| Myth vs fact (study misconceptions) | S2 | Monthly |
| Before/after planning screenshots | S4 | Every 4–6 weeks |
| "Why your study plan fails" | V2 (animated tip) | Every 8 weeks |
| How to handle a bad exam result | S3 (tip card) | Quarterly (timed to results seasons) |

### 6.2 Product feature showcase rotation

When new features ship, they get a dedicated echo. Between launches, rotate through existing features to keep the product visible:

| Feature | Format | Target audience |
|---|---|---|
| Auto-generated study plan | V1 (screen walkthrough) | [ALL] |
| Spaced repetition engine | V3 (data story on the science) + V1 (demo) | [ALL] |
| Analytics dashboard | V1 (walkthrough), S4 (before/after) | [ALL] |
| MBBS eligibility tracker | V1, V5 (full tutorial) | [MBBS-BD] |
| Exam-period mode | V1 | [MBBS-BD], [EXAM] |
| Pomodoro timer | V2 (animated tip showing integration) | [UNI] |
| iCal export / deadline sync | S3 (tip card), V1 | [UNI] |

---

## 7. Paid Promotion Triggers

This section defines *when* the brain should recommend paid promotion. The *how* lives in `10C_PAID_PROMOTION.md`.

### 7.1 Automatic paid triggers

When any of these events occur, the brain should proactively suggest running paid promotion:

| Trigger | What to promote | Recommended action |
|---|---|---|
| **New flagship article published** | The article itself (traffic campaign) | Boost the Day 0 launch post on Facebook + Instagram. $5–10/day for 5 days. Target segment-matched audience. |
| **Organic post gets unusually high engagement** | The post itself | Boost it. A post that's performing organically will perform even better with paid amplification. $5–10/day for 3 days. |
| **Exam season approaching** (4–6 weeks before May/November for MBBS-BD; ongoing for AMC) | Segment landing page or relevant article | Run a traffic campaign targeting the segment. See `10C_PAID_PROMOTION.md` for targeting blueprints. |
| **Product milestone** (1,000 users, major feature launch) | Registration page | Consider a conversion campaign. Only if the product is ready for the increased attention. |
| **Content gap identified** (a topic is trending but we have no article yet) | Write the article first, then promote | Don't spend on ads pointing to content that doesn't exist yet. Content first, always. |

### 7.2 When NOT to promote

- **During MBBS exam weeks (May, November).** Don't advertise to students who are sitting exams. It's tone-deaf and wasteful.
- **When the product has known bugs or outages.** Don't drive traffic to a broken experience.
- **On content that violates the restrained tone for [MBBS-BD].** Paid amplification of pressure-framing copy is worse than organic — it reaches more people.
- **Before an article has been live for 24 hours.** Catch any errors, broken links, or missing images first.

---

## 8. Seasonal and Event Triggers — Master Calendar

A single-view reference of all time-sensitive social triggers across all three segments.

| Month | [EXAM] AMC | [MBBS-BD] Bangladesh | [UNI] University | [ALL] Cross-segment |
|---|---|---|---|---|
| **Jan** | New-year planning push | Mid-teaching: attendance/formatives | Spring sem starts (N) | New Year study resolutions (light) |
| **Feb** | Exam season open (Feb–Nov) | Teaching continues | Teaching begins (N), Sem 1 starts (S) | — |
| **Mar** | Mid-arc execution content | Pre-exam awareness begins | Midterms (N) | World Education Day-adjacent |
| **Apr** | Final stretch (for early sitters) | **Exam prep month** | Finals prep (N) | — |
| **May** | Post-exam for early sitters | **🔴 PROFESSIONAL EXAMS** — reduce posting | Finals (N), Midterms (S) | — |
| **Jun** | Decision + replanning | Results + new phase | Summer (N), Finals prep (S) | — |
| **Jul** | Mid-year planning reset | New teaching period begins | Break content | — |
| **Aug** | Execution content | Teaching continues | Fall starts (N), Sem 2 starts (S) | Back-to-school energy |
| **Sep** | Execution + final stretch | Mid-teaching | Teaching (N+S) | — |
| **Oct** | Final stretch (for late sitters) | **Pre-exam awareness** | Midterms (N), Pre-finals (S) | — |
| **Nov** | Post-exam + year wrap | **🔴 PROFESSIONAL EXAMS** — reduce posting | Finals (S), Pre-finals (N) | — |
| **Dec** | Year-end reflection | Break / results | Finals (N) + break | Year-in-review, rest |

---

## 9. Content Repurposing Cycle

Older content doesn't expire. This cycle ensures high-performing evergreen content gets reshared systematically.

### 9.1 Monthly reshare audit

On the **1st of every month**, review:

1. **Top 3 performing posts from the last 90 days** (by engagement or reach). Can any be reshared with a fresh angle?
2. **Top-performing blog articles** (by traffic, from GA4). Have they been promoted on social in the last 30 days? If not, create a fresh echo post.
3. **Seasonal relevance check.** Does any existing content map to this month's themes (§3, §4, §5)? Reshare it with updated framing.

### 9.2 Reshare rules

- **Never repost the exact same content.** Change the visual, the caption angle, or the format (e.g., a stat card last time → a Reel this time).
- **Minimum gap between reshares of the same content:** 6 weeks.
- **Always check that facts are still current** before resharing — especially exam dates, fees, and pass rates.

---

## 10. When Not to Post

Silence is a content strategy. Some moments are better served by not posting.

| Situation | Action |
|---|---|
| MBBS professional exam weeks (May, November) | Reduce to 1 post/week maximum. No product CTAs. No "good luck" performativity. |
| Product outage or major bug | Pause all promotional content until resolved. |
| National mourning or major crisis (Bangladesh, Australia, global) | Pause all posting. Resume when appropriate. |
| You're exhausted and can't produce quality content | Skip the day. Consistency means weekly, not daily. A bad post is worse than no post. |
| Istiaque is unavailable to review [MBBS-BD] content | Don't post [MBBS-BD] content without review. Queue it. |

---

## CHANGELOG

| Date | Change |
|---|---|
| 2026-06-25 (v1) | File created. Article Echo Protocol (7-step sequence with decision tree). Weekly posting calendar template with batching rules and time-of-day guidelines. Three segment-specific content calendars: [EXAM] AMC (12-month rotation through 5-stage preparation arc), [MBBS-BD] Bangladesh (anchored to May/November professional exams, BMDC event triggers, restrained tone enforcement), [UNI] University (dual-hemisphere model). Cross-segment evergreen rotation. Paid promotion triggers. Master seasonal calendar. Content repurposing cycle. Aligned with 10_SOCIAL_PLAYBOOK.md, 10A_SOCIAL_CONTENT_FORMATS.md, 02_BRAND_VOICE.md, 11_PRICING_MODEL.md, FEATURES.md (BMDC source). |

---

<!-- docnav-related -->
### Related docs
- [10 · SOCIAL PLAYBOOK — The Operating System](10_SOCIAL_PLAYBOOK.md)
- [10A · SOCIAL CONTENT FORMATS — Post Templates](10A_SOCIAL_CONTENT_FORMATS.md)
- [10C · PAID PROMOTION — Advertising Playbook](10C_PAID_PROMOTION.md)
- [10D · CREATIVE PRODUCTION — Image and Video Scripts](10D_CREATIVE_PRODUCTION.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [11 · PRICING MODEL — Tiers, Copy Rules, and CTAs](11_PRICING_MODEL.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
