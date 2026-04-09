# Decision Flowchart

Step-by-step flow to decide where a component should be placed.

```
START: I need to create/place a component
│
├─ Q1: Is it a single, basic UI element? (button, input, icon, etc.)
│  ├─ YES → Place in atoms/
│  └─ NO → Continue
│
├─ Q2: Is it purely for layout/spacing? (container, grid, stack, etc.)
│  ├─ YES → Place in box/
│  └─ NO → Continue
│
├─ Q3: Does it combine 2+ atoms into a reusable pattern?
│  ├─ YES → Continue to Q4
│  └─ NO → Continue to Q5
│
├─ Q4: Does it fetch data or have complex business logic?
│  ├─ YES → Continue to Q5
│  └─ NO → Place in molecules/
│
├─ Q5: Is it complex with data fetching or significant internal logic?
│  ├─ YES → Continue to Q6
│  └─ NO → Re-evaluate (might be molecules/)
│
├─ Q6: Will it be reused across multiple features?
│  ├─ YES → Place in organisms/
│  └─ NO → Continue to Q7
│
└─ Q7: Is it specific to one feature/module?
   ├─ YES → Place in containers/{feature}/components/
   └─ NO → Re-evaluate from Q3
```
