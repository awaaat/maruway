import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Consult, GiantWord } from '../components/Blocks';
import { INDUSTRIES } from '../data/content';
import { INDUSTRY_DEEP } from '../data/deep';
import { INDUSTRY_COL } from '../data/kyn';
import { IndustryPanels } from '../components/Heroes';

export default function Industries() {
  const [i, setI] = useState(0); const x = INDUSTRIES[i];
  return (
    <>
      <Seo title="Industries" path="/industries" description="IT, network and security services shaped around education, telecom, public sector, offices, retail and healthcare." />
      <IndustryPanels items={INDUSTRIES} colours={INDUSTRY_COL} />
      <GiantWord word="a day on site" small="What normal looks like" tone="beige">
        <div className="ind-day">
          <div role="tablist">{INDUSTRIES.map((n, k) => <button key={n.slug} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} style={{ '--c': INDUSTRY_COL[n.slug] }} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>{n.name}</button>)}</div>
          <div className="ind-day__p" key={x.slug} style={{ '--c': INDUSTRY_COL[x.slug] }}>
            <h3>{x.challenge}</h3>
            <ol className="daytl">{INDUSTRY_DEEP[x.slug].day.map((t) => { const [h, ...r] = t.split('  '); return <li key={t}><b>{h}</b><span>{r.join(' ')}</span></li>; })}</ol>
            <Link className="tlink" to={`/industries/${x.slug}`}>See {x.name.toLowerCase()} solutions <Icon name="arrow" size={14} /></Link>
          </div>
        </div>
      </GiantWord>
      <Consult tone="teal" title="Do not see your sector?" text="Tell us what you run. The same disciplines apply almost anywhere there are people, rooms and equipment." />
    </>
  );
}
