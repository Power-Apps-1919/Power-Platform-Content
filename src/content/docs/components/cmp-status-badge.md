---
title: "Status Badge"
description: "Compact status badge component with optional label and tooltip."
date: "2026-09-16"
tags:
  - components
  - interface
  - status
---

<div class="page-kicker">COMPONENT / INTERFACE</div>

# Status Badge

Compact status badge component with optional label and tooltip. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp-status-badge.yml" download="cmp-status-badge.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Component documentation

## Business value
Make the state of a record, request, task, or process visible without requiring users to open it.

## Best for
- Approval and delivery stages.
- Active, inactive, pending, or error states.
- Lists and dashboards where space is limited.

## What to provide
- `StatusValue`: the current state.
- `StatusLabel`: an optional user-friendly label.
- `TooltipText`: supporting context.

## Getting started
Download `cmp-status-badge.yml`, use a controlled set of status values, and make sure the meaning is still clear without relying only on colour.

## Source preview

```yaml
ComponentDefinitions:
  StatusBadge:
    DefinitionType: CanvasComponent
    CustomProperties:
      StatusValue:
        PropertyKind: Input
        DisplayName: Status Value
        Description: The status to display (e.g., "Active", "Inactive", "Pending", "Error").
        DataType: Text
        Default: ="Active"
      StatusLabel:
        PropertyKind: Input
        DisplayName: Status Label
        Description: Optional label to display instead of the status value.
        DataType: Text
        Default: =""
      TooltipText:
        PropertyKind: Input
        DisplayName: Tooltip Text
        Description: Tooltip text for additional information about the status.
        DataType: Text
        Default: =""
    Properties:
      Height: =40
      Width: =120
    Children:
      - BadgeContainer:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Height: =Parent.Height
            Width: =Parent.Width
            X: =0
            Y: =0
            Fill: |
             =Switch(
                Lower(StatusBadge.StatusValue),
                "active", RGBA(46, 204, 113, 1),
                "inactive", RGBA(149, 165, 166, 1),
                "pending", RGBA(241, 196, 15, 1),
                "error", RGBA(231, 76, 60, 1),
                RGBA(127, 140, 141, 1)
              )
            RadiusTopLeft: =20
            RadiusTopRight: =20
            RadiusBottomLeft: =20
            RadiusBottomRight: =20
          Children:
            - StatusIcon:
                Control: Classic/Icon@2.5.0
                Properties:
                  Icon: |
                    =Switch(
                      Lower(StatusBadge.StatusValue),
                      "active", Icon.CheckBadge,
                      "inactive", Icon.Blocked,
                      "pending", Icon.Clock,
                      "error", Icon.CancelBadge,
                      Icon.Information
                    )
                  Height: =24
                  Width: =24
                  X: =8
                  Y: =8
            - StatusTextLabel:
                Control: Label@1.0.0
                Properties:
                  Text: =If(!IsBlank(StatusBadge.StatusLabel), StatusBadge.StatusLabel, StatusBadge.StatusValue)
                  Color: =RGBA(255,255,255,1)
                  Font: =Font.'Open Sans'
                  FontWeight: =FontWeight.Bold
                  Size: =16
                  X: =40
                  Y: =8
                  Height: =24
                  Width: =Parent.Width-48
                  Tooltip: =StatusBadge.TooltipText
```
