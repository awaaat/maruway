import { Link } from 'react-router-dom';
import { SITE } from '../config/site';
import { SERVICES } from '../data/services';
import { img } from '../lib/assets';
import ConnectBand from './Connect';

const ABOUT = [['About us', '/about'], ['Industries', '/industries'], ['Careers', '/careers'], ['Partners', '/partners'], ['Contact us', '/contact'], ['Insights', '/insights'], ['Our work', '/projects'], ['Support plans', '/support']];
const LEGAL = [['Privacy', '/privacy'], ['Terms', '/terms'], ['Accessibility', '/accessibility'], ['Sitemap', '/sitemap']];

export default function Footer() {
  const logo = img('brand', 'logo');
  const socials = Object.entries(SITE.social).filter(([, u]) => u);
  return (
    <footer>
      <ConnectBand />
      <div className="kf">
        <div className="kf__in">
          <div className="kf__top">
            <Link to="/" className="kf__logo" aria-label={`${SITE.name} home`}>{logo && <img src={logo} alt={SITE.name} height="44" style={{ height: 44, width: "auto" }} />}</Link>
            {socials.length > 0 && <div className="kf__follow"><span>Follow Maruway</span><ul>{socials.map(([k, u]) => <li key={k}><a href={u} target="_blank" rel="noopener noreferrer" aria-label={k}>{k[0].toUpperCase()}</a></li>)}</ul></div>}
          </div>
          <div className="kf__groups">
            <div><h2>Services</h2><ul className="kf__two">{SERVICES.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul></div>
            <div><h2>About us</h2><ul className="kf__two">{ABOUT.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>
          </div>
          <div className="kf__legal">
            <ul>{LEGAL.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}<li><a href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a></li><li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li></ul>
            <small>Copyright © {new Date().getFullYear()} {SITE.legalName}. All rights reserved</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
