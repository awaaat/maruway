import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ServiceIndex } from '../components/Heroes';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Jump, Consult, Crumbs } from '../components/Blocks';
import { SERVICES, getService } from '../data/services';
import { SERVICE_DEEP, PICKER } from '../data/deep';

export default function Services() {
  const [on, setOn] = useState(0);
  const [pick, setPick] = useState(null);
  const rec = pick !== null ? getService(PICKER[pick][1]) : null;
  return (
    <>
      <Seo title="Technology services" path="/services" description="Managed IT, networks, CCTV, telecom and IoT, analytics, public address and solar from Maruway Networks." />
      <div id="all"><ServiceIndex items={SERVICES} art={(x) => SERVICE_DEEP[x.slug].art} /></div>
      <Jump items={[['The seven services', 'all'], ['Find your match', 'pick'], ['How the work runs', 'run']]} />
      <section id="pick" className="section section--alt"><div className="wrap">
        <Reveal className="sec-head"><h2>Choose the sentence that sounds like your week.</h2></Reveal>
        <div className="pick">
          <ul>{PICKER.map(([t], i) => <li key={t}><button type="button" className={pick === i ? 'is-on' : ''} onClick={() => setPick(i)}>{t}</button></li>)}</ul>
          <div className="pick__r" aria-live="polite">
            {rec ? (<div key={rec.slug}><Picture folder="art" name={SERVICE_DEEP[rec.slug].art} alt="" width={800} height={600} /><small>We would start with</small><h3>{rec.title}</h3><p>{rec.short}</p><Link className="kbtn kbtn--solid" to={`/services/${rec.slug}`}>See how it works <Icon name="arrow" size={16} /></Link></div>) : <p className="pick__e">Your match appears here.</p>}
          </div>
        </div>
      </div></section>
      <section id="run" className="section"><div className="wrap">
        <Reveal className="sec-head"><h2>The same five steps, whatever the service.</h2></Reveal>
        <ol className="kb-steps">{[['Survey', 'We visit and measure.'], ['Scope', 'You get it in writing.'], ['Install', 'Labelled and tested.'], ['Hand over', 'Drawings and results.'], ['Support', 'A number to call.']].map(([t, d]) => (<Reveal as="li" key={t}><b>{t}</b><span>{d}</span></Reveal>))}</ol>
      </div></section>
      <Consult tone="orange" title="Not sure which service you need?" text="Tell us what has stopped or what you want built. We will point you the right way." cta="Talk to an engineer" />
    </>
  );
}
