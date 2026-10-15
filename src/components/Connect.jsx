import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import Cine from './Cine';
import { SITE } from '../config/site';
import { photoNames } from '../lib/assets';

// The contact band above the footer. It is not one design repeated: each route gets its own layout.
// topics  chips that pre-fill the form (Slack-style)     paths   two doors: fault or project (Zendesk-style)
// ways    four ways to reach us (Dropbox-style)          photo   photo-led with two actions (Peloton-style)
// ask     one question line that carries over to form    hours   desk hours and address, large
// cv      open application                               sample  data spreadsheet drop zone
// slim    a quiet one-line strip
const BY_PATH = {
  '/': 'topics', '/services': 'paths', '/industries': 'ways', '/projects': 'photo', '/insights': 'ask', '/about': 'hours',
  '/careers': 'cv', '/partners': 'partner', '/support': 'slim', '/data-ai': 'sample', '/privacy': 'slim', '/terms': 'slim',
  '/accessibility': 'slim', '/sitemap': 'slim',
};
const BY_SERVICE = { 'managed-it': 'paths', 'network-infrastructure': 'hours', 'cctv-access-control': 'photo', 'telecom-iot': 'ask', 'data-analytics': 'sample', 'public-address-audio': 'topics', 'solar-installation': 'power' };
const ROTATE = ['ways', 'ask', 'topics', 'photo', 'hours', 'paths'];

export function variantFor(path) {
  if (path === '/contact') return null;
  if (BY_PATH[path]) return BY_PATH[path];
  const seg = path.split('/').filter(Boolean);
  if (seg[0] === 'services' && BY_SERVICE[seg[1]]) return BY_SERVICE[seg[1]];
  if (seg[0] === 'projects') return 'photo';
  if (seg[0] === 'insights') return 'ask';
  let h = 0; for (const c of path) h = (h * 31 + c.charCodeAt(0)) % 997;
  return ROTATE[h % ROTATE.length];
}

const WA = SITE.whatsapp && `https://wa.me/${SITE.whatsapp}`;
const Arrow = () => <Icon name="arrow" size={16} />;

function Topics() {
  const nav = useNavigate();
  const [t, setT] = useState('');
  const TOPICS = [['Something is down', 'urgency=now'], ['A new network', 'service=network-infrastructure'], ['Cameras and access', 'service=cctv-access-control'], ['Support plan', 'service=managed-it'], ['Dashboards and data', 'service=data-analytics'], ['Solar and backup', 'service=solar-installation'], ['Sound for a space', 'service=public-address-audio'], ['Something else', '']];
  return (
    <section className="cx cx-topics"><div className="wrap cx-topics__g">
      <div><small>Contact us</small><h2>What do you need help with?</h2><p>Pick a topic and the form opens already filled in. Or tell us in your own words.</p></div>
      <div>
        <div className="cx-chips">{TOPICS.map(([l, q]) => <button type="button" key={l} onClick={() => nav(`/contact${q ? `?${q}` : ''}`)}>{l}</button>)}</div>
        <form className="cx-line" onSubmit={(e) => { e.preventDefault(); nav(`/contact?msg=${encodeURIComponent(t)}`); }}>
          <input value={t} onChange={(e) => setT(e.target.value)} placeholder="Or type it here, like “the cameras at the gate are blank”" aria-label="Describe what you need" />
          <button type="submit" aria-label="Send">Go <Arrow /></button>
        </form>
      </div>
    </div></section>
  );
}

function Paths() {
  return (
    <section className="cx cx-paths"><div className="wrap cx-paths__g">
      <Link to="/contact?urgency=now" className="cx-door cx-door--fault"><small>Right now</small><h2>Something has stopped.</h2><p>A named person at the support desk takes it from the first call.</p><span>Report a fault <Arrow /></span></Link>
      <Link to="/contact" className="cx-door cx-door--plan"><small>Planning</small><h2>We want something built.</h2><p>Cabling, cameras, power, dashboards. A short call to scope it, a survey to price it.</p><span>Start a project <Arrow /></span></Link>
    </div></section>
  );
}

function Ways() {
  const W = [['phone', 'Call the desk', SITE.phone.display, `tel:${SITE.phone.tel}`], ['mail', 'Email us', SITE.email, `mailto:${SITE.email}`], ['chat', 'WhatsApp', 'Message an engineer', WA], ['pin', 'Visit', `${SITE.address.street}, ${SITE.address.city}`, '/contact']].filter((w) => w[3]);
  return (
    <section className="cx cx-ways"><div className="wrap">
      <h2>Four ways to reach a person.</h2>
      <ul>{W.map(([i, t, d, to]) => <li key={t}>{to.startsWith('/') ? <Link to={to}><Icon name={i} size={22} /><b>{t}</b><span>{d}</span></Link> : <a href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"><Icon name={i} size={22} /><b>{t}</b><span>{d}</span></a>}</li>)}</ul>
    </div></section>
  );
}

function Photo() {
  const pool = photoNames();
  const name = pool[2] || pool[0];
  return (
    <section className="cx cx-photo">{name && <Cine name={name} variant="c" />}<div className="cx-photo__veil" />
      <div className="wrap cx-photo__in"><h2>Let us walk the site.</h2><p>An engineer visits, looks at what is there and writes down what it would take. No charge for the conversation.</p>
        <div className="cx-photo__a"><Link to="/contact" className="cx-btn">Book a site visit <Arrow /></Link><a href={`tel:${SITE.phone.tel}`} className="cx-link">{SITE.phone.display}</a></div></div>
    </section>
  );
}

function Ask() {
  const nav = useNavigate();
  const [t, setT] = useState('');
  return (
    <section className="cx cx-ask"><div className="wrap">
      <small>Ask an engineer</small>
      <form onSubmit={(e) => { e.preventDefault(); nav(`/contact?msg=${encodeURIComponent(t)}`); }}>
        <label htmlFor="cx-ask">What are you trying to work out?</label>
        <div><input id="cx-ask" value={t} onChange={(e) => setT(e.target.value)} placeholder="Type a question" /><button type="submit" aria-label="Send question"><Arrow /></button></div>
      </form>
      <p>Replies come from the person who would do the work, usually the same working day.</p>
    </div></section>
  );
}

function Hours() {
  return (
    <section className="cx cx-hours"><div className="wrap cx-hours__g">
      <div className="cx-hours__big"><small>Support desk</small><b>24/7</b><span>{SITE.hours}</span></div>
      <address><small>Find us</small><p>{SITE.address.street}<br />{SITE.address.postalBox}<br />{SITE.address.city}, {SITE.address.country}</p><Link to="/contact" className="cx-btn cx-btn--ink">Request a visit <Arrow /></Link></address>
      <svg className="cx-hours__map" viewBox="0 0 300 200" aria-hidden="true"><path d="M0 150 C80 120 120 170 200 110 S280 80 300 60" /><path d="M40 0 L90 200" /><path d="M150 0 L170 200" /><path d="M0 60 L300 100" /><circle cx="172" cy="104" r="7" /><circle cx="172" cy="104" r="18" /></svg>
    </div></section>
  );
}

function Cv() {
  return (
    <section className="cx cx-cv"><div className="wrap cx-cv__g">
      <div><small>Open application</small><h2>No vacancy listed? Write anyway.</h2><p>Send a CV and three lines about the work you want to do.</p></div>
      <a className="cx-cv__card" href={`mailto:${SITE.email}?subject=Open%20application`}><span>CV.pdf</span><b>{SITE.email}</b><i><Arrow /></i></a>
    </div></section>
  );
}

function Sample() {
  return (
    <section className="cx cx-sample"><div className="wrap cx-sample__g">
      <div><small>Data and AI</small><h2>Start with one spreadsheet.</h2><p>We will show you what it looks like as a dashboard, and what you could ask it.</p></div>
      <Link to="/contact?service=data-analytics" className="cx-drop"><Icon name="arrow" size={26} /><b>Send a sample</b><span>Excel, CSV or an export from your ticket system</span></Link>
    </div></section>
  );
}

function Partner() {
  const P = [['I make equipment', 'Tell us what it does and how it is supported in Kenya.'], ['I need a partner', 'Tell us the site and the job. We will bring the right vendor.'], ['I want a referral', 'Introduce a client who needs a site looked after.']];
  return (
    <section className="cx cx-partner"><div className="wrap">
      <h2>Let us work out how we fit.</h2>
      <div>{P.map(([t, d], i) => <Link key={t} to={`/contact?msg=${encodeURIComponent(t + ': ')}`}><i>{i + 1}</i><b>{t}</b><span>{d}</span><Arrow /></Link>)}</div>
    </div></section>
  );
}

function Power() {
  const L = ['Equipment that must stay on', 'Roof type and rough area', 'Hours of power cut you see', 'A recent electricity bill'];
  return (
    <section className="cx cx-power"><div className="wrap cx-power__g">
      <div><small>Solar and backup</small><h2>Send what you have. We will size it.</h2><Link className="cx-btn cx-btn--ink" to="/contact?service=solar-installation">Send the details <Arrow /></Link></div>
      <ul>{L.map((x) => <li key={x}><Icon name="check" size={18} stroke={2.4} />{x}</li>)}</ul>
    </div></section>
  );
}

function Slim() {
  return (
    <section className="cx cx-slim"><div className="wrap"><span>Questions? Talk to a person.</span><a href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a><a href={`mailto:${SITE.email}`}>{SITE.email}</a><Link to="/contact">Send a request <Arrow /></Link></div></section>
  );
}

const MAP = { partner: Partner, power: Power, topics: Topics, paths: Paths, ways: Ways, photo: Photo, ask: Ask, hours: Hours, cv: Cv, sample: Sample, slim: Slim };

export default function ConnectBand() {
  const { pathname } = useLocation();
  const v = variantFor(pathname);
  const C = v && MAP[v];
  return C ? <C key={pathname} /> : null;
}
