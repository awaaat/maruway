import { useState } from 'react';

// Interactive sample dashboard. All figures are invented for illustration.
const SETS = {
  Week: { sub: 'Last 7 days', up: '99.2%', faults: 7, fix: '2h 40m', dUp: '0.1 pts', dF: '3', dX: '12 min',
    us: [98.7, 99.0, 98.9, 99.3, 99.1, 99.4, 99.2], xs: [190, 175, 182, 168, 171, 160, 160],
    line: [14, 11, 12, 9, 10, 7, 7], lab: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    br: [['Westlands', 91], ['Industrial Area', 80], ['Mombasa Rd', 66], ['Kisumu', 52], ['Eldoret', 31]] },
  Month: { sub: 'This month', up: '99.4%', faults: 22, fix: '2h 10m', dUp: '0.2 pts', dF: '6', dX: '18 min',
    us: [99.1, 99.2, 99.3, 99.4, 99.4], xs: [150, 146, 140, 136, 130],
    line: [34, 30, 27, 25, 22], lab: ['W1', 'W2', 'W3', 'W4', 'W5'],
    br: [['Westlands', 93], ['Industrial Area', 83], ['Mombasa Rd', 70], ['Kisumu', 58], ['Eldoret', 38]] },
  Quarter: { sub: 'This quarter', up: '99.6%', faults: 61, fix: '1h 50m', dUp: '0.3 pts', dF: '27', dX: '25 min',
    us: [99.2, 99.4, 99.6], xs: [135, 120, 110],
    line: [88, 72, 61], lab: ['Jul', 'Aug', 'Sep'],
    br: [['Westlands', 95], ['Industrial Area', 86], ['Mombasa Rd', 74], ['Kisumu', 64], ['Eldoret', 47]] },
};
const GOOD = '#12a05c'; const WATCH = '#e5a000'; const POOR = '#e03e3e';
const tone = (v) => (v >= 80 ? GOOD : v >= 55 ? WATCH : POOR);

function Spark({ v, c }) {
  const lo = Math.min(...v); const hi = Math.max(...v); const w = 96; const h = 30;
  const p = v.map((n, i) => [2 + (i * (w - 4)) / Math.max(1, v.length - 1), h - 3 - ((n - lo) / ((hi - lo) || 1)) * (h - 8)]);
  const last = p[p.length - 1];
  return (
    <svg className="dsh__sp" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={p.map((q) => q.join(',')).join(' ')} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.8" fill={c} />
    </svg>
  );
}

export default function Dashboard() {
  const [p, setP] = useState('Month');
  const [hv, setHv] = useState(null);
  const d = SETS[p];
  const top = Math.ceil(Math.max(...d.line) / 10) * 10;
  const W = 520; const H = 170; const L = 40; const R = 16; const B = 28; const T = 12;
  const x = (i) => L + (i * (W - L - R)) / Math.max(1, d.line.length - 1);
  const y = (v) => H - B - (v / top) * (H - B - T);
  const pts = d.line.map((v, i) => [x(i), y(v)]);
  const poly = pts.map((q) => q.join(',')).join(' ');
  return (
    <div className="dsh">
      <div className="dsh__bar">
        <div className="dsh__title"><b>Network health</b><small>All branches · {d.sub}</small></div>
        <span>Sample data</span>
        <div role="tablist" aria-label="Period">{Object.keys(SETS).map((k) => <button key={k} role="tab" aria-selected={p === k} className={p === k ? 'is-on' : ''} onClick={() => { setP(k); setHv(null); }}>{k}</button>)}</div>
      </div>
      <div className="dsh__body">
        <div className="dsh__kpis">
          <div className="dsh__k"><small>Uptime</small><b style={{ color: GOOD }}>{d.up}</b><div><em className="is-good">▲ {d.dUp}</em><Spark v={d.us} c={GOOD} /></div></div>
          <div className="dsh__k"><small>Faults raised</small><b style={{ color: '#e8590c' }}>{d.faults}</b><div><em className="is-good">▼ {d.dF}</em><Spark v={d.line} c="#e8590c" /></div></div>
          <div className="dsh__k"><small>Average fix time</small><b style={{ color: '#1c7ed6' }}>{d.fix}</b><div><em className="is-good">▼ {d.dX}</em><Spark v={d.xs} c="#1c7ed6" /></div></div>
        </div>
        <div className="dsh__grid">
          <div className="dsh__chart">
            <small>Faults over time {hv !== null && <em className="dsh__hv">{d.lab[hv]}: {d.line[hv]}</em>}</small>
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart of faults raised">
              <defs><linearGradient id="dshA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8590c" stopOpacity=".22" /><stop offset="1" stopColor="#e8590c" stopOpacity="0" /></linearGradient></defs>
              {[0, top / 2, top].map((t) => (
                <g key={t}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#e9edf4" /><text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#7c8699">{t}</text></g>
              ))}
              <polygon points={`${L},${H - B} ${poly} ${x(d.line.length - 1)},${H - B}`} fill="url(#dshA)" />
              {hv !== null && <line x1={pts[hv][0]} x2={pts[hv][0]} y1={T} y2={H - B} stroke="#c9d1e0" strokeDasharray="3 3" />}
              <polyline points={poly} fill="none" stroke="#e8590c" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              {pts.map(([px, py], i) => (
                <g key={i} onMouseEnter={() => setHv(i)} onMouseLeave={() => setHv(null)} onFocus={() => setHv(i)} tabIndex="0">
                  <circle cx={px} cy={py} r="16" fill="transparent" />
                  <circle cx={px} cy={py} r={hv === i ? 6.5 : 4.5} fill="#fff" stroke="#e8590c" strokeWidth="2.5" />
                  <text x={px} y={H - 8} textAnchor="middle" fontSize="11" fill="#7c8699">{d.lab[i]}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="dsh__br">
            <small>Response score by branch</small>
            {d.br.map(([n, v]) => (<div key={n}><span>{n}</span><i><u style={{ width: `${v}%`, background: tone(v) }} /></i><b style={{ color: tone(v) }}>{v}</b></div>))}
          </div>
        </div>
        <div className="dsh__foot">
          <span className="dsh__lg"><i style={{ background: GOOD }} />Good 80+</span>
          <span className="dsh__lg"><i style={{ background: WATCH }} />Watch 55–79</span>
          <span className="dsh__lg"><i style={{ background: POOR }} />Poor under 55</span>
          <span className="dsh__live"><i />Refreshed 06:00 from tickets and device logs</span>
        </div>
      </div>
    </div>
  );
}
