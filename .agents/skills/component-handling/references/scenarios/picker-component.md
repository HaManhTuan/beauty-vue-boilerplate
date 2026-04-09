# Picker

**Examples:** `DateRangePicker`, `DatePicker`, `TimePicker`

## What type of component is this?

Molecule

## Common use purpose

Component to select a value: date range, single date, time. Validates (e.g. end >= start), formats display. May have presets (7 days, this month). Used for filters, forms.

## Naming recommendation

`DateRangePicker`, `DatePicker`, `TimePicker` — or `{Value}Picker`

## Where to place it

`src/components/molecules/{type}-picker/` — e.g. date-range-picker, date-picker

## Can it be used in multiple places?

Yes. Reports, order filters, forms — anywhere date/time selection is needed. Reusable across the app.
