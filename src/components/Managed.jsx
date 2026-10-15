import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import Picture from './Picture';
import Video from './Video';
import { Jump, FaqTabs, Consult, Flip } from './Blocks';
import { SERVICE_DEEP } from '../data/deep';
import { SUPPORT_TIERS, INDUSTRIES } from '../data/content';
import { INDUSTRY_COL } from '../data/kyn';
import { img } from '../lib/assets';
import { SITE } from '../config/site';

// Managed IT page. A mix of visuals on purpose: illustrations, a live ticket, a video, numbers and one photograph.
// The video is a third-party explainer (Intelligent Technical Solutions, US). VERIFY it suits you, or replace the id.
const VIDEO = { id: '5k8punUXXXw', title: 'What is managed IT?', credit: 'Explainer by Intelligent Technical Solutions' };
const STEPS = [
  ['Report', 'You phone, message or email the support desk. A named person takes the call and logs it.', 'New', '09:02', 'Mail will not open, accounts office'],
  ['Diagnose', 'Most faults are narrowed down remotely first, so the right engineer and parts are sent.', 'Checking remotely', '09:11', 'Account locked after a password reset'],
  ['Dispatch', 'An engineer is assigned and told what to bring. You get a name and an arrival window.', 'Engineer assigned', '09:20', 'Needs a router reset on site'],
  ['Fix and report', 'The fault is cleared, tested with you, and a short written report is filed.', 'Closed', '10:05', 'Fixed, tested, report sent'],
];
const TILES = [
  ['Helpdesk', 'Phone, WhatsApp and email support for users and devices.', 'helpdesk'],
  ['Servers and workstations', 'Setup and routine maintenance, with the asset list kept up to date.'],
  ['Email, backup and cloud', 'Accounts administered and backups checked, not assumed.', 'cloud'],
  ['Monitoring and visits', 'Faults caught on a routine visit while they are still small.'],
  ['Hardware and warranty', 'Supply, records and warranty follow-up, so renewals are planned.', 'growth'],
  ['A record of everything', 'Every visit ends with a short written report you can file.', 'secure'],
];

function Ticket({ step }) {
  const [, , st, t, subj] = STEPS[step];
  return (
    <div className="mg-ticket" key={step}>
      <header><b>MN-2418</b><span className={step === 3 ? 'is-done' : ''}>{st}</span></header>
      <p>{subj}</p>
      <ol>{STEPS.map(([n, , , time], i) => <li key={n} className={i <= step ? 'is-on' : ''}><i /><b>{n}</b><span>{i <= step ? time : '—'}</span></li>)}</ol>
      <small>Sample ticket. {t} on a working morning.</small>
    </div>
  );
}

export default function ManagedPage({ s }) {
  const d = SERVICE_DEEP[s.slug];
  const [k, setK] = useState(0);
  const f = d.faq;
  const groups = [{ t: 'About the service', items: f.slice(0, 2) }, { t: 'Getting started', items: f.slice(2) }];
  const inds = INDUSTRIES.filter((x) => (d.inds || []).includes(x.slug));
  const tile = (n) => img('managed', n);
  return (
    <div className="mg">
      <section className="mg-hero"><div className="wrap mg-hero__g">
        <div className="mg-hero__t">
          <nav className="kcrumb is-light"><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{s.tag}</span></nav>
          <h1>An IT department you can phone.</h1>
          <p>{s.problem}</p>
          <div className="mg-hero__a"><Link className="mg-btn" to={`/contact?service=${s.slug}`}>Request a quotation <Icon name="arrow" size={16} /></Link><Link className="mg-link" to="/contact?urgency=now">Get a technician</Link></div>
        </div>
        <div className="mg-bento" aria-hidden="true">
          <div className="mg-bento__a"><img src={tile('helpdesk')} alt="" /></div>
          <div className="mg-bento__b"><Ticket step={3} /></div>
          <div className="mg-bento__c"><b>{SITE.responseCommitmentMinutes}</b><span>minute on-site response target on priority cover</span></div>
          <div className="mg-bento__d"><Picture folder="projects" name="ceiling-speakers" alt="" width={500} height={400} eager /></div>
          <div className="mg-bento__e"><img src={tile('cloud')} alt="" /></div>
        </div>
      </div></section>

      <Jump items={[['What we look after', 'look'], ['Watch', 'watch'], ['How a fault is handled', 'journey'], ['Who we support', 'who'], ['Support levels', 'levels'], ['Questions', 'faq']]} />

      <section id="look" className="mg-sec"><div className="wrap">
        <Reveal className="mg-h"><small>What we look after</small><h2>Six things, owned by one team.</h2></Reveal>
        <ul className="mg-tiles">{TILES.map(([t, p, im], i) => <Reveal as="li" key={t} delay={i * 50} className={im ? 'has-img' : ''}>{im && tile(im) && <img src={tile(im)} alt="" loading="lazy" />}<i>{String(i + 1).padStart(2, '0')}</i><h3>{t}</h3><p>{p}</p></Reveal>)}</ul>
      </div></section>

      <section id="watch" className="mg-sec mg-sec--navy"><div className="wrap mg-watch">
        <Reveal><small>Managed IT in a minute</small><h2>What “managed” actually means.</h2><p>It means someone owns the problem from the first call until it is closed, and looks after your equipment before it fails. A short explainer, then the way we do it.</p><ul>{d.what.facts.map(([a, b]) => <li key={a}><b>{a}</b><span>{b}</span></li>)}</ul></Reveal>
        <Reveal><Video {...VIDEO} /></Reveal>
      </div></section>

      <section id="journey" className="mg-sec"><div className="wrap mg-j">
        <Reveal>
          <small>From call to closed ticket</small><h2>What happens when something breaks.</h2>
          <ol>{STEPS.map(([t], i) => <li key={t}><button type="button" className={k === i ? 'is-on' : ''} onClick={() => setK(i)}><i>{i + 1}</i>{t}</button></li>)}</ol>
          <p key={k}>{STEPS[k][1]}</p>
        </Reveal>
        <Reveal><Ticket step={k} /></Reveal>
      </div></section>

      <section className="mg-sec mg-sec--sand"><div className="wrap">
        <Reveal className="mg-h"><small>Before and after</small><h2>Same office. Different Monday morning.</h2></Reveal>
        <Reveal><Flip a={d.compare.before} b={d.compare.after} /></Reveal>
      </div></section>

      <section id="who" className="mg-sec"><div className="wrap">
        <Reveal className="mg-h"><small>Who we support</small><h2>Built for places where people depend on the screen in front of them.</h2></Reveal>
        <ul className="mg-who">{inds.map((x, i) => <Reveal as="li" key={x.slug} delay={i * 70} style={{ '--c': INDUSTRY_COL[x.slug] }}><Link to={`/industries/${x.slug}`}><small>{String(i + 1).padStart(2, '0')}</small><h3>{x.name}</h3><p>{x.lead}</p><span>See how <Icon name="arrow" size={14} /></span></Link></Reveal>)}</ul>
      </div></section>

      <section id="levels" className="mg-sec mg-sec--sand"><div className="wrap">
        <Reveal className="mg-h"><small>Support levels</small><h2>Choose the cover that matches your downtime.</h2></Reveal>
        <ul className="mg-tiers">{SUPPORT_TIERS.map(([t, p, pts], i) => <Reveal as="li" key={t} delay={i * 80} className={i === 1 ? 'is-hot' : ''}><h3>{t}</h3><p>{p}</p><ul>{pts.map((x) => <li key={x}><Icon name="check" size={16} stroke={2.2} />{x}</li>)}</ul></Reveal>)}</ul>
        <p className="mg-note">Terms, hours and coverage areas are confirmed in your agreement. <Link to="/support">Compare plans in full</Link></p>
      </div></section>

      <section id="faq" className="section section--alt"><div className="wrap"><FaqTabs groups={groups} /></div></section>
      <Consult tone="dark" title="Something stopped? Report it now." text="Phone the support desk or send a message. A named person takes it from there." to="/contact?urgency=now" cta="Report a fault" />
    </div>
  );
}
