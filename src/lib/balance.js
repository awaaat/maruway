// Dominance penalty for photographs.
// Every photo shown on a route is counted. Once a photo has appeared CAP times, further
// decorative slots are given the least-used photo instead, so no single image can take over a page.
// Slots that carry meaning (a non-empty alt) are never swapped.
const uses = new Map();
let path = null;
let tick = 0;

export const CAP = 2;
export const used = (n) => uses.get(n) || 0;

export function syncRoute(p) {
  if (p !== path) { path = p; uses.clear(); tick = 0; }
}

export function claim(n) {
  uses.set(n, used(n) + 1);
  return n;
}

export function leastUsed(pool, not) {
  let best = null;
  let bestScore = Infinity;
  pool.forEach((n, i) => {
    const score = used(n) * 10 + (n === not ? 25 : 0) + ((i + tick) % pool.length) * 0.01;
    if (score < bestScore) { bestScore = score; best = n; }
  });
  tick += 1;
  return best;
}
