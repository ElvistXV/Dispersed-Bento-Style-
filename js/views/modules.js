/* Modules page: the four module cards */
views.Modules = () => {
  const card = (ic, t, sub, p, pc, bg, body, note, pg) =>
    `<div class="card mod"><div class="mhd"><div class="mh"><span class="sq" style="background:${ic}"></span><div><h3>${t}</h3><span class="mute">${sub}</span></div></div><span class="pill ${pc}">${p}</span></div><div class="mbody" style="background:${bg}"><div class="body">${body}</div><div class="foot"><span class="mute">${note}</span><button class="btn" onclick="goMod('${pg}')">Open</button></div></div></div>`;
  const bars = [
    ["Scope 1", 100],
    ["Scope 2", 100],
    ["Scope 3", 52],
  ]
    .map(
      (b) =>
        `<div class="mrow"><span>${b[0]}</span><div class="bar" ${b[1] < 100 ? 'style="background:#575108"' : ""}><i style="width:${b[1]}%;background:${b[1] < 100 ? "var(--amb)" : "var(--teal)"}"></i></div><b>${b[1]}%</b></div>`,
    )
    .join("");
  const steps = `<div class="ms">${["Scope", "Data", "Model", "Review", "Final"].map((n, i) => `<div class="${i < 3 ? "d" : i === 3 ? "c" : ""}"><i></i>${n}</div>`).join("")}</div><div class="mute" style="margin-top:14px">3 of 5 stages done</div>`;
  const cols = ["#ff8a5b", "#11bdb1", "#b5451f", "#878585"];
  const avs = `<div class="row" style="justify-content:center;padding:6px 0 0">${team
    .slice(0, 4)
    .map(
      (m, i) =>
        `<span class="av" style="width:46px;height:46px;margin-left:${i ? -8 : 0}px;background:${cols[i]};color:#000;border:2px solid #d7d0e0">${m.i}</span>`,
    )
    .join(
      "",
    )}</div><div class="mute" style="text-align:center;margin-top:14px">Anna Meijer was invited last week</div>`;
  return `<h1>Modules</h1><p class="sub">Every Dispersed service in one place</p>${chips("")}
<div class="mods">
${card("var(--teal)", "Scope 1-2-3", "Carbon accounting for every scope", "In progress", "pk", "#fdeedd", bars, "Next report due in 6 weeks", "scope")}
${card("var(--or)", "Life Cycle Assessment", "Product-level analysis by Dispersed", "Review draft", "pk", "var(--tealXL)", steps, "Next review due this week", "lca")}
${card("var(--ind)", "Users", "Who can see and do what", team.length + " members", "g", "var(--lav)", avs, "Invite a colleague", "users")}
<div class="add"><div><b>+</b><div style="font-weight:700">Add a module</div><div class="mute">See what Dispersed can set up</div></div></div>
</div>`;
};
