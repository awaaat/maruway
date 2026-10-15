import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Picture from './Picture';
import Icon from './Icon';
import Alt from './Alt';
import Accordion from './Accordion';
import { SERVICE_DEEP } from '../data/deep';
import { INDUSTRIES } from '../data/content';
import { PROJECTS } from '../data/projects';
import { img } from '../lib/assets';

// Deep sections shared by every service page. Each service supplies its own words and pictures.
export function Explainer({ slug }) {
  const d = SERVICE_DEEP[slug]?.what; const art = SERVICE_DEEP[slug]?.art;
  if (!d) return null;
  return (
    <section id="what" className="section xp"><div className="wrap xp__g">
      <Reveal className="xp__m"><Picture folder="art" name={art} alt="" width={1000} height={700} /></Reveal>
      <Reveal className="xp__t"><h2>{d.h}</h2>{d.p.map((x) => <p key={x}>{x}</p>)}
        <dl>{d.facts.map(([a, b]) => (<div key={a}><dt>{a}</dt><dd>{b}</dd></div>))}</dl></Reveal>
    </div></section>
  );
}

export function Benefits({ slug }) {
  const d = SERVICE_DEEP[slug]?.benefits;
  if (!d) return null;
  return (
    <section id="benefits" className="section section--alt"><div className="wrap">
      <Reveal className="sec-head"><h2>The difference you will notice.</h2></Reveal>
      <Alt rows={d} />
    </div></section>
  );
}

export function Compare({ slug }) {
  const d = SERVICE_DEEP[slug]?.compare;
  if (!d) return null;
  return (
    <section className="section"><div className="wrap">
      <Reveal className="sec-head"><h2>From firefighting to a calm routine.</h2></Reveal>
      <div className="cmp">
        <Reveal className="cmp__c cmp__c--b"><h3>Without it</h3><ul>{d.before.map((x) => <li key={x}><i>x</i>{x}</li>)}</ul></Reveal>
        <Reveal className="cmp__c cmp__c--a" delay={90}><h3>With Maruway</h3><ul>{d.after.map((x) => <li key={x}><Icon name="check" size={16} stroke={2.2} />{x}</li>)}</ul></Reveal>
      </div>
    </div></section>
  );
}

export function Gets({ slug }) {
  const d = SERVICE_DEEP[slug]?.get;
  if (!d) return null;
  return (
    <section id="receive" className="section section--dark"><div className="wrap">
      <Reveal className="sec-head"><h2>Six things in your hands at the end.</h2></Reveal>
      <div className="gets">{d.map(([t, p], n) => (<Reveal key={t} delay={n * 50} className="gets__i"><Icon name="check" size={18} stroke={2.2} /><h3>{t}</h3><p>{p}</p></Reveal>))}</div>
    </div></section>
  );
}

export function Proof({ s }) {
  const ps = PROJECTS.filter((p) => p.service === s.slug && img('projects', p.image));
  const ind = (SERVICE_DEEP[s.slug]?.inds || []).map((x) => INDUSTRIES.find((i) => i.slug === x)).filter(Boolean);
  return (
    <section className="section"><div className="wrap">
      {ps.length > 0 && (<>
        <Reveal className="sec-head"><h2>Work like this, done by our team.</h2></Reveal>
        <div className="prf">{ps.map((p) => (<Link key={p.slug} to={`/projects/${p.slug}`} className="prf__c"><Picture folder="projects" name={p.image} alt={p.title} width={640} height={420} /><small>{p.place}</small><b>{p.title}</b></Link>))}</div>
      </>)}
      {ind.length > 0 && (<div className="relind"><h3>Who we do this for</h3><div>{ind.map((i) => <Link key={i.slug} to={`/industries/${i.slug}`} className="chip">{i.name}</Link>)}</div></div>)}
    </div></section>
  );
}

export function ServiceFaq({ slug }) {
  const d = SERVICE_DEEP[slug]?.faq;
  if (!d) return null;
  return (
    <section id="faq" className="section section--alt"><div className="wrap kfaq"><div><h2>Before you ask.</h2></div><Accordion items={d} /></div></section>
  );
}

export function Quote({ s }) {
  return (
    <section className="qband"><div className="wrap qband__g">
      <div><h2>Tell us about your site.</h2><p>A short visit or a phone call is enough to start. You will get a written scope, not a sales pitch.</p></div>
      <div className="kact" style={{ marginTop: 0 }}><Link className="kbtn kbtn--solid" to={`/contact?service=${s.slug}`}>Request a quotation <Icon name="arrow" size={16} /></Link><Link className="klink" to="/contact?urgency=now">Get a technician</Link></div>
    </div></section>
  );
}
