/* Module page: Life Cycle Assessment */
views["mod-lca"] = () => {
  const st = ["Scope", "Data", "Model", "Review", "Final"],
    cur = lca.ok ? 5 : 3,
    hot = [
      ["Raw materials", 41],
      ["Manufacturing", 28],
      ["Transport", 14],
      ["Use phase", 11],
      ["End of life", 6],
    ];
  return `<h1>Life Cycle Assessment</h1><p class="sub">The footprint of your products, from raw materials to end of life</p>${chips("lca")}
<div class="card tint" style="background:var(--tealXL);padding:22px"><div class="row sp" style="flex-wrap:wrap;margin-bottom:18px"><div><h3>Industrial valve series V2</h3><span class="mute">${lca.ok ? "Approved on " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "Draft ready for your review"}</span></div>${lca.ok ? '<span class="pill">Final</span>' : '<button class="btn pri" onclick="approve()">Approve draft</button>'}</div>
<div class="steps">${st.map((n, i) => `<div class="step ${i < cur ? "s-done" : i === cur ? "s-now" : ""}"><i>${i < cur ? "\u2713" : ""}</i>${n}</div>`).join("")}</div></div>
<div class="grid g2" style="margin-top:12px"><div class="card"><h3>Where the footprint comes from</h3><span class="mute">Share of impact per life stage</span>${hot.map((h) => `<div class="mrow" style="grid-template-columns:110px 1fr 40px;margin:12px 0"><span>${h[0]}</span><div class="bar"><i style="width:${h[1] * 2}%"></i></div><b>${h[1]}%</b></div>`).join("")}</div>
<div class="grid" style="align-content:start"><div class="k" style="background:var(--mint)"><small>Result per unit</small><b>12.4 kg CO2e</b><span>Per valve, cradle to grave</span></div>
<div class="card"><h3>Draft report</h3><div class="mute">LCA_valve_V2_draft.pdf · ${dr.filter((x) => !x).length} open comments</div><div class="row" style="margin-top:12px"><button class="btn" onclick="openDraft()">Open draft</button><button class="btn" onclick="go('Inbox')">See task</button></div></div></div></div>`;
};
