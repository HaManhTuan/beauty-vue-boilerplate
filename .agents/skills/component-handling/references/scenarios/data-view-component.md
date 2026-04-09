# Data View

**Examples:** `DataTable`, `UserList`, `ProductList`, list view, table view

## What type of component is this?

Organism

## Common use purpose

Displays a collection of data: table with sort/filter/pagination, or list. Used for users, products, orders — any entity list. May include search, column visibility, export.

## Naming recommendation

`DataTable` — generic table; or `{Entity}List` — e.g. UserList, ProductList when list-style. Keep `DataTable` generic since it works for many entities via props.

## Where to place it

**Generic table:** `src/components/organisms/data-table/`  
**Feature-specific list:** `src/containers/{feature}/components/{entity}-list/`

## Can it be used in multiple places?

**DataTable:** Yes. Users, products, orders — same component, different columns.  
**Feature-specific list:** No — when layout/logic is unique to one feature.
