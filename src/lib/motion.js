// Shared motion state: "ready" gate (after the boot intro) and scroll direction.
let ready = false;
const queue = [];

export function whenReady(fn) {
  if (ready) { fn(); return () => {}; }
  queue.push(fn);
  return () => { const i = queue.indexOf(fn); if (i > -1) queue.splice(i, 1); };
}

export function setReady() {
  if (ready) return;
  ready = true;
  document.documentElement.classList.add('ready');
  queue.splice(0).forEach((f) => f());
}

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let dir = 'down';
let lastY = 0;
if (typeof window !== 'undefined') {
  lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 2) { dir = y > lastY ? 'down' : 'up'; lastY = y; }
    },
    { passive: true },
  );
}
export const scrollDir = () => dir;
