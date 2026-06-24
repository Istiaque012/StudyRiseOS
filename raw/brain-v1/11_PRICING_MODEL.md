# 11 · PRICING MODEL — The Canonical Pricing Reference

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> **What this file is.** The single source of truth for StudyRise's pricing model, tier definitions, per-mode pricing plans, regional architecture, feature-gate summary, upgrade copy, and copy rules. Every other brain file references this one rather than repeating pricing details. When the model changes, update here first — then propagate.

> **Supersedes:** the previous `11_PRICING_MODEL.md` (copy-rules-only version, 2026-06-22). This version adds per-mode pricing tiers, regional architecture, the audited Free/Pro split, and gate-key references. Copy rules are preserved exactly.

---

## Section 1 — The Model

StudyRise is **freemium with a 30-day full-access onboarding window.**

| | Free (forever) | 30-day full access | Pro |
|---|---|---|---|
| **Who** | Every user, permanently | Every new account, automatically | Users who purchase a Pro pass |
| **What** | Genuinely useful but structurally incomplete — enough to adopt and trust, never enough to finish the job | Everything — all Pro features unlocked | Full scope + intelligence + automation |
| **Card required** | No | No | Yes (at purchase) |
| **Applies to** | All modes | All modes | All modes |

**The sequence.** Day 0: account created → 30-day full-access window starts automatically → Day 31: user drops to Free Starter (choose subject/unit slots where applicable) → Pro purchase restores full access until `pro_until`.

**Data rule (non-negotiable across all modes).** Data is **never deleted** in any state transition. Locked content goes read-only. Existing records are always visible. Only adding, editing, automating, and interpreting beyond limits is gated.

---

## Section 2 — The structural principle behind Free vs Pro

The free tier in each mode must pass one test:

> **Does free, on its own, let a student run their entire exam / prof / semester? If yes, it's a leak.**

The free tier must be *genuinely useful but structurally incomplete*. The specific incompleteness is different per mode — and that difference determines the upgrade trigger:

| Mode | The free hook | The structural incompleteness | Upgrade trigger |
|---|---|---|---|
| **Exam** | Log your question progress | No readiness intelligence of any kind — free can't answer *am I ready / will I pass* | "See your readiness projection with Pro." |
| **MBBS** | Track part of your prof | No aggregate eligibility verdict — free can't answer *am I eligible* across the whole prof | "See your full-prof picture with Pro." |
| **University** | Track a few units with real grade math | No intelligence or automation — free can only track, never project or automate, at *any* unit count | "See your projected finals / auto-replan with Pro." |

---

## Section 3 — Per-mode pricing plans

### 3.1 Exam Mode (AMC MCQ / PLAB 1 / USMLE)

**Positioning:** a progress-logging and analytics layer for candidates using an external qbank. StudyRise logs what they complete, what they get wrong, their mocks, their SR, and their mistakes — and builds the readiness intelligence on top.

| Plan | Price | Per-month | Role |
|---|---|---|---|
| 30-day full access | $0 | — | "Try StudyRise free." No card. |
| Free Starter | $0 forever | — | Partial logging + basic tracking, free forever. |
| Exam Pass — 3 months | **$29** | $9.67 | Primary offer. Focused short preparation. |
| Exam Pass — 6 months | **$44** | $7.33 | Best value. Full prep cycle. (~24% cheaper/mo) |
| Extension | **$10 / 30 days** | $10.00 | Top-up on active or recently-expired pass only. |

**Currency:** flat USD for all markets. No country-specific pricing for Exam Mode. Local-currency display may approximate, but USD is the canonical price.

**Extension cannibalisation check:** 3 months + 3 extensions to reach 6 months = $29 + $30 = $59 > $44. Buying the 6-month pass is always cheaper than extending into it. ✓

**Key free cap:** 200 questions logged per month. A candidate doing 40–50/day hits this within a week — and by then the locked Readiness Projection card is rendering *their own data*. That is the primary conversion moment.

**[ISTIAQUE: confirm]** Price pair $29 / $44 recommended. Alternative: $24 / $39 if lower PLAB-segment floor needed.

---

### 3.2 MBBS Bangladesh Mode

**Positioning:** a digital twin of the BMDC continuous-assessment card. Free tracks part of the prof; Pro tracks the whole prof and delivers the eligibility verdict and readiness projection.

| Plan | Price | Per-month (BDT) | USD ≈ | Role |
|---|---|---|---|---|
| 30-day full access | BDT 0 | — | — | "Try StudyRise free." No card. |
| Free Starter | BDT 0 forever | — | — | Partial prof tracking, free forever. |
| 6-Month MBBS Pro | **BDT 1,200** | 200 | $9.80 | Primary offer. Fits one prof/term cycle. |
| Yearly MBBS Pro | **BDT 1,800** | 150 | $14.70 | Best value. Full academic year. (~25% cheaper/mo) |
| Batch Pass | per-seat discount | — | — | Growth channel via class reps / CRs (see §4). |

**Currency:** BDT only, payable via bKash / Nagad / Rocket. No international card required. One-time payment (non-recurring) — passes have an end date, not a recurring mandate.

**Free subject caps by phase:**

| Phase | Total subjects | Free Starter active slots |
|---|---|---|
| 1st Prof | 3 | 2 |
| 2nd Prof | 2 | **1** — sharpest squeeze; keep this one subject fully featured |
| 3rd Prof | 3 | 2 |
| Final Prof | 3 | 2 |

**Subject rotation rule:** switching a free active slot freezes the swapped-out subject to read-only immediately. Free users can never have a complete concurrent dataset across all prof subjects by rotating through them.

**Eligibility verdict rule:** the free dashboard never computes an aggregate phase eligibility verdict. It shows per-subject gate status only, with a persistent "Partial view" banner. Claiming eligibility when not all subjects are tracked would be actively harmful — this is both commercial and an accuracy protection.

**Key conversion lever:** "This is a partial view — see your full-prof picture with Pro." No fear, no pressure. The student already cares about the answer; the partial view makes them want the full one.

**[ISTIAQUE: confirm]** Yearly at BDT 1,800 recommended (25% gap). Alternative: hold BDT 2,000 + add annual-only perk to justify it.

---

### 3.3 University Mode (global)

**Positioning:** a semester productivity and grade-intelligence tool. The only StudyRise mode competing against strong free rivals (MyStudyLife, Notion for students, Google Calendar). Free must win the install; Pro must sell the intelligence and automation those free tools don't have.

#### Two-tier regional pricing

| Tier | Who | Pays via | Price |
|---|---|---|---|
| **Local — Bangladesh** | BD students | bKash / Nagad / Rocket | BDT (below) |
| **Global — rest of world** | All other students | Card (Stripe) | USD (below) |

**The fence is the payment rail, not IP detection.** The BDT price is only payable through bKash/Nagad/Rocket — requiring a Bangladeshi account and SIM. A student abroad cannot check out this way. The global price is card-based — a Dhaka student typically has no international card. The two populations self-sort by the rail they can access. A VPN is irrelevant because bKash rejects at the payment step, not the IP step.

#### Local tier — Bangladesh

| Plan | Price | Per-month (BDT) | USD ≈ |
|---|---|---|---|
| Free Starter | BDT 0 | — | — |
| 6-Month University Pro | **BDT 800** | 133 | $6.50 |
| Yearly University Pro | **BDT 1,300** | 108 | $10.60 |

**[ISTIAQUE: confirm]** Yearly at BDT 1,300 recommended (~19% gap). Alternative: hold BDT 1,500 but add an annual-only feature or perk.

#### Global tier — rest of world

| Plan | Price | Per-month |
|---|---|---|
| Free Starter | $0 | — |
| 6-Month University Pro | **$19** | $3.17 |
| Yearly University Pro | **$29** | $2.42 |

**Competitive position:** sits alongside Todoist/TickTick annual (both ~$3–5/mo), well below Motion ($19/mo) and Sunsama ($17–22/mo), and not suspiciously cheap — $29/year reads as a genuine student-priced product.

**[ISTIAQUE: confirm]** $19 / $29 recommended. Aggressive alternative: $15 / $25.

**Phase 2 (not at launch):** add an emerging-markets band (~50% of global) for India, Nigeria, Pakistan, Philippines, Indonesia, etc. These markets need local payment options too — design the system to extend, but do not build this at launch.

#### University free tier note

**3 active units** (not 2). The leak-stop in University Mode is the **intelligence gate** (projection, automation, aggregate GPA — all Pro at any unit count), not the unit cap. Dropping to 2 units risks losing the install to MyStudyLife's unlimited free tier without adding conversion benefit. Only tighten to 2 units if data shows the free tier actively cannibalising Pro.

---

## Section 4 — Batch / Campus channel (all modes)

| Mode | Mechanism | Price logic |
|---|---|---|
| **Exam** | No batch plan at launch | Individual pass structure suits solo exam prep |
| **MBBS BD** | Batch Pass via class rep (CR) | ~BDT 800/seat at 30+ seats (vs BDT 1,200 individual) |
| **University BD** | Per-seat annual discount table | 10–24 students: BDT 1,200/yr · 25–49: BDT 1,000/yr · 50–99: BDT 850/yr · 100+: BDT 700/yr |
| **University Global** | Mirror in USD at launch | Per-seat discounts at equivalent tiers |

**Why batch converts:** account sharing (one login passed around) is the primary threat in Bangladesh. A group rate that's cheaper per seat than sharing one login makes the legitimate path the rational one. The CR/rep becomes an on-campus sales rep acquired at zero cost.

**Ambassador rewards (University):** at launch, denominate in Pro-time only (free months of Pro per N paid referrals) to avoid managing cross-currency cash payouts.

| Paid users referred | Reward (University) |
|---|---|
| 10 | 1 month Pro free |
| 25 | 3 months Pro free |
| 50 | 6 months Pro free |
| 100 | 12 months Pro free + negotiated campus-lead package |

---

## Section 5 — Feature summary per mode (Free vs Pro)

For the full audited feature table with gate keys, see `StudyRise_Gate_Keys_Config.md` (in the dev project). Summary below for content/copy reference.

### 5.1 Exam Mode — what each tier covers

**Free forever:** 1 exam profile · 3 active subjects · 30 tasks · 200 questions/month · 1 mock/month · 25 SR records · 20 mistakes · 14-day history + analytics · basic KPI dashboard · Today loop · Pomodoro · basic progress report (activity counts only) · CSV/JSON backup

**Pro adds:** Readiness Projection Card · Pass Probability Trajectory · Go/No-Go card · AI Advisor · unlimited logging + subjects + tasks + SR + mistakes · full analytics (blueprint balance, pace analytics, shaky corrects, full history) · sprint/final-month planner · full progress report (readiness summary + confidence band + focus areas) · mock trend + breakdown · retention heatmap + forgetting curves · custom SR intervals · .ics export · advanced coaching notifications

### 5.2 MBBS Bangladesh Mode — what each tier covers

**Free forever:** MBBS onboarding + BMDC-seeded setup · 2 active subjects (1 in 2nd prof) · CAC digital twin (active subjects) · Today loop (active subjects) · attendance + formatives (active subjects) · 25 SR records · basic analytics (active subjects) · partial eligibility dashboard (per-subject status only, no aggregate verdict) · 5 viva-practice sessions/month · contribute questions/viva unlimited · 2 card exams/month · holiday markers · notifications (active subjects) · read-only access to all saved data

**Pro adds:** all current-phase subjects · full-phase eligibility verdict · pass-probability + readiness projection · full analytics + weak-area engine · Exam Prep screen + per-board viva shortlist · full viva practice unlimited · full QB browse + contextual surfacing · unlimited card exams · supplementary revision plan · full progress report / PDF · .ics calendar export

### 5.3 University Mode — what each tier covers

**Free forever (both tiers):** 3 active units · all 36 assessment types · grade tracker + "What do I need?" + what-if simulator (per active unit) · Today loop (active units) · timetable (active units) · 5 AI planner proposals/week · heavy-week warning (fix is Pro) · basic analytics snapshot (grade trend, study hours, consistency heatmap — no trend history) · LMS/iCal import + daily sync · Semester Wrapped · notifications · Pomodoro · CSV/JSON export · dark mode

**Pro adds:** unlimited units · **aggregate full-term GPA/WAM** · heavy-week auto-replan ("Plan it") · unlimited AI planner + Full Auto mode + Replan-my-week · projected finals · full analytics (deadline adherence, planning accuracy, attendance heatmap, trend history) · Kanban view · full SR per unit · multi-term GPA history · PDF grade report · outbound .ics calendar feed · exam revision planner (all units)

---

## Section 6 — Upgrade-moment copy per mode

All copy follows §7 rules: no "premium," no "unlock," no "free trial." "Upgrade to Pro" is permitted only on the pricing page and in-app billing screens.

### Exam Mode

| Moment | Copy | CTA |
|---|---|---|
| Full access active | "You have full access for 30 days. No card required." | — |
| Window ends today | "Your full-access period ends today. Choose an Exam Pass to keep Pro features running." | "Choose Exam Pass" |
| Pro feature locked | "This is a Pro feature. Your data is saved — continue your full prep with an Exam Pass." | "Get 3 months for $29" |
| 3-month option | "Focused preparation for a short, intense run-up." | "Get 3-month Exam Pass" |
| 6-month option | "Best value for a full prep cycle." | "Get 6-month Exam Pass" |
| Pass expired | "Your Exam Pass has ended. Nothing's been deleted — pick up where you left off." | "Renew Exam Pass" |

### MBBS Bangladesh Mode

| Moment | Copy | CTA |
|---|---|---|
| Full access active | "You have full access for 30 days. No card required." | — |
| Free Starter subject limit | "Saved, read-only. Pro covers full-prof tracking." | "Continue with 6-Month MBBS Pro" |
| Partial dashboard | "This is a partial view. See your full-prof picture with Pro." | "Get Yearly MBBS Pro" |
| Projection locked | "See your full readiness projection with Pro." | "Continue with 6-Month MBBS Pro" |
| Near exam window | "Build your exam-period plan for written and viva." | "Get Yearly MBBS Pro" |
| SR cap reached | "Continue full spaced repetition across all subjects with Pro." | — |

### University Mode

| Moment | Copy | CTA |
|---|---|---|
| 3rd unit attempted | "Free Starter covers 3 units. Pro covers your full semester." | "Get University Pro" |
| Locked unit after day 30 | "This unit is saved. Pro lets you continue tracking it." | "Get University Pro" |
| Auto-replan tapped | "Auto-replan heavy weeks with University Pro." | "Get University Pro" |
| Full analytics opened | "See projected finals, deadline adherence, and planning accuracy with Pro." | "Get University Pro" |
| 5 AI proposals used | "You've used this week's free planning suggestions. Pro gives unlimited planning." | "Get University Pro" |
| Full-term GPA tapped | "See your full-term GPA with Pro." | "Get University Pro" |
| Day 31 lock screen | "Your 30 days of full access have ended. Choose up to 3 units to keep active on Free Starter. Your other units stay saved and read-only. Pro covers your full semester." | "Get University Pro" / "Choose free units" |

---

## Section 7 — Pricing copy rules

### 7.1 Approved phrases

- ✅ "Try StudyRise free" — primary CTA, everywhere
- ✅ "Start free — no card required." — secondary CTA line
- ✅ "Free for 30 days — every feature, no card required."
- ✅ "Basic features free forever. Pro features free for 30 days."
- ✅ "30 days of full access, then choose your plan."
- ✅ "Free" and "Pro" as tier names
- ✅ "Upgrade to Pro" — pricing page and in-app billing **only**
- ✅ "Exam Pass" — the purchase unit name for Exam Mode
- ✅ "6-Month MBBS Pro" / "Yearly MBBS Pro" — MBBS Mode plan names
- ✅ "University Pro" — University Mode plan name

### 7.2 Banned phrases (everywhere, always)

| Phrase | Why banned | Use instead |
|---|---|---|
| premium | Sounds exclusive/gatekeeping | "Pro" |
| unlock | Implies features are locked away hostilely | "get access to" or name the feature |
| free trial | 30 days is the real product, not a trial | "30 days free" or "free for 30 days" |
| "Free during early access" | **Retired.** Early-access era is over. | "Free for 30 days" |
| "Full app access is free for a limited time" | **Retired.** | "Full access free for 30 days" |
| "Start free — full access, no card required" | **Retired.** "Full access" is only true for 30 days. | "Start free — no card required." |
| upgrade | Permitted only on pricing page + in-app billing | Omit in blog, social, email, ads |
| streak, leaderboard, points, badges, XP | Gamification — banned for [MBBS-BD]; use with extreme caution elsewhere | — |

### 7.3 Tone rules by audience

**[EXAM]** — Straightforward. State what Pro does, not what they're missing. "Pro gives you the readiness projection and full analytics." Never manufacture urgency around the exam date.

**[UNI]** — Casual. "The free plan covers grades, deadlines, and scheduling for your active units. Pro adds the power tools — auto-replan, projected finals, Kanban, the full semester." Light-touch; this audience has free alternatives and chooses you, not gets funnelled.

**[MBBS-BD]** — **Deliberately restrained.** Never frame Pro as urgency. Never imply they will fall behind without it. Never use fear-of-failing copy. The ethical floor (eligibility tracking per active subjects) is free because eligibility tracking is not a premium feature. Pro adds projection and full-prof planning — genuinely useful, not essential to survive. Always use BDT in prices.

### 7.4 CTA patterns by surface

| Surface | Primary CTA | Secondary line |
|---|---|---|
| Blog article CTA band | "Try StudyRise free" | "Start free — no card required." |
| Marketing page hero | "Try StudyRise free" | "Start free — no card required." |
| Marketing page CTA band | "Try StudyRise free" | "Start free — no card required." |
| Pricing page | "Start free" | "Every feature. 30 days. No card." |
| Email (welcome) | "Start planning — free for 30 days" | — |
| Paid ads | "Try it free" or "Try StudyRise free" | — |
| Social bios | "Try it free — [www.studyrise.app](https://www.studyrise.app)" | — |

---

## Section 8 — Pricing page spec

**URL:** `https://www.studyrise.app/pricing`
**Layout:** Two columns — Free and Pro. Mode selector (Exam / MBBS / University) at the top changes the prices and feature list shown.
**Hero banner:** "Every new account gets 30 days of full access. No card required."

**Free column:** forever-free features grouped by what they do (plan, track, analyse basics). Ends with "Free forever."

**Pro column:** Pro features grouped. Shows price. Ends with "After your 30-day free period."

**Payment methods shown:** bKash, Nagad, Rocket (BD), Stripe / Visa / Mastercard (global). Shown greyed with label "available at checkout" until payment gateway is live.

**FAQ section (5 questions, answers conclusion-first for AI-citation readiness):**
1. *What happens after 30 days?* Basic planning and tracking features stay free forever. Pro features — readiness projections, full analytics, auto-replan, and the full scope across all subjects or units — require a Pro pass.
2. *Do I need a credit card to start?* No. Create your account and get 30 days of full access immediately, no card required.
3. *What's included in Free forever?* Daily planning tools, attendance and grade tracking within your free subject or unit slots, basic analytics, Pomodoro, notifications, and full data export. The free tier is designed to be genuinely useful every day.
4. *Can I cancel my Pro pass?* Exam Passes and MBBS/University Pro plans are one-time purchases with a fixed end date — they don't auto-renew. When they expire, you return to the free tier and all your data stays intact.
5. *[MBBS-BD only] Is the eligibility tracker free?* Yes. Tracking your attendance, formatives, and CAC items for your active subjects is always free. A Pro pass adds full-prof tracking across all subjects and the readiness projection — but the eligibility basics are free because every student deserves to know where they stand.

---

## Section 9 — For Claude (content project reference)

When writing content for any StudyRise page or article:

- Price references for **Exam Mode**: "$29 for 3 months, $44 for 6 months" — confirm with Istiaque before publishing any price.
- Price references for **MBBS Bangladesh**: "BDT 1,200 for 6 months, BDT 1,800 for a year" — confirm with Istiaque before publishing any price.
- Price references for **University Mode**: "BDT 800 / $19 for 6 months, BDT 1,300 / $29 for a year" — confirm regional variant for the audience of the specific article.
- **[ISTIAQUE: confirm]** markers in this document = those prices are recommended but not yet formally confirmed. Do not hard-code prices into HTML until Istiaque's explicit sign-off.
- Always check this file before writing upgrade prompts, pricing-page copy, or any feature-tier reference. The approved/banned phrase lists in §7 override anything in older files.

---

## Section 10 — CHANGELOG for this file

| Date | Change |
|---|---|
| 2026-06-22 (v1) | File created as copy-rules-only reference. Defined freemium model, approved/banned phrases, tone rules, CTA patterns, pricing page spec. |
| 2026-06-22 (v2, this version) | Full rewrite. Added per-mode pricing plans (§3), regional pricing architecture for University (§3.3), batch/campus channel (§4), audited Free/Pro feature summary per mode (§5), upgrade-moment copy per mode (§6). Copy rules from v1 preserved unchanged. Added reference to `StudyRise_Gate_Keys_Config.md` for dev-facing gate keys. |

---

<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
