import { useEffect, useRef, useState } from 'react';
import { whenReady, reduced } from '../lib/motion';

// True while the element is on screen (toggles both ways, so demos pause off screen).
export function useInView({ threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let io;
    const off = whenReady(() => {
      io = new IntersectionObserver(([e]) => setIn(e.isIntersecting), { threshold, rootMargin });
      io.observe(el);
    });
    return () => { off(); io?.disconnect(); };
  }, [threshold, rootMargin]);
  return [ref, inView];
}

// Runs an async "script" in a loop while `active`. Inside, `wait(ms)` pauses and `fast` is true for
// reduced-motion visitors (the script then runs once, instantly, and stops on its final state).
export function useScript(run, active, nonce = 0) {
  const runRef = useRef(run);
  runRef.current = run;
  useEffect(() => {
    if (!active) return undefined;
    let dead = false;
    const timers = [];
    const fast = reduced();
    const wait = (ms) => new Promise((r) => { if (fast) r(); else timers.push(setTimeout(r, ms)); });
    (async () => {
      do { await runRef.current({ wait, fast }); } while (!dead && !fast);
    })();
    return () => { dead = true; timers.forEach(clearTimeout); };
  }, [active, nonce]);
}

// Counts up to `to` whenever `active` turns true (replays when scrolled back into view).
export function useCountUp(to, active, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) { setV(0); return undefined; }
    if (reduced()) { setV(to); return undefined; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, active, ms]);
  return v;
}

// Live clock for a time zone.
export function useClock(tz = 'Africa/Nairobi') {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const i = setInterval(() => setT(fmt()), 1000); return () => clearInterval(i); }, [tz]);
  return t;
}

// Types text into state, one character at a time.
export async function typeInto(setter, text, wait, fast, speed = 26) {
  if (fast) { setter(text); return; }
  for (let i = 1; i <= text.length; i++) { setter(text.slice(0, i)); await wait(speed + Math.random() * 22); }
}
