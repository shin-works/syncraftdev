export const WORLD_END = 2600;
export const JUMPS = [
  { start: 359, end: 449, height: 51 },
  { start: 679, end: 801, height: 74 },
  { start: 1170, end: 1252, height: 48 },
  { start: 1805, end: 1902, height: 64 },
  { start: 2094, end: 2268, height: 95 },
];
// The bridge is an actual ground surface, using the same cubic curves as the ink.
export function groundAt(x) {
  if (x < 1550 || x > 1740) return 254;
  const right = x > 1645;
  const xs = right ? [1645, 1685, 1705, 1740] : [1550, 1585, 1605, 1645];
  const ys = right ? [209, 209, 228, 254] : [254, 228, 209, 209];
  const bezier = (v, t) => (1-t)**3*v[0] + 3*(1-t)**2*t*v[1] + 3*(1-t)*t*t*v[2] + t**3*v[3];
  let low = 0, high = 1;
  for (let i = 0; i < 15; i++) {
    const mid = (low + high) / 2;
    if (bezier(xs, mid) < x) low = mid; else high = mid;
  }
  return bezier(ys, (low + high) / 2);
}
export function runnerAt(x) {
  let jump = 0, squash = 1, airborne = false, dust = 0;
  for (const obstacle of JUMPS) {
    const u = (x - obstacle.start) / (obstacle.end - obstacle.start);
    if (u >= 0 && u <= 1) {
      jump = 4 * u * (1-u) * obstacle.height;
      airborne = true;
    } else if (x >= obstacle.start - 9 && x < obstacle.start) {
      squash = 1 - .22 * Math.sin(Math.PI * (x - obstacle.start + 9) / 9);
    } else if (x > obstacle.end && x < obstacle.end + 14) {
      const landed = (x - obstacle.end) / 14;
      squash = 1 - .25 * Math.sin(Math.PI * landed);
      dust = Math.sin(Math.PI * landed);
    }
  }
  return { y: groundAt(x) - jump, jump, squash, airborne, dust };
}
export const cameraAt = (x, width) => Math.max(0, Math.min(WORLD_END - width, x - width * .38));
