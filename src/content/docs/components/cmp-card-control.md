---
title: card-control
description: Reusable card-control component for Power Apps Canvas Apps.
date: 2026-09-16
tags:
  - components
  - visualization
---

<div class="page-kicker">COMPONENT / VISUALIZATION</div>

# card-control

Reusable YAML source for a Power Apps Canvas App component. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp-card-control.yml" download="cmp-card-control.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Component documentation

Reusable summary card component for showing a title, primary value, and configurable text and background colors.

## Inputs

- `HTML_CARD_KEY` - Card title or key label.
- `HTML_CARD_VALUE` - Primary card value.
- `KeyColor` - Color for the title text.
- `ValueColor` - Color for the primary value.

## Usage

Import `cmp-card-control.yml`, then bind the card inputs to the values you want to highlight. Colors accept Power Apps color values or hex strings.

## Source preview

```yaml
ComponentDefinitions:
  Card Control:
    DefinitionType: CanvasComponent
    CustomProperties:
      HTML_CARD_KEY:
        PropertyKind: Input
        DisplayName: Card Title
        Description: The main label or title displayed at the top of the card.
        DataType: Text
        Default: ="Text"
      HTML_CARD_VALUE:
        PropertyKind: Input
        DisplayName: Card Value
        Description: The primary value or content displayed in the card body.
        DataType: Text
        Default: ="100000"
      KeyColor:
        PropertyKind: Input
        DisplayName: Key Color
        Description: The color for the card key/title text. Accepts a hex code (e.g., "#777777") or a named color (e.g., Color.White).
        DataType: Text
        Default: ="#777777"
      ValueColor:
        PropertyKind: Input
        DisplayName: Value Color
        Description: The color for the card value text. Accepts a hex code (e.g., "#222222") or a named color (e.g., Color.White).
        DataType: Text
        Default: ="#222222"
    Properties:
      Fill: =RGBA(0,0,0,0)
      Height: =125
      Width: =200
    Children:
      - CardContainer:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Height: =Parent.Height
            RadiusBottomLeft: =20
            RadiusBottomRight: =20
            RadiusTopLeft: =20
            RadiusTopRight: =20
            Width: =Parent.Width
            X: =0+0
            Y: =0+0
          Children:
            - CardContentHtml:
                Control: HtmlViewer@2.1.0
                Properties:
                  Fill: =RGBA(208, 227, 247, 1)
                  Font: =Font.'Open Sans'
                  Height: =Parent.Height
                  HtmlText: | 
                    =$"<div style='
                        height:100%; width:100%;
                        display:flex; flex-direction:column; align-items:center; justify-content:center;
                        background:transparent;
                        font-family:Segoe UI, Arial, sans-serif; position:relative;'>
                        <div style='
                          color:{'Card Control'.KeyColor}; font-size:22px; font-weight:600;
                          letter-spacing:1px; margin-bottom:10px;'>
                          {'Card Control'.HTML_CARD_KEY}
                        </div>
                        <button style='
                          background:#fff;
                          font-size:26px; font-weight:bold; color:{'Card Control'.ValueColor};
                          padding:12px 32px;
                          border-radius:10px;
                          box-shadow:0 4px 18px rgba(0,0,0,0.10);
                          text-align:center;
                          border:none;
                          cursor:pointer;
                          transition:box-shadow 0.2s;'>
                          {If(
                              IsNumeric('Card Control'.HTML_CARD_VALUE),
                              Text(Value('Card Control'.HTML_CARD_VALUE), "#,##0"),
                              'Card Control'.HTML_CARD_VALUE
                          )}
                        </button>
                        <button style='
                          position:absolute; top:0; left:0; width:100%; height:100%;
                          background:transparent; border:none; cursor:pointer; z-index:10;'>
                          <span style='display:none;'></span>
                        </button>
                            </div>
                      "
                  Width: =Parent.Width
                  X: =0+0
                  Y: =0+0
```
