---
title: "Loading Animation"
description: "Full-screen loading overlay for Canvas App processing states."
date: "2026-09-16"
tags:
  - components
  - interface
  - loading
---

<div class="page-kicker">COMPONENT / INTERFACE</div>

# Loading Animation

Full-screen loading overlay for Canvas App processing states. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp-loading-animation.yml" download="cmp-loading-animation.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Component documentation

# Loading Animation

Full-screen loading overlay for communicating that an app is processing a request.

## Inputs

- `Loading_Text` - Message shown while the app is loading.

## Usage

Import `cmp-loading-animation.yml` into the component library and display it while a load, save, or processing operation is active. Set `Loading_Text` to provide contextual feedback.

## Source preview

```yaml
ComponentDefinitions:
  Loading_Animation:
    DefinitionType: CanvasComponent
    CustomProperties:
      Loading_Text:
        PropertyKind: Input
        DisplayName: Loading_Text
        Description: Specifies the loading message text displayed to users during loading or processing states.
        RaiseOnReset: true
        DataType: Text
        Default: ="Loading, please wait..."
    Properties:
      Height: =App.Height
      Width: =App.Width
    Children:
      - OverlayBackground:
          Control: Rectangle@2.3.0
          Properties:
            BorderColor: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            BorderThickness: =2
            DisabledFill: =RGBA(0, 0, 0, 0.6)
            Fill: =RGBA(0, 0, 0, 0.6)
            FocusedBorderThickness: =4
            Height: =768
            HoverFill: =RGBA(0, 0, 0, 0.6)
            PressedFill: =RGBA(0, 0, 0, 0.6)
            Width: =1366
      - LoadingMessageLabel:
          Control: Label@2.5.1
          Properties:
            Align: =Align.Center
            AutoHeight: =true
            BorderColor: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            BorderThickness: =2
            Color: =RGBA(255, 255, 255, 1)
            DisabledBorderColor: =RGBA(0, 0, 0, 0)
            DisabledColor: =RGBA(161, 159, 157, 1)
            FocusedBorderThickness: =4
            Font: =Font.'Segoe UI'
            Height: =63
            Size: =18
            Text: =Parent.Loading_Text
            Width: =900
            X: =233
            Y: =547
      - LoadingSpinnerImage:
          Control: Image@2.2.3
          Properties:
            BorderColor: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            BorderThickness: =2
            DisabledBorderColor: =RGBA(0, 0, 0, 0)
            DisabledFill: =RGBA(0, 0, 0, 0)
            FocusedBorderThickness: =4
            Height: =515
            HoverBorderColor: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0)
            Image: ='output-onlinegiftools'
            ImagePosition: =ImagePosition.Stretch
            PressedBorderColor: =RGBA(0, 0, 0, 0)
            PressedFill: =RGBA(0, 0, 0, 0)
            Width: =700
            X: =332
            Y: =126
```
