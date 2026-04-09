# Design system — Admin shell

**Scope:** Reusable **admin dashboard** UI (CRM, CMS, e-commerce back office, analytics).  
**Companion doc:** [`design-style.md`](./design-style.md) defines tone, principles, and anti-patterns.  
**Implementation:** Map tokens to **CSS variables** (and Tailwind `@theme` / shadcn semantic tokens) in one place — components consume **semantic** names only (`background`, `foreground`, `muted`, `accent`, …), not raw hex in views.

---

## 1. Foundations

| Layer | Rule |
|-------|------|
| **Grid** | Base **4px** spacing unit; all spacing is a multiple of 4 (`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`). |
| **Density** | Default **comfortable**; optional **compact** for data-heavy tables (see §7). |
| **Radius** | Small and consistent: **6px** (inputs, buttons), **8px** (cards, panels), **10px** (modals) — avoid pill-only or oversized radii as default. |
| **Borders** | **1px** hairline; color from `--border` (subtle, never heavy frames). |
| **Shadow** | **Minimal** — prefer border + background separation over shadow; at most one restrained elevation level for overlays (see §6). |

---

## 2. Color tokens

**Strategy:** Neutral **gray** scale + **one accent** for primary actions, links, and focus rings. No gradients for chrome; no decorative color noise.

### 2.1 Semantic roles (light theme)

Use these names in code; map to OKLCH/hex in theme file.

| Token | Role |
|-------|------|
| `--background` | App canvas (slightly off-white acceptable, e.g. warm gray `#FAFAFA`) |
| `--foreground` | Primary text |
| `--muted` | Secondary surfaces (sidebars, table stripes optional) |
| `--muted-foreground` | Secondary text, placeholders, captions |
| `--border` | Dividers, table lines, input outlines |
| `--input` | Input background (often same as `--background` or `--card`) |
| `--ring` | Focus ring (accent-tinted or neutral; must pass WCAG focus visibility) |
| `--card` | Raised panels (cards, popovers) |
| `--accent` | **Single accent** — primary buttons, active nav, key links |
| `--accent-foreground` | Text/icons on accent |
| `--destructive` | Errors, delete (red; keep saturation restrained) |
| `--destructive-foreground` | Text on destructive |

### 2.2 Gray scale

Provide **at least** 9 steps for UI (e.g. 50–900) with predictable contrast:

- **50–100:** backgrounds, hover on rows  
- **200–300:** borders, disabled borders  
- **400–500:** tertiary text, icons idle  
- **600–700:** secondary text  
- **800–900:** primary text, strong emphasis  

### 2.3 Accent (brand hue vs neutral hover)

- Pick **one** hue (blue, teal, or violet — choose once per product).  
- Use **solid** fills for primary buttons; avoid gradient buttons.  
- **Do not** use the brand hue for large background areas — reserve it for primary actions, key links, focus rings, and **active nav** highlights.

**Implementation in this repo (`src/style.css`):**

| Token | Role |
|-------|------|
| `--primary` / `--primary-foreground` | Brand **hue** — primary `Button`, important CTAs. |
| `--ring` | Focus ring — same hue family as `--primary` for visibility. |
| `--accent` / `--accent-foreground` | **Neutral** hover surfaces only (nav hover, ghost buttons) — **not** the brand color. |

This matches shadcn-vue semantics while keeping §2.3’s “single accent hue” on **`primary`**, not on muted panels.

### 2.4 Dark theme (optional but recommended)

Mirror semantic tokens; reduce pure `#000` canvas — use **dark gray 900–950** for `--background`, slightly lifted `--card`, and **borders lighter than background** (alpha white hairlines). Keep the same accent family with adjusted lightness for contrast.

**Implementation:** Tailwind `darkMode: ['class']` + class **`dark`** on `<html>`. Toggle via **`ThemeToggle`** (`useDark` from VueUse, key `localStorage['admin-dashboard-color-mode']`). `color-scheme: light | dark` on `html` is set in `src/style.css` for native controls/scrollbars.

---

## 3. Typography

**Intent:** **System UI** stack — fast load, native feel, long-session readability (Notion / Linear / Stripe-style restraint).

### 3.1 Font stacks

```text
/* Sans — UI & tables */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;

/* Mono — IDs, codes, JSON (optional) */
font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

### 3.2 Scale (rem)

| Token / use | Size | Line height |
|-------------|------|-------------|
| Page title | 1.25–1.5rem (20–24px) | 1.3 |
| Section title | 1.125rem (18px) | 1.35 |
| Body | 0.875–1rem (14–16px) | 1.5–1.6 |
| Small / table header | 0.75–0.8125rem (12–13px) | 1.4 |
| Micro (badges, meta) | 0.6875–0.75rem (11–12px) | 1.35 |

- **Body** default: **14px** (`0.875rem`) for dense admin — set on `body` in `src/style.css`; allow **16px** for marketing-style pages via local `text-base` where needed.  
- **Tabular numbers** (`font-variant-numeric: tabular-nums`) for **numeric columns** in tables — use `tabular-nums`, `font-tabular`, or `ds-tabular-nums` (see §4.1.1).  
- **Max line length** for prose in panels: ~65–75ch where applicable.

### 3.3 Weights

- **400** body, **500** emphasis and table headers, **600** page titles and key labels. Avoid **700+** except rare emphasis.

---

## 4. Spacing & layout

### 4.1 Spacing scale (4px base)

| Step | px | Typical use |
|------|-----|-------------|
| 1 | 4 | Tight icon gaps, inline field padding |
| 2 | 8 | Between related controls, cell padding (compact) |
| 3 | 12 | Form field vertical rhythm |
| 4 | 16 | Section padding, card padding |
| 5 | 20 | Page section gaps |
| 6 | 24 | Page padding, modal padding |
| 8 | 32 | Major section separation |
| 10 | 40 | Page gutters (wide layouts) |

### 4.1.1 Tailwind mapping (this project)

Default Tailwind spacing is already **4px-based** (`theme.spacing[1] = 0.25rem`). Prefer multiples of **4px** in all layouts.

| Doc step | px | Tailwind spacing key | Example utilities |
|----------|-----|----------------------|-------------------|
| 1 | 4 | `1` | `p-1`, `gap-1`, `m-1` |
| 2 | 8 | `2` | `p-2`, `gap-2` |
| 3 | 12 | `3` | `gap-3`, `space-y-3` |
| 4 | 16 | `4` | `p-4`, `gap-4` |
| 5 | 20 | `5` | `gap-5` |
| 6 | 24 | `6` | `p-6` (page padding) |
| 8 | 32 | `8` | `gap-8` |
| 10 | 40 | `10` | `gap-10` |
| 12 | 48 | `12` | `p-12` |
| 16 | 64 | `16` | `p-16` |

**Explicit aliases** (optional, same values): `ds-1` … `ds-16` in `tailwind.config.js` → e.g. `p-ds-6` = 24px.

**Tabular figures (§3.2, §7):**

- Tailwind: `tabular-nums` or `font-tabular` (extended in `tailwind.config.js`).  
- CSS utility alias: `ds-tabular-nums` in `src/style.css` for numeric table columns.

### 4.2 Shell layout

- **Sidebar:** fixed width **240–280px** (collapsible optional); single column nav, clear active state.  
- **Top bar:** **56–64px** height; bottom border only, no heavy shadow.  
- **Content:** max width **1280–1440px** for forms; tables may **full-bleed** within content area with horizontal scroll on small screens.  
- **Page padding:** **24px** horizontal default; **16px** on mobile.

---

## 5. Components (token-level expectations)

| Pattern | Rule |
|---------|------|
| **Buttons** | Primary = solid accent; secondary = outline or ghost on neutral; destructive = dedicated token. Heights **32 / 36 / 40px** tiers. |
| **Inputs** | 1px border, **8px** radius, clear focus ring (`ring-2` or equivalent). Placeholder uses `--muted-foreground`. |
| **Tables** | Header row: muted background or bottom border only; row height **40–44px** (comfortable), **36px** (compact); zebra optional, very subtle. |
| **Cards** | Border-first; shadow only if needed for float above page. |
| **Tags / badges** | Neutral background + darker text; accent badge reserved for “status: primary”. |

---

## 6. Elevation & z-index

- **z-index scale:** dropdown < sticky header < modal backdrop < modal < toast < tooltip (document exact numbers in theme).  
- **Shadow:** use **one** soft shadow for popovers/modals, e.g. `0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)` — no large diffuse shadows.

---

## 7. Data density

| Mode | When | Adjustments |
|------|------|-------------|
| **Comfortable** | Default editing, forms | 40–44px row, 16px page padding |
| **Compact** | Long lists, many columns | 36px row, smaller vertical gaps, 12px horizontal cell padding |

- Prefer **horizontal scroll** with sticky first column over crushing column width.  
- **Truncate** with tooltip for long text; **tabular nums** for numbers.

### 7.1 Implementation (this repo)

- Set **`data-density="comfortable"`** or **`data-density="compact"`** on the shell **`<main>`** (`DashboardLayout`). Variables **`--ds-shell-padding`**, **`--ds-table-cell-px`**, **`--ds-table-cell-py`** are defined in `src/style.css` per mode.
- Wrap operational tables with **`class="ds-data-table"`** on shadcn **`<Table>`** so cell padding follows density (overrides default `p-2` from `TableCell` / `TableHead`).
- Optional zebra: add **`ds-data-table-zebra`** on the same table (avoid combining with sticky first column unless row backgrounds are aligned).
- Example screen: **`/table-demo`** (`TableDemo.vue`) — skeleton rows, sticky first column, **`ds-tabular-nums`** on amounts, density toggles (Pinia **`useUiStore().dataDensity`**).

---

## 8. Motion

- **Minimal:** 150–200ms ease-out for panels, dropdowns, row expand.  
- **No** playful bounces on core chrome.  
- Respect **`prefers-reduced-motion`** (reduce or disable non-essential transitions).

---

## 9. Accessibility

- Text/background contrast **≥ WCAG AA** for body; **AAA** where cheap (large titles).  
- **Visible focus** on all interactive elements; never `outline: none` without replacement.  
- Touch targets **≥ 44×44px** where primary (or padding to hit area).  
- Table **header** `<th>` scope and row associations for screen readers in implementation.

---

## 10. Governance

- New UI **must** use semantic tokens from this file.  
- **No** one-off hex in feature code — extend tokens if a new role is needed.  
- Review **yearly** for contrast and density; avoid chasing yearly UI trends in the shell chrome.

---

## 11. File ownership

| Deliverable | Owner |
|-------------|--------|
| Token values (light/dark) | Theme / `style.css` / Tailwind `@theme` |
| shadcn-vue alignment | `components/ui` + CSS variables |
| This document | Product + frontend lead |
