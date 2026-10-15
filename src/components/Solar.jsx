import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import Cine from './Cine';
import { Jump, FaqTabs, Consult, Flip } from './Blocks';
import { SERVICE_DEEP } from '../data/deep';
import { img } from '../lib/assets';

// Solar page. Photographs are illustrative installations of the kind we design, not Maruway projects. VERIFY and replace with our own.
const LOADS = [['Router and switch', 60], ['Wi-Fi access points (4)', 80], ['CCTV, 8 cameras and recorder', 150], ['Server rack', 400], ['Desktop PCs (5)', 400], ['LED lighting', 120], ['Access control and alarms', 40], ['Public address amplifier', 120]];
const STEPS = [
  ['Survey', 'tile', 'We walk the roof and the board room. We list what must stay on, check roof condition, shading and where cables can run.'],
  ['Mount', 'lift', 'Rails and panels go up in a fixed order, with fall protection and a spotter. Panel weight and wind load are checked first.'],
  ['Wire', 'crew', 'Strings, isolators, inverter and battery are wired and labelled. Protection is fitted before anything is switched on.'],
  ['Commission', 'aerial', 'We test under load, simulate a cut, and hand over drawings, readings and a service plan.'],
];
const PARTS = [['Panels', 'Turn daylight into DC power. Sized to what you run per day, with spare roof area for growth.'], ['Inverter', 'Turns DC into the AC your equipment uses, and switches to battery within moments when the grid drops.'], ['Battery', 'Holds the energy for the night and for the cut. Sized by how long the critical load must stay on.']];

function Arc() {
  return (
    <svg className="sol-arc" viewBox="0 0 600 180" aria-hidden="true">
      <path id="solarc" d="M20 170 C140 -40 460 -40 580 170" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" strokeDasharray="3 7" />
      <circle r="11" fill="#ffc94a"><animateMotion dur="14s" repeatCount="indefinite"><mpath href="#solarc" /></animateMotion></circle>
      <circle r="26" fill="rgba(255,201,74,.22)"><animateMotion dur="14s" repeatCount="indefinite"><mpath href="#solarc" /></animateMotion></circle>
      {['06', '09', '12', '15', '18'].map((t, i) => <text key={t} x={20 + i * 140} y="176" textAnchor="middle">{t}:00</text>)}
    </svg>
  );
}

function Sizer() {
  const [on, setOn] = useState(() => new Set([0, 1, 2]));
  const [cut, setCut] = useState(6);
  const [run, setRun] = useState(12);
  const r = useMemo(() => {
    const w = [...on].reduce((a, i) => a + LOADS[i][1], 0);
    const batt = Math.max(0, (w * cut) / 1000 / 0.8);
    const daily = (w * run) / 1000;
    const panels = Math.ceil(daily / (0.45 * 5 * 0.75)) || 0;
    const inv = Math.max(1, Math.ceil((w * 1.25) / 1000));
    return { w, batt: batt.toFixed(1), daily: daily.toFixed(1), panels, inv };
  }, [on, cut, run]);
  const toggle = (i) => setOn((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div className="sol-size">
      <div className="sol-size__in">
        <h3>What must stay on?</h3>
        <ul>{LOADS.map(([l, w], i) => <li key={l}><label><input type="checkbox" checked={on.has(i)} onChange={() => toggle(i)} /><span>{l}</span><em>{w} W</em></label></li>)}</ul>
        <label className="sol-rng">Power cut to cover <b>{cut} hours</b><input type="range" min="1" max="24" value={cut} onChange={(e) => setCut(+e.target.value)} /></label>
        <label className="sol-rng">Hours these run each day <b>{run} h</b><input type="range" min="4" max="24" value={run} onChange={(e) => setRun(+e.target.value)} /></label>
      </div>
      <div className="sol-size__out" aria-live="polite">
        <small>Indicative size</small>
        <div><b>{r.panels}</b><span>panels of 450 W</span></div>
        <div><b>{r.batt}</b><span>kWh battery</span></div>
        <div><b>{r.inv}</b><span>kVA inverter</span></div>
        <p>Load {r.w} W, {r.daily} kWh a day. Assumes about 5 peak sun hours, 75 per cent system efficiency and 80 per cent usable battery. A survey confirms every figure.</p>
        <Link className="sol-btn" to="/contact?service=solar-installation">Get this checked on site <Icon name="arrow" size={16} /></Link>
      </div>
    </div>
  );
}

export default function SolarPage({ s }) {
  const d = SERVICE_DEEP[s.slug];
  const [step, setStep] = useState(0);
  const [part, setPart] = useState(0);
  const f = d.faq;
  const groups = [{ t: 'About the service', items: f.slice(0, 2) }, { t: 'Getting started', items: f.slice(2) }];
  const stepImg = img('solar', STEPS[step][1]);
  return (
    <div className="sol">
      <section className="sol-hero">
        <Cine folder="solar" name="roof" variant="a" /><div className="sol-hero__veil" />
        <div className="wrap sol-hero__in">
          <nav className="kcrumb is-light"><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{s.tag}</span></nav>
          <h1>Power that stays on when the grid does not.</h1>
          <p>{s.problem}</p>
          <div className="sol-hero__a"><Link className="sol-btn" to={`/contact?service=${s.slug}`}>Request a quotation <Icon name="arrow" size={16} /></Link><a className="sol-link" href="#size">Size a system</a></div>
          <Arc />
          <span className="sol-ill">Illustrative installation photographs</span>
        </div>
      </section>

      <Jump items={[['Size it', 'size'], ['The parts', 'parts'], ['How it is installed', 'how'], ['Before and after', 'ba'], ['Questions', 'faq']]} />

      <section id="size" className="sol-sec sol-sec--sun"><div className="wrap">
        <Reveal className="sol-h"><small>Start with the load</small><h2>Tell us what must never stop.</h2><p>Tick the equipment and slide the hours. You get a rough system size in seconds, to talk through with an engineer.</p></Reveal>
        <Reveal><Sizer /></Reveal>
      </div></section>

      <section id="parts" className="sol-sec"><div className="wrap sol-parts">
        <Reveal className="sol-parts__m"><div className="sol-kit"><img src={img('solar', 'kit')} alt="Batteries, inverters and monocrystalline solar panels" loading="lazy" /></div></Reveal>
        <Reveal>
          <small>The three parts</small><h2>Panels, inverter, battery.</h2>
          <div className="sol-tabs" role="tablist">{PARTS.map(([t], i) => <button key={t} role="tab" aria-selected={part === i} className={part === i ? 'is-on' : ''} onClick={() => setPart(i)}>{t}</button>)}</div>
          <p className="sol-parts__p" key={part}>{PARTS[part][1]}</p>
          <ul className="sol-offers">{s.offers.map((o) => <li key={o}><Icon name="check" size={16} stroke={2.2} />{o}</li>)}</ul>
        </Reveal>
      </div></section>

      <section id="how" className="sol-sec sol-sec--dark"><div className="wrap sol-how">
        <Reveal>
          <small>How it is installed</small><h2>Four stages, in this order.</h2>
          <ol>{STEPS.map(([t], i) => <li key={t}><button type="button" className={step === i ? 'is-on' : ''} onClick={() => setStep(i)}><i>{i + 1}</i>{t}</button></li>)}</ol>
          <p key={step}>{STEPS[step][2]}</p>
        </Reveal>
        <Reveal className="sol-how__m"><div>{stepImg && <img key={step} src={stepImg} alt="" loading="lazy" />}</div><span>Illustrative photograph</span></Reveal>
      </div></section>

      <section className="sol-sec"><div className="wrap">
        <Reveal className="sol-h"><small>Where it goes</small><h2>Built for sites that cannot go dark.</h2></Reveal>
        <ul className="sol-suits">{s.suits.map((x, i) => <Reveal as="li" key={x} delay={i * 70}><i>{String(i + 1).padStart(2, '0')}</i><b>{x}</b></Reveal>)}</ul>
      </div></section>

      <section id="ba" className="sol-sec sol-sec--sun"><div className="wrap">
        <Reveal className="sol-h"><small>Before and after</small><h2>Same site. Different power cut.</h2></Reveal>
        <Reveal><Flip a={d.compare.before} b={d.compare.after} la="On the grid alone" lb="With solar and battery" /></Reveal>
      </div></section>

      <section id="faq" className="section section--alt"><div className="wrap"><FaqTabs groups={groups} /></div></section>
      <Consult tone="dark" title="Start with a list of what must stay on." text="Send us the equipment list. We will come back with a load assessment." to="/contact?service=solar-installation" cta="Send the list" />
    </div>
  );
}
