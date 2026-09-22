import { WORLD_END, groundAt, runnerAt, cameraAt } from './town-model.mjs?v=20260922-3';

const stage = document.querySelector('#town-stage');
const svg = document.querySelector('.town');
const path = document.querySelector('#town-route');
const mask = document.querySelector('#drawing-mask');
const world = document.querySelector('.town-world');
const distance = document.querySelector('.distant-world');
const pen = document.querySelector('.pen-tip');
const controls = document.querySelector('.motion-controls');
const replay = document.querySelector('#replay');
const pause = document.querySelector('#pause');
const playground = document.querySelector('#town-jump');
const pressure = document.querySelector('#pressure-strokes');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const runners = [...document.querySelectorAll('.runner')].map((el, i) => ({
  el, offset: i * 36, scale: [1, .86, .78][i],
  pose: el.querySelector('.runner-pose'), body: el.querySelector('.runner-body'),
  backLeg: el.querySelector('.back-leg'), frontLeg: el.querySelector('.front-leg'),
  backArm: el.querySelector('.back-arm'), frontArm: el.querySelector('.front-arm'),
  shadow: el.querySelector('.runner-shadow'), dust: el.querySelector('.landing-dust'),
}));
const length = path.getTotalLength();
const samples = [];
let frontier = 40;
for (let at = 0; at <= length + 4; at += 4) {
  const p = path.getPointAtLength(Math.min(at, length));
  if (Math.abs(p.y - 254) < 2) frontier = Math.max(frontier, p.x);
  samples.push({ x: p.x, y: p.y, frontier });
}
// Pressure varies along the ink. One path-length mask reveals the pen journey;
// there is no rectangular wipe and no independent window/details reveal.
const strokes = document.createDocumentFragment();
for (let i = 0; i < samples.length - 1; i += 7) {
  const points = samples.slice(i, i + 8);
  const stroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  stroke.setAttribute('d', points.map((p, j) => `${j ? 'L' : 'M'}${p.x.toFixed(2)} ${(p.y + .18 * Math.sin(i + j)).toFixed(2)}`).join(' '));
  const a = points[0], b = points[points.length - 1];
  const horizontal = Math.abs(b.x-a.x) / (Math.hypot(b.x-a.x, b.y-a.y) || 1);
  stroke.setAttribute('stroke-width', String(1.7 + horizontal * 2.4 + 1.6 * Math.sin(i * .17)**2));
  strokes.append(stroke);
}
pressure.append(strokes);
mask.style.strokeDasharray = String(length);
let width = 1440, elapsed = 0, leadX = 42, camera = 0, manualJumpAt = -100;
let paused = false, inView = true, frame = 0, lastTime = 0;
const DRAW_SECONDS = 18;
const RUN_SPEED = 78;

function paint(still = false) {
  const progress = still ? 1 : Math.min(1, elapsed / DRAW_SECONDS);
  mask.style.strokeDashoffset = String(length * (1-progress));
  const tip = path.getPointAtLength(length * progress);
  pen.setAttribute('transform', `translate(${tip.x} ${tip.y})`);
  pen.style.opacity = !still && progress < 1 ? '1' : '0';
  world.setAttribute('transform', `translate(${-camera} 0)`);
  distance.setAttribute('transform', `translate(${-camera * .35} 0)`);
  runners.forEach((r, index) => {
    const x = leadX - r.offset;
    const pose = runnerAt(x);
    const age = elapsed - manualJumpAt - index * .13;
    const manual = !still && age > 0 && age < .82 ? 4 * (age/.82) * (1-age/.82) * 62 : 0;
    const jump = still ? 0 : Math.max(pose.jump, manual);
    const airborne = jump > .5;
    const stride = still || airborne ? 0 : Math.sin(x * .33);
    const bounce = still || airborne ? 0 : -Math.abs(Math.sin(x * .33)) * 1.7;
    const squash = still || manual > 0 ? 1 : pose.squash;
    r.el.setAttribute('transform', `translate(${x} ${groundAt(x)}) scale(${r.scale})`);
    // Scaling the pose inversely keeps every runner's feet above the same obstacles.
    r.pose.setAttribute('transform', `translate(0 ${(-jump + bounce) / r.scale}) scale(${1 / Math.sqrt(squash)} ${squash})`);
    r.body.setAttribute('transform', `rotate(${airborne ? -8 : stride*3} 0 -12)`);
    r.frontLeg.setAttribute('d', airborne ? 'M3-8 9-6 12-9' : `M3-8 ${3+stride*7} -3 ${5+stride*8} 0 h3`);
    r.backLeg.setAttribute('d', airborne ? 'M-3-8-8-5-10-8' : `M-3-8 ${-3-stride*7} -3 ${-5-stride*8} 0 h-3`);
    r.frontArm.setAttribute('d', airborne ? 'M8-18 12-26' : `M8-18 ${12-stride*3} ${-15-stride*4}`);
    r.backArm.setAttribute('d', airborne ? 'M-8-18-12-25' : `M-8-18 ${-12+stride*3} ${-15+stride*4}`);
    r.shadow.setAttribute('rx', String(10 - Math.min(6, jump*.07)));
    r.shadow.style.opacity = String(.12 - Math.min(.07, jump*.001));
    r.dust.style.opacity = still ? '0' : String(pose.dust * .6);
  });
}
function animate(now) {
  frame = 0;
  if (paused || !inView || document.hidden || reduced.matches) return;
  const delta = lastTime ? Math.min(.05, (now-lastTime)/1000) : 0;
  lastTime = now;
  elapsed += delta;
  const sample = samples[Math.min(samples.length-1, Math.floor(length * Math.min(1, elapsed/DRAW_SECONDS) / 4))];
  const safeEdge = elapsed >= DRAW_SECONDS ? WORLD_END + 180 : sample.frontier - 25;
  leadX = Math.min(leadX + RUN_SPEED * delta, Math.max(42, safeEdge));
  camera += (cameraAt(leadX, width)-camera) * (1-Math.exp(-5*delta));
  if (leadX > WORLD_END + 130) { elapsed = 0; leadX = 42; camera = 0; manualJumpAt = -100; }
  paint();
  frame = requestAnimationFrame(animate);
}
function schedule() {
  cancelAnimationFrame(frame);
  frame = 0; lastTime = 0;
  pause.setAttribute('aria-pressed', String(paused));
  pause.setAttribute('aria-label', paused ? pause.dataset.resume : pause.dataset.pause);
  if (!paused && inView && !document.hidden && !reduced.matches) frame = requestAnimationFrame(animate);
}
function resize() {
  width = Math.max(660, Math.min(1440, stage.clientWidth * 1.125));
  svg.setAttribute('viewBox', `0 0 ${width} 310`);
  camera = cameraAt(leadX, width);
  paint(reduced.matches);
}
function preference() {
  controls.hidden = reduced.matches;
  playground.disabled = reduced.matches;
  paused = false;
  elapsed = 0; leadX = reduced.matches ? width * .48 : 42;
  camera = 0; manualJumpAt = -100;
  paint(reduced.matches);
  schedule();
}
replay.addEventListener('click', () => {
  elapsed = 0; leadX = 42; camera = 0; manualJumpAt = -100; paused = false;
  paint(); schedule();
});
pause.addEventListener('click', () => { paused = !paused; schedule(); });
playground.addEventListener('click', () => {
  if (reduced.matches || paused || elapsed - manualJumpAt < .9) return;
  manualJumpAt = elapsed;
});
new ResizeObserver(resize).observe(stage);
new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); }).observe(stage);
document.addEventListener('visibilitychange', schedule);
reduced.addEventListener('change', preference);
resize(); preference();
