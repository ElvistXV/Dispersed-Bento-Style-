/* Data Collection page */
views["Data Collection"] = () => {
  const s = D(cat),
    has = s.files.length || s.note.trim();
  return `<h1>Data Collection</h1><p class="sub">Send the data your consultant needs, one source at a time</p>
<div class="dc"><div class="card cats" role="tablist">${CATS.map((c) => `<button class="cat ${c === cat ? "on" : ""}" role="tab" aria-selected="${c === cat}" onclick="cat='${c}';render()"><i class="${dc[c] && dc[c].sent ? "ok" : ""}"></i>${c}</button>`).join("")}</div>
<div class="card"><div class="row sp"><h3>${cat} · Q3 2025</h3><span class="pill ${s.sent ? "" : "o"}">${s.sent ? "Sent" : has ? "Ready to send" : "Waiting for data"}</span></div>
${
  s.sent
    ? `<div class="sent-panel"><div class="tick">✓</div><h3>Sent to Dispersed on ${s.at}</h3><p class="mute">Your consultant will check ${s.files.length ? s.files.length + " file" + (s.files.length > 1 ? "s" : "") : "your note"} within two working days.</p>${s.files.length ? `<ul class="files" style="text-align:left">${s.files.map((f) => `<li><span>${esc(f.name)}</span><span class="mute">${size(f.size)}</span></li>`).join("")}</ul>` : ""}<button class="btn" onclick="again()">Send more data</button></div>`
    : `<div class="mute">Dispersed will check what you send within two working days.</div>
<div class="drop" id="drop" role="button" tabindex="0" aria-label="Add files"><b>Drop your data here</b><div class="mute" style="margin:4px 0 12px">Spreadsheets, PDFs or invoices with your ${cat.toLowerCase()} data. We will sort it into the right fields.</div><span class="btn">Browse files</span></div>
<input type="file" multiple hidden id="file">
${s.files.length ? `<ul class="files">${s.files.map((f, i) => `<li><span>${esc(f.name)}</span><span class="mute">${size(f.size)}</span><button aria-label="Remove ${esc(f.name)}" onclick="rmFile(${i})">×</button></li>`).join("")}</ul>` : ""}
<b>Notes</b><textarea id="note" placeholder="Anything we should know about this data?" oninput="noteIn(this.value)">${esc(s.note)}</textarea>
<div class="row sp" style="margin-top:12px"><span class="mute">Add a file or a note to send.</span><button class="btn pri" id="send" ${has ? "" : "disabled"} onclick="sendData()">Send data</button></div>`
}</div></div>
<section class="collection-followup" aria-label="Collection status and guidance">
  <div class="card collection-progress">
    <div class="section-head"><div><h3>Collection progress</h3><p class="mute">Submission status for the five data sources</p></div><strong class="progress-total">${CATS.filter(c => D(c).sent).length} / ${CATS.length} sent</strong></div>
    <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${CATS.filter(c => D(c).sent).length}" aria-label="Sources sent"><span style="width:${CATS.filter(c => D(c).sent).length / CATS.length * 100}%"></span></div>
    <div class="source-statuses">${CATS.map(c => `<button class="source-status" onclick="cat='${c}';render()"><span class="status-dot ${D(c).sent ? 'complete' : ''}"></span><span>${c}</span><span class="mute">${D(c).sent ? 'Sent' : D(c).files.length || D(c).note.trim() ? 'In progress' : 'Pending'}</span></button>`).join('')}</div>
  </div>
  <div class="card collection-help">
    <h3>What happens next?</h3>
    <p class="mute">A simple process for submitting each data source.</p>
    <div class="help-step"><span>1</span><div><b>Choose a source</b><p>Pick Electricity, Heating, Company Cars, Business Travel or Waste.</p></div></div>
    <div class="help-step"><span>2</span><div><b>Attach your data</b><p>Add files, notes, or both, then select Send data.</p></div></div>
    <div class="help-step"><span>3</span><div><b>Consultant review</b><p>Dispersed will check your submission within two working days.</p></div></div>
  </div>
</section>`;
};
