import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { SectorHero } from '../components/Heroes2';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import Accordion from '../components/Accordion';
import { Banner, Jump, OrangeSplit, HScroll, FaqTabs, Consult } from '../components/Blocks';
import { INDUSTRIES } from '../data/content';
import { INDUSTRY_DEEP, SERVICE_DEEP } from '../data/deep';
import { INDUSTRY_COL } from '../data/kyn';
import { getService } from '../data/services';
import NotFound from './NotFound';

const Day = ({ d }) => <ol className="daytl">{d.map((t) => { const [h, ...r] = t.split('  '); return <li key={t}><b>{h}</b><span>{r.join(' ')}</span></li>; })}</ol>;

export default function IndustryDetail() {
  const { slug } = useParams();
  const x = INDUSTRIES.find((i) => i.slug === slug);
  if (!x) return <NotFound />;
  const d = INDUSTRY_DEEP[x.slug]; const svcs = d.services.map(getService).filter(Boolean); const col = INDUSTRY_COL[x.slug];
  const A = ['education', 'offices', 'health'].includes(x.slug);
  const seo = <Seo title={x.name} path={`/industries/${x.slug}`} description={x.lead} />;

  if (A) return (<>
    {seo}
    <SectorHero x={x} col={col} svcs={svcs} />
    <Jump items={[['The challenge', 'challenge'], ['A normal day', 'day'], ['Where to start', 'start'], ['Questions', 'faq']]} />
    <OrangeSplit id="challenge" tone="navy" k="The challenge" h={x.challenge} p={x.approach} photo={x.img} flip />
    <section id="day" className="section"><div className="wrap kb-two"><Reveal><h2>What it looks like when it works.</h2><ul className="kb-checks">{x.points.map((p) => <li key={p}><Icon name="check" size={18} stroke={2.2} />{p}</li>)}</ul></Reveal><Reveal><Day d={d.day} /></Reveal></div></section>
    <section id="start" className="section section--dark"><div className="wrap"><Reveal className="sec-head"><h2>Three services that fit.</h2></Reveal>
      <HScroll label="Services">{svcs.map((s) => <Link key={s.slug} to={`/services/${s.slug}`} className="kb-card"><div className="kb-card__m"><Picture folder="art" name={SERVICE_DEEP[s.slug].art} alt="" width={800} height={500} /></div><div className="kb-card__b"><small>Service</small><h3>{s.title}</h3><p>{s.short}</p><span className="tlink">See the service <Icon name="arrow" size={14} /></span></div></Link>)}</HScroll></div></section>
    <section id="faq" className="section"><div className="wrap"><FaqTabs title={`Questions from ${x.name.toLowerCase()}`} groups={[{ t: x.name, items: d.faq }, { t: 'Working with us', items: [['How do we start?', 'Send a request or phone the desk. Most work begins with a short survey.'], ['What do we get afterwards?', 'Drawings, labels, test results and a short written report.']] }]} /></div></section>
    <Consult tone="orange" title={`Talk to us about ${x.name.toLowerCase()}.`} text="A short call is enough to understand your site and what is in the way." cta="Talk to us" />
  </>);

  return (<>
    {seo}
    <SectorHero x={x} col={col} svcs={svcs} />
    <section className="section"><div className="wrap kb-sticky">
      <div className="kb-sticky__l"><Picture folder="projects" name={x.img} alt="" width={900} height={700} /></div>
      <div className="kb-sticky__r"><Reveal><small>The challenge</small><h3>{x.challenge}</h3><p>{x.approach}</p></Reveal>{x.points.map((p) => <Reveal key={p}><small>What we provide</small><h3>{p}</h3></Reveal>)}</div>
    </div></section>
    <section className="kb-tiles">{svcs.map((s) => (<Link key={s.slug} to={`/services/${s.slug}`} style={{ '--c': col }}><Picture folder="art" name={SERVICE_DEEP[s.slug].art} alt="" width={800} height={600} /><h3>{s.title}</h3><p>{s.short}</p><span className="tlink">See the service <Icon name="arrow" size={14} /></span></Link>))}</section>
    <section className="section section--alt"><div className="wrap kfaq"><div><h2>On site, hour by hour.</h2><Day d={d.day} /></div><Accordion items={d.faq} /></div></section>
    <Consult tone="beige" title={`Talk to us about ${x.name.toLowerCase()}.`} text="A short call is enough to understand your site and what is in the way." cta="Talk to us" />
  </>);
}
