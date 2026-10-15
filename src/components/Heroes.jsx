import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { Words } from './Reveal';
import Picture from './Picture';
import Icon from './Icon';
import Cine from './Cine';
import { img, photoNames } from '../lib/assets';
import { SITE } from '../config/site';

// One hero per page, each built differently so no two pages open the same way.
const Crumb = ({ items = [], light }) => (
  <nav className={`kcrumb ${light ? 'is-light' : ''}`} aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map(([l, to]) => <span key={l}> / {to ? <Link to={to}>{l}</Link> : l}</span>)}</nav>
);

/* About: paper, big type, two film strips drifting in opposite directions */
export function AboutHero() {
  const names = photoNames();
  const row = (off) => [...names.slice(off), ...names.slice(0, off), ...names.slice(off), ...names.slice(0, off)];
  return (
    <section className="hx-about">
      <div className="wrap hx-about__t">
        <Crumb items={[['Company'], ['About']]} />
        <small>Maruway Networks · since {SITE.founded}</small>
        <Words text="Predictable delivery, from Nairobi." />
        <p>{SITE.legalName} installs, runs and repairs the technology other people depend on, for organisations across East Africa.</p>
      </div>
      <div className="hx-about__film" aria-hidden="true">
        {[0, 3].map((o, r) => (
          <ul key={r} className={r ? 'is-rev' : ''}>{row(o).map((n, i) => <li key={i} style={{ '--h': `${[200, 260, 220, 240][i % 4]}px` }}>{img('projects', n) && <img src={img('projects', n)} alt="" loading="lazy" />}</li>)}</ul>
        ))}
      </div>
    </section>
  );
}

/* Projects: a cinema screen. The lead story fills the viewport and moves. */
export function ProjectsHero({ lead, f, setF, used }) {
  return (
    <section className="hx-proj">
      {lead && <Cine name={lead.image} variant="b" />}
      <div className="hx-proj__veil" />
      <div className="wrap hx-proj__in">
        <Crumb items={[['Work']]} light />
        <small>Field log · {lead ? lead.place : 'Nairobi'}</small>
        <Words text="Real sites. Real engineers." />
        {lead && <Link to={`/projects/${lead.slug}`} className="hx-proj__lead"><b>{lead.title}</b><span>Read the story <Icon name="arrow" size={14} /></span></Link>}
        <div className="hx-proj__f" role="tablist">
          <button className={f === 'all' ? 'is-on' : ''} onClick={() => setF('all')}>All</button>
          {used.map((s) => <button key={s.slug} className={f === s.slug ? 'is-on' : ''} onClick={() => setF(s.slug)}>{s.tag}</button>)}
        </div>
      </div>
    </section>
  );
}

/* Industries: six panels side by side. The one you point at opens. */
export function IndustryPanels({ items, colours }) {
  const [on, setOn] = useState(0);
  return (
    <section className="hx-ind">
      <div className="hx-ind__h wrap"><Crumb items={[['Industries']]} light /><Words text="Built around how your sector works." /></div>
      <div className="hx-ind__p" onMouseLeave={() => setOn(0)}>
        {items.map((n, i) => (
          <Link key={n.slug} to={`/industries/${n.slug}`} className={on === i ? 'is-on' : ''} style={{ '--c': colours[n.slug] }} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
            {img('projects', n.img) && <span className="hx-ind__bg" style={{ backgroundImage: `url(${img('projects', n.img)})` }} />}
            <span className="hx-ind__no">{String(i + 1).padStart(2, '0')}</span>
            <h3>{n.name}</h3>
            <p>{n.lead}</p>
            <span className="hx-ind__go">Explore <Icon name="arrow" size={14} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Insights: a masthead. Rules, issue line, numbered contents. */
export function Masthead({ lead, rest, art }) {
  return (
    <section className="hx-mast"><div className="wrap">
      <div className="hx-mast__bar"><span>Field Notes</span><span>Maruway Networks · Nairobi</span><span>{rest.length + 1} guides</span></div>
      <h1>Ideas that keep sites running.</h1>
      <div className="hx-mast__g">
        <Link to={`/insights/${lead.slug}`} className="hx-mast__lead"><div className="hx-mast__m"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div><small>{lead.tag} · {lead.mins} min read</small><h2>{lead.title}</h2><p>{lead.lead}</p></Link>
        <ol className="hx-mast__toc">{rest.slice(0, 5).map((a, n) => <li key={a.slug}><Link to={`/insights/${a.slug}`}><i>{String(n + 2).padStart(2, '0')}</i><span><small>{a.tag}</small><b>{a.title}</b></span></Link></li>)}</ol>
      </div>
    </div></section>
  );
}

/* Support: a status board built around the number 60 */
export function SupportHero() {
  return (
    <section className="hx-sup"><div className="wrap hx-sup__g">
      <div className="hx-sup__n" aria-hidden="true"><b>{SITE.responseCommitmentMinutes}</b><span>minutes</span><i /><i /><i /></div>
      <div className="hx-sup__c">
        <Crumb items={[['Support']]} light />
        <small>Support plans</small>
        <h1>One number to call. A technician within the hour.</h1>
        <p>Choose the cover that matches how much downtime you can afford. Terms and coverage areas are confirmed in your agreement.</p>
        <div className="hx-sup__a"><a href={`tel:${SITE.phone.tel}`}><Icon name="phone" size={18} /> {SITE.phone.display}</a><Link to="/contact?urgency=now">Request a technician</Link></div>
      </div>
    </div></section>
  );
}

/* Partners: two rows of logos running against each other */
export function PartnersHero({ items }) {
  const loop = [...items, ...items, ...items];
  return (
    <section className="hx-par">
      <div className="wrap hx-par__t"><Crumb items={[['Company', '/about'], ['Partners']]} /><small>Partners</small><Words text="Partners we build with." /><p>Vendors whose equipment we deploy, and organisations we have supported.</p></div>
      {[false, true].map((rev) => (
        <ul key={String(rev)} className={`hx-par__row ${rev ? 'is-rev' : ''}`} aria-hidden="true">{(rev ? [...loop].reverse() : loop).map((p, i) => <li key={p.name + i}><Picture folder="partners" name={p.image} alt="" width={120} height={44} label={p.name} /></li>)}</ul>
      ))}
    </section>
  );
}

/* Careers: three day-cards fanned like a hand */
export function CareersHero() {
  const cards = [['In the field', 'manhole-maintenance', 'Chambers, racks, radio links'], ['On the desk', 'cctv-maintenance-checks', 'Triage and dispatch'], ['In the data', 'ceiling-speakers', 'Dashboards and sensors']];
  return (
    <section className="hx-car"><div className="wrap hx-car__g">
      <div>
        <Crumb items={[['Company', '/about'], ['Careers']]} />
        <small>Careers</small>
        <Words text="Build the networks people rely on." />
        <p>There are no listed vacancies on this page, so send an open application. We are always glad to hear from capable engineers and support staff.</p>
        <a className="hx-car__b" href={`mailto:${SITE.email}?subject=Open%20application`}>Send an open application <Icon name="arrow" size={16} /></a>
      </div>
      <div className="hx-car__fan" aria-hidden="true">{cards.map(([t, p, d], i) => <figure key={t} style={{ '--i': i }}><Picture folder="projects" name={p} alt="" width={420} height={520} eager /><figcaption><b>{t}</b><span>{d}</span></figcaption></figure>)}</div>
    </div></section>
  );
}

/* Services index: a typographic list with a preview that follows the pointer */
export function ServiceIndex({ items, art }) {
  const [on, setOn] = useState(0);
  return (
    <section className="hx-svc"><div className="wrap hx-svc__g">
      <div>
        <Crumb items={[['Services']]} light />
        <small>Technology services</small>
        <h1>Seven ways we keep your site running.</h1>
        <ol onMouseLeave={() => setOn(0)}>
          {items.map((s, i) => <li key={s.slug} className={on === i ? 'is-on' : ''}><Link to={`/services/${s.slug}`} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}><i>{s.num}</i><b>{s.title}</b><span>{s.short}</span><Icon name="arrow" size={18} /></Link></li>)}
        </ol>
      </div>
      <div className="hx-svc__pv" aria-hidden="true"><Picture key={on} folder="art" name={art(items[on])} alt="" width={900} height={760} /><span>{items[on].tag}</span></div>
    </div></section>
  );
}
