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

Confirmation popup for composing or sending email from a Power Apps Canvas App.

## Inputs and events

- `EmailPopupText` - Confirmation message shown in the popup.
- `CC_List` - Table of users to include in the CC field.
- `OnYes` - Event raised when the user confirms.
- `OnNo` - Event raised when the user declines.
- `OnClose` - Event raised when the popup closes.

## Usage

Import `cmp-email-popup.yml`, provide the confirmation text and CC table, and connect the events to the email-sending and cancellation logic.

