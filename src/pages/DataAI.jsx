import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import Icon from '../components/Icon';
import { Jump, Crumbs } from '../components/Blocks';
import { Stage, Stack, Caps, AskData, Medallion } from '../components/Dai';
import { Teams, Gallery, Architecture, Triage, Governance, Fit, DAI_FAQ } from '../components/DaiMore';
import { FaqTabs } from '../components/Blocks';
import { img } from '../lib/assets';

// Copy describes how Maruway's data work applies. It makes no client claims. VERIFY with management.
const AI_USES = [
  ['Answer desk', 'Staff ask “which site is behind?” in plain words and get a sourced answer.'],
  ['Ticket triage', 'New faults are read, tagged and routed to the right engineer before anyone opens them.'],
  ['Report writer', 'The monthly review drafts itself from the dashboard. A person edits and sends it.'],
  ['Early warnings', 'Odd readings from devices and sensors raise a flag before users notice.'],
];
const GUARD = ['Your data stays in your own accounts', 'Every answer shows where it came from', 'A person approves anything that changes a system', 'Access, limits and logs are set per team'];
const PATH = [['Send a spreadsheet', 'One file is enough to start.'], ['See a sample', 'We build a dashboard from it.'], ['Pilot on one site', 'Real data, one team, a month.'], ['Roll out and run', 'More sites, monthly reviews.']];

export default function DataAI() {
  const spark = img('dai', 'spark');
  return (
    <div className="dai dpage">
      <Seo title="Data and AI" path="/data-ai" description="Dashboards, data pipelines and AI assistants built around the questions your managers ask. From Maruway Networks, Nairobi." />

      <section className="dhero">
        <div className="wrap dhero__g">
          <div>
            <Crumbs light items={[['Data and AI']]} />
            <small className="dai-k">Data and AI</small>
            <h1>Data you can ask. AI you can check.</h1>
            <p>We connect the spreadsheets, device logs and systems you already have, clean them, and put the answers in front of the people who decide. Assistants come after the numbers are trusted, not before.</p>
            <div className="dai-act"><Link className="dbtn dbtn--red" to="/contact?service=data-analytics">Ask for a sample <Icon name="arrow" size={16} /></Link><a className="dbtn dbtn--line" href="#ask">Try a question</a></div>
          </div>
          <Stage art="dai-platform" chips={[['Sources', '12 connected', 'a'], ['Checks', '38 passing', 'b'], ['Refreshed', '06:00 daily', 'c']]} />
        </div>
        <span className="dhero__fine">Figures shown are samples.</span>
      </section>

      <Jump items={[['What we connect', 'stack'], ['What you see', 'see'], ['Who uses it', 'teams'], ['What we build', 'build'], ['Try a question', 'ask'], ['How it fits together', 'arch'], ['Made ready', 'ready'], ['AI assistants', 'ai'], ['Governance', 'gov'], ['Which tool', 'fit'], ['How to start', 'start'], ['Questions', 'faq']]} />

      <section id="stack" className="dsec dsec--oat">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">What we connect</small><h2>Works with the tools you already pay for.</h2><p>We start from your sources and your reporting tool. Nothing has to be replaced to see value.</p></Reveal>
          <Reveal className="dstacks"><Stack kind="bi" label="Reporting" /><Stack kind="db" label="Databases" /><Stack kind="cloud" label="Cloud" /><Stack kind="flow" label="Pipelines" /></Reveal>
        </div>
      </section>

      <section id="see" className="dsec">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">What you see</small><h2>Three boards managers open every Monday.</h2><p>Each one answers a single question, with a good, warning and poor range you agree up front.</p></Reveal>
          <Gallery />
        </div>
      </section>

      <section id="teams" className="dsec dsec--oat">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">Who uses it</small><h2>The same data answers different questions.</h2></Reveal>
          <Reveal><Teams /></Reveal>
        </div>
      </section>

      <section id="build" className="dsec">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">What we build</small><h2>Eight pieces. Use the ones you need.</h2></Reveal>
          <Caps />
        </div>
      </section>

      <section id="ask" className="dsec dsec--navy">
        <div className="wrap">
          <Reveal className="dhead dhead--w"><small className="dai-k">Try it</small><h2>Ask a question the way you would ask a colleague.</h2><p>Pick one. The answer is built from sample numbers, with the evidence underneath.</p></Reveal>
          <Reveal><AskData /></Reveal>
        </div>
      </section>

      <section id="arch" className="dsec">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">How it fits together</small><h2>Four stages from file to answer.</h2><p>Point at a stage to see what happens there. Nothing in your source systems is changed.</p></Reveal>
          <Reveal><Architecture /></Reveal>
        </div>
      </section>

      <section id="ready" className="dsec dsec--oat">
        <div className="wrap dready">
          <Reveal className="dhead"><small className="dai-k">How data is made ready</small><h2>Cleaned before it is charted.</h2><p>A dashboard is only as honest as the data under it. Every number climbs through three layers, and you can trace any figure back to its source.</p><Picture folder="art" name="dai-cloud" alt="" width={600} height={560} /></Reveal>
          <Reveal><Medallion /></Reveal>
        </div>
      </section>

      <section id="ai" className="dsec dai-ai">
        <div className="wrap dai-ai__g">
          <Reveal className="dai-ai__m"><Picture folder="art" name="dai-ai" alt="" width={800} height={760} /></Reveal>
          <Reveal className="dai-ai__t">
            <small className="dai-k dai-k--g">AI assistants</small>
            <h2>Useful before it is impressive.</h2>
            <p>Four jobs where an assistant saves real time once the data is in order. Scope is agreed per project.</p>
            <ul className="dai-ai__u">{AI_USES.map(([t, d]) => (<li key={t}><b>{t}</b><span>{d}</span></li>))}</ul>
            <div className="dai-ai__g2"><h3>How we keep it safe</h3><ul>{GUARD.map((g) => (<li key={g}><Icon name="check" size={16} stroke={2.4} />{g}</li>))}</ul></div>
          </Reveal>
        </div>
      </section>

      <section className="dsec dsec--navy">
        <div className="wrap">
          <Reveal className="dhead dhead--w"><small className="dai-k">AI in practice</small><h2>A ticket arrives. The assistant proposes. A person decides.</h2><p>Triage is the safest first job for AI: it saves minutes on every ticket and never acts on its own.</p></Reveal>
          <Reveal><Triage /></Reveal>
        </div>
      </section>

      <section id="gov" className="dsec">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">Governance</small><h2>Trusted because it can be checked.</h2></Reveal>
          <Governance />
        </div>
      </section>

      <section id="fit" className="dsec dsec--oat">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">Which tool fits</small><h2>The smallest thing that answers the question.</h2></Reveal>
          <Reveal><Fit /></Reveal>
        </div>
      </section>

      <section id="start" className="dsec">
        <div className="wrap">
          <Reveal className="dhead"><small className="dai-k">How to start</small><h2>One spreadsheet is enough.</h2></Reveal>
          <ol className="dpath">{PATH.map(([t, d], n) => (<Reveal as="li" key={t} delay={n * 80}><span>{String(n + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></Reveal>))}</ol>
        </div>
      </section>

      <section id="faq" className="dsec dsec--oat"><div className="wrap"><FaqTabs groups={DAI_FAQ} /></div></section>

      <section className="dcta" style={spark ? { '--spark': `url(${spark})` } : undefined}>
        <div className="wrap dcta__g">
          <div><h2>Send us one spreadsheet.</h2><p>We will show you what it looks like as a dashboard, and what you could ask it.</p></div>
          <Link className="dbtn dbtn--navy" to="/contact?service=data-analytics">Request a sample <Icon name="arrow" size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
