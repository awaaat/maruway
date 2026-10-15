import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import ResponseRing from '../components/ResponseRing';
import { Jump, GiantWord, FaqTabs, Consult } from '../components/Blocks';
import { SUPPORT_TIERS } from '../data/content';
import { SUPPORT_DEEP } from '../data/deep';
import { SUPPORT_FAQ } from '../data/kyn';
import { SITE } from '../config/site';
import { SupportHero } from '../components/Heroes';

const ROWS = [['Helpdesk by phone and email', [1, 1, 1]], ['Remote diagnosis', [1, 1, 1]], ['Scheduled maintenance visit', ['Quarterly', 'Monthly', 'Monthly']], ['Target on-site response of 60 minutes', [0, 1, 1]], ['24/7 support desk', [0, 0, 1]], ['Proactive monitoring and reviews', [0, 0, 1]], ['Written visit report', [1, 1, 1]]];

export default function Support() {
  return (
    <>
      <Seo title="Support plans" path="/support" description="Support plans from business-hours helpdesk to 24/7 cover, with a target on-site response of 60 minutes." />
      <SupportHero />
      <Jump items={[['Plans', 'plans'], ['Response', 'resp'], ['What is covered', 'cov'], ['Questions', 'faq']]} />
      <section id="plans" className="section"><div className="wrap">
        <Reveal className="sec-head"><h2>Compare the three levels of cover.</h2></Reveal>
        <div style={{ overflowX: 'auto' }}><table className="kb-plan"><thead><tr><th /> {SUPPORT_TIERS.map(([t, d], n) => <th key={t} className={n === 1 ? 'is-hot' : ''}>{t}<small>{d}</small></th>)}</tr></thead>
          <tbody>{ROWS.map(([r, v]) => <tr key={r}><th scope="row">{r}</th>{v.map((c, n) => <td key={n} className={c === 0 ? 'is-no' : ''}>{c === 1 ? <Icon name="check" size={20} stroke={2.2} /> : c === 0 ? 'Not included' : c}</td>)}</tr>)}</tbody></table></div>
        <p className="dim" style={{ marginTop: 20 }}>VERIFY plan names, hours and response terms with management before publishing.</p>
      </div></section>
      <GiantWord id="resp" word="sixty minutes" small="Response target" tone="dark">
        <div className="kb-two"><Reveal className="resp-ring"><ResponseRing /></Reveal><Reveal><p style={{ color: '#b6c1d9', fontSize: '1.25rem' }}>The desk diagnoses remotely where it can and dispatches an engineer where it cannot. Every visit ends with a written report.</p>
          <ol className="kb-steps kb-steps--dark" style={{ marginTop: 28 }}>{SUPPORT_DEEP.levels.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ol></Reveal></div>
      </GiantWord>
      <section id="cov" className="section"><div className="wrap"><Reveal className="sec-head"><h2>Everything we install, we can support.</h2></Reveal>
        <div className="kb-two2">{SUPPORT_DEEP.covered.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
      <section id="faq" className="section section--alt"><div className="wrap"><FaqTabs groups={SUPPORT_FAQ} /></div></section>
      <Consult tone="orange" title="Something down right now?" text={`Call ${SITE.phone.display}. A named person answers.`} to={`tel:${SITE.phone.tel}`} cta="Call the desk" />
    </>
  );
}
