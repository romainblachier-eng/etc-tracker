---
description: Design system foundations — spacing, colors, typography, shadows
globs:
  - "**/*.css"
  - "**/*.scss"
  - "**/*.html"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Design System Rules

## Spacing Scale (8px grid)

Always use a consistent spacing scale based on multiples of 8:
- `4px` — tight inner padding (badges, tags)
- `8px` — small gaps between inline elements
- `12px` — compact padding
- `16px` — default gap, paragraph margins
- `24px` — section inner padding, card padding
- `32px` — between components
- `48px` — between sections
- `64px` — major section spacing
- `96px` — hero/section vertical padding
- `128px` — page-level vertical rhythm

Never use arbitrary values like 13px, 37px, 55px. Stick to the scale.

## Typography

### Font Stacks
```css
/* System font stack — fast, native feel */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Premium feel — pair with a serif for headings */
--font-heading: "Inter", "SF Pro Display", -apple-system, sans-serif;
--font-body: "Inter", -apple-system, sans-serif;
--font-serif: "Playfair Display", "Georgia", serif;
--font-mono: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
```

### Type Scale (modular, 1.25 ratio)
```
text-xs:   0.75rem  (12px) — captions, badges
text-sm:   0.875rem (14px) — secondary text, labels
text-base: 1rem     (16px) — body text
text-lg:   1.125rem (18px) — lead paragraphs
text-xl:   1.25rem  (20px) — card titles
text-2xl:  1.5rem   (24px) — section subtitles
text-3xl:  1.875rem (30px) — section titles
text-4xl:  2.25rem  (36px) — page titles
text-5xl:  3rem     (48px) — hero titles
text-6xl:  3.75rem  (60px) — display headings
```

### Font Weight Usage
- `300` — large display text only
- `400` — body text
- `500` — UI labels, navigation, subtle emphasis
- `600` — subheadings, card titles, buttons
- `700` — headings, hero titles
- `800/900` — rarely, only for massive display text

### Line Height
- Headings: `1.1–1.25`
- Body text: `1.5–1.7`
- UI elements: `1.25–1.4`

### Letter Spacing
- Large headings (>2rem): `-0.02em` to `-0.04em` (tighten)
- All caps / small text: `0.05em` to `0.12em` (loosen)
- Body text: `0` (default)

## Color System

### Structure
Every project needs:
1. **Primary color** — brand identity, CTAs, links
2. **Neutral scale** — 9 shades from white to near-black for text, borders, backgrounds
3. **Semantic colors** — success (green), warning (amber), error (red), info (blue)
4. **Surface colors** — background, card, elevated surface

### Dark Mode Palette Template
```css
:root {
  --bg:           #0a0a0a;
  --surface:      #141414;
  --surface-2:    #1e1e1e;
  --border:       #2a2a2a;
  --border-hover: #3a3a3a;
  --text:         #fafafa;
  --text-2:       #a1a1a1;
  --text-3:       #6b6b6b;
  --primary:      #3b82f6;
  --primary-hover:#2563eb;
  --accent:       #8b5cf6;
}
```

### Light Mode Palette Template
```css
:root {
  --bg:           #ffffff;
  --surface:      #f8f9fa;
  --surface-2:    #f1f3f5;
  --border:       #e2e8f0;
  --border-hover: #cbd5e1;
  --text:         #0f172a;
  --text-2:       #475569;
  --text-3:       #94a3b8;
  --primary:      #2563eb;
  --primary-hover:#1d4ed8;
  --accent:       #7c3aed;
}
```

### Color Contrast
- Body text: minimum 4.5:1 contrast ratio
- Large text (>18px bold, >24px): minimum 3:1
- Interactive elements: minimum 3:1 against background
- Never put colored text on colored background without checking contrast

## Shadows

### Elevation Scale
```css
--shadow-xs:  0 1px 2px rgba(0,0,0,0.05);
--shadow-sm:  0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
--shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
--shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
--shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.25);
```

### When to Use Shadows
- Cards: `shadow-sm` default, `shadow-md` on hover
- Modals/dialogs: `shadow-xl`
- Dropdowns: `shadow-lg`
- Buttons: `shadow-sm` or none (flat is modern)
- Fixed headers: `shadow-sm` when scrolled

## Border Radius
```css
--radius-sm:   4px;   /* badges, small tags */
--radius-md:   8px;   /* buttons, inputs */
--radius-lg:   12px;  /* cards */
--radius-xl:   16px;  /* large cards, modals */
--radius-2xl:  24px;  /* feature sections */
--radius-full: 9999px; /* pills, avatars */
```

Pick ONE radius style per project: either subtle (4-8px) or rounded (12-16px). Don't mix.
