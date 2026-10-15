import { useEffect, useRef } from 'react';
import { reduced } from '../lib/motion';

// Original animated backdrop: a drifting node mesh with light pulses travelling along links,
// reacting to the pointer. Drawn in code, so there is nothing to license.
export default function FibreCanvas({ className = '', density = 1, hue = 'warm' }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return undefined;
    const ctx = c.getContext('2d');
    let w = 0, h = 0, raf = 0, nodes = [], pulses = [], visible = true;
    const mouse = { x: -999, y: -999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const A = hue === 'warm' ? '255,122,26' : '56,212,255';
    const B = hue === 'warm' ? '56,212,255' : '255,122,26';

    const build = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.round(Math.min(90, (w * h) / 16000) * density));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 0.8 }));
    };

    const link = Math.max(90, Math.min(150, w / 3));
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { p.x += (dx / d) * 0.9; p.y += (dy / d) * 0.9; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(${B},${(1 - d / link) * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (Math.random() < 0.0009 * density && pulses.length < 26) pulses.push({ a, b, t: 0, s: 0.012 + Math.random() * 0.018 });
          }
        }
      }
      for (const p of nodes) {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        ctx.fillStyle = dm < 160 ? `rgba(${A},.95)` : 'rgba(190,205,235,.55)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + (dm < 160 ? 1.2 : 0), 0, 6.283); ctx.fill();
      }
      pulses = pulses.filter((q) => (q.t += q.s) < 1);
      for (const q of pulses) {
        const x = q.a.x + (q.b.x - q.a.x) * q.t, y = q.a.y + (q.b.y - q.a.y) * q.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, `rgba(${A},1)`); g.addColorStop(1, `rgba(${A},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 12, 0, 6.283); ctx.fill();
      }
    };

    build();
    if (reduced()) { frame(); cancelAnimationFrame(raf); } else frame();
    const move = (e) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    const ro = new ResizeObserver(build);
    ro.observe(c);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerleave', leave); };
  }, [density, hue]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
