---
title: 'Email Popup'
description: 'Email confirmation popup for Power Apps Canvas Apps.'
date: 2026-09-16
tags:
  - components
  - communication
  - email
---
# Email Popup

## Business value
Give users a clear confirmation step before an email is sent. This helps prevent accidental messages and makes the communication process easier to understand.

## Best for
- Approval and notification workflows.
- Customer or colleague communications initiated from an app.
- Processes where recipients and message context should be reviewed first.

## What to provide
- `EmailPopupText`: confirmation message.
- `CC_List`: people to include in copy.
- Confirmation, decline, and close events for your process logic.

## Before you use it
You may need Office 365 Users and Office 365 Outlook. Confirm connector permissions, recipient privacy, and your organisation's email policy before moving to production.

## Getting started
Download `cmp-email-popup.yml`, use the Person layout for people selectors, and connect the confirmation event to the approved email action. Always test with non-production recipients first.

