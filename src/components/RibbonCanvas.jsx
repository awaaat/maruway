import { useEffect, useRef } from 'react';
import { reduced } from '../lib/motion';

// Original flowing-ribbon artwork, drawn in code. Each strand follows a looping curve and is offset
// along its normal, so a bundle reads as a twisting band of light. Palette and shape vary per slide.
const PALETTES = {
  ember: ['#ff7a1a', '#ffb066', '#ff4d2d', '#ffd9a8'],
  ocean: ['#38d4ff', '#3a7bff', '#8f6bff', '#a8f0ff'],
  jade: ['#2ee6a6', '#38d4ff', '#a8ffd9', '#1b9fff'],
};

export default function RibbonCanvas({ palette = 'ocean', shape = 0, className = '', active = true }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return undefined;
    const ctx = c.getContext('2d');
    const cols = PALETTES[palette] || PALETTES.ocean;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t0 = performance.now(), visible = true;
    const size = () => { const r = c.getBoundingClientRect(); w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const curve = (a, tm) => {
      const s = shape;
      const x = Math.sin(2 * a + tm * 0.35 + s) * (0.34 + 0.05 * Math.sin(tm * 0.2));
      const y = Math.sin(3 * a + tm * 0.28 + s * 1.7) * 0.26 + Math.cos(a + tm * 0.15) * 0.1;
      return [x, y];
    };
    const STR = 46, N = 140;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!visible || !active) return;
      const tm = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const cx = w * 0.68, cy = h * 0.5, sc = Math.min(w * 0.6, h * 1.5);
      for (let k = 0; k < STR; k++) {
        const off = (k - STR / 2) * 0.0105;
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const a = (i / N) * Math.PI * 2;
          const [x1, y1] = curve(a, tm);
          const [x2, y2] = curve(a + 0.01, tm);
          let nx = -(y2 - y1), ny = x2 - x1; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
          const twist = Math.sin(a * 2 + tm * 0.5) * 0.7 + 1.1;
          const px = cx + (x1 + nx * off * twist) * sc, py = cy + (y1 + ny * off * twist) * sc;
          if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = cols[k % cols.length];
        ctx.globalAlpha = 0.11 + 0.09 * Math.sin(k * 0.7 + tm);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    };
    size();
    if (reduced()) { draw(performance.now() + 4000); cancelAnimationFrame(raf); } else raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    const ro = new ResizeObserver(size); ro.observe(c);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [palette, shape, active]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
