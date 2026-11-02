# Bento by Dispersed

A static prototype of the Bento client portal. No build step and no server needed: open `index.html` in a browser.

```
index.html            Page shell (header, containers, script tags)
assets/logo.png       Dispersed dots logo
css/
  base.css            Design tokens (colors), reset, typography
  layout.css          Header, nav pill, grid helpers
  components.css      Cards, buttons, pills, tables, bars, chips, form fields, toast
  pages.css           Styles for individual screens
  responsive.css      Tablet and phone rules
js/
  state.js            Data and in-memory state (tasks, team, files, draft comments)
  helpers.js          $, esc, size, toast, KPI tile, module chips
  actions.js          Click and input handlers (navigation, send data, invite, approve)
  views/
    registry.js       Creates the `views` object
    overview.js  modules.js  inbox.js  data-collection.js  reports.js
    module-scope.js  module-lca.js  module-users.js   (sub-pages of Modules)
    draft-overlay.js  The LCA draft report window
  app.js              Router (URL hash) and render loop
```

Routes: `#overview`, `#modules`, `#inbox`, `#data-collection`, `#reports`, plus `#modules-scope`, `#modules-lca`, `#modules-users`.

Changing colors: edit the variables at the top of `css/base.css`.

Script order matters. The files share globals, so keep the order used in `index.html`.

All data lives in memory and resets on reload.

## Layout update

The shared header is defined once in `css/layout.css`. The Inbox, Data Collection and Reports spacing is consolidated in `css/pages.css`. Card heights are based on content rather than viewport height, so controls remain usable and the checklist and upload panel align. On tall displays, the beige background below short pages is expected; avoiding it completely would require more content or unnaturally stretching cards.

## Layout update (Nov 2026)
The Data Collection page now includes a live Collection progress summary and a short submission guide below the upload panel. This fills unused page space with useful information without stretching the upload and KPI cards to full-screen height. Progress is derived from the existing in-memory `dc` state and resets on reload, like the rest of the prototype.

Inbox and Reports include contextual lower sections driven by existing prototype tasks and report details, keeping the original cards compact.

## Demo emissions data

All emissions numbers, percentages, explanations, reduction causes, forecasts and targets shown in this prototype are **fictional illustrative demo data**, not real or verified measurements for any company. The source and scope segments expand across the bar on hover or keyboard focus, show a short explanatory popup, and open a detailed demo breakdown when clicked. The plotted trend-point explanations are also fictional examples.
