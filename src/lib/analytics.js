import { GA_ID } from '../config/site';

const KEY = 'maruway-consent';
export const getConsent = () => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};
export const setConsent = (v) => {
  try { localStorage.setItem(KEY, v); } catch { /* storage blocked */ }
  if (v === 'granted') loadAnalytics();
};

let loaded = false;
export function loadAnalytics() {
  if (loaded || !GA_ID || typeof document === 'undefined') return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export const pageview = (path, title) => window.gtag?.('event', 'page_view', { page_path: path, page_title: title });
// Names follow GA4 recommended events where one exists.
export const track = (name, params = {}) => window.gtag?.('event', name, params);
