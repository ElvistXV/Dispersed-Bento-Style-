/* =====================================================
   app.js  Router and render loop. Loaded last.
   Routes are URL hashes: #overview, #modules, #modules-lca ...
   ===================================================== */
function render() {
  const h = location.hash.slice(1),
    sub = h.startsWith("modules-") ? h.slice(8) : "",
    p = sub ? "Modules" : pages.find((x) => slug(x) === h) || "Overview";
  document.body.dataset.route = h || "overview";
  // Keep the navigation elements mounted so the active pill can glide
  // between tabs instead of abruptly being recreated on every route.
  const tabs = $("#tabs");
  if (!tabs.querySelector(".nav-indicator")) {
    tabs.innerHTML = `<span class="nav-indicator" aria-hidden="true"></span>` + pages
      .map((x) => `<button type="button" onclick="go('${x}')">${x}</button>`)
      .join("");
  }
  tabs.querySelectorAll("button").forEach((button) => {
    const active = button.textContent === p;
    button.classList.toggle("on", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  // The pill keeps its previous position until the next animation frame.
  requestAnimationFrame(positionActiveNav);
  $("#view").innerHTML =
    sub && views["mod-" + sub] ? views["mod-" + sub]() : views[p]();
  $("#view").className = "page-" + slug(p);
  setupInfoTips();
  setupTrendPointTooltips();
  setupEmissionSegmentHover();
  const d = $("#drop");
  if (d) {
    const f = $("#file");
    d.onclick = () => f.click();
    f.onchange = () => addFiles(f.files);
    d.ondragover = (e) => {
      e.preventDefault();
      d.classList.add("ov");
    };
    d.ondragleave = () => d.classList.remove("ov");
    d.ondrop = (e) => {
      e.preventDefault();
      d.classList.remove("ov");
      addFiles(e.dataTransfer.files);
    };
    d.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        f.click();
      }
    };
  }
}

/* ----- Start ----- */
addEventListener("hashchange", render);
render();


/* Move the selected-tab background; tab buttons are never replaced. */
function positionActiveNav() {
  const tabs = $("#tabs");
  const active = tabs.querySelector("button.on");
  const indicator = tabs.querySelector(".nav-indicator");
  if (!active || !indicator) return;
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  if (!indicator.classList.contains("ready")) {
    // Initial placement should not slide from an unrelated position.
    requestAnimationFrame(() => indicator.classList.add("ready"));
  }
}
window.addEventListener("resize", positionActiveNav);

/* Contextual explanations on the small set of informative elements. */
function setupInfoTips() {
  const view = $("#view");
  const addTip = (element, message) => {
    if (!element) return;
    element.classList.add("info-tip");
    element.dataset.tip = message;
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-label", `${element.textContent.trim().replace(/\s+/g, " ")}. ${message}`);
  };
  if (view.classList.contains("page-reports")) {
    const tips = [
      "Total greenhouse gas emissions shown for the 2025 reporting year, in tonnes of CO₂ equivalent.",
      "Change in emissions compared with the previous reporting year, 2024.",
      "Electricity makes up 44% of the emissions total shown in this prototype.",
      "Three reports are listed this year; one draft is awaiting your review."
    ];
    view.querySelectorAll(".grid.g4 .k").forEach((el, i) => addTip(el, tips[i]));
    addTip(view.querySelector(".report-summary-progress"), "The Q4 report is currently 35% complete according to the prototype's example data.");
    view.querySelectorAll(".tw .pill").forEach(el => addTip(el,
      el.textContent.trim() === "Draft"
        ? "Draft report: available to review and comment on before final approval."
        : "Final report: marked as completed in the report list."));
  }
  if (view.classList.contains("page-inbox")) {
    addTip(view.querySelector(".inbox-hero-completion"), "Shows how many of your current Inbox tasks have been completed.");
  }
  if (view.classList.contains("page-data-collection")) {
    addTip(view.querySelector(".collection-progress .progress-track"), "Shows how many of the five data sources have been sent to Dispersed.");
  }
}


/* Explain the individual points on the Overview emissions trend.
   All explanations are limited to facts stated in this prototype. */
function setupTrendPointTooltips() {
  const wrapper = document.querySelector(".trend-chart-wrap");
  if (!wrapper) return;
  const tooltip = wrapper.querySelector(".trend-tooltip");
  const svg = wrapper.querySelector("svg");
  const title = tooltip.querySelector(".trend-tooltip-title");
  const detail = tooltip.querySelector(".trend-tooltip-detail");
  const points = [...wrapper.querySelectorAll(".trend-dot")];
  let selected = null;
  function show(point) {
    selected = point;
    title.textContent = point.dataset.title;
    detail.textContent = point.dataset.detail;
    tooltip.hidden = false;
    points.forEach(p => p.classList.toggle("selected", p === point));
    // viewBox coordinates map to the rendered SVG (same aspect ratio).
    const x = Number(point.dataset.x) / 420 * svg.clientWidth;
    const y = Number(point.dataset.y) / 190 * svg.clientHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const clampedX = Math.max(tooltipWidth / 2 + 8, Math.min(svg.clientWidth - tooltipWidth / 2 - 8, x));
    tooltip.style.left = `${clampedX}px`;
    // Place tooltip below points near the upper edge so it stays visible.
    tooltip.style.top = `${y}px`;
    tooltip.classList.toggle("below", y < tooltip.offsetHeight + 16);
  }
  function hide(point) {
    if (selected !== point) return;
    selected = null;
    tooltip.hidden = true;
    points.forEach(p => p.classList.remove("selected"));
  }
  points.forEach(point => {
    point.addEventListener("pointerenter", () => show(point));
    point.addEventListener("pointerleave", () => {
      if (document.activeElement !== point) hide(point);
    });
    point.addEventListener("focus", () => show(point));
    point.addEventListener("blur", () => hide(point));
    point.addEventListener("click", () => {
      if (selected === point && tooltip.dataset.pinned === "true") {
        tooltip.dataset.pinned = "false";
        hide(point);
      } else {
        tooltip.dataset.pinned = "true";
        show(point);
      }
    });
    point.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        tooltip.dataset.pinned = "false";
        hide(point);
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); point.click();
      }
    });
  });
  wrapper.addEventListener("pointerleave", () => {
    if (tooltip.dataset.pinned !== "true" && document.activeElement?.closest(".trend-dot") == null && selected) hide(selected);
  });
}


/* All of the following explanations and figures are fictional DEMO content.
   The numeric shares and totals match the prototype so the breakdown is consistent. */
const emissionShareDetails = {
  electricity: {name:"Electricity", tonnes:304, percent:36, scope:"Scope 2", description:"Purchased electricity for factory machines, lighting and office equipment.", context:"Illustrative explanation: high machinery runtime and older lighting made electricity the largest source in this demo. A switch to LED lighting and a more efficient production schedule could lower this share in future reporting.", short:"Example: factory machinery and lighting contribute most of this share."},
  cars: {name:"Company cars", tonnes:254, percent:30, scope:"Scope 1", description:"Fuel used by company-owned cars and vans.", context:"Illustrative explanation: frequent deliveries and long commutes in petrol/diesel vehicles made the fleet a major source. A staged switch to electric vehicles and optimized routes could help reduce it.", short:"Example: fuel use from frequent vehicle trips and deliveries."},
  heating: {name:"Heating", tonnes:169, percent:20, scope:"Scope 1", description:"Energy used to heat the workspace and production buildings.", context:"Illustrative explanation: an older gas heating system and poor insulation raised winter usage. Better insulation and improved thermostat scheduling could reduce future emissions.", short:"Example: winter heating demand and inefficient insulation."},
  travel: {name:"Business travel", tonnes:118, percent:14, scope:"Scope 3", description:"Flights, train journeys and other staff business travel.", context:"Illustrative explanation: several long-distance client visits drove this portion of emissions. More video meetings and rail travel could reduce it. Scope 3 is partially complete in the example data.", short:"Example: flights and long-distance client visits."},
  scope1: {name:"Scope 1", tonnes:423, percent:50, scope:"Direct emissions", description:"Direct emissions from heating (169 tCO₂) and company cars (254 tCO₂).", context:"Illustrative explanation: vehicles running on petrol or diesel, plus gas heating, dominate Scope 1. A fleet transition and heating-system upgrades would likely reduce the example total.", short:"Example: vehicle fuel plus on-site heating."},
  scope2: {name:"Scope 2", tonnes:304, percent:36, scope:"Purchased energy", description:"Indirect emissions associated with the electricity purchased for operations.", context:"Illustrative explanation: production equipment and lighting draw significant electricity. Energy-saving upgrades or a cleaner electricity mix could reduce this example category.", short:"Example: electricity for equipment and lighting."},
  scope3: {name:"Scope 3", tonnes:118, percent:14, scope:"Other indirect emissions", description:"Indirect emissions from business travel recorded so far.", context:"Illustrative explanation: business flights and external travel account for this example amount. The prototype lists Scope 3 as only 52% complete, so its share would likely change after data collection.", short:"Example: business travel; example data is incomplete."}
};

/* Spotlight a hovered category across the whole bar, but restore the
   original proportional split when the pointer or keyboard focus leaves. */
function setupEmissionSegmentHover() {
  document.querySelectorAll('.emission-segments').forEach(bar => {
    const buttons = [...bar.querySelectorAll('button[data-share]')];
    if (!buttons.length) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'emission-chart-interaction';
    bar.parentNode.insertBefore(wrapper, bar);
    wrapper.appendChild(bar);
    const tip = document.createElement('div');
    tip.className = 'emission-hover-popup';
    tip.setAttribute('role','status');
    tip.setAttribute('aria-live','polite');
    tip.hidden = true;
    wrapper.appendChild(tip);
    // Keep a clicked segment collapsed while its details are open, and after
    // the dialog closes/restores focus to the trigger. A fresh hover or focus
    // movement is needed before the spotlight can expand again.
    let clickLocked = false;
    function activate(button) {
      if (clickLocked || document.getElementById('share-detail-dialog')) return;
      const data = emissionShareDetails[button.dataset.share];
      if (!data) return;
      bar.classList.add('is-exploring');
      buttons.forEach(b => b.classList.toggle('is-active', b === button));
      tip.innerHTML = `<strong>${data.name} · ${data.percent}%</strong><span>${data.short}</span><small>Illustrative demo · click for details</small>`;
      tip.hidden = false;
    }
    function clear() {
      bar.classList.remove('is-exploring');
      buttons.forEach(b => b.classList.remove('is-active'));
      tip.hidden = true;
    }
    buttons.forEach(button => {
      button.addEventListener('pointerenter', () => {
        // Only a genuinely new hover starts the next expansion.
        if (!document.getElementById('share-detail-dialog')) clickLocked = false;
        activate(button);
      });
      button.addEventListener('focus', () => activate(button));
      // Capture runs before the inline onclick which opens the dialog.
      button.addEventListener('click', () => {
        clickLocked = true;
        clear();
      }, {capture: true});
    });
    bar.addEventListener('pointerleave', clear);
    bar.addEventListener('focusout', e => {
      if (!bar.contains(e.relatedTarget)) {
        clear();
        // Moving to a different control also permits future keyboard focus.
        if (!document.getElementById('share-detail-dialog')) clickLocked = false;
      }
    });
    bar.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        clear();
        bar.querySelector('.is-active')?.blur();
      }
    });
  });
}
function showShareDetail(key) {
  const data = emissionShareDetails[key];
  if (!data) return;
  closeShareDetail();
  const modal = document.createElement("div");
  modal.className = "share-modal-backdrop";
  modal.id = "share-detail-dialog";
  modal.innerHTML = `<section class="share-modal" role="dialog" aria-modal="true" aria-labelledby="share-modal-title" aria-describedby="share-modal-description">
    <div class="share-modal-heading"><div><span class="mute">2025 emissions breakdown · ${data.scope}</span><h2 id="share-modal-title">${data.name}</h2></div><button type="button" class="share-close" aria-label="Close details" onclick="closeShareDetail()">×</button></div>
    <div class="share-modal-number"><strong>${data.percent}%</strong><span>${data.tonnes} of 845 tCO₂</span></div>
    <div class="share-modal-bar" aria-hidden="true"><span style="width:${data.percent}%"></span></div>
    <h3>How this percentage is calculated</h3><p id="share-modal-description">${data.tonnes} ÷ 845 × 100 = ${(data.tonnes/845*100).toFixed(1)}%, rounded to ${data.percent}%.</p>
    <h3>What it represents</h3><p>${data.description}</p>
    <h3>Why is it this share?</h3><p>${data.context}</p>
    <p class="share-modal-footnote">Illustrative demo only: all emissions figures, explanations and underlying data are fictional, not real measurements.</p>
    <button type="button" class="btn dk" onclick="closeShareDetail()">Close</button>
  </section>`;
  modal.addEventListener("click", e => {if (e.target === modal) closeShareDetail();});
  document.body.appendChild(modal);
  window._sharePreviousFocus = document.activeElement;
  modal.querySelector(".share-close").focus();
}
function closeShareDetail() {
  const modal = document.getElementById("share-detail-dialog");
  if (modal) modal.remove();
  if (window._sharePreviousFocus?.isConnected) window._sharePreviousFocus.focus();
  window._sharePreviousFocus = null;
}
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (document.getElementById("share-detail-dialog")) closeShareDetail();
});
