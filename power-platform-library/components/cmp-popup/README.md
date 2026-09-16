---
title: 'Popup'
description: 'Confirmation dialog component for important Canvas App actions.'
date: 2026-09-16
tags:
  - components
  - interface
  - dialogs
---
# Popup

## Business value
Protect important business actions by asking users to confirm before the app changes or removes information.

## Best for
- Delete, submit, approve, reject, or reset actions.
- Changes that cannot easily be undone.
- Processes where a final review reduces mistakes.

## What to provide
- `PopupText`: the action and its consequence in plain language.
- `onYes`, `onNo`, and `onCancel`: the process responses.

## Getting started
Download `cmp-popup.yml`, name the action clearly, explain the consequence, and make the safe choice easy to understand. Never rely on colour alone to distinguish actions.

