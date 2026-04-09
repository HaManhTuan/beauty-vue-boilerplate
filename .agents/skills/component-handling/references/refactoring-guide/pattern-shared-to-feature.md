# Pattern: Shared → Feature-Specific

## When

Organism only used in one feature. No reusability achieved.

## Steps

1. Verify single feature usage (search imports)
2. Move to `containers/{feature}/components/`
3. Update imports in feature
4. Add feature-specific logic if needed
5. Remove from shared folder
