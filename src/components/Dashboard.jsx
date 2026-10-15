import { useState } from 'react';

// Interactive sample dashboard. All figures are invented for illustration.
const SETS = {
  Week: { up: '99.2%', faults: 7, fix: '2h 40m', line: [14, 11, 12, 9, 10, 7, 7], lab: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], br: [['Westlands', 91], ['Industrial Area', 80], ['Mombasa Rd', 66], ['Kisumu', 52], ['Eldoret', 31]] },
  Month: { up: '99.4%', faults: 22, fix: '2h 10m', line: [34, 30, 27, 25, 22], lab: ['W1', 'W2', 'W3', 'W4', 'W5'], br: [['Westlands', 93], ['Industrial Area', 83], ['Mombasa Rd', 70], ['Kisumu', 58], ['Eldoret', 38]] },
  Quarter: { up: '99.6%', faults: 61, fix: '1h 50m', line: [88, 72, 61], lab: ['Jul', 'Aug', 'Sep'], br: [['Westlands', 95], ['Industrial Area', 86], ['Mombasa Rd', 74], ['Kisumu', 64], ['Eldoret', 47]] },
};
const tone = (v) => (v >= 80 ? 'var(--ok)' : v >= 55 ? 'var(--accent)' : '#e05555');

export default function Dashboard() {
  const [p, setP] = useState('Month');
  const [hv, setHv] = useState(null);
  const d = SETS[p];
  const max = Math.max(...d.line) * 1.15;
  const W = 520; const H = 190;
  const pts = d.line.map((v, i) => [30 + (i * (W - 60)) / Math.max(1, d.line.length - 1), H - 24 - (v / max) * (H - 50)]);
  const poly = pts.map((q) => q.join(',')).join(' ');
  return (
    <div className="dsh">
      <div className="dsh__bar"><b>Network health</b><span>Sample data</span>
        <div role="tablist" aria-label="Period">{Object.keys(SETS).map((k) => <button key={k} role="tab" aria-selected={p === k} className={p === k ? 'is-on' : ''} onClick={() => { setP(k); setHv(null); }}>{k}</button>)}</div>
      </div>
      <div className="dsh__kpis">
        <div><small>Uptime</small><b style={{ color: 'var(--ok)' }}>{d.up}</b></div>
        <div><small>Faults raised</small><b style={{ color: 'var(--accent)' }}>{d.faults}</b></div>
        <div><small>Average fix time</small><b style={{ color: 'var(--cyan)' }}>{d.fix}</b></div>
      </div>
      <div className="dsh__grid">
        <div className="dsh__chart">
          <small>Faults over time {hv !== null && <em>{d.lab[hv]}: {d.line[hv]}</em>}</small>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart of faults raised">
            {[0.25, 0.5, 0.75].map((t) => <line key={t} x1="30" x2={W - 30} y1={H - 24 - t * (H - 50)} y2={H - 24 - t * (H - 50)} stroke="rgba(255,255,255,.08)" />)}
            <polygon points={`30,${H - 24} ${poly} ${W - 30},${H - 24}`} fill="rgba(255,122,26,.14)" />
            <polyline points={poly} fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinejoin="round" />
            {pts.map(([x, y], i) => (<g key={i} onMouseEnter={() => setHv(i)} onFocus={() => setHv(i)} tabIndex="0"><circle cx={x} cy={y} r="16" fill="transparent" /><circle cx={x} cy={y} r={hv === i ? 7 : 4.5} fill="var(--accent)" /><text x={x} y={H - 6} textAnchor="middle" fontSize="11" fill="#8794b3">{d.lab[i]}</text></g>))}
          </svg>
        </div>
        <div className="dsh__br">
          <small>Response score by branch</small>
          {d.br.map(([n, v]) => (<div key={n}><span>{n}</span><i><u style={{ width: `${v}%`, background: tone(v) }} /></i><b>{v}</b></div>))}
        </div>
      </div>
    </div>
  );
}
