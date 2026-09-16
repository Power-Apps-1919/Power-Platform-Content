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

Notification component for displaying timed success, failure, informational, or upload messages.

## Inputs and events

- `NotificationMessage` - Message shown to the user.
- `NotificationType` - Notification variant used for icon and color.
- `NotificationDurationMilliseconds` - Time the notification remains visible.
- `OnOK` - Event raised when the user confirms the notification.

## Usage

Import `cmp-custom-notification.yml`, set the message and notification type, and control visibility using the component properties and event.

