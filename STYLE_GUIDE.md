# kataJal — Style Guide (Notepad & Pencil Edition)
> Last updated: May 2026
> Reference this file whenever working on any UI/UX or coding task for kataJal.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Name** | kataJal |
| **Tagline (BM)** | kata-kata bermakna |
| **Tagline (EN)** | meaningful words |
| **Core feeling** | Ilham & Fokus — like sitting down with a clean field notebook to write deep thoughts |
| **Personality** | Tactile, literary, minimalist, academic — clean but never sterile |
| **Visual DNA** | Classic school notebooks, ruled writing pads, graphite sketching, yellow pencils |

### Brand Voice
- Calm, intentional, and literary.
- Never use exclamation marks in core UI copy (except dynamic status feedback like "Disalin!").
- Prefer authentic, deep Malay-rooted words in BM mode (`Seterusnya`, `Salin`).
- English mode should feel clean, precise, and academic.

---

## 2. Color Palette (Notepad Theme)

### Core Color Tokens
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F0F4F8` | Screen desk backdrop — soft, low-contrast grey-blue |
| `--notepad-paper` | `#FFFFFF` | Card surface — pure clean white notebook paper |
| `--line-blue` | `#E2E8F0` | Horizontal ruled lines on the paper grid |
| `--margin-pink` | `#FCA5A5` | Left-side vertical notebook margin rule |
| `--ink` | `#2D3748` | Primary text and headers — deep graphite pencil ink |
| `--ink-muted` | `#718096` | Secondary text, captions, inactive labels |
| `--pencil-gold` | `#D97706` | Brand brand accent — classic yellow pencil gold |
| `--border` | `#CBD5E1` | Outlines, components, and default button borders |
| `--shadow` | `rgba(148,163,184,0.15)` | Soft diffused shadows for card layers |

### Success States
| Token | Hex | Usage |
|---|---|---|
| Success BG | `#E6F4EA` | Copy button active fill state |
| Success Border | `#34A853` | Copy button active outline state |
| Success Text | `#137333` | Copy button active text state |

### Never use
- Pure `#000000` deep black for text (always use softer graphite `--ink`).
- Saturated digital neon colors or heavy dark gradients.
- Cold high-tech drop shadows.

---

## 3. Typography

### Font Stack
| Role | Font | Fallback |
|---|---|---|
| **Display** (quotes, logo) | `Cormorant Garamond` | `Georgia, serif` |
| **Body** (UI, buttons, labels) | `DM Sans` | `system-ui, sans-serif` |

### Typography Rules
- Quotes must always render inside curly double quotes (`“` `”`) in **italic** weights.
- Author signatures must be preceded by an em-dash (`—`) and styled with `text-transform: uppercase`.
- Line height within the notepad card must sync perfectly with the background layout grid line-height (`2rem` or `32px`) so that the characters appear to sit exactly on top of the blue lines.

---

## 4. Decorative & Interactive System

### 4.1 Ruled Grid Background
- The main card uses a CSS linear gradient to generate an organic lined-paper effect mimicking a legal pad or school book.
- Spacing metrics: `linear-gradient(var(--line-blue) 1px, transparent 1px)` repeating at `2rem` intervals.

### 4.2 Vertical Margin Line
- A single-pixel vertical rule styled with `--margin-pink` sits exactly `3.5rem` from the left edge of the card.
- All core text elements align left and sit comfortably after this margin wall with an added padding buffer.

### 4.3 Interactive Pencil Cursor
- A dynamic inline SVG element representing a drafting pencil tip anchors to the trailing edge of the active text string.
- During text delivery cycles, the element receives the `.writing` class, which fires a high-frequency shaking rotation (`scribble` keyframes) to simulate live handwriting actions.

---

## 5. Component Specifications

### The Notepad Card

---

*This style guide was defined collaboratively and reflects the soul of kataJal — warm, literary, and deeply rooted in Malay manuscript tradition. Every UI decision should pass one test: does it feel like it belongs in a Hikayat?*


Step 1 — Brain dump your ideas to AI
Just talk freely. Example:

"I want kataJal to feel warm and literary, like a old Malay book. I want it to work on phones. I like dark mode. Maybe add categories one day. I want it to feel trustworthy not flashy."

Step 2 — Tell AI to act as UI expert and ask you questions
Say exactly:

"Act as a senior UI/UX designer. Ask me questions one at a time to help me define a complete style guide for kataJal. Don't generate anything yet — just ask."

The AI will then ask things like:

What 3 words describe the feeling you want?
Who is your target user — students, professionals, general public?
Light mode, dark mode, or both?
What's more important — simplicity or expressiveness?
Any websites or apps you admire visually?