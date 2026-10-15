import Picture from './Picture';

// Endless logo strip. Logos sit on light chips so dark and coloured marks stay legible on the dark theme.
export default function Marquee({ items, label }) {
  const loop = [...items, ...items];
  return (
    <div className="marq" role="group" aria-label={label}>
      <ul className="marq__track">
        {loop.map((p, i) => (
          <li key={p.name + i} aria-hidden={i >= items.length ? 'true' : undefined}>
            <Picture folder="partners" name={p.image} alt={i >= items.length ? '' : p.name} width={120} height={44} label={p.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
