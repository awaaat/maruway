import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal, { Words } from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Crumbs, GiantWord, OrangeSplit, Consult } from '../components/Blocks';
import { PROJECTS } from '../data/projects';
import { SERVICES } from '../data/services';
import { img } from '../lib/assets';
import { ProjectsHero } from '../components/Heroes';

export default function Projects() {
  const [f, setF] = useState('all');
  const all = PROJECTS.filter((p) => img('projects', p.image));
  const list = all.filter((p) => f === 'all' || p.service === f);
  const used = SERVICES.filter((s) => all.some((p) => p.service === s.slug));
  const [lead, ...rest] = list;
  return (
    <>
      <Seo title="Our work" path="/projects" description="Field work by Maruway engineers: server rooms, chambers, CCTV, signage and public address." />
      <ProjectsHero lead={list.find((x) => x.image !== 'server-room-maintenance') || list[0]} f={f} setF={setF} used={used} />
      <section className="pj-feed skin-cinema"><div className="wrap">
        <div className="pj-grid">{rest.map((p, n) => (<Reveal key={p.slug} delay={n * 60}><Link to={`/projects/${p.slug}`} className="pj-c"><Picture folder="projects" name={p.image} alt={p.title} width={800} height={600} /><small>{p.place}</small><h3>{p.title}</h3></Link></Reveal>))}</div>
      </div></section>
      <GiantWord word="proof is part of the job" small="How we document" tone="beige">
        <ol className="kb-steps">{[['Before', 'We photograph what is there and agree the scope in writing.'], ['During', 'Chambers, racks and mounts are photographed at each stage.'], ['After', 'A short, dated visit report you can file.']].map(([t, d]) => <Reveal as="li" key={t}><b>{t}</b><span>{d}</span></Reveal>)}</ol>
      </GiantWord>
      <OrangeSplit tone="navy" flip k="Your site next" h="Want a story like these?" p="Tell us what you need built or fixed and we will come and look." art="hero-projects" to="/contact" cta="Talk to us" />
    </>
  );
}
