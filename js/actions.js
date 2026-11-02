/* =====================================================
   actions.js  Everything a click or input can trigger.
   These are global because the HTML uses inline onclick.
   ===================================================== */

/* ----- Navigation ----- */
function go(p) {
  location.hash = slug(p);
  window.scrollTo(0, 0);
}
function goMod(k) {
  location.hash = "modules-" + k;
  window.scrollTo(0, 0);
}
function toData(c) {
  cat = c;
  go("Data Collection");
}

/* ----- Data Collection ----- */
function addFiles(l) {
  const s = D(cat);
  [...l].forEach((f) => {
    if (!s.files.some((x) => x.name === f.name && x.size === f.size))
      s.files.push({ name: f.name, size: f.size });
  });
  render();
}
function rmFile(i) {
  D(cat).files.splice(i, 1);
  render();
}
function noteIn(v) {
  const s = D(cat);
  s.note = v;
  $("#send").disabled = !(s.files.length || v.trim());
}
function sendData() {
  const s = D(cat);
  if (!s.files.length && !s.note.trim()) return;
  s.sent = true;
  s.at = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  if (cat === "Electricity") tasks[0].d = true;
  render();
  toast(cat + " data sent to Dispersed");
}
function again() {
  dc[cat] = { files: [], note: "", sent: false };
  render();
}

/* ----- LCA module ----- */
function approve() {
  lca.ok = true;
  render();
  toast("LCA report approved");
}

/* ----- Users module ----- */
function invite() {
  const nameField = $("#inv-name");
  const emailField = $("#inv-email");
  const name = nameField.value.trim().replace(/\s+/g, " ");
  const email = emailField.value.trim();
  const error = $("#inv-err");
  error.textContent = "";
  nameField.removeAttribute("aria-invalid");
  emailField.removeAttribute("aria-invalid");

  if (!name) {
    error.textContent = "Enter the name your colleague should be known as.";
    nameField.setAttribute("aria-invalid", "true");
    nameField.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "Enter a valid email address.";
    emailField.setAttribute("aria-invalid", "true");
    emailField.focus();
    return;
  }
  if (team.some((m) => m.email && m.email.toLowerCase() === email.toLowerCase())) {
    error.textContent = "This email address has already been invited.";
    emailField.setAttribute("aria-invalid", "true");
    emailField.focus();
    return;
  }
  if (team.length >= 10) {
    error.textContent = "All 10 seats are occupied. Remove a member before inviting another.";
    return;
  }
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  team.push({
    n: name,
    email,
    i: initials,
    r: $("#inv-role").value,
    a: "Invite pending",
    c: "line",
  });
  render();
  toast("Invite created for " + name);
}

function rmUser(i) {
  const m = team.splice(i, 1)[0];
  render();
  toast("Removed " + m.n);
}
