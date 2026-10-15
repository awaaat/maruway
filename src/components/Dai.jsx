import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Picture from './Picture';
import Icon from './Icon';
import Reveal from './Reveal';
import { img } from '../lib/assets';
import { reduced } from '../lib/motion';

// Data and AI building blocks.
// Look: Databricks (oat, navy, red, DM Sans / DM Mono) with Niracore illustration and gradient accents.
// All figures in the demos are invented samples. VERIFY capability wording with management before publishing.

export const DaiIcon = ({ name, size = 44 }) => {
  const src = img('dai', `icon-${name}`);
  return src ? <img className="dai-ico" src={src} alt="" width={size} height={size} loading="lazy" /> : <span className="dai-ico" style={{ width: size, height: size }} />;
};

/* Illustration on a lit stage with orbit rings and floating figures */
export function Stage({ art, chips = [], className = '' }) {
  return (
    <div className={`dstage ${className}`}>
      <span className="dstage__grid" aria-hidden="true" />
      <svg className="dstage__ring" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="94" /><circle cx="100" cy="100" r="68" /></svg>
      <Picture folder="art" name={art} alt="" width={900} height={760} eager />
      {chips.map(([k, v, pos], i) => (
        <span key={k} className={`dstage__chip dstage__chip--${pos}`} style={{ '--i': i }}><small>{k}</small><b>{v}</b></span>
      ))}
    </div>
  );
}

/* Strip of tool logos taken from the reference site, with a caption */
export function Stack({ kind, label }) {
  const src = img('dai', `stack-${kind}`);
  if (!src) return null;
  return (
    <figure className="dstack"><figcaption>{label}</figcaption><img src={src} alt={`${label}: logos`} loading="lazy" decoding="async" /></figure>
  );
}

const CAPS = [
  ['lakeflow', 'Pipelines', 'Move data in from spreadsheets, devices and systems on a schedule, with checks on the way.'],
  ['unity-catalog', 'Catalogue and access', 'One list of what data exists, who owns it and who may see it.'],
  ['ai-bi', 'Dashboards', 'Live views built around the three numbers your managers act on.'],
  ['genie', 'Ask your data', 'Plain-language questions answered from numbers everyone has agreed.'],
  ['lakebase', 'Operational data', 'Fast tables that field apps and forms can read and write.'],
  ['databricks-sql', 'Warehouse', 'One place to run reports without slowing the live systems.'],
  ['mosaic-ai-bricks', 'Models and agents', 'Forecasts, triage and assistants trained on your own records.'],
  ['unity-ai-gateway', 'Safe AI access', 'Keys, limits and logs around every model your teams use.'],
];

export function Caps() {
  return (
    <ul className="dcaps">
      {CAPS.map(([i, t, d], n) => (
        <Reveal as="li" key={t} delay={n * 40}><DaiIcon name={i} size={52} /><h3>{t}</h3><p>{d}</p></Reveal>
      ))}
    </ul>
  );
}

/* Ask your data: pick a question, watch the answer form, see the evidence */
const SITES = [['Westlands', 93], ['Industrial Area', 83], ['Mombasa Rd', 70], ['Kisumu', 58], ['Eldoret', 47]];
const WEEKS = [34, 30, 27, 25, 22];
const WARR = [['UPS 6 kVA, Eldoret', 'Dec 2026', 2], ['NVR, Kisumu', 'Jan 2027', 3], ['Core switch, Mombasa Rd', 'Mar 2027', 5], ['Wi-Fi controller, head office', 'Jun 2027', 8]];
const ASKS = [
  { q: 'Which site needs help first?', a: 'Eldoret scores 47, the lowest of the five sites, and Kisumu is next at 58. The next two visits should go there.', kind: 'bars' },
  { q: 'Are faults going down?', a: 'Yes. Weekly faults fell from 34 to 22 over five weeks, a drop of 35 per cent, and the fall has not reversed.', kind: 'line' },
  { q: 'What needs budget next?', a: 'Three devices leave warranty within six months, starting with the Eldoret UPS in December. The fourth is eight months away.', kind: 'warr' },
];

function Evidence({ kind }) {
  if (kind === 'bars') {
    return (<div className="ev ev--bars">{SITES.map(([n, v]) => (<div key={n}><span>{n}</span><i><u style={{ width: `${v}%`, background: v < 60 ? 'var(--d-red)' : v < 80 ? 'var(--d-rose)' : 'var(--d-green)' }} /></i><b>{v}</b></div>))}</div>);
  }
  if (kind === 'line') {
    const W = 360; const H = 120; const max = 38;
    const pts = WEEKS.map((v, i) => [18 + (i * (W - 36)) / (WEEKS.length - 1), H - 16 - (v / max) * (H - 32)]);
    return (
      <svg className="ev ev--line" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Weekly faults: 34, 30, 27, 25, 22">
        <polygon points={`18,${H - 16} ${pts.map((p) => p.join(',')).join(' ')} ${W - 18},${H - 16}`} fill="rgba(255,54,33,.16)" />
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="var(--d-red)" strokeWidth="3" strokeLinejoin="round" />
        {pts.map(([x, y], i) => (<g key={i}><circle cx={x} cy={y} r="4.5" fill="#fff" stroke="var(--d-red)" strokeWidth="2.5" /><text x={x} y={y - 12} textAnchor="middle">{WEEKS[i]}</text></g>))}
      </svg>
    );
  }
  return (<ul className="ev ev--warr">{WARR.map(([n, d, m]) => (<li key={n} className={m <= 6 ? 'is-soon' : ''}><span>{n}</span><em>{d}</em><b>{m} mo</b></li>))}</ul>);
}

export function AskData() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(ASKS[0].a.length);
  const timer = useRef();
  const pick = (n) => {
    clearInterval(timer.current);
    setI(n);
    if (reduced()) { setShown(ASKS[n].a.length); return; }
    setShown(0);
    let c = 0;
    timer.current = setInterval(() => { c += 2; setShown(c); if (c >= ASKS[n].a.length) clearInterval(timer.current); }, 18);
  };
  useEffect(() => () => clearInterval(timer.current), []);
  const A = ASKS[i];
  return (
    <div className="dask">
      <div className="dask__q" role="tablist" aria-label="Choose a question">
        <small>Ask a question</small>
        {ASKS.map((x, n) => (<button key={x.q} type="button" role="tab" aria-selected={n === i} className={n === i ? 'is-on' : ''} onClick={() => pick(n)}><DaiIcon name="genie" size={22} />{x.q}</button>))}
      </div>
      <div className="dask__a" aria-live="polite">
        <div className="dask__you">{A.q}</div>
        <div className="dask__bot"><span className="dask__av"><DaiIcon name="genie" size={22} /></span><p>{A.a.slice(0, shown)}{shown < A.a.length && <i className="dask__cur" />}</p></div>
        <div className={`dask__ev ${shown >= A.a.length ? 'is-in' : ''}`}><small>Where the answer comes from</small><Evidence kind={A.kind} /></div>
        <span className="dask__tag">Sample data. Yours would come from your own systems.</span>
      </div>
    </div>
  );
}

/* Raw, clean, ready: data climbing through three layers */
const LAYERS = [
  ['Raw', 'Everything lands untouched', 'Spreadsheets, ticket exports, device logs and forms are copied in exactly as they arrive, so nothing is lost and every number can be traced back.', ['Ticket exports', 'Device logs', 'Excel and CSV', 'Forms']],
  ['Clean', 'Names and dates mean one thing', 'Duplicates are removed, dates standardised and branch names matched. Rules flag anything odd instead of quietly charting it.', ['Duplicates removed', 'Dates standardised', 'Names matched', 'Rules checked']],
  ['Ready', 'Three numbers per question', 'Agreed measures, with a good, warning and poor range, feed dashboards and the monthly report, which then builds itself.', ['Dashboards', 'Scorecards', 'Monthly report', 'Alerts']],
];

export function Medallion() {
  const [k, setK] = useState(0);
  const L = LAYERS[k];
  return (
    <div className="med">
      <svg className="med__svg" viewBox="0 0 600 120" role="img" aria-label="Data flowing from raw to clean to ready">
        <path id="medpath" d="M40 60 C140 10 200 110 300 60 S460 10 560 60" fill="none" stroke="rgba(27,49,57,.2)" strokeWidth="2" strokeDasharray="4 6" />
        <circle className="med__dot" r="5" fill="var(--d-red)"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#medpath" /></animateMotion></circle>
        {[[40, 60], [300, 60], [560, 60]].map(([x, y], n) => (
          <g key={n} onClick={() => setK(n)} className={`med__n ${k === n ? 'is-on' : ''}`} role="button" tabIndex="0" aria-label={LAYERS[n][0]} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setK(n)}>
            <circle cx={x} cy={y} r="26" /><text x={x} y={y + 5} textAnchor="middle">{n + 1}</text>
          </g>
        ))}
      </svg>
      <div className="med__tabs" role="tablist">{LAYERS.map(([t], n) => (<button key={t} type="button" role="tab" aria-selected={n === k} className={n === k ? 'is-on' : ''} onClick={() => setK(n)}>{t}</button>))}</div>
      <div className="med__p" key={k}>
        <h3>{L[1]}</h3><p>{L[2]}</p>
        <ul>{L[3].map((x) => (<li key={x}><Icon name="check" size={16} stroke={2.2} />{x}</li>))}</ul>
      </div>
    </div>
  );
}

/* Home page section: a different composition from the Data and AI page */
export function DaiHome() {
  return (
    <section className="dai dhome">
      <div className="wrap dhome__g">
        <Reveal className="dhome__t">
          <small className="dai-k">Data and AI</small>
          <h2>Ask your data a question. Get an answer you can act on.</h2>
          <p>Dashboards that refresh themselves, pipelines that clean the numbers first, and assistants that answer from your own records. Built around the three figures your managers actually use.</p>
          <div className="dai-act"><Link className="dbtn dbtn--red" to="/data-ai">See what we build <Icon name="arrow" size={16} /></Link><Link className="dbtn dbtn--ghost" to="/services/data-analytics">Analytics service</Link></div>
          <ul className="dhome__pts"><li><DaiIcon name="ai-bi" size={30} />Dashboards</li><li><DaiIcon name="lakeflow" size={30} />Pipelines</li><li><DaiIcon name="genie" size={30} />Ask your data</li></ul>
        </Reveal>
        <Reveal className="dhome__m"><Stage art="dai-globe" chips={[['Uptime', '99.4%', 'a'], ['Faults', '22 ↓', 'b'], ['Avg fix', '2h 10m', 'c']]} /><span className="dai-fine">Sample figures</span></Reveal>
      </div>
    </section>
  );
}
