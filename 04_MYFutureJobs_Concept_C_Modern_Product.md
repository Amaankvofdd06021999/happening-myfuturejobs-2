# MYFutureJobs — Design Concept C: "Modern Product"

**Document 4 of 4 (companion to the set).** Read Document 1 (Structure, Content, Flow & Direction) first — this guide implements that same IA with a contemporary, product-led dual-accent visual system. Includes full design tokens for **dark and light mode** and a **vibe-coding prompt** at the end.

---

## 1. Concept in one line

The modern SaaS-product look. Crisp, bright, and confident — a blue-led interface with an orange counterpoint, the way a contemporary product dashboard reads (Linear, modern fintech, the dashboard references shared). It feels less "government website" and more "best-in-class product the government happens to run." The most current-feeling of the three, while still disciplined and uncluttered.

**When to pick C:** if the evaluation rewards a modern, polished, product-grade feel and the client wants MYFutureJobs to look like a peer to JobStreet/Hiredly/Indeed rather than a public-sector portal. Slightly bolder than A, more neutral/cooler than B.

> **Note on accents:** Concepts A and B follow a strict single-accent rule. Concept C intentionally breaks that with a **disciplined dual-accent** system (blue + orange) drawn from the supplied palette. The discipline moves from "one color" to "one *job* per color" — see §3.4. This is the deliberate point of difference for C.

---

## 2. Design principles

1. **Two accents, two jobs.** Blue is the system/primary color (actions, navigation, structure). Orange is the highlight/emphasis color (the single most important thing on a screen, AI moments, key data). They never compete for the same role.
2. **Bright, neutral canvas.** Light grays and white keep the interface clean and let the two accents pop precisely where intended.
3. **Product-grade clarity.** Dashboard-first thinking: clear cards, strong data hierarchy, generous but efficient spacing. Reads as capable software.
4. **Gradients as seasoning, not sauce.** The two `Linear` swatches (blue and orange gradients) are used *sparingly* — a hero accent, a single feature card, a key metric tile. Never full-page gradient washes, never gradient blobs behind everything.
5. **Still restrained.** No glassmorphism, controlled rounding, soft shadows. Modern ≠ noisy.

---

## 3. Color system

Taken directly from the supplied palette. Blue primary, orange emphasis, warm-tinted near-black, clean light neutrals, and two reserved gradients.

### 3.1 Brand seeds (from supplied palette)
| Token | Hex | Role |
|---|---|---|
| Ink | `#1F1F15` | Warm near-black — text, dark base |
| Signal Blue | `#2279FF` | Primary accent (actions, system) |
| Blue Linear | `#2279FF → #5AA0FF` | Reserved blue gradient (sparing) |
| Ember Orange | `#EE562D` | Emphasis accent (AI, key data, highlight) |
| Orange Linear | `#EE562D → #FF7A4F` | Reserved orange gradient (sparing) |
| Steel Gray | `#8D8D8D` | Neutral / muted text, icons |
| Cloud | `#F6F6F6` | Light section tint |
| Mist | `#FAFAFA` | Lightest tint |
| White | `#FFFFFF` | Base / cards |

### 3.2 Light mode tokens
```css
:root[data-theme="light"] {
  /* surfaces — bright, neutral */
  --bg-base:        #FFFFFF;
  --bg-subtle:      #FAFAFA;   /* Mist — page bands */
  --bg-elevated:    #FFFFFF;   /* cards */
  --bg-inset:       #F6F6F6;   /* Cloud — inputs, wells, chart tracks */

  /* text — warm near-black ramp */
  --text-strong:    #1F1F15;   /* Ink */
  --text-default:   #33332B;
  --text-muted:     #6B6B66;
  --text-subtle:    #8D8D8D;   /* Steel Gray */
  --text-on-accent: #FFFFFF;

  /* PRIMARY accent — blue (system/actions) */
  --accent:         #2279FF;   /* Signal Blue */
  --accent-hover:   #1366E8;
  --accent-press:   #0F55C4;
  --accent-soft:    #E7F0FF;   /* 10% wash — selected rows, info chips */
  --accent-grad:    linear-gradient(135deg, #2279FF 0%, #5AA0FF 100%); /* sparing */

  /* EMPHASIS accent — orange (highlight/AI/key data) */
  --emphasis:       #EE562D;   /* Ember Orange */
  --emphasis-hover: #DA481F;
  --emphasis-press: #C03D17;
  --emphasis-soft:  #FDE8E1;   /* warm wash — AI badges, key-metric tiles */
  --emphasis-grad:  linear-gradient(135deg, #EE562D 0%, #FF7A4F 100%); /* sparing */

  /* lines & states */
  --border:         #ECECEC;
  --border-strong:  #DADADA;
  --focus:          #2279FF;
  --success:        #1E8E5A;
  --warning:        #B26A00;
  --danger:         #C0392B;

  --shadow-sm: 0 1px 2px rgba(31,31,21,.06), 0 1px 3px rgba(31,31,21,.04);
  --shadow-md: 0 4px 16px rgba(31,31,21,.08);
  --radius:    10px;
  --radius-lg: 16px;
}
```

### 3.3 Dark mode tokens
```css
:root[data-theme="dark"] {
  /* surfaces — warm-tinted near-black (from Ink), layered */
  --bg-base:        #15150F;
  --bg-subtle:      #1C1C15;
  --bg-elevated:    #24241B;   /* cards */
  --bg-inset:       #1A1A13;

  /* text */
  --text-strong:    #F7F7F2;
  --text-default:   #E2E2DA;
  --text-muted:     #A3A39B;
  --text-subtle:    #8D8D8D;
  --text-on-accent: #FFFFFF;

  /* PRIMARY — blue, lifted for dark contrast */
  --accent:         #4A90FF;
  --accent-hover:   #6AA6FF;
  --accent-press:   #2279FF;
  --accent-soft:    #11233D;
  --accent-grad:    linear-gradient(135deg, #2279FF 0%, #5AA0FF 100%);

  /* EMPHASIS — orange, lifted */
  --emphasis:       #FF6B3D;
  --emphasis-hover: #FF835A;
  --emphasis-press: #EE562D;
  --emphasis-soft:  #2E1810;
  --emphasis-grad:  linear-gradient(135deg, #EE562D 0%, #FF7A4F 100%);

  /* lines & states */
  --border:         #2C2C22;
  --border-strong:  #3E3E30;
  --focus:          #4A90FF;
  --success:        #34C77B;
  --warning:        #E0A33A;
  --danger:         #E86254;

  --shadow-sm: 0 1px 2px rgba(0,0,0,.5);
  --shadow-md: 0 6px 24px rgba(0,0,0,.55);
  --radius:    10px;
  --radius-lg: 16px;
}
```

### 3.4 Usage rules — "one job per color"
This is the heart of Concept C. The dual accent only works if each color has a fixed, non-overlapping role:

| Element | Color |
|---|---|
| Primary buttons, links, active nav, selection, focus | **Blue** (`--accent`) |
| Charts: primary data series, system states | **Blue** |
| The single most important highlight on a screen | **Orange** (`--emphasis`) |
| AI moments — assistant accents, AI badges, "AI-powered" tags | **Orange** |
| Key headline metric (e.g., the Career Signal Score, the hero KPI tile) | **Orange** |
| Status (success/warning/danger) | Status colors only — never blue or orange |

- **Per screen:** blue can appear wherever actions live; **orange is rationed to ~one zone** (the AI panel accent, or the single hero metric, or one feature tile — not all three at once).
- **Gradients:** at most **one gradient element per screen**, and only for a hero accent, a single feature/CTA card, or one key metric tile. Flat fills everywhere else. Never a gradient page background, never blobs.
- **Soft washes** (`--accent-soft` / `--emphasis-soft`) carry tinting duty so the saturated accents stay rare and impactful.

---

## 4. Typography

**Two fonts max.** Manrope spine (house default) for full brand continuity across all three concepts. Optional Instrument Serif italic accent is *not* used in C — the product aesthetic stays purely neo-grotesque/sans for a cleaner, more software-like read.

```css
--font-sans: "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
```

### 4.1 Type scale (1.25 ratio, flush-left)
| Token | Size / Line | Weight | Tracking | Use |
|---|---|---|---|---|
| Display | 56 / 60 | 800 | -0.03em | Home hero |
| H1 | 40 / 46 | 700 | -0.025em | Page titles |
| H2 | 30 / 38 | 700 | -0.02em | Sections |
| H3 | 22 / 30 | 600 | -0.01em | Card titles |
| Body-L | 18 / 28 | 400 | 0 | Lead |
| Body | 16 / 26 | 400 | 0 | Default |
| Small | 14 / 22 | 500 | 0 | Meta, table cells |
| Caption | 12 / 16 | 600 | 0.04em (uppercase) | Eyebrows, tags |

**Rules:** weight + size for hierarchy. Tabular numerals in all dashboard data. Key metric numbers at Display/800 — and *this* is where orange is allowed to color a number.

---

## 5. Grid, spacing, layout

- **12-column grid**, 24px gutters, 1200–1280px max, 48px desktop margins.
- **8px spacing base.**
- **Dashboard-first composition** — this concept leans into the SaaS dashboard references: tidy metric-tile rows, clear card grids, left sidebar nav on logged-in surfaces, efficient density.
- **Cards:** 10px radius, `--shadow-sm`, 1px border. `--shadow-md` only on one hero/feature card per view.
- Flush-left, asymmetric public pages; structured grid dashboards.

---

## 6. Component direction

**Buttons** — Primary: solid **blue**, white text, 10px radius, weight 600. Secondary: 1px `--border-strong`, transparent. Emphasis/CTA (rare, highest-priority only): solid **orange** or `--emphasis-grad`. 44px min height.

**Sidebar nav** (logged-in) — icon + label rail, active item in blue (`--accent-soft` fill + blue text/indicator). Clean, product-style.

**Top bar** — white/`--bg-base`, wordmark, EN/BM, Login. Light and modern (not navy here — the dark navy belongs to A).

**Metric tiles** — dashboard KPI cards; the single most important tile may use `--emphasis` or `--emphasis-grad` (orange) while the rest stay neutral with blue micro-accents. Directly echoes the dashboard references (one bold tile, the rest calm).

**Score card** (Career Signal / JD Score) — large tabular number in **orange** (the one sanctioned orange number), qualitative band chip, gauge arc, "Why" link. Orange marks "this is the headline AI output."

**Fit-Match bars** — horizontal labeled bars; **blue** fill for standard dimensions on `--bg-inset` track; the top/critical dimension may use orange to draw the eye.

**Charts (LMI)** — **blue** primary series + neutral grays; orange reserved for a single "key finding" highlight on a chart, used once.

**AI results panel** — right-side, `--bg-elevated`, 1px left border; the assistant accent (avatar, header bar, key callouts) is **orange** — this is the platform's "AI = orange" signal, kept consistent. Streamed text, "Why" expanders, accept/reject chips.

**Floating pre-login chatbot** — **orange** launcher (AI = orange), 56px, `--shadow-md`; expands to a 360px panel; "create an account" CTA. The orange launcher makes AI instantly recognisable against the blue UI.

**Tracked-change CV/JD view** — strike original (`--danger` tint), inline suggestion (neutral/`--success`), per-item Accept/Reject, Review/Clean PDF.

**Badges/gamification** — flat, line-icon badges; earned = blue fill, AI-recommended actions flagged orange; profile-completion ring in blue.

---

## 7. Motion

Reference libraries: **Framer Motion**, **Lenis**, **GSAP/ScrollTrigger** (home only).
- Section reveals: 16–24px rise + fade, 400–500ms ease-out, 60ms stagger.
- AI panel slide-in 300ms; orange accent header fades in.
- Score gauges: arc animate + count-up once on view.
- Dashboard tiles: subtle stagger-in on load.
- Hover: 120ms color/elevation only. No parallax, no gradient animation, no glassmorphism, no looping decoration. `prefers-reduced-motion` respected.

---

## 8. Dark vs light guidance

- **Light is the primary demo mode** — the bright neutral canvas is what makes the dual-accent pop and reads most "modern product." Dark mode is the product-polish signal and suits the Case Officer's long dashboard sessions.
- Dark mode is **warm-tinted near-black** (from Ink `#1F1F15` → `#15150F`), not cold gray — keeps continuity with the supplied palette. Lift both accents (blue `#4A90FF`, orange `#FF6B3D`).
- Maintain the "one job per color" rule identically in dark mode. White text on both accents always.
- WCAG AA both modes; test blue-on-white and orange-on-white for AA (both pass at the chosen values for large/UI text — verify body-size usage).

---

## 9. Concept A vs B vs C — quick comparison

| Dimension | A — Trusted Institutional | B — Warm & Human | C — Modern Product |
|---|---|---|---|
| Personality | Credible, governmental, calm | Inviting, people-first, emotive | Modern, product-grade, confident |
| Accent model | Single (orange) | Single (orange) | **Dual (blue + orange)** |
| Base surfaces | Cool whites / fog gray | Warm cream / sand | Bright white / light gray |
| Dark base | Cool navy-black `#00101F` | Warm brown-black `#14110E` | Warm ink-black `#15150F` |
| Imagery | Minimal, type-led | Photography-led | Product/UI-led, dashboards |
| Serif accent | Rare / optional | Signature | None (pure sans) |
| Gradients | None | One photo scrim only | Two, used sparingly |
| Rounding | 8px | 12–20px | 10px |
| Risk | Lowest | Low-moderate | Moderate |
| Best when judged on | Trust, scale, accessibility | Engagement, approachability | Modernity, product polish |

All three share: identical IA/flows (Doc 1), Manrope spine, no glassmorphism/no gradient blobs, right-side AI panel + explainability, pre-login chatbot, persistent state, WCAG AA, EN/BM. The orange-for-AI cue is consistent across all three (in C it's the emphasis accent; in A/B it's the single accent).

---

## 10. Vibe-coding prompt (Concept C)

> Paste into the vibe-coding tool. Next.js 15 + Tailwind. Pair with Document 1 for screen/flow detail.

```
Build a responsive Next.js 15 + Tailwind web app for "MYFutureJobs", a Malaysian
government employment portal (run under PERKESO). Visual concept: "Modern Product" — a
contemporary, product-grade, dashboard-first look like a best-in-class SaaS app. Clean
and disciplined (NO glassmorphism, NO gradient blobs/washes). Branding: product name is
exactly "MYFutureJobs" — never add "Gov". Show no agency/vendor name or logo.

DESIGN SYSTEM (CSS variables / Tailwind theme; dark + light via data-theme):
- Font: Manrope only (300/400/600/700/800). Pure sans, no serif.
- DUAL ACCENT with "one job per color":
  * PRIMARY = blue (#2279FF light / #4A90FF dark) — all actions, links, active nav,
    selection, focus, primary chart series.
  * EMPHASIS = orange (#EE562D light / #FF6B3D dark) — the single most important
    highlight per screen, ALL AI moments (assistant accent, AI badges, AI tags), and
    the one headline metric number. Orange is rationed to ~one zone per screen.
  * Status colors (success/warning/danger) are separate and never replaced by blue/orange.
- Neutrals: text Ink #1F1F15, muted #8D8D8D; light base #FFFFFF, subtle #FAFAFA, inset
  #F6F6F6, border #ECECEC.
- Dark = warm ink-black base #15150F, subtle #1C1C15, card #24241B; text #F7F7F2, muted
  #A3A39B, border #2C2C22. Warm-tinted, never cold gray.
- Two gradients allowed but SPARING (max one gradient element per screen, for a hero
  accent / one feature card / one key metric tile only):
  blue linear #2279FF→#5AA0FF, orange linear #EE562D→#FF7A4F. No gradient page
  backgrounds, no blobs.
- Radius 10px. shadow-sm default; shadow-md on one hero/feature card per view only.
- 12-col grid, 24px gutters, max 1280px, 8px spacing base. Dashboard-first: left
  sidebar nav on logged-in surfaces, tidy KPI-tile rows, clean card grids.

TYPOGRAPHY: hierarchy from weight + size; tight heading tracking (-0.02 to -0.03em);
tabular numerals in all data. Key metric numbers at 800 weight — and this is the one
place a number may be colored ORANGE.

SIGNATURE PATTERNS (platform standard):
- AI results in a RIGHT-SIDE panel (380–420px desktop / full-screen sheet mobile). The
  assistant accent (header, avatar, key callouts) is ORANGE — consistent "AI = orange"
  cue against the blue UI. Neutral assistant label ("Career Assistant"/"Hiring
  Assistant"), streamed text, expandable "Why" rationale on EVERY AI output (required).
- Floating pre-login chatbot: ORANGE 56px launcher bottom-right on public pages;
  expands to 360px panel; "create an account for full features" CTA.
- Persistent filter/search state across navigation.
- Score cards: big ORANGE tabular number + qualitative band + gauge + Why.
- Dashboard KPI tiles: one bold tile may use orange or orange-gradient; the rest stay
  neutral with blue micro-accents.
- Fit-Match: horizontal labeled bars, BLUE fill, orange only on the single top dimension.
- Tracked-change CV/JD edits: strike original, inline suggestion, per-item
  Accept/Reject, Review/Clean PDF.

MOTION: Framer Motion + Lenis + GSAP (home). Section reveals 16–24px rise+fade,
400–500ms ease-out, 60ms stagger. AI panel slide-in 300ms. Score gauges animate +
count-up once. Dashboard tiles stagger-in on load. No parallax, no gradient animation,
no looping decoration. Respect prefers-reduced-motion.

ACCESSIBILITY: WCAG AA, visible focus rings (blue), 44px touch targets, EN/BM bilingual
(tolerate ~30% longer BM strings), keyboard-navigable AI panels.

SCREENS (build in this order):
1. Home: light top bar; flush-left hero with prominent search bar and ONE gradient
   accent; "Programs & Events" band (Career Carnivals / fairs / training, NO live
   counters); role entry (Jobseeker / Employer); career-services grid; strong blue CTAs
   + one orange highest-priority CTA; floating orange chatbot.
2. Jobseeker Dashboard (sidebar layout): KPI tiles (one orange), Career Signal Score
   card (orange number), "Jobs for you", application snapshot, suggested training,
   profile-completion ring (blue), next-best-action.
3. Career Assistant — CV Market Positioning + CV Edits/PDF Review (right-side panel with
   orange AI accent, tracked changes, Why, Review/Clean PDF).
4. Employer — JD Analysis + Bias Detection (JD score card, Original→Improved with Why,
   salary benchmark, skills breakdown; bias flags each paired with a suggested rewrite).
5. Employer — Fit-Match shortlist + deep-dive (blue dimension bars, orange top
   dimension) + Interview Question Generator (Behavioural/Competency/Situational,
   scoring guide, red flags, PDF export).
6. Case Officer — Research Hub LMI report (blue charts, one orange key-finding
   highlight, right-side orange Report Explainer panel).

Lead the demo in light mode; include a working warm-toned dark-mode toggle.
```

---

*End of Document 4 (Concept C). The full set is now: 01 Structure/Flow · 02 Concept A (Trusted Institutional) · 03 Concept B (Warm & Human) · 04 Concept C (Modern Product).*
