# Selector

**Examples:** `UserSelector`, `GenderSelector`, `CategorySelector`, `TagSelector`

## What type of component is this?

Organism (when fetches data) or Molecule (when receives options via props)

## Common use purpose

Dropdown/combobox to select one or more options. May fetch options from API or receive via props. Used in forms when user must pick from a list (user, category, status, tag...).

## Naming recommendation

`{Entity}Selector` — e.g. UserSelector, GenderSelector, CategorySelector

## Where to place it

**Fetches data:** `src/components/organisms/{entity}-selector/`  
**Receives options via props:** `src/components/molecules/{entity}-selector/`

## Can it be used in multiple places?

Yes. UserSelector in teams, projects, tasks; CategorySelector in products, articles; GenderSelector in user form. Reusable across the app.
