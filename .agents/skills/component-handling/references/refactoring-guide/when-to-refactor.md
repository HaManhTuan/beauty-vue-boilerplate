# When to Refactor

Signals that indicate a component should be reorganized.

## Up (Feature → Shared)

- Same component used in 2+ features
- Copy-pasting component between features
- Props becoming generic
- Actual reuse request from another feature

## Down (Shared → Feature)

- Organism only used in one feature
- Props becoming feature-specific
- No other features adopted it

## Between Levels

**Molecule → Organism:** Molecule needs to fetch its own data; add complex state management.

**Organism → Molecule:** Data fetching moved to parent; component simplified to presentation only.
