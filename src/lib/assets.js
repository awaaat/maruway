// Resolves images by folder and base name, whatever the extension.
// A missing file returns null so components can show a placeholder instead of breaking the build.
const files = import.meta.glob('../assets/img/**/*.{webp,jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function img(folder, name) {
  const hit = Object.keys(files).find((p) => {
    const m = p.match(/img\/([^/]+)\/(.+)\.[a-z]+$/i);
    return m && m[1] === folder && m[2] === name;
  });
  return hit ? files[hit] : null;
}

// Hand-drawn illustrations that stay as they are.
const KEEP = new Set(['network-layers', 'network-rack', 'cctv-plan', 'access-door', 'pa-coverage', 'pa-zones', 'telecom-link']);
export const keptArt = (n) => KEEP.has(n);

// Data and AI imagery lives in assets/img/dai and is addressed as "dai-<file>".
// The old generic data pictures are redirected so no page needs editing.
const LEGACY = {
  'analytics-dashboard': 'dai-analytics',
  'analytics-pipeline': 'dai-cloud',
  'analytics-branches': 'dai-globe',
  'analytics-before-after': 'dai-build',
  'hero-insights': 'dai-brain',
};
export const daiName = (n) => LEGACY[n] || n;
export const isDai = (n) => typeof n === 'string' && daiName(n).startsWith('dai-');
export const daiBleed = (n) => daiName(n) === 'dai-ai';

// Real work photographs, used for balanced rotation. Solar is excluded until its own photo exists.
export function photoNames() {
  return Object.keys(files)
    .map((k) => k.match(/img\/projects\/(.+)\.[a-z]+$/i))
    .filter((m) => m && m[1] !== 'solar-installation')
    .map((m) => m[1])
    .sort();
}

export function resolveImg(folder, name) {
  if (folder === 'art') {
    if (isDai(name)) return img('dai', daiName(name).slice(4));
    return KEEP.has(name) ? img('art', name) : null;
  }
  return img(folder, name);
}
