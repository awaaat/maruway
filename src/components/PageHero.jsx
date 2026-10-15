import { Link } from 'react-router-dom';
import FibreCanvas from './FibreCanvas';
import Picture from './Picture';
import { keptArt } from '../lib/assets';
import { Words } from './Reveal';

// Five hero compositions so pages do not look alike:
// split  dark, copy left, framed art or photo right
// flip   dark, art or photo left, copy right
// stage  light, copy left, tilted dark art panel right
// poster dark, huge ghost word, art bleeding in from the right
// photo  full-bleed photo, copy low left, art card floating right
// mosaic dark, copy left, three photos staggered right
export default function PageHero({ crumbs = [], title, lede, image, art, photos, tag, variant, children, hue = 'warm' }) {
  const v = variant || (photos ? 'mosaic' : art ? 'split' : image ? 'photo' : 'poster');
  const ghost = tag || (crumbs.length ? crumbs[crumbs.length - 1][0] : 'Maruway');
  const copy = (
    <div className="phero__copy">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        {crumbs.map(([l, to]) => (<span key={l}>/ {to ? <Link to={to}>{l}</Link> : l}</span>))}
      </nav>
      {tag && <small className="phero__tag">{tag}</small>}
      <Words text={title} />
      {lede && <p className="lede">{lede}</p>}
      {children}
    </div>
  );
  const fig = (
    <figure className="phero__fig">
      {image && art && keptArt(art) ? (<>
        <div className="phero__main"><Picture folder="projects" name={image} alt="" width={1200} height={900} eager /></div>
        <div className="phero__art"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div>
      </>) : art ? (<div className="phero__main phero__main--art"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div>)
        : (<div className="phero__main"><Picture folder="projects" name={image} alt="" width={1200} height={900} eager /></div>)}
    </figure>
  );

  if (v === 'mosaic') {
    return (
      <section className="phero phero--mosaic">
        <div className="wrap phero__g">{copy}
          <div className="phero__mos" aria-hidden="true">{photos.map((p, n) => (<div key={p} className={`m${n}`}><Picture folder="projects" name={p} alt="" width={640} height={480} eager /></div>))}</div>
        </div>
      </section>
    );
  }
  if (v === 'photo') {
    return (
      <section className="phero phero--photo">
        <div className="phero__bg"><Picture folder="projects" name={image} alt="" width={1600} height={900} eager /></div>
        <div className="wrap phero__g">{copy}{art && <div className="phero__card"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div>}</div>
      </section>
    );
  }
  if (v === 'poster') {
    return (
      <section className="phero phero--poster">
        <span className="phero__ghost" aria-hidden="true">{ghost}</span>
        {art && <div className="phero__bleed" aria-hidden="true"><Picture folder="art" name={art} alt="" width={1000} height={700} eager /></div>}
        <div className="wrap phero__g">{copy}</div>
      </section>
    );
  }
  return (
    <section className={`phero phero--${v}`}>
      <div className="wrap phero__g">{copy}{fig}</div>
    </section>
  );
}
