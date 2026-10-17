// Zoom-away (horizonZoom.js) runs the whole time. A random slide to the right/left (sometimes slightly
// up/down, sometimes a tiny one-way turn) runs at the same time. Every photo/slide rolls its own recipe.
// The slide yields to the zoom when an edge would show. The zoom is never reduced or stopped.
import { zoomRecipe, zoomAt, zoomFrames, RUN, BACK } from './horizonZoom.js';
const FULL = '.cine__img, .khero__ph';
const SOFT = '.phero--photo .phero__bg img, .phero--split .phero__main img, .phero--flip .phero__main img';
const BOX  = '.cine, .khero__s, .phero__bg, .phero__main';

// ---- tuning ----
const HERO_DUR  = 15000;       // must equal DUR in Home.jsx
const LOOP_TIME = 50000;       // non-hero photos: one recede + slide, then a gentle return
const PAN       = [0.03, 0.09];// sideways distance seen during a slide, share of frame width
const PAN_Y     = 0.03;        // max up/down drift, share of frame height (0 = none)
const TURN_MAX  = 5;           // max one-way plate turn in degrees (0 = none)
const BLEED     = 1.44;        // image size vs frame (inset -22%)
const PERSP     = 2600;
// ----------------

const rand = (a, b) => a + Math.random() * (b - a);
const sign = () => (Math.random() < 0.5 ? -1 : 1);
const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
const clamp = (v, m) => Math.max(-m, Math.min(m, v));
const tf = (x, y, ry) => `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`;

function build(el, soft, hero, r) {
  const box = el.closest(BOX) || el.parentElement || el;
  const fw = box.clientWidth || 1, fh = box.clientHeight || 1;
  const k = soft ? 0.4 : 1, bleed = soft ? 1.0 : BLEED;
  const total = hero ? HERO_DUR * RUN : LOOP_TIME;
  const pg = rand(0.85, 1.4);                                       // this photo's own slide speed shape
  const grow = hero ? Math.pow(RUN, pg) : 1;                        // so the VISIBLE slide matches the numbers below
  const endX = sign() * rand(PAN[0], PAN[1]) * fw * k * grow;
  const endY = Math.random() < 0.5 ? rand(-1, 1) * PAN_Y * fh * k * grow : 0;
  const endR = Math.random() < 0.4 ? sign() * rand(1.5, TURN_MAX) * k * grow : 0;
  const out = hero ? 1 : 1 - BACK;
  const N = Math.max(40, Math.round(total / 150)), frames = [];
  for (let j = 0; j <= N; j++) {
    const u = j / N;
    const m = u <= out ? Math.pow(u / out, pg) : 1 - ease((u - out) / (1 - out));
    const zl = zoomAt(r, u);
    const limX = (fw * (zl * bleed - 1) / 2) * 0.94, limY = (fh * (zl * bleed - 1) / 2) * 0.94;
    const x = clamp(endX * m, Math.max(0, limX)), y = clamp(endY * m, Math.max(0, limY));
    frames.push({ offset: u, transform: tf(x / zl, y / zl, endR * m) });   // scale stays 1: zoom is never touched
  }
  return { frames, total };
}

const state = new WeakMap();
const isActive = (el) => {
  const slide = el.closest('.khero__s');
  if (slide && !slide.classList.contains('is-on')) return false;
  return !el.closest('.cine.is-off');
};
const cancel = (st) => { for (const k of ['anim', 'zoom']) if (st[k]) { try { st[k].cancel(); } catch (e) {} st[k] = null; } };

function run(el) {
  const st = state.get(el); if (!st || !el.isConnected) return;
  cancel(st);
  const hero = !!el.closest('.khero__s');
  const r = zoomRecipe(st.soft, hero);
  const seq = build(el, st.soft, hero, r);
  const fill = hero ? 'forwards' : 'none';
  st.anim = el.animate(seq.frames, { duration: seq.total, easing: 'linear', fill });
  st.zoom = el.animate(zoomFrames(r, seq.total), { duration: seq.total, easing: 'linear', fill });
  if (!hero) st.anim.onfinish = () => { if (isActive(el)) run(el); };
}
function attach(el, soft) {
  if (state.has(el)) return;
  const box = el.closest(BOX);
  if (box) { box.style.perspective = PERSP + 'px'; box.style.perspectiveOrigin = '50% 50%'; }
  state.set(el, { anim: null, zoom: null, soft, wasActive: isActive(el) });
  el.style.transform = tf(0, 0, 0);
  el.style.scale = '1.12';
  if (isActive(el)) run(el);
}
function scan() {
  document.querySelectorAll(FULL).forEach((el) => attach(el, false));
  document.querySelectorAll(SOFT).forEach((el) => attach(el, true));
}
function refresh() {
  document.querySelectorAll(`${FULL}, ${SOFT}`).forEach((el) => {
    const st = state.get(el); if (!st) return;
    const now = isActive(el);
    if (now !== st.wasActive) { st.wasActive = now; if (now) run(el); else cancel(st); }
  });
}
function start() {
  scan();
  new MutationObserver((muts) => {
    let added = false, cls = false;
    for (const m of muts) { if (m.type === 'childList') added = true; else cls = true; }
    if (added) scan();
    if (cls) refresh();
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
