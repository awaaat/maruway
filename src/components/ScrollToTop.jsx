import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '../lib/analytics';

// Resets scroll on navigation (or jumps to #hash) and reports the page view.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
    pageview(pathname, document.title);
  }, [pathname, hash]);
  return null;
}
