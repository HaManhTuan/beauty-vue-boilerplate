# Common Messages

This document defines **reusable user-facing strings** for Feature Specs (for example, a **Screen messages** subsection). When writing or generating specs, copy the **Message (EN)** text for the matching case. Align list empty states with project table rules (see `.cursor/rules/common-rule-05-table-list.mdc`): use **No matching records found.** for both “no rows in the database” and “search returned no rows”.

---

## HTTP error codes (when to use each)

Use each HTTP error in the situations below. Screen specs and tests should follow these definitions.

| Code | When to use (trigger) |
|------|------------------------|
| **401** | User is not logged in, has been logged out, or the **session/token expired** before the action. |
| **404** | **Resource missing** — data was deleted or never existed (not found in the backend). |
| **403** | **Permission denied** — user is signed in but is not allowed that operation, screen, or resource. |
| **500** | **Other server-side failures** — internal error, database outage, uncaught exception, etc. |
| **409** | **Conflict** — submitted data duplicates an existing record (create/update). |

---

## Message catalog

| Code | Message (EN) | Notes / trigger |
|------|----------------|-----------------|
| Empty table | No matching records found. | List/table has no rows **or** search/filter returned no rows (same copy for both). |
| Add success | Record created successfully. | Toast (or equivalent) after successful create. |
| Edit success | Changes saved successfully. | Toast after successful update. |
| Delete success | Deleted successfully. | Toast after successful delete. |
| Exception 401 | Authentication failed. Please sign in again. | API **401** — not signed in, signed out, or token invalid/expired. |
| Exception 404 | The requested data could not be found. | API **404** — resource deleted or not found. |
| Exception 403 | You do not have permission to perform this action. | API **403** — authenticated but not authorized. |
| Exception 500 | A server error occurred. Please try again later. | API **500** — generic server failure. |
| Export success | Export completed successfully. | Toast after successful export. |
| Copy success | Copied to clipboard successfully. | Toast after successful copy. |
| Amount confirm success | Amount confirmed successfully. | Toast after selling price / amount confirmation (domain-specific). |
| Deposit confirm success | Deposit confirmed successfully. | Toast after deposit confirmation (domain-specific). |
| Request success | Your request has been sent. | Toast after a generic “send request” action. |
| Exception 409 | This record already exists. | API **409** — duplicate / conflict on create or update. |
| Disconnect error | The network connection was lost. Please check your connection. | Offline or transport failure before a normal HTTP response. |

---

## Example: Screen messages table

| Type | Location | Message (EN) | Notes / trigger |
|------|----------|----------------|-----------------|
| Empty state | Table | No matching records found. | No data or no search results → **Empty table** |
| Toast success | After create | Record created successfully. | Create success → **Add success** |
| Toast success | After update | Changes saved successfully. | Update success → **Edit success** |
| Toast success | After delete | Deleted successfully. | Delete success → **Delete success** |
| Error | API 401 | Authentication failed. Please sign in again. | Not signed in / signed out / expired token → **Exception 401** |
| Error | API 404 | The requested data could not be found. | Missing resource → **Exception 404** |
| Error | API 403 | You do not have permission to perform this action. | Permission denied → **Exception 403** |
| Error | API 500 | A server error occurred. Please try again later. | Server error → **Exception 500** |
| Toast success | After export | Export completed successfully. | **Export success** |
| Toast success | After copy | Copied to clipboard successfully. | **Copy success** |
| Toast success | After amount confirm | Amount confirmed successfully. | **Amount confirm success** |
| Toast success | After deposit confirm | Deposit confirmed successfully. | **Deposit confirm success** |
| Toast success | After request send | Your request has been sent. | **Request success** |
| Error | API 409 | This record already exists. | Conflict / duplicate → **Exception 409** |
| Error | Network | The network connection was lost. Please check your connection. | **Disconnect error** |

---

## How to reference this file

- Add `docs/templates/common_messages.md` under **Inputs (source of truth)** in the Feature Spec when these strings apply.
- In each screen’s **Screen messages** table, use the **Message (EN)** value from the catalog for the matching **Code**.
