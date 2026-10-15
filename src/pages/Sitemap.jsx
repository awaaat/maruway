import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { SERVICES } from '../data/services';
import { INDUSTRIES, INSIGHTS } from '../data/content';
import { PROJECTS } from '../data/projects';
import { img } from '../lib/assets';

export default function Sitemap() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const groups = useMemo(() => [
    ['Services', [['All services', '/services'], ...SERVICES.map((s) => [s.title, `/services/${s.slug}`])]],
    ['Industries', [['All industries', '/industries'], ...INDUSTRIES.map((s) => [s.name, `/industries/${s.slug}`])]],
    ['Insights', [['All insights', '/insights'], ...INSIGHTS.map((a) => [a.title, `/insights/${a.slug}`])]],
    ['Our work', [['All work', '/projects'], ...PROJECTS.filter((p) => img('projects', p.image)).map((p) => [p.title, `/projects/${p.slug}`])]],
    ['Company', [['About us', '/about'], ['Data and AI', '/data-ai'], ['Partners', '/partners'], ['Support plans', '/support'], ['Careers', '/careers'], ['Contact us', '/contact']]],
    ['Legal', [['Privacy', '/privacy'], ['Terms', '/terms'], ['Accessibility', '/accessibility']]],
  ], []);
  const term = q.trim().toLowerCase();
  const shown = groups.map(([t, l]) => [t, l.filter(([x]) => !term || x.toLowerCase().includes(term) || t.toLowerCase().includes(term))]).filter(([, l]) => l.length);
  const n = shown.reduce((a, [, l]) => a + l.length, 0);
  return (
    <>
      <Seo title="Sitemap" path="/sitemap" description="Every page on the Maruway Networks website." />
      <section className="lg-map"><div className="wrap">
        <small>Sitemap</small>
        <label htmlFor="sm-q">Find a page</label>
        <div className="lg-map__q"><Icon name="search" size={20} /><input id="sm-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “cameras”, “solar” or “careers”" autoComplete="off" /></div>
        <p aria-live="polite">{n} page{n === 1 ? '' : 's'}{term ? ` match “${q.trim()}”` : ' on the site'}</p>
        <div className="lg-map__g">{shown.map(([t, l]) => <section key={t}><h2>{t}<i>{l.length}</i></h2><ul>{l.map(([x, to]) => <li key={to}><Link to={to}>{x}</Link></li>)}</ul></section>)}</div>
      </div></section>
    </>
  );
}
