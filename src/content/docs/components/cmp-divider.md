---
title: divider
description: Reusable divider component for Power Apps Canvas Apps.
date: 2026-09-16
tags:
  - components
  - interface
---

<div class="page-kicker">COMPONENT / INTERFACE</div>

# divider

Reusable YAML source for a Power Apps Canvas App component. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp-divider.yml" download="cmp-divider.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Component documentation

Simple horizontal or vertical divider for separating sections of a Canvas App layout.

## Inputs

- `Orientation` - Use `Horizontal` or `Vertical`.
- `DividerColor` - Divider line color.
- `Thickness` - Line thickness in pixels.
- `Margin` - Spacing before and after the line in pixels.

## Usage

Import `cmp-divider.yml` and set the orientation, color, thickness, and margin to match the surrounding layout.

## Source preview

```yaml
ComponentDefinitions:
  Divider:
    DefinitionType: CanvasComponent
    CustomProperties:
      Orientation:
        PropertyKind: Input
        DisplayName: Orientation
        Description: "Horizontal or Vertical. Use 'Horizontal' or 'Vertical'."
        DataType: Text
        Default: ="Horizontal"
      DividerColor:
        PropertyKind: Input
        DisplayName: Divider Color
        Description: The color of the divider line. Accepts a hex code (e.g., "#CCCCCC") or a named color (e.g., Color.Gray).
        DataType: Text
        Default: ="#CCCCCC"
      Thickness:
        PropertyKind: Input
        DisplayName: Thickness
        Description: The thickness of the divider line in pixels.
        DataType: Number
        Default: =2
      Margin:
        PropertyKind: Input
        DisplayName: Margin
        Description: The margin before and after the divider line in pixels.
        DataType: Number
        Default: =8
      Label:
        PropertyKind: Input
        DisplayName: Label
        Description: Optional label to display at the center of the divider (for horizontal orientation).
        DataType: Text
        Default: =""
    Properties:
      Height: =If(Self.Orientation="Horizontal", Self.Thickness + Self.Margin*2, 80)
      Width: =If(Self.Orientation="Horizontal", 320, Self.Thickness + Self.Margin*2)
    Children:
      - DividerLine:
          Control: Rectangle@1.0.0
          Properties:
            Fill: =ColorValue(If(Divider.Orientation="Horizontal", Divider.DividerColor, Divider.DividerColor))
            Height: =If(Parent.Orientation="Horizontal", Parent.Thickness, Parent.Height-Parent.Margin*2)
            Width: =If(Parent.Orientation="Horizontal", Parent.Width-Parent.Margin*2, Parent.Thickness)
            X: =If(Parent.Orientation="Horizontal", Parent.Margin, (Parent.Width-Parent.Thickness)/2)
            Y: =If(Parent.Orientation="Horizontal", (Parent.Height-Parent.Thickness)/2, Parent.Margin)
      - DividerLabel:
          Control: Label@1.0.0
          Properties:
            Text: =Parent.Label
            Visible: =Parent.Orientation="Horizontal" && !IsBlank(Parent.Label)
            X: =If(Parent.Orientation="Horizontal", Parent.Width/2-60, 0) // Center approx
            Y: =If(Parent.Orientation="Horizontal", (Parent.Height-20)/2, 0)
            Height: =20
            Width: =120 // Fixed width for label
            Color: =ColorValue(Parent.DividerColor)
            Font: =Font.'Open Sans'
            Size: =14
            Fill: =ColorValue("#FFFFFF")
```
