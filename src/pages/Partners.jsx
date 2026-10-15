import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import { Banner, Jump, GiantWord, LogoModal, OrangeSplit, FaqTabs, Consult } from '../components/Blocks';
import { TECH, ORGS, PARTNER_FAQ } from '../data/kyn';
import { VENDOR_RULES } from '../data/deep';
import { PartnersHero } from '../components/Heroes';

export default function Partners() {
  return (
    <>
      <Seo title="Partners" path="/partners" description="Technology partners and organisations Maruway Networks works with." />
      <PartnersHero items={[...TECH, ...ORGS]} />
      <Jump items={[['Technology partners', 'tech'], ['How we choose', 'rules'], ['Organisations', 'orgs'], ['Questions', 'faq']]} />
      <GiantWord id="tech" word="our technology partners" small="Equipment we deploy and support" tone="light"><LogoModal items={TECH} /></GiantWord>
      <OrangeSplit id="rules" tone="navy" flip k="How we choose" h="Four rules for every vendor." p="Supportable after we leave. Proven on our sites. Fairly priced. Documented at handover." photo="safety-signage" />
      <section className="section section--alt"><div className="wrap"><div className="vals">{VENDOR_RULES.map(([t, d]) => (<Reveal key={t}><h3>{t}</h3><p>{d}</p></Reveal>))}</div></div></section>
      <section id="orgs" className="par-orgs"><div className="wrap">
        <Reveal><small>Organisations we have worked with</small><h2>Trusted across telecom, health and public programmes.</h2><p>Logos shown with permission. VERIFY each one before publishing. Select a logo to read more.</p></Reveal>
        <LogoModal items={ORGS} />
      </div></section>
      <section className="trust" style={{ padding: '34px 0' }}><div className="wrap"><span className="trust__l">Worked with</span><Marquee items={ORGS} label="Organisations" /></div></section>
      <section id="faq" className="section"><div className="wrap"><FaqTabs groups={PARTNER_FAQ} /></div></section>
      <Consult tone="orange" title="Want to partner with Maruway?" text="Tell us what you make or what you need, and we will reply the same working day." cta="Get in touch" />
    </>
  );
}
