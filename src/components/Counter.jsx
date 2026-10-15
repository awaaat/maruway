import { useInView, useCountUp } from '../hooks/motion';
import { STATS } from '../config/site';

function Num({ to, active }) {
  const v = useCountUp(to, active);
  return <>{v.toLocaleString('en-US')}</>;
}
export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  return (
    <div className="stats" ref={ref}>
      {STATS.items.map((s) => (
        <div key={s.label} className="stats__item"><strong><Num to={s.value} active={inView} />+</strong><span>{s.label}</span></div>
      ))}
      <p className="stats__src mono">Company records, {STATS.asOf}. VERIFY definitions before publishing.</p>
    </div>
  );
}
