import { useState } from 'react';
import Reveal from './Reveal';
import Icon from './Icon';
import { DaiIcon } from './Dai';

// More Data and AI content. All numbers are invented samples. VERIFY claims with management before publishing.

/* Use cases by team */
const TEAMS = [
  ['Operations', 'Which faults keep coming back, and where?', ['Ticket exports', 'Device logs'], 'A ranked list of repeat faults by site and device type, so one visit fixes the cause instead of the symptom.', [['Repeat faults', '-31%'], ['First-visit fix', '84%']]],
  ['Finance', 'What will maintenance cost next quarter?', ['Warranty dates', 'Visit history'], 'Renewals and replacements laid out by month with a cost range, so budget is planned instead of discovered.', [['Surprise spend', 'Down'], ['Forecast range', '±8%']]],
  ['Facilities', 'Where are we losing power and time?', ['Meter readings', 'Sensor data'], 'Outage hours and battery health per site, with solar yield beside the grid, so backup is sized from evidence.', [['Outage hours', '-42%'], ['Sites flagged', '3']]],
  ['Leadership', 'Are we getting better?', ['All of the above'], 'One page, three numbers, a green, amber or red mark and a sentence on what changed since last month.', [['Report time', '2 days → 0'], ['Versions of truth', '5 → 1']]],
];
export function Teams() {
  const [i, setI] = useState(0);
  const [, q, src, a, kp] = TEAMS[i];
  return (
    <div className="dteam">
      <div className="dteam__t" role="tablist">{TEAMS.map(([t], n) => <button key={t} role="tab" aria-selected={n === i} className={n === i ? 'is-on' : ''} onClick={() => setI(n)}>{t}</button>)}</div>
      <div className="dteam__p" key={i}>
        <div><small>The question</small><h3>{q}</h3><small>Built from</small><ul>{src.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div><small>What they see</small><p>{a}</p><dl>{kp.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
      </div>
    </div>
  );
}

/* Dashboard gallery drawn in SVG */
const spark = (v, w = 220, h = 60) => { const m = Math.max(...v); return v.map((y, i) => `${(i * w) / (v.length - 1)},${h - (y / m) * (h - 6) - 3}`).join(' '); };
const BOARDS = [
  ['Network health', 'Uptime, faults and time to fix, by site', [['Uptime', '99.4%'], ['Open faults', '7'], ['Avg fix', '2h 10m']], [34, 30, 27, 25, 22, 21, 19], [93, 83, 70, 58, 47]],
  ['Ticket flow', 'Where requests wait, and for whom', [['Opened', '212'], ['Closed', '224'], ['Waiting', '9']], [20, 24, 22, 30, 26, 29, 33], [88, 76, 64, 41, 35]],
  ['Power and solar', 'Outage hours, battery health and yield', [['Outage h', '14'], ['Battery', '91%'], ['Solar kWh', '1,240']], [4, 9, 6, 11, 14, 12, 15], [95, 88, 81, 72, 55]],
];
export function Gallery() {
  return (
    <div className="dgal">{BOARDS.map(([t, d, k, line, bars], n) => (
      <Reveal key={t} delay={n * 90} className="dgal__c">
        <h3>{t}</h3><p>{d}</p>
        <ul>{k.map(([a, b]) => <li key={a}><small>{a}</small><b>{b}</b></li>)}</ul>
        <svg viewBox="0 0 220 60" aria-hidden="true"><polyline points={spark(line)} fill="none" stroke="#ff3621" strokeWidth="2.5" strokeLinejoin="round" /><polyline points={`0,60 ${spark(line)} 220,60`} fill="rgba(255,54,33,.12)" /></svg>
        <div className="dgal__b">{bars.map((v, i) => <i key={i} style={{ width: `${v}%`, background: v < 60 ? '#ff3621' : v < 80 ? '#ff9e94' : '#00a972' }} />)}</div>
        <span>Sample data</span>
      </Reveal>
    ))}</div>
  );
}

/* Architecture: hover a stage to read what happens there */
const ARCH = [
  ['Sources', 'Spreadsheets, ticket exports, device and sensor logs, forms and your line-of-business systems. We read; we do not change them.', ['Excel', 'CSV', 'Tickets', 'Sensors']],
  ['Pipelines', 'Scheduled jobs copy new data in, check it against rules, and tell a person when something does not look right.', ['Schedules', 'Checks', 'Alerts']],
  ['Lakehouse', 'Raw, clean and ready layers in one governed store. Every figure can be traced back to the file it came from.', ['Raw', 'Clean', 'Ready']],
  ['Answers', 'Dashboards, a plain-language question box, monthly reports and models. Access follows your existing roles.', ['Dashboards', 'Ask', 'Reports', 'Models']],
];
export function Architecture() {
  const [i, setI] = useState(0);
  return (
    <div className="darch">
      <svg viewBox="0 0 760 150" role="img" aria-label="Sources flow through pipelines into a lakehouse and out as answers">
        {ARCH.map(([t], n) => (
          <g key={t} className={`darch__n ${i === n ? 'is-on' : ''}`} onMouseEnter={() => setI(n)} onClick={() => setI(n)} tabIndex="0" onFocus={() => setI(n)} role="button" aria-label={t}>
            <rect x={n * 200 + 4} y="30" width="156" height="86" rx="16" /><text x={n * 200 + 82} y="80" textAnchor="middle">{t}</text>
            {n < 3 && <path d={`M${n * 200 + 166} 73 L${n * 200 + 196} 73`} />}
          </g>
        ))}
        <circle r="5" fill="#ff3621"><animateMotion dur="6s" repeatCount="indefinite" path="M10 73 L750 73" /></circle>
      </svg>
      <div className="darch__p" key={i}><h3>{ARCH[i][0]}</h3><p>{ARCH[i][1]}</p><ul>{ARCH[i][2].map((x) => <li key={x}>{x}</li>)}</ul></div>
    </div>
  );
}

/* AI demo: a ticket arrives, the assistant proposes, a person approves */
const TICKETS = [
  ['“Cameras at the back gate show a black screen since last night. Guards are patrolling by hand.”', { cat: 'CCTV', pri: 'High', who: 'Security engineer', site: 'Back gate', conf: 94, why: 'Camera feed lost, site exposed overnight.' }],
  ['“Wi-Fi is slow on the second floor. Video calls keep dropping.”', { cat: 'Network', pri: 'Medium', who: 'Network engineer', site: 'Floor 2', conf: 88, why: 'Performance problem, no outage reported.' }],
  ['“Power went off twice today and the server beeped. Is the UPS ok?”', { cat: 'Power', pri: 'High', who: 'Power and backup engineer', site: 'Server room', conf: 91, why: 'Repeated outage with alarm, equipment at risk.' }],
];
export function Triage() {
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(false);
  const [t, r] = TICKETS[i];
  const pick = (n) => { setI(n); setOk(false); };
  return (
    <div className="dtri">
      <div className="dtri__in"><small>Incoming ticket</small>{TICKETS.map(([x], n) => <button key={n} type="button" className={n === i ? 'is-on' : ''} onClick={() => pick(n)}>{x}</button>)}</div>
      <div className="dtri__out" key={i}>
        <small>Assistant proposes</small>
        <dl><div><dt>Category</dt><dd>{r.cat}</dd></div><div><dt>Priority</dt><dd className={r.pri === 'High' ? 'is-hi' : ''}>{r.pri}</dd></div><div><dt>Send</dt><dd>{r.who}</dd></div><div><dt>Place</dt><dd>{r.site}</dd></div></dl>
        <p>{r.why}</p>
        <div className="dtri__c"><span>Confidence</span><i><u style={{ width: `${r.conf}%` }} /></i><b>{r.conf}%</b></div>
        <button type="button" className="dtri__ok" onClick={() => setOk(true)} disabled={ok}>{ok ? <><Icon name="check" size={16} stroke={2.4} /> Approved by a person</> : 'Approve and dispatch'}</button>
        <span className="dtri__n">Sample tickets. Nothing is sent without a person approving it.</span>
      </div>
    </div>
  );
}

/* Governance */
const GOV = [['unity-catalog', 'Know what you have', 'A catalogue of datasets, owners and meanings, so two people never quote different numbers.'], ['unity-ai-gateway', 'Control who asks what', 'Roles decide who sees which site and which model. Questions and answers are logged.'], ['lakeflow', 'Check before you chart', 'Rules stop bad data at the door, and a person is told why.'], ['databricks-sql', 'Keep it yours', 'Data stays in accounts you own. If you leave us, you keep everything we built.']];
export function Governance() {
  return <ul className="dgov">{GOV.map(([i, t, d], n) => <Reveal as="li" key={t} delay={n * 70}><DaiIcon name={i} size={44} /><h3>{t}</h3><p>{d}</p></Reveal>)}</ul>;
}

/* Which tool fits */
const FIT = [['One team, one spreadsheet, a few charts', 'Excel or Power BI on the files you have', 'Days'], ['Many sources, many people, monthly reports', 'A shared warehouse with scheduled pipelines', 'Weeks'], ['Forecasts, triage or assistants on your own records', 'A lakehouse with governed data and model tooling', 'Weeks to months'], ['Live readings from sensors and meters', 'Streaming ingest into the same store, with alert rules', 'Weeks']];
export function Fit() {
  return (
    <div className="dfit" role="table" aria-label="Which tool fits">
      <div role="row" className="dfit__h"><span>If you need</span><span>We would start with</span><span>Typical start</span></div>
      {FIT.map(([a, b, c]) => <div role="row" key={a}><b>{a}</b><span>{b}</span><em>{c}</em></div>)}
      <p>Start times are indicative and depend on how clean your data is. We recommend the smallest thing that answers the question.</p>
    </div>
  );
}

export const DAI_FAQ = [
  { t: 'Getting started', items: [['Do we need a data platform first?', 'No. Most teams start with one spreadsheet or export. We show a dashboard from it, then grow only if the questions need it.'], ['How long until we see something?', 'A first sample dashboard from one file is usually a matter of days. Connecting several systems takes longer and depends on access.'], ['What do you need from us?', 'One export, a person who knows what the columns mean, and the three questions you would most like answered.']] },
  { t: 'AI and safety', items: [['Does AI see our data?', 'Only what its role allows, inside accounts you own. We log every question and answer, and you decide which models are allowed.'], ['Will it change things by itself?', 'No. Assistants propose and a person approves. Nothing is sent, closed or changed without that step.'], ['What if it is wrong?', 'Every answer shows its source so it can be checked. Wrong answers are logged and used to tighten the rules.']] },
  { t: 'Ownership', items: [['Who owns the dashboards and data?', 'You do. They live in your accounts, with documentation, so another team can run them if you choose.'], ['Can you work with our existing tools?', 'Yes. We build on the reporting tool and databases you already pay for before suggesting anything new.']] },
];
