import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import Icon from '../components/Icon';

export default function NotFound() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  return (
    <>
      <Seo title="Page not found" path="/404" />
      <section className="lg-404"><div className="wrap lg-404__g">
        <svg viewBox="0 0 520 200" aria-hidden="true">
          <path d="M0 120h190c24 0 28-40 52-40" /><path d="M520 120H330c-24 0-28 40-52 40" />
          <g className="lg-404__sp"><path d="M246 84l12 18-14 2 12 20" /></g>
          <circle cx="190" cy="120" r="7" /><circle cx="330" cy="120" r="7" />
          <text x="260" y="196" textAnchor="middle">404</text>
        </svg>
        <div>
          <small>Signal lost</small>
          <h1>This link has gone dark.</h1>
          <p>The page you asked for does not exist or has moved. Search the site or head back.</p>
          <form onSubmit={(e) => { e.preventDefault(); nav(`/sitemap?q=${encodeURIComponent(q)}`); }}><Icon name="search" size={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for a page" aria-label="Search for a page" /><button type="submit">Search</button></form>
          <div><Link to="/">Back home <Icon name="arrow" size={14} /></Link><Link to="/services">Services</Link><Link to="/contact">Contact us</Link></div>
        </div>
      </div></section>
    </>
  );
}
