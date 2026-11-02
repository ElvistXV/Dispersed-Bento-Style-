/* =====================================================
   helpers.js  Small utilities and shared templates
   ===================================================== */

/* ----- DOM shortcut ----- */
const $ = (s) => document.querySelector(s);

/* ----- Text helpers ----- */
const slug = (p) => p.toLowerCase().replace(" ", "-");
const esc = (t) =>
  String(t).replace(
    /[&<>"]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m],
  );
const size = (n) =>
  n > 1048576
    ? (n / 1048576).toFixed(1) + " MB"
    : Math.max(1, Math.round(n / 1024)) + " KB";

/* ----- Toast message at the bottom of the screen ----- */
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(toast.x);
  toast.x = setTimeout(() => t.classList.remove("on"), 1800);
}

/* ----- KPI tile used on Overview, Scope and Reports ----- */
function kpi(c, l, v, s) {
  return `<div class="k" style="background:var(--${c})"><small>${l}</small><b>${v}</b><span>${s}</span></div>`;
}

/* ----- Module name chips shown under the page heading ----- */
const chips = (a) =>
  `<div class="chips" role="group" aria-label="Modules">${[
    ["", "All Modules"],
    ["scope", "Scope 1-2-3"],
    ["lca", "LCA"],
    ["users", "Users"],
  ]
    .map(
      ([k, n]) =>
        `<button class="chip ${k === a ? "on" : ""}" ${k === a ? 'aria-current="page"' : ""} onclick="${k ? `goMod('${k}')` : `go('Modules')`}">${n}</button>`,
    )
    .join("")}</div>`;
