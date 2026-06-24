# Admin Panel Audit Report

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


**Date:** 2026-06-18  
**Branch:** `main`  
**Commit:** `64c5c4a` — `fix: admin panel — resolve all ADMIN_V2_FEATURES gaps and broken screens`  
**Auditor:** Claude Sonnet 4.6

---

## Pre-Fix Status Table

| Screen / File | Feature | Pre-Fix Status | Category |
|---|---|---|---|
| `Dashboard.jsx` | App mode split card | ⚠️ 2-segment (Exam/University only) | MBBS gap |
| `Users.jsx` | Filter chip for MBBS | ❌ Missing | MBBS gap |
| `Users.jsx` | Mode column for MBBS | ❌ Shows blank for `mbbs_bd` | MBBS gap |
| `Users.jsx` | Avatar color array | ⚠️ Hardcoded hex `#2563eb` etc. | CSS token violation |
| `Users.jsx` | Filter chip active text color | ⚠️ Hardcoded `'var(--bg)'` missing (fallthrough) | CSS token violation |
| `UserDrawer.jsx` | Avatar color array | ⚠️ Hardcoded hex `#2563eb` etc. | CSS token violation |
| `UserDrawer.jsx` | Toggle/text white | ⚠️ Hardcoded `'#fff'` | CSS token violation |
| `UserDrawer.jsx` | Account section app mode | ❌ Shows raw `mbbs_bd` string | MBBS gap |
| `UserDrawer.jsx` | Study stats for MBBS users | ❌ Missing — showed exam stats instead | MBBS gap |
| `api/admin-actions.js` | `distinctActive()` | ❌ Missing `mbbs_study_log` source | MBBS gap |
| `api/admin-actions.js` | `getLastActiveMap()` | ❌ Missing `mbbs_study_log` source | MBBS gap |
| `api/admin-actions.js` | `getDashboardMetrics()` | ❌ No `mbbsUsers` count returned | MBBS gap |
| `api/admin-actions.js` | `getUsers()` filter | ❌ No `mbbs` filter case | MBBS gap |
| `api/admin-actions.js` | `getUserDetail()` | ❌ No MBBS table fetches | MBBS gap |
| `FeatureFlags.jsx` | Toggle knob color | ⚠️ `background: '#fff'` | CSS token violation |
| `FeatureFlags.jsx` | Avatar color array | ⚠️ Hardcoded hex `#2563eb` etc. | CSS token violation |
| `FeatureFlags.jsx` | Avatar text color | ⚠️ `color: '#fff'` | CSS token violation |
| `FeatureFlags.jsx` | TierControl Pro active | ⚠️ `color: '#fff'` | CSS token violation |
| `FeatureFlags.jsx` | Toast text | ⚠️ `color: '#fff'` | CSS token violation |
| `HolidayAdmin.jsx` | Delete button text | ⚠️ `color: '#fff'` | CSS token violation |
| `HolidayAdmin.jsx` | Save button text | ⚠️ `color: '#fff'` (ternary) | CSS token violation |
| `HolidayAdmin.jsx` | Year filter chip text | ⚠️ `color: '#fff'` (ternary) | CSS token violation |
| `VivaAdmin.jsx` | ShieldCheck icon color | ⚠️ `color="var(--green, #18794e)"` — fallback hex | CSS token violation |
| `Security.jsx` | Toggle knob color | ⚠️ `background: '#FFFFFF'` | CSS token violation |
| `Security.jsx` | Toast text | ⚠️ `color: '#FFFFFF'` | CSS token violation |

**Legend:** ✅ Working · ⚠️ Partially working / CSS violation · ❌ Missing or broken

---

## Fixes Applied

### MBBS Bangladesh gap (8 changes across 2 files)

**`studyrise-admin/api/admin-actions.js`**
1. `distinctActive()` — added `mbbs_study_log` as a third parallel fetch; errors tolerated silently (table may not exist on all installs)
2. `getLastActiveMap()` — added `mbbs_study_log` to the parallel last-active date query
3. `getDashboardMetrics()` — added `mbbsUsers` count via `.eq('app_mode', 'mbbs_bd')`; returned alongside `examUsers`/`usmUsers`
4. `getUsers()` filter switch — added `case 'mbbs': query = query.eq('app_mode', 'mbbs_bd'); break;`
5. `getUserDetail()` — added parallel fetches for 5 MBBS tables (`mbbs_subjects`, `mbbs_cards`, `mbbs_items`, `mbbs_study_log`, `mbbs_sr_records`); computes `mbbsStats = { phase, subjects, cards, items_cleared, items_total, study_sessions, sr_records }`; all errors tolerated

**`studyrise-admin/src/screens/Dashboard.jsx`**
6. AppModesCard converted from 2-segment to 3-segment bar: Exam (`var(--blue)`) / University (`var(--purple)`) / MBBS (`var(--green)`); legend updated with `flexWrap` for 3 items

**`studyrise-admin/src/screens/Users.jsx`**
7. Added `{ key: 'mbbs', label: 'MBBS Bangladesh' }` filter chip after `university`
8. Mode column render: `row.app_mode === 'mbbs_bd' ? 'MBBS' : ...`

**`studyrise-admin/src/components/UserDrawer.jsx`**
9. Account section: shows 'MBBS Bangladesh' label for `mbbs_bd`, hides exam name for MBBS users, shows MBBS phase
10. Study stats section: added MBBS branch rendering `subjects / cards / items cleared / study sessions / SR records`

### CSS token violations (15 hex values replaced across 6 files)

**`studyrise-admin/src/screens/Users.jsx`**
- Avatar color array: 6 hex values → `['var(--blue)', 'var(--purple)', 'var(--cyan)', 'var(--green)', 'var(--amber)', 'var(--red)']`
- Filter chip active text: fixed to use `color: filter === chip.key ? 'var(--bg)' : 'var(--ink-4)'`

**`studyrise-admin/src/components/UserDrawer.jsx`**
- Avatar color array: 6 hex values → CSS vars (same pattern as Users.jsx)
- Avatar text color: `'#fff'` → `'var(--bg)'`

**`studyrise-admin/src/screens/FeatureFlags.jsx`**
- Toggle knob: `background: '#fff'` → `background: 'var(--bg)'`
- Avatar color array: 6 hex values → CSS vars
- Avatar text: `color: '#fff'` → `color: 'var(--bg)'`
- TierControl Pro active: `color: '#fff'` → `color: 'var(--bg)'`
- Toast: `color: '#fff'` → `color: 'var(--bg)'`

**`studyrise-admin/src/screens/HolidayAdmin.jsx`**
- Delete button: `color: 'var(--bg)'` (was `'#fff'`)
- Save button ternary: `valid && !saving ? 'var(--bg)' : ...` (was `'#fff'`)
- Year filter chip ternary: `filterYear === y ? 'var(--bg)' : ...` (was `'#fff'`)

**`studyrise-admin/src/screens/VivaAdmin.jsx`**
- ShieldCheck icon: `color="var(--green)"` (removed hardcoded fallback `#18794e`)

**`studyrise-admin/src/screens/Security.jsx`**
- Toggle knob: `background: 'var(--bg)'` (was `'#FFFFFF'`)
- Toast: `color: 'var(--bg)'` (was `'#FFFFFF'`)

### No changes needed

**`studyrise-admin/src/screens/Layout.jsx`** — Verified: Lucide ^0.511.0 exports both `Library` and `MessageSquareQuote`. Icons match the main app's `Sidebar.jsx`. No changes required.

**Google OAuth button colors in `Login.jsx`** — `#FFFFFF`, `#dadce0`, `#3c4043` are per Google brand guidelines. Not touched per spec.

---

## Build Output

```
vite v5.4.21 building for production...
✓ 2796 modules transformed.

dist/index.html                   0.52 kB │ gzip:   0.32 kB
dist/assets/index-BZchFSWw.css   11.30 kB │ gzip:   3.53 kB
dist/assets/index-C_hz6WQf.js   911.62 kB │ gzip: 248.40 kB

(!) Some chunks are larger than 500 kB after minification.
✓ built in 3.00s
```

**Errors:** 0  
**Warnings:** 1 (chunk size — pre-existing, not introduced by this audit)

---

## Files Modified (8 total)

| File | Changes |
|---|---|
| `studyrise-admin/api/admin-actions.js` | MBBS: activity tracking, metrics, filter, user detail |
| `studyrise-admin/src/screens/Dashboard.jsx` | MBBS: 3-segment app mode bar |
| `studyrise-admin/src/screens/Users.jsx` | MBBS: filter chip + mode column; CSS: avatar colors |
| `studyrise-admin/src/components/UserDrawer.jsx` | MBBS: account section + stats branch; CSS: avatar colors |
| `studyrise-admin/src/screens/FeatureFlags.jsx` | CSS: toggle knob, avatar colors, TierControl, toast |
| `studyrise-admin/src/screens/HolidayAdmin.jsx` | CSS: 3 white-on-color text violations |
| `studyrise-admin/src/screens/VivaAdmin.jsx` | CSS: ShieldCheck hex fallback |
| `studyrise-admin/src/screens/Security.jsx` | CSS: toggle knob + toast |

---

## Deploy Note

**Deployment is manual — Istiaque handles all `vercel --prod` commands.**

Admin panel deploy command (run from repo root):
```bash
VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 \
VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 \
npx vercel --prod --yes
```

Live URL: **https://admin.studyrise.app**


---
<!-- docnav-related -->
### Related docs
- [StudyRise Admin Panel — Current Features Reference](ADMIN_V2_FEATURES.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
