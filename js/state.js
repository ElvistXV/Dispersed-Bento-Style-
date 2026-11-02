/* =====================================================
   state.js  App data and in-memory state
   Everything resets on reload. Swap these for API calls
   when you connect a backend.
   ===================================================== */

/* ----- Navigation (main nav pages) ----- */
const pages = ["Overview", "Modules", "Inbox", "Data Collection", "Reports"];

/* ----- Inbox tasks ----- */
let tasks = [
  {
    c: "peach",
    t: "Data collection",
    h: "Upload Q3 electricity document readings",
    d: false,
  },
  {
    c: "mint",
    t: "Data collection",
    h: "Review the draft LCA report",
    d: false,
  },
  { c: "lav", t: "Overview", h: "Confirm your net-zero year", d: false },
];

/* ----- Data Collection ----- */
let cat = "Electricity"; // currently selected category
let dc = {}; // per-category files, note, sent flag
const CATS = [
  "Electricity",
  "Heating",
  "Company Cars",
  "Business Travel",
  "Waste",
];
const D = (c) => dc[c] || (dc[c] = { files: [], note: "", sent: false });

/* ----- LCA module ----- */
let lca = { ok: false };
let dr = [false, false, false]; // which draft comments are resolved
const CM = [
  [
    "Lena Brouwer",
    "LB",
    "rose",
    "Results",
    "Please confirm the steel supplier is Dutch. It changes the raw materials figure.",
  ],
  [
    "Bas Verhoeven",
    "BV",
    "mint",
    "Transport",
    "We moved German deliveries to rail in 2025. Is that reflected here?",
  ],
  [
    "Lena Brouwer",
    "LB",
    "rose",
    "Assumptions",
    "The use phase assumes 25 years. Is that the warranty period or the typical lifetime?",
  ],
];
const STG = [
  ["Raw materials", 5.1, 41],
  ["Manufacturing", 3.5, 28],
  ["Transport", 1.7, 14],
  ["Use phase", 1.4, 11],
  ["End of life", 0.7, 6],
];

/* ----- Users module ----- */
let team = [
  { n: "Raees Pritchard", i: "RP", r: "Admin", a: "Active now", c: "or" },
  {
    n: "Bas Verhoeven",
    i: "BV",
    r: "Contributor",
    a: "2 hours ago",
    c: "mint",
  },
  { n: "Ula Mertens", i: "UM", r: "Contributor", a: "Yesterday", c: "lav" },
  { n: "Lena Brouwer", i: "LB", r: "Viewer", a: "3 days ago", c: "rose" },
];
