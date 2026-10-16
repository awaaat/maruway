import { useMemo } from 'react';
import { resolveImg, keptArt, isDai, daiBleed, photoNames, ART_PHOTO } from '../lib/assets';
import { CAP, claim, used, leastUsed } from '../lib/balance';

// Decides what a slot actually shows.
// Photos are counted per route and decorative slots are rebalanced once a photo hits its cap.
// An old illustration slot gets its mapped real photo (ART_PHOTO) while that photo is under the cap.
function choose(folder, name, decorative) {
  if (folder === 'art' && !isDai(name) && !keptArt(name)) {
    const pool = photoNames();
    if (!pool.length) return { folder: 'art', name, kind: 'none' };
    const want = ART_PHOTO[name];
    const pick = want && pool.includes(want) && used(want) < CAP ? want : leastUsed(pool);
    return { folder: 'projects', name: claim(pick), kind: 'photo' };
  }
  if (folder === 'art') return { folder, name, kind: isDai(name) ? (daiBleed(name) ? 'bleed' : 'dai') : 'ill' };
  if (folder === 'projects') {
    let n = name;
    const pool = photoNames();
    const missing = !resolveImg('projects', n);
    if (pool.length && (missing || (decorative && pool.length > 1 && used(n) >= CAP))) n = leastUsed(pool.filter((x) => x !== n), n) || pool[0];
    return { folder, name: claim(n), kind: 'photo' };
  }
  return { folder, name, kind: 'plain' };
}

const CLS = { photo: 'pic pic--photo', ill: 'pic is-art', dai: 'pic is-dai', bleed: 'pic is-dai is-dai--bleed', plain: 'pic' };

// Image with explicit size (prevents layout shift) and a designed plate when the file is missing.
export default function Picture({ folder, name, alt, width, height, className = '', eager = false, label }) {
  const pick = useMemo(() => choose(folder, name, !alt), [folder, name, alt]);
  const src = pick.kind === 'none' ? null : resolveImg(pick.folder, pick.name);
  if (!src) {
    return (
      <div className={`ph ${className}`} role="img" aria-label={alt} style={{ aspectRatio: `${width} / ${height}` }}>
        <span>{label || 'Photo to be added'}</span>
      </div>
    );
  }
  return (
    <img
      className={`${className} ${CLS[pick.kind]}`.trim()}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
    />
  );
}
