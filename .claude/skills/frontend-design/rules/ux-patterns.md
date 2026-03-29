---
description: UX best practices, accessibility, and common page patterns
globs:
  - "**/*.html"
  - "**/*.css"
  - "**/*.tsx"
  - "**/*.jsx"
---

# UX Patterns & Best Practices

## Page Archetypes

### Landing Page Structure
1. **Hero** — headline + subtitle + CTA + visual (60-80vh)
2. **Social proof** — logos, stats, or testimonials
3. **Problem/Solution** — why this matters
4. **Features** — 3-4 cards or alternating image+text sections
5. **Testimonials/Case studies** — real people, real results
6. **Pricing** (if applicable) — 3 tiers max
7. **FAQ** — accordion style
8. **Final CTA** — repeat the primary call to action
9. **Footer** — nav links, social, legal

### Dashboard Layout
- **Fixed sidebar** (240-280px) with icon+text nav
- **Top bar** with search, user menu, notifications
- **Main content** with breadcrumbs
- **Cards** for KPIs, **tables** for data, **charts** for trends
- Sidebar collapses to icons on tablet, hamburger on mobile

### Blog/Content Layout
- **Max 720px content width** for readability
- **Sticky table of contents** on the right for long articles
- **Progress bar** at the top for reading progress
- **Related posts** at the bottom

## Accessibility (a11y)

### Must-Do
- All images need `alt` text (decorative images: `alt=""`)
- Focusable elements need visible `:focus-visible` outlines
- Color is never the only indicator (add icons, text, patterns)
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<header>`, `<footer>`
- `<button>` for actions, `<a>` for navigation — never the reverse
- Form inputs always have associated `<label>` elements

### Focus Styles
```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
/* Remove outline for mouse clicks */
:focus:not(:focus-visible) { outline: none; }
```

### Skip to Content
```html
<a href="#main" class="skip-link">Skip to content</a>
```
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 8px 16px;
  background: var(--primary);
  color: white;
  border-radius: 4px;
  z-index: 999;
}
.skip-link:focus { top: 16px; }
```

## Common UI Patterns

### Empty States
Never show a blank page. Always provide:
- An illustration or icon
- A short explanation
- A primary action ("Create your first...")

### Loading States
- **Skeleton screens** over spinners (perceived faster)
- Pulse animation on placeholder shapes
- Match the layout of the content being loaded

```css
.skeleton {
  background: linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Toast Notifications
- Position: top-right or bottom-right
- Auto-dismiss after 4-5 seconds
- Include a close button
- Stack vertically with 8px gap
- Slide in from right, fade out

### Modals
- Dark overlay (rgba(0,0,0,0.5))
- Centered, max-width 480-560px
- Close on Escape key and overlay click
- Trap focus inside modal
- Animate: fade overlay + scale content from 0.95

### Tables
- Alternating row colors OR horizontal borders, not both
- Sticky header on scroll
- Right-align numbers, left-align text
- Sortable column headers with arrow indicators
- Responsive: horizontal scroll wrapper on mobile

## Design Quality Checklist

Before delivering any UI:
- [ ] Typography hierarchy is clear (h1 > h2 > h3 > body)
- [ ] Spacing is consistent (8px grid)
- [ ] Colors pass contrast requirements
- [ ] Hover states on all interactive elements
- [ ] Focus styles for keyboard navigation
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] No orphaned text (single words on their own line)
- [ ] Images have alt text
- [ ] Buttons have clear labels (not just "Click here")
- [ ] Forms have validation states (error, success)
- [ ] Loading states for async content
- [ ] Empty states for lists/tables
- [ ] prefers-reduced-motion respected
- [ ] No horizontal scroll at any viewport
