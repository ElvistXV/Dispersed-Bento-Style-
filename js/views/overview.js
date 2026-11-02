/* Overview page */
views.Overview =
  () => `<h1>Good morning, Raees</h1><p class="sub">Here is how Demo Manufacturing B.V. is doing against its 2027 goal.</p>
<div class="grid g4">${kpi("peach", "Emissions in 2025", "845 tCO2", "21% lower than 2024")}${kpi("mint", "Portfolio reduction", "38 tCO2", "Scope 1 and 2 only")}${kpi("sand", "Data completeness", "80%", "Scope 3 is at 52%")}${kpi("rose", "Remaining to goal", "380 tCO2", "Target for 2027")}</div>
<div class="grid g2" style="margin-top:12px">
<div class="card"><div class="row sp"><div><h3>Down 31% since 2023</h3><span class="mute">Total emissions per year, tCO₂e · illustrative data</span></div><button class="btn dk">Goal 2027</button></div>
<div class="trend-chart-wrap"><svg class="chart bento-v2-chart" viewBox="0 0 600 280" role="img" aria-label="Illustrative emissions trend from 2023 through a 2027 target. Select a point to see its explanation.">
<defs><linearGradient id="bentoTrendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#20b6a9" stop-opacity=".34"/><stop offset="100%" stop-color="#20b6a9" stop-opacity=".045"/></linearGradient></defs>
<g class="bento-chart-grid" stroke="#e3e9e5" stroke-width="1"><path d="M65 38H575M65 100H575M65 162H575M65 224H575"/></g>
<g class="bento-chart-axis" fill="var(--mute)" font-size="12" font-weight="500"><text x="56" y="42" text-anchor="end">1,225</text><text x="56" y="104" text-anchor="end">1,000</text><text x="56" y="166" text-anchor="end">800</text><text x="56" y="228" text-anchor="end">400</text><text x="80" y="267" text-anchor="middle">2023</text><text x="198" y="267" text-anchor="middle">2024</text><text x="315" y="267" text-anchor="middle">2025</text><text x="430" y="267" text-anchor="middle">2026</text><text x="550" y="267" text-anchor="middle">2027</text></g>
<path d="M80 47 L198 89 L315 151 L430 179 L550 228 L550 245 L80 245 Z" fill="url(#bentoTrendFill)"/>
<path class="bento-trend-line" d="M80 47 L198 89 L315 151 L430 179" fill="none" stroke="#16afa3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M430 179 L550 228" fill="none" stroke="#ff8a5b" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="7 7"/>
<g class="trend-dots">
<g class="trend-dot" tabindex="0" role="button" aria-label="2023: 1,225 tonnes CO2 equivalent" data-x="80" data-y="47" data-title="2023 · 1,225 tCO₂e" data-detail="Fictional demo example: older gas heating and heavy production activity contributed to the high baseline. Not real company emissions."><circle class="trend-hit" cx="80" cy="47" r="20"/><circle class="trend-marker" cx="80" cy="47" r="6"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2024: approximately 1,070 tonnes CO2 equivalent" data-x="198" data-y="89" data-title="2024 · about 1,070 tCO₂e" data-detail="Fictional demo example: an LED-lighting upgrade and more efficient scheduling lowered electricity use compared with 2023. The 2024 value is estimated, not measured."><circle class="trend-hit" cx="198" cy="89" r="20"/><circle class="trend-marker" cx="198" cy="89" r="6"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2025: 845 tonnes CO2 equivalent" data-x="315" data-y="151" data-title="2025 · 845 tCO₂e" data-detail="Fictional demo example: more efficient machinery and fewer petrol-fuelled fleet trips helped emissions fall versus 2024. These are illustrative, not documented causes."><circle class="trend-hit" cx="315" cy="151" r="20"/><circle class="trend-marker" cx="315" cy="151" r="6"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2026: illustrative trend point" data-x="430" data-y="179" data-title="2026 · illustrative trend" data-detail="Fictional projection: further fleet electrification and insulation improvements could reduce emissions. 2026 is illustrative, not measured."><circle class="trend-hit" cx="430" cy="179" r="20"/><circle class="trend-marker" cx="430" cy="179" r="6"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2027: target of 380 tonnes" data-x="550" data-y="228" data-title="2027 · target: 380 tCO₂e" data-detail="Fictional target scenario: renewable electricity, cleaner heating and electric vehicles could help reach 380 tCO₂e. This is a target, not measured data."><circle class="trend-hit" cx="550" cy="228" r="20"/><circle class="trend-marker bento-target-dot" cx="550" cy="228" r="6"/></g></g>
<g fill="#087e76" font-size="11" font-weight="700"><text x="80" y="30" text-anchor="middle">1,225</text><text x="198" y="72" text-anchor="middle">~1,070</text><text x="315" y="134" text-anchor="middle">845</text></g><text x="548" y="208" text-anchor="end" fill="#e87549" font-size="11" font-weight="700">380 goal</text>
</svg><div class="trend-tooltip" id="trend-tooltip" role="status" aria-live="polite" hidden><strong class="trend-tooltip-title"></strong><span class="trend-tooltip-detail"></span></div></div></div>
<div class="card fl"><h3>Where 2025 came from</h3><p class="mute chart-instruction">Hover over a percentage to explore it, or click for the example breakdown.</p><div class="seg emission-segments" aria-label="2025 emissions by source" style="margin:10px 0"><button type="button" style="flex:36;background:var(--amb)" data-share="electricity" onclick="showShareDetail('electricity')" aria-label="Electricity, 36 percent of 2025 emissions. View details">36%</button><button type="button" style="flex:30;background:var(--teal)" data-share="cars" onclick="showShareDetail('cars')" aria-label="Company cars, 30 percent of 2025 emissions. View details">30%</button><button type="button" style="flex:20;background:var(--ind);color:#fff" data-share="heating" onclick="showShareDetail('heating')" aria-label="Heating, 20 percent of 2025 emissions. View details">20%</button><button type="button" style="flex:14;background:var(--lav)" data-share="travel" onclick="showShareDetail('travel')" aria-label="Business travel, 14 percent of 2025 emissions. View details">14%</button></div>
<div class="tw"><table class="tall"><tr><th>Source</th><th>tCO2</th><th>Share</th></tr>${[
    ["Electricity", 304, 36],
    ["Company cars", 254, 30],
    ["Heating", 169, 20],
    ["Business travel", 118, 14],
  ]
    .map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}%</td></tr>`)
    .join(
      "",
    )}<tr><td><b>Total</b></td><td><b>845</b></td><td><b>100%</b></td></tr></table></div><p class="demo-disclaimer">Illustrative demo only — emissions, percentages, explanations and source data are fictional, not real company data.</p></div></div>
<div class="grid g2" style="margin-top:12px">
<div class="card"><h3>Needs your attention</h3>${
    tasks
      .filter((t) => !t.d)
      .map(
        (t) =>
          `<div class="item"><span class="sq" style="background:var(--${t.c})"></span><div style="flex:1"><b>${t.h}</b><div class="mute">${t.t}</div></div><button class="btn" onclick="go('Inbox')">Open</button></div>`,
      )
      .join("") || '<p class="mute">Nothing waiting. You are all caught up.</p>'
  }</div>
<div class="card"><h3>Recent activity</h3>${[
    ["Dispersed uploaded the heating invoices", "2 days ago"],
    ["Lena shared the draft LCA report", "3 days ago"],
    ["Raees invited Anna Meijer", "1 week ago"],
  ]
    .map(
      (a) =>
        `<div class="item"><span class="sq" style="background:var(--line);border-radius:50%"></span><div style="flex:1">${a[0]}</div><span class="mute">${a[1]}</span></div>`,
    )
    .join("")}</div></div>`;
