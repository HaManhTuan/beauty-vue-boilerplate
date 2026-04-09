# Badge

**Examples:** `StatusBadge`, `OrderStatusBadge`, `CountBadge`

## What type of component is this?

Molecule (generic) or Feature component (entity-specific)

## Common use purpose

Small label showing status, count, or tag. Status: pending, completed; Count: unread; Tag: category. Color varies by value.

## Naming recommendation

`StatusBadge` — generic; `{Entity}StatusBadge` — e.g. OrderStatusBadge when logic is order-specific

## Where to place it

**Generic:** `src/components/molecules/status-badge/`  
**Entity-specific:** `src/containers/{feature}/components/{entity}-status-badge/`

## Can it be used in multiple places?

**StatusBadge:** Yes. Orders, shipments, tasks, tickets — any entity with status.  
**OrderStatusBadge:** No. Only order management when colors/icons are order-specific.
