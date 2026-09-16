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

Confirmation dialog for prompting users before an update, delete, or other important action.

## Inputs and events

- `PopupText` - Message shown in the dialog.
- `onYes` - Event raised when the user confirms.
- `onNo` - Event raised when the user declines.
- `onCancel` - Event raised when the user cancels.

## Usage

Import `cmp-popup.yml`, set `PopupText`, and connect the events to the appropriate action or cancellation formulas.

