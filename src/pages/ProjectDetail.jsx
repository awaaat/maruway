import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { StoryHero } from '../components/Heroes2';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Consult } from '../components/Blocks';
import { PROJECTS } from '../data/projects';
import { getService } from '../data/services';
import { STORIES_EXTRA } from '../data/content';
import { img } from '../lib/assets';
import { SERVICE_DEEP } from '../data/deep';
import NotFound from './NotFound';

const ART = Object.fromEntries(Object.entries(SERVICE_DEEP).map(([k, v]) => [k, v.art]));

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const svc = getService(p.service);
  const ex = STORIES_EXTRA[p.slug];
  const more = PROJECTS.filter((x) => x.slug !== p.slug && img('projects', x.image)).slice(0, 3);
  return (
    <>
      <Seo title={p.title} path={`/projects/${p.slug}`} description={p.summary} />
      <StoryHero p={p} />
      <section className="section">
        <div className="wrap sd-layout">
          <div className="prose">
            <Reveal><div className="photo photo--wide" style={{ marginBottom: 40 }}><Picture folder="projects" name={p.image} alt={p.title} width={1280} height={960} eager /></div></Reveal>
            <Reveal><h2>What was done</h2><p>{ex?.story || p.summary}</p><ul>{p.scope.map((s) => <li key={s}>{s}</li>)}</ul></Reveal>
            {ex && <Reveal><div className="kpis">{ex.kpis.map(([a, b]) => (<div className="kpi" key={a}><b>{b}</b><span>{a}</span></div>))}</div></Reveal>}
          </div>
          <aside className="sd-side">
            <div className="sd-card"><h4>Location</h4><p>{p.place}</p></div>
            {svc && <div className="sd-card"><h4>Service</h4><Link className="tlink" to={`/services/${svc.slug}`}>{svc.title} <Icon name="arrow" size={14} /></Link></div>}
            <div className="sd-card sd-card--dark"><h4>Similar work</h4><p>Need something like this done?</p><Link className="btn btn--primary" to={`/contact?service=${p.service}`}>Talk to us</Link></div>
          </aside>
        </div>
      </section>
      <section className="section section--alt"><div className="wrap">
        <Reveal className="sec-head"><h2>More from the field</h2></Reveal>
        <div className="cards3">{more.map((m) => (<Link key={m.slug} to={`/projects/${m.slug}`} className="card"><div className="card__m"><Picture folder="projects" name={m.image} alt={m.title} width={640} height={400} /></div><div className="card__b"><small>{m.place}</small><h3>{m.title}</h3></div></Link>))}</div>
      </div></section>
      <Consult tone="beige" title="Need something like this?" text="Tell us about your site. A short call is enough to start." cta="Talk to us" />
    </>
  );
}
