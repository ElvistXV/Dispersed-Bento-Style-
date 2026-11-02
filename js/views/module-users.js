/* Module page: Users */
views["mod-users"] = () => `
<h1>Users</h1>
<p class="sub">Who can see and send data for Demo Manufacturing B.V.</p>
${chips("users")}
<div class="users-layout">
  <section class="card users-members" aria-label="Members">
    <div class="row sp"><h3>Members</h3><span class="pill l">${team.length} members</span></div>
    <div class="users-member-list">${team.map((m, i) => `
      <div class="item users-member">
        <span class="av" style="width:40px;height:40px;background:var(--${m.c});color:${m.c === "or" ? "#fff" : "#000"}">${esc(m.i)}</span>
        <div class="users-member-details">
          <b>${esc(m.n)}</b>
          ${m.email ? `<span class="mute">${esc(m.email)}</span>` : ""}
          <span class="mute">${esc(m.a)}</span>
        </div>
        <span class="pill pr ${m.a === "Invite pending" ? "o" : "l"}">${esc(m.r)}</span>
        ${i ? `<button class="btn rm" aria-label="Remove ${esc(m.n)}" onclick="rmUser(${i})">Remove</button>` : '<span class="rm"></span>'}
      </div>`).join("")}
    </div>
    <div class="users-seats">
      <div class="row sp"><span class="mute">Seats used</span><b>${team.length} of 10</b></div>
      <div class="bar" style="margin-top:6px"><i style="width:${Math.min(team.length * 10, 100)}%"></i></div>
    </div>
  </section>

  <section class="card tint users-invite" style="background:var(--peach)" aria-label="Invite a colleague">
    <h3>Invite a colleague</h3>
    <form id="invite-form" onsubmit="event.preventDefault();invite()" novalidate>
      <label class="mute" for="inv-name">Display name</label>
      <input id="inv-name" type="text" class="inp" placeholder="Name to display" autocomplete="name" maxlength="80" required>
      <label class="mute" for="inv-email">Work email</label>
      <input id="inv-email" type="email" class="inp" placeholder="name@company.com" autocomplete="email" required>
      <label class="mute" for="inv-role">Role</label>
      <select id="inv-role" class="inp"><option>Contributor</option><option>Viewer</option><option>Admin</option></select>
      <div id="inv-err" role="alert" aria-live="polite" class="users-invite-error"></div>
      <button class="btn pri" type="submit">Send invite</button>
    </form>
  </section>

  <section class="card tint users-roles" style="background:var(--lav)" aria-label="Role permissions">
    <h3>What each role can do</h3>
    <div class="users-roles-grid">
      <div><b>Admin</b><span>Manage people, send data, approve reports</span></div>
      <div><b>Contributor</b><span>Send data and review drafts</span></div>
      <div><b>Viewer</b><span>Read reports only</span></div>
    </div>
  </section>
</div>`;
