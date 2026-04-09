# Form

**Examples:** `UserForm`, `OrderForm`, `ProductForm`

## What type of component is this?

Feature component (when feature-specific) or Molecule (when generic form pattern)

## Common use purpose

Form to create or edit an entity. Has validation, submit, fields specific to the entity. Used in create/edit screens.

## Naming recommendation

`{Entity}Form` — e.g. UserForm, OrderForm, ProductForm

## Where to place it

**Feature-specific:** `src/containers/{feature}/components/{entity}-form/`  
**Generic form pattern:** `src/components/molecules/form-{pattern}/` (rare)

## Can it be used in multiple places?

Usually no. UserForm only in user management; OrderForm only in orders. Each entity has different fields and logic. Keep feature-specific until actually reused.
