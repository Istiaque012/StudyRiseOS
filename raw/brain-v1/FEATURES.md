# StudyRise — Full Feature Specification

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

_Both modes: Exam Mode and University Student Mode (USM). Use this to verify scope before diagnosing any feature._

---

# Part 1 — Exam Mode

## Navigation

The app has a **sidebar** (desktop) and **bottom tab bar** (mobile) with these routes:

| Route | Screen | Icon |
|---|---|---|
| `/` | Dashboard | Home |
| `/today` | Today | Calendar |
| `/plan` | Plan | Clipboard |
| `/sr` | SR Module | Brain |
| `/questions` | Questions | BookOpen |
| `/mocks` | Mock Exams | Target |
| `/history` | History | Clock |
| `/analytics` | Analytics | BarChart |
| `/mistakes` | Mistakes — gated behind `exam.mistake_log` (free, enabled by default) | AlertTriangle |
| `/settings` | Settings | Settings |
| `/review-sheet` | Rapid-Review Sheet | — |
| `/report` | Exam Progress Report | — |

A **floating action button (LogSessionFab)** appears on Dashboard/Today/Plan/SR/Questions/Mistakes/Mocks/History/Analytics for exam users — fixed bottom-right, hidden on Settings/Profile.

---

## Screen: Dashboard (`/`)

### Purpose
A bird's-eye summary of all study activity. No data entry here — read-only KPIs and progress.

### Consistency Strip (top of left column)
- "{n} of last 7 days" active from `getConsistency(logs, 7)`.
- Message colored green when healthy (≥4 active days): "Strong week", "Good rhythm", "Getting back", "Time to restart".
- 7-dot row: green = active, blue = rest, neutral gray = missed/none. **Never red** — rest is a calm signal.
- "Current streak: N days" secondary line below the dots.

### Overload Banner (amber, dismissible per session)
- Shows when `detectOverloadSignal(studyLogs, questionLogs, srRecords)` fires any signal over a 7-day window:
  - Accuracy slope < −2 pts AND hours slope > 0 (≥4 data points) → mild/moderate/severe.
  - SR compliance drop > 30% between early/late halves of the week.
  - ≥3 missed/pending days.
- Dismissed via X; re-appears the next session if the signal persists.
- Coach-toned suggestions only — no alarm language.

### T-minus Checklist (top of left column, final 7 days)
- Shown when `examDate && daysLeft 0–7`.
- "T-minus N days" header (or "Exam day").
- Progress bar "N of 6 ready".
- 6 items:
  - **3 auto-checked** (non-interactive, tagged "auto"): Confirm test center route (← `exam_logistics.test_center_confirmed`), ID & documents ready (← `exam_logistics.id_ready`), Last full mock completed (← a mock within 5 days).
  - **3 manual** (stored in `exam_logistics.tminus_checklist`): No new material (auto-checked in final 3 days), Sleep schedule adjusted, Rapid-review sheet printed → "Open" link to `/review-sheet`.
- "View your rapid-review sheet →" link always visible at bottom.

### Exam Logistics Nudge (days 8–60)
- Shown when registration deadline within 14 days OR test center not confirmed.
- Relevant one-liner(s) + "Sort it in Settings →" deep-link to Exam Setup tab.

### Finish Setting Up Banner (soft-blue, dismissible)
- Shown after onboarding until dismissed (persisted in `user_settings.checkin_state.onboarding_banner_dismissed`).
- Links to Settings Subjects/Tasks/Daily Routine + Import-from-AI (AMC only).

### KPI Tiles (4-col row)
| Tile | Formula | Navigates to |
|---|---|---|
| **Plan Tasks** | `completedTasks / tasks.length` | `/plan` |
| **SR Compliance** | `srDoneCount / srDueCount × 100%` — counts all 3 hits | `/sr` |
| **[QB] Done** | Sum of `question_logs.questions_done` + `study_log.e_medici`. Label = `settings.question_bank_name`. | `/questions` |
| **Consistency** | `{activeDays}/{windowDays}` from `getConsistency` | `/history` |

### Readiness Projection Card (top-right column)
- Pro-gated via `PassProjectionGate` (`isPro` from `useSubscription`; blurred preview + pitch card when locked).
- Verdict-colored left border + badge (green=comfortable / amber=borderline / red=at_risk / gray=insufficient_data).
- Projected score with confidence band "68% (62–75%)" in monospace.
- Pass line + signed margin line.
- Trend icon + pts/week + mock count.
- Verdict message + "Syllabus coverage: N%" note always visible (outside gate).
- `insufficient_data` → "Log a mock" CTA to `/mocks`; suppressed when exam date passed.
- Requires ≥2 dated mocks + future exam date for real projection.

### Go/No-Go Card (final 14 days only, `daysLeft ≤ 14`)
- Neutral left border (never alarming).
- `MiniSparkline` — pure SVG polyline of mock trend + dashed pass-line (reuses `projection.trendLine`; only shown when ≥2 trendLine points).
- Top-3 weak area subject badges (from `rankWeakAreas`); hidden when `insufficient_data`.
- Verdict-specific one-liner: comfortable → "you clear the line with a solid margin"; borderline → projected near line + top weak spots; at_risk → focused-push or deferral copy; insufficient_data → "Log a mock to get your projection."
- Caveat line: "This projection is based on your logged data. It's a trend, not a guarantee."

### Today's Readiness Card (SR Compliance Ring)
- Composite ring (Tasks×40 + SR×30 + eMedici×30, zero records = zero score).
- Exam countdown navy card alongside.

### Sprint Panel (when sprint active, `daysToExam ≤ 28`)
- Activation nudge: "Final month — activate revision sprint?" (Activate / Not yet).
- When active: days-remaining countdown, next mock date, new-material cutoff (exam−14d), top-3 weak-area priorities, final-3-day taper note.
- "Exit sprint" + "View revision schedule" → `/plan` with `{planView:'sprint'}`.

### Qbank First-Pass Progress Card (left column)
- Ring (% done, color green/amber/blue based on `hasTimeForSecondPass`/pace).
- `done/total` monospace headline; secondary qbanks as small rows.
- Prose message in soft-color chip (pace-to-finish / no-second-pass / after-exam warning).
- No pool configured → Settings-link prompt card.

### Phase Progress Bars
- Three rows (Phase 1/2/3): completed / total tasks per phase.

### AI Advisor Panel
- Fetches daily recommendation from OpenAI gpt-4o-mini via `/api/ai-advisor`.
- Cached in localStorage 4 hours. Refresh button.
- Shows assessment, achievable badge, priority list, 7-day plan, reschedule suggestion.

### What changes when…
- **Task completed** → Plan Tasks tile increments.
- **SR hit rated** → SR Compliance recalculates.
- **Questions logged** → QB Done increments.
- **Mock exam added** → Readiness projection recalculates, sprint mocks update.
- **Sprint activated** → Sprint panel appears.
- **exam_logistics saved** → T-minus auto-checks update.

---

## Screen: Today (`/today`)

### Purpose
Shows what to study TODAY — task card, DayPlanner, Pomodoro, SR reviews, mistake reviews.

### Hero Clock
- 72px monospace HH:MM:SS updating every second.
- Date in Newsreader serif below.
- Current block name + total study time.
- Mobile prayer strip (horizontal scroll) above clock.

### Mistake Review Section (above DayPlanner, shown when reviews due)
- Due/overdue mistakes from `getDueMistakeReviews()` (`next_review ≤ today AND NOT resolved`).
- Per-card: subject + type badges, `short_note`.
- Correction note hidden behind "Recall the rule, then tap to check" — the test-yourself moment.
- **Still shaky** (amber) → reschedules on 1→3→7→14-day ladder + increments `review_count`.
- **Got it** (green) → sets `resolved = true`, `next_review = null`; card animates out.
- After 3 shaky ratings → mistake graduates to SR topic record (toast: "Added to your spaced repetition queue").

### Study Blocks Section (DayPlanner)
- Generates timeline: 50-min study + 10-min break, 30-min long break every 3 blocks.
- Fixed blocks (prayers, gym, CD path, work shifts) are immovable.
- **Mistake review block** (purple accent, REVIEW badge): auto-injected as 15-min draggable block after the first study block when mistake reviews are due. Tickable/removable in the planner.
- **Timer states**: upcoming (blue accent) → active (red, countdown) → paused (amber) → done (green).
- Pause cascade: adjusts downstream block times, amber flash on shifted blocks.
- Last 60s: warning beep every 10s.
- Block state (isActive/activatedAt/isPaused/pausedSecondsRemaining) persisted to `study_log.blocks` JSONB — restored on tab switch or reload.

### Task Card
- Next incomplete task pinned (by `getNextTask`).
- Progress strip: 4-metric row (phase, task#, eMedici done, SR status).
- Sub-tasks checklist (`task_steps`): progress bar + check/edit/reorder/delete per step.
- Quick log questions field.

### Pomodoro Timer (right column, sticky)
- 50-min work / 10-min break / 30-min long break.
- SVG circular progress, MM:SS countdown.
- Start/Pause, Reset, Sound toggle.

### SR Due Panel
- Lists all SR reviews due today.
- Subject/Topic/Mistake source badges.
- Click → opens SRModal rating picker (Easy/Medium/Hard/Blackout) + question count input.

### Day Log Modal
- Status grid (complete / partial / missed / rest), eMedici count, optional question session logging.

### What changes when…
- **Mistake reviewed (Got it)** → resolved=true, card animates out, section hides when queue empty.
- **Mistake reviewed (Shaky × 3)** → topic SR record created, appears in SR Module Review Queue.
- **Block timer completes** → auto-break starts; "Mark it done" prompt.
- **SR hit rated** → `sr_records` updated, compliance recalculates.
- **Day logged** → History calendar updates, streak recalculates.

---

## Screen: Plan (`/plan`)

### Purpose
View and manage the full study plan across phases.

### View toggle: List / Timeline / Sprint
- **List view**: Tasks grouped by subject, collapsed completed groups, filter bar + search.
- **Timeline view**: `ExamTimeline` component — weeks-axis Gantt (study_start → exam_date). Lanes per subject + Mocks lane. Mock markers (navy rings), milestone markers (12px), task markers (7px). SR-due dots (hollow, per undone sr1/2/3_due). Heavy weeks amber glow + "{h}h" badge. New-material cutoff line (exam−14d, amber dashed). Sprint zone shading (final 4 weeks when sprint active). Qbank first-pass overlay bar. Today line + exam terminal line. 3-level zoom (Fit / Comfort / Detailed). Tap dot → mini-card → Open → TaskDrawer.
- **Sprint view** (only when sprint active): day-by-day revision schedule from `buildRevisionPlan`. Subject chips, mock-day cards, cutoff divider, taper styling.

### Qbank Progress Strip (pinned below filter bar)
- Only when pool has `total > 0`.
- `Bar` in green/amber/red by pace + `source: N% first pass` + `done/total` + 1-line projection message.

### Task Card (row variant)
- Title, due chip, phase badge, eMedici target, status badge.
- Urgency: overdue (red) / urgent (amber ≤3d) / soon (blue ≤7d) / normal.
- Click → TaskDrawer.

### TaskDrawer
- Status: Not Started / In Progress / Completed / Skipped.
- Completing milestone → creates SR record.
- Un-completing → SR cleanup.
- Edit: title, subject, phase, recipe, due date, emedici_qty, task steps.

### Filter Bar
- Filter chips: All / Overdue / Today / This Week / By Phase.
- Sort: Due Date / Subject / Status.

### Add Task Modal
- Title, subject, phase, recipe, due date, emedici_qty.

### What changes when…
- **Task completed** → SR record created if milestone. Dashboard Plan Tasks increments.
- **Sprint activated** → Sprint view available; sprint mocks section appears in MockExams.
- **Timeline zoom changed** → Persisted to localStorage.

---

## Screen: SR Module (`/sr`)

### Purpose
Manage Spaced Repetition reviews — unified queue across subjects, topics, and graduated mistakes.

### Review Queue (top of screen)
- All due items from `getReviewQueue({mistakes, subjects})`, sorted: overdue mistakes → due subject SR → due topic SR (overdue-first within each tier).
- Count badge "{n} due".
- Per-card: type badge (Subject=blue, Topic=purple, Mistake=amber), overdue/due chip + date, red-tinted bg when overdue.
- **Subject/Topic "Review"** → opens SRModal (rating picker + question count).
- **Mistake "Review"** → expands inline: correction note hidden → Still shaky / Got it (mirrors Today MistakeReviewSection).

### SR Subject Cards (below Queue)
- One card per `sr_records` row.
- Collapsed: subject name, status badge, compact amber pill "SR1 overdue" when backdated review pending.
- Expanded: amber backdated-review banner (with "Start from today" / "Backdate to {date}" buttons), then SR1/SR2/SR3 hit rows with due dates, done status, ratings, question counts. "Mark Done" button for due hits.
- Trash icon (only if NO hits done): deletes SR record + resets milestone task to `not_started`.

### Protocol Card (right column, first)
- SR interval reference: blackout=3d, hard=7d, medium=14d, easy=21d.
- SR2/SR3 multipliers from settings.

### SR Donut Chart (right column)
- Done / Pending / Overdue slices. All 3 hits counted.

### Compliance Ring
- Compliance % as SVG ring.

### Upcoming 7 days
- Due SR hits in the next week with outline badges.

### Retention Heatmap
- Grid of colored squares per subject.
- Ebbinghaus retention: `100 × e^(−t / (stability × 14))`.
- Stability: 1 (no SR), 2 (SR1 done), 3.5 (SR2 done), 6 (SR3 done).
- Color: green ≥70%, amber 40–70%, red <40%, grey N/A.

### What changes when…
- **SR hit rated** → Review Queue updates, subject card updates, SR Compliance updates.
- **Mistake reviewed shaky ×3** → topic SR record appears in Review Queue.
- **"Flag for review" from Questions** → topic SR record appears in Review Queue.

---

## Screen: Questions (`/questions`)

### Purpose
Log question bank sessions, track accuracy, import bulk results.

### Log Entry Form (left column, embedded — not modal)
- Source Tabs2: eMedici / AMC Recall / MplusX / Other (free-text).
- Mode Tabs2: Timed / Untimed / Tutor.
- Subject picker (null = General/Mixed).
- Attempted + Correct inputs, auto-cap (correct ≤ attempted).
- Live accuracy badge: ≥70 green / 55–69 amber / <55 red, with vs-subject-avg comparison.
- Optional: confidence selector (Confident / Unsure / Guessed), attempt_type (First pass / Review).
- Optional: backdated date, note.
- "Paste results" ghost button → `QbankImportModal`.

### "Flag for SR" Button
- `BookmarkPlus` icon → modal with topic free-text (pre-filled from note) + optional subject → creates `source_type='topic'` SR record via `createTopicSR`.

### KPI Tiles (5-col)
| Tile | Formula |
|---|---|
| Total done | `sum(questions_done)` |
| Overall accuracy | `totalCorrect / totalDone × 100%` |
| Today | questions done today |
| This week | questions in last 7 days |
| First-pass accuracy | accuracy on attempt_type='first' only (when confidence-tagged logs exist) |

### Accuracy Trend Chart
- Recharts LineChart, last 30 days. One point per day aggregated.

### Sessions Table
- All logged sessions, newest first. Date, subject, source, mode, done, correct, accuracy.
- Filter by source.

### Subject Accuracy Bars
- Bar chart per subject showing average accuracy.

### Qbank Import Modal (`QbankImportModal`)
- Paste tab-separated or CSV qbank report text ("Subject: 45/60 (75%)" format).
- Parse → editable preview table: subject (fuzzy-matched), done, correct, accuracy%.
- Red flag when correct > attempted.
- Import → loop-insert to `question_logs` with success-count toast.

### What changes when…
- **Session logged** → QB Done tile on Dashboard increments, Q Deficit recalculates, Analytics QB Progress updates.
- **Topic flagged for SR** → appears in SR Module Review Queue.

---

## Screen: Log Session FAB (`LogSessionFab`)

A floating action button visible on all exam screens (exam mode only).

### Behavior
- Mobile: bottom sheet with swipe-down dismiss.
- Desktop: popover above the FAB.
- Source Tabs2 + attempted/correct + live accuracy badge + optional subject/date/note.
- Optional: confidence + attempt_type selectors.
- Save → `mode:'mixed'` row via own `useQuestionLogs` instance.
- After save: toast + green flash + fields reset (source remembered for rapid re-entry).
- Panel mounts only on open (deferred fetch).

---

## Screen: Mock Exams (`/mocks`)

### Purpose
Log mock exam attempts, track score trend and pace, manage sprint mocks.

### Add Mock Modal
- Fields: Title, Date, Total Questions (default 150), Correct Count, Time (minutes), Notes.
- **Per-subject breakdown** (collapsible): zebra-striped rows from `useSubjects`, total/correct inputs, live accuracy % per row, mismatch warning when breakdown total ≠ mock total.
- Live score preview during entry.

### Latest Mock Hero Card
- Score in large monospace, readiness badge.
- Stats grid: score, time, questions, **AVG PACE** tile (pace badge: green ≤100% / amber ≤120% / red >120% of `target_seconds_per_question`).
- Recharts LineChart score trend with green 70% reference line.
- "Edit Breakdown" button if breakdown data exists.

### Readiness Interpretation Panel
- Bands: Unsafe (<55%) / Improving (55–62%) / Borderline (63–70%) / Exam-ready (>70%).
- Active band highlighted.

### Subject Performance Section
- Avg accuracy per subject (from all breakdowns), trend (improving/declining/flat ±3%), mock count.
- Recharts BarChart: accuracy by subject, last 3 mocks, 70% reference line.
- "Weakest subjects" list sorted ascending.

### Sprint Mocks Section (when sprint active)
- Scheduled mock dates from `getMockCadence(daysRemaining, existingMocks)`.
- "Log this mock" pre-fills the add modal.

### Mock History List
- All mocks newest first. Each row: date, score, readiness badge, **pace badge** (when time+questions present).
- Click → Edit Breakdown modal when breakdown exists.

### What changes when…
- **Mock logged** → Mock Average on Dashboard updates, readiness projection recalculates, sprint mocks section updates.
- **Breakdown saved** → Subject Performance section + Analytics Mock Subject Trend chart update.

---

## Screen: History (`/history`)

### Purpose
Calendar view of all study days.

### Calendar
- Month grid with prev/next navigation.
- Day cells: green (complete), amber (partial), red (missed), blue (rest), grey (no log/future).
- Today's cell: navy ring outline.
- SR-done days: purple dot below date.

### Day Detail
- Desktop: fixed left calendar + right detail panel.
- Mobile: full-width calendar → bottom sheet on tap (90vh max, drag handle, close X).
- Detail: date heading, status badge, task/questions/study-time/SR stats, study blocks with done/cancelled states.

### Month Summary Stats Row
- Total active days, total questions, SR hits done.

---

## Screen: Analytics (`/analytics`)

### Purpose
Charts and deep-dive stats. Self-fetches all data independently.

### Charts

| Chart | Data source | What it shows |
|---|---|---|
| **Question Bank Progress** | `question_logs` + `study_log` | Area chart: cumulative questions done vs total target. |
| **SR Compliance Donut** | `sr_records` | Done / Pending / Overdue slices. |
| **Forgetting Curves** | `sr_records` + `study_log` | Ebbinghaus decay per subject between study_start and exam_date. |
| **SR Review Timeline** | `sr_records` | Gantt: SR1/SR2/SR3 bars per subject. |
| **SR Review Questions** | `sr_records` | Bar chart of sr1/2/3_questions per subject. |
| **Blueprint Balance + Focus Areas** | `subjects` + `tasks` + `study_log` + `question_logs` + `mock_exams` + `mistake_logs` | Grouped by blueprint_category: completion % and accuracy %. Below chart: top-5 weakest subjects from `rankWeakAreas` (composite: accuracy 40% + coverage 25% + mock accuracy 25% + mistake share 10%); each shows weakness bar + diagnosis + `actionSuggestion` button → `/questions`, `/plan`, or `/mistakes`. |
| **Mock Exam Trend** | `mock_exams` | Line chart of all mock scores with 70% reference line. |
| **Mock Subject Trend** | `mock_exam_breakdown` | Recharts LineChart one line per subject (top 5); X = mock dates; 70% pass reference; only shown when breakdowns exist. |
| **Mistake Analysis** | `mistake_logs` | Horizontal bar chart of mistake types. |
| **Retention Map** | `sr_records` + `subjects` | Grid heatmap of current retention %. |
| **Study Heatmap** | `study_log` | GitHub-style calendar heatmap. |
| **Pass Probability Trajectory** | `mock_exams` + `question_logs` + regression | Recharts ComposedChart: navy scatter (actual mocks), dashed regression Line to exam day, Area confidence band, green pass-line ReferenceLine, red exam-date vertical. Pro-gated via `PassProjectionGate`. Requires ≥2 dated mocks + future exam date. |
| **Exam Pace** | `mock_exams` | Avg seconds/question across last 3 mocks, vs `target_seconds_per_question`. Trend line + target ReferenceLine. Only shown when ≥1 mock has time data. |
| **Shaky Corrects** | `question_logs` (confidence-tagged) | Stacked AreaChart: confident/unsure/guessed correct answers over time. Only shown when ≥5 confidence-tagged logs. |

### "Print report" button
- Navigates to `/report`.

---

## Screen: Mistakes (`/mistakes`)

### Purpose
Log and review question mistakes for pattern analysis and spaced re-testing.

### Add Modal
- Fields: What I got wrong (textarea), Subject, Mistake type (9 categories), Clinical area, Rule to remember (correction_note), Date.
- Adding auto-sets `next_review = today + 1` (starts the review ladder).

### Mistake Cards
- Type + subject badges, date, serif topic text.
- 2-column colored panels: clinical area (red-soft), rule (green-soft).
- Bold "Rule" row below divider.

### Mistake Review Loop
- `next_review` ladder: 1 → 3 → 7 → 14 days (keyed by `review_count`).
- Due = `next_review ≤ today AND NOT resolved`.
- **Today screen MistakeReviewSection**: reveal-rule → Still shaky (reschedules) / Got it (resolves).
- **SR Module Review Queue**: Mistake cards with inline reveal.
- After 3 shaky ratings: graduates to a topic SR record (`source_type='mistake'`).

### Filter
- By subject, by mistake type.

### Right Sidebar
- **Mistake type distribution**: colored bars per type.
- **By subject**: bars per subject.
- **This week's learning rules**: correction_notes from the last 7 days.

### What changes when…
- **Mistake logged** → analytics chart updates; `next_review` scheduled.
- **Reviewed "Shaky"** → `review_count` incremented, `next_review` pushed out.
- **Reviewed "Got it"** → `resolved = true`, leaves the queue.
- **Shaky ×3** → topic SR record created, appears in SR Module Review Queue.

---

## Screen: Settings (`/settings`)

### Tabs (exam mode)

#### 1. Exam Setup
- Exam type (AMC MCQ / PLAB 1 / USMLE Step 1 / Custom), exam display name, exam date, study start date — **save via "Save Dates & Name" button** with date-change confirmation modal.
- Daily question target — **saves on change**.
- Target seconds per question — **saves on change**; label shows "1m 12s" format; defaults AMC=72s, PLAB=60s, USMLE=90s.
- Question bank name — **saves on blur**.
- **Question Bank Pools** card: rows of source name + total questions; auto-seeded from `question_bank_name`; saves on blur; drives qbank progress tracking.
- **Feasibility card**: Weeks Left, Total Tasks, Tasks/Week, label (Comfortable ≤4/wk · Achievable ≤7/wk · Tight ≤10/wk · "increase hours or reduce scope" >10/wk) in correct color.
- **Exam Day Logistics** card: registration deadline, test center name/address, test-center-confirmed checkbox, ID-ready checkbox, permitted items. Text/date saves on blur; checkboxes save immediately.
- **Start a new plan** card: confirm modal → deletes tasks/subjects/phases/task_steps, resets `onboarding_complete = false` → triggers new onboarding wizard.

#### 2. Subjects
- CRUD with drag-to-reorder. Each subject: name, blueprint_category, tier, sr_hits, class_count, emedici_target.

#### 3. Tasks
- Full CRUD table. Fields: title, subject, phase, due_date, emedici_qty, is_milestone, is_mock.

#### 4. SR Settings
- SR1 interval, grace period, SR2/SR3 multipliers.

#### 5. Daily Routine
- Study hours, max tasks/day, rest day.
- Prayer times (5 rows: name, mosque/home toggle, time, duration).
- CD Path schedule (days, departure/return, label).
- Gym schedule.
- **Work Schedule**: shift days, start/end times, label. Shift-end ≥22:00 or start ≥14:00 → morning recovery block after night shift.

#### 6. Study Plans
- Template viewer (read-only).

#### 7. Phases
- CRUD with drag-to-reorder. Each phase: name, sort_order, target_completion_date.

#### 8. Import / Export
- **Export rows** (all free): Study Plan .ics / Progress Card PNG / Question Sessions CSV / Mock Exams CSV / Mistake Rules CSV / Study Log CSV / Full Backup JSON.
- **Restore from Backup** card: file upload (`.json`), validate against exportFullSnapshot format, preview (phase/subject/task counts), confirm → delete tasks/subjects/phases → re-insert from backup. **Study_log / mock_exams / question_logs / sr_records / mistake_logs are never touched.**
- **Paste Qbank Results** card → `QbankImportModal`.
- **Reset to Default Data** card.

#### 9. Notifications
- Master enable/disable toggle.
- Per-type toggles (7 types): morning_digest / sr_overdue / mock_reminder / re_engagement / weekly_recap / mistake_review_due / sprint_taper.
- Quiet hours (start/end time inputs).
- Browser permission request button.
- In-app fallback notice when permission blocked.

#### Billing Tab
- Current plan card (free preview / trial countdown bar / expired / pro active).
- Pro feature list.

#### Danger Zone
- Delete account (all data + auth record).

#### Admin-only tabs (ias.ndc@gmail.com)
- Audit Log, Feature Flags.

### Dark Mode
- Moon/sun toggle in sidebar footer.
- Preference in localStorage (`studyrise_theme`) + `feature_flags` Supabase table.
- All CSS vars flip automatically via `.dark` class on `<html>`.
- Applied before React hydrates (no flash).

---

## Screen: Rapid-Review Sheet (`/review-sheet`)

### Purpose
Printable dense list of all correction notes (rules) grouped by subject. FREE, not Pro-gated.

### Content
- Header: "Rapid-Review Sheet — {exam name}", generated date, rule count, subject count.
- Subjects in alphabetical order. Each subject shows a numbered list of `correction_note` values.
- Only non-empty `correction_note` values included.
- Empty state: "No rules logged yet — go to Mistakes to add some."

### Print behavior
- `window.print()` produces clean PDF.
- Scoped `@media print` CSS hides app chrome (sidebar, nav, mobile tab bar).
- A4 margins applied.

---

## Screen: Exam Progress Report (`/report`)

### Purpose
Printable comprehensive progress report. FREE, not Pro-gated. Entry: Analytics "Print report" button or Import/Export tab.

### 8 Sections
1. **Header**: exam name, candidate (display_name), readiness score, generated date.
2. **Overview**: days studied / remaining, total questions, overall accuracy, mock avg, mocks taken.
3. **Readiness Summary**: `projectReadinessToExamDate` projected±confidence band, pass line, margin, verdict, coverage %. Honest fallback when <2 mocks or no date.
4. **Subject Performance Table**: done / accuracy / coverage / mock-accuracy / SR-status per subject.
5. **Mock Exam History**: date / score / ▲▼ trend arrow.
6. **Qbank First-Pass**: `getFirstPassProgress` bars with rounded % per source.
7. **Focus Areas**: top-5 `rankWeakAreas` with weakness bar + diagnosis + action.
8. **30-day Consistency**: `getConsistency(logs, 30)` — 30 dot row (active=green / rest=blue / none=gray) + legend.

### Print behavior
- `window.print()` produces PDF.
- `@media print` forces light tokens on `.exam-report` even in dark mode (always prints black-on-white).
- `break-inside: avoid` on each section.
- App chrome hidden.

---

## Onboarding Flow (new users — 3 steps)

Shown to users with `onboarding_complete = false` AND `app_mode = 'exam'`.

1. **Exam + Date**: exam type select (AMC MCQ / PLAB 1 / USMLE Step 1 / Custom — Custom reveals a name field), exam date, study start date (default today).
2. **Study Budget**: daily study hours slider (1–10, default 4) + study days/week slider (3–7, default 6) + live "~N hours a week" line.
3. **Generate Plan**: minimal preview (exam · days-to-exam · daily pace) + one-tap Generate → ~2s animation → `buildDefaultConfigsForExam(examType)` → `generateQuickPlan` → `savePlanToSupabase` → `onboarding_complete = true` → `/plan`.

Legacy users (`onboarding_complete = null`) skip onboarding entirely.

---

## Cross-Module Data Flow

### When a task is marked "Completed"
1. `tasks.status` → `'completed'`.
2. `study_log` row upserted.
3. If milestone: `sr_records` row created with `sr1_due = completed_date + sr1_interval`.
4. Dashboard Plan Tasks increments, SR Compliance may change.
5. History calendar day goes green.
6. SR Module: new subject card appears.

### When an SR hit is rated
1. `sr_records.srN_done = true`, `srN_done_date`, `srN_rating`.
2. `srN_questions` written if > 0.
3. `srN+1_due = done_date + rating_interval × multiplier`.
4. Dashboard SR Compliance recalculates.
5. Review Queue item removed.
6. Analytics Forgetting Curves / SR Timeline update.

### When a mistake is reviewed "Shaky" × 3
1. `review_count` incremented to ≥3 (still unresolved).
2. `SRService.createTopicSR` called: topic SR record with `source_type='mistake'`, `source_id=mistake_id`, `topic_label=short_note ≤60ch`.
3. Toast: "Added to your spaced repetition queue."
4. SR Module Review Queue shows the new topic record.
5. Idempotent: re-flagging the same mistake creates no duplicate.

### When questions are logged
1. Row inserted into `question_logs`.
2. Dashboard QB Done + Q Deficit update.
3. Analytics QB Progress, Blueprint Balance, Shaky Corrects update.
4. First-pass progress recalculates (Plan strip + Dashboard card).

### When a mock exam is logged
1. Row inserted into `mock_exams`, percentage calculated.
2. Dashboard Mock Average + Readiness Projection update.
3. Analytics Mock Trend / Mock Subject Trend / Pass Probability update.
4. Sprint scheduled mocks section updates.

### When a mistake is logged
1. Row inserted into `mistake_logs`, `next_review = today + 1`.
2. Analytics Mistake Analysis chart updates.
3. Tomorrow's Today screen will show it in MistakeReviewSection.

---

## Scheduling / Rescheduling System

### How task due dates are set (onboarding)
1. `quickPlanGenerator.buildDefaultConfigsForExam(examType)` → subject configs (AMC → DEFAULT_AMC_SUBJECTS; PLAB/USMLE → exam-module subjects; custom → AMC fallback).
2. `generateQuickPlan` assigns `due_date` based on hours budget:
   - Fills each day up to `dailyHours` × `daysPerWeek`.
   - Capped at 4 tasks/day. Sunday rest.
3. `savePlanToSupabase` writes phases → subjects → tasks.

### Reschedule (from Plan screen)
- Auto / Strict modes via `packTasksByHours`.

---

## Data Tables Reference

| Table | Written by | Read by |
|---|---|---|
| `user_settings` | Settings, Onboarding, Exam logistics | All screens |
| `tasks` | Plan, Settings/Tasks, Onboarding | Today, Plan, Dashboard, Analytics, History |
| `phases` | Settings/Phases | Plan, Onboarding |
| `subjects` | Settings/Subjects | All screens |
| `study_log` | Today | Dashboard, History, Analytics |
| `sr_records` | Today (task complete), SR Module, Questions (flag), Mistakes (graduate) | Dashboard, Today, SR Module, Analytics, Review Queue |
| `question_logs` | Questions, LogSessionFab | Dashboard, Questions, Analytics |
| `mock_exams` | Mock Exams | Dashboard, Mock Exams, Analytics |
| `mock_exam_breakdown` | Mock Exams (add/edit breakdown) | Mock Exams (subject performance), Analytics (subject trend) |
| `mistake_logs` | Mistakes | Today (review section), SR Module (queue), Analytics |
| `task_steps` | TaskDrawer | Today (checklist), TaskDetailDrawer |
| `schedule_templates` | Settings/Daily Routine | Today (DayPlanner, minor) |

---

## Known Intentional Behaviours (Not Bugs)

- History calendar cell is only green if BOTH `study_log.status = 'complete'` AND the referenced task still has `status = 'completed'`. If the task is reset on Plan, the calendar day reverts.
- SR Compliance shows 100% when nothing is due yet (not 0%).
- The QB Done tile uses `settings.question_bank_name` for its label but always reads from `question_logs` + `study_log.e_medici` regardless of the label.
- Deleting an SR record via the trash icon also resets the milestone task to `not_started`.
- SR virtual tasks in DayPlanner have no real DB row — display-only, never saved via TaskService.
- AI Advisor is cached 4 hours and may take up to 30s; it falls back gracefully when OpenAI is unreachable.
- Restore from Backup only restores tasks/subjects/phases — it **never** touches study_log, mock_exams, question_logs, sr_records, or mistake_logs.
- The WhatIfSimulator (USM) is ephemeral — sliders never write `grade_received`, only `target_score`.
- `approxConvert` between grade scales always displays "≈" — exact cross-scale equivalence is not implied.
- Mistake review `next_review` is NULL on legacy rows added before the `exam_improvements_001.sql` migration — those rows never appear in the review queue.
- Print report forces light mode even when the app is in dark mode (so PDFs always render black-on-white).
- LogSessionFab saves `mode: 'mixed'` — it does not require a specific timed/untimed/tutor mode selection.

---

# Part 2 — University Student Mode (USM)

## Part 1 — Academic Structure

### 1.1 Terms
- Six term types: Semester, Trimester, Term (Oxbridge), Quarter, Block, Custom
- Per-term fields: name, type, start/end date, mid-term break dates, study-week/SWOT dates, exam period start/end, active/archived status
- One active term per user at a time (enforced by partial unique index in DB)
- Unlimited archived terms
- Smart defaults on term name (e.g. "Semester 2 YYYY" when month ≥ June)
- **Source files:** `useTerms.js`, `TermSetupTab.jsx`, `termWeeks.js`, `migrations/usm_001_foundation.sql`

### 1.2 Units (terminology-flexible: Unit / Module / Course / Subject / Paper)
- Per-unit fields: name, code (optional), color (12-palette, resolves to `--uni-*` CSS vars), credit value + region label, coordinator, target grade, priority (Low/Normal/High), pass/fail flag, notes, sr_mode (off/lite/full)
- Free tier: 5 units per term; Pro: unlimited (enforced via `canAddUnit` + `uniGates`)
- Color picker marks already-used colors
- Cascade-count delete (shows how many assessments/classes will be removed before confirming)
- Terminology is live throughout the entire app UI — no hardcoded "Unit"
- **Source files:** `useUnits.js`, `UnitsTab.jsx`, `uniConstants.js`, `uniGates.js`

### 1.3 Assessments
- 36 assessment types across 7 categories (Written, Exams, Oral, Group, Practical, Participation, Digital)
- Per-assessment fields: title, type, unit, due date + due time (default 23:59), weight %, hurdle flag, estimated hours, logged hours (read-only from study_sessions), status (Not Started → In Progress → Submitted → Graded), grade received + max, word/question count, group members, submission location, notes, checklist, target_score (what-if planning only), ical_uid, last_lms_change
- Status flow: Not Started → In Progress → Submitted (stamps submitted_at + late flag + penalty note) → Graded
- Extension support: new due date set while original is preserved in `original_due_date`
- Recurring series: weekly creation with break-skipping preview (n occurrences, each titled " — Week k")
- Scoped series edits: "This one" or "This and following"
- Checklist per assessment: auto-seeded from DEFAULT_CHECKLISTS by category, add/rename/reorder/remove/check items
- LMS badge: "Updated by your LMS" chip in drawer (14-day transient via `last_lms_change`)
- **Source files:** `useAssessments.js`, `AssessmentDrawer.jsx`, `AddAssessmentModal.jsx`, `assessmentHelpers.js`, `migrations/usm_002_assessments.sql`

### 1.4 Classes / Timetable
- Per-class fields: unit (inherits color), class type (Lecture/Tutorial/Lab/Seminar/Workshop/Clinical/Online), day of week (0=Monday), start/end time, location (text or URL — URL becomes Join button), repeat pattern (weekly/odd/even/specific weeks/rotation_A/rotation_B), specific_weeks array, track_attendance flag
- A/B rotation week support with rotation_anchor setting (a_first/b_first)
- Attendance tracking: one-tap Attended/Skipped from Today screen
- Attendance % per unit — warns when approaching 80% hurdle threshold
- **Source files:** `useClasses.js`, `useAttendance.js`, `Timetable.jsx`, `TimetableTab.jsx`, `ClassFormModal.jsx`, `timetableHelpers.js`, `migrations/usm_003_timetable.sql`

---

## Part 2 — Screens

### 2.1 University Dashboard (`/`)
- 4-tile KPI row: Semester progress (Week n of total), Due in 7 days, Current average (scale-formatted), Hours this week vs target
- Each tile tappable with navigate target
- 14-day deadline strip: horizontal scroll, overdue pinned first in red, unit-color left accent
- Heavy-week warning card (from `detectHeavyWeeks`): spec copy + hours vs target, tap → /semester scrollToWeek; "Start early — plan it" button (ProGate `bunching_replan`)
- Week 3-4 check-in card: interactive, persists response to `checkin_state` JSONB in user_settings; branches: on_track / slightly_behind / struggling; manual control mode degrades to note
- Rule-based coach card: no OpenAI, priority-ordered one-liner
- Unit cards grid: color bar, name+code, grade, next deadline, attendance badge, mini Ring
- Today's classes compact list with Now/Next badges and Join links
- Semester Wrapped banner: shown when `today > activeTerm.end_date`
- Full empty states for new accounts
- **Source files:** `UniDashboard.jsx`, `bunchingRadar.js`, `gradeEngine.js`, `migrations/usm_004_dashboard.sql`

### 2.2 University Today (`/today`)
- Today's classes timeline: chronological, current/next highlighted, one-tap attendance, Join links
- Focus task card: uniPriority engine picks highest-scoring open assessment; shows due chip, weight, hours logged vs estimated, Start Focus Session button; deferral streak ≥ 3 triggers "5-minute rule" softened copy
- PlannerTray section (hidden in manual control mode)
- DayPlanner: uni blocks generated via `generateUniBlocks` (classes as fixed blocks, daily_hours budget, rest day, top-3 focus queue); accepted/moved planned sessions placed first
- Quick add bar: natural language (e.g. "essay draft 2h") → study block; optional assessment select
- Day log: Complete / Partial / Rest / Missed → writes to shared `study_log` table
- Block timer end → "Log progress?" slider (0–100%) → writes `study_sessions` row
- **Source files:** `UniToday.jsx`, `uniPriority.js`, `blockGenerator.js` (generateUniBlocks)

### 2.3 Semester Plan (`/semester`)
- Three view modes, persisted in localStorage: List / Timeline / Kanban (Pro)
- View toggle pill (mirrors exam-mode Plan)
- Composable filter bar: unit / category / status / week-range chips + due/weight/unit sort + Clear
- `due7` preset chip
- Assessment drawer on tap (AssessmentDrawer)
- Add assessment modal (AddAssessmentModal)
- Navigate-state contract: `{openAssessmentId}`, `{filter:'due7'}`, `{scrollToWeek}`
- **List view:** grouped by unit (color left-border header), rows due-date sorted, completed collapsed per group
- **Timeline view:** teaching-week axis from `getTeachingWeeks` (break columns striped, study week/exam period tinted); one lane per unit; markers by weight tier (8/12/16px dots); hurdle = amber ring; done markers faded; heavy weeks amber glow + hours badge + "Plan it" button; Today line; accepted/moved sessions as hollow dots; zoom toggle (Comfort / Weeks-fit); drag/swipe scroll
- **Kanban view (Pro):** dnd-kit status columns (Not Started / In Progress / Submitted / Graded); submission-moment toast on drop to Submitted; drop to Graded opens drawer at grade entry; backwards-move confirm clears stamps
- **Source files:** `SemesterPlan.jsx`, `SemesterListView.jsx`, `SemesterTimeline.jsx`, `SemesterKanban.jsx`, `SemesterFilterBar.jsx`, `useSemesterView.js`

### 2.4 Unit Detail (`/semester/unit/:id`)
- Header: color bar, name/code, credits badge, pass/fail + priority badges, coordinator, running average vs target grade
- Grade progress: earned/dropped/remaining stacked bar + embedded compact WhatDoINeedCard
- Assessments list: open then completed, click → AssessmentDrawer
- Classes section: attendance % + per-week attendance dots (green attended / red skipped / hollow unlogged / dashed future)
- Study hours chart: Recharts BarChart per teaching week, bar fill = unit color
- Notes: autosave on blur with Saved flash
- Back → /semester (view preserved via localStorage)
- QuickAddFab pre-fills this unit on this route
- **Source files:** `UnitDetail.jsx`, `WhatDoINeedCard.jsx`

### 2.5 Grades (`/grades`)
- **Section B — What do I need?** (`WhatDoINeedCard`): unit select, target from scale presets + Custom %, tone-colored result (achievable/stretch/impossible), per-assessment required lines, hurdle line, visible formula footer; recomputes live on grade entry
- **Section A — Grade tracker:** per unit: color bar, running average via `formatAverageDisplay`, target_grade chip, assessment table (weight, grade or inline entry, contribution), visible math line, remaining-weight note, "weights total X%" honesty caption; pass/fail units show completion-only card
- **Section C — What-if simulator** (`WhatIfSimulator`): sliders on ungraded items (unit-color accent), locked graded rows, animated projected final via framer-motion useSpring, "If I get X on Y…" sentence; ephemeral — only "Set as my targets" persists (to `target_score`, never `grade_received`)
- **Section D — GPA/WAM panel** (`GpaPanel`): per-term rows + cumulative, credit-weighted, formatted per scale; current term free, all-terms history behind `multi_term_gpa` ProGate; approxConvert "≈" line for non-gpa4 scales; pass/fail units excluded but noted
- Entire screen is FREE
- **Source files:** `Grades.jsx`, `WhatDoINeedCard.jsx`, `WhatIfSimulator.jsx`, `GpaPanel.jsx`, `gradeEngine.js`, `gradeScales.js`

### 2.6 Timetable (`/timetable`)
- Weekly grid (desktop) / day agenda (mobile)
- Week navigation with A/B rotation support (rotation_anchor from settings)
- Class blocks in unit colors, showing type, room/Join link
- Tap a block → edit, attendance, jump to unit
- Attendance tapping with hurdle-threshold warning on skip
- **Source files:** `Timetable.jsx`, `timetableHelpers.js`

### 2.7 Grade Report (`/grades/report`)
- Transcript-style print page
- `window.print()` = the PDF
- Pro gate: `grades_pdf`
- **Source files:** `GradeReport.jsx`

### 2.8 University Analytics (`/analytics`)
- 7 charts total; 3 free, 4 behind `full_analytics` ProGate (per-chart)
- **Free:** Grade trend (line per unit), Study hours by unit vs credit share (honest caption), Study consistency heatmap (reuses exam StudyHeatmap with optional new props)
- **Pro:** Deadline adherence (lead-time line + avg), Planning accuracy (estimated vs actual scatter + multiplier readout), Attendance heatmap (unit × teaching week), Projected finals (per-unit band track: floor/ceiling + projected marker, scale-formatted)
- Self-fetching, own lazy chunk
- **Source files:** `UniAnalytics.jsx`, `StudyHeatmap.jsx` (shared)

---

## Part 3 — Intelligence Layer

### 3.1 AI Study Planner
- Deterministic engine — zero OpenAI calls; "AI" label refers to this algorithm
- Control dial: Full Auto / Suggest (default) / Manual — set in Settings → Daily Routine via `PlanningControlCard`
- `buildDemand`: priority-ordered items by remaining hours (inflated by `personalMultiplier`), heavy-week pull (assessments due in heavy week get `startBy` = previous week start)
- `draftWeek` / `draftRange`: packs 100-min + 50-min chunks around classes + kept sessions; never drafts the past
- Proposal rows: `{assessment_id, date, start_time, duration_minutes, label, reason, status:'proposed'}`; label = implementation-intention format (next unchecked checklist item + title + hours estimate); reason explains scheduling decision
- Lock rule: human accept/move/resize is never overridden; `replaceProposals` only deletes `status='proposed' AND user_locked=false`
- PlannerTray UI: proposal cards (label/time/reason), Accept/Move/Resize/Reject per card, "Replan my week" button, `autodraft` prop for modal/dashboard entry points
- Auto mode: inserts drafts as `accepted` immediately (no review tray)
- Manual mode: hides all planner UI; only warnings (radar, coach) remain
- Accepted/moved sessions flow into `generateUniBlocks` as immovable blocks at their start_time; block timer completion → `markDone(plannedSessionId)`
- **Source files:** `uniPlanner.js`, `usePlannedSessions.js`, `PlannerTray.jsx`, `PlanningControlCard.jsx`, `scheduler.js` (shared `packItemsByHours`)

### 3.2 Deadline Bunching Radar
- `detectHeavyWeeks`: flags teaching weeks where (a) estimated hours > weekly target, OR (b) ≥3 assessments due, OR (c) ≥50% combined weight in any 7-day window
- Submitted/graded excluded; break weeks never flagged
- Surfaces on: Timeline (amber glow + hours badge), Dashboard (heavy-week warning card with "Start early — plan it" → ProGate `bunching_replan` → PlannerTray autodraft)
- Warning itself is always free; auto-replan is Pro
- **Source files:** `bunchingRadar.js`, `UniDashboard.jsx`, `SemesterTimeline.jsx`

### 3.3 Week 3-4 / Week 6 Check-in
- Dashboard card appears in weeks 3 or 4 (key 'week3') and week 6 (key 'week6'), once per key
- Response persisted to `user_settings.checkin_state` JSONB — card never re-asks
- Branches: on_track → confirmation; slightly_behind → PlannerTray draftRange; struggling (week3) → workload review modal (heaviest unit + support URL + recovery tray); struggling (week6) → lighter draftRange only
- Manual control → branches degrade to note
- X dismisses without answering; stores `{dismissed:true, dismissedAt}`
- **Source files:** `UniDashboard.jsx`, `uniPlanner.js` (draftRange), `migrations/usm_004_dashboard.sql`

### 3.4 Planning Fallacy Correction
- `personalMultiplier(sessions, assessments, typeCategory)`: median actual/estimated ratio from historical submitted/graded assessments with logged hours; category (≥3 samples) → overall (≥3) → 1.5 default; clamped [1.0, 3.0]
- `PlanningFallacyChip` in AssessmentDrawer Effort group: tap applies suggested hours (never silent)
- Learned multiplier (per category) is Pro (`fallacy_learned`); free tier always gets 1.5 default chip
- **Source files:** `planningFallacy.js`, `PlanningFallacyChip.jsx`

### 3.5 Smart Notifications (FREE forever)
- `computeUpcomingNotifications`: 24-hour window, quiet-hours shift, 5/day priority cap
- Notification types (all individually toggleable): morning digest (8AM), exam 7-day warning, assignment 72h ("time to start"), assignment 24h, day-of 9AM, attendance event-driven, heavy-week 8:30AM on week's first day
- Preferences in localStorage (per-device, matches browser permission scope)
- Delivery: `webNotificationProvider` (Notification API + setTimeout) with in-app toast fallback
- FCM/APNs interface ready for later
- `scheduleUniNotifications` called once per app load in uni mode; NotificationsTab re-calls on pref change
- **Source files:** `notify/notifier.js`, `notify/uniNotifications.js`, `NotificationsTab.jsx`

### 3.6 Review Reminders (SR Lite) + Full SR Bridge
- **SR Lite (default, sr_mode='lite'):** after logging a study session, 8-second toast offers "Remind me to review in 7 days?"; expanding ladder 7→14→30→done; due reminders above quick-add bar with Done/Snooze/Dismiss
- **Full SR (Pro, sr_mode='full', gate `FULL_SR`):** sessions ≥50 min offer "Track with spaced repetition" modal → creates sr_records row with subject_name = "UnitName: topic"; due hits render SRModal on UniToday; compact SR panel on UnitDetail
- sr_mode toggle per unit in UnitsTab; Full chip disabled + Pro badge for free users
- App.jsx SR auto-create effect guarded with `if (mode !== 'exam') return` — exam-style milestone SR never fires in uni mode
- **Source files:** `useReviewReminders.js`, `UniToday.jsx`, `UnitDetail.jsx`, `uniGates.js`

### 3.7 Exam Revision Planner
- `generateRevisionPlan`: inverse-gap weighting (gap = targetPct − runningAverage, clamped [2,40]), round-robin interleave, per-exam taper (sessions end before each exam's due_date)
- `getRevisionWindow`: study_week_start OR exam_period_start−14d OR first_exam−14d, clamped to today
- scope='weakest' (free, one unit) vs scope='all' (Pro, gate `REVISION_ALL_UNITS`)
- Entry points: Grades banner (≥1 open exam), SemesterTimeline exam-period zone, Dashboard coach card (≤21 days to first exam) — all via `PlannerTray autodraft="revision"`
- **Source files:** `revisionPlanner.js`, `PlannerTray.jsx`

---

## Part 4 — Data In and Out

### 4.1 LMS iCal Import + Daily Re-sync (FREE)
- CORS proxy at `/api/ical-fetch`: auth required, SSRF guard, webcal:// normalised, 15s timeout, 2MB cap
- RFC 5545 parser (`parseIcal.js`): dependency-free, handles folded lines, DATE vs DATE-TIME, UTC-Z, TZID wall-clock simplification
- Provider interface (`lmsProviders.js`): canvas, moodle, blackboard, brightspace_d2l, generic; `detectProvider`, `inferTypeFromTitle`, `matchCourseToUnit`
- Sync rules: new uid → propose; changed date + not manually_edited → apply silently + last_lms_change badge; changed date + manually_edited → conflict card; uid disappeared → flag list only, never auto-delete
- `insertImportedAssessments`: 23505-safe deduplication (per-row fallback on batch conflict)
- Daily auto-sync: `runBackgroundSync` once per load when lastSyncedAt >20h old; silent-rule subset only; new events counted into `localStorage:studyrise:lms:pendingProposals`
- 3-step UI: URL + detect → course/unit preview → summary (in onboarding Step 4 and Settings → LMS Sync)
- **Source files:** `api/ical-fetch.js`, `src/lib/ical/parseIcal.js`, `lmsProviders.js`, `syncEngine.js`, `IcalImportPanel.jsx`, `LmsSyncTab.jsx`, `migrations/usm_006_ical.sql`

### 4.2 Quick Add FAB (everywhere)
- Floating + button on all uni screens; hides on /settings, /profile, /legal
- Natural language: "Chem quiz Friday 20%" → unit (name/code match), type (keyword inference), due date (next weekday occurrence), weight
- Confirm chip row: all fields editable before save; unparsed text → title
- Pre-fills unit on `/semester/unit/:id`
- Own lazy chunk — exam bundle unchanged
- **Source files:** `QuickAddFab.jsx`, `quickAddParser.js`

### 4.3 Exports
| Export | Tier | Mechanism |
|--------|------|-----------|
| Full term JSON | Free | `exportTermJSON` in `uniExport.js` |
| Assessments CSV | Free | `exportAssessmentsCSV` |
| Timetable PNG | Free | SVG → canvas → toBlob (`buildTimetableSVG`) |
| Outbound .ics | Pro (`ical_outbound`) | `buildICS` / `downloadICS` |
| PDF grade report | Pro (`grades_pdf`) | `/grades/report` + `window.print()` |

- **Source files:** `uniExport.js`, `GradeReport.jsx`, `UniImportExportTab.jsx`

---

## Part 5 — Engagement

### 5.1 Semester Wrapped
- Full-screen overlay triggered by Dashboard banner when `today > activeTerm.end_date`; also accessible from Settings → Term Setup as preview
- Stats: hours studied, sessions count, assessments completed, final average (`formatAverageDisplay`), busiest week, attendance %
- "Save as image": 600×760 navy SVG card → `svgToPngBlob` → download
- FREE
- **Source files:** `SemesterWrapped.jsx`, `uniExport.js` (shared `svgToPngBlob`)

### 5.2 Submission Moment
- Marking Submitted triggers green success flash + acknowledgment line ("Submitted 2 days early. Logged." or late variant)
- Implemented in `AssessmentDrawer` and `SemesterKanban` (drag to Submitted column)

### 5.3 Progress Rings and Bars
- Unit progress rings (submitted+graded / total) on Dashboard unit cards
- Semester progress bar on KPI tile
- Study hours ring (vs weekly target)
- Grade stacked bars (earned/dropped/remaining) on UnitDetail

---

## Part 6 — Customisation Dimensions

| Dimension | Options |
|-----------|---------|
| Term structure | Semester / Trimester / Term / Quarter / Block / Custom |
| Subject terminology | Unit / Module / Course / Subject / Paper (app-wide live relabelling) |
| Grade scale | Percentage / GPA 4.0 / GPA 7 + WAM / CGPA 10 / UK Honours / Pass-fail (pluggable registry) |
| Credit system | Numeric + label (CP / credit hours / CATS / ECTS / credits) |
| Assessment types | 36 types, 7 categories |
| Week patterns | Every week / odd / even / specific weeks / A-B rotation |
| Date format | DD/MM or MM/DD |
| Week start | Monday or Sunday |
| Planning control | Full Auto / Suggest / Manual |
| Notification cadence | Per-type toggleable + quiet hours |
| Study availability | Daily hours + rest day (shared with exam mode settings) |

---

## Part 7 — Free vs Pro Gate Matrix

> Everything is FREE until admin flips `subscription_activated` in the Admin Panel.

| Feature | Free | Pro Gate |
|---------|------|----------|
| Units per term | 5 | unlimited (`canAddUnit`) |
| AI planner proposals | 10/week (counted in PlannerTray) | unlimited (`ai_planner`) |
| Kanban view | — | `kanban` |
| Deadline bunching auto-replan | Warning only | `bunching_replan` |
| Planning fallacy learned multiplier | 1.5× default chip | `fallacy_learned` |
| Exam revision planner | Weakest unit only | `revision_all_units` |
| Full SR per unit | SR Lite reminders only | `full_sr` |
| Full analytics suite (4 charts) | 3 basic charts | `full_analytics` |
| PDF grade report | — | `grades_pdf` |
| Outbound .ics calendar feed | — | `ical_outbound` |
| Multi-term GPA history | Current term | `multi_term_gpa` |
| Attachments on assessments | — | `attachments` (no UI yet) |

**Explicitly FREE forever (asserted in uniGates.js, never gate these):**
Grade calculator / What do I need / What-if simulator / GPA-WAM all scales / Dark mode / iCal LMS import + re-sync / Notifications / Week 3-4/6 check-in / Timetable image export / Terms / Timetable / Today / Day planner / Pomodoro / Unlimited assessments

---

## Part 8 — Onboarding Flow (USM Path)

- **Step 0 — Mode Select** (`ModeSelect.jsx`): all new users; "Exam Prep" or "University"; writes `app_mode`
- **Step 1 — Term** (`UniStepTerm.jsx`): type chips, name, start/end, collapsible break/study/exam ranges; smart defaults
- **Step 2 — Terminology + Grading** (`UniStepTerminology.jsx`): subject_term chips (live relabelling), grade_scale chips with region hints, week_start toggle
- **Step 3 — Units** (`UniStepUnits.jsx`): fast-entry list, 12-color picker, soft cap note at 5
- **Step 4 — Deadlines** (`UniStepDeadlines.jsx`): skippable; fork → iCal import (full IcalImportPanel) OR manual entry rows
- **Step 5 — Your Week** (`UniStepWeek.jsx`): class quick-entry rows + daily hours stepper + rest day dropdown
- **Step 6 — Moment of Value** (`UniStepValue.jsx`): saving states; "Here is your semester." with term name, week count, unit chips, first-deadline line, "Open my dashboard" CTA

**Save sequence:** terms → units → assessments (manual) → classes → upsert user_settings (flip last; failed insert keeps user in wizard)

---

## Part 9 — Key Supporting Libraries

| File | Purpose |
|------|---------|
| `appMode.js` | Single source of truth for mode derivation: `getAppMode(settings)` |
| `uniConstants.js` | TERM_TYPES, SUBJECT_TERMS, UNIT_COLORS, ASSESSMENT_TYPES, CLASS_TYPES, REPEAT_PATTERNS |
| `gradeScales.js` | Pluggable scale registry (%, gpa4, gpa7_wam, cgpa10, uk_honours, passfail); `approxConvert`, `formatAverageDisplay`, `targetOptionsForScale` |
| `gradeEngine.js` | `unitGradeBreakdown`, `currentWeightedAverage` (credit-weighted), `whatDoINeed` solver (achievable/stretch/impossible/no_remaining/pass_fail) — 7 hand-verified worked examples in file header |
| `bunchingRadar.js` | `detectHeavyWeeks`, `weeklyHoursTarget` |
| `uniPriority.js` | `score`, `getFocusQueue`, `getDeferralStreak` (pure) |
| `uniPlanner.js` | `buildDemand`, `draftWeek`, `draftRange`, `weekStartISO` |
| `planningFallacy.js` | `personalMultiplier`, `suggestedHours` |
| `revisionPlanner.js` | `generateRevisionPlan`, `getRevisionWindow`, `getOpenExams` |
| `termWeeks.js` | `getTeachingWeeks`, `getCurrentWeek`, `getTotalTeachingWeeks` (breaks pause week count) |
| `timetableHelpers.js` | Rotation letters, class occurrence per date, grid layout, attendance math |
| `assessmentHelpers.js` | Type meta/icons, due chips, urgency, weight labels, DEFAULT_CHECKLISTS, `generateWeeklyDates` |
| `quickAddParser.js` | NL line → {title, unitId, typeId, dueDate, weight, estimatedHours} |
| `uniGates.js` | `UNI_GATES`, `FEATURE_MATRIX`, `configureGates`, `canUse`, `plannerWeeklyCap`, `GATE_COPY` |
| `uniExport.js` | JSON/CSV exports, SVG timetable → PNG, outbound .ics, shared `svgToPngBlob` |
| `scheduler.js` | Shared `packItemsByHours` (exam + USM planner reuse same core) |

---

## Part 10 — What Is NOT Built Yet (Deferred)

| Feature | Reason | When |
|---------|--------|------|
| Canvas REST API grades sync | iCal covers 100% for deadlines; API = depth | Phase 3 |
| Google Calendar two-way sync | Outbound .ics covers 80% | Phase 3 |
| Native iOS/Android apps | Web-first validates product first | Phase 3 |
| App-wide dark mode for USM screens | Dark tokens exist in tokens.css; full pass is whole-app session | Phase 3 |
| Offline / PWA | Architecture work required | Phase 3 |
| Study groups / sharing | Low research priority | Maybe never |
| Badges / points / leaderboards | Research shows harm to intrinsic motivation | Never |
| Syllabus PDF AI parsing | Heavy AI work; iCal is 80% solution | Phase 3+ |
| Hosted outbound iCal feed URL | .ics download ships; live feed = Phase 3 | Phase 3 |
| Server-side notification cron | App-load scheduling is MVP | Phase 3 |
| Native push (FCM/APNs) | Provider interface ready; mobile app ships first | Phase 3 |
| Bangladesh OTP + bKash/Nagad payments | Separate workstream | Separate plan |

---

---

# Part 3 — MBBS Bangladesh Mode

_Third app mode: `app_mode='mbbs_bd'` (stored), `'mbbs'` (derived by `getAppMode`). Activated when a user selects "MBBS Bangladesh" on the Mode Select screen. Exam and USM users download zero MBBS code (lazy chunks throughout). All BMDC 2021 curriculum data lives in `src/lib/mbbs/mbbsBmdcCurriculum.js` — the single canonical constant every MBBS feature reads._

---

## §3.1 — The Core Thesis

A Bangladeshi MBBS student manages four independent eligibility gates simultaneously:

1. **Attendance ≥75%** — per class type (Lecture, Tutorial, Practical, Dissection, Integrated Teaching, etc.); the gate binds on the **worst (minimum)** category.
2. **Formative ≥60%** — the in-course mark; for 1st Prof all three term exams are independent hard gates; for other phases a weighted average of logged entries; the figure is embedded as 10% of the written paper and never a separate exam.
3. **Previous professional exam passed** — a student carrying a supplementary cannot simply proceed; for 1st-Prof failure the system enters a full Phase-1 lockout (not a dual-phase track).
4. **Pass each component separately** — written, SOE (oral/viva), practical, clinical (Final Prof). Components are NOT offsetting; 60% pass mark required in each independently.

StudyRise gives this student a **digital eligibility file**: every gate is tracked live, the verdict updates as data comes in, the daily plan is gate-prioritised, and when exam season comes the system shifts to a focused per-subject per-board countdown.

---

## §3.2 — Academic Structure (BMDC 2021)

| Phase | Duration | Total Marks | Subjects |
|---|---|---|---|
| 1st Professional | 1½ yr | 1,300 | Anatomy 500 · Physiology 400 · Biochemistry 400 |
| 2nd Professional | 1 yr | 600 | Pharmacology & Therapeutics 300 · Forensic Medicine & Toxicology 300 |
| 3rd Professional | 1 yr | 900 | Community Medicine & Public Health 300 · Pathology 300 · Microbiology 300 |
| Final Professional | 1½ yr | 1,500 | Medicine & Allied 500 · Surgery & Allied 500 · O&G & Neonatology 500 |

**Written paper composition (all phases):**
- Full Answer (FA): 10% — this IS the formative embedded mark
- MCQ/SBA: 20% (SBA 50% + MTF 50%)
- SAQ/SEQ: 70% (SAQ 75% + SEQ 25%)

**GPA Scale (BMDC Table 13):**
| Grade | % | Grade Points |
|---|---|---|
| A+ | ≥80 | 4.00 |
| A | ≥75 | 3.75 — **Honours threshold** |
| A- | ≥70 | 3.50 |
| B+ | ≥65 | 3.25 |
| B | ≥60 | 3.00 — Pass threshold |
| F | <60 | 0.00 |

---

## §3.3 — Navigation

**Sidebar** (`MBBS_NAV`) and **Bottom Tab Bar** (`MBBS_TABS` / `MBBS_MORE_ITEMS`):

| Route | Screen | Icon | Lazy chunk |
|---|---|---|---|
| `/mbbs` | MbbsDashboard | Home | ✅ |
| `/mbbs/today` | MbbsToday | Calendar | ✅ |
| `/mbbs/items` | ItemsCards (Items tab + Cards/CAC tab) | Layers | ✅ |
| `/mbbs/attendance` | Attendance | CheckSquare | ✅ |
| `/mbbs/formatives` | Formatives | FileText | ✅ |
| `/mbbs/timetable` | Timetable | Grid | ✅ |
| `/mbbs/review` | MbbsReview | RefreshCw | ✅ |
| `/mbbs/questions` | MbbsQuestions (flag OFF by default) | PenLine | ✅ |
| `/mbbs/analytics` | MbbsAnalytics | BarChart2 | ✅ |
| `/mbbs/card-exams` | MbbsCardExams | Award | ✅ |
| `/mbbs/exam-schedule` | MbbsExamSchedule | Calendar | ✅ |
| `/mbbs/integrated-teaching` | MbbsIntegratedTeaching | BookOpen | ✅ |
| `/mbbs/questions-bank` | MbbsQuestionBank | Library | ✅ |
| `/mbbs/viva` | MbbsViva | MessageSquareQuote | ✅ |
| `/mbbs/review-sheet` | MbbsReviewSheet (Printer icon — in sidebar MBBS_NAV + bottom-bar More) | Printer | ✅ |
| `/mbbs/exam-prep` | MbbsExamPrep (**contextual**, no nav entry) | — | ✅ |
| `/mbbs/field-placements` | MbbsFieldPlacements (**contextual**, no nav entry) | — | ✅ |
| `/mbbs/supplementary` | MbbsSupplementary (**contextual**, no nav entry) | — | ✅ |

Contextual screens are reached from in-app links (dashboard two-track card → Supplementary; Attendance header → Field Placements; Exam Schedule / Dashboard exam-period banner → Exam Prep). No persistent sidebar/bottom-nav entries — avoids noise for the ~95% of students not in those states.

---

## §3.4 — Screen Descriptions

### Dashboard (`/mbbs`)

**Purpose:** Live eligibility verdict + four gate widgets + daily nudge. The command centre the student opens every morning.

**Content:**

**Eligibility status hero** — large status chip (Eligible / At Risk / Not Eligible / Phase-1 Locked) in verdict-coloured background, with:
- Blockers list (red): e.g. "Physiology Lecture attendance 72% — below the 75% eligibility threshold."
- At-risk list (amber): cautions that don't yet breach a gate.
- Compact supplementary strip (only when `mbbs_config.supplementary.active`).
- When `hasData=false` → soft-blue neutral "getting started" hero (not red/green).

**Four gate widgets** (tappable, expand inline via animated ChevronDown):
1. **Attendance** — worst-class-type % per subject; breach <75% / caution 75–80%; expand panel: per-subject sliders (what-if attendance simulator — live re-runs `computeEligibility`), amber verdict-diff banner.
2. **Formatives** — per-subject formative %; breach <60% / caution 60–65%; expand: phase-aware breakdown.
3. **Items & Cards** — Ring + weekly pace; caution-only (item pace 'behind'/'critical'); expand: item counts.
4. **Prof Window** — countdown to exam window + exam_status; ReadinessGrid (subject × component tap-to-cycle 5-state self-assessment) in expand.

**Supplementary two-track card** (only when `supp.active` AND not Phase-1 locked):
- PRIMARY track (current phase, eligibility label) ‖ SUPPLEMENTARY track (failed subjects + window countdown)
- Compact horizontal what-if timeline + "Open plan" → `/mbbs/supplementary`.

**Phase-1 lockout two-track replaced by single-track** when `supplementary.phase1_lockout=true` (full lockout, not dual-phase).

**Pass-probability projection card** (Pro `mbbs.pass_projection` — blurred preview when locked):
- Readiness index 0–100 + verdict badge (on_track/borderline/at_risk) + present-layer mini-bars + message + "Full breakdown →" `/mbbs/analytics`.

**"Today's one thing" focus card** — top-priority subject from `generateDailyPlan`; "Focus today →" writes `localStorage:studyrise:mbbs:focus:{date}` → navigates `/mbbs/today`.

**SR overdue banner** (when queue has overdue items): top-2 due reviews as mini cards with "Done ✓" → `completeSRHit(record, 'easy')` + optimistic removal.

**Exam-period banner** (prep / gap / window states) — "Open prep" → `/mbbs/exam-prep`.

**Swipeable subject cards row** (horizontal scroll, 128px/card): attendance bar (worst-type %, zone color), item count, subject name; tap → opens attendance gate expand.

**Today's Gate Protection Summary** (from `buildGateSummary`): attendance worst-subject + days-can-miss, item pace, formative standing — three plain lines naming the specific constraint.

**Behavior:** All hooks above the two early-return guards (Rules-of-Hooks safe). Interactive elements never drive the verdict — they only show what-ifs.

---

### Today (`/mbbs/today`)

**Purpose:** The daily command centre. Mirrors `UniToday` for MBBS — classes, gate protection, DayPlanner, study session log.

**Content (top to bottom):**
- **Hero clock** — live HH:MM:SS + current-block badge + total study time today.
- **Mobile prayer strip** (horizontal scroll) with all prayers + status.
- **Holiday banner** (soft-green, BookOpen) when ≥2 consecutive holidays within 1–4 days: "{N}-day break in {M} days — your best window before prof. Plan revision →" `/mbbs/exam-prep`.
- **Study gap banner** (soft-amber, Flame, dismissible) when ≥2 days since last `mbbs_study_log` entry.
- **Exam window focus banner** (during exam period window): auto-focuses next exam's subject, overrides manual focus.
- **"Preparing for" line** when `localStorage:studyrise:mbbs:focus:{date}` set from NextExamsWidget → `/mbbs/today`.
- **Classes strip** — today's timetable blocks (subject colour, isNow/isNext badge, one-tap attended/missed via `useMbbsAttendance`; attendance double-log guarded by `localStorage:studyrise:mbbs:att:{date}`).
- **"Plan your day"** start/end time inputs → generates blocks via `generateMbbsBlocks`.
- **DayPlanner** (`mbbsMode=true`): 50/10 + long-break-every-3 pattern; today's classes as fixed barriers; SR review block first (15-min purple, count = `reviewQueue.length`); gate-priority study blocks from `generateDailyPlan`; completed `mbbs:true` block → "Log this session?" prompt (Subject / session_type / duration / linked item / topic → `mbbs_study_log`); `onMbbsReview` → sequential SRModal over live queue.
- **Gate protection summary line** (from `buildGateSummary`).
- **Study sessions list** (rich log modal, delete).

**Behavior:** Blocks persist to `localStorage:studyrise:mbbs:blocks:{date}` (not `mbbs_study_log.blocks` — no blocks column on that table). `generateMbbsBlocks` is the third caller of the shared `blockGenerator.js` engine (alongside exam and USM); it does not fork the engine.

---

### Items & Cards (`/mbbs/items`)

**Purpose:** The Continuous Assessment Card digital twin — the central academic record for the student's prof eligibility.

**Two tabs:**

**Items tab:**
- Per-subject expandable groups with `"{pct}% topics"` coverage badge (green ≥80% / amber ≥40% / gray).
- Each item row: round cleared toggle (green check), item name + number (verbatim BMDC), status badge (pending/scheduled/cleared/failed), marks/max.
- `+ Add item` (free text, datalist from `getSubjectTopics` / `getCardTopics`).
- Tap item → `ItemDrawer` (full edit: topic_name, status, date_cleared, examiner, marks/max, exam_date, remarks, confidence; retries without `exam_date`/`remarks` on missing-column error so the rest always saves).
- **`ContextualQuestionPanel`** (Pro `mbbs.qb_surfacing`) in ItemDrawer: surfaces matching university questions for the item's topic; "completed learning these?" → mark studied + spawn SR.
- "Flag for review" modal → `useMbbsSR.createSR` (sourceType 'topic').

**Cards tab (CAC — Continuous Assessment Card digital twin):**
- Cards grouped by subject with subject-colour dot + name header.
- Each `CardCard` header: ring (cleared/total), card name, status badge, `"{studied}/{total} topics"` subtitle, chevron (click to expand; rotates 180°).
- Expanded card renders the **paper card as a real `<table>`** (`overflow-x:auto`, `min-width:560px`) with columns:
  - **Item · Full Marks · Marks Obtained · Date of Exam · Remarks/Signature · Grade**
  - `ItemAssessmentRow`: per-item inline-editable cells; persists on blur one field at a time via `updateItem`; live `<GradeBadge compact>` in Grade column from marks/max (`pctFor`).
- Card header shows: Next due item, amber pace note (caution-only), completion result badge, card-aggregate `<GradeBadge>` (credit-weighted mean of recorded item marks).
- Expanded body: **attendance line** (`attendance_in_card`/`attendance_out_of` inputs with ≥75/60 zone badge) + **Print** button + table + **"Add item"** + **card completion exam** (date + Pass/Fail toggle → `updateCard`) + **topic checklist** (tap-to-cycle: not_studied → studying → studied; SR offer on transition to 'studied').
- **PrintableCard** renders off-screen on print trigger → `window.print()` = PDF of the selected card (clean static table, no app chrome).
- **`cacAvailable=false` amber banner** when `mbbs_R01_card_assessment.sql` not yet run; marks/status/completion save without it.

**Behavior:** `TABS` constant uses `key` not `id` (required by Tabs2 component). Topic checklist stored in `mbbs_topic_completion` (UNIQUE per user/subject/topic_label); `coverageBySubject` available for analytics/projection.

---

### Attendance (`/mbbs/attendance`)

**Purpose:** Per-class-type attendance tracking; the first gate (binds on worst category).

**Content:**
- Header: "75% required in every class type — the gate binds on the lowest category."
- "Field placements →" contextual link (shown only for phases with field placement subjects).
- Per-subject sections: headline % badge = `subjectHeadlinePct` (minimum across all types with data for that subject).
- Each subject: per-class-type rows from `getClassTypes(phase, subject.name)` merged with any DB types already present; each shows classes_held / classes_attended / % / zone badge (red <75 / amber 75–79 / green ≥80).
- One-tap Attended/Missed buttons on today's date (BMDC class types; double-log guard via localStorage).
- **Back-fill on mount**: `backfillClassTypes(subjects, config)` upserts missing class-type rows at zero for all subjects (idempotent; `ignoreDuplicates:true`).
- No per-date log (attendance is counter-based; `mbbs_attendance` has UNIQUE(user, subject, class_type)).
- Gate line at top names the specific class type: e.g. "Physiology Lecture attendance 72% — below the 75% eligibility threshold."

**Behavior:** `Array.isArray(config?.holiday_prefs)` guard throughout (DB defaults `{}` not `[]` — crashes on `.includes()` if not guarded).

---

### Formatives (`/mbbs/formatives`)

**Purpose:** Track and compute the in-course (formative) mark — the second eligibility gate.

**Content:**

**Header card:** "Your in-course mark — ≥60% required to sit your prof." Soft-blue explainer: "Formative isn't a separate exam. It's carried into every written paper as 10%… {For 1st Prof: all three term exams are hard 60% gates, each must be passed independently}. Every result shows its BMDC grade."

**Term Results section (1st Prof only):** Auto-seeds term skeleton (`termsForPhase`) on first mount when table exists. Per-subject card with:
- Tap-to-edit per-term cells (`TermResultModal`: written/oral/practical marks per term).
- Computed formative /20 + floor note (floor = 12/20 from `bmdcFormativeMark`) + term-fail badge.
- Visible conversion math (band table + attendance component).
- Amber degrade banner when `mbbs_005_terms.sql` not yet run.

**IT signal card** (when `itSessions.available && integratedTarget > 0`): "Integrated Teaching Sessions N/T attended" + "Track sessions →" `/mbbs/integrated-teaching`.

**SubjectFormativeCard (per subject, phase-aware):** Headline = `subjectFormativePct` (resolution order: direct override → 1st-Prof BMDC term mark/20→% → weighted average). Shows:
- `<GradeBadge>` (e.g. "A- · 3.50").
- Source label: "recorded directly" / "from N term results + attendance" / "weighted average of N assessments".
- `EmbeddedLine`: "Carried into every written paper as 10% — that's X of 10 formative marks."
- Eligible/below-60 badge.
- **Direct-formative override** (`OverrideEditor`): % + note → saves to `mbbs_config.formative_overrides[subjectId]`; purple "Recorded" badge when set.
- **Marks needed** (phase-aware): weighted → `recoveryLine`; term → "N term(s) below 60% — each must be cleared (re-sit ≥60%)"; override → "recorded formative below the 60% gate."

**Weighted-average cards** (below term results for other phases): logged `FormativeRow`s with date, type, marks, weight, live accuracy badge.

---

### Timetable (`/mbbs/timetable`)

**Purpose:** Calendar-week navigation and class management; one-tap attendance.

**Content:**
- 7-column grid (Mon–Sun), navy header on today. No terms (calendar-based, not term-based).
- Holiday badge: public holidays from `BD_HOLIDAYS_2026` (red) → admin gov holidays from `mbbs_gov_holidays` (red) → student college holidays from `mbbs_config.holiday_prefs` (amber + Flag toggle per day).
- Class blocks: subject color, class type, time, location; Join link when `location_is_url`.
- **Today's cells**: Attended / Missed buttons per class → `useMbbsAttendance`.
- Attendance % per class-type row.
- Attendance Overview section below grid.
- Add/edit class form modal.
- **Export .ics** button → `downloadMbbsICS` (weekly classes as RRULE VEVENTs + prof schedule + exam window as DATE events; defensive string-month coercion).
- **College holiday toggle** per day: Flag icon (amber = set, gray-faint = not set) writes `mbbs_config.holiday_prefs` via `updateSettings`.

**Three holiday sources (priority order):** `BD_HOLIDAYS_2026` (static national) → `mbbs_gov_holidays` (admin DB) → `mbbs_config.holiday_prefs` (student college).

---

### Review (`/mbbs/review`)

**Purpose:** Unified SR queue for topic/item/mistake reviews.

**Content:**
- **Review Queue** (above subject cards): each card badged by type (Item=blue / Topic=purple / Mistake=amber), overdue/due chip + date, subject-colour bar, red-tinted when overdue.
  - Subject/topic "Review" → existing `SRModal` (topic SR works because `subject_name = topic_label`; `completeSRHit` finds it).
  - Mistake "Review" → inline reveal-the-rule → Still shaky / Got it → `scheduleMistakeReview`.
- Count badge "{n} due".
- **Compliance `Ring`** + next-7-days list.
- **Manual "Add topic"** affordance: free-text label + subject → `createSR` sourceType 'topic'.
- `EmptyState` when nothing due.

**Behavior:** `getReviewQueue({subjects})` returns items sorted by priority: overdue-first within each tier; enforces SR hit order (sr2 only surfaces once sr1_done; sr3 once sr2_done). `source_type NULL` = topic/item.

---

### Questions (`/mbbs/questions`) — flag OFF by default

**Purpose:** Log MCQ/SBA practice sessions; the Written component is SAQ ≈70% + MCQ ≈20%.

**Content:**
- **Migration amber banner** when `mbbs_005_questions.sql` not yet run (`available:false` from hook).
- Log form: mode segmented control (first/review/mixed) · subject incl. General/Mixed · free-text source · attempted/correct auto-capped · minutes · date · note · live accuracy badge (green ≥70 / amber 55–69 / red <55).
- 4 KPI tiles: this week / accuracy 7d / today / overall.
- 30-day accuracy Recharts LineChart (by subject).
- By-subject accuracy bars (weakest first, subject-color tokens via `getUnitColor`).
- Recent-sets list with delete.
- "Flag for review" modal → `useMbbsSR.createSR` (sourceType 'topic').

**Behavior:** Route exists and is lazy-imported regardless; the flag (`mbbs.questions`) controls whether it appears in nav and whether the route is included in `mbbsRoutes`. Data path (`mbbs_question_logs`) degrades gracefully pre-migration.

---

### Analytics (`/mbbs/analytics`)

**Purpose:** Data-driven picture of readiness. Seven analytical sections.

**Sections (top to bottom):**

1. **Pass-probability projection** (Pro `mbbs.pass_projection`; blurred preview when locked):
   - Verdict-coloured left border + badge (on_track/borderline/at_risk/insufficient_data).
   - Recharts `ComposedChart`: mock scatter + dashed regression line + confidence band Area + 60% pass `ReferenceLine`.
   - Honest "Not enough data" state when <2 dated model tests or no prof window.

2. **Study heatmap** — reuses exam `StudyHeatmap` with MBBS overrides: minutes-by-date from `mbbs_study_log`, thresholds `[60,120]`, labels `0 min/<1h/<2h/2h+`; window = `phase_start_date` → prof window.

3. **Study balance** — minutes by subject, horizontal Recharts `BarChart` with per-subject cell colours (via `getUnitColor`).

4. **Item/card pace** — cumulative cleared-items line + per-subject bars + cards complete count. (Clinical postings section omitted until R12.)

5. **Attendance by subject bars** + formative-trend line.

6. **Weak-area engine** (`rankMbbsWeakAreas`): per-subject composite weakness 0–100 from MCQ accuracy (40%, when flag on) + formative avg (25%) + model test accuracy (25%) + SR overdue load (10%); components without data drop out and weight redistributes. Listed weakest-first.

7. (Future) Clinical progress charts when postings land in R12.

**Behavior:** `rankMbbsWeakAreas` called with `questionLogs: mcqEnabled ? questionLogs : []` — MCQ flag off means MCQ contributes nothing by construction (D2/D7).

---

### Card Exams (`/mbbs/card-exams`)

**Purpose:** Build and record college-set card compilation exams (custom exams from a multi-subject card selection).

**Content:**
- Multi-select card picker grouped by subject (cross-subject allowed).
- Name + date the exam.
- Record result modal: pass/fail + marks.
- **Opt-in post-result actions**: log as formative (type `card_exam`) / advance card status / add items to SR queue (`createSR` 'item').
- Each card exam is an `mbbs_exam_events` row → flows into the NextExamsWidget and cockpit.

**Behavior:** Card layer in `useMbbsExamEvents` (createCardExam/setExamCardsFor/recordResult). Degrades gracefully when `mbbs_003_card_exams.sql` not yet run (`42P01/PGRST205`).

---

### Exam Schedule (`/mbbs/exam-schedule`)

**Purpose:** Declare the exam period and enter written + oral (SOE) dates.

**Content:**
- **Prep-status card**: "Declare you're in prep mode" / "Mark as done" / "Reset" buttons; exam_period state (none/prep/gap/window/done).
- **Send-up capture**: "Does your college hold a send-up?" → date + result → `mbbs_config.sendup`.
- **Written + viva date list** with overlap-blocking add modal (written/viva never share a day — `dateConflict` check; UNIQUE(user,subject,component,exam_date) allows Board I + Board II as two viva rows with different dates).
- **Two-board oral**: For subjects with `boards.count >= 2` (Anatomy, Physiology, Community Medicine), the add modal shows "Board I — {label}" / "Board II — {label}" buttons above the date picker; chosen sequence written to `mbbs_prof_schedule.sequence`.
- Schedule list rows show `<Badge2 variant="blue">Board I/II</Badge2>` chip when `sequence` is set.

**Behavior:** `mbbs_009_exam_period.sql` must be run; client degrades gracefully until then.

---

### Exam Prep (`/mbbs/exam-prep`) — contextual, Pro `mbbs.exam_period_planner`

**Purpose:** During the exam period window, focus one exam at a time and surface the per-board viva shortlist.

**Content:**
- State-aware: `none` → nudge to `/mbbs/exam-schedule`; `window` → **Focus now** card (current subject+component, run plan, viva bank surfacing incl. locked shortlist); `gap` → calm note.
- **Focus now card** (window state): current subject + component label + board label when `sequence` set; run plan (first-pass gaps / second-pass studying / revision studied + per-day target); topic board filter for viva (questions in `getBoards[sequence-1].topics`; falls back to full subject pool when filter returns nothing); "Study this today" → cockpit focus.
- **"After this" list**: upcoming exam dates ordered chronologically.
- **Per-subject run-up overview** (expandable): `buildSubjectRunPlan` per subject, ordered by nearest exam then lowest coverage.
- **Post-exam reflections**: Good/Okay/Not sure → `addReflection`; "Anything new asked?" (viva) → `addUserQuestion` + `requestPromote`.
- Footnote: "SR is separate →" `/mbbs/review`.

**Behavior:** `getExamFocus({schedule, today})` drives the focus; `MbbsToday` during window auto-focuses the current exam subject overriding manual focus.

---

### Integrated Teaching Tracker (`/mbbs/integrated-teaching`)

**Purpose:** Track BMDC-mandated IT sessions and generic medical humanities topics.

**Content:**
- Phase label header (e.g. "1st Professional — 12 IT sessions required").
- Amber degrade banner when `mbbs_R02_integrated_teaching.sql` not yet run.
- **IT Sessions section**: N numbered rows; attendance toggle (CheckCircle2/Circle); summary_submitted toggle; "N of T attended" progress bar.
- **Generic Topics section** (collapsible with ChevronDown): 16 topics (phase-specific from `getGenericTopics`); done/total badge; same toggle pattern.
- Empty state when both targets are 0 and available.

**Data:** Auto-seeds on first load if table exists and no rows exist — integrated: "IT Session 1…N"; generic_topic: each topic from `getGenericTopics(phase)`. Idempotent upsert `onConflict:'user_id,phase,kind,topic', ignoreDuplicates:true`.

**Integration:** Formatives screen shows a compact IT signal card referencing this screen when `integratedTarget > 0`.

**Tone:** Plain list-view; no streak mechanics, no anxiety framing.

---

### Field Placements (`/mbbs/field-placements`) — contextual, no nav entry

**Purpose:** Track COME and forensic field placements; these count toward the 75% attendance gate.

**Content:**
- Self-fetching (useUserSettings / useMbbsSubjects / useMbbsAttendance).
- Per-phase subjects with placements (Community Medicine COME 30 days, Forensic 16 days).
- Per placement: required-days badge, attendance bar (days attended / required), one-tap **Day done / Missed** (reuses `logAttended`/`logMissed` with `class_type = placement.label` → **counts toward the 75% worst-category gate**).
- **Report-deliverable checkbox** + optional due date → `mbbs_config.field_reports[{key,done,due_date}]`.
- "Days you can miss" line.
- **Report targets card** at top: dated, unsubmitted reports sorted by due date.
- Empty state for phases without field placements (1st Prof).

**Entry point:** Attendance screen shows a "Field placements →" contextual link card when any subject in the current phase has field placements.

**Behavior:** `Array.isArray(field_reports)` guard (DB defaults may be `{}`). Field days are BMDC-authoritative: COME = 30 (10 Day Visit + 10 RFST + 10 Study Tour), Forensic = 16 (10 mortuary + 6 court/lab).

---

### Supplementary (`/mbbs/supplementary`) — contextual, no nav entry

**Purpose:** The dual-phase track for students re-sitting one or more subjects; honest timeline, no guilt.

**Content:**

**Inactive:** calm `EmptyState` ("No supplementary to track").

**Active (free read-only section):**
- Re-sitting subject chips + supplementary window countdown badge.
- **"What if I fail?" vertical timeline**: now → supplementary window → result (~window+6wk) → prof window → 12-year BMDC completion window (`buildWhatIfTimeline` reads `mbbs_config.admission_date`).

**Phase-1 lockout** (when `supplementary.phase1_lockout=true`) — single-track view:
- Red "First Prof — repeat track" header + BMDC-rule explanation.
- Re-sitting subjects + revision plan per subject (topic chips + per-day target from `buildSupplementaryPlan`).
- Road-ahead timeline.
- No dual-phase combined view (2nd-Prof+ failure keeps the dual-phase path).

**Pro `mbbs.supplementary_planning` section (planning):**
- Per-subject revision plan: topic chips from `getSubjectTopics(name)` + per-day target paced across days-to-window.
- Combined daily view: Primary tasks | Supplementary revision (capped 1 topic per failed subject) — Sun/Mon icon + "Focus today →" cockpit link.

**Tone:** "You have two things to manage — here is what each needs." No exclamation marks, no urgency language.

**Entry point:** Dashboard two-track card "Open plan" → `/mbbs/supplementary`.

---

### Question Bank (`/mbbs/questions-bank`)

**Purpose:** Browse past professional questions (seeded global + private student entries).

**Content:**
- Scope filter chips: Mine / My University / All Verified.
- Subject + question-type (written/viva/practical) filter chips.
- Per-subject coverage bars (% of questions marked studied).
- Per-question: studied toggle + confidence chips (shaky/ok/strong); **Use in plan** (→ `mbbs_daily_tasks`); **Add to review** (studied → spawns SR via `createSR`); one-time legacy-string→id backfill of `mbbs_config.university`.
- Add private question modal + add private university modal.
- **`ContextualQuestionPanel`** (Pro `mbbs.qb_surfacing`) mounted in `ItemDrawer` (editing an existing item) — surfaces matching questions for the item's topic with "completed learning?" → mark studied + spawn SR.

**RLS scopes:** `mbbs_universities` + `mbbs_university_questions` (shared-read/admin-write); `mbbs_question_study_status` + `mbbs_user_questions` + `mbbs_user_universities` (owner-only).

---

### Viva Bank (`/mbbs/viva`)

**Purpose:** Community-driven SOE/oral question bank with admin verification + SR-feeding practice mode.

**Content:**
- Browse + scope chips (My College / My University / All Verified).
- Verified questions show origin label + "StudyRise Verified"; own questions show "Mine" + "Submit for verification".
- Per-question lock (star) for per-exam shortlist (`mbbs_viva_locked`).
- **Practice mode** (`PracticeRunner`): read → reveal → rate Easy/Medium/Hard/Blackout. Uses `getSubjectTopics` as the topic spine so every topic is covered even with zero questions. Hard/Blackout spawns an SR record (blackout sr1 in 3d / hard sr1 in 7d).
- Browse FREE; unlimited practice = Pro `mbbs.viva_practice_unlimited` (cap not enforced while subscription switch is off).

**Admin app:** Verification queue → improve answer → promote; verified pool edit/delete. Verified table stores `subject_ref` (name) set by admin on promotion.

**RLS scopes:** `mbbs_viva_questions_verified` (shared-read/admin-write); `mbbs_viva_questions_user` + `mbbs_viva_practice_log` + `mbbs_viva_locked` (owner-only).

---

### Review Sheet (`/mbbs/review-sheet`) — print

**Purpose:** Rapid-review sheet for printing before the prof; data from item notes.

**Content:**
- Self-fetching (`useMbbsItems`, `useMbbsSubjects`, `useUserSettings`).
- Every non-empty `mbbs_items.notes` grouped by subject (alphabetical) as a dense numbered serif list.
- Header: "Rapid-Review Sheet — {phase} Professional" + generated date + note/subject counts.
- Scoped `@media print` CSS hides app chrome (sidebar, nav, mobile tab bar) + sets A4 margins.
- `window.print()` = the PDF.
- Graceful empty state pointing at Items & Cards ("Add notes to items to populate this sheet").
- "Back" → `/mbbs`.

---

## §3.5 — Intelligence Layer

### Eligibility Engine (`src/lib/mbbs/eligibility.js`)

**`computeEligibility({subjects, attendance, formatives, items, cards, config, termResults?, today?})`**

Pure, testable, no network. Returns:
```
{
  status: 'eligible' | 'at_risk' | 'not_eligible' | 'phase1_locked',
  hasData: boolean,
  gates: {
    attendance: { state: 'ok'|'caution'|'breach'|'incomplete', subjects: [{subjectId,name,detail,worstType}] },
    formative:  { state: ..., subjects: [...] },
    items:      { state: ..., subjects: [...] },  // caution-only; never makes not_eligible alone
    cards:      { state: ..., subjects: [...] }   // caution-only
  },
  blockers: string[],
  atRisk: string[]
}
```

**Gate rules:**
- **Attendance**: breach <75% / caution 75–80%; binds on **worst class type per subject** (`subjectHeadlinePct`); `worstType` named in blocker string.
- **Formative**: breach <60% / caution 60–65%; **phase-aware** — 1st Prof WITH term results uses the term gate (any subject term <60% → breach); other phases use weighted average; direct override (`config.formative_overrides[subjectId].pct`) wins in the weighted path.
- **Items/cards**: caution-only — item pace 'behind'/'critical', card-exam within 14 days with items remaining. Never makes status `not_eligible`.
- **Supplementary active + previous prof unpassed**: → `not_eligible` (a gate blocker, separate from the above four).
- **Phase-1 lockout** (`config.supplementary.phase1_lockout = true`): short-circuits before any gate math → `status: 'phase1_locked'`, all gates 'incomplete'.
- `hasData = false` → all gates 'incomplete'; dashboard shows neutral "getting started" hero.

### Daily Plan Engine (`src/lib/mbbs/dailyPlan.js`)

**`generateDailyPlan({subjects, items, attendance, formatives, config, today, focusSubjectId?})`** → gate-priority task list (up to 6).

Priority order:
1. Attendance risk (worst-type % < 80% or falling) → "Attend {class type} today"
2. Formative risk (below 65% or term failing) → "Study for formative — {subject}"
3. Item pace critical/behind → "Work on {card items}"
4. `focusSubjectId` (from NextExamsWidget or exam-period auto-focus) → priority 0, guaranteed slot
5. General revision → "Revise {topic area}"
6. Past questions → "Practice past questions"

**Bugfix in production:** formative-risk branch reads `f.max_marks` (not `f.marks_max`).

### SR Engine (`src/hooks/mbbs/useMbbsSR.js`)

MBBS-specific SR on `mbbs_sr_records` (leaner than exam `sr_records` — single `last_rating` + `sr_hits`, no per-hit `*_rating`/`*_done_date`/`max_hits`/`completed_date`).

- **`createSR({subjectId, topicLabel, sourceType, sourceId, itemId, sr1Interval})`**: idempotent (matching item_id / source_id / subject_id+topic_label → no-op); degrades to minimal insert on `42703/PGRST204`.
- **`completeSRHit(record, rating)`**: advances sr1→sr2→sr3 in order; next due = `RATING_INTERVALS[rating] × {sr2:1.5|sr3:2.0}`, rounded; bumps `sr_hits` + `last_rating`.
- **`getReviewQueue({subjects})`**: current-hit-due records; overdue-first then by date; shaped `{key, recordId, type, hit, label, dueDate, overdue, subjectId, subjectName, subjectColor, topicLabel, record}`.
- **`getCompliance()`**: `{done, total, pct}`.
- **`currentHit(rec)`**: pure resolver for which hit is due.
- **Item-clear seam** (`ItemsCards`): marking item cleared → non-forced bottom-toast offer ("schedule a review?") → `createSR` sourceType 'item' (idempotent).

**SR-first cockpit seam:** `MbbsToday` feeds `srBlockCount = reviewQueue.length` into `generateMbbsBlocks`; the SR block shows a "Review" button on the DayPlanner block that opens sequential SRModal over the live queue.

### Pass-Probability Projection (`src/lib/mbbs/passProjection.js`)

**`computePassProjection({subjects, attendance, formatives, items, cards, termResults, topicCoverage, qbCoverage, srCompliance, sendup, config, flags, today})`**

Four layers (redistributed across those present):
| Layer | Default weight | Source |
|---|---|---|
| Gate readiness | 40% | Per-subject worst-type attendance + BMDC formative + item/card pace |
| Topic coverage | 25% | Topic completion % + QB coverage % per subject |
| Retention (SR) | 15% | `getCompliance().pct` |
| Send-up outcome | 20% | Normalized result from `config.supplementary` |

Returns: `{ status: 'on_track'|'borderline'|'at_risk'|'not_enough_data', overall (0–100), subjects, layers, message }`.

**Honest empty state** when <2 layers present. MCQ is **not** a layer — excluded by design (flag off → no contribution, D2/D7).

**Recalibrated in R9:** worst-category attendance → `bmdcFormativeMark(termResults, worstAtt)` (BMDC attendance component computed); 1st-Prof term-failing caps formative readiness at ≤15; card-completion pace added as gate signal alongside item pace.

### Gate Summary (`src/lib/mbbs/gateSummary.js`)

**`buildGateSummary({subjects, attendance, formatives, elig, itemTotals})`** — shared by Dashboard and Today; three plain gate-protection lines naming the specific worst class type in the attendance line.

**`computeItemTotals({items, subjects, weeks})`** — item pace by subject.

### Notifications (`src/lib/mbbs/mbbsNotifications.js`)

**Floor feature: never paywalled, never toggleable off system-wide.** ≤3 notifications/day.

| Type | Default | Trigger |
|---|---|---|
| `morning_digest` (priority 3) | ON | 8 AM — gate protection: attendance standing, SR due, classes today |
| `sr_due` (priority 2) | ON | 9 AM when reviews due/overdue |
| `attendance_warning` (priority 2) | ON | 10 AM when any subject <78% on any class type |
| `holiday_window` (priority 1) | ON | 8:30 AM when ≥2 consecutive holidays within 1–4 days |

Pure `computeMbbsNotifications(24h window, quiet hours, cap 3/day by priority)`. Self-fetching `scheduleMbbsNotifications(userId, settings)`. Called from App.jsx once per load in MBBS mode (`notifyRanRef`); `MbbsNotificationsTab` re-calls on every pref change.

**Attendance warning correctly calls `attendancePct(r.classes_attended||0, r.classes_held)` per row (not array+id), takes the minimum across class types.**

### ICS Export (`src/lib/mbbs/mbbsIcsExport.js`)

RFC 5545 client-side export. `buildMbbsICS({ classes, subjects, schedule, config })`:
- Weekly class VEVENTs (`RRULE:FREQ=WEEKLY;BYDAY={byday}`, anchored to nearest past occurrence from `phase_start_date`).
- Prof schedule VEVENTs (DATE-only).
- Exam window VEVENT (first-of-month).
- Defensive string-month coercion throughout.

Download from Timetable screen "Export .ics" button.

### BMDC Curriculum Constants (`src/lib/mbbs/mbbsBmdcCurriculum.js`)

**THE canonical BMDC 2021 structure.** Deep-frozen `MBBS_BMDC` keyed by phase id. Every MBBS feature reads from this module; nothing re-derives curriculum structure from the DB.

Key exports:
- **Selectors**: `getBmdcPhase`, `getBmdcSubjects(phase)`, `getBmdcCards(phase,subject)`, `getBmdcItems(phase,subject,card)`, `getClassTypes(phase,subject)`, `getBoards(phase,subject)`, `getTermCardMap(phase)`, `getItSessions(phase)`, `getGenericTopics(phase)`, `getFieldPlacements(phase,subject)`, `getBmdcSubjectTopics(name)`, `getBmdcCardTopics(name)`
- **GPA**: `gradeFor(pct)` → `{letter, gp, label}`; `MBBS_GPA_SCALE` (desc bands). `gradeFor(null)` = "Not graded" (NOT F — nullish check precedes numeric).
- **Constants**: `MBBS_ELIGIBILITY` (attendance 75 / formative 60 / pass 60 / completionYears 12 / examMonths [5,11]), `WRITTEN_COMPOSITION` (FA 10% / MCQ 20% / SAQ-SEQ 70%), `CARD_COLUMN_SHAPE`, `CLINICAL_POSTING_CARD_SHAPE`, `MBBS_BMDC_PHASE_IDS`.

**Backward-compatibility shim in `mbbsConstants.js`:** `getCardTopics` / `getSubjectTopics` prefer BMDC verbatim lists and fall back to the legacy `_CARD_TOPICS_MAP` for college-renamed / extra card names.

---

## §3.6 — Data Model

### `mbbs_config` (jsonb on `user_settings`)

```json
{
  "phase": "1st",
  "college": "Dhaka Medical College",
  "university": "<mbbs_universities.university_id>",
  "exam_window": { "month": 11, "year": 2026 },
  "phase_start_date": "2025-01-15",
  "admission_date": "2024-01-10",
  "exam_status": "upcoming",
  "supplementary": {
    "active": false,
    "subjects": [],
    "window": null,
    "phase1_lockout": false
  },
  "holiday_prefs": [],
  "field_reports": [],
  "sendup": { "has_sendup": true, "date": null, "result": null },
  "exam_period": { "state": "prep", "declared_at": null },
  "viva_filter_scope": "university",
  "formative_overrides": {}
}
```

**Critical rule:** Every jsonb field that could be `{}` or `[]` must use `Array.isArray()` guard, never `??`. DB defaults `mbbs_config.holiday_prefs` as `{}` — `.includes()` on `{}` crashes.

### Tables (all deployed, all RLS owner-only unless noted)

| Table | Key columns |
|---|---|
| `mbbs_subjects` | name, total_marks, color (palette key — never hex), sort_order |
| `mbbs_cards` | subject_id, name, status (`in_progress\|ready_for_exam\|exam_passed\|complete`), card_exam_date, card_exam_result, attendance_in_card, attendance_out_of (nullable, R4) |
| `mbbs_items` | subject_id, card_id, item_number, topic_name, status, date_cleared, examiner, marks, max_marks, notes, exam_date (nullable, R4), remarks (nullable, R4) |
| `mbbs_attendance` | subject_id, class_type, classes_held, classes_attended, est_total_for_phase; **UNIQUE(user,subject,class_type)** |
| `mbbs_formatives` | subject_id, type, date, marks_obtained, max_marks, weight, term_id (nullable, v2.0 S7) |
| `mbbs_classes` | subject_id, class_type (free text), day_of_week (0=Mon…6=Sun), start_time, end_time, location, location_is_url |
| `mbbs_readiness` | subject_id, component (`written\|viva\|practical\|clinical`), state; UNIQUE(user,subject,component) |
| `mbbs_study_log` | subject_id, item_id, duration_minutes, session_type, date (append-only) |
| `mbbs_daily_tasks` | subject_id, date, title, est_minutes, status, source |
| `mbbs_exam_events` | subject_id, card_id, type, title, date, scope_note, status, result, marks, max_marks |
| `mbbs_exam_event_cards` | exam_event_id FK cascade, card_id FK cascade |
| `mbbs_sr_records` | subject_id, topic_label, source_type, source_id, item_id, sr1/2/3_due, sr1/2/3_done, sr_hits, last_rating |
| `mbbs_question_logs` | subject_id?, source, attempted, correct, time_minutes?, mode, date (append-only) |
| `mbbs_terms` | term_number, name, phase, start/end_date, status, sort_order |
| `mbbs_term_results` | term_id FK, subject_id FK, written/oral/practical marks+max, passed_* flags, note; UNIQUE(user,term,subject) |
| `mbbs_topic_completion` | subject_id, card_id?, topic_label, status, confidence?, studied_at; UNIQUE(user,subject,topic_label) |
| `mbbs_prof_schedule` | subject_id, component, exam_date, sequence?, note; UNIQUE(user,subject,component,exam_date) → 2 viva rows/subject allowed |
| `mbbs_exam_reflections` | subject_id, component, felt, asked_new, date |
| `mbbs_it_sessions` | phase, kind (`integrated\|generic_topic`), topic, attended, summary_submitted, date?, note; UNIQUE(user,phase,kind,topic) |
| `mbbs_viva_questions_verified` | subject_ref, question, answer, difficulty, origin_college, origin_university_id, verified_by; **shared-read/admin-write** |
| `mbbs_viva_questions_user` | subject_id, question, answer, difficulty, promote_requested, origin_college, origin_university_id |
| `mbbs_viva_practice_log` | question_id?, topic, rating, date (append-only) |
| `mbbs_viva_locked` | question_id, subject_id (per-exam shortlist) |
| `mbbs_universities` | university_name, location; **shared-read/admin-write** |
| `mbbs_university_questions` | university_id, subject_ref, q_type, year, question, answer, verified; **shared-read/admin-write** |
| `mbbs_question_study_status` | question_id, studied, confidence |
| `mbbs_user_questions` | subject_id, q_type, year, question, answer (student-private) |
| `mbbs_user_universities` | university_id (student's followed universities) |
| `mbbs_gov_holidays` | date, name, year; **shared-read (authenticated); INSERT/UPDATE/DELETE = admin service role** |

### Migrations

> **Scope:** This table covers MBBS-specific and shared-infra (`core_*`) migrations only. For USM migrations see CLAUDE.md §usm_00N; for exam/auth/admin migrations (`exam_improvements_001`, `auth_security_001`, `admin_001`/`002`) see CLAUDE.md §migrations/.
>
> **Status legend:** There is no CI migration runner — every `.sql` is pasted into the Supabase SQL Editor by hand. **`RUN`** = already applied to the production Supabase instance. **`Run manually`** = file shipped, not yet confirmed applied to prod.

| Migration | Status | Effect |
|---|---|---|
| `mbbs_001_foundation.sql` | RUN | 10 foundation tables + `mbbs_config` on `user_settings` |
| `mbbs_002_exam_prep.sql` | RUN | `mbbs_exam_events`, `mbbs_sr_records`, `mbbs_question_logs`, + orphan mistakes/mocks (unread) |
| `mbbs_003_card_exams.sql` | RUN | `mbbs_exam_event_cards` + result cols on `mbbs_exam_events` |
| `mbbs_004_questions_restore.sql` | RUN | Ensures `mbbs_question_logs` exists (no-op if `mbbs_005` already ran); idempotent |
| `mbbs_005_questions.sql` | Run manually | `mbbs_question_logs` idempotent restore; client degrades pre-run |
| `mbbs_005_terms.sql` | Run manually | `mbbs_terms`, `mbbs_term_results`; nullable `term_id` on cards/formatives |
| `mbbs_006_topic_completion.sql` | Run manually | `mbbs_topic_completion` |
| `mbbs_007_viva_bank.sql` | Run manually | `mbbs_viva_questions_verified` (shared-read) + user viva tables |
| `mbbs_008_question_bank.sql` | Run manually | `mbbs_universities` (shared-read) + `mbbs_university_questions` (shared-read) + owner QB tables |
| `mbbs_009_exam_period.sql` | Run manually | `mbbs_prof_schedule` + `mbbs_exam_reflections` |
| `mbbs_010_holidays.sql` | Run manually | `mbbs_gov_holidays` (shared-read) |
| `core_feature_flags.sql` | Run manually | `app_feature_flags` (shared-read/admin-write); MBBS feature flag registry |
| `mbbs_R01_card_assessment.sql` | Run manually | Nullable `exam_date`/`remarks` on `mbbs_items`; nullable `attendance_in_card`/`attendance_out_of` on `mbbs_cards` |
| `mbbs_R02_integrated_teaching.sql` | Run manually | `mbbs_it_sessions` |
| `mbbs_R03_term_unique.sql` | Run manually — verify | `UNIQUE(user_id, phase, term_number)` on `mbbs_terms` + a one-time de-dup DELETE (the single non-additive migration — see the Rule note below) |

**Rule:** Every migration is additive + idempotent (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`). Never a destructive change to a shipped table. Client degrades gracefully on `42703 / PGRST204 / 42P01 / PGRST205` until each migration is run. **Exception:** `mbbs_R03_term_unique.sql` runs a one-time de-dup `DELETE` before adding its unique constraint — the single non-additive migration; run once.

---

## §3.7 — Free vs Pro Gate Matrix

> Everything is FREE until admin flips `subscription_activated` in the Admin Panel.
> The ethical floor features are locked free AND always on in code — the DB `reject_floor_flag_mutation()` trigger blocks any change to `is_floor=true` rows.

### Ethical Floor (locked free + always on — cannot be gated)

| Feature | Flag key |
|---|---|
| Dashboard (eligibility verdict + 4 gate widgets) | `mbbs.dashboard` |
| Daily study cockpit (Today) | `mbbs.today` |
| Timetable | `mbbs.timetable` |
| Attendance tracking | `mbbs.attendance` |
| Rapid-Review Sheet (print from item notes) | `mbbs.review_sheet` |
| Notifications (morning gate digest, SR-due, attendance-warning, holiday-window) | — (floor by design, not in flag registry) |

### Free (on by default, admin-toggleable)

| Feature | Flag key |
|---|---|
| Items & Cards (CAC digital twin, topic checklist) | `mbbs.items` |
| Card Exams builder | `mbbs.card_exams` |
| Formatives tracker (term model + direct override + GPA display) | `mbbs.formatives` |
| SR Review queue + manual topic add | `mbbs.review` |
| Topic-by-topic completion checklist | `mbbs.topic_completion` |
| Integrated Teaching tracker + generic topics | `mbbs.integrated_teaching` |
| Field placements (COME + forensic) | `mbbs.field_placements` |
| Supplementary track (read-only what-if timeline + lockout view) | `mbbs.supplementary` |
| Question Bank (browse seeded + private questions) | `mbbs.question_bank` |
| Admin/gov holidays calendar | `mbbs.holidays` |
| Viva Bank (browse only) | `mbbs.viva` (registered, not yet wired as gate) |
| Analytics (basic charts: study heatmap, balance, attendance, weak areas) | `mbbs.analytics` |
| Exam Schedule (exam-period declaration, written + viva dates) | `mbbs.exam_period` |

### Free, **OFF by default**

| Feature | Flag key | Note |
|---|---|---|
| MCQ/SBA logging + Questions screen | `mbbs.questions` | Built; MCQ contributes nothing to analytics/projection while off |

### Pro

| Feature | Flag key |
|---|---|
| Pass-probability projection (dashboard card) | `mbbs.pass_projection` |
| Full analytics suite (projection section in Analytics) | `mbbs.analytics_full` |
| Contextual QB surfacing in ItemDrawer | `mbbs.qb_surfacing` |
| Unlimited viva practice (cap otherwise) | `mbbs.viva_practice_unlimited` |
| Full supplementary revision plan + combined daily | `mbbs.supplementary_planning` |
| Exam Prep screen (during-exam focus + per-board viva) | `mbbs.exam_period_planner` |

### Registered (not yet wired to UI)

| Feature | Flag key | When |
|---|---|---|
| SR Lite vs Full split | `mbbs.review_full` | Future polish |
| OSPE station tracker | `mbbs.ospe` | R10+ |
| Custom exam builder (advanced) | `mbbs.custom_exams` | R10+ |
| Clinical posting cards + logbook | `mbbs.postings` | R10+ |
| Case log + procedures | `mbbs.case_log` | R10+ |
| Resource library | `mbbs.resources` | R10+ |
| Internship rotation tracker | `mbbs.internship` | R10+ |

---

## §3.8 — Onboarding Flow (MBBS Path)

**`MbbsOnboarding.jsx`** — 6-step wizard with slide transitions, `OnboardingShell`, single sequential save (user_settings flip LAST), BuildingPlan cinematic → `/mbbs`.

- **Step 0 — Mode Select** (`ModeSelect.jsx`): all new users; three cards: "Exam Prep" / "University Student" / "MBBS Bangladesh". Writes `app_mode = 'mbbs_bd'`.

- **Step 1 — Phase** (`MbbsStepPhase.jsx`): pick 1st / 2nd / 3rd / Final Professional.

- **Step 2 — College & Exam Window** (`MbbsStepCollege.jsx`): college name free text; university select from `mbbs_universities` DB (falls back to `MBBS_UNIVERSITIES` constants pre-migration); prof exam window (month/year — stored as 1-indexed number; string months handled defensively in `examWindow.js` and `MbbsDashboard.jsx`); "Does your college hold a send-up?" → `sendup.has_sendup`; writes `admission_date` (for 12-year window).

- **Step 3 — Subjects & Cards** (`MbbsStepSubjects.jsx`): real BMDC cards + core items pre-loaded from `mbbsBmdcCurriculum.js` per subject; **3-level nested editor** (subject → cards → items). Each level editable: card name inline, item toggle (cleared = past progress), item name inline, max-marks input (64px; BMDC default 10). Subject row: name / marks / 12-colour dot picker / `items_confidence` + `cards_confidence` labels (green = `national_confirmed`, amber = others). "Use the defaults — set up later" → seeds BMDC structure silently. `subjectsStepValid` checks subject names only.

- **Step 4 — Timetable** (`MbbsStepTimetable.jsx`): seed BMDC class types per subject (Lecture/Tutorial/Practical/Integrated Teaching + clinical/field where relevant). Skippable.

- **Step 5 — Supplementary** (`MbbsStepSupplementary.jsx`): conditional on selecting a prior-phase failure in Step 1. Failed subject names + supplementary exam window + send-up.

- **Step 6 — Finishing**: save + BuildingPlan cinematic → `/mbbs`.

**Save order (one async function, sequential):**
1. `mbbs_subjects` (capture id map by row index)
2. `mbbs_cards` (BMDC objects; insert `card.name`, `sort_order = ci`)
3. `mbbs_items` (verbatim BMDC items per card; `item_number`, `max_marks`, `topic_name` = verbatim item text; `status`/`date_cleared` from `cleared` flag — **real BMDC structure**, not round-robin count)
4. `mbbs_attendance` rows per subject × BMDC class type (from `getClassTypes(phase, name)`) at zero, idempotent upsert (so R2 per-class-type gate works from day one)
5. `mbbs_readiness` (subject × component; clinical only for Final Prof)
6. `mbbs_classes`
7. `user_settings` upsert (`app_mode:'mbbs_bd'`, `onboarding_complete:true`, full `mbbs_config`) — **LAST**

Failure before the upsert leaves the student in the wizard for retry. A mid-setup refresh (app_mode already `'mbbs_bd'`, `onboarding_complete` still `false`) resumes the wizard at Step 1 (local state only — accepted MVP).

---

## §3.9 — Key Supporting Libraries

| File | Purpose |
|------|---------|
| `appMode.js` | `getAppMode(settings)` → `'mbbs'` when `app_mode === 'mbbs_bd'` |
| `mbbsBmdcCurriculum.js` | THE canonical BMDC 2021 spine — all cards/items/marks/class-types/boards/IT/field placements/GPA |
| `mbbsConstants.js` | Onboarding seed shape (`subjectsForPhase` re-points onto curriculum); `MBBS_PHASES`, `MBBS_COMPONENTS`, `MBBS_UNIVERSITIES`, `MONTHS`; `getCardTopics`/`getSubjectTopics` with BMDC-preferred + legacy fallback |
| `eligibility.js` | `computeEligibility` (pure); `eligibilityVerdict`; `STATUS_STYLE`; `GATE_STYLE` |
| `gateSummary.js` | `buildGateSummary`, `computeItemTotals` (shared by Dashboard + Today) |
| `dailyPlan.js` | `generateDailyPlan` (gate-priority, 6 tasks max, `focusSubjectId` param) |
| `examWindow.js` | `getExamWindowInfo`, `getExamPeriodState`, `windowToDate`, `daysToWindow`, `countdownLabel`, `windowUrgency`; defensive string-month coercion |
| `formativeHelpers.js` | `bmdcFormativeMark`, `termResultPct`, `subjectFormativePct`, `embeddedContribution`, `WRITTEN_FORMATIVE_PCT` |
| `attendanceHelpers.js` | `CLASS_TYPES` (BMDC full names + legacy short keys), `subjectHeadlinePct` (minimum across class types) |
| `upcomingExams.js` | `getUpcomingExams` (card exam_date + formatives + prof schedule + exam window); `examTypeMeta`, `countdown` |
| `passProjection.js` | `computePassProjection` (4-layer index 0–100); `PROJECTION_STYLE` |
| `supplementaryPlan.js` | `buildWhatIfTimeline` (12-yr window), `buildSupplementaryPlan`, `buildCombinedDaily`, `getSupplementaryState`, `supplementaryWindowInfo` |
| `prePropPlan.js` | `getExamFocus`, `buildSubjectRunPlan`, `buildPrePropPlan` |
| `analytics.js` | `projectMbbsReadiness` (exam regression ported to model tests), `rankMbbsWeakAreas` (composite weakness 0–100) |
| `mbbsNotifications.js` | `computeMbbsNotifications`, `scheduleMbbsNotifications`; floor feature, ≤3/day |
| `mbbsIcsExport.js` | `buildMbbsICS`, `downloadMbbsICS` (RFC 5545) |
| `mbbsFeatures.js` | `MBBS_FEATURE_FLAGS`, `MBBS_FEATURE_DEFAULTS`, `MBBS_ROUTE_FLAG` |
| `bdHolidays.js` | `BD_HOLIDAYS_2026` (15 national holidays); `getHoliday(date, collegeExtras, govHolidays)`, `isHoliday` — 3-source priority |
| `srService.js` | `createMbbsTopicSR` (stateless idempotent DB insert; degrades on `42703/PGRST204`/`23505`) |
| `uniGates.js` | Extended with MBBS Pro gate entries in `GATE_COPY`; `configureGates` accepts optional `registry` map from `useFeatureRegistry` |

---

## §3.10 — Visual & UX Conventions (MBBS-specific)

- **No hex colors**: `mbbs_subjects.color` stores a palette key (e.g. `'red'`); resolved via `getUnitColor(key).token` → `var(--uni-*)`.
- **No gamification**: No streaks, no guilt mechanics, no progress percentages shown as "failure" to a high-stress population. Honest when data is sparse.
- **Seeded content always editable**: BMDC structure pre-loads the truth; student can rename/add/remove cards and items to match their college's variations.
- **No broken Exam/USM**: Every MBBS hook, screen, and lib is MBBS-only. Exam/USM users download zero MBBS code. No lazy-import bundle spillover.
- **375px floor**: All MBBS screens tested at 375px viewport (CAC table uses `overflow-x:auto` + `min-width:560px`; subject cards scroll horizontally).
- **No exclamation marks**: "You're progressing." not "You're progressing!". Tone is clinical-professional, never cheerleader.
- **`Array.isArray()` guard everywhere**: Any jsonb field that could default as `{}` in the DB (holiday_prefs, field_reports, supplementary.subjects) must be guarded with `Array.isArray()` before calling `.includes()`, `.length`, etc. Never `?? []`.
- **Defensive string-month coercion**: `exam_window.month` must be stored as a 1-indexed number; `examWindow.js` and `MbbsDashboard.jsx` coerce string months via `MONTHS.indexOf()` for any old DB rows.
- **Rules-of-Hooks order**: All hooks must appear above early returns (`if (loading) return` / `if (subjects.length === 0) return`). The v2.0 S14 bug (hooks after early returns) was fixed; do not re-introduce.

---

## §3.11 — What Is NOT Built Yet (MBBS Deferred — R10+)

| Feature | Description | Migration | When |
|---|---|---|---|
| Clinical posting cards | BMDC clinical card digital twin (§4.9): required Observed/Assisted/Performed case counts per posting (Medicine/Surgery/O&G); `mbbs_clinical_postings` + `mbbs_posting_items` + nullable `posting_id` on `mbbs_exam_events` | `mbbs_R03_postings.sql` | R10 |
| Clinical case log + procedures | Per-case/procedure privacy system + OSPE stations | `mbbs_R04_cases.sql`, `mbbs_R05_ospe.sql` | R11 |
| Resource library | Study resource links/notes per subject | `mbbs_R06_resources.sql` | R12 |
| Internship rotation tracker | 1-yr rotatory internship (Medicine 19wk / Surgery 19wk / O&G 14wk); join within 1 month of Final-Prof pass; complete within 2 years; 11mo college hospital + 1mo UHC; logbook tasks | `mbbs_R07_internship.sql` | R13 |
| bKash/Nagad payments for MBBS Pro | Bangladesh mobile payment for subscription | Separate workstream | Separate plan |
| App-wide dark mode for MBBS screens | Dark tokens in tokens.css exist; full MBBS pass is a whole-session effort | — | Phase 3 |
| Native iOS/Android for MBBS | Web-first validates product | — | Phase 3 |
| Hosted outbound iCal feed URL | `.ics` download ships; live URL = Phase 3 | — | Phase 3 |
| Canvas/LMS integration for MBBS | BMDC timetable is non-digital; not applicable in the same way as USM | — | Maybe never |
| Badges / points / leaderboards | Research shows harm to intrinsic motivation; especially harmful for BMDC exam stress | — | Never |


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
