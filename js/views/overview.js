/* Overview page */
views.Overview =
  () => `<h1>Good morning, Raees</h1><p class="sub">Here is how Demo Manufacturing B.V. is doing against its 2027 goal.</p>
<div class="grid g4">${kpi("peach", "Emissions in 2025", "845 tCO2", "21% lower than 2024")}${kpi("mint", "Portfolio reduction", "38 tCO2", "Scope 1 and 2 only")}${kpi("sand", "Data completeness", "80%", "Scope 3 is at 52%")}${kpi("rose", "Remaining to goal", "380 tCO2", "Target for 2027")}</div>
<div class="grid g2" style="margin-top:12px">
<div class="card"><div class="row sp"><div><h3>Down 31% since 2023</h3><span class="mute">Total emissions per year, tCO2</span></div><button class="btn dk">Goal 2027</button></div>
<div class="trend-chart-wrap"><svg class="chart" viewBox="0 0 420 190" role="img" aria-label="Emissions fall from 1225 in 2023 to 845 in 2025, then to a 2027 goal of 380"><g stroke="var(--line)"><path d="M40 30H410M40 80H410M40 130H410"/></g><path d="M50 40L150 82L250 118L350 130V160H50Z" fill="var(--tealL)"/><path d="M50 40L150 82L250 118L350 130" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="M350 130L400 150" stroke="var(--or)" stroke-width="2" stroke-dasharray="5 4" fill="none"/><g class="trend-dots" fill="var(--or)">
<g class="trend-dot" tabindex="0" role="button" aria-label="2023: 1,225 tonnes of CO2 equivalent. Starting point for comparison." data-x="50" data-y="40" data-title="2023 · 1,225 tCO₂e" data-detail="Fictional demo example: older gas heating and heavy production activity contributed to the high baseline. Not real company emissions."><circle class="trend-hit" cx="50" cy="40" r="15"/><circle class="trend-marker" cx="50" cy="40" r="5"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2024: approximately 1,070 tonnes of CO2 equivalent, estimated. Lower than 2023." data-x="150" data-y="82" data-title="2024 · about 1,070 tCO₂e" data-detail="Fictional demo example: an LED-lighting upgrade and more efficient scheduling lowered electricity use compared with 2023. The 2024 value is estimated, not measured."><circle class="trend-hit" cx="150" cy="82" r="15"/><circle class="trend-marker" cx="150" cy="82" r="5"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2025: 845 tonnes of CO2 equivalent. 21 percent lower than 2024." data-x="250" data-y="118" data-title="2025 · 845 tCO₂e" data-detail="Fictional demo example: more efficient machinery and fewer petrol-fuelled fleet trips helped emissions fall 21% versus 2024. These are illustrative, not documented causes."><circle class="trend-hit" cx="250" cy="118" r="15"/><circle class="trend-marker" cx="250" cy="118" r="5"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2026: illustrative trend point. No confirmed emissions figure supplied." data-x="350" data-y="130" data-title="2026 · illustrative trend" data-detail="Fictional projection: further fleet electrification and insulation improvements could reduce emissions. 2026 is illustrative, not measured."><circle class="trend-hit" cx="350" cy="130" r="15"/><circle class="trend-marker" cx="350" cy="130" r="5"/></g>
<g class="trend-dot" tabindex="0" role="button" aria-label="2027: target of 380 tonnes of CO2 equivalent, not an actual result." data-x="400" data-y="150" data-title="2027 · target: 380 tCO₂e" data-detail="Fictional target scenario: renewable electricity, cleaner heating and electric vehicles could help reach 380 tCO₂e. This is a target, not measured data."><circle class="trend-hit" cx="400" cy="150" r="15"/><circle class="trend-marker" cx="400" cy="150" r="5"/></g>
</g><g font-size="11" fill="var(--mute)" font-family="Plus Jakarta Sans"><text x="30" y="30" text-anchor="end">1,225</text><text x="30" y="80" text-anchor="end">1,000</text><text x="30" y="130" text-anchor="end">800</text><text x="50" y="180" text-anchor="middle">2023</text><text x="150" y="180" text-anchor="middle">2024</text><text x="250" y="180" text-anchor="middle">2025</text><text x="350" y="180" text-anchor="middle">2026</text><text x="400" y="180" text-anchor="middle">2027</text></g></svg><div class="trend-tooltip" id="trend-tooltip" role="status" aria-live="polite" hidden><strong class="trend-tooltip-title"></strong><span class="trend-tooltip-detail"></span></div></div></div>
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
