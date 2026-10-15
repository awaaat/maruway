import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import { Consult } from '../components/Blocks';
import Picture from '../components/Picture';
import { tagArt } from '../lib/tagArt';
import { INSIGHTS } from '../data/content';
import NotFound from './NotFound';

function ReadBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const h = document.documentElement; setP(Math.min(100, (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100)); };
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div className="readbar" style={{ '--p': `${p}%` }} aria-hidden="true" />;
}

export default function Article() {
  const { slug } = useParams();
  const a = INSIGHTS.find((i) => i.slug === slug);
  if (!a) return <NotFound />;
  const more = INSIGHTS.filter((i) => i.slug !== a.slug).slice(0, 3);
  return (
    <>
      <ReadBar />
      <Seo title={a.title} path={`/insights/${a.slug}`} description={a.lead} />
      <PageHero variant="stage" art={tagArt(a.tag)} crumbs={[['Insights', '/insights'], [a.tag]]} tag={a.tag} title={a.title} lede={a.lead}>
        <div className="art-meta"><span>{a.tag}</span><span>{a.mins} min read</span><span>Maruway engineering team</span></div>
      </PageHero>
      <section className="section"><div className="wrap" style={{ maxWidth: 860 }}>
        <div className="prose">
          {a.body.map(([k, v], n) => k === 'h' ? <h2 key={n}>{v}</h2> : k === 'p' ? <p key={n}>{v}</p> : k === 'q' ? <blockquote key={n}>{v}</blockquote> : <ul key={n}>{v.map((x) => <li key={x}>{x}</li>)}</ul>)}
        </div>
      </div></section>
      <section className="section section--alt"><div className="wrap">
        <div className="sec-head"><h2>More insights</h2></div>
        <div className="cards3">{more.map((m, n) => (<Link key={m.slug} to={`/insights/${m.slug}`} className="card"><div className="card__m"><Picture folder="art" name={tagArt(m.tag)} alt="" width={800} height={520} /></div><div className="card__b"><small>{m.tag}</small><h3>{m.title}</h3><span className="tlink" style={{ alignSelf: 'flex-start' }}>Read <Icon name="arrow" size={14} /></span></div></Link>))}</div>
      </div></section>
      <Consult tone="dark" title="Need something like this?" text="Tell us about your site. A short call is enough to start." cta="Talk to us" />
    </>
  );
}
