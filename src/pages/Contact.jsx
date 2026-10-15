import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Words } from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import Icon from '../components/Icon';
import { CONTACT_DEEP } from '../data/deep';
import { SITE } from '../config/site';

// Contact: a help-centre layout. Topic chips on top, form beside four ways to reach us, then what happens next.
const TOPICS = [['Something is down', { urgency: 'now' }], ['A quotation', { service: 'network-infrastructure' }], ['Cameras and access', { service: 'cctv-access-control' }], ['Support plan', { service: 'managed-it' }], ['Data and dashboards', { service: 'data-analytics' }], ['Solar and backup', { service: 'solar-installation' }], ['Sound for a space', { service: 'public-address-audio' }], ['Something else', {}]];

export default function Contact() {
  const [params, setParams] = useSearchParams();
  const wa = SITE.whatsapp && `https://wa.me/${SITE.whatsapp}`;
  const key = params.toString();
  return (
    <>
      <Seo title="Contact" path="/contact" description={`Call ${SITE.phone.display} or send a request to Maruway Networks in Nairobi.`} />
      <section className="ctx-top"><div className="wrap">
        <small>Contact us</small>
        <Words text="How can we help?" />
        <div className="ctx-chips" role="group" aria-label="Choose a topic">{TOPICS.map(([l, q]) => {
          const on = Object.entries(q).length ? Object.entries(q).every(([k, v]) => params.get(k) === v) : !params.get('urgency') && !params.get('service');
          return <button type="button" key={l} className={on ? 'is-on' : ''} onClick={() => setParams(q, { replace: true })}>{l}</button>;
        })}</div>
      </div></section>
      <section className="ctx-body"><div className="wrap ctx-g">
        <div className="ctx-form" key={key}><ContactForm /></div>
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
