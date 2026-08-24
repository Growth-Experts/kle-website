export const TEAM = [
  { id: "jason", name: "Jason Bagley", role: "Founder" },
  { id: "taylor-j", name: "Taylor Jackson", role: "Senior Growth Expert" },
  { id: "edwin", name: "Edwin Mbugua", role: "Senior Growth Expert" },
  { id: "marli", name: "Marli Welgemoed", role: "Growth Expert" },
  { id: "asta", name: "Asta Geldenhuys", role: "Growth Expert" },
  { id: "taylor-l", name: "Taylor Lawrence", role: "Growth Marketer" },
  { id: "lauren", name: "Lauren Peacock", role: "Director of Operations" },
];

export const WEEKS = [
  {
    id: "2026-08-24",
    label: "24 Aug 2026",
    period: "~10 days to 24 Aug 2026",
    source: "Slack updates (Taylor Lawrence 24 Aug, Asta Geldenhuys) and team notes",
    headline:
      "Reddit is still the only channel that has produced calls. Custom emails to open marketing roles (14) and Smartlead (70) have both returned zero replies. LinkedIn has the volume. Tick team DMs as people send.",
    linkedin: {
      contacted: 222,
      connected: 42,
      acceptRate: 19,
      replies: 2,
      replyRate: 0.9,
      calls: 0,
    },
    smartlead: {
      sent: 70,
      openRate: 84.3,
      bounceRate: 1.43,
      opens: 59,
      bounces: 1,
      replies: 0,
      calls: 0,
    },
    roles: { sent: 14, replies: 0, calls: 0 },
    reddit: {
      comments: 15,
      replies: 4,
      replyRate: 26.7,
      calls: 2,
      notFit: 1,
      discoveryTomorrow: 1,
    },
    callsBooked: 2,
    discoveryTomorrow: 1,
  },
];

export const CHANNELS = [
  { id: "all", label: "All channels" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "email", label: "Smartlead" },
  { id: "roles", label: "Roles email" },
  { id: "reddit", label: "Reddit" },
  { id: "dms", label: "Team DMs" },
];

export const DM_KEY = "ge-sales-drive-dms-v1";

export function defaultDms() {
  return Object.fromEntries(TEAM.map((p) => [p.id, { sent: false, replies: 0 }]));
}

export function loadDms() {
  try {
    const raw = JSON.parse(localStorage.getItem(DM_KEY) || "null");
    return { ...defaultDms(), ...(raw || {}) };
  } catch {
    return defaultDms();
  }
}

export function saveDms(dms) {
  localStorage.setItem(DM_KEY, JSON.stringify(dms));
}

export function summariseDms(dms) {
  let peopleSent = 0;
  let replies = 0;
  for (const p of TEAM) {
    const row = dms[p.id] || { sent: false, replies: 0 };
    if (!row.sent) continue;
    peopleSent += 1;
    replies += Number(row.replies) || 0;
  }
  return { peopleSent, replies };
}

export function weekTotals(w, dm) {
  const touches =
    w.linkedin.contacted + w.smartlead.sent + w.roles.sent + w.reddit.comments;
  const replies =
    w.linkedin.replies +
    w.smartlead.replies +
    w.roles.replies +
    w.reddit.replies +
    dm.replies;
  return { touches, replies };
}
