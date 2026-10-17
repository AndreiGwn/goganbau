import * as THREE from 'three';

function canvas(size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    return [c, c.getContext('2d')];
}

/** Soft round sprite for particles. */
export function dotTexture() {
    const [c, ctx] = canvas(64);
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
}

/** Procedural wood-wool surface for Tektalan panels. */
export function woodWoolTexture() {
    const [c, ctx] = canvas(256);
    ctx.fillStyle = '#b89c6c';
    ctx.fillRect(0, 0, 256, 256);
    const tones = ['#d8c094', '#a5875a', '#c9ad7c', '#8f7449', '#e3cfa6'];
    for (let i = 0; i < 2200; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const a = Math.random() * Math.PI;
        const l = 6 + Math.random() * 16;
        ctx.strokeStyle = tones[(Math.random() * tones.length) | 0];
        ctx.globalAlpha = 0.5 + Math.random() * 0.5;
        ctx.lineWidth = 0.8 + Math.random() * 1.2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + Math.cos(a + 0.6) * l * 0.5, y + Math.sin(a + 0.6) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l);
        ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
}

/** Safety netting for scaffolding and site fence (alpha-tested grid). */
export function netTexture() {
    const [c, ctx] = canvas(64);
    ctx.clearRect(0, 0, 64, 64);
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 3;
    for (let i = 0; i <= 64; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 64);
        ctx.moveTo(0, i);
        ctx.lineTo(64, i);
        ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
}

/** Monospace blueprint label rendered to a sprite. */
export function labelSprite(text, { color = '#38bdf8', scale = 1 } = {}) {
    const [c, ctx] = canvas(256);
    c.height = 64;
    ctx.font = '500 34px "JetBrains Mono", ui-monospace, monospace';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 34);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0.85 }));
    sprite.scale.set(4 * scale, 1 * scale, 1);
    return sprite;
}
