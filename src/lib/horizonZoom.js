// Horizon zoom-away. Every photo and every slide rolls its own recipe (start, depth, speed shape).
// Hero zoom runs RUN times longer than the slide, so it is still moving when the slide changes.
export const RUN  = 1.4;    // hero zoom keeps moving 40% past the slide length
export const BACK = 0.12;   // loops: share of the time spent drifting back
const MIN_ZOOM = 0.72;      // never smaller than this (keeps edges hidden)
const rand = (a, b) => a + Math.random() * (b - a);

export function zoomRecipe(soft, hero) {
  const z0 = soft ? 1.12 : hero ? rand(1.08, 1.17) : 1.12;
  const zv = soft ? rand(1.0, 1.06) : rand(0.78, 0.9);   // how far it has receded when the slide changes
  const g  = rand(0.85, 1.3);                            // speed shape (always moving)
  const floor = soft ? 1.0 : MIN_ZOOM;
  const zf = hero ? Math.max(floor, z0 + (zv - z0) * Math.pow(RUN, g)) : zv;
  return { z0, zf, g, hero };
}

export function zoomAt(r, u) {
  const out = r.hero ? 1 : 1 - BACK;
  if (u <= out) return r.z0 + (r.zf - r.z0) * Math.pow(u / out, r.g);
  const t = (u - out) / (1 - out);
  return r.zf + (r.z0 - r.zf) * (0.5 - 0.5 * Math.cos(Math.PI * t));
}

export function zoomFrames(r, total) {
  const N = Math.max(40, Math.round(total / 150)), f = [];
  for (let j = 0; j <= N; j++) f.push({ offset: j / N, scale: zoomAt(r, j / N) });
  return f;
}
