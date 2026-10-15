import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal, { Words } from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import Stats from '../components/Counter';
import { Crumbs, Jump, GiantWord, OrangeSplit, HScroll, FaqTabs, Consult } from '../components/Blocks';
import { TEAM } from '../data/team';
import { VALUES, TIMELINE } from '../data/content';
import { ABOUT_DEEP } from '../data/deep';
import { ABOUT_FAQ } from '../data/kyn';
import { SITE } from '../config/site';
import { AboutHero } from '../components/Heroes';

export default function About() {
  return (
    <>
      <Seo title="About" path="/about" description="Maruway Networks: Nairobi engineers delivering managed IT, networks, security, telecom and data services." />
      <AboutHero />
      <Jump items={[['Who we are', 'who'], ['How we work', 'how'], ['Our story', 'story'], ['Our team', 'team']]} />
      <GiantWord id="who" word="who we are" small="About Maruway" tone="light">
        <div className="kb-two"><Reveal><h2>A small team that shows up.</h2><p>We are engineers first. We survey the site, install to a standard, document the result and stay on call afterwards.</p><p>Our promise is simple: say what will happen, do it, and write down what was done.</p></Reveal><Reveal><Picture folder="projects" name="server-room-maintenance" alt="Maruway engineers maintaining a server room" width={900} height={675} /></Reveal></div>
      </GiantWord>
      <OrangeSplit id="how" tone="orange" k="How we work" h="Before, during and after every job." p="We survey first and quote second. We install to a standard, labelled and tested. Then we write down what was done and stay on the phone." photo="manhole-maintenance" to="/services" cta="See our services" />
      <section className="section section--dark"><div className="wrap"><Reveal className="sec-head"><h2>Since {SITE.founded}.</h2></Reveal><Reveal><Stats /></Reveal></div></section>
      <section className="section"><div className="wrap"><Reveal className="sec-head"><h2>Five steps, the same every time.</h2></Reveal>
        <ol className="kb-steps">{ABOUT_DEEP.steps.map(([t, d]) => (<Reveal as="li" key={t}><b>{t}</b><span>{d}</span></Reveal>))}</ol></div></section>
      <section id="story" className="section section--alt"><div className="wrap kb-sticky">
        <div className="kb-sticky__l"><Picture folder="art" name="hero-about" alt="" width={1000} height={700} /></div>
        <div className="kb-sticky__r">{TIMELINE.map(([y, t, d]) => <Reveal key={y}><small>{y}</small><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
      </div></section>
      <section className="section"><div className="wrap"><Reveal className="sec-head"><h2>What we hold ourselves to.</h2></Reveal>
        <div className="vals">{VALUES.map(([t, d]) => (<Reveal key={t}><h3>{t}</h3><p>{d}</p></Reveal>))}</div></div></section>
      <GiantWord id="team" word="the people on the call" small="Leadership and team" tone="dark">
        <HScroll label="Team">{TEAM.map((p) => <div key={p.name} className="kb-card kb-card--p"><div className="kb-card__m"><Picture folder="team" name={p.image} alt={p.name} width={480} height={480} /></div><div className="kb-card__b"><h3>{p.name}</h3><small>{p.role}</small>{p.bio && <p>{p.bio}</p>}</div></div>)}</HScroll>
      </GiantWord>
      <section className="section"><div className="wrap"><FaqTabs groups={ABOUT_FAQ} /></div></section>
      <Consult tone="dark" title="Let us look at your site." text="A short call is enough to start." art="hero-support" />
    </>
  );
}
