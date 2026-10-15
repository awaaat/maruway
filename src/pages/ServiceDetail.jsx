import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import Dashboard from '../components/Dashboard';
import Alt from '../components/Alt';
import Accordion from '../components/Accordion';
import { Proof } from '../components/ServiceDeep';
import { Stage } from '../components/Dai';
import { Jump, OrangeSplit, GiantWord, HScroll, FaqTabs, Consult, StatBand, Flip, TabsPanel } from '../components/Blocks';
import { img, keptArt } from '../lib/assets';
import { SERVICES, getService } from '../data/services';
import { SERVICE_DEEP } from '../data/deep';
import { PROJECTS } from '../data/projects';
import NotFound from './NotFound';
import SolarPage from '../components/Solar';
import ManagedPage from '../components/Managed';

const pics = (s) => (s.projects || []).map((p) => PROJECTS.find((x) => x.slug === p)).filter((p) => p && img('projects', p.image));
const Crumb = ({ s, light }) => <nav className={`kcrumb ${light ? 'is-light' : ''}`}><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{s.tag}</span></nav>;
const Ask = ({ s }) => <div className="kact"><Link className="kbtn" to={`/contact?service=${s.slug}`}>Request a quotation <Icon name="arrow" size={16} /></Link><Link className="klink" to="/contact?urgency=now">Get a technician</Link></div>;
const Next = ({ s }) => { const i = SERVICES.findIndex((x) => x.slug === s.slug); const n = SERVICES[(i + 1) % SERVICES.length]; return <Link to={`/services/${n.slug}`} className="knext"><small>Next service</small><b>{n.title}</b><Icon name="arrow" size={28} /></Link>; };
const Fig = ({ photo, art, tall }) => (
  <figure className={`phero__fig svfig ${tall ? 'svfig--tall' : ''}`}>
    {photo && keptArt(art) ? <><div className="phero__main"><Picture folder="projects" name={photo} alt="" width={1000} height={900} eager /></div><div className="phero__art"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div></> : <div className="phero__main phero__main--art"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div>}
  </figure>
);
const Head = ({ k, h, p, dark }) => <Reveal className="sec-head"><small className={`kcap ${dark ? 'kcap--w' : ''}`}>{k}</small><h2>{h}</h2>{p && <p>{p}</p>}</Reveal>;
const GetCards = ({ slug, light }) => <HScroll label="What you receive">{SERVICE_DEEP[slug].get.map(([t, d]) => <div key={t} className={`kb-gc ${light ? 'kb-gc--lt' : ''}`}><Icon name="check" size={20} stroke={2.2} /><h3>{t}</h3><p>{d}</p></div>)}</HScroll>;
const Split = ({ slug }) => { const f = SERVICE_DEEP[slug].faq; return [{ t: 'About the service', items: f.slice(0, 2) }, { t: 'Getting started', items: f.slice(2) }]; };
const Explain = ({ slug, id = 'what', tone = 'light' }) => { const d = SERVICE_DEEP[slug]; return (
  <section id={id} className={`section ${tone === 'alt' ? 'section--alt' : ''}`}><div className="wrap kb-two">
    <Reveal><Picture folder="art" name={d.art} alt="" width={1000} height={700} /></Reveal>
    <Reveal><h2>{d.what.h}</h2>{d.what.p.map((x) => <p key={x}>{x}</p>)}
      <dl className="xp__dl">{d.what.facts.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></Reveal>
  </div></section>); };

/* 1. Managed IT: mixed-visual page. See components/Managed.jsx */
function Run({ s }) { return <ManagedPage s={s} />; }

/* 2. Networks: dark hero, layer tabs, tabbed services, flip, mosaic, process words, beige survey closer */
const LAYERS = [['Core', 'Server rooms, cabinets and the backbone links everything else depends on.', 'Rack layout, patch panels, power and cooling checks.'], ['Distribution', 'Risers, switches and the routes between floors, buildings and sites.', 'Switching and routing configuration, VPNs, documented uplinks.'], ['Access', 'Outlets, wireless access points and the cabling users actually touch.', 'Structured cabling, labelled runs, Wi-Fi survey and tuning.'], ['Edge', 'Outside plant: chambers, ducts and links to remote or temporary sites.', 'Chamber inspection, cable management, radio and fibre works.']];
function Layers({ s }) {
  const [k, setK] = useState(0); const p = pics(s); const d = SERVICE_DEEP[s.slug];
  const tabs = [{ t: 'Our services', h: 'We keep every layer of the network working.', p: 'Six kinds of work, each documented and handed over with test results.', pts: d.get.map((g) => `${g[0]}: ${g[1]}`).slice(0, 4), art: 'network-rack' }, { t: 'The Maruway difference', h: 'Labelled, tested and findable.', p: 'Every run is labelled at both ends and matched to a written schedule, so the next engineer reads instead of guessing.', pts: ['Labels match the schedule', 'Test results kept', 'As-built drawings in the handover pack', 'Spare capacity left on purpose'], photo: 'server-room-maintenance' }, { t: 'Outside plant', h: 'Chambers and ducts that stay dry and traceable.', p: 'Underground work is inspected, tidied and photographed so faults between buildings are found faster.', pts: ['Chamber inspections', 'Cable management', 'Photo records'], photo: 'manhole-maintenance' }];
  return (<>
    <section className="l2"><div className="wrap l2__g"><div><Crumb s={s} light /><h1>Core to edge, <em>built to a standard.</em></h1><p>{s.problem}</p><Ask s={s} /></div><Fig art="network-rack" tall /></div></section>
    <Jump items={[['The layers', 'layers'], ['How we help', 'help'], ['Before and after', 'ba'], ['Questions', 'faq']]} />
    <Explain slug={s.slug} id="layers" />
    <section className="section section--dark"><div className="wrap lay">
      <div className="lay__stack" role="tablist">{LAYERS.map(([t], i) => <button key={t} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} style={{ '--i': i }} onClick={() => setK(i)}>{t}</button>)}</div>
      <div className="lay__body" key={k}><h2>{LAYERS[k][0]}</h2><p style={{ color: '#b4bfd6' }}>{LAYERS[k][1]}</p><p className="lay__do" style={{ color: '#fff' }}><b>What we do</b>{LAYERS[k][2]}</p></div>
    </div></section>
    <section id="help" className="section"><div className="wrap"><Head k="How Maruway helps" h="Take a simple approach to a complex building." /><TabsPanel tabs={tabs} /></div></section>
    {p.length > 0 && <section className="mos"><div className="wrap mos__g">{p.map((x) => <Link key={x.slug} to={`/projects/${x.slug}`}><Picture folder="projects" name={x.image} alt={x.title} width={900} height={600} /><span>{x.title}</span></Link>)}</div></section>}
    <section id="ba" className="section section--alt"><div className="wrap"><Head k="Before and after" h="Same building. Different network." /><Flip a={d.compare.before} b={d.compare.after} /></div></section>
    <StatBand tone="orange" items={[['Labelled', 'every run, both ends'], ['Tested', 'every link, results kept'], ['Documented', 'drawings in the handover'], ['Supported', 'by a number you can call']]} />
    <section id="faq" className="section"><div className="wrap kfaq"><div><h2>Before you ask.</h2></div><Accordion items={d.faq} /></div></section>
    <Consult tone="beige" title="Book a site survey call." text="Thirty minutes to talk through your building, what is there and what you need." to="/contact?service=network-infrastructure" cta="Book the call" art="network-layers" />
    <Next s={s} />
  </>);
}

/* 3. CCTV: full-bleed hotspots, navy split, checklist, field proof, orange closer */
const SPOTS = [[24, 38, 'Entrance', 'Camera height and angle set to avoid glare, with infrared range checked at night.'], [58, 30, 'Recorder room', 'Storage sized for your retention period, with disks and fans checked each visit.'], [74, 66, 'Access door', 'Door controller, reader and lock tested together, not separately.']];
const CHECK = ['Camera views cleaned and re-aimed', 'Recorder health and storage checked', 'Cables and connectors inspected', 'Door controllers tested', 'Visit report issued'];
function Watch({ s }) {
  const [k, setK] = useState(0); const d = SERVICE_DEEP[s.slug];
  return (<>
    <section className="l3"><Picture folder="projects" name="cctv-maintenance-checks" alt="" width={1800} height={1000} eager /><div className="l3__veil" />
      {SPOTS.map(([x, y, t], i) => <button key={t} className={`hot ${k === i ? 'is-on' : ''}`} style={{ left: `${x}%`, top: `${y}%` }} onClick={() => setK(i)} aria-label={t}><i /></button>)}
      <div className="wrap l3__t"><Crumb s={s} light /><h1>{s.title}</h1><div className="l3__note" key={k}><b>{SPOTS[k][2]}</b><p>{SPOTS[k][3]}</p></div></div></section>
    <Jump items={[['Cameras and doors', 'what'], ['A maintenance visit', 'visit'], ['In the field', 'field'], ['Questions', 'faq']]} />
    <OrangeSplit id="what" tone="navy" flip k={d.what.k} h={d.what.h} p={d.what.p[0]} art="cctv-plan" />
    <section className="section"><div className="wrap"><Alt rows={d.benefits.slice(0, 3)} /></div></section>
    <section id="visit" className="section section--alt"><div className="wrap l3__g"><div><h2>{s.problem}</h2><Ask s={s} /></div>
      <ul className="chk">{CHECK.map((c, i) => <li key={c} style={{ '--d': `${i * 120}ms` }}><Icon name="check" size={16} />{c}</li>)}<li className="chk__t">What a maintenance visit covers</li></ul></div></section>
    <div id="field"><Proof s={s} /></div>
    <section className="section section--dark"><div className="wrap"><Head dark k="What you receive" h="Six things in your hands." /><div className="kb-two2" style={{ color: '#fff' }}>{d.get.map(([t, p]) => <div key={t} style={{ borderColor: 'rgba(255,255,255,.2)' }}><h3>{t}</h3><p style={{ color: '#a6b2cc' }}>{p}</p></div>)}</div></div></section>
    <section id="faq" className="section"><div className="wrap"><FaqTabs groups={Split({ slug: s.slug })} /></div></section>
    <Consult tone="orange" title="Walk the site with us." text="We look at your doors, rooms and blind spots, then give you a coverage plan in writing." to="/contact?service=cctv-access-control" cta="Book a site walk" />
    <Next s={s} />
  </>);
}

/* 4. Telecom/IoT: art hero with journey, sticky story, teal split, field proof, teal closer */
const JOURNEY = [['Survey', 'Confirm the path, access and power before any equipment is mounted.'], ['Install', 'Rigid mounts, grounded equipment and weatherproofed connectors.'], ['Align', 'Alignment using signal readings, not guesswork.'], ['Test', 'Link results recorded against the target.'], ['Hand over', 'Documentation and a maintenance plan so the site stays online.']];
function Site({ s }) {
  const d = SERVICE_DEEP[s.slug];
  return (<>
    <section className="l4"><div className="wrap l4__g"><div className="l4__pic"><Picture folder="art" name="iot-sensors" alt="" width={900} height={900} eager /></div>
      <div><Crumb s={s} /><h1>{s.title}</h1><p className="l4__lede">{s.problem}</p>
        <ol className="jr">{JOURNEY.map(([t, x]) => <Reveal as="li" key={t}><i /><div><h3>{t}</h3><p>{x}</p></div></Reveal>)}</ol><Ask s={s} /></div></div></section>
    <Jump items={[['What it is', 'what'], ['Why it works', 'why'], ['IoT', 'iot'], ['Questions', 'faq']]} />
    <Explain slug={s.slug} tone="alt" />
    <section id="why" className="section"><div className="wrap kb-sticky">
      <div className="kb-sticky__l"><Picture folder="art" name="telecom-link" alt="" width={900} height={700} /></div>
      <div className="kb-sticky__r">{d.benefits.map((b) => <Reveal key={b.h}><small>{b.k}</small><h3>{b.h}</h3><p>{b.p}</p></Reveal>)}</div>
    </div></section>
    <OrangeSplit id="iot" tone="teal" k="IoT" h="Sensors that report to one place." p="Temperature, power, door and water sensors send readings to a gateway and on to a screen, so remote sites tell you about problems before users do." art="iot-sensors" flip to="/services/data-analytics" cta="See the dashboards" />
    <Proof s={s} />
    <section id="faq" className="section section--dark"><div className="wrap kfaq"><div><h2>Remote site, answered.</h2></div><Accordion items={d.faq} /></div></section>
    <Consult tone="teal" title="Tell us where the site is." text="A short call is enough to plan the survey, the access and the power." to="/contact?service=telecom-iot" cta="Plan a survey" />
    <Next s={s} />
  </>);
}

/* 5. Analytics: dark hero with a working dashboard, question tabs, pipeline stepper, scorecards. Data and AI look. */
const QS = [['Is the network healthy?', 'Uptime and open faults by site, shown against a clear good, warning and bad range.'], ['Where is time being lost?', 'Response and fix times per ticket type, so slow areas are visible before users complain.'], ['What needs budget next?', 'Device age, warranty dates and capacity trends in one place, ready for planning.']];
const PIPE = [['Collect', 'Pull data from spreadsheets, device logs and forms on a schedule.'], ['Clean', 'Match names and dates, remove duplicates and flag anything odd.'], ['Connect', 'Join it up so one site is the same site in every report.'], ['Show', 'Three numbers per question, with a good, warning and poor range.']];
function Numbers({ s }) {
  const [k, setK] = useState(0); const [st, setSt] = useState(0); const d = SERVICE_DEEP[s.slug];
  return (<div className="dai dsv">
    <section className="dsv__hero"><div className="wrap dsv__hg">
      <div><Crumb s={s} light /><small className="dai-k">Data analytics</small><h1>Three numbers that change what you do.</h1><p>{s.problem}</p>
        <div className="dai-act"><Link className="dbtn dbtn--red" to={`/contact?service=${s.slug}`}>Request a sample <Icon name="arrow" size={16} /></Link><Link className="dbtn dbtn--line" to="/data-ai">Data and AI overview</Link></div></div>
      <div className="dsv__live"><Dashboard /></div>
    </div></section>
    <Jump items={[['What it is', 'what'], ['Three questions', 'q'], ['How it works', 'how'], ['What you receive', 'get'], ['Questions', 'faq']]} />
    <section id="what" className="dsec"><div className="wrap dsv__two">
      <Reveal><Stage art="dai-analytics" chips={[['Report time', '2 days → 0', 'a'], ['Versions of truth', '5 → 1', 'b']]} /></Reveal>
      <Reveal><small className="dai-k">{d.what.k}</small><h2>{d.what.h}</h2>{d.what.p.map((x) => <p key={x}>{x}</p>)}
        <dl className="dsv__dl">{d.what.facts.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></Reveal>
    </div></section>
    <section id="q" className="dsec dsec--oat"><div className="wrap dsv__q">
      <div role="tablist" aria-label="Questions a dashboard answers">{QS.map(([q], i) => <button key={q} type="button" role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => setK(i)}>{q}<Icon name="arrow" size={18} /></button>)}</div>
      <div className="dsv__a" key={k}><span>{['Health', 'Speed', 'Budget'][k]}</span><p>{QS[k][1]}</p></div>
    </div></section>
    <section id="how" className="dsec dsec--navy"><div className="wrap dsv__how">
      <Reveal><small className="dai-k">How it works</small><h2>From files to answers in four steps.</h2>
        <ol className="dsv__steps">{PIPE.map(([t], i) => <li key={t}><button type="button" className={st === i ? 'is-on' : ''} onClick={() => setSt(i)}><span>{i + 1}</span>{t}</button></li>)}</ol>
        <p className="dsv__sp" key={st}>{PIPE[st][1]}</p></Reveal>
      <Reveal><Stage art="dai-cloud" className="dstage--dark" /></Reveal>
    </div></section>
    <section className="dsec"><div className="wrap"><Reveal className="dhead"><small className="dai-k">Before and after</small><h2>Same data. Different Monday morning.</h2></Reveal><Reveal><Flip a={d.compare.before} b={d.compare.after} /></Reveal></div></section>
    <section id="get" className="dsec dsec--oat"><div className="wrap dsv__two dsv__two--r">
      <Reveal><small className="dai-k">What you receive</small><h2>See which site needs help first.</h2><ul className="kb-checks">{d.get.map(([t, p]) => <li key={t}><Icon name="check" size={18} stroke={2.2} /><span><b>{t}.</b> {p}</span></li>)}</ul></Reveal>
      <Reveal><Stage art="dai-globe" chips={[['Sites ranked', '5', 'a'], ['Worst first', 'Eldoret', 'b']]} /></Reveal>
    </div></section>
    <section id="faq" className="section section--alt"><div className="wrap"><FaqTabs groups={Split({ slug: s.slug })} /></div></section>
    <Consult tone="dark" title="Ask for a sample built from your data." text="Send us one spreadsheet. We will show you what it looks like as a dashboard." to="/contact?service=data-analytics" cta="Request a sample" art="dai-brain" />
    <Next s={s} />
  </div>);
}

/* 6. Public address: zone plan hero, sticky story, tabs, checks, beige closer */
const ZONES = [['Reception', 10, 10, 38, 34], ['Offices', 52, 10, 38, 34], ['Hall', 10, 52, 55, 38], ['Corridor', 69, 52, 21, 38]];
function Zones({ s }) {
  const [on, setOn] = useState([0]); const d = SERVICE_DEEP[s.slug];
  const tog = (i) => setOn((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]));
  const tabs = [{ t: 'Offices and showrooms', h: 'Background audio that does not shout.', p: 'Even coverage at low volume, with paging that reaches the sales floor and not the boardroom.', pts: ['Ceiling speakers on a zoned plan', 'Paging from reception', 'Music and announcements on separate levels'], photo: 'ceiling-speakers' }, { t: 'Schools and halls', h: 'Speech that reaches the back row.', p: 'Hall, classrooms and corridors grouped into zones so a message goes only where it should.', pts: ['Wall and ceiling speakers', 'Microphone input for the hall', 'Emergency override on every zone'], art: 'pa-zones' }, { t: 'Retail', h: 'Different sound for different aisles.', p: 'Tidy installs that match the shop, tested by listening at the busiest spot.', pts: ['Zoned music', 'Paging for staff', 'Neat cable routes'], art: 'pa-coverage' }];
  return (<>
    <section className="l6"><div className="wrap l6__g"><div><Crumb s={s} /><h1>Say it once, in the right place.</h1><p>{s.problem}</p><Ask s={s} /></div>
      <figure className="plan"><svg viewBox="0 0 100 100" role="img" aria-label="Sample building plan with four announcement zones">{ZONES.map(([n, x, y, w, h], i) => <g key={n} onClick={() => tog(i)} className={on.includes(i) ? 'is-on' : ''} tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && tog(i)}><rect x={x} y={y} width={w} height={h} /><text x={x + w / 2} y={y + h / 2}>{n}</text></g>)}</svg>
        <figcaption>Tap zones to choose where the announcement plays. {on.length === 4 ? 'All zones selected.' : `${on.length} of 4 zones selected.`}</figcaption></figure></div></section>
    <Jump items={[['What it is', 'what'], ['By space', 'space'], ['What you receive', 'receive'], ['Questions', 'faq']]} />
    <section id="what" className="section"><div className="wrap kb-sticky">
      <div className="kb-sticky__l"><Picture folder="art" name="pa-coverage" alt="" width={900} height={700} /></div>
      <div className="kb-sticky__r"><Reveal><small>{d.what.k}</small><h3>{d.what.h}</h3>{d.what.p.map((x) => <p key={x} style={{ marginBottom: 12 }}>{x}</p>)}</Reveal>{d.benefits.slice(0, 2).map((b) => <Reveal key={b.h}><small>{b.k}</small><h3>{b.h}</h3><p>{b.p}</p></Reveal>)}</div>
    </div></section>
    <section id="space" className="section section--alt"><div className="wrap"><Head k="By space" h="Sound planned for where you are." /><TabsPanel tabs={tabs} /></div></section>
    <section id="receive" className="section"><div className="wrap kb-two"><Reveal><h2>Six things in your hands.</h2><ul className="kb-checks">{d.get.map(([t, p]) => <li key={t}><Icon name="check" size={18} stroke={2.2} /><span><b>{t}.</b> {p}</span></li>)}</ul></Reveal><Reveal><Picture folder="projects" name="ceiling-speakers" alt="Ceiling speakers installed by the team" width={900} height={700} /></Reveal></div></section>
    <Proof s={s} />
    <section id="faq" className="section section--dark"><div className="wrap kfaq"><div><h2>Sound, answered.</h2></div><Accordion items={d.faq} /></div></section>
    <Consult tone="beige" title="Let us listen to your space." text="A short visit to hear the room, then a speaker layout drawn for it." to="/contact?service=public-address-audio" cta="Book a listen" />
    <Next s={s} />
  </>);
}

/* 7. Solar: see components/Solar.jsx */
function Sun({ s }) { return <SolarPage s={s} />; }

const LAYOUT = { 'managed-it': Run, 'network-infrastructure': Layers, 'cctv-access-control': Watch, 'telecom-iot': Site, 'data-analytics': Numbers, 'public-address-audio': Zones, 'solar-installation': Sun };

export default function ServiceDetail() {
  const { slug } = useParams(); const s = getService(slug); const L = LAYOUT[slug];
  if (!s || !L) return <NotFound />;
  return (<><Seo title={s.title} path={`/services/${s.slug}`} description={s.short} /><L s={s} /></>);
}
