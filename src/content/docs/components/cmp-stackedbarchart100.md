---
title: cmp Stacked Bar Chart100
description: Reusable cmp Stacked Bar Chart100 component for Power Apps Canvas Apps.
date: 2026-09-16
tags:
  - components
  - interface
---

<div class="page-kicker">COMPONENT / INTERFACE</div>

# cmp Stacked Bar Chart100

Reusable YAML source for a Power Apps Canvas App component. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/cmp_StackedBarChart100.yml" download="cmp_StackedBarChart100.yml">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

## Source preview

```yaml
ComponentDefinitions:
  cmp_StackedBarChart100:
    DefinitionType: CanvasComponent
    AllowCustomization: true
    CustomProperties:
      Config:
        PropertyKind: Input
        DisplayName: Config
        Description: 'Layout + behavior config record '
        RaiseOnReset: true
        DataType: Record
        Default: |-
          ={
            Size:{ Width:700 },
            Padding:{ L:60, R:30, T:18 },

            Title:{ Text:"100% Stacked bar chart", H:26, Gap:12 },

            KPI:{
              Value:Blank(),
              SubText:"Total",
              H:56,
              Gap:18,
              W:180,
              Rx:10,
              PadX:12
            },

            Plot:{
              H:190,
              BarGap:12,
              PadL:14,
              BarRx:4
            },

            XLabels:{ H:60 },

            Axes:{
              PadT:6,
              PadB:6,
              StrokeW:2.5
            },

            Grid:{ Lines:5 },

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
        Description: 'Table. lbl, series (table of key,val,col) '
        RaiseOnReset: true
        DataType: Table
        Default: |-
          =[
            {
              lbl:"Jan",
              series:[
                { key:"A", val:40, col:"#0D47A1" },
                { key:"B", val:30, col:"#1B5E20" },
                { key:"C", val:50, col:"#B71C1C" }
              ]
            },
            {
              lbl:"Feb",
              series:[
                { key:"A", val:20, col:"#0D47A1" },
                { key:"B", val:55, col:"#1B5E20" },
                { key:"C", val:25, col:"#B71C1C" }
              ]
            },
            {
              lbl:"Mar",
              series:[
                { key:"A", val:10, col:"#0D47A1" },
                { key:"B", val:20, col:"#1B5E20" },
                { key:"C", val:70, col:"#B71C1C" }
              ]
            },
            {
              lbl:"Apr",
              series:[
                { key:"A", val:35, col:"#0D47A1" },
                { key:"B", val:25, col:"#1B5E20" },
                { key:"C", val:40, col:"#B71C1C" }
              ]
            }
          ]
      Theme:
        PropertyKind: Input
        DisplayName: Theme
        Description: 'Theme record '
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
        Description: 'Returns base data + computed layout '
        DataType: Record
    Properties:
      fnModel: |-
        =With(
          { it: Self.Items, t: Self.Theme, cfg: Self.Config },
          With(
            {
              /* =========================
                 0) CONFIG + THEME RESOLVE
                 ========================= */
              w: Coalesce(cfg.Size.Width, 700),

              padL: Coalesce(cfg.Padding.L, 60),
              padR: Coalesce(cfg.Padding.R, 30),
              padT: Coalesce(cfg.Padding.T, 18),

              titleText: Coalesce(cfg.Title.Text, "100% Stacked bar chart"),
              titleH: Coalesce(cfg.Title.H, 26),
              titleGap: Coalesce(cfg.Title.Gap, 12),

              kpiVal: cfg.KPI.Value,
              kpiSub: Coalesce(cfg.KPI.SubText, ""),
              kpiH: Coalesce(cfg.KPI.H, 56),
              kpiGap: Coalesce(cfg.KPI.Gap, 18),
              kpiW: Coalesce(cfg.KPI.W, 180),
              kpiRx: Coalesce(cfg.KPI.Rx, 10),
              kpiPadX: Coalesce(cfg.KPI.PadX, 12),

              plotH: Coalesce(cfg.Plot.H, 190),
              barGap: Coalesce(cfg.Plot.BarGap, 12),
              plotPadL: Coalesce(cfg.Plot.PadL, 14),
              barRx: Coalesce(cfg.Plot.BarRx, 4),

              xLabelH: Coalesce(cfg.XLabels.H, 60),

              axisPadT: Coalesce(cfg.Axes.PadT, 6),
              axisPadB: Coalesce(cfg.Axes.PadB, 6),
              axisStrokeW: Coalesce(cfg.Axes.StrokeW, 2.5),

              gridLines: Coalesce(cfg.Grid.Lines, 5),

              // legend
              box: Coalesce(cfg.Legend.Box, 12),
              boxGap: Coalesce(cfg.Legend.BoxGap, 8),
              gap: Coalesce(cfg.Legend.Gap, 40),
              charPx: Coalesce(cfg.Legend.CharPx, 7),
              rowH: Coalesce(cfg.Legend.RowH, 20),
              legendPadTop: Coalesce(cfg.Legend.PadTop, 12),
              legendPadBottom: Coalesce(cfg.Legend.PadBottom, 10),
              legendMargin: Coalesce(cfg.Legend.Margin, 20),

              // theme
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
              fwKpiText: Coalesce(t.Font.KpiTextWeight, "700")
            },
            With(
              {
                /* =========================
                   1) NORMALIZE CATEGORIES + SERIES (SAFE)
                   ========================= */
                baseCats:
                  ForAll(
                    Table(ParseJSON(JSON(it, JSONFormat.Compact))) As j,
                    {
                      lbl: Coalesce(Text(j.Value.lbl), ""),
                      series:
                        ForAll(
                          Table(
                            ParseJSON(
                              JSON(j.Value.series, JSONFormat.Compact)
                            )
                          ) As s,
                          {
                            key: Coalesce(Text(s.Value.key), ""),
                            val: Value(Coalesce(Text(s.Value.val), "0")),
                            col: Coalesce(Text(s.Value.col), "#616161")
                          }
                        )
                    }
                  )
              },
              With(
                {
                  /* =========================
                     2) FLATTEN FOR LEGEND LOOKUPS (SAFE)
                     ========================= */
                  n: CountRows(baseCats),

                  flat:
                    Ungroup(
                      ForAll(
                        baseCats As c,
                        ForAll(
                          c.series As s,
                          {
                            cat: c.lbl,
                            key: s.key,
                            val: s.val,
                            col: s.col
                          }
                        )
                      ),
                      Value
                    ),

                  kpiOn: !IsBlank(kpiVal),
                  kpiText: Text(Coalesce(kpiVal, Blank()), "[$-en-US]#,##0")
                },
                With(
                  {
                    /* =========================
                       3) LEGEND WRAP MATH
                       ========================= */
                    leg: Distinct(Filter(flat, !IsBlank(key)), key),
                    ln: CountRows(Distinct(Filter(flat, !IsBlank(key)), key)),
                    avgLen: Sum(Distinct(Filter(flat, !IsBlank(key)), key), Len(Value)) / Max(1, CountRows(Distinct(Filter(flat, !IsBlank(key)), key)))
                  },
                  With(
                    {
                      itemW: box + boxGap + (avgLen * charPx) + gap,
                      perRow: Max(1, RoundDown((w - legendMargin) / Max(1, (box + boxGap + (avgLen * charPx) + gap)), 0)),
                      legendRows: If(ln > 0, RoundUp(ln / Max(1, Max(1, RoundDown((w - legendMargin) / Max(1, (box + boxGap + (avgLen * charPx) + gap)), 0))), 0), 0)
                    },
                    With(
                      {
                        /* =========================
                           4) LAYOUT
                           ========================= */
                        titleY: padT,
                        kpiY: padT + titleH + titleGap,

                        chartY: padT + titleH + titleGap + If(kpiOn, kpiH + kpiGap, 0),
                        axisY:  padT + titleH + titleGap + If(kpiOn, kpiH + kpiGap, 0) + plotH,

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

                        axisX: padL,
                        plotX: padL + plotPadL,
                        plotW: w - padL - padR - plotPadL,

                        barW: If(n > 0, ((w - padL - padR - plotPadL) - barGap * (n - 1)) / n, 0)
                      },
                      {
                        W:w, H:h,

                        PadL:padL, PadR:padR, PadT:padT,
                        AxisX:axisX, AxisY:axisY, AxisPadT:axisPadT, AxisPadB:axisPadB, AxisStrokeW:axisStrokeW,

                        TitleText:titleText, TitleY:titleY,
                        ChartY:chartY,

                        PlotH:plotH, PlotX:plotX, PlotW:plotW, BarGap:barGap, BarW:barW, BarRx:barRx,

                        XLabelY:xLabelY,
                        GridLines:gridLines,

                        LegendY:legendY,
                        RowH:rowH, Box:box, BoxGap:boxGap, Gap:gap, ItemW:itemW, PerRow:perRow,

                        N:n, BaseCats:baseCats, Flat:flat, LegendKeys:leg, Ln:ln,

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
        )
    Children:
      - img_StackedBar100Svg:
          Control: Image@2.2.3
          Properties:
            Height: =Parent.Height
            Image: |
              =With(
                { M: Parent.fnModel() },
                With(
                  { C: M.BaseCats, F: M.Flat, n: M.N },
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

                <!-- GRIDLINES (percent) -->
                {
                  Concat(
                    Sequence(M.GridLines + 1) As g,
                    With(
                      { t: (g.Value - 1) / M.GridLines },
                      With(
                        { gy: M.ChartY + (M.PlotH * (1 - t)) },
                        $"
                <line x1='{Text(M.PlotX,"[$-en-US]0.0")}' y1='{Text(gy,"[$-en-US]0.0")}'
                      x2='{Text(M.PlotX + M.PlotW,"[$-en-US]0.0")}' y2='{Text(gy,"[$-en-US]0.0")}'
                      stroke='{M.Grid}' stroke-width='1'/>"
                      )
                    )
                  )
                }

                <!-- AXES -->
                <line x1='{Text(M.AxisX,"[$-en-US]0.0")}' y1='{Text(M.AxisY,"[$-en-US]0.0")}'
                      x2='{Text(M.PlotX + M.PlotW,"[$-en-US]0.0")}' y2='{Text(M.AxisY,"[$-en-US]0.0")}'
                      stroke='{M.Axis}' stroke-width='{M.AxisStrokeW}' stroke-linecap='round'/>
                <line x1='{Text(M.AxisX,"[$-en-US]0.0")}' y1='{Text(M.ChartY - M.AxisPadT,"[$-en-US]0.0")}'
                      x2='{Text(M.AxisX,"[$-en-US]0.0")}' y2='{Text(M.AxisY,"[$-en-US]0.0")}'
                      stroke='{M.Axis}' stroke-width='{M.AxisStrokeW}' stroke-linecap='round'/>

                <!-- Y labels -->
                <text x='{Text(M.AxisX - 10,"[$-en-US]0.0")}' y='{Text(M.AxisY,"[$-en-US]0.0")}'
                      font-family='{M.FontFam}' font-size='{M.FsY}' font-weight='{M.FwY}' fill='{M.Axis}' text-anchor='end'>0%</text>
                <text x='{Text(M.AxisX - 10,"[$-en-US]0.0")}' y='{Text(M.ChartY - M.AxisPadT + 12,"[$-en-US]0.0")}'
                      font-family='{M.FontFam}' font-size='{M.FsY}' font-weight='{M.FwY}' fill='{M.Axis}' text-anchor='end'>100%</text>

                <!-- STACKED BARS (100%) -->
                {
                  Concat(
                    Sequence(n) As i,
                    With(
                      { c: Last(FirstN(C, i.Value)), idx: i.Value - 1 },
                      With(
                        {
                          x: M.PlotX + (idx * (M.BarW + M.BarGap)),
                          catTotal: Sum(c.series, val),
                          segN: CountRows(c.series)
                        },
                        With(
                          {
                            segs:
                              Concat(
                                Sequence(segN) As s,
                                With(
                                  {
                                    seg: Last(FirstN(c.series, s.Value)),
                                    before: Sum(FirstN(c.series, s.Value - 1), val)
                                  },
                                  With(
                                    {
                                      segH: If(catTotal > 0, (seg.val / catTotal) * M.PlotH, 0),
                                      y: M.AxisY - If(catTotal > 0, ((before + seg.val) / catTotal) * M.PlotH, 0),

                                      pctTxt: Text(If(catTotal > 0, seg.val / catTotal, 0)*100, "[$-en-US]0.0%"),

                                      pillW: Len(Text(If(catTotal > 0, seg.val / catTotal, 0)*100, "[$-en-US]0.0%")) * 7 + 12,
                                      pillX: (x + (M.BarW/2)) - ((Len(Text(If(catTotal > 0, seg.val / catTotal, 0)*100, "[$-en-US]0.0%")) * 7 + 12) / 2),
                                      pillY: ( M.AxisY - If(catTotal > 0, ((before + seg.val) / catTotal) * M.PlotH, 0) + ( If(catTotal > 0, (seg.val / catTotal) * M.PlotH, 0)/2) - 9)
                                    },
                                    If(
                                      segH >= 16,
                                      $"
                                      <rect x='{Text(x,"[$-en-US]0.0")}' y='{Text(y,"[$-en-US]0.0")}'
                                              width='{Text(M.BarW,"[$-en-US]0.0")}' height='{Text(segH,"[$-en-US]0.0")}'
                                              rx='{Text(M.BarRx,"[$-en-US]0.0")}' ry='{Text(M.BarRx,"[$-en-US]0.0")}'
                                              fill='{seg.col}'/>

                                      <rect x='{Text(pillX,"[$-en-US]0.0")}' y='{Text(pillY,"[$-en-US]0.0")}'
                                              width='{Text(pillW,"[$-en-US]0.0")}' height='18'
                                              rx='6' ry='6' fill='{M.ValueBg}'/>

                                      <text x='{Text(x + M.BarW/2,"[$-en-US]0.0")}' y='{Text(y + (segH/2) + 5,"[$-en-US]0.0")}'
                                              font-family='{M.FontFam}' font-size='{Text(M.FsVal,"[$-en-US]0.0")}' font-weight='{M.FwVal}'
                                              fill='{M.Label}' text-anchor='middle'>{pctTxt}</text>
                                      ",
                                      $"
                                      <rect x='{Text(x,"[$-en-US]0.0")}' y='{Text(y,"[$-en-US]0.0")}'
                                              width='{Text(M.BarW,"[$-en-US]0.0")}' height='{Text(segH,"[$-en-US]0.0")}'
                                              rx='{Text(M.BarRx,"[$-en-US]0.0")}' ry='{Text(M.BarRx,"[$-en-US]0.0")}'
                                              fill='{seg.col}'/>
                                      "
                                              )
                                              )
                                          )
                                          )
                                          },
                                          segs &
                                          $"
                                          <text x='{Text(x + M.BarW/2,"[$-en-US]0.0")}' y='{Text(M.XLabelY,"[$-en-US]0.0")}'
                                                  font-family='{M.FontFam}' font-size='{M.FsLabel}' font-weight='{M.FwLabel}'
                                                  fill='{M.Label}' text-anchor='middle'>{Substitute(c.lbl, "&", "and")}</text>
                                          "
                                      )
                                      )
                                  )
                                  )
                                      }

                                      <!-- LEGEND -->
                                      {
                                          Concat(
                                          Sequence(M.Ln) As i,
                                          With(
                                              { k: Last(FirstN(M.LegendKeys, i.Value)).Value, idx: i.Value - 1 },
                                              With(
                                              { colr: Coalesce(First(Filter(F, key = k)).col, "#616161") },
                                              With(
                                                  { row: RoundDown(idx / M.PerRow, 0), colI: Mod(idx, M.PerRow) },
                                                  With(
                                                  { rowCnt: Min(M.PerRow, M.Ln - (row * M.PerRow)) },
                                                  With(
                                                      { startX: (M.W - (rowCnt * M.ItemW - M.Gap)) / 2 },
                                                      With(
                                                      { lx: startX + (colI * M.ItemW), ly: M.LegendY + (row * M.RowH) },
                                                      $"
                                                      <rect x='{Text(lx,"[$-en-US]0.0")}' y='{Text(ly - 10,"[$-en-US]0.0")}' width='{M.Box}' height='{M.Box}' fill='{colr}'/>
                                                      <text x='{Text(lx + M.Box + M.BoxGap,"[$-en-US]0.0")}' y='{Text(ly,"[$-en-US]0.0")}'
                                                              font-family='{M.FontFam}' font-size='{M.FsLeg}' font-weight='{M.FwLeg}' fill='{M.LegendText}'>
                                                          {Substitute(k, "&", "and")}
                                                      </text>
                                                      "
                                                      )
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
