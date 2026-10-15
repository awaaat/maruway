import { useEffect, useRef, useState } from 'react';
import RibbonCanvas from './RibbonCanvas';
import { reduced } from '../lib/motion';

// Original 3D artwork rendered with WebGL (three.js): bundles of glowing strands that twist through
// space, one bundle per slide, rotating slowly and tilting toward the pointer. Falls back to a 2D
// ribbon drawing when WebGL is unavailable.
const SETS = [
  { p: 2, q: 3, colors: [0x38d4ff, 0x3a7bff, 0x8f6bff], r: 1.0 },
  { p: 3, q: 4, colors: [0xff7a1a, 0xffb066, 0xff4d2d], r: 1.05 },
  { p: 2, q: 5, colors: [0x2ee6a6, 0x38d4ff, 0xa8ffd9], r: 1.0 },
];

export default function Hero3D({ index = 0, className = '' }) {
  const ref = useRef(null);
  const idx = useRef(index);
  const [fallback, setFallback] = useState(false);
  idx.current = index;

  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      const el = ref.current;
      if (!el) return;
      let THREE;
      try { THREE = await import('three'); } catch { setFallback(true); return; }
      if (dead) return;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true }); } catch { setFallback(true); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      const groups = SETS.map((s) => {
        const g = new THREE.Group();
        const base = new THREE.TorusKnotGeometry(1.7 * s.r, 0.0001, 420, 2, s.p, s.q).getAttribute('position');
        const STR = 36;
        for (let k = 0; k < STR; k++) {
          const pts = [];
          const off = (k - STR / 2) * 0.026;
          for (let i = 0; i <= 420; i++) {
            const j = i % 420;
            const x = base.getX(j), y = base.getY(j), z = base.getZ(j);
            const a = (i / 420) * Math.PI * 2;
            const tw = Math.sin(a * 3 + k * 0.15) * 0.35;
            pts.push(new THREE.Vector3(x + off * (1 + tw), y + off * 0.6, z + off * Math.cos(a * 2)));
          }
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          const mat = new THREE.LineBasicMaterial({ color: s.colors[k % s.colors.length], transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
          g.add(new THREE.Line(geo, mat));
        }
        // drifting light specks
        const N = 260, arr = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) { const a = Math.random() * 6.283, r = 1.2 + Math.random() * 2.2; arr[i * 3] = Math.cos(a) * r; arr[i * 3 + 1] = (Math.random() - 0.5) * 3.6; arr[i * 3 + 2] = Math.sin(a) * r; }
        const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        const pm = new THREE.PointsMaterial({ color: s.colors[0], size: 0.025, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
        g.add(new THREE.Points(pg, pm));
        scene.add(g);
        return g;
      });

      const mouse = { x: 0, y: 0 };
      const onMove = (e) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 2; mouse.y = (e.clientY / window.innerHeight - 0.5) * 2; };
      window.addEventListener('pointermove', onMove, { passive: true });
      const resize = () => {
        const r = el.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height; camera.updateProjectionMatrix();
        const wide = r.width > 900;
        groups.forEach((g) => { g.position.x = wide ? 2.3 : 0.4; g.position.y = wide ? 0 : 1.1; g.scale.setScalar(wide ? 1 : 0.7); });
      };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();

      let raf = 0, visible = true; const t0 = performance.now(); const calm = reduced();
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);
      const loop = (now) => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const t = calm ? 3 : (now - t0) / 1000;
        groups.forEach((g, n) => {
          const on = n === idx.current ? 1 : 0;
          g.children.forEach((c) => { const m = c.material; const target = on * (c.isPoints ? 0.9 : 0.34); m.opacity += (target - m.opacity) * 0.04; });
          g.rotation.y = t * 0.16 + n * 1.3 + mouse.x * 0.35;
          g.rotation.x = Math.sin(t * 0.21 + n) * 0.28 + mouse.y * 0.22;
          g.rotation.z = Math.sin(t * 0.13 + n * 2) * 0.18;
        });
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', onMove); scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); }); renderer.dispose(); };
    })();
    return () => { dead = true; cleanup(); };
  }, []);

  if (fallback) return <RibbonCanvas palette={['ocean', 'ember', 'jade'][index]} shape={index * 2.1} className={className} />;
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
