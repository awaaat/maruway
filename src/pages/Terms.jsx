import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE } from '../config/site';

// Draft wording. Have it reviewed by a lawyer before publishing.
const CLAUSES = [
  ['Using this site', `The information on this site describes the services of ${SITE.legalName}. It is general and does not form a contract. Quotations and agreements are written separately.`],
  ['Accuracy', 'We take care to keep the site correct, but details such as response targets and coverage areas are confirmed in your service agreement.'],
  ['Contact', `Questions about these terms can be sent to ${SITE.email}.`],
];

export default function Terms() {
  return (
    <>
      <Seo title="Terms of use" path="/terms" description="Terms for using the Maruway Networks website." />
      <section className="lg-terms">
        <div className="wrap">
          <nav className="kcrumb is-light"><Link to="/">Home</Link> / <span>Terms</span></nav>
          <small>Legal</small>
          <h1>Terms of use.</h1>
          <p>Draft wording. Have it reviewed by a lawyer before publishing.</p>
          <ol>{CLAUSES.map(([t, d], n) => <li key={t}><b>{String(n + 1).padStart(2, '0')}</b><div><h2>{t}</h2><p>{d}</p></div></li>)}</ol>
        </div>
      </section>
    </>
  );
}
