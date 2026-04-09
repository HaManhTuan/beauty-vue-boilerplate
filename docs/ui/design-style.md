# Design style — Editorial minimal · System UI

**Audience:** Designers and engineers building screens on the admin shell.  
**System details:** [`design-system.md`](./design-system.md) (tokens, spacing, type, color).  
**This doc:** Tone, metaphors, principles, and what we deliberately **avoid**.

---

## 1. North star

Build a **reusable admin dashboard** for any domain — CRM, CMS, e-commerce ops, analytics — centered on **data management**, **tables**, **forms**, and **day-to-day workflows**.

The interface should remain **credible and calm** for **5–10 years**: no yearly “re-skin” driven by trend cycles. Progress comes from **clarity and consistency**, not from decorative novelty.

---

## 2. Tone & references

| Dimension | Direction |
|-----------|-----------|
| **Tone** | **Editorial minimal** + **system UI**: quiet confidence, content-first, no ornament. |
| **Mood** | Clean, neutral, **timeless** — feels “finished” and professional, not experimental. |
| **Inspiration** | [Notion](https://notion.so), [Linear](https://linear.app), [Stripe Dashboard](https://stripe.com) — clarity, spacing discipline, fast surfaces, restrained color. |

We borrow **structure and restraint**, not pixel-for-pixel copies. Our differentiation is below (§5).

---

## 3. Design principles

### 3.1 Extreme consistency

- One **accent**, one **radius system**, one **spacing scale** (4px base).  
- Same control heights and label patterns across modules.  
- **Predictable** beats “surprising” for operational software.

### 3.2 Clarity over decoration

- **No** glassmorphism, **no** neumorphism, **no** flashy gradients, **no** hero-style marketing chrome inside the shell.  
- Separation via **whitespace**, **typography**, and **hairline borders** — not via glow or heavy shadow.

### 3.3 Tables first-class

- Tables are a **primary surface**, not an afterthought.  
- **Readable density**: comfortable by default; compact when lists are long (see `design-system.md` §7).  
- **Sticky headers**, sensible column defaults, truncation + tooltip, **tabular figures** for numbers.  
- Interactions feel **fast**: sorting, filtering, pagination stay obvious and low-latency per UX spec.

### 3.4 Forms that respect operators

- Labels, errors, and actions follow a **single vertical rhythm**.  
- Long sessions: avoid loud colors except for **errors**, **warnings**, and **primary actions**.

### 3.5 Accessibility & endurance

- WCAG-minded contrast and focus; readable type at default sizes.  
- **System fonts** and lean motion reduce maintenance and feel native across OSes.

---

## 4. Visual vocabulary (summary)

| Element | Stance |
|---------|--------|
| **Color** | Neutral grays + **one** accent; destructive red only where semantically needed. |
| **Type** | System UI stack; restrained scale; **no** display fonts for dashboard chrome. |
| **Space** | Generous **page** margins; **tighter** inside dense tables — intentional contrast. |
| **Shape** | Small, consistent radii; no arbitrary blob shapes. |
| **Depth** | Flat + border; shadow only for **floating** layers (dropdown, modal). |
| **Motion** | Subtle, short; respect reduced motion. |

---

## 5. Differentiation (what users remember)

1. **Consistency** — Same patterns everywhere; low cognitive load.  
2. **Table usability** — Scannable, sortable, operable without guessing.  
3. **Speed & clarity** — Obvious primary actions; minimal steps to complete tasks.

These are the product’s “brand” more than any logo treatment.

---

## 6. Anti-patterns (do not ship in the shell)

- Gradient meshes, neon accents, or **purple-on-white** clichés.  
- Decorative illustrations behind data-heavy screens by default.  
- More than **one** primary button per view without hierarchy.  
- Animations that delay feedback or obscure content.  
- Custom cursors, grain overlays, or glass panels **for core admin chrome**.

*Marketing landings or one-off campaign pages may diverge **outside** this shell; the **admin frame** stays minimal.*

---

## 7. Relationship to `frontend-design` skill

The [`frontend-design`](../../.agents/skills/frontend-design/) skill often pushes **distinctive** type and bold aesthetics. **This product** intentionally chooses **restraint**:

- **Distinctive** here = **discipline** (spacing, table UX, token hygiene), not flashy visuals.  
- When generating UI, **prefer** this document + [`design-system.md`](./design-system.md) over generic “stand out at any cost” prompts.

---

## 8. Checklist before merge (UI)

- [ ] Uses semantic tokens only (no stray hex in views).  
- [ ] Spacing on the **4px** scale.  
- [ ] Primary actions visually **one** accent path per screen.  
- [ ] Tables: header readable, numeric columns aligned, long text truncated with access to full value.  
- [ ] Focus visible; contrast acceptable for text and interactive states.  
- [ ] No banned styles from §6.
