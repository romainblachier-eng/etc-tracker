---
description: CSS animations, transitions, micro-interactions, and visual effects
globs:
  - "**/*.css"
  - "**/*.scss"
  - "**/*.html"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Animations & Visual Effects

## Transition Defaults

```css
/* Use these timing values consistently */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* smooth deceleration */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* balanced */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* bouncy overshoot */

--duration-fast:   0.1s;  /* hover color changes */
--duration-normal: 0.2s;  /* most transitions */
--duration-slow:   0.3s;  /* layout changes, modals */
--duration-slower: 0.5s;  /* page transitions */
```

### Rules
- **Color/opacity changes**: 0.15s ease
- **Transform (scale, translate)**: 0.2s ease-out
- **Layout shifts**: 0.3s ease-in-out
- **Modals/overlays**: 0.3s ease-out
- Never animate `width`, `height`, `top`, `left` — use `transform` and `opacity` only for 60fps

## Micro-interactions

### Hover Effects
```css
/* Subtle lift */
.hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.hover-lift:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

/* Glow border */
.hover-glow { transition: border-color 0.2s, box-shadow 0.2s; }
.hover-glow:hover {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Scale (icons, avatars) */
.hover-scale { transition: transform 0.2s ease; }
.hover-scale:hover { transform: scale(1.05); }

/* Background reveal */
.hover-bg { transition: background-color 0.15s; }
.hover-bg:hover { background-color: var(--surface-2); }
```

### Button Feedback
```css
.btn { transition: all 0.15s ease; }
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0) scale(0.98); }
```

### Link Underlines
```css
/* Animated underline from left */
.link-fancy {
  position: relative;
  text-decoration: none;
}
.link-fancy::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}
.link-fancy:hover::after { width: 100%; }
```

## Entrance Animations

### Fade In Up (for scroll reveals)
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeInUp 0.5s var(--ease-out) forwards;
  opacity: 0;
}
```

### Staggered Children
```css
.stagger > * {
  opacity: 0;
  animation: fadeInUp 0.4s var(--ease-out) forwards;
}
.stagger > *:nth-child(1) { animation-delay: 0s; }
.stagger > *:nth-child(2) { animation-delay: 0.1s; }
.stagger > *:nth-child(3) { animation-delay: 0.2s; }
.stagger > *:nth-child(4) { animation-delay: 0.3s; }
```

### Intersection Observer (JS)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

## Visual Effects

### Glassmorphism (frosted glass)
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Gradient Backgrounds
```css
/* Subtle mesh gradient */
.bg-mesh {
  background:
    radial-gradient(at 20% 80%, rgba(59,130,246,0.15) 0, transparent 50%),
    radial-gradient(at 80% 20%, rgba(139,92,246,0.1) 0, transparent 50%),
    var(--bg);
}

/* Animated gradient */
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.bg-animated {
  background: linear-gradient(-45deg, #0f172a, #1e3a5f, #1a1a2e, #16213e);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
```

### Grain/Noise Texture
```css
.grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

## Performance Rules

1. Only animate `transform` and `opacity` — everything else causes layout recalculation
2. Use `will-change: transform` sparingly and only on elements that animate
3. Prefer CSS animations over JS for simple transitions
4. Use `prefers-reduced-motion` to respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
5. Keep animations under 500ms — users perceive delays over 400ms as slow
6. Never animate on scroll without debouncing or using Intersection Observer
