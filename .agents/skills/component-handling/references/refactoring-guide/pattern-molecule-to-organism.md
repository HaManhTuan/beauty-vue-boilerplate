# Pattern: Molecule → Organism

## When

Molecule needs to fetch its own data instead of receiving via props.

## Steps

1. Add data fetching (API call via composable)
2. Add loading/error states
3. Move from `molecules/` to `organisms/`
4. Update imports across codebase
5. Simplify parent components (no longer pass data)
