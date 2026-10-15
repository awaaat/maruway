import { useState } from 'react';
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {items.map(([q, a], i) => (
        <div key={q} className={`acc__i ${open === i ? 'is-open' : ''}`}>
          <button type="button" className="acc__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span className="pm" /></button>
          <div className="acc__a"><div><p>{a}</p></div></div>
        </div>
      ))}
    </div>
  );
}
