# Panel

**Examples:** `NotificationPanel`, `SettingsPanel`, `FilterPanel`

## What type of component is this?

Organism (when fetches data) or Molecule (when presentation only)

## Common use purpose

Slide-out or overlay panel showing content. May fetch data (notifications), or be purely UI (filters, settings). Usually opened from header/sidebar.

## Naming recommendation

`{Content}Panel` — e.g. NotificationPanel, SettingsPanel, FilterPanel

## Where to place it

**Fetches data:** `src/components/organisms/{content}-panel/`  
**Presentation only:** `src/components/molecules/{content}-panel/`

## Can it be used in multiple places?

**NotificationPanel:** Yes. Header on every page — same panel app-wide.  
**FilterPanel:** Depends. Generic filter panel reusable; feature-specific filter stays in feature.
