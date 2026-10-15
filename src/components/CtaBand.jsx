import { Link } from 'react-router-dom';
import FibreCanvas from './FibreCanvas';
import Reveal from './Reveal';
import Icon from './Icon';
import { SITE } from '../config/site';

export default function CtaBand({ title = 'Tell us what is down. We will take it from there.', text = 'Call the support desk, message us on WhatsApp, or send a request and we will reply the same working day.' }) {
  return (
    <section className="cta">
      <FibreCanvas hue="cool" density={0.8} />
      <Reveal className="wrap">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="hero__cta" style={{ marginTop: 0 }}>
          <a className="btn btn--primary" href={`tel:${SITE.phone.tel}`}><Icon name="phone" size={16} /> {SITE.phone.display}</a>
          <Link className="btn btn--line" to="/contact">Send a request <Icon name="arrow" size={16} /></Link>
        </div>
      </Reveal>
    </section>
  );
}
