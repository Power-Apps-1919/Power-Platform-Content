---
title: "Bar Chart"
description: "Reusable Power Apps Canvas bar chart component with configurable layout, KPI, axes, colors, and data."
date: "2026-09-16"
tags:
  - components
  - visualization
  - charts
---

<div class="page-kicker">COMPONENT / VISUALIZATION</div>

# Bar Chart

Reusable Power Apps Canvas bar chart component with configurable layout, KPI, axes, colors, and data. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp-bar-chart.yml" download="cmp-bar-chart.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Component documentation

# Bar Chart

Reusable Power Apps Canvas component for displaying vertical bar charts with configurable layout, title, KPI, axes, colors, and data.

## Inputs

- `Config` - Record containing layout, title, KPI, plot, axis, and styling settings.
- `Items` - Table containing the values and labels to display.

## Usage

Import `cmp-bar-chart.yml` into a Canvas App component library and pass a table to `Items`. Adjust `Config` to control chart dimensions and presentation.

## Source preview

```yaml
ComponentDefinitions:
  cmp_BarChart:
    DefinitionType: CanvasComponent
    CustomProperties:
      Config:
        PropertyKind: Input
        DisplayName: Config
        Description: Layout + behavior config record
        RaiseOnReset: true
        DataType: Record
        Default: |-
          ={
            Size:{ Width:700 },
            Padding:{ L:60, R:30, T:18 },

            Title:{ Text:"Bar chart", H:26, Gap:12 },

            KPI:{
              Value:1200,
              SubText:"Total",
              H:56,
              Gap:18,
              W:160,
              Rx:10,
              PadX:12
            },

            Plot:{
              H:190,
              BarGap:12,
              PadL:14
            },

            XLabels:{ H:60 },

            Axes:{
              PadT:6,
              PadB:6,
              StrokeW:2.5
            },

            Grid:{ Lines:6 },

            Legend:{
              Box:12,
              BoxGap:8,
              Gap:40,
              CharPx:7,
              RowH:20,
              PadTop:12,
              PadBottom:10,
              Margin:20
            }
          }
      Items:
        PropertyKind: Input
        DisplayName: Items
        Description: Table. lbl, val, col
        RaiseOnReset: true
        DataType: Table
        Default: |-
          =[
            { lbl: "Jan", val: 120, col: "#0D47A1" },
            { lbl: "Feb", val: 80,  col: "#1B5E20" },
            { lbl: "Mar", val: 150, col: "#B71C1C" },
            { lbl: "Apr", val: 60,  col: "#616161" }
          ]
      Theme:
        PropertyKind: Input
        DisplayName: Theme
        Description: Theme record
        RaiseOnReset: true
        DataType: Record
        Default: |-
          ={
            Colors:{
              Background:"#FFFFFF",
              Title:"#222222",
              Axis:"#333333",
              Grid:"#E6E6E6",
              Label:"#333333",
              ValueBg:"#F2F2F2",
              KpiFill:"#F6F6F6",
              KpiStroke:"#DADADA",
              KpiSub:"#666666",
              KpiText:"#111111",
              LegendText:"#111111"
            },
            Font:{
              Family:"Segoe UI",
              TitleSize:14,
              TitleWeight:"600",
              LabelSize:13,
              LabelWeight:"600",
              ValueSize:12,
              ValueWeight:"700",
              YLabelSize:12,
              YLabelWeight:"600",
              LegendSize:12,
              LegendWeight:"600",
              KpiSubSize:12,
              KpiTextSize:18,
              KpiTextWeight:"700"
            }
          }
      fnModel:
        PropertyKind: OutputFunction
        DisplayName: Model
        Description: Returns base data + computed layout
        DataType: Record
    Properties:
      fnModel: |-
        =With(
          {
            it: Self.Items, 
            t:  Self.Theme, 
            cfg:Self.Config
          },
          With(
            {
              // ---- config resolved ----
              w: Coalesce(cfg.Size.Width, 700),

              padL: Coalesce(cfg.Padding.L, 60),
              padR: Coalesce(cfg.Padding.R, 30),
              padT: Coalesce(cfg.Padding.T, 18),

              titleText: Coalesce(cfg.Title.Text, "Bar chart"),
              titleH: Coalesce(cfg.Title.H, 26),
              titleGap: Coalesce(cfg.Title.Gap, 12),

              kpiVal: cfg.KPI.Value,
              kpiSub: Coalesce(cfg.KPI.SubText, ""),
              kpiH: Coalesce(cfg.KPI.H, 56),
              kpiGap: Coalesce(cfg.KPI.Gap, 18),
              kpiW: Coalesce(cfg.KPI.W, 160),
              kpiRx: Coalesce(cfg.KPI.Rx, 10),
              kpiPadX: Coalesce(cfg.KPI.PadX, 12),

              plotH: Coalesce(cfg.Plot.H, 190),
              barGap: Coalesce(cfg.Plot.BarGap, 12),
              plotPadL: Coalesce(cfg.Plot.PadL, 14),

              xLabelH: Coalesce(cfg.XLabels.H, 60),

              axisPadT: Coalesce(cfg.Axes.PadT, 6),
              axisPadB: Coalesce(cfg.Axes.PadB, 6),
              axisStrokeW: Coalesce(cfg.Axes.StrokeW, 2.5),

              gridLines: Coalesce(cfg.Grid.Lines, 6),

              // legend
              box: Coalesce(cfg.Legend.Box, 12),
              boxGap: Coalesce(cfg.Legend.BoxGap, 8),
              gap: Coalesce(cfg.Legend.Gap, 40),
              charPx: Coalesce(cfg.Legend.CharPx, 7),
              rowH: Coalesce(cfg.Legend.RowH, 20),
              legendPadTop: Coalesce(cfg.Legend.PadTop, 12),
              legendPadBottom: Coalesce(cfg.Legend.PadBottom, 10),
              legendMargin: Coalesce(cfg.Legend.Margin, 20),

              // ---- theme resolved ----
              cBg: Coalesce(t.Colors.Background, "#FFFFFF"),
              cTitle: Coalesce(t.Colors.Title, "#222222"),
              cAxis: Coalesce(t.Colors.Axis, "#333333"),
              cGrid: Coalesce(t.Colors.Grid, "#E6E6E6"),
              cLabel: Coalesce(t.Colors.Label, "#333333"),
              cValBg: Coalesce(t.Colors.ValueBg, "#F2F2F2"),

              cKpiFill: Coalesce(t.Colors.KpiFill, "#F6F6F6"),
              cKpiStroke: Coalesce(t.Colors.KpiStroke, "#DADADA"),
              cKpiSub: Coalesce(t.Colors.KpiSub, "#666666"),
              cKpiText: Coalesce(t.Colors.KpiText, "#111111"),
              cLegend: Coalesce(t.Colors.LegendText, "#111111"),

              fontFam: Coalesce(t.Font.Family, "Segoe UI"),

              fsTitle: Coalesce(t.Font.TitleSize, 14),
              fwTitle: Coalesce(t.Font.TitleWeight, "600"),

              fsLabel: Coalesce(t.Font.LabelSize, 13),
              fwLabel: Coalesce(t.Font.LabelWeight, "600"),

              fsVal: Coalesce(t.Font.ValueSize, 12),
              fwVal: Coalesce(t.Font.ValueWeight, "700"),

              fsY: Coalesce(t.Font.YLabelSize, 12),
              fwY: Coalesce(t.Font.YLabelWeight, "600"),

              fsLeg: Coalesce(t.Font.LegendSize, 12),
              fwLeg: Coalesce(t.Font.LegendWeight, "600"),

              fsKpiSub: Coalesce(t.Font.KpiSubSize, 12),
              fsKpiText: Coalesce(t.Font.KpiTextSize, 18),
              fwKpiText: Coalesce(t.Font.KpiTextWeight, "700"),

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
              {
                n: CountRows(base),
                tot: Sum(base, val),
                maxV: Max(base, val),

                kpiOn: !IsBlank(kpiVal),

                // KPI string (safe)
                kpiText: Text(Coalesce(kpiVal, Blank()), "[$-en-US]#,##0")
              },
              With(
                { avgLen: Sum(base, Len(lbl)) / Max(1, n) },
                With(
                  {
                    itemW: box + boxGap + (avgLen * charPx) + gap,
                    perRow: Max(1, RoundDown((w - legendMargin) / (box + boxGap + (avgLen * charPx) + gap), 0)),
                    legendRows: If(n > 0, RoundUp(n / Max(1, RoundDown((w - legendMargin) / (box + boxGap + (avgLen * charPx) + gap), 0)), 0), 0)
                  },
                  With(
                    {
                      // Y positions
                      titleY: padT,
                      kpiY: padT + titleH + titleGap,
                      chartY: padT + titleH + titleGap + If(kpiOn, kpiH + kpiGap, 0),
                      axisY: padT + titleH + titleGap + If(kpiOn, kpiH + kpiGap, 0) + plotH,

                      xLabelY: padT + titleH + titleGap + If(kpiOn, kpiH + kpiGap, 0) + plotH + axisPadB + 22,

                      legendY:
                        padT + titleH + titleGap +
                        If(kpiOn, kpiH + kpiGap, 0) +
                        plotH + xLabelH + legendPadTop,

                      h:
                        padT + titleH + titleGap +
                        If(kpiOn, kpiH + kpiGap, 0) +
                        plotH + xLabelH + legendPadTop +
                        (legendRows * rowH) + legendPadBottom,

                      // X positions
                      axisX: padL,
                      plotX: padL + plotPadL,
                      plotW: w - padL - padR - plotPadL,

                      barW: If(n > 0, ( (w - padL - padR - plotPadL) - barGap * (n - 1) ) / n, 0)
                    },
                    {
                        W:w, H:h,
                        PadL:padL, PadR:padR, PadT:padT,
                        TitleText:titleText, TitleY:titleY,
                        ChartY: chartY,
                        LegendY: legendY,
                        BarW: barW,
                        PlotH:plotH, PlotX:plotX, PlotW:plotW, BarGap:barGap,
                        AxisX:axisX, AxisY:axisY, AxisPadT:axisPadT, AxisPadB:axisPadB, AxisStrokeW:axisStrokeW,
                        XLabelY:xLabelY,
                        GridLines:gridLines,
                        RowH:rowH, Box:box, BoxGap:boxGap, Gap:gap, ItemW:itemW, PerRow:perRow,
                        N:n, Tot:tot, MaxV:maxV, Base:base,
                        Bg:cBg, Axis:cAxis, Grid:cGrid, Title:cTitle, Label:cLabel, ValueBg:cValBg,
                        LegendText:cLegend,
                        FontFam:fontFam,
                        FsTitle:fsTitle, FwTitle:fwTitle,
                        FsLabel:fsLabel, FwLabel:fwLabel,
                        FsVal:fsVal, FwVal:fwVal,
                        FsY:fsY, FwY:fwY,
                        FsLeg:fsLeg, FwLeg:fwLeg,
                        KpiOn:kpiOn, KpiY:kpiY, KpiW:kpiW, KpiH:kpiH, KpiRx:kpiRx, KpiPadX:kpiPadX,
                        KpiFill:cKpiFill, KpiStroke:cKpiStroke, KpiSubClr:cKpiSub, KpiTextClr:cKpiText,
                        KpiSub:kpiSub, KpiText:kpiText,
                        FsKpiSub:fsKpiSub, FsKpiText:fsKpiText, FwKpiText:fwKpiText
                        }

                  )
                )
              )
            )
          )
        )
    Children:
      - img_BarChartSvg:
          Control: Image@2.2.3
          Properties:
            Height: =Parent.Height
            Image: |
              =With(
                { M: Parent.fnModel() },
                With(
                  {
                    B: M.Base,
                    n: M.N,
                    gDen: Max(1, M.GridLines),
                    per: Max(1, M.PerRow)
                  },
                  "data:image/svg+xml;utf8," &
                  EncodeUrl(
                    $"
                    <svg xmlns='http://www.w3.org/2000/svg' width='{M.W}' height='{M.H}' viewBox='0 0 {M.W} {M.H}'>
                      <rect width='{M.W}' height='{M.H}' fill='{M.Bg}'/>

                      <!-- TITLE -->
                      <text x='{M.PadL}' y='{M.TitleY + 18}'
                            font-family='{M.FontFam}' font-size='{M.FsTitle}' font-weight='{M.FwTitle}' fill='{M.Title}'>
                        {M.TitleText}
                      </text>

                      <!-- KPI CARD (optional) -->
                      {
                        If(
                          M.KpiOn,
                          $"
                            <rect x='{M.PadL}' y='{M.KpiY}' width='{M.KpiW}' height='{M.KpiH}'
                                  rx='{M.KpiRx}' ry='{M.KpiRx}' fill='{M.KpiFill}' stroke='{M.KpiStroke}'/>

                            <text x='{M.PadL + M.KpiPadX}' y='{M.KpiY + 22}'
                                  font-family='{M.FontFam}' font-size='{M.FsKpiSub}' fill='{M.KpiSubClr}'>
                              {M.KpiSub}
                            </text>

                            <text x='{M.PadL + M.KpiPadX}' y='{M.KpiY + 44}'
                                  font-family='{M.FontFam}' font-size='{M.FsKpiText}' font-weight='{M.FwKpiText}' fill='{M.KpiTextClr}'>
                              {M.KpiText}
                            </text>
                          ",
                          ""
                        )
                      }

                      <!-- GRIDLINES -->
                      {
                        Concat(
                          Sequence(M.GridLines + 1) As g,
                          With(
                            { t: (g.Value - 1) / gDen },
                            With(
                              { gy: M.ChartY + (M.PlotH * (1 - t)) },
                              $"
                                <line x1='{M.PlotX}' y1='{gy}' x2='{M.PlotX + M.PlotW}' y2='{gy}'
                                      stroke='{M.Grid}' stroke-width='1'/>"
                            )
                          )
                        )
                      }

                      <!-- AXES -->
                      <line x1='{M.AxisX}' y1='{M.AxisY}' x2='{M.PlotX + M.PlotW}' y2='{M.AxisY}'
                            stroke='{M.Axis}' stroke-width='{M.AxisStrokeW}' stroke-linecap='round'/>
                      <line x1='{M.AxisX}' y1='{M.ChartY - M.AxisPadT}' x2='{M.AxisX}' y2='{M.AxisY}'
                            stroke='{M.Axis}' stroke-width='{M.AxisStrokeW}' stroke-linecap='round'/>

                      <!-- Y labels -->
                      <text x='{M.AxisX - 10}' y='{M.AxisY}'
                            font-family='{M.FontFam}' font-size='{M.FsY}' font-weight='{M.FwY}' fill='{M.Axis}' text-anchor='end'>0</text>
                      <text x='{M.AxisX - 10}' y='{M.ChartY - M.AxisPadT + 12}'
                            font-family='{M.FontFam}' font-size='{M.FsY}' font-weight='{M.FwY}' fill='{M.Axis}' text-anchor='end'>{Text(M.MaxV,"0.0")}</text>

                      <!-- BARS + VALUES + X LABELS -->
                      {
                        Concat(
                          Sequence(n) As i,
                          With(
                            { r: Last(FirstN(B, i.Value)), idx: i.Value - 1 },
                            With(
                              { x: M.PlotX + (idx * (M.BarW + M.BarGap)) },
                              With(
                                { bh: If(M.MaxV > 0, (r.val / M.MaxV) * M.PlotH, 0) },
                                With(
                                  { y: M.AxisY - bh, vTxt: Text(r.val, "0,0") },
                                  $"
                                    <rect x='{x}' y='{y}' width='{M.BarW}' height='{bh}' rx='4' ry='4' fill='{r.col}'/>

                                    <rect x='{(x + M.BarW/2) - ((Len(vTxt) * 7 + 12) / 2)}' y='{Max(M.ChartY + 4, y - 18)}'
                                          width='{Len(vTxt) * 7 + 12}' height='18' rx='6' ry='6' fill='{M.ValueBg}'/>

                                    <text x='{x + M.BarW/2}' y='{Max(M.ChartY + 18, y - 5)}'
                                          font-family='{M.FontFam}' font-size='{M.FsVal}' font-weight='{M.FwVal}'
                                          fill='{M.Label}' text-anchor='middle'>{vTxt}</text>

                                    <text x='{x + M.BarW/2}' y='{M.XLabelY}'
                                          font-family='{M.FontFam}' font-size='{M.FsLabel}' font-weight='{M.FwLabel}'
                                          fill='{M.Label}' text-anchor='middle'>{Substitute(r.lbl, "&", "and")}</text>
                                  "
                                )
                              )
                            )
                          )
                        )
                      }

                      <!-- LEGEND -->
                      {
                        Concat(
                          Sequence(n) As i,
                          With(
                            { r: Last(FirstN(B, i.Value)), idx: i.Value - 1 },
                            With(
                              { row: RoundDown(idx / per, 0), colI: Mod(idx, per) },
                              With(
                                { rowCnt: Min(per, n - (row * per)) },
                                With(
                                  { startX: (M.W - (rowCnt * M.ItemW - M.Gap)) / 2 },
                                  With(
                                    { lx: startX + (colI * M.ItemW), ly: M.LegendY + (row * M.RowH) },
                                    $"
                                      <rect x='{lx}' y='{ly - 10}' width='{M.Box}' height='{M.Box}' fill='{r.col}'/>
                                      <text x='{lx + M.Box + M.BoxGap}' y='{ly}'
                                            font-family='{M.FontFam}' font-size='{M.FsLeg}' font-weight='{M.FwLeg}' fill='{M.LegendText}'>
                                        {Substitute(r.lbl, "&", "and")}: {Text(r.val, "0.##")}
                                      </text>
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
