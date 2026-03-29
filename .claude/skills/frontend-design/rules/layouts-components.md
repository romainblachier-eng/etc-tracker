---
description: Layout patterns, component design, and responsive strategies
globs:
  - "**/*.css"
  - "**/*.scss"
  - "**/*.html"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Layouts & Components

## Layout Principles

### Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
/* Narrow for text-heavy pages */
.container-narrow { max-width: 720px; }
/* Wide for dashboards */
.container-wide { max-width: 1440px; }
```

### Grid Systems
Use CSS Grid for page layouts, Flexbox for component layouts:

```css
/* Auto-responsive grid — no media queries needed */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* Fixed column grids */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

/* Sidebar layout */
.layout-sidebar {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
}
```

### Common Breakpoints
```css
/* Mobile first — default styles are mobile */
@media (min-width: 640px)  { /* sm  — large phones, small tablets */ }
@media (min-width: 768px)  { /* md  — tablets */ }
@media (min-width: 1024px) { /* lg  — laptops */ }
@media (min-width: 1280px) { /* xl  — desktops */ }
@media (min-width: 1536px) { /* 2xl — large screens */ }
```

## Component Patterns

### Cards
```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}
```
- Always add hover states to interactive cards
- Use `border` not `box-shadow` for card outlines (cleaner, more performant)
- Consistent padding: 24px for standard, 32px for featured

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

/* Sizes */
.btn-sm { padding: 6px 12px; font-size: 0.8rem; }
.btn-lg { padding: 14px 28px; font-size: 1rem; }

/* Variants */
.btn-primary   { background: var(--primary); color: white; }
.btn-secondary { background: var(--surface-2); color: var(--text); }
.btn-outline   { background: transparent; border: 1.5px solid var(--border); color: var(--text); }
.btn-ghost     { background: transparent; color: var(--text-2); }

/* States */
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn-primary:hover { background: var(--primary-hover); }
```

### Inputs & Forms
```css
.input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  background: var(--bg);
  color: var(--text);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
.input::placeholder { color: var(--text-3); }

.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-2);
  margin-bottom: 6px;
}
```

### Navigation
```css
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-2);
  text-decoration: none;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.nav-link:hover { color: var(--text); }
.nav-link.active {
  color: var(--text);
  border-bottom-color: var(--primary);
}
```

### Badges & Tags
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  background: var(--primary);
  color: white;
}
.badge-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-2);
}
```

### Hero Sections
- Minimum 40vh height, ideally 60-80vh
- One clear headline (max 8 words)
- One subtitle (max 20 words)
- One or two CTAs (primary + ghost/outline)
- Background: gradient, image with overlay, or solid color
- Never center-align body text longer than 2 lines

### Section Headers
```css
.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary);
  margin-bottom: 12px;
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 16px;
}
.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-2);
  max-width: 600px;
}
```

## Responsive Strategy

1. **Stack on mobile**: multi-column grids → single column below 768px
2. **Reduce padding**: `padding: 96px 0` → `padding: 48px 0` on mobile
3. **Scale typography**: hero h1 from 3rem → 2rem on mobile
4. **Hide secondary content**: show/hide with media queries, not display:none on everything
5. **Touch targets**: minimum 44x44px for interactive elements on mobile
6. **Hamburger menu**: hide nav links behind a toggle below 768px
