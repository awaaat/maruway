import { useState } from 'react';
import { GA_ID } from '../config/site';
import { getConsent, setConsent, loadAnalytics } from '../lib/analytics';

// Shown only when analytics is configured and no choice has been made yet.
export default function ConsentBanner() {
  const [choice, setChoice] = useState(getConsent());
  if (!GA_ID) return null;
  if (choice === 'granted') loadAnalytics();
  if (choice) return null;
  const pick = (v) => { setConsent(v); setChoice(v); };
  return (
    <div className="consent" role="region" aria-label="Cookie consent">
      <p>We use analytics cookies to see which pages help visitors. Nothing is collected unless you accept.</p>
      <div className="consent__actions">
        <button className="btn btn--ghost" type="button" onClick={() => pick('denied')}>Decline</button>
        <button className="btn btn--primary" type="button" onClick={() => pick('granted')}>Accept analytics</button>
      </div>
    </div>
  );
}
