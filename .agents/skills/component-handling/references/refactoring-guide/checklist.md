# Refactoring Checklist

## Before

- [ ] Identify all usages of the component
- [ ] Check for feature-specific dependencies
- [ ] Plan new structure and location
- [ ] Consider impact on existing code
- [ ] Have tests in place

## During

- [ ] Create new component structure
- [ ] Remove tight coupling
- [ ] Make props more generic
- [ ] Add/update Storybook story (if shared)
- [ ] Add/update tests
- [ ] Update all imports
- [ ] Update documentation

## After

- [ ] Verify all tests pass
- [ ] Check TypeScript compilation
- [ ] Test in browser
- [ ] Update related components
- [ ] Remove old component
- [ ] Update team documentation
