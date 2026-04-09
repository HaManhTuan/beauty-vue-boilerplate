# Edge Cases

Situations that need special consideration.

## Used in 2 places within same feature

**Question:** Should it be shared (molecules/organisms)?

**Answer:** No. Keep in feature's components folder.

**Reason:** Used twice in one feature does not mean reusable across the app. Wait until a second feature actually needs it.

---

## Might reuse "someday"

**Question:** Should I make it shared now?

**Answer:** No. Keep feature-specific until actually reused.

**Reason:** YAGNI. Premature abstraction is harder to maintain. Move when another feature actually needs it.

---

## Molecule needs data fetching

**Question:** Should it become an organism?

**Answer:** Depends.

- **Simple data:** Keep as molecule, accept data via props. Parent handles fetching.
- **Complex with internal data:** Promote to organism. Handle own data fetching.

---

## Organism only used in one feature

**Question:** Should it stay as organism?

**Answer:** No. Move to feature-specific.

**Reason:** If not reusable, no need for shared folder. Move to `containers/{feature}/components/`.

---

## Feature component used in another feature

**Question:** Where should it go now?

**Answer:** Refactor to appropriate shared folder.

**Steps:**
1. Identify type (molecule vs organism)
2. Remove feature-specific coupling
3. Make configurable via props
4. Move to molecules/ or organisms/
5. Update imports in both features
