import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Picture from './Picture';
import Icon from './Icon';

// Image and words alternate left and right, one idea per row.
// A row can use a photo (img) or an illustration (art).
export default function Alt({ rows }) {
  return (
    <div className="alt">
      {rows.map((r, n) => (
        <Reveal key={r.h} className={`alt__r ${n % 2 ? 'is-flip' : ''}`}>
          <div className={`alt__m ${r.art ? 'alt__m--art' : ''}`}><Picture folder={r.art ? 'art' : r.folder || 'projects'} name={r.art || r.img} alt={r.alt || ''} width={900} height={640} /></div>
          <div className="alt__t">
            {r.k && <small>{r.k}</small>}
            <h3>{r.h}</h3>
            <p>{r.p}</p>
            {r.to && <Link className="tlink" to={r.to}>{r.cta || 'Learn more'} <Icon name="arrow" size={14} /></Link>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
