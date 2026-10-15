import { useEffect, useRef } from 'react';
import { whenReady, scrollDir } from '../lib/motion';

// Fades and lifts content in when it enters the viewport and out again when it leaves,
// so the animation plays scrolling down and again scrolling back up.
// Direction decides whether it arrives from below or above.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let io;
    const off = whenReady(() => {
      io = new IntersectionObserver(
        ([e]) => { el.dataset.dir = scrollDir(); el.dataset.in = e.isIntersecting ? '1' : '0'; },
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      );
      io.observe(el);
    });
    return () => { off(); io?.disconnect(); };
  }, []);
  return (
    <Tag ref={ref} className={`rv ${className}`} style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// Headline that rises in word by word on load (and on every route change).
export function Words({ as: Tag = 'h1', text, delay = 0, className = '', accentFrom }) {
  const words = text.split(' ');
  return (
    <Tag className={`words ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className={`word ${accentFrom !== undefined && i >= accentFrom ? 'is-accent' : ''}`} style={{ '--w': i, '--base': `${delay}ms` }} aria-hidden="true">{w}</span>
      ))}
    </Tag>
  );
}
