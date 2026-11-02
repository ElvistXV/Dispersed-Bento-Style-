/* Module page: Scope 1-2-3 (reached from Modules) */
views["mod-scope"] = () => {
  const rows = [
    ["Heating", "Scope 1", 169, 100],
    ["Company Cars", "Scope 1", 254, 100],
    ["Electricity", "Scope 2", 304, 100],
    ["Business Travel", "Scope 3", 118, 52],
  ];
  return `<h1>Scope 1-2-3</h1><p class="sub">Your direct, energy and value-chain emissions for 2025</p>${chips("scope")}
<div class="grid g4">${kpi("peach", "Scope 1", "423 tCO2", "Heating and company cars")}${kpi("mint", "Scope 2", "304 tCO2", "Purchased electricity")}${kpi("sand", "Scope 3", "118 tCO2", "Business travel so far")}${kpi("rose", "Data completeness", "80%", "Scope 3 is at 52%")}</div>
<div class="grid g2" style="margin-top:12px"><div class="card scope-source-card"><h3>Emission sources</h3><span class="mute">Send or update the data behind each source</span>
<div class="tw"><table><tr><th>Source</th><th>Scope</th><th>tCO2</th><th>Complete</th><th></th></tr>${rows.map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td style="min-width:110px"><div class="bar"><i style="width:${r[3]}%"></i></div><span class="mute">${r[3]}%</span></td><td><button class="btn ${r[3] < 100 ? "pri" : ""}" onclick="toData('${r[0]}')">${r[3] < 100 ? "Add data" : "Update"}</button></td></tr>`).join("")}</table></div></div>
<div class="grid" style="align-content:start"><div class="card tint" style="background:var(--tealXL)"><h3>Split by scope</h3><p class="mute chart-instruction">Hover to expand a segment; click to explore the example.</p><div class="seg emission-segments" style="margin:10px 0 8px"><button type="button" style="flex:50;background:var(--amb)" data-share="scope1" onclick="showShareDetail('scope1')" aria-label="Scope 1, 50 percent. View details">50%</button><button type="button" style="flex:36;background:var(--teal)" data-share="scope2" onclick="showShareDetail('scope2')" aria-label="Scope 2, 36 percent. View details">36%</button><button type="button" style="flex:14;background:var(--ind);color:#fff" data-share="scope3" onclick="showShareDetail('scope3')" aria-label="Scope 3, 14 percent. View details">14%</button></div><div class="mute">Scope 1 · Scope 2 · Scope 3</div><p class="demo-disclaimer">Illustrative demo — figures and explanations are fictional, not real emissions data.</p></div>
<div class="card"><h3>Missing for Scope 3</h3>${["Flight bookings for Q3", "Train and taxi receipts", "Hotel nights"].map((m) => `<div class="item"><span class="sq" style="background:var(--peach);border-radius:50%"></span><div style="flex:1">${m}</div><button class="btn" onclick="toData('Business Travel')">Add</button></div>`).join("")}</div></div></div>`;
};
