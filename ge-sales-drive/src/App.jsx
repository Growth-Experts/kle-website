import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import {
  Briefcase,
  ChatCircle,
  EnvelopeSimple,
  LinkedinLogo,
  RedditLogo,
  SquaresFour,
} from "@phosphor-icons/react";
import MagneticPill from "./components/MagneticPill.jsx";
import { LiveDot } from "./components/LiveDot.jsx";
import { FillBar } from "./components/FillBar.jsx";
import { MixBar } from "./components/MixBar.jsx";
import {
  CHANNELS,
  TEAM,
  WEEKS,
  loadDms,
  saveDms,
  summariseDms,
  weekTotals,
} from "./data.js";
import { itemVariants, listVariants, spring } from "./motion.js";

const ICONS = {
  all: SquaresFour,
  linkedin: LinkedinLogo,
  email: EnvelopeSimple,
  roles: Briefcase,
  reddit: RedditLogo,
  dms: ChatCircle,
};

function Kicker({ children }) {
  return (
    <p className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-mute uppercase">
      {children}
    </p>
  );
}

function Callout({ title, children, warn }) {
  return (
    <div className={`border-l-[3px] py-5 pl-7 ${warn ? "border-accent" : "border-ink"}`}>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <p className="max-w-[62ch] text-[1.05rem] leading-relaxed text-ink/75">{children}</p>
    </div>
  );
}

function Stat({ value, label, tone }) {
  const color =
    tone === "good" ? "text-good" : tone === "bad" ? "text-bad" : tone === "accent" ? "text-accent" : "text-ink";
  return (
    <div>
      <div className={`font-mono text-4xl tracking-tight tabular md:text-5xl ${color}`}>{value}</div>
      <div className="mt-3 max-w-[14ch] text-sm leading-snug text-mute">{label}</div>
    </div>
  );
}

export default function App() {
  const [weekId, setWeekId] = useState(WEEKS[0].id);
  const [channel, setChannel] = useState("all");
  const [dms, setDms] = useState(() => loadDms());
  const week = WEEKS.find((w) => w.id === weekId) || WEEKS[0];
  const dm = useMemo(() => summariseDms(dms), [dms]);
  const totals = weekTotals(week, dm);

  function patchDm(id, update) {
    setDms((prev) => {
      const next = { ...prev, [id]: { ...(prev[id] || { sent: false, replies: 0 }), ...update } };
      saveDms(next);
      return next;
    });
  }

  return (
    <div className="relative min-h-[100dvh]">
      <div className="grain" />
      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-14">
        <header className="grid items-end gap-12 border-b border-line pb-10 md:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.7fr)]">
          <div>
            <Kicker>Growth Experts · internal</Kicker>
            <h1 className="max-w-[12ch] text-4xl font-semibold tracking-tight leading-none md:text-5xl">
              Sales drive
            </h1>
            <p className="mt-4 text-mute">{week.period}</p>
            <p className="mt-8 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink/75">
              {week.headline}
            </p>
          </div>
          <motion.div
            className="md:-mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mute uppercase">This week</p>
            <div className="mt-3 font-mono text-[5.5rem] leading-none tracking-tight tabular text-good">
              {week.callsBooked}
            </div>
            <p className="mt-2 text-lg font-medium">calls booked</p>
            <p className="mt-5 flex items-center gap-2 text-sm text-mute">
              <LiveDot />
              {week.discoveryTomorrow} discovery tomorrow
            </p>
            <label className="mt-8 block">
              <span className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-mute uppercase">
                Week
              </span>
              <select
                className="w-full appearance-none rounded-full border border-line bg-surface px-4 py-2.5 pr-10 text-sm font-semibold"
                value={weekId}
                onChange={(e) => setWeekId(e.target.value)}
                aria-label="Select week"
              >
                {WEEKS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
          </motion.div>
        </header>

        <LayoutGroup>
          <nav className="sticky top-0 z-20 -mx-5 mb-2 flex flex-wrap gap-2.5 border-b border-line/80 bg-paper/80 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md md:-mx-10 md:px-10">
            {CHANNELS.map((c) => {
              const Icon = ICONS[c.id];
              return (
                <MagneticPill key={c.id} active={channel === c.id} onClick={() => setChannel(c.id)}>
                  <span className="inline-flex items-center gap-2">
                    <Icon weight="regular" className="h-4 w-4" />
                    {c.label}
                  </span>
                </MagneticPill>
              );
            })}
          </nav>
        </LayoutGroup>

        <motion.div
          key={channel}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-16 pb-24 pt-8"
          >
            {channel === "all" ? (
              <AllView week={week} dms={dms} dm={dm} totals={totals} patchDm={patchDm} />
            ) : null}
            {channel === "linkedin" ? <LinkedInView week={week} /> : null}
            {channel === "email" ? <EmailView week={week} /> : null}
            {channel === "roles" ? <RolesView week={week} /> : null}
            {channel === "reddit" ? <RedditView week={week} /> : null}
            {channel === "dms" ? <DmsView dms={dms} dm={dm} patchDm={patchDm} /> : null}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function AllView({ week, dms, dm, totals, patchDm }) {
  const { li, sl, roles, rd, touches, replies } = pack(week, totals);
  return (
    <>
      <motion.section variants={itemVariants} className="grid gap-10 border-b border-line pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <Stat value={touches} label="Touches across channels" />
        <Stat value={replies} label="Replies, including team DMs" />
        <Stat value={`${((week.callsBooked / touches) * 100).toFixed(1)}%`} label="Touch to call" />
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Outreach mix</h2>
        <MixBar
          total={touches}
          segments={[
            { id: "li", label: "LinkedIn", value: li.contacted, className: "bg-ink" },
            { id: "sl", label: "Smartlead", value: sl.sent, className: "bg-ink/55" },
            { id: "rd", label: "Reddit", value: rd.comments, className: "bg-accent" },
            { id: "ro", label: "Roles", value: roles.sent, className: "bg-ink/25" },
          ]}
        />
        <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-mute">
          Accent on the mix is Reddit — 7% of volume, both calls.
        </p>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Channel scorecard</h2>
        <div className="hidden gap-x-8 border-b border-line pb-3 md:grid md:grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,0.7fr))]">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-mute uppercase">Channel</p>
          <p className="text-right text-[11px] font-semibold tracking-[0.14em] text-mute uppercase">Volume</p>
          <p className="text-right text-[11px] font-semibold tracking-[0.14em] text-mute uppercase">Replies</p>
          <p className="text-right text-[11px] font-semibold tracking-[0.14em] text-mute uppercase">Reply rate</p>
          <p className="text-right text-[11px] font-semibold tracking-[0.14em] text-mute uppercase">Calls</p>
        </div>
        <div className="divide-y divide-line border-b border-line">
          <ScoreRow
            name="LinkedIn · GojiBerry"
            note={`${li.connected} connected · ${li.acceptRate}% accept`}
            volume={li.contacted}
            volumeLabel="contacted"
            replies={li.replies}
            rate={`${li.replyRate}%`}
            calls={li.calls}
          />
          <ScoreRow
            name="Email · Smartlead NPO"
            note={`${sl.openRate}% open · ${sl.bounceRate}% bounce`}
            volume={sl.sent}
            volumeLabel="sent"
            replies={sl.replies}
            rate="0%"
            calls={sl.calls}
          />
          <ScoreRow
            name="Email · open marketing roles"
            note="Direct custom outreach"
            volume={roles.sent}
            volumeLabel="sent"
            replies={roles.replies}
            rate="0%"
            calls={roles.calls}
          />
          <ScoreRow
            name="Reddit · ICP subs"
            note="Community replies in ICP subs"
            volume={rd.comments}
            volumeLabel="comments"
            replies={rd.replies}
            rate={`${rd.replyRate}%`}
            calls={rd.calls}
            accent
          />
          <ScoreRow
            name="Team DMs"
            note="Tick names in the roster below"
            volume={`${dm.peopleSent}/${TEAM.length}`}
            volumeLabel="people sent"
            replies={dm.replies}
            rate={dm.peopleSent === 0 ? "—" : "logged"}
            calls="—"
          />
        </div>
        <p className="mt-5 text-sm text-mute">
          {week.source} · {week.period}
        </p>
      </motion.section>

      <motion.div variants={itemVariants} className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <h3 className="mb-4 text-sm font-semibold text-ink/80">Touches by channel</h3>
          <FillBar label="LinkedIn" value={li.contacted} max={li.contacted} />
          <FillBar label="Smartlead" value={sl.sent} max={li.contacted} />
          <FillBar label="Roles email" value={roles.sent} max={li.contacted} />
          <FillBar label="Reddit" value={rd.comments} max={li.contacted} tone="accent" />
          <p className="mt-4 text-sm text-mute">Counts, not rates · {week.period}</p>
        </section>
        <section>
          <h3 className="mb-4 text-sm font-semibold text-ink/80">Reply rate by channel (%)</h3>
          <FillBar label="LinkedIn" value={li.replyRate} max={40} />
          <FillBar label="Smartlead" value={0} max={40} />
          <FillBar label="Roles email" value={0} max={40} />
          <FillBar label="Reddit" value={rd.replyRate} max={40} tone="accent" />
          <p className="mt-4 text-sm text-mute">
            LinkedIn is 2 / {li.contacted} contacted. Reddit is {rd.replies} / {rd.comments} comments.
          </p>
        </section>
      </motion.div>

      <motion.section variants={itemVariants}>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Direct email to open marketing roles</h2>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <Stat value={roles.sent} label="Custom emails sent" />
          <Stat value={roles.replies} label="Replies" tone="bad" />
          <Stat value="0%" label="Reply rate" />
        </div>
        <p className="mt-8 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink/75">
          Handwritten outreach to people in live marketing vacancies — not the Smartlead NPO sequence.
          {roles.sent} sends, no replies yet. Reassess after about 40 sends.
        </p>
      </motion.section>

      <DmBlock dms={dms} dm={dm} patchDm={patchDm} />

      <motion.section variants={itemVariants}>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">What the numbers say</h2>
        <div className="max-w-[62ch] space-y-5 text-[1.05rem] leading-relaxed text-ink/75">
          <p>
            <strong className="font-semibold text-ink">Reddit is doing the commercial work.</strong>{" "}
            {rd.comments} comments produced {rd.replies} replies and {rd.calls} calls. That is a {rd.replyRate}% reply rate. One discovery is tomorrow; one call was not a fit.
          </p>
          <p>
            <strong className="font-semibold text-ink">Both email motions are silent so far.</strong>{" "}
            Smartlead looks healthy ({sl.openRate}% open, {sl.bounceRate}% bounce) and is still ramping. The {roles.sent} role emails are custom and cold. Do not merge those tests.
          </p>
          <p>
            <strong className="font-semibold text-ink">LinkedIn has reach, not conversation.</strong>{" "}
            {li.contacted} requests, {li.connected} accepts ({li.acceptRate}%), {li.replies} replies ({li.replyRate}% of contacted). Volume moved; conversion did not.
          </p>
        </div>
      </motion.section>

      <motion.div variants={itemVariants}>
        <Callout title="Watch the call, not the vanity rates" warn>
          Two calls from {touches} tracked touches is a {((week.callsBooked / touches) * 100).toFixed(1)}% book rate. Fine for a 10-day ramp if Reddit stays consistent. Not fine if the team scales quiet channels and starves the one already producing conversations.
        </Callout>
      </motion.div>

      <motion.section variants={itemVariants}>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Next 7 days</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {[
            ["Doing", "Run tomorrow's discovery. Capture whether Reddit NPO comments are hitting ICP."],
            ["Next", "Stop blank LinkedIn requests. Test a note or donation-increase lead magnet on the next GojiBerry batch."],
            ["Doing", "Tick each Growth Expert who has sent DMs and log replies here."],
            ["Next", "Keep custom emails to open marketing roles going. Reassess after ~40 sends."],
            ["Next", "Add Smartlead mailboxes and the next NPO prospect batch."],
            ["Doing", "Keep the ICP-subreddit comment cadence. Log sub, thread, and outcome."],
            ["Later", "Stand up the ABA therapy LinkedIn campaign once the NPO connection-note test is live."],
          ].map(([st, text]) => (
            <li key={text} className="grid gap-2 py-4 md:grid-cols-[6.5rem_1fr] md:gap-6">
              <span className="pt-0.5 text-[11px] font-semibold tracking-[0.12em] text-mute uppercase">{st}</span>
              <span className="text-[1.05rem]">{text}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Source notes</h2>
        <Note title={`LinkedIn · Taylor Lawrence`} meta={`${li.acceptRate}% accept · ${li.replies} replies`} open>
          GojiBerry on TJ's profile, 24 Aug refresh. Connection requests sent with no message. Target: NPOs. Reply rate reported on contacted ({li.replies} / {li.contacted} = {li.replyRate}%). Next test: lead magnet. ABA therapy campaign still queued.
        </Note>
        <Note title="Smartlead · Asta Geldenhuys" meta={`${sl.openRate}% open · 0 replies`}>
          NPO email campaign, first week live. Open and bounce look healthy; volume still ramping. Next: more mailboxes, another prospect batch.
        </Note>
        <Note title="Roles email · team" meta={`${roles.sent} sent · 0 replies`}>
          Direct custom emails to people in open marketing roles. Separate from the Smartlead NPO sequence.
        </Note>
        <Note title="Reddit · team notes" meta={`${rd.replies} replies · ${rd.calls} calls`}>
          {rd.comments} comments across ICP subreddits. {rd.replies} replies. {rd.calls} calls: one not a fit, one booked for tomorrow.
        </Note>
      </motion.section>

      <p className="text-sm text-mute">Internal dashboard · not a client report</p>
    </>
  );
}

function LinkedInView({ week }) {
  const li = week.linkedin;
  return (
    <>
      <motion.div variants={itemVariants} className="grid gap-12 border-b border-line pb-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div>
          <Callout title="Low accept, almost no conversation" warn>
            {li.acceptRate}% acceptance with blank connection requests is still the constraint. Volume moved; replies only reached {li.replies}.
          </Callout>
          <div className="mt-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mute uppercase">Contacted</p>
            <p className="mt-2 font-mono text-7xl leading-none tracking-tight tabular">{li.contacted}</p>
          </div>
        </div>
        <div className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <Stat value={li.connected} label={`Connected · ${li.acceptRate}% accept`} tone="bad" />
          <Stat value={li.replies} label={`Replies · ${li.replyRate}% of contacted`} />
          <Stat value={li.calls} label="Calls" />
        </div>
      </motion.div>
      <motion.section variants={itemVariants}>
        <h3 className="mb-4 text-sm font-semibold">LinkedIn funnel (counts)</h3>
        <FillBar label="Contacted" value={li.contacted} max={li.contacted} />
        <FillBar label="Connected" value={li.connected} max={li.contacted} />
        <FillBar label="Replies" value={li.replies} max={li.contacted} />
        <FillBar label="Calls" value={li.calls} max={li.contacted} />
        <p className="mt-4 text-sm text-mute">GojiBerry · TJ's profile · blank connection requests · NPOs · {week.period}</p>
      </motion.section>
    </>
  );
}

function EmailView({ week }) {
  const sl = week.smartlead;
  return (
    <>
      <motion.div variants={itemVariants} className="grid gap-12 border-b border-line pb-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div>
          <Callout title="Setup looks clean. Results are still pending.">
            {sl.openRate}% open and {sl.bounceRate}% bounce on {sl.sent} sends is a working Smartlead system. Zero replies after week one is a volume problem, not a verdict.
          </Callout>
          <div className="mt-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mute uppercase">Emails sent</p>
            <p className="mt-2 font-mono text-7xl leading-none tracking-tight tabular">{sl.sent}</p>
          </div>
        </div>
        <div className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <Stat value={`${sl.openRate}%`} label="Open rate" tone="good" />
          <Stat value={`${sl.bounceRate}%`} label="Bounce rate" tone="good" />
          <Stat value={sl.replies} label="Replies" tone="bad" />
        </div>
      </motion.div>
      <motion.section variants={itemVariants}>
        <h3 className="mb-4 text-sm font-semibold">Email health vs. outcome</h3>
        <FillBar label="Sent" value={sl.sent} max={sl.sent} />
        <FillBar label="Opens (est.)" value={sl.opens} max={sl.sent} />
        <FillBar label="Bounces (est.)" value={sl.bounces} max={sl.sent} />
        <FillBar label="Replies" value={sl.replies} max={sl.sent} />
      </motion.section>
    </>
  );
}

function RolesView({ week }) {
  const roles = week.roles;
  return (
    <>
      <motion.div variants={itemVariants}>
        <Callout title="Custom outreach, no replies yet" warn>
          {roles.sent} handwritten emails to people in open marketing roles. Separate from Smartlead. Too small to call copy.
        </Callout>
      </motion.div>
      <motion.div variants={itemVariants} className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <Stat value={roles.sent} label="Custom emails sent" />
        <Stat value={roles.replies} label="Replies" tone="bad" />
        <Stat value="0%" label="Reply rate" />
      </motion.div>
      <motion.p variants={itemVariants} className="max-w-[62ch] text-[1.05rem] leading-relaxed text-ink/75">
        This list is in-market by definition: they are hiring marketing help. Keep sending, keep it logged apart from Smartlead, and only judge reply rate once the sample is closer to 40 than {roles.sent}.
      </motion.p>
    </>
  );
}

function RedditView({ week }) {
  const rd = week.reddit;
  return (
    <>
      <motion.div variants={itemVariants} className="grid gap-12 border-b border-line pb-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div>
          <Callout title="This is the pipeline">
            {rd.comments} comments → {rd.replies} replies → {rd.calls} calls. One not a fit. One discovery tomorrow.
          </Callout>
          <div className="mt-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mute uppercase">Calls booked</p>
            <p className="mt-2 font-mono text-7xl leading-none tracking-tight tabular text-good">{rd.calls}</p>
          </div>
        </div>
        <div className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <Stat value={rd.comments} label="Comments in ICP subs" />
          <Stat value={rd.replies} label={`Replies · ${rd.replyRate}%`} tone="good" />
          <Stat value={rd.notFit} label="Not a fit" tone="bad" />
        </div>
      </motion.div>
      <motion.section variants={itemVariants}>
        <h3 className="mb-4 text-sm font-semibold">Reddit funnel (counts)</h3>
        <FillBar label="Comments" value={rd.comments} max={rd.comments} tone="accent" />
        <FillBar label="Replies" value={rd.replies} max={rd.comments} tone="accent" />
        <FillBar label="Calls" value={rd.calls} max={rd.comments} tone="good" />
        <FillBar label="Discovery" value={rd.discoveryTomorrow} max={rd.comments} />
        <FillBar label="Not a fit" value={rd.notFit} max={rd.comments} tone="bad" />
      </motion.section>
    </>
  );
}

function DmsView({ dms, dm, patchDm }) {
  return (
    <>
      <motion.div variants={itemVariants}>
        <Callout title="Manual LinkedIn DMs">
          Not GojiBerry connection requests. Check who has sent, then enter replies. Uncheck a name to remove them from the totals. Saved in this browser.
        </Callout>
      </motion.div>
      <DmBlock dms={dms} dm={dm} patchDm={patchDm} />
    </>
  );
}

function DmBlock({ dms, dm, patchDm }) {
  return (
    <motion.section variants={itemVariants}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">DMs sent by Growth Experts</h2>
          <p className="mt-2 text-mute">Check a name when that person has sent DMs. Uncheck to drop them from the totals.</p>
        </div>
        <div className="flex gap-12">
          <Stat value={`${dm.peopleSent}/${TEAM.length}`} label="People sent" />
          <Stat value={dm.replies} label="DM replies" tone={dm.replies ? "good" : undefined} />
        </div>
      </div>
      <div className="divide-y divide-line border-y border-line">
        {TEAM.map((p) => {
          const row = dms[p.id] || { sent: false, replies: 0 };
          return (
            <div
              key={p.id}
              className={`grid items-center gap-4 py-5 md:grid-cols-[1fr_7rem] ${row.sent ? "" : "opacity-45"}`}
            >
              <label className="flex cursor-pointer items-center gap-3.5 font-semibold">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-ink"
                  checked={row.sent}
                  onChange={(e) => patchDm(p.id, { sent: e.target.checked })}
                />
                <span>
                  {p.name}
                  <small className="mt-0.5 block text-sm font-normal text-mute">{p.role}</small>
                </span>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-[0.08em] text-mute uppercase">Replies</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  disabled={!row.sent}
                  value={row.replies}
                  onChange={(e) =>
                    patchDm(p.id, { replies: Math.max(0, Math.floor(Number(e.target.value) || 0)) })
                  }
                  className="h-10 rounded-lg border border-line bg-surface px-3 font-mono"
                />
              </label>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-mute">Roster of seven. Checkmarks and reply counts save in this browser.</p>
    </motion.section>
  );
}

function ScoreMetric({ value, label, align = "right", tone }) {
  const color = tone === "accent" ? "text-accent" : tone === "good" ? "text-good" : "text-ink";
  return (
    <div className={align === "right" ? "md:text-right" : ""}>
      <div className={`font-mono text-2xl tracking-tight tabular ${color}`}>{value}</div>
      <div className="mt-1 text-sm text-mute">{label}</div>
    </div>
  );
}

function ScoreRow({ name, note, volume, volumeLabel, replies, rate, calls, accent }) {
  return (
    <div className="grid gap-5 py-6 md:grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,0.7fr))] md:items-end md:gap-8">
      <div>
        <p className="flex items-center gap-2.5 font-semibold">
          <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${accent ? "bg-accent" : "bg-ink/35"}`} />
          {name}
        </p>
        <p className="mt-1.5 pl-[18px] text-sm leading-snug text-mute">{note}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 md:contents">
        <ScoreMetric value={volume} label={volumeLabel} />
        <ScoreMetric value={replies} label="replies" />
        <ScoreMetric value={rate} label="reply rate" />
        <ScoreMetric value={calls} label="calls" tone={accent && calls > 0 ? "good" : undefined} />
      </div>
    </div>
  );
}

function Note({ title, meta, children, open }) {
  return (
    <details open={open} className="border-t border-line py-5">
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-semibold">
        {title}
        <span className="text-sm font-normal text-mute">{meta}</span>
      </summary>
      <p className="mt-3 max-w-[62ch] leading-relaxed text-ink/75">{children}</p>
    </details>
  );
}

function pack(week, totals) {
  return {
    li: week.linkedin,
    sl: week.smartlead,
    roles: week.roles,
    rd: week.reddit,
    touches: totals.touches,
    replies: totals.replies,
  };
}
