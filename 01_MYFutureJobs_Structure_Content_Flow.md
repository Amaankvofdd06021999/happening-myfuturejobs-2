# MYFutureJobs — Structure, Content, Flow & Direction

**Project:** MYFutureJobs Portal Redesign + AI POC
**Client:** PERKESO (Pertubuhan Keselamatan Sosial / SOCSO)
**Tender reference:** T/PKS 2/2026(M)
**Document 1 of 3** — Read this before the two concept guides. This is the concept-agnostic foundation: information architecture, user journeys, screen inventory, content rules, and AI-workflow specifications. Concepts A and B both implement *this* structure; they differ only in visual treatment.

---

## 0. How to use this document set

| File | Purpose |
|---|---|
| **01 — Structure, Content, Flow & Direction** (this file) | The skeleton. IA, journeys, screens, AI flows, content rules, constraints. Concept-neutral. |
| **02 — Design Concept A: "Trusted Institutional"** | Full visual system + tokens + dark/light + vibe-coding prompt. |
| **03 — Design Concept B: "Warm & Human"** | Full visual system + tokens + dark/light + vibe-coding prompt. |

Build order: lock this document → pick a concept → hand the concept file's prompt to the vibe-coding tool → build screens in the priority order in §7.

---

## 1. Strategic context (what the client actually wants)

Distilled from the pre-demo Q&A, the PERKESO AI Journey brief, and the client's written feedback on the first build.

**Audience for the demo is non-technical.** Business and process stakeholders, not engineers. They judge on usability, clarity, business value, and narrative — not implementation. Every flow needs a clear "why this is designed this way / how it reduces friction / what operational pain it solves" rationale baked in.

**The differentiator is restraint, not spectacle.** The brief is explicit: clean and modern UX, easy navigation, intuitive journeys, accessibility, reduced friction. *Not* flashy or experimental. The client has rejected futuristic concepts without practical value, cluttered dashboards, and flows that add operational complexity. Professional, scalable, practical wins.

**AI must read as practical and assistive** — workflow-enhancing and productivity-focused, never gimmicky. AI is a co-pilot that saves time, not a toy.

**Benchmarks they reference:** Workday/Workable (institutional polish), and JobStreet, Hiredly, Monster, Indeed (modern job-portal patterns — onboarding, recommendations, recruiter tooling). We take inspiration from how these surface key information and journeys; we do not clone.

**Bilingual EN / BM** throughout (Mandarin/Tamil noted as possible future scope, design must not break under longer strings).

**On-premises hosting** is the production target; cloud is fine for the demo. AI processes only anonymised payloads — design copy should reflect data-stays-on-prem where trust signals appear.

---

## 2. Brand & identity rules (non-negotiable)

These come straight from client feedback and the tender and override any design preference.

1. **Product name is `MYFutureJobs`.** No "Gov" anywhere — not in the logo, not in naming, not in URL references. The live platform is the source of truth (myfuturejobs.gov.my, but the *brand* presented in-product is "MYFutureJobs", run under PERKESO).
2. **Retain recognisable brand identity**, then modernise layout, interaction, dashboards, typography hierarchy, and overall usability around it. Balanced approach: keep the wordmark and equity, upgrade everything else.
3. **No tenderer name or logo on any proposal screen** (Lampiran A3(i)). No "Happening", no agency mark. The screens belong to MYFutureJobs/PERKESO.
4. **AI agent names are placeholders.** "CeeVee" (jobseeker agent) and "Atlas" (employer agent) are POC names that *will change*. Design must not hard-depend on them — treat as "Career Assistant" / "Hiring Assistant" with a swappable label. Use neutral working labels in the UI.
5. **AIGE + Explainable AI compliance.** Every AI output needs a visible "Why" / rationale affordance (National AI Governance & Ethics Guidelines, A3(ii)). This is a design requirement, not a nice-to-have.
6. **POC screenshots are reference only** — the actual design is original, BM/English, aligned to PERKESO identity.

---

## 3. Client feedback → design response (the changes this round must address)

The first build (happening-futurejobs.vercel.app) drew specific feedback. Each item below maps to a concrete structural response carried into both concepts.

### 3.1 Home page — more strategic, engagement-driven
- **Remove dynamic metrics/counters** ("X jobs posted", live tickers) — hard to maintain, low value. Replace with evergreen value and program promotion.
- **Promote initiatives:** Career Carnivals, hiring events, career fairs, training opportunities, employment programs. These get dedicated, visually prominent home-page real estate (a "Programs & Events" band).
- **Stronger CTAs** guiding users to: register, apply, develop career, use AI services. Every home section ends in a clear next action.
- **Personalized recommendation sections** where applicable (logged-in: "Jobs for you", "Suggested training"; logged-out: role-based entry points).
- Inspiration from Workable's information hierarchy and journey highlighting — not a clone.

### 3.2 Jobseeker profile — richer candidate representation
- **Certifications & professional credentials** section.
- **Achievement badges & skill recognitions.**
- **AI-driven recommendations** for certification programs and training courses, based on profile + skills + target roles.
- **Career progression & skill development suggestions.**

### 3.3 Engagement & retention mechanics
- **Gamification** (LinkedIn-style): profile completion milestones, badges, skill achievements, learning goals, progress rings.
- **Incentive-based programs for interview attendance:** when an employer schedules an in-person interview via the portal, the jobseeker can receive promotional benefits — ride discounts, transport vouchers, travel incentives. Design a clean voucher/reward surface for this.

### 3.4 AI & conversational experience
- **Pre-login AI chatbot** (floating): lets users interact, ask questions, discover jobs, and understand services *before* registering/authenticating. Floating launcher, expandable panel.
- **All other AI capabilities are standalone pages** (not crammed into the chatbot) — Career Assistant, CV optimisation, fit-match, etc., each a proper screen.

### 3.5 Branding alignment
- Strip all "Gov" usage (see §2.1). Align logo treatment, naming, URL references to the live platform.

---

## 4. Personas & top-level navigation

Three personas, three distinct surfaces. Shared design system, role-appropriate IA.

| Persona | Primary goal | Entry | AI agent (working label) |
|---|---|---|---|
| **Jobseeker** | Find the right job, improve positioning, get hired | Public site → SSO login | Career Assistant *(POC: CeeVee)* |
| **Employer** | Post quality vacancies, find fit candidates, hire faster | Employer portal → SSO | Hiring Assistant *(POC: Atlas)* |
| **Case Officer** (PERKESO internal) | Monitor cases, run labour-market intel, intervene | LDAP/SSO + RBAC | Research Hub (RAG) |

### 4.1 Public (logged-out) nav
`Find Jobs` · `Career Fairs & Events` · `Career Services` (MYCEC, training, programmes, jobseeker categories) · `Resources` (Labour Market Exchange, satellite centres) · `For Employers` · `EN / BM` · `Login` · **floating AI chatbot launcher**

### 4.2 Jobseeker (logged-in) nav
`Dashboard` · `Find Jobs` · `Applications` · `Career Assistant (AI)` · `Profile` · `Events & Training` · `Rewards`

### 4.3 Employer (logged-in) nav
`Dashboard` · `Vacancies` · `Candidates` · `Hiring Assistant (AI)` · `Company Profile` · `Reports`

### 4.4 Case Officer nav
`Dashboard` · `Jobseeker Cases` · `Employer Oversight` · `Research Hub (AI)` · `Reports` · `Assignments`

---

## 5. Information architecture & screen inventory

~30 key screens across three journeys, plus the public site. Marked **[AI]** where an AI workflow is core, **[★]** for the highest-priority demo screens.

### 5.1 Public site
1. **Home** [★] — hero + search, programs & events band, role entry (jobseeker/employer), career services, value props, app download, pre-login chatbot.
2. **Find Jobs (search results)** — semantic search, smart filters (location/salary/category/remote-hybrid), match-score badges, **persistent filter state** (solves the known pain point — filters/state survive navigating away and back).
3. **Job detail** — description, match score, save/apply, similar jobs.
4. **Career Fairs & Events** — upcoming events, registration, countdown, AI event recommendations.
5. **For Employers (marketing)** — value prop, CTA to register.
6. **Login / Register (SSO)** — MyDigital ID / SSO; role selection.

### 5.2 Jobseeker journey [primary demo surface]
7. **Onboarding** [★] — strong, low-friction first run: who you are → goals → skills → preferences. Progress indicator. Skippable but encouraged.
8. **Jobseeker Dashboard** [★] — personalised: Career Signal Score, "Jobs for you", application status snapshot, suggested training, next actions, profile-completion ring.
9. **Profile builder / Profile view** [★] — personal, academic, skills, job prefs **+ certifications & credentials + achievement badges + AI training recommendations + career-progression suggestions** (see §3.2).
10. **Career Assistant — Career Signal & Scoring** [AI][★] — score (e.g., 68/100 "Competitive") with market context, positioning gaps in plain language, behavioural insight on what to emphasise, right-side assistant chat.
11. **Career Assistant — CV Market Positioning Analysis** [AI][★] — Market Positioning Snapshot, detected positioning lens, mixed-signal flags, recruiter 10-second scan, strength/concern signals, trade-offs & cuts.
12. **Career Assistant — CV Edits + PDF Review** [AI][★] — line-by-line targeted edits, contextual "why" per edit, inline tracked-change view, "Review PDF" + "Clean PDF" export. (Maps to Explainable-AI requirement.)
13. **Application tracker** [★] — Applied → Interview → KIV → Hired/Reject, with AI-matched score shown, activity log, **persistent context**.
14. **Candidate status — "What your assistant knows about you"** [AI] — profile summary the AI holds + proactive prioritised next actions (CV Review, Salary Intel).
15. **Events & Training** — recommended fairs/training, registration, **interview-attendance rewards** surface (§3.3).

### 5.3 Employer journey [primary demo surface]
16. **Employer registration** — SSM / PERKESO contribution SSO.
17. **Employer Dashboard** — vacancies overview, candidate pipeline, hiring activity, AI insights entry.
18. **JD creation form + JD Store** [★] — write/upload JD; template library.
19. **Hiring Assistant — JD Analysis** [AI][★] — score, text critique (Original → Improved with "why"), salary benchmark with confidence, required vs preferred vs hot vs typically-missing vs implicit skills. *(Ref: RFP Image 3 "Employer & Vacancy Showcase" / AI-powered vacancy recommendation.)*
20. **Hiring Assistant — Bias Detection** [AI][★] — JD score (e.g., 8.0/10), market competitiveness, clarity issues, gender-coded/age/exclusionary flags, side-by-side rewrites. (AIGE compliance.)
21. **Candidate shortlist — Fit-Match cards** [AI][★] — match-score cards per candidate.
22. **Fit-Match deep-dive** [AI][★] — dimension bars (Leadership, Cultural Fit, Experience, Technical Skills, Industry), strengths, gaps.
23. **Interview Question Generator** [AI][★] — Behavioural / Competency / Situational questions, scoring guide, must-hit signals, red flags, **PDF export**.
24. **Evaluation Criteria editor + bias overlay** [AI] — editable % weights; AI flags bias in the criteria themselves (firm-size, age, location, vendor-specific).
25. **Employer activity log & reports.**

### 5.4 Case Officer journey
26. **Login (LDAP) + RBAC dashboard** — role/office/state-scoped overview of assigned jobseekers & employers.
27. **Jobseeker case list** — completeness, application activity, ATS status, AI signal score.
28. **Employer oversight** — posted vacancies, PAPD HOR docs, status updates.
29. **Research Hub — Query → Scope → Blueprint** [AI] — NL query, guided clarifying Q&A (chips + free text), editable structured report blueprint.
30. **Research Hub — Generated LMI Report + Explainer** [AI] — exec summary, KPI dashboard, market-demand chart, sourced data table (e.g., "17 pages, 377 sources"), radar (skill readiness), L&D roadmap, pipeline/sourcing strategy, right-side Report Explainer chatbot.
31. **Intervention notes + outcome tracking** — activity log, placements, hired/reject stats.

---

## 6. Cross-cutting interaction patterns

These patterns apply identically across both concepts. They are the "how it behaves" layer.

### 6.1 The AI results panel (signature pattern)
Per the brief, **all AI responses appear in a right-side chat/results panel** alongside the main content — never a modal that hides context. This is the platform's signature AI interaction. The panel:
- Slides in from the right, ~380–420px wide on desktop; full-screen sheet on mobile.
- Has a header with the assistant working label + a model/version-neutral subtitle.
- Streams responses; supports follow-up questions.
- **Every AI claim carries a "Why" affordance** — an expandable rationale (source, signal, market data) satisfying AIGE/Explainable-AI.
- On mobile, becomes a bottom sheet or full-screen step, preserving the same content order.

### 6.2 Pre-login floating chatbot
- Floating launcher (bottom-right), unobtrusive, on public pages.
- Expands to a compact panel: ask questions, discover jobs, understand services.
- Clear "for full features, create an account" CTA — converts curiosity to registration.
- Distinct from the logged-in standalone AI pages (those are full screens).

### 6.3 Persistent context & filter retention
- Search filters, scroll position, and selection state survive navigation (apply → back to results = state intact). Directly solves the flagged jobseeker pain point.
- Applies to candidate shortlists on the employer side too.

### 6.4 Explainability (AIGE)
- "Why" / "How this was calculated" is available on every score, match, flag, and suggestion.
- Bias flags always pair the flag with a concrete suggested rewrite (never just "this is biased").
- Tracked-change UI for CV/JD edits: original struck, suggestion inline, accept/reject per item.

### 6.5 Scoring visualisations
- Career Signal Score & JD Score: single large number + qualitative band ("Competitive", "Strong") + compact gauge.
- Fit-Match dimensions: horizontal bars with % and label; no decorative chartjunk.
- LMI reports: restrained charts (bar, radar, line), data tables with visible sources.

### 6.6 Onboarding & gamification
- Multi-step onboarding with a progress indicator; each step single-purpose.
- Profile-completion ring + milestone badges; "next best action" nudges.
- Rewards surface for interview attendance — voucher cards, clear eligibility, no clutter.

### 6.7 Accessibility & bilingual
- WCAG AA contrast minimum; visible focus states; 44px min touch targets.
- EN/BM toggle in header; layouts tolerate ~30% string expansion (BM runs longer).
- Keyboard-navigable AI panels; screen-reader labels on scores and flags.

### 6.8 Responsive behaviour
- Desktop-first dashboards degrade gracefully: right-panel AI → bottom sheet; multi-column → stacked; data tables → card lists on mobile.
- Same UX and flow on the mobile app (the brief requires mobile parity in journey, not pixel identity).

---

## 7. Demo build priority (what to code first)

Given the 10th June working-prototype target and the non-technical audience, build the **end-to-end narrative spine** before breadth.

**Tier 1 (must demo):**
1. Home (feedback-driven redesign) + pre-login floating chatbot
2. Jobseeker: Dashboard → Career Signal → CV Positioning → CV Edits/PDF (the CeeVee spine)
3. Employer: JD Analysis → Bias Detection → Fit-Match → Interview Q's (the Atlas spine)

**Tier 2 (strengthen the story):**
4. Jobseeker onboarding + enriched profile (certs, badges, AI training recs)
5. Application tracker with persistent state
6. Events & Training + interview-attendance rewards

**Tier 3 (if time):**
7. Case Officer Research Hub (query → blueprint → LMI report + explainer)
8. Evaluation-criteria bias editor

Render primary business + AI screens; not every screen needs to exist for the proposal.

---

## 8. Content & copy direction

- **Tone:** clear, plain, supportive, public-service-professional. Short sentences. No jargon. BM-ready.
- **Headlines** state value, not features: "Find the job you're meant for" over "AI-powered semantic search engine".
- **AI copy** frames the assistant as a helper: "Here's how to strengthen your profile" not "Algorithm output".
- **No live counters** on the home page (per feedback). Use evergreen claims and program promotion instead.
- **CTAs** are verbs and specific: "Create your profile", "Analyse my CV", "Register for the Career Carnival".
- **Trust signals:** PERKESO/SOCSO backing, free for jobseekers, data stays on-prem, accessibility tools.
- **Bilingual:** every label has an EN and BM form; never hard-code width to EN.

---

## 9. Reference map (where each requirement comes from)

| Source | What it gave us |
|---|---|
| Pre-demo Q&A doc | Audience, differentiators, journey priority, pain points, benchmarks, constraints, 10 June deadline |
| PERKESO AI Journey brief (deck) | 3 journeys, ~30 screens, AI step-by-step outputs, right-panel pattern, on-prem, AIGE, no-tenderer-logo, placeholder agent names |
| Client feedback (latest) | Home strategy, profile enrichment, gamification, interview-incentive rewards, pre-login chatbot, "no Gov" branding |
| RFP module tables (Images 1–3) | Landing-page modules (quick search, community, career fairs, top employers, reviews, success stories, multilingual, AI chatbot) + Event module (vacancy showcase, AI engagement, smart discovery, event management) |
| Live site (myfuturejobs.gov.my) | Brand wordmark, EN/BM, PERKESO contact, existing programs (Career Fairs, MYCEC, training, jobseeker categories), app presence |

---

*End of Document 1. Proceed to Document 2 (Concept A) and Document 3 (Concept B).*
