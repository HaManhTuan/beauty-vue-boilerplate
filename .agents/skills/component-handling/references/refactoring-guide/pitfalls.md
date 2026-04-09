# Pitfalls

Common mistakes when refactoring components.

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Premature abstraction | Moving to shared "just in case" | Keep feature-specific until actually reused |
| Over-generalization | One component with 20+ props | Split into variants |
| Incomplete refactoring | Component moved but still has feature coupling | Remove ALL feature-specific code |
| Not updating all usages | Some files still import from old location | Search imports: `rg "from.*old-component"`, update systematically |
