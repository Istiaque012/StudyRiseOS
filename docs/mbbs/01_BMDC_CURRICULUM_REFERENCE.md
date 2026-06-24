# BMDC MBBS Curriculum 2021 — Reference & Seed Authority

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. The full BMDC MBBS Curriculum 2021 distilled into the canonical facts the app must mirror. This is the correctness authority (what is true) and the seed-data authority (what to pre-load). Source: `BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md` — keep that file in the repo so the R0 seed session can read verbatim item text from it._

> **Rule of authority:** where this file and any older note disagree, **this file wins** — it is transcribed directly from the BMDC 2021 document. Where the app and this file disagree, the app is wrong.

---

## 0. The mental model (read this first)

The entire BMDC system is **card-based**, and a StudyRise screen should map one-to-one onto the paper artefacts:

- A **professional phase** contains **subjects**.
- A **subject** is taught across **terms** and is divided into **cards** (BMDC-defined, subject-specific).
- A **card** contains **items** (BMDC-defined units of dissection / system / topic / clinical competency).
- Each **item** is examined (item exam: oral + practical), carries marks (typically 10), and is signed off by a teacher.
- A **card completion exam** closes a card.
- A **term-ending exam** (written + oral + practical) closes a term; **all terms must be passed** before the professional exam.
- The **professional (summative) exam** has components — Written, Structured Oral (SOE / viva, usually 2 boards), Practical/OSPE, and Clinical (final prof only) — each passed **separately** at 60%.

The physical **Continuous Assessment Card** the student carries has these columns: **Item name · Full Marks · Marks Obtained · Date of exam · Remarks/Signature**, plus an **attendance record** per class type. The app's Card view must mirror exactly this.

---

## 1. Phases, subjects, durations, marks (BMDC Table 2, 14–17)

| Phase | Duration | Subjects | Prof exam | Total marks |
|---|---|---|---|---|
| **1st Professional** | 1½ yr | Anatomy · Physiology · Biochemistry | First Prof MBBS | **1,300** |
| **2nd Professional** | 1 yr | Pharmacology & Therapeutics · Forensic Medicine & Toxicology | Second Prof MBBS | **600** |
| **3rd Professional** | 1 yr | Community Medicine & Public Health · Pathology · Microbiology | Third Prof MBBS | **900** |
| **Final Professional** | 1½ yr | Medicine & Allied · Surgery & Allied · Obstetrics & Gynaecology | Final Prof MBBS | **1,500** |

**Carry-of-subjects taught early (formative only, examined later):**
- In 2nd phase, *lecture/clinical/formative only* run for: General Pathology, General Microbiology, Medicine & Allied, Surgery & Allied (their prof exams come later).
- In 3rd phase, *formative only* run for: Medicine & Allied, Surgery & Allied, Obstetrics & Gynaecology.

### Per-subject professional exam mark tables (exact)

**First Professional (Table 14) — total 1,300**

| Subject | Written | SOE (viva) | Practical | Formative | Total |
|---|---|---|---|---|---|
| Anatomy | 180 | 150 | 150 | 20 | **500** |
| Physiology | 180 | 100 | 100 | 20 | **400** |
| Biochemistry | 180 | 100 | 100 | 20 | **400** |

> **Important nuance:** in the per-subject detail tables, the **formative 20 is counted *inside* the written total** (each written paper = 10 formative + 20 MCQ + 70 SAQ/SEQ = 100; two papers = 200; Table 14 reports written as 180 + formative 20 separately). Net subject total is unchanged. The app models formative as **10% embedded in each written paper**, not a separate sit-down exam. See §5.

**Second Professional (Table 15) — total 600**

| Subject | Written | SOE | Practical | Formative | Total |
|---|---|---|---|---|---|
| Pharmacology & Therapeutics | 90 | 100 | 100 | 10 | **300** |
| Forensic Medicine & Toxicology | 90 | 100 | 100 | 10 | **300** |

**Third Professional (Table 16) — total 900**

| Subject | Written | SOE | Practical | Formative | Total |
|---|---|---|---|---|---|
| Community Medicine & Public Health | 90 | 100 | 100 | 10 | **300** |
| Pathology | 90 | 100 | 100 | 10 | **300** |
| Microbiology | 90 | 100 | 100 | 10 | **300** |

**Final Professional (Table 17) — total 1,500**

| Subject | Written | SOE | Clinical | Practical | Formative | Total |
|---|---|---|---|---|---|---|
| Medicine & Allied | 180 | 100 | 100 | 100 | 20 | **500** |
| Surgery & Allied | 180 | 100 | 100 | 100 | 20 | **500** |
| Obstetrics & Gynaecology | 180 | 100 | 100 | 100 | 20 | **500** |

> Written 180 + formative 20 are again reported together in detail tables (formative embedded in the written papers). Clinical = long case + short cases.

---

## 2. The pass / eligibility rules (BMDC §Eligibility, §Pass Marks, §Common Rules) — VERBATIM-FAITHFUL

These are **BMDC-mandated and non-configurable**. The eligibility engine must enforce them exactly.

**To be eligible to sit a professional exam, the student must:**
1. Hold ≥ **75% attendance in all classes** (theory, practical, tutorial, residential field practice, clinical placement) during the phase — certified by the head of department.
2. Obtain ≥ **60% marks in formative examinations**.
3. Have **passed all subjects of the previous professional exam** (no progression otherwise).
4. **(Phase 1 only)** Pass **all term exams** before sitting the First Professional.

**Pass mark = 60%.** The student must pass **written (MCQ + SAQ + SEQ + formative), oral (SOE), practical, and clinical separately** — passing one does not offset a fail in another.

**Grading / GPA (BMDC Table 13) — show this on every result:**

| Numerical | Letter | Grade Point |
|---|---|---|
| 80% and above | A+ | 4.00 |
| 75% – <80% | A | 3.75 |
| 70% – <75% | A− | 3.50 |
| 65% – <70% | B+ | 3.25 |
| 60% – <65% | B | 3.00 |
| < 60% | F | 0.00 |

> **Honours** corresponds to letter grade **A (≥75%)**, not 85%. The v2.0 spec's 85% honours threshold is **wrong** and must be corrected (R1). The word "Honours" does not appear in BMDC 2021; the A-grade band is the canonical "distinction" line.

**The Phase-1 lockout (the strictest rule, BMDC Common Rules):**
> "If any student fail any subject of first phase in the first professional examination he/she will not be able to continue clinical and other classes of second phase before passing first professional examination."

So a **1st-Prof failure = full lockout** from Phase 2 — the student does *not* get the dual-phase concurrent track. From 2nd Prof onward the rule relaxes: *"In the mean time students can attend clinical ward placement, teaching learning"* while awaiting results or re-sit. The app must present these two cases differently (R1, and the supplementary screen).

**The 12-year completion window (BMDC Special note):**
> "After taking admission into the first year of MBBS course, a student must complete the whole MBBS course (pass the final professional MBBS examination) within 12 years timeline."

This bounds the "What if I fail?" timeline — the horizon is finite, stated plainly, never as a threat.

**Exam cycle:** Professional exams begin in **May and November** (they drift; the app models a target month+year window, not a hard date).

---

## 3. Assessment mechanics (BMDC §Assessment) — how marks are built

- **In-course / formative assessment** = results of **items + card + term-ending exams**, weightage from **integrated teaching**, and **class attendance**.
- **Written paper composition** (every paper, every subject):
  - **Formative 10%** (embedded — this is the in-course formative mark carried into the paper).
  - **MCQ 20%** — 20 marks, of which **50% SBA** (single best answer) + **50% MTF** (multiple true/false); separate answer script.
  - **SAQ + SEQ 70%** — of the 70, roughly **75% SAQ + 25% SEQ**.
- **Oral** = **Structured Oral Examination (SOE)** — topic-fixed (not fixed questions), rating-scale marked, every student asked across all topics of the set. Most science subjects run **2 boards** on separate days (e.g. Anatomy Board I & II; Physiology Board I = 50 + Board II = 50).
- **Practical** = OSPE/OSCE + traditional practical + practical note book (and, where applicable, field reports).
- **Clinical** (final prof) = long case + short cases, with X-ray/ECG/lab-data/photograph interpretation marks built into the oral boards.
- **Integrated-teaching attendance carries marks** into the practical component (e.g. 10 marks in Phase II and Phase IV practical come from IT attendance + a written summary). See §7.

---

## 4. THE CARD + ITEM STRUCTURE PER SUBJECT (the seed authority)

This is what R0 seeds and R3 pre-loads at onboarding. **Card names and the item lists below are BMDC-defined.** Item counts a college adds locally are configurable; the BMDC core is fixed. Where an item list is long, the R0 session must transcribe the verbatim item text from the curriculum file at the cited table — the structure (how many cards, their names, item counts) is given here in full.

### 4.1 — ANATOMY (1st Prof) · 9 cards · two card systems

**A. Regional Anatomy (dissection) cards — 6** (each card = N dissection items, item exam = oral + practical):

| Card | Items | Source table |
|---|---|---|
| Thorax | 8 | Table 57 |
| Superior Extremity | 10 | Table 60 |
| Abdomen | 16 | Table 63 |
| Inferior Extremity | 10 | Table 66 |
| Head & Neck | (see Table 69) | Table 69 |
| Central Nervous System & Eyeball | (see Table 72) | Table 72 |

Example — **Thorax card** items (verbatim, Table 57): 1. Thoracic wall, intercostal space, thoracic cavity and mediastinum · 2. Bones and joints of the thorax · 3. Heart with pericardium · 4. Lung, pleura, trachea and bronchial tree · 5. The Diaphragm & oesophagus · 6. Blood vessels, nerves and lymphatics of the thorax · 7. Living Anatomy · 8. Anatomy of Radiology & Images.

Example — **Superior Extremity card** items (verbatim, Table 60): 1. Bones and introduction to the joints of the superior extremity · 2. Pectoral region with mammary gland · 3. Axilla · 4. Superficial dissection of the upper limb, back and scapular region · 5. Front of the arm, forearm & palm · 6. Back of the arm, forearm & dorsum of the hand · 7. Blood vessels, nerves and lymphatics of the superior extremity · 8. Shoulder joint, AC joint, elbow joint, wrist joint, joints of hand · 9. Living Anatomy · 10. Anatomy of Radiology & Images.

> R0 transcribes the remaining cards' items (Abdomen 16, Inferior Extremity 10, Head & Neck, CNS & Eyeball) verbatim from Tables 63 / 66 / 69 / 72.

**B. Cell Biology & Histology cards — 3** (microscopy item cards, Tables 47–49):

| Card | Theme |
|---|---|
| Histology Card I | Microscope, tissue prep, cell division, epithelium, connective, muscular, nervous tissue |
| Histology Card II | Organ systems on slide: respiratory, CVS, digestive + glands, urinary, male & female reproductive |
| Histology Card III | Lymphatic, salivary glands, nervous system, endocrine, special sense organs, skin |

**Term ↔ card mapping (BMDC-defined, non-configurable — Table 54/55):**
- **Term I:** Thorax · Superior Extremity · Histology Card I
- **Term II:** Abdomen · Inferior Extremity · Histology Card II
- **Term III:** Head & Neck · CNS & Eyeball · Histology Card III

**Anatomy professional exam (Table 51):** Written 180 (Paper I + II, each MCQ 20 + SAQ/SEQ 70) · SOE 150 (Board I 75 + Board II 75, sat on separate days) · Practical 150 (OSPE/Dissection, Living Anatomy, Anatomy of Radiology, Lucky Slides, Practical Khata) · Formative 20 · **Total 500.**
- **Board I topics:** CNS & Eyeball, Head & Neck, Thorax (+ their histology, embryology) · General: Cell biology & Genetics, Epithelial & Nervous tissue, Angiology, Neurology.
- **Board II topics:** Abdomen, Inferior & Superior Extremity (+ histology, embryology) · General: Embryology, Connective & Muscle tissue, Osteology, Arthrology, Myology.

### 4.2 — PHYSIOLOGY (1st Prof) · 8 cards · by system (Tables 104–onwards)

| Card | Theme | Items (count) |
|---|---|---|
| Card 1 | Cellular Physiology & Blood | 10 |
| Card 2 | Cardiovascular Physiology | 6 |
| Card 3 | Respiratory Physiology | (Table) |
| Card 4 | Gastrointestinal & Renal Physiology | (Table) |
| Card 5 | Endocrine Physiology | (Table) |
| Card 6 | Physiology of Reproduction | (Table) |
| Card 7 | Neurophysiology & Special Senses | (Table) |
| Card 8 | Physiology Practical | (Table) |

Example — **Card 1 (Cellular Physiology & Blood)** items (verbatim, Table 104): 1. Definition, goal & importance of physiology; Homeostasis · 2. The cell: functions of cell membrane & organelles · 3. Cell membrane transport; intercellular communication · 4. Membrane potential; resting & action potential; propagation · 5. Neuromuscular junction; muscle contraction & relaxation · 6. Composition & functions of blood; plasma proteins · 7. RBC, haemoglobin, RBC indices, anaemia, polycythaemia, jaundice · 8. WBC classification, count, functions · 9. Platelets, haemostasis, coagulation, bleeding disorders · 10. Blood grouping (ABO & Rh), transfusion hazards.

> Each Physiology item = **10 marks**. R0 transcribes Cards 3–8 items verbatim from the curriculum's Continuous Assessment Card tables.

**Physiology professional exam (Table 100):** Written 200 (Paper I + II, each formative 10 + MCQ 20 + SAQ 70) · Practical 100 (OSPE 40 + traditional 50 + note book 10) · SOE 100 (Board I 50 + Board II 50) · **Total 400.**
- Paper I: Cellular, Blood, Cardiovascular, Respiratory, GI.
- Paper II: Renal, Endocrine & Reproduction, Neurophysiology & temperature, Special senses.

### 4.3 — BIOCHEMISTRY (1st Prof) · 6 cards (Tables 2444–2510 region)

| Card | Theme |
|---|---|
| Card 1 | Biophysics and Biomolecules |
| Card 2 | Food, Nutrition and Vitamins |
| Card 3 | Digestion, Absorption, Bioenergetics and Metabolism |
| Card 4 | Renal Biochemistry, Body Fluid, Electrolytes and Acid-Base Balance |
| Card 5 | Clinical Biochemistry and Clinical Endocrinology |
| Card 6 | Fundamentals of Molecular Biology and Genetics |

**Biochemistry professional exam:** Written 180 (Paper I + II) · SOE 100 · Practical 100 · Formative 20 · **Total 400.** R0 transcribes the item lists per card verbatim.

### 4.4 — PHARMACOLOGY & THERAPEUTICS (2nd Prof)

Item/card + term structure with item exam, card final, term exam, term final (written + SOE + practical). **Exam:** Written 90 + Formative 10 · SOE 100 · Practical 100 · **Total 300.** Practical includes Clinical Pharmacology. R0 seeds cards/items from the Pharmacology section.

### 4.5 — FORENSIC MEDICINE & TOXICOLOGY (2nd Prof)

Item/card + term structure. **Exam:** Written 100 (MCQ 20 + SEQ 20 + SAQ 50 + FA 10) · SOE 100 · Practical 50 + OSPE 40 + Others 10 (PM report, injury certificate, practical assignment) · **Total 300.**
**Mandatory field activities (count toward formative/practical):** 10 days mortuary + 6 days OCC/court/police-station/forensic-lab visits (see §7).

### 4.6 — COMMUNITY MEDICINE & PUBLIC HEALTH (3rd Prof)

**Exam:** Written 100 (MCQ 20 + SAQ/SEQ 70 + FA 10) · SOE 100 · Practical 100 (incl RFST Survey Report, Study Tour Report, Day Visit Report) · **Total 300.**
**Mandatory field program — COME (30 days):** 10 days Day Visit + 10 days RFST (Residential Field Study Tour) + 10 days Study Tour, each producing a written report submitted as part of practical (§7).

### 4.7 — PATHOLOGY (3rd Prof)

Oral exam box contents structured as: **General Pathology**, **General Pathology + Haematolymphoid System**, **Systemic Pathology** (Tables 4461–4481). General Pathology is also taught (formative-only) in Phase 2. **Exam:** Written 90 + FA 10 · SOE 100 · Practical 100 · **Total 300.** R0 seeds cards/items from the Pathology section.

### 4.8 — MICROBIOLOGY (3rd Prof) · 2 item cards (Tables 4850–4851)

| Item card | Theme |
|---|---|
| Item card 1 | General Bacteriology, Parasitology, Immunology |
| Item card 2 | Systemic Bacteriology, Virology, Mycology and Clinical Microbiology |

**Exam:** Written 90 + FA 10 · SOE 100 · Practical 100 · **Total 300.** General Microbiology is taught (formative-only) in Phase 2.

### 4.9 — FINAL PROF: clinical posting cards (Tables 408–413 region)

The clinical subjects use **posting cards** — the same card metaphor extended to ward placements. A posting card carries:
- header (Clinical Reg. No., Card No., duration in weeks, total marks 100, pass 60%, unit, professor-in-charge, placement dates);
- **Clinical items** marked Satisfactory/Unsatisfactory + marks + signature, each with **required case counts** (e.g. Surgery Card-One: "History taking ≥10 different cases", "Examination of swelling/ulcer/sinus/fistula ≥10 cases", "5 chronic abdominal cases");
- **Practical items** with **required procedure counts** (e.g. "observe 5 infusions", "give 10 IM injections", "observe Ryle's tube in 5 cases", "see 10 X-rays", "attend 6 operations in OT");
- **Tutorial items** (topic list);
- an **official record** block (issue/return/result dates, Excellent/Good/Satisfactory/Unsatisfactory/repeat, registrar signature).

> This is the data model for the clinical case-log + procedure-counter feature: **the BMDC clinical card *is* a logbook with required counts.** The Observed/Assisted/Performed counters map directly onto these BMDC requirements. (Deferred to R10 — most early users are pre-clinical.)

**Medicine & Allied final oral/clinical (Table 5930):** 8 examiners in 4 boards across 2 days; per board 40 marks (10 for X-ray/ECG/lab-data/photographs + 30 SOE); Day-1 IM long case 20 + 3 short 30; Day-2 Paeds long case 20 + 2 short 20 (Paeds + Skin&VD/Psychiatry).

---

## 5. The formative model (correct, BMDC-faithful)

**Formative is not a separate end exam — it is the in-course mark, embedded as 10% of each written paper.** It is built from items + cards + term-ending exams + integrated-teaching weightage + attendance, accumulated through the phase.

- **Eligibility gate:** ≥ **60% in formative** to sit the prof (a hard gate).
- **For 1st Prof specifically (the term-heavy phase):** all three term exams are hard 60% gates; the formative mark feeding the written paper is the in-course aggregate.
- **The app's job:** let the student record real item marks / card-completion marks / term results as their college gives them, compute the running formative %, compare to the 60% gate, and surface "marks needed" — never invent a formula the college doesn't use. Where a college supplies a single formative figure, the student records it directly.

The v2.0 generic weighted-average is acceptable as a fallback display but must be **phase-aware**: 1st Prof uses the term-gate model; the embedded-10%-of-written framing is shown so the student understands what the number means.

---

## 6. Attendance — per class type (BMDC attendance record, Table 102)

The real attendance card tracks **each class type separately**, and **all of them count toward the 75% gate**:

| Class type | Example (Physiology) |
|---|---|
| Lecture | 120 hours |
| Tutorial | 120 hours |
| Practical | 97 hours |
| Integrated teaching | 36 hours |

Clinical phases add **Clinical/Bedside teaching**, **Ambulatory care**, **Block posting**, and **field placement** as further attendance categories — all counting toward 75%. The app must let the student log attendance **per class type per subject** and compute the **worst** category against 75% (the binding gate is the lowest category, since the certificate requires ≥75% in *all*). This is already supported by the schema's `UNIQUE(user, subject, class_type)` — R2 surfaces and seeds the BMDC class types.

---

## 7. Integrated teaching & field placements (BMDC §Integrated Teaching, §Generic Topics)

**Integrated teaching (102 topics total):** Phase I 12 · Phase II 7 · Phase III 10 · Phase IV 42 common + 31 departmental = 73. Attendance + a written summary per session **carries practical marks** (10 marks in Phase II and Phase IV). Topic lists are in the curriculum and are seedable (R7). Each session is 2–3 hours.

**Generic Topics on Medical Humanities (16 topics, mandatory, reflected in formative/summative):** Phase I (behavioural science, medical sociology, social-media etiquette, self-directed learning, medical ethics) · Phase II (communication skill, doctor–patient relationship, bedside manner) · Phase III (integrity & accountability, aspects of a good doctor) · Phase IV (medical professionalism, inter-professionalism, patient safety) · Internship (white-coat ceremony, career planning, CME/CPD, causes of death, infection control). Seedable as a checklist (R7).

**Field placements (distinct activity type, produce written reports, count toward practical/formative):**
- **Community Medicine COME — 30 days:** 10 Day Visit + 10 RFST + 10 Study Tour, each with a report.
- **Forensic Medicine — 16 days:** 10 mortuary + 6 court/police-station/forensic-lab.
These are not regular classes and not clinical postings — they are a third activity type the timetable/attendance must represent (R8).

---

## 8. Internship (post-Final-Prof, BMDC §Internship)

- **1-year, logbook-based, mandatory rotatory internship**; required for permanent registration.
- **Must join within 1 month** of passing Final Prof (medical-ground exceptions only).
- **11 months at the medical college hospital + 1 month at Upazila Health Complex (UHC)/field level.**
- **Must complete within 2 years** of the start date.
- Rotation totals (from the clinical-teaching tables): **Medicine 19 / Surgery 19 / O&G 14 weeks** = 52.
- Generic topics for the internship period seed a checklist (white-coat ceremony, career planning, CME/CPD, causes of death, infection control).

(Deferred to R10/internship — build when Final-Prof cohorts arrive.)

---

## 9. What the app must mirror vs. what it must leave configurable

| Rigid (BMDC — seed, lock the structure) | Configurable (college/student — editable) |
|---|---|
| Phases, subjects, durations, total marks | Item counts a college adds beyond BMDC core |
| Card names + BMDC core item lists per subject | Card names a college renames; extra local cards |
| Term↔card mapping (1st Prof) | Timetable, class times, locations |
| Component structure (Written/SOE/Practical/Clinical) + 60% pass each | Send-up exam (exists at some colleges only) |
| Written composition (10% FA + 20% MCQ + 70% SAQ/SEQ) | Exact prof dates (entered when the university announces) |
| 75% attendance, 60% formative, pass-previous-prof, term gates | College holidays |
| Phase-1 lockout, 12-year window, GPA scale | Internal/college assessment patterns |
| Exam cycle (May/November) | — |

**Seeded BMDC content is always editable by the student** — the app pre-loads the truth and lets reality diverge, never the reverse.

---

## 10. Seed-data extraction checklist for R0 (the build session uses this)

R0 builds a single canonical constants module (`mbbsBmdcCurriculum.js`) from this file + the curriculum markdown. It must contain, per phase → subject:

- [ ] subject name, total marks, component breakdown (written/SOE/practical/clinical/formative), palette colour key
- [ ] written composition (FA 10% / MCQ 20% [SBA 50% + MTF 50%] / SAQ-SEQ 70% [SAQ 75% + SEQ 25%])
- [ ] number of oral boards + board topic split (where defined, e.g. Anatomy, Physiology)
- [ ] cards: name, type (`dissection` | `histology` | `system` | `topic` | `clinical_posting`), BMDC core item list (verbatim from the cited tables), default item mark (10 where stated)
- [ ] term↔card mapping (1st Prof)
- [ ] class types for attendance (Lecture, Tutorial, Practical, Integrated teaching, + clinical/field types per phase) with BMDC hour figures as defaults
- [ ] integrated-teaching topic list per phase
- [ ] generic medical-humanities topic list per phase
- [ ] field placements per subject (COME 30d, Forensic 16d) with report deliverables
- [ ] GPA scale (Table 13)
- [ ] eligibility constants (75 / 60 / 60-pass / term-gate / Phase-1-lockout / 12-yr)
- [ ] internship rotation totals + rules

Verbatim item text for the long lists (Anatomy Abdomen/Head&Neck/CNS, Physiology Cards 3–8, Biochemistry, Pharmacology, Forensic, Community Medicine, Pathology, Microbiology) is read directly from `BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md` at the cited tables during R0 — do not paraphrase; transcribe.

---

_This file is the spine. `02_MBBS_PRODUCT_SPEC.md` turns it into product; `04_MBBS_DATA_MODEL.md` turns it into schema; `06_MBBS_BUILD_SESSIONS.md` turns it into build prompts._


---
<!-- docnav-related -->
### Related docs
- [StudyRise — MBBS Bangladesh Module · Document Index (Redesign R3.0)](00_MBBS_INDEX.md)
- [StudyRise — MBBS Bangladesh Module · Product Specification (R3.0)](02_MBBS_PRODUCT_SPEC.md)
- [MBBS Bangladesh Module — Current State Ledger (R3.0)](03_MBBS_CURRENT_STATE.md)
- [MBBS Bangladesh Module — Data Model (R3.0)](04_MBBS_DATA_MODEL.md)
- [MBBS Bangladesh Module — Decision Log (R3.0)](05_MBBS_DECISIONS.md)
- [MBBS Bangladesh Module — Build Sessions (R3.0)](06_MBBS_BUILD_SESSIONS.md)
- [MBBS Bangladesh Module — Build Log (R3.0)](07_MBBS_BUILD_LOG.md)
- [BMDC Curriculum (original) → moved (de-duplicated)](Original%20BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
