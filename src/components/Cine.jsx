import { img, photoNames } from '../lib/assets';

// A photograph that behaves like slow footage: it drifts, zooms and turns a little, with a light sweep across it.
// variant a = push in and drift left, b = pull out and drift right, c = slow orbit.
export default function Cine({ folder = 'projects', name, src, variant = 'a', className = '', children }) {
  const url = src || img(folder, name) || (folder === 'projects' ? img('projects', photoNames()[0]) : null);
  if (!url) return <div className={`cine cine--empty ${className}`}>{children}</div>;
  return (
    <div className={`cine cine--${variant} ${className}`} aria-hidden="true">
      <div className="cine__img" style={{ backgroundImage: `url(${url})` }} />
      <span className="cine__sweep" />
      {children}
    </div>
  );
}
