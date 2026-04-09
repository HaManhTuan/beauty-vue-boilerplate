# Quick Decision Matrix

Use this table to quickly check which placement fits a component's characteristics.

| Characteristic   | atoms/ | molecules/ | organisms/ | box/ | feature/ |
| ---------------- | ------ | ---------- | ---------- | ---- | -------- |
| Single element   | ✅     | ❌         | ❌         | ❌   | ❌       |
| Combines atoms   | ❌     | ✅         | ✅         | ❌   | ✅       |
| Data fetching    | ❌     | ❌         | ✅         | ❌   | Maybe    |
| Reusable         | ✅     | ✅         | ✅         | ✅   | ❌       |
| Layout only      | ❌     | ❌         | ❌         | ✅   | ❌       |
| Feature-specific | ❌     | ❌         | ❌         | ❌   | ✅       |
| Has Storybook    | ❌     | ✅         | ✅         | ❌   | ❌       |
| Complex logic    | ❌     | ❌         | ✅         | ❌   | Maybe    |

**How to use:** Check which column matches your component's characteristics. If multiple columns match, use reusability and data-fetching to decide.
