---
title: No Multiple Responsibilities in One Component
impact: MEDIUM
impactDescription: split display, mutations, and navigation
tags: anti-patterns, separation-of-concerns, components
---

# anti-multiple-responsibilities

**Category:** Anti-Patterns  
**Impact:** MEDIUM

## Rule

Do not mix display + mutations + navigation in one component. Split responsibilities.

## Why It Matters

- Hard to reuse, tight coupling
- Violates single responsibility

## Incorrect

UserCardWithActions: displays user, handles delete, handles update, navigates — all in one.

## Correct

Split: UserCard (display, receives actions slot) + feature component UserCardWithActions (handles delete/update, passes actions to UserCard).
