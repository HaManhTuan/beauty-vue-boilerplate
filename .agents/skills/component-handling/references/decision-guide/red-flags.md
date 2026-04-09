# Red Flags

Signs that component placement or structure is wrong. Fix these immediately.

| Red flag | Problem | Action |
|----------|---------|--------|
| Atoms importing molecules | Violates hierarchy | Atom must not depend on molecule. Re-evaluate structure. |
| Molecules importing organisms | Violates hierarchy | Molecule must not depend on organism. Re-evaluate structure. |
| Shared components importing from containers | Tight coupling | Shared components must not depend on features. Use composition/props. |
| Molecule fetching its own data | Wrong level | Promote to organism or pass data via props. |
| Organism with no internal logic/data | Over-categorized | Likely a molecule. Move down. |

**Import direction:** Only Organisms → Molecules → Atoms. Never reverse.
