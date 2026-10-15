import Seo from '../components/Seo';
import Reveal, { Words } from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Crumbs, Jump, TabsPanel, FaqTabs, Consult } from '../components/Blocks';
import { ROLES } from '../data/content';
import { CAREERS_DEEP } from '../data/deep';
import { CAREER_FAQ } from '../data/kyn';
import { SITE } from '../config/site';
import { CareersHero } from '../components/Heroes';

export default function Careers() {
  const tabs = [
    { t: 'In the field', h: CAREERS_DEEP.rows[0].h, p: CAREERS_DEEP.rows[0].p, pts: ['Cabling, racks and cameras', 'Radio links and chambers', 'A report at the end of every visit'], photo: 'manhole-maintenance' },
    { t: 'On the desk', h: CAREERS_DEEP.rows[1].h, p: CAREERS_DEEP.rows[1].p, pts: ['Answer and log faults', 'Diagnose remotely', 'Send the right engineer'], art: 'hero-support' },
    { t: 'In the data', h: CAREERS_DEEP.rows[2].h, p: CAREERS_DEEP.rows[2].p, pts: ['Dashboards and reports', 'IoT sensors and gateways', 'Clean, honest numbers'], art: 'analytics-dashboard' },
  ];
  return (
    <>
      <Seo title="Careers" path="/careers" description="Join Maruway Networks: field engineers, support desk, network engineers and data teams in Nairobi." />
      <CareersHero />
      <Jump items={[['Pick your day', 'day'], ['What we look for', 'look'], ['How hiring works', 'hire'], ['Questions', 'faq']]} />
      <section id="day" className="section"><div className="wrap"><Reveal className="sec-head"><h2>Pick the kind of day you want.</h2></Reveal><TabsPanel tabs={tabs} /></div></section>
      <section className="section section--dark"><div className="wrap"><Reveal className="sec-head"><h2>Where you could fit.</h2></Reveal>
        <div className="cr-roles">{ROLES.map(([t, d]) => <Reveal key={t}><h3>{t}</h3><p>{d}</p></Reveal>)}</div></div></section>
      <section id="look" className="section"><div className="wrap kb-two"><Reveal><h2>Habits matter more than certificates.</h2></Reveal><Reveal><ul className="kb-checks" style={{ marginTop: 0 }}>{CAREERS_DEEP.skills.map((t) => <li key={t}><Icon name="check" size={18} stroke={2.2} /><span style={{ fontSize: '1.15rem' }}>{t}</span></li>)}</ul></Reveal></div></section>
      <section id="hire" className="section section--alt"><div className="wrap"><Reveal className="sec-head"><h2>Four steps, no surprises.</h2></Reveal>
        <ol className="kb-steps">{CAREERS_DEEP.steps.map(([t, d]) => <Reveal as="li" key={t}><b>{t}</b><span>{d}</span></Reveal>)}</ol></div></section>
      <section id="faq" className="section"><div className="wrap"><FaqTabs groups={CAREER_FAQ} /></div></section>
      <Consult tone="dark" title="Ready to start the conversation?" text="Send your CV and a few lines about the work you want to do." to={`mailto:${SITE.email}?subject=Open%20application`} cta="Email us" />
    </>
  );
}
