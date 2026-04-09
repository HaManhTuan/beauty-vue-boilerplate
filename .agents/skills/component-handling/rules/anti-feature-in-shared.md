---
title: No Feature-Only Components in Shared Folders
impact: CRITICAL
impactDescription: feature components go in containers/{feature}/components
tags: anti-patterns, placement, components
---

# anti-feature-in-shared

**Category:** Anti-Patterns  
**Impact:** CRITICAL

## Rule

Do not put feature-only components in shared folders (molecules/organisms).

## Why It Matters

- Pollutes shared space, misleading location
- Not reusable, breaks other features if changed
- Hard to maintain

## Incorrect

OrderStatusUpdater only used in orders feature → placed in `molecules/`.

## Correct

Place in `containers/orders/components/order-status-updater/`. Feature-specific components stay in feature folder.
