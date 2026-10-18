// Draws the service illustrations (public/images/leistungen/<key>.svg).
// Run once after changing a scene: node site/illustrations.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/images/leistungen');

const C = {
    bg: '#0e1420',
    floor: '#111827',
    panel: '#1e293b',
    line: '#334155',
    mid: '#475569',
    steel: '#64748b',
    mist: '#94a3b8',
    light: '#cbd5e1',
    white: '#e2e8f0',
    dark: '#0b0f17',
    orange: '#ff6b00',
    orangeSoft: '#ff8a33',
    green: '#10b981',
    greenSoft: '#34d399',
    greenDeep: '#047857',
    blue: '#38bdf8',
    yellow: '#facc15',
    skin: '#d9a77c',
    brick: '#8a4b36',
    brickDark: '#7d4433',
    concrete: '#5b6575',
};

// Seeded random so the drawings stay the same on every run.
let seed = 1;
const rnd = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const r = (a, b) => a + rnd() * (b - a);
const n = (v) => Math.round(v * 10) / 10;
const times = (count, fn) => Array.from({ length: count }, (_, i) => fn(i)).join('');
const mono = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';

function frame(label, accent, body, floor = C.floor) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="${label}">
<defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".045"/></pattern></defs>
<rect width="800" height="500" fill="${C.bg}"/><rect width="800" height="430" fill="url(#grid)"/>
<rect y="430" width="800" height="70" fill="${floor}"/><path d="M0 430H800" stroke="${C.line}" stroke-width="2"/>
${body}
<g transform="translate(28 28)"><rect width="${label.length * 10.4 + 30}" height="30" fill="${C.bg}" fill-opacity=".88" stroke="${accent}" stroke-opacity=".6"/><rect width="4" height="30" fill="${accent}"/><text x="17" y="20" font-family="${mono}" font-size="13" letter-spacing="2.5" fill="${C.white}">${label}</text></g>
</svg>`;
}

// Arm from shoulder to hand, bent at the elbow when the hand is closer than the arm length.
function arm(sx, sy, hx, hy, len = 76) {
    const dx = hx - sx;
    const dy = hy - sy;
    const d = Math.hypot(dx, dy) || 1;
    let ex = (sx + hx) / 2;
    let ey = (sy + hy) / 2;
    if (d < len) {
        const h = Math.sqrt((len / 2) ** 2 - (d / 2) ** 2);
        let px = -dy / d;
        let py = dx / d;
        if (py < 0) [px, py] = [-px, -py];
        ex += px * h;
        ey += py * h;
    }
    return `M${n(sx)} ${n(sy)}L${n(ex)} ${n(ey)}L${n(hx)} ${n(hy)}`;
}

/**
 * A worker standing with feet at (x, y). hands = [back hand, front hand]; dir 1 faces right, -1 left.
 * Returns the body and the hands separately so a tool can be drawn between them.
 */
function person({ x, y = 430, top, hat = 'helmet', hatColor = C.white, hands, dir = 1, stride = 12, stripe = true, gloves = C.skin }) {
    const pants = '#3a4558';
    const sh = y - 110;
    const [back, front] = hands;
    const sleeve = (h, xs) => `<path d="${arm(xs, sh, h[0], h[1])}" fill="none" stroke="${top}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    const hatSvg =
        hat === 'helmet'
            ? `<path d="M${x - 15} ${y - 139}a15 15 0 0 1 30 0z" fill="${hatColor}"/><path d="M${x - 18} ${y - 139}h36" stroke="${hatColor}" stroke-width="4" stroke-linecap="round"/>`
            : `<path d="M${x - 13} ${y - 141}a13 11 0 0 1 26 0z" fill="${hatColor}"/><path d="M${x} ${y - 141}h${dir * 22}" stroke="${hatColor}" stroke-width="4" stroke-linecap="round"/>`;
    const body = `<g>
<path d="M${x - 6} ${y - 62}L${x - stride} ${y - 5}M${x + 6} ${y - 62}L${x + stride} ${y - 5}" stroke="${pants}" stroke-width="12" stroke-linecap="round"/>
<path d="M${x - stride - 5 + dir * 4} ${y - 4}h14M${x + stride - 5 + dir * 4} ${y - 4}h14" stroke="#1f2937" stroke-width="8" stroke-linecap="round"/>
${sleeve(back, x - dir * 8)}
<rect x="${x - 17}" y="${y - 121}" width="34" height="64" rx="11" fill="${top}"/>
${stripe ? `<path d="M${x - 17} ${y - 90}h34M${x - 17} ${y - 76}h34" stroke="${C.white}" stroke-opacity=".7" stroke-width="3.5"/>` : `<path d="M${x - 17} ${y - 62}h34" stroke="#000" stroke-opacity=".2" stroke-width="6"/>`}
<rect x="${x - 5}" y="${y - 126}" width="10" height="8" fill="${C.skin}"/>
<circle cx="${x}" cy="${y - 137}" r="13" fill="${C.skin}"/>
<circle cx="${x + dir * 7}" cy="${y - 138}" r="1.7" fill="#1e293b"/>
${hatSvg}
${sleeve(front, x + dir * 8)}
</g>`;
    const handsSvg = [back, front].map(([hx, hy]) => `<circle cx="${n(hx)}" cy="${n(hy)}" r="5.5" fill="${gloves}"/>`).join('');
    return { body, hands: handsSvg };
}

const sparkle = (x, y, s = 10, c = C.white, o = 0.9) =>
    `<path d="M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}z" fill="${c}" fill-opacity="${o}"/>`;

const bucket = (x, y, c = C.blue) =>
    `<path d="M${x - 20} ${y - 38}q20 -26 40 0" fill="none" stroke="${C.mist}" stroke-width="2.5"/><path d="M${x - 22} ${y - 38}h44l-5 38h-34z" fill="${c}"/><path d="M${x - 24} ${y - 38}h48" stroke="${C.white}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>`;

// Yellow "Rutschgefahr" A-frame sign.
const wetSign = (x, y = 430) =>
    `<path d="M${x - 24} ${y}L${x - 8} ${y - 72}h16L${x + 24} ${y}" fill="none" stroke="#ca8a04" stroke-width="5" stroke-linejoin="round"/><path d="M${x - 18} ${y - 10}L${x - 6} ${y - 64}h12l12 54z" fill="${C.yellow}"/><path d="M${x} ${y - 52}v18" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/><circle cx="${x}" cy="${y - 24}" r="3" fill="#1e293b"/>`;

// Mop: handle from (tx, ty) down to the head at (mx, my); wide = flat floor mop.
const mop = (tx, ty, mx, my, wide = 56) =>
    `<path d="M${tx} ${ty}L${mx} ${my - 8}" stroke="${C.steel}" stroke-width="5" stroke-linecap="round"/><rect x="${mx - wide / 2}" y="${my - 9}" width="${wide}" height="7" rx="2" fill="${C.light}"/><path d="M${mx - wide / 2 + 2} ${my - 2}h${wide - 4}" stroke="${C.white}" stroke-width="5" stroke-dasharray="3 2"/>`;

// Spray bottle held at (hx, hy), nozzle pointing in dir; mist drifts toward the nozzle side.
const spray = (hx, hy, dir = 1, mist = true) => {
    const nx = hx + dir * 18;
    const ny = hy - 13;
    return `<rect x="${hx - 8}" y="${hy - 3}" width="16" height="30" rx="4" fill="${C.blue}"/><rect x="${hx - 5}" y="${hy + 6}" width="10" height="10" fill="${C.white}" fill-opacity=".8"/><path d="M${hx - 5} ${hy - 3}v-12h${dir * 22}v6h${-dir * 11}v6z" fill="${C.white}"/>${
        mist ? times(9, (i) => `<circle cx="${n(nx + dir * r(8, 48))}" cy="${n(ny + r(-14, 16) + i * 0.4)}" r="${n(r(1.5, 3.5))}" fill="${C.white}" fill-opacity="${n(r(0.2, 0.55))}"/>`) : ''
    }`;
};

// Cleaning trolley at x (left edge), standing on y.
const cart = (x, y = 430) => `<g>
<path d="M${x + 10} ${y - 10}V${y - 128}M${x + 130} ${y - 10}V${y - 128}" stroke="${C.steel}" stroke-width="5"/>
<rect x="${x + 6}" y="${y - 132}" width="128" height="8" rx="2" fill="${C.steel}"/>
<rect x="${x + 6}" y="${y - 30}" width="128" height="8" rx="2" fill="${C.steel}"/>
<path d="M${x + 132} ${y - 124}c14 4 16 40 12 80c-2 14 -24 14 -26 0c-3 -40 -2 -76 14 -80z" fill="#374151"/>
${bucket(x + 40, y - 30, C.blue)}${bucket(x + 92, y - 30, '#ef4444')}
<rect x="${x + 18}" y="${y - 158}" width="14" height="26" rx="3" fill="${C.greenSoft}"/><rect x="${x + 21}" y="${y - 164}" width="8" height="6" fill="${C.white}"/>
<rect x="${x + 38}" y="${y - 152}" width="14" height="20" rx="3" fill="${C.yellow}"/><rect x="${x + 41}" y="${y - 158}" width="8" height="6" fill="${C.white}"/>
<rect x="${x + 58}" y="${y - 160}" width="14" height="28" rx="3" fill="${C.blue}"/><rect x="${x + 61}" y="${y - 166}" width="8" height="6" fill="${C.white}"/>
<path d="M${x + 100} ${y - 132}L${x + 86} ${y - 230}" stroke="${C.steel}" stroke-width="5" stroke-linecap="round"/>
<circle cx="${x + 18}" cy="${y - 8}" r="8" fill="#111827" stroke="${C.mist}" stroke-width="3"/><circle cx="${x + 122}" cy="${y - 8}" r="8" fill="#111827" stroke="${C.mist}" stroke-width="3"/>
</g>`;

// Glossy floor: soft diagonal reflections between x0 and x1.
const shine = (x0, x1, count = 6) =>
    times(count, (i) => {
        const x = x0 + ((x1 - x0) / count) * (i + 0.3);
        return `<path d="M${n(x)} 496L${n(x + 46)} 434" stroke="#fff" stroke-opacity=".06" stroke-width="${n(r(8, 18))}"/>`;
    });

const dust = (cx, cy, spread, count, o = 0.45) =>
    times(count, () => `<circle cx="${n(cx + r(-spread, spread))}" cy="${n(cy + r(-spread * 0.6, spread * 0.6))}" r="${n(r(2, 7))}" fill="${C.mist}" fill-opacity="${n(r(0.1, o))}"/>`);

// ---------------------------------------------------------------- Abbruch & Rückbau

function abbruch() {
    seed = 11;
    const edge = 'M478 122L488 160 470 192 506 222 486 258 520 286 506 322 546 350 526 378 552 404 568 430';
    let bricks = '';
    for (let row = 0; row < 13; row++) {
        const y = 122 + row * 24;
        for (let x = 360 + (row % 2 ? -32 : 0); x < 800; x += 64) bricks += `<rect x="${x}" y="${y}" width="62" height="22" fill="${rnd() < 0.3 ? C.brickDark : C.brick}"/>`;
    }
    const rubble =
        `<path d="M372 430Q440 384 540 398Q610 406 640 430z" fill="#4b4038"/>` +
        times(26, () => {
            const x = r(392, 610);
            const y = r(398, 424);
            return rnd() < 0.6
                ? `<rect x="${n(x)}" y="${n(y)}" width="30" height="13" fill="${rnd() < 0.5 ? C.brick : C.brickDark}" transform="rotate(${n(r(-35, 35))} ${n(x + 15)} ${n(y + 6)})"/>`
                : `<path d="M${n(x)} ${n(y)}l${n(r(8, 16))} -${n(r(6, 12))} ${n(r(8, 14))} ${n(r(4, 10))}z" fill="${C.steel}"/>`;
        });
    const w = person({ x: 300, top: C.orange, hatColor: C.white, hands: [[357, 344], [408, 331]] });
    const hammer = `<rect x="350" y="322" width="11" height="44" rx="4" fill="#111827"/><rect x="360" y="330" width="94" height="27" rx="6" fill="#1f2937" stroke="${C.steel}" stroke-width="2"/><rect x="374" y="337" width="58" height="6" fill="${C.orange}"/><rect x="454" y="337" width="22" height="11" fill="${C.steel}"/><path d="M476 342.5H532" stroke="${C.light}" stroke-width="5" stroke-linecap="round"/>`;
    const barrow = `<path d="M118 400L60 386" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/><path d="M134 402l-6 28M206 402l6 28" stroke="#6b7280" stroke-width="5"/>
${times(9, () => {
    const x = r(110, 210);
    return `<rect x="${n(x)}" y="${n(r(346, 358))}" width="26" height="12" fill="${rnd() < 0.5 ? C.brick : C.steel}" transform="rotate(${n(r(-25, 25))} ${n(x + 13)} 356)"/>`;
})}
<path d="M95 362H237L216 404H118z" fill="${C.mid}" stroke="${C.steel}" stroke-width="3" stroke-linejoin="round"/><circle cx="232" cy="412" r="17" fill="#111827" stroke="${C.mist}" stroke-width="4"/>`;
    return frame(
        'ABBRUCHARBEITEN',
        C.orange,
        `<rect x="330" y="96" width="470" height="26" fill="${C.mid}"/>
<clipPath id="wall"><path d="${edge}H800V122z"/></clipPath>
<g clip-path="url(#wall)">${bricks}</g>
<path d="${edge}" fill="none" stroke="#c2410c" stroke-opacity=".55" stroke-width="3"/>
<rect x="452" y="198" width="30" height="13" fill="${C.brick}" transform="rotate(-28 467 204)"/><rect x="496" y="300" width="30" height="13" fill="${C.brickDark}" transform="rotate(22 511 306)"/>
${rubble}${barrow}${w.body}${hammer}${w.hands}
${dust(536, 342, 30, 22)}${times(5, () => `<rect x="${n(r(536, 590))}" y="${n(r(300, 340))}" width="7" height="5" fill="${C.brick}" transform="rotate(${n(r(0, 90))} 560 320)"/>`)}`,
    );
}

function entkernung() {
    seed = 22;
    const studs = times(12, (i) => `<rect x="${100 + i * 60}" y="160" width="8" height="270" fill="${C.steel}"/>`);
    const tiles = times(3, (i) => `<rect x="${600 + i * 66}" y="150" width="62" height="9" fill="${C.light}"/>`);
    const w = person({ x: 410, dir: -1, stride: 18, top: C.orange, hatColor: C.white, hands: [[440, 322], [366, 327]] });
    const board = `<rect x="300" y="316" width="178" height="15" fill="${C.light}" stroke="${C.mist}" stroke-width="2" transform="rotate(-5 390 323)"/>`;
    const bigBag = `<path d="M64 336H204L197 430H71z" fill="#e5e7eb" stroke="#9ca3af" stroke-width="3" stroke-linejoin="round"/><path d="M70 336q10 -22 22 0M176 336q12 -22 22 0" fill="none" stroke="#9ca3af" stroke-width="4"/>
${times(12, () => `<path d="M${n(r(78, 182))} 340l${n(r(8, 18))} -${n(r(8, 18))} ${n(r(8, 16))} ${n(r(6, 18))}z" fill="${rnd() < 0.5 ? C.light : C.steel}"/>`)}
<path d="M88 370h96" stroke="#9ca3af" stroke-width="2" stroke-dasharray="6 6"/>`;
    const floorTiles = `<rect x="470" y="432" width="330" height="68" fill="#3b4656"/>${times(10, (i) => `<path d="M${470 + i * 34} 432v68" stroke="${C.floor}" stroke-width="2"/>`)}<path d="M470 455H800M470 478H800" stroke="${C.floor}" stroke-width="2"/>`;
    const shards = times(16, () => {
        const x = r(30, 460);
        const y = r(440, 492);
        return `<rect x="${n(x)}" y="${n(y)}" width="${n(r(8, 18))}" height="${n(r(4, 8))}" fill="#3b4656" transform="rotate(${n(r(-40, 40))} ${n(x)} ${n(y)})"/>`;
    });
    return frame(
        'ENTKERNUNG',
        C.orange,
        `<rect y="80" width="800" height="34" fill="${C.concrete}"/>${times(30, () => `<circle cx="${n(r(0, 800))}" cy="${n(r(84, 110))}" r="1.5" fill="${C.light}" fill-opacity=".35"/>`)}
${times(9, (i) => `<path d="M${120 + i * 80} 114V150" stroke="${C.mist}" stroke-opacity=".6" stroke-width="1.5"/>`)}
<rect x="590" y="146" width="210" height="4" fill="${C.mist}"/>${tiles}
<rect x="470" y="168" width="64" height="9" fill="${C.light}" transform="rotate(38 470 168)"/>
<rect x="90" y="156" width="710" height="6" fill="${C.steel}"/>${studs}<rect x="90" y="424" width="710" height="6" fill="${C.steel}"/>
<path d="M90 230C200 250 300 210 420 236S620 220 800 240" fill="none" stroke="${C.orangeSoft}" stroke-opacity=".6" stroke-width="3"/>
<rect x="656" y="162" width="144" height="262" fill="${C.light}" fill-opacity=".92"/>${times(8, (i) => `<circle cx="${664 + (i % 2) * 120}" cy="${180 + Math.floor(i / 2) * 64}" r="2" fill="${C.steel}"/>`)}
<rect x="590" y="176" width="56" height="246" fill="${C.light}" fill-opacity=".85" transform="rotate(-7 618 422)"/>
<g transform="rotate(-9 250 430)"><rect x="232" y="250" width="16" height="180" fill="${C.light}"/><rect x="250" y="262" width="16" height="168" fill="#b6c2d1"/></g>
${floorTiles}${shards}${bigBag}${w.body}${board}${w.hands}`,
    );
}

function rueckbau() {
    seed = 33;
    const bins = [
        ['HOLZ', '#6b4a2b', () => times(4, (i) => `<rect x="${n(56 + i * 20)}" y="${n(r(318, 330))}" width="10" height="44" fill="#b45309" transform="rotate(${n(r(-20, 20))} ${61 + i * 20} 350)"/>`)],
        ['METALL', C.mid, () => times(5, (i) => `<rect x="${n(176 + i * 16)}" y="${n(r(300, 320))}" width="5" height="60" fill="${C.light}" transform="rotate(${n(r(-18, 18))} ${178 + i * 16} 350)"/>`)],
        ['GIPS', '#7b8798', () => times(3, (i) => `<rect x="${n(294 + i * 26)}" y="${n(r(320, 330))}" width="24" height="34" fill="${C.white}" transform="rotate(${n(r(-15, 15))} ${306 + i * 26} 350)"/>`)],
        ['BAUSCHUTT', '#6e3b2c', () => times(7, (i) => `<rect x="${n(410 + i * 13)}" y="${n(r(334, 344))}" width="22" height="11" fill="${i % 2 ? C.brick : C.steel}" transform="rotate(${n(r(-30, 30))} ${421 + i * 13} 340)"/>`)],
    ];
    const binSvg = bins
        .map(([label, color, items], i) => {
            const x = 44 + i * 120;
            return `${items()}<path d="M${x} 350h108l-7 80h-94z" fill="${color}"/><rect x="${x - 3}" y="346" width="114" height="8" fill="#000" fill-opacity=".25"/><text x="${x + 54}" y="398" text-anchor="middle" font-family="${mono}" font-size="11" letter-spacing="1.5" fill="${C.white}">${label}</text>`;
        })
        .join('');
    const pane = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.blue}" fill-opacity=".14"/><path d="M${x + 10} ${y + h - 20}L${x + w - 20} ${y + 14}" stroke="#fff" stroke-opacity=".12" stroke-width="6"/>`;
    const w = person({ x: 620, dir: -1, stride: 18, top: C.orange, hatColor: C.white, hands: [[650, 318], [590, 322]] });
    return frame(
        'RÜCKBAU',
        C.orange,
        `${pane(484, 152, 80, 46)}${pane(584, 152, 80, 46)}${pane(684, 152, 76, 46)}${pane(484, 210, 80, 214)}${pane(684, 210, 76, 214)}
<rect x="476" y="144" width="292" height="286" fill="none" stroke="${C.mist}" stroke-width="8"/><path d="M574 144V430M674 144V430M476 204H768" stroke="${C.mist}" stroke-width="7"/>
<rect x="590" y="236" width="74" height="190" fill="${C.blue}" fill-opacity=".14" stroke="${C.mist}" stroke-width="3" transform="rotate(-12 590 426)"/>
${binSvg}${w.body}<rect x="520" y="310" width="200" height="6" fill="${C.light}" transform="rotate(4 620 313)"/>${w.hands}
<path d="M560 268q-40 -30 -96 -6" fill="none" stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 6"/><path d="M462 254l-6 12 13 2" fill="none" stroke="${C.orange}" stroke-width="3"/>`,
    );
}

function kernbohrungen() {
    seed = 44;
    const rebar = times(9, (i) => `<circle cx="534" cy="${120 + i * 36}" r="4" fill="#1f2937" stroke="${C.mist}" stroke-width="1.5"/><circle cx="598" cy="${120 + i * 36}" r="4" fill="#1f2937" stroke="${C.mist}" stroke-width="1.5"/>`);
    const w = person({ x: 320, top: C.orange, hatColor: C.white, hands: [[396, 302], [426, 322]] });
    const rig = `<rect x="506" y="206" width="12" height="176" fill="#374151"/><circle cx="512" cy="222" r="3" fill="${C.mist}"/><circle cx="512" cy="366" r="3" fill="${C.mist}"/>
<rect x="482" y="216" width="26" height="10" fill="#374151"/><rect x="482" y="362" width="26" height="10" fill="#374151"/>
<rect x="470" y="196" width="13" height="196" fill="${C.mist}"/>
<rect x="520" y="265" width="50" height="30" fill="${C.dark}"/>
<rect x="462" y="274" width="30" height="12" fill="${C.steel}"/>
<rect x="490" y="268" width="78" height="24" fill="${C.light}" stroke="${C.mist}" stroke-width="2"/>${times(4, (i) => `<rect x="563" y="${268 + i * 7}" width="6" height="4" fill="#1f2937"/>`)}
<rect x="460" y="258" width="32" height="44" rx="4" fill="#374151"/>
<rect x="378" y="252" width="84" height="56" rx="7" fill="${C.orange}"/><path d="M392 266v28M402 266v28M412 266v28" stroke="#000" stroke-opacity=".25" stroke-width="4"/><rect x="384" y="244" width="40" height="10" rx="4" fill="#1f2937"/>
<circle cx="430" cy="330" r="17" fill="none" stroke="${C.mist}" stroke-width="4"/><path d="M430 313v34M413 330h34" stroke="${C.mist}" stroke-width="3"/><path d="M444 320l20 -14" stroke="${C.mist}" stroke-width="4"/>`;
    const water = `<path d="M398 308C392 360 320 404 190 430" fill="none" stroke="${C.blue}" stroke-width="4"/>${times(6, (i) => `<circle cx="${n(r(514, 522))}" cy="${296 + i * 9}" r="${n(r(2, 3.5))}" fill="${C.blue}" fill-opacity=".7"/>`)}<path d="M500 430q14 -8 30 0" fill="${C.blue}" fill-opacity=".4"/>`;
    const core = `<rect x="150" y="402" width="96" height="27" rx="3" fill="${C.concrete}"/>${times(10, () => `<circle cx="${n(r(156, 240))}" cy="${n(r(406, 426))}" r="1.5" fill="${C.light}" fill-opacity=".4"/>`)}<ellipse cx="246" cy="415.5" rx="7" ry="13.5" fill="#6b7280"/><circle cx="246" cy="420" r="2" fill="#1f2937"/>`;
    return frame(
        'KERNBOHRUNGEN',
        C.orange,
        `<rect y="70" width="800" height="26" fill="${C.concrete}"/>
<rect x="520" y="96" width="92" height="334" fill="${C.concrete}"/>${times(60, () => `<circle cx="${n(r(522, 610))}" cy="${n(r(98, 428))}" r="${n(r(1, 2.2))}" fill="${C.light}" fill-opacity=".3"/>`)}${rebar}
<rect x="520" y="137" width="92" height="30" fill="${C.dark}"/><rect x="380" y="142" width="420" height="20" fill="${C.orangeSoft}"/><rect x="510" y="138" width="8" height="28" fill="${C.orange}"/><rect x="614" y="138" width="8" height="28" fill="${C.orange}"/>
<path d="M800 162V400" stroke="${C.orangeSoft}" stroke-width="0"/>
${water}${core}${w.body}${rig}${w.hands}`,
    );
}

// ---------------------------------------------------------------- Reinigung

const cleaner = (opts) => person({ top: C.green, hat: 'cap', hatColor: C.greenDeep, stripe: false, ...opts });

function unterhaltsreinigung() {
    seed = 55;
    const cells = times(28, (i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const x = 478 + col * 33;
        const y = 162 + row * 34;
        const done = [0, 2, 4].includes(col) && (row < 3 || col === 0);
        return `<rect x="${x}" y="${y}" width="29" height="30" fill="${C.line}" fill-opacity=".6"/>${done ? `<path d="M${x + 7} ${y + 15}l6 6 11 -12" fill="none" stroke="${C.greenSoft}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
    });
    const w = cleaner({ x: 420, hands: [[446, 330], [468, 360]] });
    return frame(
        'UNTERHALTSREINIGUNG',
        C.green,
        `<rect x="470" y="116" width="244" height="190" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/><rect x="470" y="116" width="244" height="36" fill="${C.green}"/>
<text x="484" y="139" font-family="${mono}" font-size="12" letter-spacing="2" fill="${C.white}">REINIGUNGSPLAN</text>${cells}
<g fill="none" stroke="${C.greenSoft}" stroke-width="4" stroke-linecap="round"><path d="M738 150a24 24 0 1 1 -6 -16"/><path d="M736 124l-4 12 12 2"/></g>
<rect x="40" y="200" width="90" height="230" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/><circle cx="118" cy="320" r="4" fill="${C.mist}"/>
${shine(300, 800, 8)}${cart(170)}${w.body}${mop(436, 300, 500, 430, 64)}${w.hands}
${sparkle(560, 462, 9)}${sparkle(640, 476, 7)}${sparkle(720, 452, 10)}`,
    );
}

function bueroreinigung() {
    seed = 66;
    const city = times(7, (i) => {
        const h = r(30, 70);
        return `<rect x="${78 + i * 32}" y="${n(324 - h)}" width="28" height="${n(h)}" fill="#16233a"/>${times(3, (j) => (rnd() < 0.6 ? `<rect x="${84 + i * 32 + (j % 2) * 10}" y="${n(330 - h + j * 12)}" width="5" height="5" fill="#fde68a" fill-opacity=".8"/>` : ''))}`;
    });
    const w = cleaner({ x: 380, hands: [[414, 288], [452, 314]] });
    return frame(
        'BÜROREINIGUNG',
        C.green,
        `<rect x="70" y="120" width="232" height="210" fill="#0b1a33"/>${times(14, () => `<circle cx="${n(r(80, 290))}" cy="${n(r(130, 230))}" r="1.2" fill="#fff" fill-opacity=".6"/>`)}
<circle cx="250" cy="168" r="17" fill="#fde68a"/><circle cx="259" cy="162" r="15" fill="#0b1a33"/>${city}
<rect x="70" y="120" width="232" height="210" fill="none" stroke="${C.steel}" stroke-width="6"/><path d="M186 120V330" stroke="${C.steel}" stroke-width="5"/>
<circle cx="380" cy="160" r="23" fill="${C.panel}" stroke="${C.mist}" stroke-width="3"/><path d="M380 160V146M380 160l9 7" stroke="${C.white}" stroke-width="3" stroke-linecap="round"/>
<rect x="520" y="236" width="104" height="66" rx="3" fill="#111827" stroke="${C.steel}" stroke-width="4"/><rect x="567" y="302" width="10" height="16" fill="${C.steel}"/><rect x="547" y="314" width="50" height="5" fill="${C.steel}"/>
<rect x="490" y="313" width="64" height="6" rx="2" fill="${C.mid}"/><rect x="650" y="298" width="16" height="20" rx="3" fill="${C.white}"/>
<rect x="430" y="318" width="270" height="12" fill="#a8a29e"/><rect x="440" y="330" width="8" height="100" fill="#78716c"/><rect x="600" y="330" width="94" height="100" fill="#57534e"/><path d="M612 362h70M612 396h70" stroke="#44403c" stroke-width="3"/>
<rect x="462" y="388" width="40" height="42" fill="#374151"/>
<rect x="716" y="356" width="56" height="10" rx="3" fill="${C.mid}"/><rect x="760" y="288" width="12" height="70" rx="4" fill="${C.mid}"/><path d="M744 366v44M720 428h48" stroke="${C.steel}" stroke-width="5" stroke-linecap="round"/>
${w.body}${spray(414, 288, 1)}<rect x="440" y="310" width="26" height="8" rx="2" fill="${C.greenSoft}"/>${w.hands}
${sparkle(500, 300, 8)}${sparkle(680, 290, 7)}`,
    );
}

function grundreinigung() {
    seed = 77;
    const dirt = times(14, () => `<ellipse cx="${n(r(30, 370))}" cy="${n(r(440, 492))}" rx="${n(r(12, 34))}" ry="${n(r(3, 7))}" fill="#6b4f2a" fill-opacity="${n(r(0.25, 0.5))}"/>`);
    const machine = `<path d="M490 300L432 418" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/><path d="M476 290l30 12" stroke="#1f2937" stroke-width="8" stroke-linecap="round"/>
<path d="M494 306C540 330 560 400 600 430" fill="none" stroke="${C.orangeSoft}" stroke-opacity=".7" stroke-width="3"/>
<path d="M406 428q24 -34 50 0z" fill="${C.mist}"/><path d="M374 434h112a8 8 0 0 0 -8 -10h-96a8 8 0 0 0 -8 10z" fill="${C.light}"/><rect x="380" y="426" width="100" height="4" fill="${C.green}"/><ellipse cx="430" cy="436" rx="54" ry="5" fill="#1f2937"/>`;
    const w = cleaner({ x: 540, dir: -1, hands: [[504, 300], [484, 296]] });
    return frame(
        'GRUNDREINIGUNG',
        C.green,
        `<rect x="610" y="220" width="84" height="210" fill="${C.panel}" stroke="${C.line}" stroke-width="3"/><circle cx="622" cy="330" r="4" fill="${C.mist}"/>
<rect y="416" width="800" height="14" fill="${C.panel}"/>
<rect x="400" y="432" width="400" height="68" fill="#15233a"/>${shine(420, 800, 7)}${dirt}
${times(6, () => `<path d="M${n(r(30, 360))} ${n(r(445, 490))}l${n(r(20, 40))} ${n(r(-4, 4))}" stroke="#000" stroke-opacity=".35" stroke-width="2"/>`)}
${bucket(680, 430, C.blue)}${wetSign(752)}${w.body}${machine}${w.hands}
${sparkle(520, 466, 10)}${sparkle(610, 484, 8)}${sparkle(700, 460, 11)}${sparkle(770, 486, 7)}`,
    );
}

function treppenhausreinigung() {
    seed = 88;
    const top = (k) => 430 - 24 * (k + 1);
    let stairs = 'M230 430';
    for (let k = 0; k < 10; k++) stairs += `V${top(k)}H${270 + k * 40}`;
    stairs += 'H800V214H630L254 430z';
    const nosings = times(10, (k) => `<path d="M${230 + k * 40} ${top(k)}h40" stroke="${C.steel}" stroke-width="3"/>`);
    const balusters = times(10, (k) => `<path d="M${250 + k * 40} ${top(k)}V${n(top(k) - 64)}" stroke="${C.mist}" stroke-width="2"/>`);
    const boxes = times(9, (i) => `<rect x="${46 + (i % 3) * 40}" y="${252 + Math.floor(i / 3) * 30}" width="34" height="24" fill="${C.mid}"/><path d="M${54 + (i % 3) * 40} ${260 + Math.floor(i / 3) * 30}h18" stroke="${C.dark}" stroke-width="3"/>`);
    const w = cleaner({ x: 410, y: 310, hands: [[436, 216], [452, 238]] });
    return frame(
        'TREPPENHAUSREINIGUNG',
        C.green,
        `${boxes}
<rect x="680" y="64" width="72" height="126" fill="${C.mid}" stroke="${C.steel}" stroke-width="3"/><circle cx="740" cy="132" r="3.5" fill="${C.light}"/><rect x="704" y="82" width="24" height="8" fill="${C.light}"/><rect x="670" y="186" width="92" height="4" fill="${C.greenDeep}"/>
<path d="${stairs}" fill="${C.line}"/>${nosings}${balusters}
<path d="M236 ${top(0) - 64}L636 ${top(9) - 64}H800" fill="none" stroke="${C.mist}" stroke-width="5" stroke-linecap="round"/><path d="M630 ${top(9)}H800" stroke="${C.steel}" stroke-width="3"/>
${bucket(330, top(2), C.blue)}${wetSign(150)}
${w.body}${mop(424, 194, 492, top(6), 50)}${w.hands}
${sparkle(262, top(0) + 12, 8)}${sparkle(300, top(1) + 10, 7)}${sparkle(390, top(4) + 12, 6, C.white, 0.7)}`,
    );
}

function baureinigung() {
    seed = 99;
    const debris =
        `<path d="M110 430Q160 396 230 406Q262 412 276 430z" fill="#4b4038"/>` +
        times(12, () => {
            const x = r(120, 260);
            return `<rect x="${n(x)}" y="${n(r(400, 420))}" width="${n(r(14, 26))}" height="${n(r(6, 11))}" fill="${rnd() < 0.5 ? C.light : '#a16207'}" transform="rotate(${n(r(-30, 30))} ${n(x)} 410)"/>`;
        });
    const wires = `<circle cx="600" cy="250" r="11" fill="${C.dark}" stroke="${C.steel}" stroke-width="3"/><path d="M596 258q-6 30 4 44M600 260q4 26 -4 40M604 258q10 22 6 36" fill="none" stroke="${C.orangeSoft}" stroke-width="2"/>`;
    const ladder = `<path d="M676 190L646 430M676 190L716 430" stroke="${C.mist}" stroke-width="5"/>${times(5, (i) => `<path d="M${n(670 - i * 5.5)} ${226 + i * 40}h${n(12 + i * 11)}" stroke="${C.mist}" stroke-width="4"/>`)}`;
    const vacuum = `<rect x="524" y="352" width="58" height="72" rx="10" fill="${C.mid}"/><rect x="520" y="344" width="66" height="14" rx="5" fill="${C.green}"/><circle cx="534" cy="426" r="6" fill="#111827"/><circle cx="572" cy="426" r="6" fill="#111827"/>
<path d="M524 370C480 360 440 300 412 336" fill="none" stroke="#1f2937" stroke-width="7"/>`;
    const w = cleaner({ x: 444, dir: -1, hat: 'helmet', hatColor: C.green, stripe: true, hands: [[401, 349], [382, 371]] });
    return frame(
        'BAUREINIGUNG',
        C.green,
        `<rect y="96" width="800" height="320" fill="#151b26"/>${times(40, () => `<circle cx="${n(r(0, 800))}" cy="${n(r(100, 410))}" r="${n(r(1, 2.5))}" fill="${C.mist}" fill-opacity=".18"/>`)}
<rect x="120" y="150" width="180" height="170" fill="${C.dark}" stroke="#2b3443" stroke-width="6"/><path d="M126 156h168v158h-168z" fill="${C.white}" fill-opacity=".08"/><path d="M150 156q12 80 -4 158M200 156q-14 70 6 158M250 156q14 90 -2 158" fill="none" stroke="${C.white}" stroke-opacity=".14" stroke-width="3"/>
${wires}${ladder}
<rect x="732" y="392" width="40" height="38" fill="${C.white}"/><rect x="728" y="386" width="48" height="8" fill="${C.mist}"/><path d="M736 402h32" stroke="${C.blue}" stroke-width="4"/>
<path d="M40 430c-4 -40 2 -64 20 -70c18 6 24 30 18 70z" fill="#d6d3d1"/><path d="M58 360l-6 -10 14 2z" fill="#a8a29e"/>
<path d="M612 430L640 296" stroke="#a16207" stroke-width="5"/><path d="M604 430h20l-4 -14h-12z" fill="#1f2937"/>
${debris}
<rect x="440" y="432" width="360" height="68" fill="#17202e"/>${dust(250, 440, 120, 40, 0.35)}${dust(330, 410, 40, 16, 0.4)}
${vacuum}${w.body}<path d="M414 334L336 426" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/><rect x="306" y="424" width="56" height="7" rx="2" fill="#1f2937"/>${w.hands}
${sparkle(520, 466, 8)}${sparkle(640, 482, 7)}`,
    );
}

function bauendreinigung() {
    seed = 111;
    const planks = times(4, (i) => `<path d="M0 ${446 + i * 16}H800" stroke="#2a2018" stroke-width="2"/>`) + times(18, (i) => `<path d="M${(i * 97 + (i % 4) * 41) % 800} ${430 + (i % 4) * 16}v16" stroke="#2a2018" stroke-width="2"/>`);
    const checklist = times(4, (i) => `<rect x="104" y="${206 + i * 22}" width="12" height="12" fill="none" stroke="#475569" stroke-width="2"/><path d="M106 ${212 + i * 22}l4 4 7 -9" fill="none" stroke="${C.green}" stroke-width="3" stroke-linecap="round"/><path d="M124 ${212 + i * 22}h56" stroke="#94a3b8" stroke-width="3"/>`);
    const w = cleaner({ x: 370, hands: [[388, 318], [446, 230]] });
    return frame(
        'BAUENDREINIGUNG',
        C.green,
        `<rect y="90" width="800" height="340" fill="#131b2a"/>
<rect x="404" y="110" width="320" height="270" fill="#10213a"/>
${times(10, () => `<path d="M${n(r(416, 470))} ${n(r(130, 360))}v${n(r(8, 22))}" stroke="${C.blue}" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>`)}
<path d="M520 360L620 130M600 360L700 160" stroke="#fff" stroke-opacity=".08" stroke-width="16"/>
<rect x="404" y="110" width="320" height="270" fill="none" stroke="${C.white}" stroke-width="12"/><path d="M564 110V380" stroke="${C.white}" stroke-width="9"/>
<rect x="404" y="372" width="96" height="6" fill="${C.blue}"/><path d="M500 372q14 2 12 16q-8 -6 -14 -10z" fill="${C.blue}"/>
<rect x="90" y="166" width="104" height="136" rx="4" fill="#a8a29e"/><rect x="98" y="182" width="88" height="112" fill="${C.white}"/><rect x="124" y="160" width="36" height="14" rx="3" fill="#1f2937"/>
<text x="142" y="198" text-anchor="middle" font-family="${mono}" font-size="10" letter-spacing="1.5" fill="#1e293b">ABNAHME</text>${checklist}
<circle cx="240" cy="190" r="4" fill="${C.mist}"/><circle cx="240" cy="206" r="10" fill="none" stroke="#fbbf24" stroke-width="3"/><path d="M240 216v34M240 238h10M240 248h8" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
<rect y="432" width="800" height="68" fill="#3a2d22"/>${planks}${shine(0, 800, 9)}
${w.body}<path d="M446 230H470" stroke="${C.steel}" stroke-width="5" stroke-linecap="round"/><rect x="468" y="200" width="7" height="60" rx="2" fill="#1f2937"/><rect x="376" y="314" width="24" height="10" rx="2" fill="${C.greenSoft}"/>${w.hands}
${sparkle(520, 180, 12)}${sparkle(680, 300, 9)}${sparkle(300, 470, 9)}${sparkle(600, 460, 11)}`,
    );
}

function gebaeudereinigung() {
    seed = 122;
    const panels = times(16, (i) => `<path d="M${i * 50} 96V416" stroke="#fff" stroke-opacity=".03" stroke-width="2"/>`);
    const elevator = (x, label) =>
        `<rect x="${x}" y="226" width="90" height="204" fill="${C.mid}" stroke="${C.steel}" stroke-width="5"/><path d="M${x + 45} 228V430" stroke="${C.steel}" stroke-width="3"/><rect x="${x + 25}" y="196" width="40" height="20" fill="${C.dark}"/><text x="${x + 45}" y="211" text-anchor="middle" font-family="${mono}" font-size="12" fill="${C.greenSoft}">${label}</text>`;
    const w = cleaner({ x: 440, dir: -1, hands: [[414, 330], [396, 354]] });
    return frame(
        'GEBÄUDEREINIGUNG',
        C.green,
        `<rect y="96" width="800" height="320" fill="#121a28"/>${panels}
<rect x="120" y="150" width="160" height="80" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>
<g fill="none" stroke="${C.greenSoft}" stroke-width="3"><rect x="180" y="164" width="40" height="52"/><path d="M190 176h8M202 176h8M190 188h8M202 188h8M190 200h8M202 200h8"/></g>
<rect x="80" y="322" width="232" height="10" fill="${C.mist}"/><rect x="90" y="332" width="212" height="98" fill="${C.line}"/><rect x="90" y="364" width="212" height="4" fill="${C.green}"/>
${elevator(510, 'EG')}${elevator(620, '3')}
<rect x="742" y="384" width="34" height="46" fill="#57534e"/>${times(7, (i) => `<ellipse cx="${n(759 + r(-20, 20))}" cy="${n(350 - i * 8 + r(-6, 6))}" rx="9" ry="20" fill="${i % 2 ? '#166534' : '#15803d'}" transform="rotate(${n(r(-40, 40))} 759 380)"/>`)}
${shine(0, 800, 10)}${cart(560)}${w.body}${mop(426, 312, 356, 430, 84)}${w.hands}
${sparkle(220, 470, 9)}${sparkle(470, 480, 8)}${sparkle(300, 452, 7)}`,
    );
}

function praxisreinigung() {
    seed = 133;
    const chair = (x) => `<rect x="${x}" y="296" width="12" height="70" rx="4" fill="${C.steel}"/><rect x="${x}" y="356" width="62" height="12" rx="4" fill="${C.greenDeep}"/><path d="M${x + 8} 368V430M${x + 54} 368V430" stroke="${C.steel}" stroke-width="4"/>`;
    const w = cleaner({ x: 430, dir: -1, gloves: C.blue, hands: [[396, 352], [372, 318]] });
    return frame(
        'PRAXISREINIGUNG',
        C.green,
        `<rect x="110" y="128" width="64" height="64" fill="${C.panel}" stroke="${C.green}" stroke-width="3"/><path d="M142 140v40M122 160h40" stroke="${C.white}" stroke-width="12"/>
<text x="190" y="166" font-family="${mono}" font-size="15" letter-spacing="4" fill="${C.white}">PRAXIS</text>
${chair(70)}${chair(150)}${chair(230)}
<rect x="560" y="170" width="160" height="260" fill="${C.dark}"/><rect x="560" y="170" width="160" height="260" fill="none" stroke="${C.steel}" stroke-width="6"/>
<rect x="590" y="344" width="112" height="12" rx="3" fill="${C.white}"/><path d="M590 344l-4 -26" stroke="${C.white}" stroke-width="10" stroke-linecap="round"/><path d="M604 356V430M690 356V430" stroke="${C.steel}" stroke-width="4"/>
<path d="M664 172V214" stroke="${C.mist}" stroke-width="2"/><path d="M648 214h32l-6 10h-20z" fill="${C.mist}"/>
${bucket(500, 430, C.blue)}${shine(0, 560, 6)}
${w.body}${spray(372, 318, -1)}<rect x="384" y="352" width="22" height="10" rx="2" fill="${C.greenSoft}"/>${w.hands}
${sparkle(110, 340, 9)}${sparkle(200, 346, 7)}${sparkle(270, 340, 9)}`,
    );
}

const scenes = {
    abbruch,
    entkernung,
    rueckbau,
    kernbohrungen,
    unterhaltsreinigung,
    bueroreinigung,
    grundreinigung,
    treppenhausreinigung,
    baureinigung,
    bauendreinigung,
    gebaeudereinigung,
    praxisreinigung,
};

fs.mkdirSync(OUT, { recursive: true });
for (const [key, draw] of Object.entries(scenes)) fs.writeFileSync(path.join(OUT, `${key}.svg`), draw());
console.log(`${Object.keys(scenes).length} illustrations written to ${OUT}`);
