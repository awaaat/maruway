import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { Words } from './Reveal';
import Picture from './Picture';
import Icon from './Icon';

// Building blocks in the Kyndryl pattern language. Pages compose them differently.

export const Crumbs = ({ items = [], light }) => (
  <nav className={`kb-crumbs ${light ? 'is-light' : ''}`} aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map(([l, to]) => <span key={l}> / {to ? <Link to={to}>{l}</Link> : l}</span>)}</nav>
);

// Sticky "Jump to ..." pill
export function Jump({ items }) {
  return (
    <nav className="kb-jump" aria-label="Jump to"><div className="kb-jump__in"><b>Jump to</b>{items.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</div></nav>
  );
}

// Kyndryl service hero: wide image band, title card overlapping, article links below
export function Banner({ crumbs, tag, title, sub, photo, art, links = [], children }) {
  return (
    <section className="kb-banner">
      <div className="kb-banner__img">{photo ? <Picture folder="projects" name={photo} alt="" width={1600} height={686} eager /> : <Picture folder="art" name={art} alt="" width={1600} height={686} eager />}</div>
      <div className="wrap kb-banner__in">
        <div className="kb-banner__card"><Crumbs items={crumbs} /><small>{tag}</small><h1>{title}</h1>{sub && <p>{sub}</p>}{children}</div>
        {links.length > 0 && <ul className="kb-banner__links">{links.map(([t, to]) => <li key={t}><Link to={to}>{t} <Icon name="arrow" size={14} /></Link></li>)}</ul>}
      </div>
    </section>
  );
}

// Orange panel beside a photo
export function OrangeSplit({ k, h, p, to, cta = 'Learn more', photo, art, flip, tone = 'orange', id }) {
  return (
    <section id={id} className={`kb-os kb-os--${tone} ${flip ? 'is-flip' : ''}`}>
      <Reveal className="kb-os__t"><small>{k}</small><h2>{h}</h2><p>{p}</p>{to && <Link className="kb-os__b" to={to}>{cta} <Icon name="arrow" size={16} /></Link>}</Reveal>
      <div className="kb-os__m">{photo ? <Picture folder="projects" name={photo} alt="" width={1000} height={800} /> : <Picture folder="art" name={art} alt="" width={1000} height={800} />}</div>
    </section>
  );
}

// Giant lowercase heading with a slot beneath
export function GiantWord({ word, small, children, tone = 'light', id }) {
  return (
    <section id={id} className={`kb-gw kb-gw--${tone}`}><div className="wrap">
      <Reveal><span className="kb-gw__s">{small}</span><h2 className="kb-gw__w">{word}</h2></Reveal>
      {children}
    </div></section>
  );
}

// Horizontal snap scroller with arrows
export function HScroll({ children, label }) {
  const r = useRef(null);
  const go = (d) => r.current?.scrollBy({ left: d * (r.current.clientWidth * 0.8), behavior: 'smooth' });
  return (
    <div className="kb-hs"><div className="kb-hs__t" ref={r} role="group" aria-label={label}>{children}</div>
      <div className="kb-hs__c"><button type="button" aria-label="Previous" onClick={() => go(-1)}><Icon name="left" size={18} /></button><button type="button" aria-label="Next" onClick={() => go(1)}><Icon name="arrow" size={18} /></button></div></div>
  );
}

// FAQ with category tabs
export function FaqTabs({ groups, title = 'Answers to questions about' }) {
  const [g, setG] = useState(0); const [o, setO] = useState(0);
  return (
    <div className="kb-faq">
      <div><small>{title}</small><div role="tablist" className="kb-faq__tabs">{groups.map((x, i) => <button key={x.t} role="tab" aria-selected={g === i} className={g === i ? 'is-on' : ''} onClick={() => { setG(i); setO(0); }}>{x.t}</button>)}</div></div>
      <div className="kb-faq__l">{groups[g].items.map(([q, a], i) => (
        <div key={q} className={o === i ? 'is-open' : ''}><button type="button" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>{q}<span className="pm" /></button><div><p>{a}</p></div></div>
      ))}</div>
    </div>
  );
}

// Consult card (their "complimentary 30-minute consultation")
export function Consult({ title, text, to = '/contact', cta = 'Consult an expert', tone = 'dark', art }) {
  return (
    <section className={`kb-cons kb-cons--${tone}`}><div className="wrap kb-cons__g">
      <div><h2>{title}</h2><p>{text}</p>{to.startsWith('mailto:') || to.startsWith('tel:') ? <a className="kb-cons__b" href={to}>{cta} <Icon name="arrow" size={16} /></a> : <Link className="kb-cons__b" to={to}>{cta} <Icon name="arrow" size={16} /></Link>}</div>
      {art && <div className="kb-cons__m"><Picture folder="art" name={art} alt="" width={800} height={600} /></div>}
    </div></section>
  );
}

// Quote with a portrait
export function QuoteBand({ q, who, role, photo, folder = 'team' }) {
  return (
    <section className="kb-q"><div className="wrap kb-q__g">
      <div className="kb-q__p"><Picture folder={folder} name={photo} alt={who} width={420} height={420} /></div>
      <Reveal><span className="kb-q__m" aria-hidden="true">&ldquo;</span><h3>{q}</h3><b>{who}</b><span>{role}</span></Reveal>
    </div></section>
  );
}

export function StatBand({ items, tone = 'dark' }) {
  return (<section className={`kb-st kb-st--${tone}`}><div className="wrap kb-st__g">{items.map(([v, l]) => <Reveal key={l}><b>{v}</b><span>{l}</span></Reveal>)}</div></section>);
}

// Switch between two states of one big panel
export function Flip({ a, b, la = 'Without', lb = 'With Maruway' }) {
  const [on, setOn] = useState(false);
  const L = on ? b : a;
  return (
    <div className={`kb-flip ${on ? 'is-on' : ''}`}>
      <div className="kb-flip__sw" role="group" aria-label="Compare"><button type="button" className={!on ? 'is-on' : ''} onClick={() => setOn(false)}>{la}</button><button type="button" className={on ? 'is-on' : ''} onClick={() => setOn(true)}>{lb}</button></div>
      <ul key={String(on)}>{L.map((x) => <li key={x}>{on ? <Icon name="check" size={20} stroke={2.2} /> : <i>x</i>}{x}</li>)}</ul>
    </div>
  );
}

// Tab panel (their "Our services / The Kyndryl difference")
export function TabsPanel({ tabs }) {
  const [i, setI] = useState(0); const t = tabs[i];
  return (
    <div className="kb-tp">
      <div role="tablist" className="kb-tp__l">{tabs.map((x, n) => <button key={x.t} role="tab" aria-selected={i === n} className={i === n ? 'is-on' : ''} onClick={() => setI(n)} onMouseEnter={() => setI(n)}>{x.t}</button>)}</div>
      <div className="kb-tp__b" key={i}>
        <div><h3>{t.h}</h3><p>{t.p}</p>{t.pts && <ul>{t.pts.map((p) => <li key={p}><Icon name="check" size={16} stroke={2.2} />{p}</li>)}</ul>}{t.to && <Link className="tlink" to={t.to}>{t.cta || 'Learn more'} <Icon name="arrow" size={14} /></Link>}</div>
        <div className="kb-tp__m">{t.photo ? <Picture folder="projects" name={t.photo} alt="" width={800} height={600} /> : <Picture folder="art" name={t.art} alt="" width={800} height={600} />}</div>
      </div>
    </div>
  );
}

// Logo grid, each opens a detail panel (their alliances page)
export function LogoModal({ items }) {
  const [o, setO] = useState(null);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setO(null); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  const x = o !== null ? items[o] : null;
  return (
    <>
      <ul className="kb-lg">{items.map((p, n) => (<li key={p.name}><button type="button" onClick={() => setO(n)} style={{ '--c': p.c }}><Picture folder="partners" name={p.image} alt={p.name} width={180} height={64} label={p.name} /><span>{p.name}</span></button></li>))}</ul>
      {x && (
        <div className="kb-mod" role="dialog" aria-modal="true" aria-label={x.name} onClick={() => setO(null)}>
          <div className="kb-mod__c" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="kb-mod__x" aria-label="Close" onClick={() => setO(null)}><Icon name="close" size={22} /></button>
            <div className="kb-mod__l" style={{ '--c': x.c }}><Picture folder="partners" name={x.image} alt={x.name} width={220} height={80} label={x.name} /></div>
            <div><h3>{x.name}</h3><p>{x.d}</p>{x.sol && <><h4>What we do together</h4><ul>{x.sol.map((s) => <li key={s}>{s}</li>)}</ul></>}</div>
          </div>
        </div>
      )}
    </>
  );
}

// Big lead card + side list (Institute style)
export function Lead({ lead, list, render }) {
  return (<div className="kb-lead"><div className="kb-lead__a">{render(lead, true)}</div><div className="kb-lead__b">{list.map((x) => render(x, false))}</div></div>);
}

export { Words };
