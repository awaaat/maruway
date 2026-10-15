import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SITE } from '../config/site';
import { SERVICES } from '../data/services';
import { INDUSTRIES, INSIGHTS } from '../data/content';
import { PROJECTS } from '../data/projects';
import { img, photoNames } from '../lib/assets';
import Icon from './Icon';

const L = (t, to) => ({ t, to });
const PANELS = {
  what: {
    label: 'What we do',
    cols: [
      { h: 'Services', to: '/services', items: SERVICES.map((s) => L(s.title, `/services/${s.slug}`)) },
      { h: 'Industries', to: '/industries', items: INDUSTRIES.map((x) => L(x.name, `/industries/${x.slug}`)) },
      { h: 'How we work', items: [L('Support plans', '/support'), L('Our work', '/projects'), L('Partners', '/partners'), L('Request a quotation', '/contact')] },
    ],
    spot: [
      { f: 'projects', i: 'radio-receiver-alignment', t: 'Support plans', d: 'One number to call and a technician on site within the hour. Choose the cover that suits your site.', to: '/support' },
      { f: 'projects', i: 'manhole-maintenance', t: 'Networks built to a standard', d: 'Structured cabling, fibre and outside-plant works, labelled, tested and documented.', to: '/services/network-infrastructure' },
      { f: 'projects', i: 'cctv-maintenance-checks', t: 'Security that is maintained', d: 'CCTV and access control installed around how your site is used, then checked on a schedule.', to: '/services/cctv-access-control' },
    ],
  },
  who: {
    label: 'Who we are',
    cols: [
      { h: 'Our company', to: '/about', items: [L('About us', '/about'), L('Partners', '/partners'), L('Support plans', '/support')] },
      { h: 'Our impact', to: '/projects', items: [L('Our work', '/projects'), L('Insights', '/insights')] },
      { h: 'Get involved', items: [L('Careers', '/careers'), L('Contact us', '/contact')] },
    ],
    spot: [
      { f: 'projects', i: 'radio-receiver-alignment', t: 'Careers', d: 'Build and maintain the networks people rely on. See how to join the field and support teams.', to: '/careers' },
      { f: 'projects', i: 'ceiling-speakers', t: 'Our work', d: 'Recent installations and maintenance visits from our engineers across Nairobi and East Africa.', to: '/projects' },
    ],
  },
  ins: {
    label: 'Insights',
    cols: [
      { h: 'Insights hub', to: '/insights', items: INSIGHTS.map((a) => L(a.title, `/insights/${a.slug}`)) },
      { h: 'Our work', to: '/projects', items: PROJECTS.slice(0, 5).map((p) => L(p.title, `/projects/${p.slug}`)) },
    ],
    spot: INSIGHTS.slice(0, 2).map((a, n) => ({ f: 'projects', i: ['ceiling-speakers', 'cctv-maintenance-checks'][n], t: a.title, d: a.lead, to: `/insights/${a.slug}` })),
  },
};
const LINKS = [['Data and AI', '/data-ai'], ['Work', '/projects'], ['Support', '/support']];

function Spot({ items, onClose }) {
  const [k, setK] = useState(0);
  const s = items[k]; const pool = photoNames();
  const src = img(s.f, s.i) || (s.f === 'projects' && pool.length ? img('projects', pool[(k + s.t.length) % pool.length]) : null);
  return (
    <div className="kh__spot">
      <small>Spotlight</small>
      <Link to={s.to} onClick={onClose} className="kh__card" key={k}>
        <span className="kh__cimg">{src && <img src={src} alt="" />}</span>
        <span className="kh__ctxt"><b>{s.t}</b><em>{s.d}</em></span>
      </Link>
      <div className="kh__ctl">
        <button type="button" aria-label="Previous" disabled={k === 0} onClick={() => setK(k - 1)}><i className="kh__car kh__car--l" /></button>
        <span>{items.map((_, n) => <button key={n} type="button" aria-label={`Slide ${n + 1}`} className={n === k ? 'is-on' : ''} onClick={() => setK(n)} />)}</span>
        <button type="button" aria-label="Next" disabled={k === items.length - 1} onClick={() => setK(k + 1)}><i className="kh__car" /></button>
      </div>
    </div>
  );
}

export default function Header({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(null);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const logo = img('brand', 'logo');
  const close = () => setTab(null);
  const timer = useRef();
  const hold = () => clearTimeout(timer.current);
  const later = () => { hold(); timer.current = setTimeout(close, 180); };

  useEffect(() => { setOpen(false); setHidden(false); setTab(null); }, [pathname]);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => { const y = window.scrollY; if (!open && !tab) { if (y > last + 6 && y > 320) setHidden(true); else if (y < last - 6) setHidden(false); } last = y; };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [open, tab]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const k = (e) => { if (e.key === 'Escape') { setOpen(false); setTab(null); } };
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open]);

  const P = tab && PANELS[tab];
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`kh ${hidden ? 'is-hidden' : ''}`} onMouseEnter={hold} onMouseLeave={later}>
        <div className="kh__bar">
          <Link to="/" className="kh__logo" aria-label={`${SITE.name} home`}>{logo ? <img src={logo} alt="" width="124" height="34" /> : SITE.name}</Link>
          <ul className="kh__nav">
            {Object.entries(PANELS).map(([id, p]) => (
              <li key={id} onMouseEnter={() => { hold(); setTab(id); }}><button type="button" className={tab === id ? 'is-on' : ''} aria-expanded={tab === id} onClick={() => setTab(tab === id ? null : id)}>{p.label}<i className="kh__caret" /></button></li>
            ))}
            {LINKS.map(([l, to]) => <li key={to} onMouseEnter={close}><NavLink to={to} className={({ isActive }) => (isActive ? 'is-cur' : '')}>{l}</NavLink></li>)}
          </ul>
          <div className="kh__end">
            <a className="kh__tel" href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a>
            <Link className="kh__cta" to="/contact?urgency=now"><span>Get a technician</span><b><Icon name="arrow" size={15} /></b></Link>
            <button type="button" className="kh__round" aria-label="Search" onClick={onSearch}><Icon name="search" size={18} /></button>
            <button className="hdr__icon hdr__toggle" type="button" aria-expanded={open} aria-controls="drawer" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}><Icon name={open ? 'close' : 'menu'} size={22} /></button>
          </div>
        </div>
        {P && (
          <div className="kh__panel">
            <button type="button" className="kh__x" aria-label="Close navigation" onClick={close}><Icon name="close" size={22} /></button>
            <div className="kh__pg">
              <div className="kh__cols">
                {P.cols.map((c) => (
                  <div key={c.h}>
                    {c.to ? <Link className="kh__h" to={c.to} onClick={close}>{c.h}<i className="kh__tri" /></Link> : <p className="kh__h">{c.h}</p>}
                    <ul>{c.items.map((x) => <li key={x.to + x.t}><Link to={x.to} onClick={close}>{x.t}</Link></li>)}</ul>
                  </div>
                ))}
              </div>
              <Spot items={P.spot} onClose={close} key={tab} />
            </div>
          </div>
        )}
      </header>
      {tab && <div className="kh__scrim" onClick={close} />}

      <div id="drawer" className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="drawer__nav wrap" aria-label="Mobile">
          {[['What we do', '/services'], ['Who we are', '/about'], ['Insights', '/insights'], ['Work', '/projects'], ['Support', '/support'], ['Contact', '/contact']].map(([l, to], i) => (<NavLink key={to} className="top" to={to} style={{ '--i': i }} tabIndex={open ? 0 : -1}>{l}</NavLink>))}
          <div className="drawer__sub">{SERVICES.map((s) => (<Link key={s.slug} to={`/services/${s.slug}`} tabIndex={open ? 0 : -1}>{s.title}</Link>))}</div>
          <div className="drawer__cta"><a className="btn btn--primary" href={`tel:${SITE.phone.tel}`} tabIndex={open ? 0 : -1}><Icon name="phone" /> {SITE.phone.display}</a></div>
        </nav>
      </div>
    </>
  );
}

export function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const ref = useRef();
  useEffect(() => { if (open) { setQ(''); setTimeout(() => ref.current?.focus(), 80); } }, [open]);
  useEffect(() => { const k = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);
  const index = [
    ...SERVICES.map((s) => ({ t: s.title, k: 'Service', to: `/services/${s.slug}`, x: `${s.short} ${s.keywords}` })),
    ...INDUSTRIES.map((s) => ({ t: s.name, k: 'Industry', to: `/industries/${s.slug}`, x: s.lead })),
    ...INSIGHTS.map((s) => ({ t: s.title, k: 'Insight', to: `/insights/${s.slug}`, x: s.lead })),
    ...[['Support plans', '/support'], ['Careers', '/careers'], ['Partners', '/partners'], ['About Maruway', '/about'], ['Contact', '/contact'], ['Our work', '/projects']].map(([t, to]) => ({ t, k: 'Page', to, x: '' })),
  ];
  const res = q.trim() ? index.filter((i) => `${i.t} ${i.x}`.toLowerCase().includes(q.toLowerCase())).slice(0, 7) : index.slice(0, 7);
  const go = (to) => { onClose(); nav(to); };
  return (
    <div className={`search ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Search" aria-hidden={!open}>
      <button type="button" className="hdr__icon search__x" aria-label="Close search" onClick={onClose} style={{ color: '#fff' }}><Icon name="close" size={24} /></button>
      <div className="search__box">
        <input ref={ref} className="search__input" placeholder="Search services, industries, insights" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && res[0] && go(res[0].to)} aria-label="Search the site" />
        <div className="search__res">
          {res.map((r) => (<a key={r.to + r.t} href={r.to} onClick={(e) => { e.preventDefault(); go(r.to); }}><span>{r.t}</span><small>{r.k}</small></a>))}
          {res.length === 0 && <p style={{ color: '#8794b3', padding: '16px 4px' }}>No matches. Try “CCTV”, “Wi-Fi” or “support”.</p>}
        </div>
      </div>
    </div>
  );
}
