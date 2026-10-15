import { useState } from 'react';
import { useInView, useScript } from '../hooks/motion';

const TICKS = 60;

// 60 ticks light up one by one: a picture of the 60-minute response target.
export default function ResponseRing() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [n, setN] = useState(0);
  useScript(async ({ wait, fast }) => {
    setN(0); await wait(400);
    if (fast) { setN(TICKS); return; }
    for (let i = 1; i <= TICKS; i++) { setN(i); await wait(38); }
    await wait(3200);
  }, inView);
  return (
    <div className="ring" ref={ref} role="img" aria-label="60 minute response target">
      <svg viewBox="-60 -60 120 120">
        {Array.from({ length: TICKS }, (_, i) => (
          <line key={i} className={i < n ? 'is-on' : ''} x1="0" y1="-50" x2="0" y2={i % 5 === 0 ? -41 : -45} transform={`rotate(${i * (360 / TICKS)})`} />
        ))}
      </svg>
      <div className="ring__c"><strong>60</strong><span className="mono">min target</span></div>
    </div>
  );
}
