# kataJal — Style Guide
> Last updated: May 2026
> Reference this file whenever working on any UI task for kataJal.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Name** | kataJal |
| **Tagline (BM)** | kata-kata bermakna |
| **Tagline (EN)** | meaningful words |
| **Core feeling** | Kagum — like seeing an illuminated manuscript for the first time |
| **Personality** | Warm, literary, trustworthy, dignified — never flashy |
| **Visual DNA** | Hikayat Hang Tuah, old Malay manuscripts, aged leather bookcovers |

### Brand Voice
- Speak with calm authority — like a wise elder, not a social media post
- Never use exclamation marks in UI copy
- Prefer Malay-rooted words in BM mode even for UI labels
- English mode should feel translated from Malay, not born in English

---

## 2. Color Palette

### Dark Mode (Primary — default)
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#1C1208` | Page background — aged leather |
| `--bg-deep` | `#120C05` | Deepest shadow, drawer background |
| `--surface` | `#26180A` | Card surface — slightly lighter leather |
| `--surface-raised` | `#2E1E0D` | Elevated components, hover states |
| `--ink` | `#F0E6D0` | Primary text — warm parchment white |
| `--ink-muted` | `#A89070` | Secondary text, labels, captions |
| `--ink-faint` | `#5C4A30` | Disabled, placeholder text |
| `--accent` | `#C9973A` | Emas gold — primary accent |
| `--accent-bright` | `#E8B84B` | Hover state gold, highlighted elements |
| `--accent-dim` | `#7A5A1E` | Subtle gold tint, borders |
| `--border` | `#3A2510` | Card borders, dividers |
| `--border-accent` | `#6B4A1A` | Accent-tinted borders |
| `--shadow` | `rgba(0,0,0,0.4)` | Card shadows |

### Light Mode (Secondary)
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F5F0E8` | Warm parchment |
| `--surface` | `#FFFDF8` | Card surface |
| `--ink` | `#1A1612` | Near-black ink |
| `--ink-muted` | `#7A6E62` | Secondary text |
| `--accent` | `#B8861E` | Deeper gold for light bg contrast |
| `--border` | `#E0D8CC` | Warm grey border |

### Never use
- Cold blues, purples, or teals
- Pure `#000000` black or `#FFFFFF` white
- Neon or saturated colours of any kind

---

## 3. Typography

### Font Stack
| Role | Font | Fallback |
|---|---|---|
| **Display** (quotes, logo) | `Cormorant Garamond` | `Georgia, serif` |
| **Body** (UI, buttons, labels) | `DM Sans` | `system-ui, sans-serif` |

> Cormorant Garamond is chosen for its calligraphic elegance — it carries the weight of a scribe's hand without being novelty. Use italic weights for quotes specifically.

### Type Scale
| Element | Size | Weight | Style |
|---|---|---|---|
| Logo "kata" | `clamp(2rem, 6vw, 2.8rem)` | 400 | Normal |
| Logo "Jal" | `clamp(2rem, 6vw, 2.8rem)` | 400 | Italic |
| Quote text | `clamp(1.3rem, 4vw, 1.8rem)` | 400 | Italic |
| Author name | `0.82rem` | 500 | Uppercase, tracked |
| Button label | `0.9rem` | 500 | Normal |
| Category label | `0.75rem` | 500 | Uppercase, tracked |
| Tagline | `0.72rem` | 300 | Uppercase, wide tracking |
| Footer | `0.72rem` | 300 | Normal |

### Typography Rules
- Quotes always render in **italic** Cormorant Garamond
- Author names always **uppercase** with `letter-spacing: 0.1em`
- Never use font-weight above 600 — heaviness conflicts with the literary feel
- Line height for quotes: `1.6` — give words room to breathe
- Never centre-align body text blocks longer than one line

---

## 4. Decorative System

kataJal draws from three Malay manuscript traditions:

### 4.1 Khat / Calligraphic Strokes
- Used as: large decorative opening quotation mark (`"`) on cards
- Rendered in accent gold, low opacity (`0.08–0.12`)
- Never interactive, always `pointer-events: none`

### 4.2 Aged Paper Texture
- Subtle noise/grain overlay on background and card surfaces
- Achieved via CSS: `filter: url(#noise)` or SVG `feTurbulence`
- Opacity: `0.04` — felt but never seen consciously
- Creates the sense that the page has lived a life

### 4.3 Batik / Songket Geometry
- Used as: thin repeating border pattern on card edges or drawer header
- Geometric, not floral — angular interlocking shapes
- Colour: `--accent-dim` gold on dark background
- Applied sparingly — one location per screen maximum

### 4.4 Accent Stripe
- A `3px` vertical gold line on the left edge of the quote card
- Represents the binding spine of a manuscript
- Always `--accent` gold colour

---

## 5. Component Specifications

### Quote Card
```
Background:     --surface
Border:         1.5px solid --border
Border radius:  20px
Padding:        clamp(2rem, 6vw, 3rem) clamp(1.75rem, 6vw, 2.75rem)
Shadow:         0 8px 40px rgba(0,0,0,0.4)
Left stripe:    3px solid --accent, top 12% to bottom 12%
Decorative ":   Cormorant Garamond, 9rem, --accent at 0.10 opacity
Min height:     260px
```

### Buttons — Primary (Next Quote)
```
Background:     --surface-raised
Border:         1.5px solid --accent-dim
Border radius:  14px
Padding:        1.05rem 1.5rem
Font:           DM Sans, 0.95rem, weight 500
Color:          --accent-bright
Hover bg:       --accent (gold fill)
Hover color:    --bg-deep
Transition:     200ms cubic-bezier(.4,0,.2,1)
```

### Buttons — Secondary (Copy / Salin)
```
Background:     transparent
Border:         1.5px solid --border
Border radius:  99px (pill)
Padding:        0.45rem 1rem
Font:           DM Sans, 0.78rem, weight 500
Color:          --ink-muted
Hover border:   --accent
Hover color:    --accent
Copied state:   background #1A3320, border #2ecc71, color #4ade80
```

### Language Toggle
```
Container bg:   --surface
Border:         1.5px solid --border
Border radius:  99px
Padding:        0.25rem
Active pill:    background --accent, color --bg-deep
Inactive:       color --ink-muted
Font:           DM Sans, 0.78rem, weight 500, letter-spacing 0.06em
```

### Side Drawer (Categories — future)
```
Width:          280px (mobile), 320px (desktop)
Background:     --bg-deep
Border right:   1.5px solid --border-accent
Animation:      translateX(-100%) → translateX(0), 300ms ease
Header:         Batik/songket pattern strip, --accent-dim
Overlay:        rgba(0,0,0,0.6) backdrop behind drawer
Close gesture:  Swipe left or tap overlay
```

### Toast Notification
```
Background:     --surface-raised
Border:         1px solid --accent-dim
Border radius:  99px
Color:          --ink
Font:           DM Sans, 0.8rem, weight 500
Position:       fixed, bottom 1.8rem, horizontally centred
Animation:      translateY(8px) opacity 0 → translateY(0) opacity 1
Duration:       2200ms visible, 250ms fade
```

---

## 6. Motion & Animation

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Quote transition | Fade + translateY(6px) | 300ms | `cubic-bezier(.4,0,.2,1)` |
| Button hover | Color/background shift | 200ms | `cubic-bezier(.4,0,.2,1)` |
| Button press | `scale(0.97)` | 120ms | `ease` |
| Drawer open | `translateX(-100% → 0)` | 300ms | `cubic-bezier(.4,0,.2,1)` |
| Toast appear | Fade + translateY | 250ms | `cubic-bezier(.4,0,.2,1)` |
| Lang toggle | Background shift | 200ms | `cubic-bezier(.4,0,.2,1)` |

### Animation Rules
- Never animate more than 2 properties simultaneously
- Quote fade feels like **ink slowly appearing** — never snappy
- No bounce, spring, or elastic easing — too playful for this tone
- Respect `prefers-reduced-motion` — all animations off if user requests

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Spacing System

Based on a `0.5rem` (8px) base unit:

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `0.5rem` | Icon gaps, tight padding |
| `--space-sm` | `1rem` | Button padding, small gaps |
| `--space-md` | `1.5rem` | Component internal padding |
| `--space-lg` | `2rem` | Between major sections |
| `--space-xl` | `3rem` | Page-level breathing room |

- Page max-width: `680px`
- Page horizontal padding: `1rem` (mobile), `1.5rem` (desktop)
- Card gap (internal sections): `2rem`

---

## 8. Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| Mobile S | `< 380px` | Reduce font sizes, tighten padding |
| Mobile | `380px – 640px` | Primary design target |
| Tablet | `640px – 1024px` | Card expands, max-width kicks in |
| Desktop | `> 1024px` | Centred layout, no change |

### Mobile-first rules
- Design for 380px screen first, expand outward
- Touch targets minimum `44px × 44px`
- No hover-only interactions — all hover states must have tap equivalents
- Bottom-anchored primary actions for thumb reach

---

## 9. Iconography

- Style: **outline**, 1.5–2px stroke, rounded line caps
- Size: `16px` for inline, `20px` for standalone
- Library: Lucide Icons (matches DM Sans weight feel)
- Colour: always inherits from parent (`currentColor`)
- Never filled icons — too heavy for the literary aesthetic

---

## 10. Content & Copy Rules

### Quote formatting
- Always wrapped in `"` `"` (curly quotes) — never `"` `"`
- Author preceded by `—` em dash with space
- No quote should exceed 3 lines on mobile at base font size
- Prefer quotes that are complete thoughts — no ellipsis truncation

### UI labels
| Element | BM | EN |
|---|---|---|
| Next button | Seterusnya | Next Quote |
| Copy button | Salin | Copy |
| Copied state | Disalin! | Copied! |
| Toast | Petikan disalin ✓ | Quote copied ✓ |
| Tagline | kata-kata bermakna | meaningful words |

### Categories (future — placeholder names)
| BM | EN |
|---|---|
| Hikmat | Wisdom |
| Semangat | Courage |
| Kasih | Love |
| Alam | Nature |
| Agama | Faith |
| Kepimpinan | Leadership |

---

## 11. Do's and Don'ts

### Do
- Lead every design decision with "does this feel like a manuscript?"
- Use gold sparingly — it loses power when overused
- Give text room to breathe — generous line height and spacing
- Test every screen on a real phone before finalising
- Keep the quote as the single hero element on screen

### Don't
- Use cold colours (blues, purples, cool greys)
- Add drop shadows that look digital — keep them warm and diffused
- Use more than 2 typefaces
- Animate the logo or brand mark
- Add features that distract from reading the quote
- Use card carousels or sliders — one quote, full attention

---

## 12. Future Feature Guidelines

### Dark/Light Mode Toggle
- Default: **dark mode** (warm leather)
- Toggle: sun/moon icon, top right area near lang toggle
- Transition: `300ms` background colour crossfade across entire page
- Store preference in `localStorage` key `katajal-theme`

### Categories / Side Drawer
- Trigger: hamburger or "Bab" (chapter) icon, top left
- Drawer slides in from left — like opening a book cover
- Header of drawer: batik geometric strip in gold
- Category list: large serif text, generous line height
- Active category: gold left border, --accent text colour

### Favourites (future)
- Heart icon on quote card, bottom left
- Saved to `localStorage` as JSON array
- Accessible via drawer under "Simpanan" (BM) / "Saved" (EN)

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