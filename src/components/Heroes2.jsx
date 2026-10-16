import { Link } from 'react-router-dom';
import Cine from './Cine';
import Icon from './Icon';
import Picture from './Picture';
import { Words } from './Reveal';
import { getService } from '../data/services';

// Sector heroes: one colour and one drawn motif per industry, over a moving photograph.
const MOTIF = {
  education: <g><path d="M10 120h280M10 90h280M10 60h280M10 30h280" /><path d="M60 10v130M120 10v130M180 10v130M240 10v130" /><circle cx="150" cy="75" r="26" /></g>,
  telecom: <g><path d="M150 140V50M150 50l-26 90M150 50l26 90" /><path d="M110 40a58 58 0 0 1 80 0M90 20a88 88 0 0 1 120 0M128 58a30 30 0 0 1 44 0" /></g>,
  'public-sector': <g><path d="M20 130h260M40 130V60M95 130V60M150 130V60M205 130V60M260 130V60M20 60h260M30 60l120-40 120 40" /></g>,
  offices: <g>{[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <rect key={r + '-' + c} x={30 + c * 50} y={14 + r * 32} width="34" height="22" rx="3" />))}</g>,
  retail: <g><path d="M40 40h200l-18 90H58z" /><path d="M95 40a45 45 0 0 1 90 0" /><circle cx="150" cy="86" r="18" /></g>,
  health: <g><path d="M10 80h70l16-50 28 100 22-70 14 20h130" /><circle cx="150" cy="80" r="62" /></g>,
};
export function SectorHero({ x, col, svcs }) {
  return (
    <section className="sx-hero" style={{ '--c': col }}>
      <div className="wrap sx-hero__g">
        <div className="sx-hero__t">
          <nav className="kcrumb"><Link to="/">Home</Link> / <Link to="/industries">Industries</Link> / <span>{x.name}</span></nav>
          <small>Industry</small>
          <h1>{x.name}</h1>
          <p>{x.lead}</p>
          <div className="sx-hero__s">{svcs.map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}<Icon name="arrow" size={14} /></Link>)}</div>
        </div>
        <figure className="sx-hero__f"><Picture folder="projects" name={x.img} alt="" width={1200} height={900} eager /></figure>
      </div>
    </section>
  );
}

// Project stories open as a case file: the photograph in a frame, the facts on a card beside it.
export function StoryHero({ p }) {
  const svc = getService(p.service);
  return (
    <section className="hx-story"><div className="wrap hx-story__g">
      <div className="hx-story__ph"><Cine name={p.image} variant="a" /><span>{p.place}</span></div>
      <div className="hx-story__card">
        <nav className="kcrumb"><Link to="/">Home</Link> / <Link to="/projects">Work</Link></nav>
        <small>Case file{svc ? ` · ${svc.tag}` : ''}</small>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
        <dl><div><dt>Place</dt><dd>{p.place}</dd></div><div><dt>Service</dt><dd>{svc ? svc.title : 'Field work'}</dd></div></dl>
        <ul>{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </div></section>
  );
}
