---
name: animate
description: Purposeful animations using Animate.css (v4) plus Vue/Tailwind. Use when adding animation, transitions, micro-interactions, motion, or making the UI feel more alive. Default library — https://animate.style/
user-invocable: true
argument-hint: "[target]"
---

Analyze a feature and add motion that improves understanding, feedback, and delight. **This project uses [Animate.css](https://animate.style/)** (`animate.css` on npm) as the default CSS animation library; prefer it for ready-made keyframes before writing custom `@keyframes` or heavy JS libraries.

## Library: Animate.css (v4)

- **Docs & catalog:** [animate.style](https://animate.style/) — entrances, exits, attention seekers, utilities.
- **Install (already in this repo):** `npm install animate.css` — entry imports `import 'animate.css'` (after global styles).
- **v4 breaking change:** all animation classes use the **`animate__` prefix**. Base class: **`animate__animated`**, then one animation name, e.g. **`animate__fadeInUp`**, **`animate__bounce`** (full list on the site).
- **Example (HTML / Vue template):**

```html
<h1 class="animate__animated animate__fadeInDown">Title</h1>
```

- **CSS variables (v4):** tune duration, delay, repeat globally or per element:

```css
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.1s;
}
```

- **Utility classes:** `animate__delay-2s` … `animate__delay-5s`, `animate__slow` / `animate__slower` / `animate__fast` / `animate__faster`, `animate__repeat-1` … `animate__repeat-3`, `animate__infinite` — see [documentation — Utility Classes](https://animate.style/).
- **Accessibility:** Animate.css **respects `prefers-reduced-motion`** (since v3.7.0). **Do not** strip or override that behavior. If you add extra global motion rules, they must still honor reduced motion.
- **Migration from v3:** v4 uses prefixes; for legacy markup without prefix use `animate.compat.css` only when migrating old HTML — **new Vue code should use the default prefixed build** to avoid class clashes ([migration](https://animate.style/#migration-from-v3x-and-under)).
- **Best practices (from the library):** meaningful motion only; avoid animating huge areas or `<html>`/`<body>` (wrap content in a container instead); avoid infinite loops except rare cases; mind **overflow** (moving elements can cause scrollbars — parent `overflow: hidden` when needed); **inline elements** — prefer `inline-block` / flex child when animating.

## Prerequisites (this project)

- Vue 3 + `<script setup lang="ts">`, Tailwind CSS; global styles then **`import 'animate.css'`** in `main.ts`.
- Gather performance constraints and whether users need **reduced motion** (OS setting).
- Optional: align with product “personality” (calm vs playful) — match **Animate.css** choices (e.g. fades/slides vs attention seekers).

---

## Assess Animation Opportunities

1. **Identify static areas**: missing feedback, jarring state changes, unclear hierarchy, missed guidance.
2. **Context**: mobile budget, motion-sensitive users, hero vs many micro-interactions.

If unclear, ask the user. **Always** respect **`prefers-reduced-motion`** (Animate.css does by default; do not break it).

## Plan Animation Strategy

- **Hero moment** — one signature motion (e.g. `animate__fadeIn` / `animate__fadeInUp` on main block).
- **Feedback / transition / delight** layers — use library classes intentionally, not on every node.

**Prefer one orchestrated experience** over scattered animations everywhere.

## Map Patterns to Animate.css + Vue

| Pattern | Animate.css direction | Vue notes |
|--------|------------------------|-----------|
| Entrance | `animate__fadeIn`, `fadeInUp`, `slideInUp`, `zoomIn`, etc. | Add `animate__animated` + one animation class on mount; toggle classes for replay. |
| Exit | `fadeOut`, `slideOutDown`, etc. | Often pair with `animationend` to remove DOM or switch route. |
| Attention | `pulse`, `shakeX`, `tada` (sparingly) | Use for real emphasis per [best practices](https://animate.style/). |
| Repeat / speed | `animate__faster`, `animate__repeat-2`, … | Prefer variables (`--animate-duration`) for consistency. |

**Vue `<Transition>`:** keep using Vue transitions for enter/leave of conditional content; use **Animate.css** classes on inner elements or via `enter-active-class` / `leave-active-class` with copied animation names if you need library keyframes inside transitions.

**Programmatic play (optional):**

```ts
el.classList.add('animate__animated', 'animate__headShake')
el.addEventListener('animationend', () => {
  el.classList.remove('animate__animated', 'animate__headShake')
}, { once: true })
```

## Custom CSS & easing (when not using a preset)

**Durations by purpose:** ~100–150ms micro feedback; 200–300ms UI state; 300–500ms layout; 500–800ms large entrances.

**Custom easing (non-Animate presets):**

```css
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
```

Avoid tacky **custom** bounce/elastic **curves** for generic UI. (Animate.css product names like `bounce` are **keyframes**, not the same as abusing elastic easing everywhere.)

**Performance:** prefer `transform` and `opacity`; avoid animating layout (`width`/`height`/`top`/`left`) when a transform can do the job.

## What to avoid

- Disabling or fighting **Animate.css** / browser **`prefers-reduced-motion`** behavior.
- Sprinkling **attention seekers** (`bounce`, `flash`, …) without purpose — the [library warns](https://animate.style/) they should highlight something special, not “flashiness”.
- Animating **root** (`html`/`body`) — wrap in a `<main>` / div instead.
- **Infinite** repeats by default — distracting.
- Blocking interaction unintentionally during critical motion.

## Verify Quality

- Smooth on target devices; timing feels intentional.
- **Reduced motion:** verify with OS “reduce motion” on.
- Motion **clarifies** or **delights** — not decoration only.

Official reference: [Animate.css documentation](https://animate.style/).
