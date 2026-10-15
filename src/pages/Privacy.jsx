import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE } from '../config/site';

// Draft wording. Have it reviewed against the Kenya Data Protection Act before publishing.
const SECTIONS = [
  ['collect', 'What we collect', `Details you send through the contact form or by email: name, organisation, phone, email and message. If analytics is switched on, we also record anonymous page visits, and only after you accept.`],
  ['why', 'Why we collect it', 'To reply to your request, prepare a quotation and provide support.'],
  ['rights', 'Your rights', `You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to ${SITE.email}.`],
];
const SHORT = [['Little', 'Only what you type into a form or email.'], ['For one job', 'To answer you and quote the work.'], ['Yours to ask about', 'See it, fix it or have it deleted.']];

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy" path="/privacy" description="How Maruway Networks handles personal information." />
      <section className="lg-priv"><div className="wrap">
        <nav className="kcrumb"><Link to="/">Home</Link> / <span>Privacy</span></nav>
        <svg viewBox="0 0 80 96" aria-hidden="true"><path d="M40 4 8 18v28c0 22 14 38 32 46 18-8 32-24 32-46V18z" /><path d="m26 48 10 10 20-22" /></svg>
        <h1>Privacy notice.</h1>
        <p>Draft wording. Have it reviewed against the Kenya Data Protection Act before publishing.</p>
        <ul className="lg-priv__s">{SHORT.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul>
      </div></section>
      <section className="lg-body"><div className="wrap lg-priv__g">
        <nav aria-label="On this page"><small>On this page</small>{SECTIONS.map(([id, t]) => <a key={id} href={`#${id}`}>{t}</a>)}</nav>
        <div>{SECTIONS.map(([id, t, d], n) => <article key={id} id={id}><i>{n + 1}</i><h2>{t}</h2><p>{d}</p></article>)}</div>
      </div></section>
    </>
  );
}
