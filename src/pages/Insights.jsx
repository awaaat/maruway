import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal, { Words } from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Crumbs, Consult } from '../components/Blocks';
import { INSIGHTS } from '../data/content';
import { tagArt } from '../lib/tagArt';
import { Masthead } from '../components/Heroes';

export default function Insights() {
  const tags = ['All', ...new Set(INSIGHTS.map((i) => i.tag))];
  const [t, setT] = useState('All');
  const [lead, ...side] = INSIGHTS;
  const list = INSIGHTS.filter((i) => t === 'All' || i.tag === t);
  return (
    <>
      <Seo title="Insights" path="/insights" description="Short, practical guides on networks, CCTV, managed IT, audio, telecom and data." />
      <Masthead lead={lead} rest={side} art={tagArt(lead.tag)} />
      <section className="section"><div className="wrap">
        <div className="filters">{tags.map((x) => (<button key={x} className={`chip ${t === x ? 'is-on' : ''}`} onClick={() => setT(x)}>{x}</button>))}</div>
        <div className="in-grid">{list.map((a) => (<Reveal key={a.slug}><Link to={`/insights/${a.slug}`} className="in-c"><Picture folder="art" name={tagArt(a.tag)} alt="" width={800} height={520} /><small>{a.tag} · {a.mins} min read</small><h3>{a.title}</h3><p>{a.lead}</p></Link></Reveal>))}</div>
      </div></section>
      <Consult tone="dark" title="Have a question we have not answered?" text="Ask an engineer. The good questions become the next guide." cta="Ask us" />
    </>
  );
}
