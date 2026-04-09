# Pattern: Feature Component → Organism

## When

Component used in second feature, HAS data fetching. Both features need the same data-fetching component.

## Steps

1. Extract data fetching to generic hook
2. Make filter/configurable via props
3. Move to `organisms/{name}/`
4. Update original feature to use organism
5. Update second feature to use organism
6. Add Storybook + tests
