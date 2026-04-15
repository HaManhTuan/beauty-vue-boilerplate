# Data Model Implementation Checklist

## Overview

Use this checklist when implementing a **new domain model** in `src/models/**`, following the rules in `.agents/rules/data-model.md`, `structure.md` and `naming.md`.

**Domain**: `{store|staff|category|...}`  
**Model Name**: `{StoreModel|StaffModel|...}`  
**Location**: `src/models/{domain}.ts` (e.g. `src/models/store.ts`)  
**Related Feature Spec**: `{path/to/fe/spec.md}`  
**Estimated Complexity**: `{Low|Medium|High}`

---

## Required Prerequisites

Before implementing this model, ensure the following are completed:

### 1. Domain & Usage

- [ ] The domain boundary is clear (e.g. Store, Staff, Category).
- [ ] The feature spec defines what data the frontend needs for this domain.
- [ ] You have identified:
  - [ ] Which screens/components will use this model.
  - [ ] Which APIs (endpoints) provide or consume this data.

### 2. API Shape (DTO Awareness)

- [ ] Backend response shapes for this domain are known (at least at a high level).
- [ ] You have decided whether to:
  - [ ] Define explicit DTO interfaces (e.g. `StoreApiDto`), **or**
  - [ ] Treat incoming data as `unknown` and cast inside model helpers.

---

## Flow: Check Before Adding/Changing Fields

Because a data model for a domain may already exist, follow this flow **before** adding anything new:

1. **Check for existing model**
   - [ ] Confirm whether `src/models/{domain}.ts` already exists.
   - [ ] If it exists, open it and review the current `*Model` class.

2. **Compare required fields vs existing fields**
   - [ ] From the feature spec, list the fields the page/feature needs (e.g. `id`, `name`, `status`, etc.).
   - [ ] Check which of these fields are already present on the model.
   - [ ] Identify only the **missing** fields or helpers.

3. **Decide on changes**
   - [ ] If all required fields/helpers already exist:
     - [ ] Do **not** add duplicate or redundant fields.
   - [ ] If some fields/helpers are missing:
     - [ ] Plan to extend the existing model with only the missing pieces (fields, getters, mapping logic).

---

## Implementation Checklist

## 1. Model File & Class

- [ ] Create or update the model file:
  - Path: `src/models/{domain}.ts` (e.g. `src/models/store.ts`).
- [ ] Define the model class:
  - [ ] Class name follows naming rules (e.g. `StoreModel`).
  - [ ] Fields cover everything the frontend needs (not necessarily all DTO fields).
  - [ ] Types are strict and avoid `any` where possible.

---

## 2. Mapping Helpers (Transfer Layer)

**Goal**: Centralize transformation from raw API data (DTO) to the model so that the rest of the app never touches DTO shapes.**

Checklist:

- [ ] `fromApi(dto: unknown): ModelClass` implemented:
  - [ ] Accepts `unknown` or typed DTO (e.g. `StoreApiDto`).
  - [ ] Uses `plainToInstance` or manual mapping to populate fields.
- [ ] `fromApiList(dtos: unknown[]): ModelClass[]` implemented:
  - [ ] Handles empty/undefined arrays gracefully if needed.
- [ ] Optional:
  - [ ] DTO interface(s) defined (e.g. `StoreApiDto`) if you want stronger typing.

---

## 3. Derived / Utility Logic on Models

Checklist:

- [ ] Add computed helpers if they are used in multiple places:
  - [ ] Example: `get displayName()`, `isActive`, `isArchived`, etc.
- [ ] Avoid putting business logic that belongs to services/stores into the model:
  - [ ] Models should stay focused on structure and simple derived properties.

---

## 4. Integration with Core APIs (`src/apis/cores/**`)

Checklist:

- [ ] Core API methods for this domain call the model mapping helpers:
  - [ ] List endpoints use `ModelClass.fromApiList(response.data)`.
  - [ ] Detail endpoints use `ModelClass.fromApi(response.data)`.
- [ ] Core APIs return responses where `data` is already typed as the model (e.g. `StoreModel[]`), not DTOs.
- [ ] No mapping logic is duplicated outside models (core APIs just orchestrate and compose `fromApi*`).

---

## 5. Usage in Hooks, Stores, and Components

Checklist:

- [ ] Service hooks in `src/apis/services/**`:
  - [ ] Treat `response.data` as model instances.
  - [ ] Do not re-map or reshape data beyond what core APIs/models already provide.
- [ ] Pinia stores:
  - [ ] When they store domain data, they type it using model classes/interfaces.
  - [ ] They do not store raw DTOs from the backend.
- [ ] Components:
  - [ ] Rely on models (via hooks/stores) and avoid assumptions about DTO field names.

