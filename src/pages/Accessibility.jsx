import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { SITE } from '../config/site';

// Draft wording. Review against the standard you commit to before publishing.
// The controls below change this visit only and are not saved.
export default function Accessibility() {
  const [text, setText] = useState(0);
  const [hi, setHi] = useState(false);
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const r = document.documentElement;
    r.dataset.text = text ? 'lg' : ''; r.dataset.contrast = hi ? 'hi' : ''; r.dataset.motion = calm ? 'off' : '';
    return () => { delete r.dataset.text; delete r.dataset.contrast; delete r.dataset.motion; };
  }, [text, hi, calm]);
  const T = ({ on, set, label, hint }) => <button type="button" role="switch" aria-checked={on} className={`lg-a11y__t ${on ? 'is-on' : ''}`} onClick={() => set(!on)}><span><b>{label}</b><small>{hint}</small></span><i aria-hidden="true" /></button>;
  return (
    <>
      <Seo title="Accessibility" path="/accessibility" description="Accessibility on the Maruway Networks website." />
      <section className="lg-a11y"><div className="wrap lg-a11y__g">
        <div>
          <nav className="kcrumb"><Link to="/">Home</Link> / <span>Accessibility</span></nav>
          <h1>A site everyone can use.</h1>
          <p>Draft wording. Review against the standard you commit to before publishing.</p>
          <h2>What we aim for</h2><p>Clear headings, readable text, keyboard access to menus and forms, and descriptions for images.</p>
          <h2>Tell us about a problem</h2><p>If something on this site is hard to use, write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call {SITE.phone.display} and we will help and fix it.</p>
        </div>
        <aside className="lg-a11y__p" aria-label="Try the display options">
          <small>Try it now</small>
          <T on={!!text} set={(v) => setText(v ? 1 : 0)} label="Larger text" hint="Raises the base size across the site" />
          <T on={hi} set={setHi} label="Higher contrast" hint="Stronger edges between text and background" />
          <T on={calm} set={setCalm} label="Stop motion" hint="Turns off moving photos and animation" />
          <p><Icon name="check" size={14} stroke={2.4} /> These apply to every page until you leave. Your system settings for reduced motion are always respected.</p>
        </aside>
      </div></section>
    </>
  );
}
