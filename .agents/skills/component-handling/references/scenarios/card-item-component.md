# Card Item

**Examples:** `ProductCard`, `UserCard`, `OrderCard`, `BudgetCard`

## What type of component is this?

Molecule (when reusable) or Feature component (when feature-specific)

## Common use purpose

Card displaying an entity: image, title, subtitle, actions. Used in lists, grids, catalogs. May have "Add to Cart", "Edit", or other action buttons depending on context.

## Naming recommendation

`{Entity}Card` — e.g. ProductCard, UserCard, OrderCard

## Where to place it

**Reusable:** `src/components/molecules/{entity}-card/` (e.g. product-card)  
**Feature-specific:** `src/containers/{feature}/components/{entity}-card/`

## Can it be used in multiple places?

**Reusable variant:** Yes — e.g. ProductCard in catalog, search, recommendations.  
**Feature-specific variant:** No — e.g. admin ProductCard with edit/delete only in product management.
