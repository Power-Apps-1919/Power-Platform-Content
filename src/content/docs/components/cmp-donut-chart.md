---
title: donut-chart
description: Reusable donut-chart component for Power Apps Canvas Apps.
date: 2026-09-16
tags:
  - components
  - visualization
---

<div class="page-kicker">COMPONENT / VISUALIZATION</div>

# donut-chart

Reusable YAML source for a Power Apps Canvas App component. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp-donut-chart.yml" download="cmp-donut-chart.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Source preview

```yaml
ComponentDefinitions:
  cmp_DonutChart:
    DefinitionType: CanvasComponent
    AllowCustomization: true
    CustomProperties:
      Config:
        PropertyKind: Input
        DisplayName: Config
        Description: Layout and behavior config record
        RaiseOnReset: true
        DataType: Record
        Default: |-
          ={
            Size: { Width: 360, Height: 300 },
            Donut: { Cx: 180, Cy: 120, Stroke: 38, Radius: 78, Rotation: -90 },
            Labels: { Offset: 12, BoxHeight: 18, PadX: 8, BoxCharPx: 7 },
            Legend: { Y: 270, RowH: 20, Box: 12, BoxGap: 8, Gap: 25, CharPx: 7, Margin: 20 },
            Center: { Text: Blank(), SubText: "Total Licenses" }
          }
      Items:
        PropertyKind: Input
        DisplayName: Items
        Description: Donut slices table. lbl, val, col
        RaiseOnReset: true
        DataType: Table
        Default: |
          =[
            {lbl:"Assigned",val:1250,col:"#0D47A1"},
            {lbl:"Available",val:780,col:"#1B5E20"},
            {lbl:"Expiring",val:320,col:"#B71C1C"},
            {lbl:"Unused",val:150,col:"#616161"}
          ]
      Theme:
        PropertyKind: Input
        DisplayName: Theme
        Description: Theme record
        RaiseOnReset: true
        DataType: Record
        Default: |-
          ={
            Colors: {
              Background: "#FFFFFF",
              Text: "#111111",
              SubText: "#666666",
              DonutTrack: "#FFFFFF",
              LabelBoxFill: "#F2F2F2",
              LabelBoxStroke: "#D0D0D0"
            },
            Font: {
              Family: "Segoe UI",
              CenterSize: 20,
              SubSize: 11,
              LabelSize: 12,
              LegendSize: 12
            }
          }
      fnModel:
        PropertyKind: Action
        DisplayName: Model
        Description: Returns resolved config/theme + computed slices + legend layout
        ReturnType: Record
      testnuminput:
        PropertyKind: Input
        DisplayName: testnuminput
        Description: A custom property
        DataType: Number
        Default: =100
    Properties:
      OnReset: =Set(fnmodel_result,Self.fnModel());
      fnModel: |-
        =With(
          {
            it: Self.Items,
            t:  Self.Theme,
            cfg:Self.Config
          },
          With(
            {
              // --- resolved sizes/layout ---
              w: Coalesce(cfg.Size.Width, 360),
              h: Coalesce(cfg.Size.Height, 300),

              cx: Coalesce(cfg.Donut.Cx, 180),
              cy: Coalesce(cfg.Donut.Cy, 120),
              st: Coalesce(cfg.Donut.Stroke, 38),
              r:  Coalesce(cfg.Donut.Radius, 78),
              rot:Coalesce(cfg.Donut.Rotation, -90),

              // legend
              legY: Coalesce(cfg.Legend.Y, 270),
              rowH: Coalesce(cfg.Legend.RowH, 20),
              box:  Coalesce(cfg.Legend.Box, 12),
              boxGap: Coalesce(cfg.Legend.BoxGap, 8),
              gap:  Coalesce(cfg.Legend.Gap, 25),
              legChar: Coalesce(cfg.Legend.CharPx, 7),
              legMargin: Coalesce(cfg.Legend.Margin, 20),

              // label box
              labOff: Coalesce(cfg.Labels.Offset, 12),
              boxH:   Coalesce(cfg.Labels.BoxHeight, 18),
              padX:   Coalesce(cfg.Labels.PadX, 8),
              pctChar:Coalesce(cfg.Labels.BoxCharPx, 7),

              // center
              cTxtParam: cfg.Center.Text,
              cSub: Coalesce(cfg.Center.SubText, "Total Licenses"),

              // theme
              bg: Coalesce(t.Colors.Background, "#FFFFFF"),
              tx: Coalesce(t.Colors.Text, "#111111"),
              sub: Coalesce(t.Colors.SubText, "#666666"),
              track: Coalesce(t.Colors.DonutTrack, "#FFFFFF"),
              bFill: Coalesce(t.Colors.LabelBoxFill, "#F2F2F2"),
              bSt: Coalesce(t.Colors.LabelBoxStroke, "#D0D0D0"),

              fam: Coalesce(t.Font.Family, "Segoe UI"),
              fC: Coalesce(t.Font.CenterSize, 20),
              fS: Coalesce(t.Font.SubSize, 11),
              fL: Coalesce(t.Font.LabelSize, 12),
              fG: Coalesce(t.Font.LegendSize, 12),

              // typed table
              base:
                ForAll(
                  Table(ParseJSON(JSON(it, JSONFormat.Compact))) As j,
                  {
                    lbl: Coalesce(Text(j.Value.lbl), ""),
                    val: Value(Coalesce(Text(j.Value.val), "0")),
                    col: Coalesce(Text(j.Value.col), "#616161")
                  }
                )
            },
            With(
              { tot: Sum(base, val) },
              With(
                {
                  centerText: If(IsBlank(cTxtParam), Text(tot, "#,##0"), cTxtParam),
                  slices:
                    AddColumns(
                      base As b,
                      pct,
                      If(tot = 0, 0, Round(b.val / tot * 100, 1))
                    )
                },
                With(
                  {
                    n: CountRows(slices),
                    circ: 2 * Pi() * r,
                    labelR: r + (st / 2) + labOff,

                    avgLen: Sum(slices, Len(lbl)) / Max(1, CountRows(slices)),
                    itemW: box + boxGap + (Sum(slices, Len(lbl)) / Max(1, CountRows(slices)) * legChar) + gap,
                    perRow: Max(1, RoundDown((w - legMargin) / (box + boxGap + (Sum(slices, Len(lbl)) / Max(1, CountRows(slices)) * legChar) + gap), 0))
                  },
                  {
                    W:w, H:h,
                    Cx:cx, Cy:cy, St:st, R:r, Rot:rot,
                    LegY:legY, RowH:rowH, Box:box, BoxGap:boxGap, Gap:gap,
                    BoxH:boxH, PadX:padX, PctChar:pctChar,
                    Circ:circ, LabelR:labelR,
                    Bg:bg, Tx:tx, Sub:sub, Track:track, BoxFill:bFill, BoxSt:bSt,
                    Fam:fam, FC:fC, FS:fS, FL:fL, FG:fG,
                    CenterText:centerText, CenterSub:cSub,
                    PerRow:perRow, ItemW:itemW,
                    Slices:slices
                  }
                )
              )
            )
          )
        )
    Children:
      - img_DonutSvg:
          Control: Image@2.2.3
          Properties:
            Height: =Parent.Height
            Image: |-
              =With(
                {
                  M: fnmodel_result,
                  S: fnmodel_result.Slices
                },
                With(
                  { n: CountRows(S) },
                  "data:image/svg+xml;utf8," &
                  EncodeUrl(
                    $"
                  <svg xmlns='http://www.w3.org/2000/svg' width='{M.W}' height='{M.H}' viewBox='0 0 {M.W} {M.H}'>
                    <rect width='{M.W}' height='{M.H}' fill='{M.Bg}'/>

                    <!-- Donut -->
                    <g transform='rotate({M.Rot} {M.Cx} {M.Cy})'>
                      <circle cx='{M.Cx}' cy='{M.Cy}' r='{M.R}' fill='none' stroke='{M.Track}' stroke-width='{M.St}'/>
                      {
                        Concat(
                          Sequence(n) As i,
                          With(
                            { rec: Last(FirstN(S, i.Value)), prev: Sum(FirstN(S, i.Value - 1), pct) },
                            With(
                              { seg: M.Circ * rec.pct / 100 },
                              $"
                      <circle cx='{M.Cx}' cy='{M.Cy}' r='{M.R}' fill='none'
                        stroke='{rec.col}' stroke-width='{M.St}'
                        stroke-dasharray='{seg} {M.Circ - seg}'
                        stroke-dashoffset='{-(M.Circ * prev / 100)}'/>"
                            )
                          )
                        )
                      }
                    </g>

                    <!-- Center text -->
                    <text x='{M.Cx}' y='{M.Cy}' font-family='{M.Fam}' font-size='{M.FC}' fill='{M.Tx}'
                          text-anchor='middle' dominant-baseline='middle'>{M.CenterText}</text>
                    <text x='{M.Cx}' y='{M.Cy + 18}' font-family='{M.Fam}' font-size='{M.FS}' fill='{M.Sub}'
                          text-anchor='middle' dominant-baseline='middle'>{M.CenterSub}</text>

                    <!-- % labels -->
                    {
                      Concat(
                        Sequence(n) As i,
                        With(
                          { rec: Last(FirstN(S, i.Value)), prev: Sum(FirstN(S, i.Value - 1), pct) },
                          With(
                            { mid: (prev + (rec.pct / 2)) / 100 },
                            With(
                              { ang: mid * 2 * Pi() + (M.Rot * Pi() / 180) },
                              With(
                                {
                                  tx: M.Cx + (M.LabelR * Cos(ang)),
                                  ty: M.Cy + (M.LabelR * Sin(ang)),
                                  pctText: Text(rec.pct, "0.0 %")
                                },
                                With(
                                  { bw: (Len(pctText) * M.PctChar) + M.PadX * 2 },
                                  $"
                    <rect x='{tx - (bw/2)}' y='{ty - (M.BoxH/2)}' width='{bw}' height='{M.BoxH}'
                          rx='6' ry='6' fill='{M.BoxFill}' stroke='{M.BoxSt}'/>
                    <text x='{tx}' y='{ty}' font-family='{M.Fam}' font-size='{M.FL}' fill='{M.Tx}'
                          text-anchor='middle' dominant-baseline='middle'>{pctText}</text>
                  "
                                )
                              )
                            )
                          )
                        )
                      )
                    }

                    <!-- Legend wrapped -->
                    {
                      Concat(
                        Sequence(n) As i,
                        With(
                          { rec: Last(FirstN(S, i.Value)), idx: i.Value - 1 },
                          With(
                            { row: RoundDown(idx / M.PerRow, 0), colI: Mod(idx, M.PerRow) },
                            With(
                              { rowCnt: Min(M.PerRow, n - (row * M.PerRow)) },
                              With(
                                { startX: (M.W - (rowCnt * M.ItemW - M.Gap)) / 2 },
                                With(
                                  { x: startX + (colI * M.ItemW), y: M.LegY + (row * M.RowH) },
                                  $"
                    <rect x='{x}' y='{y - 10}' width='{M.Box}' height='{M.Box}' fill='{rec.col}'/>
                    <text x='{x + M.Box + M.BoxGap}' y='{y}' font-family='{M.Fam}' font-size='{M.FG}' fill='{M.Tx}'>{rec.lbl}</text>
                  "
                                )
                              )
                            )
                          )
                        )
                      )
                    }
                  </svg>"
                  )
                )
              )
            Width: =Parent.Width
```
