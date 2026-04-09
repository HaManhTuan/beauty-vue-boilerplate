# Pattern: Organism → Molecule

## When

Data fetching moved to parent (e.g. for caching, coordination, or parent already has data).

## Steps

1. Extract data fetching to parent
2. Convert to presentation component (accept data via props)
3. Move from `organisms/` to `molecules/`
4. Update parent to fetch and pass data
5. Update imports across codebase
