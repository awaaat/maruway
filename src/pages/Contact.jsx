import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Words } from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import Icon from '../components/Icon';
import { CONTACT_DEEP } from '../data/deep';
import { SITE } from '../config/site';

// Contact: a help-centre layout. Topic tiles on top, form beside four ways to reach us, then what happens next.
const TOPICS = [
  ['Something is down', 'Faults and outages. We pick up first.', { urgency: 'now' }],
  ['A quotation', 'Cabling, networks and new builds.', { service: 'network-infrastructure' }],
  ['Cameras and access', 'CCTV, doors and keys.', { service: 'cctv-access-control' }],
  ['Support plan', 'Managed IT for your office.', { service: 'managed-it' }],
  ['Data and dashboards', 'Reports and analytics.', { service: 'data-analytics' }],
  ['Solar and backup', 'Panels, inverters and batteries.', { service: 'solar-installation' }],
  ['Sound for a space', 'Public address and audio.', { service: 'public-address-audio' }],
  ['Something else', 'Tell us in your own words.', {}],
];

export default function Contact() {
  const [params, setParams] = useSearchParams();
  const wa = SITE.whatsapp && `https://wa.me/${SITE.whatsapp}`;
  const key = params.toString();
  const match = TOPICS.findIndex(([, , q]) => Object.keys(q).length && Object.entries(q).every(([k, v]) => params.get(k) === v));
  const cur = match === -1 ? TOPICS.length - 1 : match;
  return (
    <>
      <Seo title="Contact" path="/contact" description={`Call ${SITE.phone.display} or send a request to Maruway Networks in Nairobi.`} />
      <section className="ctx-top"><div className="wrap">
        <small>Contact us</small>
        <Words text="How can we help?" />
        <p className="ctx-lead">Pick the closest topic and the form below opens already filled in.</p>
        <label className="ctx-pick"><span>I need help with</span><select value={cur} onChange={(e) => setParams(TOPICS[e.target.value][2], { replace: true })}>{TOPICS.map(([l], i) => <option key={l} value={i}>{l}</option>)}</select></label>
      </div></section>
      <section className="ctx-body"><div className="wrap ctx-g">
        <div className="ctx-form" key={key}>
          <div className="ctx-form__h"><h2>Send us a request</h2><p>A named person replies the same working day. For anything urgent, call the support desk.</p></div>
          <ContactForm />
        </div>
        <aside className="ctx-side">
          <a className="ctx-card ctx-card--call" href={`tel:${SITE.phone.tel}`}><Icon name="phone" size={22} /><small>Support desk</small><b>{SITE.phone.display}</b><span>{SITE.hours}</span></a>
          {wa && <a className="ctx-card" href={wa} target="_blank" rel="noopener noreferrer"><Icon name="chat" size={22} /><small>WhatsApp</small><b>Message an engineer</b></a>}
          <a className="ctx-card" href={`mailto:${SITE.email}`}><Icon name="mail" size={22} /><small>Email</small><b>{SITE.email}</b></a>
          <div className="ctx-card ctx-card--visit"><Icon name="pin" size={22} /><small>Visit</small><b>{SITE.address.street}</b><span>{SITE.address.postalBox}, {SITE.address.city}</span></div>
        </aside>
      </div></section>
      <section className="ctx-next"><div className="wrap ctx-next__g">
        <div><h2>What happens next</h2><ol>{CONTACT_DEEP.next.map(([t, d], n) => <li key={t}><i>{n + 1}</i><b>{t}</b><span>{d}</span></li>)}</ol></div>
        <div><h2>Helpful to mention</h2><ul>{CONTACT_DEEP.bring.map((t) => <li key={t}><Icon name="check" size={16} stroke={2.2} />{t}</li>)}</ul></div>
        <div className="map"><iframe title="Map of Maruway Networks" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`} /></div>
      </div></section>
    </>
  );
}
