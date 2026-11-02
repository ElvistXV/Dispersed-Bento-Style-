/* Reports page */
views.Reports =
  () => `<h1>Reports</h1><p class="sub">Everything Dispersed has shared with you</p>
<div class="card report-summary"><div class="report-summary-period"><span class="mute">Next report</span><strong>Q4</strong></div><div class="report-summary-progress"><div class="row sp"><strong>Data collection progress</strong><span class="mute">In progress</span></div><div class="bar"><i style="width:35%"></i></div><p class="mute">We’re collecting the remaining information for your next report.</p></div><div class="report-summary-actions"><button class="btn" onclick="toast('Request sent to Dispersed')">Request support</button><button class="btn pri" onclick="go('Data Collection')">Send missing data</button></div></div>
<div class="card"><h3>All reports</h3><div class="mute">Everything Dispersed has shared with you</div><div class="tw"><table><tr><th>Report</th><th>Period</th><th>Status</th><th>Shared</th></tr>
${[
  ["Carbon footprint", "FY 2025", "Final", "14 Mar 2026"],
  ["LCA assessment", "2025", "Draft", "28 Oct 2026"],
  ["Reduction roadmap", "2026–2027", "Final", "11 Sep 2026"],
]
  .map(
    (r) =>
      `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td><span class="pill ${r[2] === "Draft" ? "o" : ""}">${r[2]}</span></td><td>${r[3]}</td></tr>`,
  )
  .join("")}</table></div></div>
<div class="grid g4" style="margin-top:12px">${kpi("peach", "Emissions in 2025", "845 tCO2", "Up to date")}${kpi("mint", "Change on 2024", "−21%", "Good progress")}${kpi("sand", "Largest source", "Electricity", "44% of the total")}${kpi("rose", "Reports this year", "3", "1 needs your review")}</div>
<section class="dashboard-followup reports-followup" aria-label="Report next steps">
<div class="card report-review"><div class="section-head"><div><h3>Needs your review</h3><p class="mute">One report is currently in draft</p></div><span class="pill o">Draft</span></div>
<div class="review-details"><div><strong>LCA assessment</strong><p class="mute">Period: 2025 · Shared: 28 Oct 2026</p></div><button class="btn" onclick="openDraft()">Review draft</button></div></div>
<div class="card"><h3>Reporting next steps</h3><div class="help-step"><span>1</span><div><strong>Review the LCA draft</strong><p>Check and comment on the draft assessment.</p></div></div><div class="help-step"><span>2</span><div><strong>Complete Q4 data</strong><p>Current collection progress: 35%.</p></div></div><button class="btn pri report-next-btn" onclick="go('Data Collection')">Send missing data</button></div>
</section>`;
