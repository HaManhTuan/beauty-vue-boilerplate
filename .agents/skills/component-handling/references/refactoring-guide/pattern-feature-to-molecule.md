# Pattern: Feature Component → Molecule

## When

Component used in second feature, no data fetching. Pure UI pattern that both features need.

## Steps

1. Remove feature coupling (imports, constants, domain logic)
2. Generalize props (entity-agnostic)
3. Create molecule in `molecules/{name}/`
4. Add Storybook + tests
5. Update original feature to use molecule
6. Update second feature to use molecule
