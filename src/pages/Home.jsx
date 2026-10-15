import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import FibreCanvas from '../components/FibreCanvas';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import Stats from '../components/Counter';
import ResponseRing from '../components/ResponseRing';
import { Jump, OrangeSplit, FaqTabs, Consult } from '../components/Blocks';
import { ABOUT_FAQ } from '../data/kyn';
import { tagArt } from '../lib/tagArt';
import Alt from '../components/Alt';
import { DaiHome } from '../components/Dai';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { HERO_SLIDES, HELP, INDUSTRIES, INSIGHTS } from '../data/content';
import { ORGANISATIONS } from '../data/partners';
import { img } from '../lib/assets';
import { reduced } from '../lib/motion';

const svcImg = (s) => (s.projects || []).find((n) => img('projects', n)) || null;

const heroImg = (s) => img('projects', s.photo) || img('projects', 'radio-receiver-alignment') || img('projects', 'ceiling-speakers');
const DUR = 7000;
const STEPS = [
  ['Tell us', 'Call, WhatsApp or send a request. Say where you are and what has stopped.'],
  ['We diagnose', 'The support desk checks what it can remotely and decides who to send.'],
  ['We attend', 'An engineer is dispatched with a target of being on site within the hour.'],
  ['We fix and report', 'The fault is cleared and you get a short written visit report.'],
];

const SLIDES = [
  { photo: 'kajiado-radio-receiver', palette: 'ocean', shape: 0, kicker: 'Managed IT', h: 'Technology that keeps working, supported on site within the hour.', p: 'Helpdesk, monitoring and field engineers for organisations that cannot afford downtime.', to: '/services/managed-it', cta: 'Explore Managed IT' },
  { photo: 'manhole-maintenance', palette: 'ember', shape: 2.1, kicker: 'Networks', h: 'Networks built to a standard, labelled and tested.', p: 'Structured cabling, fibre, Wi-Fi and outside-plant works, documented so faults are found fast.', to: '/services/network-infrastructure', cta: 'Explore Networks' },
  { photo: 'cctv-maintenance-checks', palette: 'jade', shape: 4.2, kicker: 'Security', h: 'Cameras, access control and public address, properly maintained.', p: 'Installed around how your site is used, and checked on a schedule with a record of every visit.', to: '/services/cctv-access-control', cta: 'Explore Security' },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(reduced());
  const go = useCallback((n) => setI((n + SLIDES.length) % SLIDES.length), []);
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => go(i + 1), DUR);
    return () => clearTimeout(t);
  }, [i, paused, go]);
  return (
    <section className="khero" aria-roledescription="carousel" aria-label="Featured">
      {SLIDES.map((s, n) => (
        <div key={s.kicker} className={`khero__s ${n === i ? 'is-on' : ''}`} aria-hidden={n !== i} data-p={s.palette}>
          {heroImg(s) && <div className="khero__ph" style={{ backgroundImage: `url(${heroImg(s)})` }} />}
          <div className="wrap khero__in">
            <div className="khero__copy">
              <span className="khero__k">{s.kicker}</span>
              {n === 0 ? <h1>{s.h}</h1> : <h2>{s.h}</h2>}
              <p>{s.p}</p>
              <Link className="obtn" to={s.to} tabIndex={n === i ? 0 : -1}>{s.cta}</Link>
            </div>
          </div>
        </div>
      ))}
      <div className="khero__dots" role="tablist" aria-label="Choose slide">
        {SLIDES.map((s, n) => (<button key={s.kicker} role="tab" aria-selected={n === i} aria-label={s.kicker} className={n === i ? 'is-on' : ''} onClick={() => go(n)} />))}
        <button type="button" className="khero__pp" aria-label={paused ? 'Play slides' : 'Pause slides'} onClick={() => setPaused((p) => !p)}><Icon name={paused ? 'play' : 'pause'} size={12} /></button>
      </div>
    </section>
  );
}

function Teasers() {
  const items = [
    ['Support plans', 'One number to call. A technician within the hour.', '/support'],
    ['Field story', 'Routine maintenance that finds faults before users do.', '/projects/server-room-maintenance'],
    ['Insight', 'What a good structured cabling job looks like.', '/insights/good-structured-cabling'],
  ];
  return (
    <section className="teasers"><div className="wrap teasers__g">
      {items.map(([k, t, to]) => (<Link key={k} to={to} className="teaser"><small>{k}</small><h3>{t}</h3><span className="teaser__a"><Icon name="arrow" size={16} /></span></Link>))}
    </div></section>
  );
}

function Trust() {
  const loop = [...ORGANISATIONS, ...ORGANISATIONS];
  return (
    <div className="trust"><div className="wrap">
      <span className="trust__l">Worked with</span>
      <div className="marq"><ul className="marq__track">{loop.map((p, n) => (<li key={p.name + n} aria-hidden={n >= ORGANISATIONS.length || undefined}><Picture folder="partners" name={p.image} alt={n >= ORGANISATIONS.length ? '' : p.name} width={120} height={44} label={p.name} /></li>))}</ul></div>
    </div></div>
  );
}

function HelpTabs() {
  const [i, setI] = useState(0);
  const h = HELP[i];
  return (
    <div className="help">
      <div className="help__tabs" role="tablist">
        {HELP.map((x, n) => (<button key={x.k} role="tab" aria-selected={n === i} className={`help__tab ${n === i ? 'is-on' : ''}`} onClick={() => setI(n)} onMouseEnter={() => setI(n)}><b>{x.k}</b></button>))}
      </div>
      <div className="help__panel" key={i} role="tabpanel">
        <div className="help__copy">
          <h3>{h.t}</h3><p>{h.d}</p>
          <ul>{h.pts.map((p) => (<li key={p}><Icon name="check" size={16} stroke={2} />{p}</li>))}</ul>
          <Link className="btn btn--dark" style={{ alignSelf: 'flex-start' }} to={h.to}>Explore <Icon name="arrow" size={16} /></Link>
        </div>
        <div className="help__media"><Picture folder="projects" name={h.img} alt="" width={800} height={900} /></div>
      </div>
    </div>
  );
}

function Stories() {
  const field = PROJECTS.filter((p) => img('projects', p.image));
  const [lead, ...rest] = field;
  return (
    <section className="section section--warm">
      <div className="wrap">
        <Reveal className="sec-head sec-head--row"><div><h2>Progress, one site at a time.</h2></div><Link className="obtn obtn--dark" to="/projects">All stories</Link></Reveal>
        <div className="kstories">
          {lead && (
            <Reveal className="kstory kstory--lead">
              <Link to={`/projects/${lead.slug}`}>
                <div className="kstory__m"><Picture folder="projects" name={lead.image} alt={`${lead.title}, ${lead.place}`} width={1200} height={800} /></div>
                <div className="kstory__b"><small>Featured · {lead.place}</small><h3>{lead.title}</h3><p>{lead.summary}</p><span className="tlink">Read the story <Icon name="arrow" size={14} /></span></div>
              </Link>
            </Reveal>
          )}
          {rest.slice(0, 4).map((p, n) => (
            <Reveal key={p.slug} className="kstory" delay={n * 70}>
              <Link to={`/projects/${p.slug}`}>
                <div className="kstory__m"><Picture folder="projects" name={p.image} alt={`${p.title}, ${p.place}`} width={640} height={420} /></div>
                <div className="kstory__b"><small>{p.place}</small><h3>{p.title}</h3></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryExplorer() {
  const [i, setI] = useState(0);
  const x = INDUSTRIES[i];
  return (
    <div className="ind">
      <div className="ind__list" role="tablist">
        {INDUSTRIES.map((n, k) => (<button key={n.slug} role="tab" aria-selected={k === i} className={`ind__item ${k === i ? 'is-on' : ''}`} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>{n.name}<Icon name="arrow" size={18} /></button>))}
      </div>
      <div className="ind__panel" key={x.slug} role="tabpanel">
        <h3>{x.lead}</h3>
        <ul>{x.points.map((p) => (<li key={p}><Icon name="check" size={16} stroke={2} />{p}</li>))}</ul>
        <div><Link className="btn btn--dark" to={`/industries/${x.slug}`}>See {x.name.toLowerCase()} solutions <Icon name="arrow" size={16} /></Link></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Teasers />
      <Trust />
      <Jump items={[['Who we are', 'who'], ['How we help', 'help'], ['Services', 'services'], ['Stories', 'stories'], ['Questions', 'faq']]} />
      <OrangeSplit id="who" tone="orange" k="Who we are" h="Where steady operations meet a fast response." p="We keep the systems other people depend on running: networks, cameras, power, audio and the data that explains them. A named team, written records and a technician on site within the hour." photo="manhole-maintenance" to="/about" cta="Our story" />

      <section id="help" className="section">
        <div className="wrap">
          <Reveal className="sec-head"><h2>One partner from first cable to round-the-clock support.</h2><p>Four ways we work with you. Hover or tap a tab to see what each one covers.</p></Reveal>
          <Alt rows={HELP.map((x) => ({ k: x.k, h: x.t, p: x.d, img: x.img, art: x.k === 'Insight' ? 'dai-analytics' : undefined, to: x.to, cta: 'Explore', alt: x.t }))} />
        </div>
      </section>

      <section id="services" className="section section--alt">
        <div className="wrap">
          <Reveal className="sec-head sec-head--row"><div><h2>Six disciplines under one roof.</h2></div><Link className="btn btn--ghost" to="/services">All services <Icon name="arrow" size={16} /></Link></Reveal>
          <div className="svc">
            {SERVICES.map((s, n) => (
              <Reveal key={s.slug} delay={n * 60}>
                <Link to={`/services/${s.slug}`} className="svc__c">
                  <span className="arr"><Icon name="arrow" size={18} /></span>
                  <div className="bg">{svcImg(s) ? <Picture folder="projects" name={svcImg(s)} alt="" width={600} height={500} /> : s.slug === 'data-analytics' ? <Picture folder="art" name="dai-analytics" alt="" width={600} height={500} /> : s.slug === 'solar-installation' ? <Picture folder="solar" name="roof" alt="" width={600} height={500} /> : <FibreCanvas density={0.6} hue={n % 2 ? 'cool' : 'warm'} />}</div>
                  <h3>{s.title}</h3><p>{s.short}</p><span className="svc__go">Explore <Icon name="arrow" size={14} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DaiHome />

      <div id="stories"><Stories /></div>

      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head sec-head--row"><div><h2>Built around how your sector works.</h2></div><Link className="btn btn--ghost" to="/industries">All industries <Icon name="arrow" size={16} /></Link></Reveal>
          <Reveal><IndustryExplorer /></Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <Reveal className="sec-head"><h2>One number to call. One team accountable.</h2></Reveal>
          <div className="split" style={{ gap: 60 }}>
            <Reveal className="resp-ring"><ResponseRing /></Reveal>
            <ol className="flow" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px 28px' }}>
              {STEPS.map(([t, d], n) => (<Reveal as="li" key={t} className="flow__i" delay={n * 90}><span className="flow__dot" /><h3>{t}</h3><p>{d}</p></Reveal>))}
            </ol>
          </div>
          <Reveal style={{ marginTop: 80 }}><Stats /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head sec-head--row"><div><h2>Ideas that keep sites running.</h2></div><Link className="btn btn--ghost" to="/insights">All insights <Icon name="arrow" size={16} /></Link></Reveal>
          <div className="cards3">
            {INSIGHTS.slice(0, 3).map((a, n) => (
              <Reveal key={a.slug} delay={n * 80}>
                <Link to={`/insights/${a.slug}`} className="card">
                  <div className="card__m"><Picture folder="art" name={tagArt(a.tag)} alt="" width={800} height={520} /></div>
                  <div className="card__b"><small>{a.tag} · {a.mins} min read</small><h3>{a.title}</h3><p>{a.lead}</p><span className="tlink" style={{ alignSelf: 'flex-start' }}>Read <Icon name="arrow" size={14} /></span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section"><div className="wrap"><FaqTabs groups={ABOUT_FAQ} /></div></section>
      <Consult tone="dark" title="Tell us what is down." text="Call the support desk, message us on WhatsApp, or send a request and we will reply the same working day." to="/contact?urgency=now" cta="Get a technician" art="hero-support" />
    </>
  );
}
