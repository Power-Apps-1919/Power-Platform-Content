---
title: 'Custom Notification'
description: 'Timed success, failure, informational, or upload notification component.'
date: 2026-09-16
tags:
  - components
  - interface
  - notifications
---
# Custom Notification

## Business value
Help users understand what happened after they save, submit, upload, or complete an action. Clear feedback reduces repeat clicks and support questions.

## Best for
- Save and submission confirmations.
- Validation and business-rule messages.
- Short-lived status updates that do not require a full page change.

## What to provide
- `NotificationMessage`: concise, user-friendly message.
- `NotificationType`: success, failure, information, or another supported state.
- `NotificationDurationMilliseconds`: how long the message remains visible.
- `OnOK`: what should happen when the user confirms.

## Getting started
Use `cmp-custom-notification.yml` as a reference while creating or maintaining the equivalent component in a component library or approved source workflow; use plain language, and explain the next action when one is required. Do not use a timed notification for a critical error that users must act on.



