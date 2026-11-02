/* Inbox page */
views.Inbox = () => {
  const open = tasks.filter((t) => !t.d).length;
  const priority = tasks.find((t) => !t.d);
  const priorityAction = priority ? (priority.h.includes("LCA") ? "openDraft()" : `go('${priority.t === "Overview" ? "Overview" : "Data Collection"}')`) : "go('Reports')";
  return `<h1>Inbox</h1><p class="sub">What needs your attention</p>
<div class="hero inbox-summary-v2"><div class="inbox-hero-counter"><strong>${open}</strong><span>open task${open === 1 ? "" : "s"}</span></div><div class="inbox-hero-copy"><h2>${open ? "Your next steps are ready" : "You’re all caught up"}</h2><p>${open ? "Review your outstanding actions below to keep 2026 reporting on track." : "All current tasks have been completed."}</p></div><div class="inbox-hero-completion"><span class="inbox-hero-completion-label">Task completion</span><strong>${tasks.length-open} <span>of ${tasks.length}</span></strong><div class="inbox-hero-mini-track"><i style="width:${tasks.length ? ((tasks.length-open)/tasks.length)*100 : 100}%"></i></div></div></div>
<div class="grid g3">${tasks.map((t, i) => `<div class="task tint ${t.d ? "done" : ""}" style="background:var(--${t.c})"><div><span class="mute">${t.t}</span><h3 style="margin-top:4px;font-size:17px">${t.h}</h3></div><div class="row"><button class="btn" onclick="${t.h.includes("LCA") ? "openDraft()" : `go('${t.t === "Overview" ? "Overview" : "Data Collection"}')`}">Open</button><button class="btn dk" onclick="tasks[${i}].d=!tasks[${i}].d;render();toast('${t.d ? "Task reopened" : "Marked as done"}')">${t.d ? "Undo" : "Mark as done"}</button></div></div>`).join("")}</div>
<div class="grid g2" style="margin-top:12px"><div class="card"><h3>Coming up</h3><span class="mute">Deadlines in the next two months</span><div class="tl"><div>14 Nov<br><span class="mute">Q3 data</span></div><div>28 Nov<br><span class="mute">LCA review</span></div><div>20 Dec<br><span class="mute">Q4 kickoff</span></div><div>15 Jan<br><span class="mute">Annual report</span></div></div></div>
<div class="card"><h3>Done recently</h3>${[
    ["Sent the heating invoices", "1 Oct"],
    ["Approved the 2025 baseline", "24 Sep"],
  ]
    .map(
      (a) =>
        `<div class="item"><span class="sq" style="background:var(--mint);border-radius:50%"></span><div style="flex:1">${a[0]}</div><span class="mute">${a[1]}</span></div>`,
    )
    .join("")}</div></div>
<section class="dashboard-followup" aria-label="Task overview">
  <div class="card task-queue">
    <div class="section-head"><div><h3>Task overview</h3><p class="mute">Your current items and their progress</p></div><span class="pill">${open} open</span></div>
    ${tasks.map((t,i)=>`<div class="queue-row"><span class="queue-num">${i+1}</span><div class="queue-main"><strong>${t.h}</strong><div class="mute">${t.t}</div></div><span class="pill ${t.d ? '' : 'o'}">${t.d ? 'Completed' : 'To do'}</span><button class="btn" onclick="${t.h.includes('LCA') ? 'openDraft()' : `go('${t.t === 'Overview' ? 'Overview' : 'Data Collection'}')`}">Open</button></div>`).join('')}
  </div>
  <div class="card next-action priority-panel">
    <div class="section-head"><div><h3>Recommended next step</h3><p class="mute">Focus on one item at a time</p></div><span class="pill ${open ? 'o' : ''}">${open ? 'To do' : 'Complete'}</span></div>
    <div class="priority-feature">
      <span class="priority-eyebrow">${priority ? priority.t : 'All tasks complete'}</span>
      <h3>${priority ? priority.h : 'You’re all caught up'}</h3>
      <p class="mute">${priority ? 'Start with this outstanding item to keep your reporting moving.' : 'All your current tasks are finished.'}</p>
      <button class="btn pri" onclick="${priorityAction}">${priority ? 'Open task' : 'View reports'}</button>
    </div>
    <div class="priority-progress"><div class="row sp"><strong>Task progress</strong><span class="mute">${tasks.length - open} of ${tasks.length} completed</span></div><div class="priority-progress-track"><span style="width:${tasks.length ? ((tasks.length-open)/tasks.length)*100 : 100}%"></span></div></div>
  </div>
</section>`;
};
