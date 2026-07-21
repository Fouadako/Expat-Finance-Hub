---
name: anti-slop-ui-design
description: Frontend design system and engineering rules to eliminate generic AI-generated aesthetics (AI Slop) and enforce distinct, high-craft user interfaces.
---

# High-Craft Front-End Design & Anti-Slop Skill

## Core Philosophy
Achieve **Quality > Speed**. Eliminate generic "AI slop aesthetics" by enforcing strategic design pauses, bold identity choices, atmospheric depth, spatial shadow hierarchies, and deliberate motion before writing any user interface code.

---

## Phase 1: Strategic Pause (Design Thinking Before Code)

Before writing or generating any component/page code, pause and explicitly establish the following four pillars:

1. **Purpose & Audience:** What exact problem does this interface solve? Who is actively using it?
2. **Tone Commitment:** Commit to a bold design direction (e.g., *Organic/Natural*, *Luxury/Refined*, *Editorial/High-Contrast*, *Industrial/Utility*).
3. **Technical Constraints:** Framework limits, UI library boundaries, and performance benchmarks.
4. **The Memorability Question:** *"What single visual or interactive detail will make this interface stand out to a user?"*

---

## Phase 2: The Anti-Slop Guardrails

Strictly avoid generic, low-effort AI layout patterns and tropes.

### 🚫 Banned AI-Slop Tropes
* **Overused Font Families:** Defaulting blindly to `Arial`, `Inter`, or standard system fallbacks without deliberate context.
* **Cliche Color Schemes:** Generic purple-to-pink gradients on dark backgrounds or safe gray-on-white designs lacking context-specific character.
* **Flat, Uniform Cards:** Giving every card, badge, and button the exact same border radius and shadow depth.
* **Unnecessary Motion Chaos:** Adding bouncing, spinning, or uncoordinated hover animations to every element on the page.

---

## Phase 3: Aesthetic & Engineering Rules

### 1. Typography as Identity & Craft
* **Distinctive Selections:** Select characterful, unexpected fonts that elevate the aesthetic and fit the committed tone.
* **Typography Craft (Letter-Spacing Hierarchy):** Use letter-spacing (`letter-spacing` / `tracking`) to communicate text type immediately:
  * **Hero/Display Headings (`-0.01em` to `-0.03em`):** Tight and dense; conveys confidence.
  * **Body Text (`0.01em`):** Slightly open air for comfortable legibility.
  * **Badges & Labels (`0.04em`):** Open breathing room to signal metadata status.
  * **Small Uppercase Tags (`0.08em` to `0.12em`):** Wide stretch for category markers above headings.

### 2. Cohesive Color, Atmosphere & Depth
* **Color with Conviction:** Define a cohesive theme using CSS variables (`var(--accent)`, `var(--bg-tone)`). Favor dominant primary colors paired with sharp, intentional accents rather than timid grays and blues.
* **Visual Atmosphere over Flat Colors:** Use subtle background gradients, radial glows, mesh textures, or structural patterns instead of flat background fills.
* **Glassmorphism & Tapering Dividers:** Use tapered lines (`border-image` or gradient masks) and semi-transparent frosted glass overlays (`backdrop-filter: blur()`) to anchor sections softly without harsh spatial breaks.

### 3. Spatial Shadow Hierarchy
Shadows are structural positioning tools, not decorative additions. They communicate 3D depth and interactivity:

| Spatial Layer | Elevation Target | Shadow Characteristics |
| :--- | :--- | :--- |
| **Base Level** | Static background cards | Soft, wide diffusion with low opacity |
| **Interactive Layer** | Buttons, form inputs | Medium elevation with crisp directional offset |
| **Overlay Layer** | Modals, floating menus, toasts | Strong contrast, multi-tiered directional spread |

### 4. Motion as High-Impact Moments
* **Rule:** Animation must justify its existence. If you cannot articulate *why* an element moves, keep it static.
* **Prioritization:** Prefer **one well-orchestrated page-load reveal with staggered entries** over scattered micro-interactions.
* **Valid Motion Scenarios:**
  * **Card Entrance:** Orients the user that new content has loaded.
  * **Staggered Reveals:** Breaks up simultaneous card rendering to prevent visual overload.
  * **Hover Lift:** Subtly signals interactive readiness (`transform: translateY(-2px)`).
  * **Tactile Feedback:** Immediate compression on active button clicks (`transform: scale(0.98)`).

### 5. Match Complexity to Vision
* **Maximalist Designs:** Require elaborate code, custom shaders/gradients, and multi-stage orchestration.
* **Minimalist Designs:** Demand extreme restraint, perfect grid alignments, precise spacing, and flawless typographic scale.

---

## Pre-Implementation Quality Checklist

Before finalizing any UI component, verify:
* [ ] Has a strategic design pause occurred to define tone and audience?
* [ ] Is the design free of generic purple gradients and standard AI slop tropes?
* [ ] Does the font choice have character suitable for the specific domain?
* [ ] Are letter-spacing and font weights intentionally tuned for headings vs. labels?
* [ ] Is there a clear spatial shadow hierarchy distinguishing background, interactive, and overlay elements?
* [ ] Does every animation serve a functional, orienting purpose?