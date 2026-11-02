/* =====================================================
   draft-overlay.js  The LCA draft report window
   ===================================================== */
let lastF = null; // element to refocus when the window closes

function drawDraft() {
  const open = dr.filter((x) => !x).length;
  $("#ovl").innerHTML =
    `<div class="sheet"><div class="sh-top"><div><b id="dt">LCA_valve_V2_draft.pdf</b><div class="mute">Draft 3 · shared by Lena Brouwer on 28 Oct</div></div><div class="row">${lca.ok ? '<span class="pill">Approved</span>' : '<button class="btn pri" onclick="approveDraft()">Approve draft</button>'}<button class="btn" id="dclose" onclick="closeDraft()">Close</button></div></div>
<article class="paper"><p class="mute" style="margin:0">Prepared for Demo Manufacturing B.V.</p><h2>Life Cycle Assessment: Industrial valve series V2</h2>
<h4>Summary</h4><p>One DN50 valve from the V2 series causes about 12.4 kg CO2e over its full life, from raw materials to disposal. Raw materials and manufacturing make up 69% of that. Changing the steel supplier or the casting process offers the biggest reduction.</p>
<h4>Goal and scope</h4><ul><li>Functional unit: one DN50 valve used for 25 years</li><li>System boundary: cradle to grave</li><li>Method: ISO 14040 and ISO 14044, data from 2025</li></ul>
<h4>Results</h4><div class="k" style="background:var(--mint);margin-bottom:10px"><small>Result per unit</small><b>12.4 kg CO2e</b></div>
<div class="tw"><table><tr><th>Life stage</th><th>kg CO2e</th><th>Share</th></tr>${STG.map((r) => `<tr><td>${r[0]}</td><td>${r[1].toFixed(1)}</td><td style="min-width:140px"><div class="row"><div class="bar" style="flex:1"><i style="width:${r[2] * 2}%"></i></div><b>${r[2]}%</b></div></td></tr>`).join("")}</table></div>
<h4>Data quality and assumptions</h4><ul><li>Material weights come from your bill of materials</li><li>Transport uses average road distances per market</li><li>Use phase assumes no repairs in the first 25 years</li></ul>
<h4>Comments for you to review <span class="pill ${open ? "o" : ""}">${open ? open + " open" : "All resolved"}</span></h4>
${CM.map((c, i) => `<div class="item cm ${dr[i] ? "res" : ""}"><span class="av" style="width:34px;height:34px;background:var(--${c[2]})">${c[1]}</span><div style="flex:1"><b>${c[0]}</b> <span class="mute">on ${c[3]}</span><div>${c[4]}</div></div><button class="btn" onclick="resolveC(${i})">${dr[i] ? "Reopen" : "Resolve"}</button></div>`).join("")}</article></div>`;
}

function openDraft() {
  lastF = document.activeElement;
  drawDraft();
  $("#ovl").classList.add("on");
  document.body.style.overflow = "hidden";
  $("#ovl").scrollTop = 0;
  $("#dclose").focus();
}
function closeDraft() {
  $("#ovl").classList.remove("on");
  document.body.style.overflow = "";
  if (lastF && lastF.focus) lastF.focus();
}
function resolveC(i) {
  dr[i] = !dr[i];
  drawDraft();
  render();
}
function approveDraft() {
  closeDraft();
  approve();
}
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $("#ovl").classList.contains("on")) closeDraft();
});
