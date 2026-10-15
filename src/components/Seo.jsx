import { useEffect } from 'react';
import { SITE } from '../config/site';

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
}

// Per-page title, description, canonical, social tags and optional JSON-LD.
export default function Seo({ title, description = SITE.description, path = '/', jsonLd }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE.name}` : `${SITE.name} | Managed IT, networks and security in Nairobi`;
    const url = SITE.url + path;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${SITE.url}/og-image.jpg`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;

    let script = document.getElementById('page-jsonld');
    if (jsonLd) {
      if (!script) { script = document.createElement('script'); script.id = 'page-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) script.remove();
  }, [title, description, path, jsonLd]);
  return null;
}
