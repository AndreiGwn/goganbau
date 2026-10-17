import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { dotTexture, labelSprite, netTexture, woodWoolTexture } from './textures.js';

/*
 * GoganBau construction-site model.
 *
 * One tower, read bottom-up as the life cycle of a building — each band maps to a service:
 *   EG          clean lobby + canopy          → Gebäudereinigung
 *   OG 1–2      polished glass curtain wall   → Bauendreinigung
 *   OG 3        fit-out floor, dust, scrubber → Baureinigung
 *   OG 3–5      Tektalan ceiling panels       → Tektalan-Montage
 *   OG 6–8      raw frame, debris, sparks     → Abbruch & Entkernung
 *   front       cantilever scaffold + netting → Rückbau
 *   west        tower crane + staging yard    → Baustellenlogistik
 */

const C = {
    bg: 0x0a0e17,
    signal: 0xff6b00,
    tech: 0x38bdf8,
    concrete: 0x9aa3ae,
    concreteRaw: 0x7d838c,
    core: 0x868e99,
    steelDark: 0x263042,
    scaffold: 0xb4bcc6,
    tektalan: 0xd2bc90,
    ground: 0x0b1019,
    rust: 0x9a5a34,
};

const FH = 3.2; // storey height
const FLOORS = 9;
const W = 18; // footprint x
const D = 12; // footprint z
const HW = W / 2;
const HD = D / 2;
const SLAB = 0.35;
const COL_X = [-9, -3, 3, 9];
const COL_Z = [-6, -2, 2, 6];
const floorY = (f) => f * FH + SLAB / 2; // walking surface of storey f
const ceilY = (f) => (f + 1) * FH - SLAB / 2; // slab underside above storey f

const CRANE = { x: -17, z: -7, mast: 38 };
const SPARK_ORIGIN = new THREE.Vector3(9, floorY(8) + 1.35, 2);

export const PRESETS = {
    overview: { position: [46, 27, 56], target: [-3, 15, 0] },
    services: { position: [40, 24, 48], target: [-2, 15, 0] },
    abbruch: { position: [21, 32, 21], target: [4, 24, 0] },
    rueckbau: { position: [8, 21, 29], target: [-3, 22, 7.5] },
    tektalan: { position: [8, 12.2, 15], target: [1, 15.6, -1] },
    logistik: { position: [-38, 17, 30], target: [-15, 7, 3] },
    baureinigung: { position: [8, 12, 17], target: [0, 10.2, 0] },
    bauendreinigung: { position: [18, 7, 24], target: [0, 5.5, 4] },
    gebaeudereinigung: { position: [-12, 4, 22], target: [0, 2.2, 5] },
};

const ZONES = {
    abbruch: [[[-9.7, 19.1, -6.6], [9.9, 30.0, 6.6]]],
    rueckbau: [[[-9.9, 12.4, 6.6], [3.2, 31.4, 8.3]]],
    tektalan: [[[-9.7, 12.6, -6.6], [9.7, 19.3, 6.6]]],
    logistik: [
        [[-25, 0, 2], [-10, 5.6, 15.5]],
        [[-18.2, 0, -8.2], [-15.8, 40, -5.8]],
    ],
    baureinigung: [[[-9.7, 9.5, -6.6], [9.7, 12.9, 6.6]]],
    bauendreinigung: [[[-9.7, 3.1, -6.6], [9.7, 9.7, 6.6]]],
    gebaeudereinigung: [[[-9.7, 0, -6.6], [9.7, 3.4, 9]]],
};

const UP = new THREE.Vector3(0, 1, 0);
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _c = new THREE.Color();

/** Accumulates instances of one geometry/material pair into a single draw call. */
class Batch {
    constructor(geometry, material, max) {
        this.mesh = new THREE.InstancedMesh(geometry, material, max);
        this.n = 0;
    }

    box(pos, scale = [1, 1, 1], rot = [0, 0, 0], color = null) {
        _p.set(...pos);
        _q.setFromEuler(_e.set(...rot));
        _s.set(...scale);
        _m.compose(_p, _q, _s);
        this.mesh.setMatrixAt(this.n, _m);
        if (color !== null) this.mesh.setColorAt(this.n, _c.set(color));
        this.n++;
        return this;
    }

    tube(a, b, radius = 1) {
        _a.set(...a);
        _b.set(...b);
        _p.copy(_a).add(_b).multiplyScalar(0.5);
        const dir = _b.sub(_a);
        const len = dir.length();
        _q.setFromUnitVectors(UP, dir.normalize());
        _s.set(radius, len, radius);
        _m.compose(_p, _q, _s);
        this.mesh.setMatrixAt(this.n++, _m);
        return this;
    }

    done(parent) {
        this.mesh.count = this.n;
        this.mesh.instanceMatrix.needsUpdate = true;
        if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
        this.mesh.computeBoundingSphere();
        parent.add(this.mesh);
        return this.mesh;
    }
}

const rand = (min, max) => min + Math.random() * (max - min);

export class BuildingScene {
    constructor(canvas, { reducedMotion = false } = {}) {
        this.canvas = canvas;
        this.reducedMotion = reducedMotion;
        this.lowPower = window.matchMedia('(max-width: 768px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4;
        this.active = true;
        this.viewShift = 0;
        this.current = 'overview';
        this.distanceScale = 1;
        this.pointer = new THREE.Vector2();
        this.parallax = new THREE.Vector2();
        this.sparkRate = 120;

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !this.lowPower, powerPreference: 'high-performance' });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.lowPower ? 1.5 : 1.75));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.3;
        this.renderer.setClearColor(C.bg, 1);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(C.bg);
        this.scene.fog = new THREE.FogExp2(C.bg, 0.0085);

        const pmrem = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        this.scene.environmentIntensity = 0.35;
        pmrem.dispose();

        this.camera = new THREE.PerspectiveCamera(40, 1, 0.5, 400);
        this.camera.position.set(...PRESETS.overview.position);

        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.target.set(...PRESETS.overview.target);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.rotateSpeed = 0.5;
        this.controls.minPolarAngle = 0.25;
        this.controls.maxPolarAngle = Math.PI * 0.49;
        this.controls.autoRotate = !reducedMotion;
        this.controls.autoRotateSpeed = 0.35;
        this.controls.addEventListener('start', () => (this.controls.autoRotate = false));
        // On touch screens the canvas sits behind scrolling content: keep native vertical scroll.
        if (window.matchMedia('(pointer: coarse)').matches) {
            this.controls.enabled = false;
            canvas.style.touchAction = 'pan-y';
        }

        this.world = new THREE.Group();
        this.scene.add(this.world);

        this.textures = { dot: dotTexture(), wool: woodWoolTexture(), net: netTexture() };

        this.buildLights();
        this.buildGround();
        this.buildStructure();
        this.buildFacades();
        this.buildTektalan();
        this.buildFitOutFloor();
        this.buildDemolition();
        this.buildScaffold();
        this.buildCrane();
        this.buildYard();
        this.buildBlueprint();
        this.buildHighlights();
        this.buildParticles();

        this.onResize = this.onResize.bind(this);
        this.onPointer = this.onPointer.bind(this);
        window.addEventListener('resize', this.onResize);
        window.addEventListener('pointermove', this.onPointer, { passive: true });
        this.onResize();

        this.clock = new THREE.Clock();
        this.tick = this.tick.bind(this);
        this.raf = requestAnimationFrame(this.tick);
    }

    /* ------------------------------------------------------------------ */
    /* Public API                                                          */
    /* ------------------------------------------------------------------ */

    focus(key, { instant = false } = {}) {
        const preset = PRESETS[key] ?? PRESETS.overview;
        if (key === this.current) return;
        this.current = key;

        const duration = this.reducedMotion ? 0.01 : 1.6;
        const ease = 'power3.inOut';
        const [tx, ty, tz] = preset.target;
        // distanceScale > 1 pulls the camera back along its view line (narrow screens).
        const [px, py, pz] = preset.position.map((p, i) => preset.target[i] + (p - preset.target[i]) * this.distanceScale);

        this.controls.autoRotate = (key === 'overview' || key === 'services') && !this.reducedMotion;
        if (instant) {
            gsap.killTweensOf([this.camera.position, this.controls.target]);
            this.camera.position.set(px, py, pz);
            this.controls.target.set(tx, ty, tz);
        } else {
            gsap.to(this.camera.position, { x: px, y: py, z: pz, duration, ease, overwrite: 'auto' });
            gsap.to(this.controls.target, { x: tx, y: ty, z: tz, duration, ease, overwrite: 'auto' });
        }

        for (const [zoneKey, zone] of Object.entries(this.zones)) {
            const on = zoneKey === key;
            gsap.to(zone.lineMat, { opacity: on ? 0.95 : 0, duration: 0.6, overwrite: 'auto' });
            gsap.to(zone.fillMat, { opacity: on ? 0.06 : 0, duration: 0.6, overwrite: 'auto' });
            gsap.to(zone.scanMat, { opacity: on ? 0.9 : 0, duration: 0.6, overwrite: 'auto' });
        }

        this.sparkRate = key === 'abbruch' ? 260 : 120;
    }

    /** Shifts the projection so the model sits beside left-aligned page content. */
    setViewShift(fraction) {
        this.viewShift = fraction;
        this.onResize();
    }

    /** Shift plus camera distance, e.g. pulled back and pushed right on phones. */
    setFraming(shift, distanceScale) {
        this.distanceScale = distanceScale;
        this.setViewShift(shift);
        const key = this.current;
        this.current = null;
        this.focus(key, { instant: true });
    }

    setActive(active) {
        this.active = active;
    }

    /* ------------------------------------------------------------------ */
    /* Scene construction                                                  */
    /* ------------------------------------------------------------------ */

    buildLights() {
        this.scene.add(new THREE.HemisphereLight(0xc4dcff, 0x1a2230, 1.7));

        const key = new THREE.DirectionalLight(0xfff1e0, 3.2);
        key.position.set(30, 50, 25);
        this.scene.add(key);

        const rim = new THREE.DirectionalLight(C.tech, 1.6);
        rim.position.set(-40, 18, -35);
        this.scene.add(rim);

        this.sparkLight = new THREE.PointLight(0xff7a1a, 40, 22, 2);
        this.sparkLight.position.copy(SPARK_ORIGIN);
        this.world.add(this.sparkLight);

        const lobby = new THREE.PointLight(0x9fdcff, 18, 14, 2);
        lobby.position.set(0, 2.4, 9);
        this.world.add(lobby);
    }

    buildGround() {
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(320, 320),
            new THREE.MeshStandardMaterial({ color: C.ground, roughness: 1 }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.02;
        this.world.add(ground);

        const pad = new THREE.Mesh(
            new THREE.PlaneGeometry(44, 32),
            new THREE.MeshStandardMaterial({ color: 0x151c29, roughness: 0.95 }),
        );
        pad.rotation.x = -Math.PI / 2;
        pad.position.set(-5, 0, 3);
        this.world.add(pad);

        const grid = new THREE.GridHelper(240, 120, C.tech, 0x1e293b);
        grid.material.transparent = true;
        grid.material.opacity = 0.16;
        grid.position.y = 0.01;
        this.world.add(grid);
    }

    buildStructure() {
        const g = new THREE.Group();
        this.world.add(g);

        const concrete = new THREE.MeshStandardMaterial({ color: C.concrete, roughness: 0.88, metalness: 0.04 });
        const concreteRaw = new THREE.MeshStandardMaterial({ color: C.concreteRaw, roughness: 0.96 });
        const edgeMat = new THREE.LineBasicMaterial({ color: C.tech, transparent: true, opacity: 0.22 });
        this.materials = { concrete, concreteRaw, edgeMat };

        // Slabs (storey floors 0–8)
        const slabGeo = new THREE.BoxGeometry(W + 0.6, SLAB, D + 0.6);
        const slabEdges = new THREE.EdgesGeometry(slabGeo);
        for (let f = 0; f < FLOORS; f++) {
            const slab = new THREE.Mesh(slabGeo, f >= 6 ? concreteRaw : concrete);
            slab.position.y = f * FH;
            g.add(slab);
            const edges = new THREE.LineSegments(slabEdges, edgeMat);
            edges.position.y = f * FH;
            g.add(edges);
        }

        // Roof slab — partially demolished on the east side
        const roofY = FLOORS * FH;
        const roofA = new THREE.Mesh(new THREE.BoxGeometry(10.8, SLAB, D + 0.6), concreteRaw);
        roofA.position.set(-3.9, roofY, 0);
        const roofB = new THREE.Mesh(new THREE.BoxGeometry(4, SLAB, 6.3), concreteRaw);
        roofB.position.set(3.5, roofY, -3.15);
        g.add(roofA, roofB);
        for (const m of [roofA, roofB]) {
            const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), edgeMat);
            e.position.copy(m.position);
            g.add(e);
        }

        // Columns
        const colGeo = new THREE.BoxGeometry(0.5, FH - SLAB, 0.5);
        const cols = new Batch(colGeo, concrete, 120);
        const colsRaw = new Batch(colGeo, concreteRaw, 60);
        this.brokenColumns = [];
        for (let f = 0; f < FLOORS; f++) {
            for (const x of COL_X) {
                for (const z of COL_Z) {
                    if (f === 8 && ((x === 9 && z > -6) || (x === 3 && z === 6))) {
                        this.brokenColumns.push([x, z]);
                        continue;
                    }
                    (f >= 6 ? colsRaw : cols).box([x, f * FH + FH / 2, z]);
                }
            }
        }
        cols.done(g);
        colsRaw.done(g);

        // Stair / lift core
        const coreH = FLOORS * FH + 1.6;
        const core = new THREE.Mesh(
            new THREE.BoxGeometry(4, coreH, 4),
            new THREE.MeshStandardMaterial({ color: C.core, roughness: 0.9 }),
        );
        core.position.set(-4, coreH / 2, 0);
        g.add(core);
        const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry), edgeMat);
        coreEdges.position.copy(core.position);
        g.add(coreEdges);
    }

    buildFacades() {
        const g = new THREE.Group();
        this.world.add(g);

        const glass = new THREE.MeshPhysicalMaterial({
            color: 0x9cc6e8,
            metalness: 0.25,
            roughness: 0.05,
            transparent: true,
            opacity: 0.4,
            envMapIntensity: 2.2,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
        const glassDusty = new THREE.MeshStandardMaterial({
            color: 0xa9b6c2,
            roughness: 0.4,
            metalness: 0.1,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
        const steelDark = new THREE.MeshStandardMaterial({ color: C.steelDark, roughness: 0.45, metalness: 0.7 });
        const lightMat = new THREE.MeshBasicMaterial({ color: 0xcfeeff });

        const pane = (w, h, x, y, z, ry, mat) => {
            const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
            m.position.set(x, y, z);
            m.rotation.y = ry;
            m.renderOrder = 2;
            g.add(m);
        };

        const ph = FH - SLAB;
        const off = 0.27;
        // Clean curtain wall: storeys 0–2, all sides
        for (let f = 0; f < 3; f++) {
            const y = f * FH + FH / 2;
            pane(W, ph, 0, y, HD + off, 0, glass);
            pane(W, ph, 0, y, -HD - off, Math.PI, glass);
            pane(D, ph, HW + off, y, 0, Math.PI / 2, glass);
            pane(D, ph, -HW - off, y, 0, -Math.PI / 2, glass);
        }
        // Fit-out storeys 3–5: dusty temporary glazing on back + west only, front/east open
        for (let f = 3; f < 6; f++) {
            const y = f * FH + FH / 2;
            pane(W, ph, 0, y, -HD - off, Math.PI, glassDusty);
            pane(D, ph, -HW - off, y, 0, -Math.PI / 2, glassDusty);
        }

        // Mullions + spandrel bands for the clean section
        const unit = new THREE.BoxGeometry(1, 1, 1);
        const frame = new Batch(unit, steelDark, 80);
        const mh = 3 * FH - 0.2;
        for (let x = -HW; x <= HW + 0.01; x += 1.5) {
            frame.box([x, mh / 2 + 0.1, HD + off + 0.04], [0.08, mh, 0.12]);
            frame.box([x, mh / 2 + 0.1, -HD - off - 0.04], [0.08, mh, 0.12]);
        }
        for (let z = -HD; z <= HD + 0.01; z += 1.5) {
            frame.box([HW + off + 0.04, mh / 2 + 0.1, z], [0.12, mh, 0.08]);
            frame.box([-HW - off - 0.04, mh / 2 + 0.1, z], [0.12, mh, 0.08]);
        }
        for (let f = 1; f <= 3; f++) {
            const y = f * FH;
            frame.box([0, y, HD + off + 0.05], [W + 0.75, 0.55, 0.12]);
            frame.box([0, y, -HD - off - 0.05], [W + 0.75, 0.55, 0.12]);
            frame.box([HW + off + 0.05, y, 0], [0.12, 0.55, D + 0.75]);
            frame.box([-HW - off - 0.05, y, 0], [0.12, 0.55, D + 0.75]);
        }
        // Entrance canopy
        frame.box([0, 3.0, HD + 1.5], [7, 0.22, 2.4]);
        frame.box([-3.3, 1.5, HD + 2.5], [0.14, 3, 0.14]);
        frame.box([3.3, 1.5, HD + 2.5], [0.14, 3, 0.14]);
        frame.done(g);

        // Lit office ceilings visible through the glass
        const lights = new Batch(unit, lightMat, 12);
        for (let f = 0; f < 3; f++) {
            for (const z of [-3.5, 0, 3.5]) lights.box([1.5, ceilY(f) - 0.05, z], [W - 5, 0.04, 0.22]);
        }
        lights.done(g);

        const canopyStrip = new THREE.Mesh(new THREE.BoxGeometry(7, 0.05, 0.1), new THREE.MeshBasicMaterial({ color: C.signal }));
        canopyStrip.position.set(0, 2.88, HD + 2.68);
        const canopyGlow = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.02, 2), new THREE.MeshBasicMaterial({ color: 0xbfe8ff }));
        canopyGlow.position.set(0, 2.88, HD + 1.5);
        g.add(canopyStrip, canopyGlow);

        this.materials.glass = glass;
    }

    buildTektalan() {
        const g = new THREE.Group();
        this.world.add(g);

        const mat = new THREE.MeshStandardMaterial({ color: C.tektalan, map: this.textures.wool, roughness: 1 });
        const panels = new Batch(new THREE.BoxGeometry(1.95, 0.05, 0.57), mat, 640);

        for (let f = 3; f < 6; f++) {
            const y = ceilY(f) - 0.03;
            for (let ix = 0; ix < 9; ix++) {
                const x = -8 + ix * 2;
                for (let iz = 0; iz < 20; iz++) {
                    const z = -5.7 + iz * 0.6;
                    if (x > -6.6 && x < -1.4 && z > -2.4 && z < 2.4) continue; // core
                    if (f === 5 && (x > 2 || (x > 0 && iz > 12))) continue; // installation in progress
                    panels.box([x, y, z]);
                }
            }
        }

        // Panel stack on a pallet, storey 5
        const base = floorY(5);
        for (let i = 0; i < 10; i++) panels.box([6.2, base + 0.2 + i * 0.055, -3.4], [1, 1, 1], [0, 0.04 * (i % 3), 0]);
        // Panel lifted to the ceiling by the scissor lift
        panels.box([5, ceilY(5) - 0.09, 1.6], [1, 1, 1], [0, 0.25, 0]);
        panels.done(g);

        // Scissor lift
        const orange = new THREE.MeshStandardMaterial({ color: C.signal, roughness: 0.5, metalness: 0.3 });
        const steel = new THREE.MeshStandardMaterial({ color: C.scaffold, roughness: 0.4, metalness: 0.7 });
        const liftBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 1.1), orange);
        liftBase.position.set(5, base + 0.25, 1.6);
        const platform = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 1.15), orange);
        const platformY = ceilY(5) - 1.05;
        platform.position.set(5, platformY, 1.6);
        g.add(liftBase, platform);

        const arms = new Batch(new THREE.CylinderGeometry(0.05, 0.05, 1, 6), steel, 16);
        const y0 = base + 0.5;
        const levels = 3;
        const step = (platformY - y0) / levels;
        for (let i = 0; i < levels; i++) {
            for (const z of [1.1, 2.1]) {
                arms.tube([4, y0 + i * step, z], [6, y0 + (i + 1) * step, z], 1);
                arms.tube([6, y0 + i * step, z], [4, y0 + (i + 1) * step, z], 1);
            }
        }
        for (const [x, z] of [[3.9, 1.05], [6.1, 1.05], [3.9, 2.15], [6.1, 2.15]]) {
            arms.tube([x, platformY, z], [x, platformY + 0.95, z], 0.8);
        }
        arms.done(g);
    }

    buildFitOutFloor() {
        const g = new THREE.Group();
        this.world.add(g);
        const y = floorY(3);

        // Swept, cleaned half of the floor
        const clean = new THREE.Mesh(
            new THREE.PlaneGeometry(9, D),
            new THREE.MeshStandardMaterial({ color: 0xc3ccd6, roughness: 0.25, metalness: 0.1 }),
        );
        clean.rotation.x = -Math.PI / 2;
        clean.position.set(-4.5, y + 0.01, 0);
        g.add(clean);

        // Dust heaps on the not-yet-cleaned half
        const heaps = new Batch(new THREE.ConeGeometry(0.55, 0.32, 10), new THREE.MeshStandardMaterial({ color: 0x6f6960, roughness: 1 }), 24);
        for (let i = 0; i < 20; i++) {
            const s = rand(0.5, 1.3);
            heaps.box([rand(1.2, 8.4), y + 0.16 * s, rand(-5.2, 5.2)], [s, s, s]);
        }
        heaps.done(g);

        // Ride-on scrubber dryer
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1.4, 0.8, 0.85),
            new THREE.MeshStandardMaterial({ color: C.signal, roughness: 0.45, metalness: 0.2 }),
        );
        body.position.set(0.4, y + 0.55, 2.2);
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.6), new THREE.MeshStandardMaterial({ color: 0x1f2937 }));
        seat.position.set(0.15, y + 1.1, 2.2);
        const brush = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.9, 16), new THREE.MeshStandardMaterial({ color: 0x334155 }));
        brush.rotation.x = Math.PI / 2;
        brush.position.set(1.15, y + 0.22, 2.2);
        g.add(body, seat, brush);
    }

    buildDemolition() {
        const g = new THREE.Group();
        this.world.add(g);
        const { concreteRaw } = this.materials;

        // Broken column stubs on storey 8 with exposed rebar
        const rebar = [];
        for (const [x, z] of this.brokenColumns) {
            const h = rand(0.6, 1.4);
            const stub = new THREE.Mesh(new THREE.BoxGeometry(0.5, h, 0.5), concreteRaw);
            stub.position.set(x, floorY(8) + h / 2, z);
            stub.rotation.set(rand(-0.05, 0.05), rand(-0.2, 0.2), rand(-0.05, 0.05));
            g.add(stub);
            for (const [dx, dz] of [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]]) {
                const top = floorY(8) + h;
                rebar.push(x + dx, top - 0.1, z + dz, x + dx + rand(-0.25, 0.25), top + rand(0.4, 1.1), z + dz + rand(-0.25, 0.25));
            }
        }
        // Rebar along the demolished roof edge
        const roofY = FLOORS * FH;
        for (let z = 0.2; z < HD; z += 0.45) rebar.push(1.5, roofY, z, 1.5 + rand(0.3, 1.0), roofY - rand(0, 0.6), z + rand(-0.1, 0.1));
        for (let x = 1.7; x < 5.5; x += 0.45) rebar.push(x, roofY, 0, x + rand(-0.1, 0.1), roofY - rand(0, 0.5), rand(0.3, 0.9));
        const rebarGeo = new THREE.BufferGeometry();
        rebarGeo.setAttribute('position', new THREE.Float32BufferAttribute(rebar, 3));
        g.add(new THREE.LineSegments(rebarGeo, new THREE.LineBasicMaterial({ color: C.rust })));

        // Rubble on storeys 7 + 8
        const rubble = new Batch(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 }), 260);
        const shades = [0x7d838c, 0x6b7079, 0x8f959d, 0x5d6168, 0x9a8f80];
        for (let i = 0; i < 240; i++) {
            const storey = i < 150 ? 8 : 7;
            const s = rand(0.12, 0.55);
            const cluster = i % 3 === 0;
            const x = cluster ? rand(5.5, 8.6) : rand(1.5, 8.8);
            const z = cluster ? rand(-1, 3) : rand(-5.6, 5.6);
            rubble.box(
                [x, floorY(storey) + s * 0.4 + (cluster ? rand(0, 0.5) : 0), z],
                [s * rand(0.8, 1.6), s * rand(0.4, 1), s * rand(0.8, 1.4)],
                [rand(0, 3), rand(0, 3), rand(0, 3)],
                shades[i % shades.length],
            );
        }
        // Fallen roof chunks
        for (let i = 0; i < 6; i++) {
            rubble.box([rand(2.5, 7), floorY(8) + 0.25, rand(0.5, 4.5)], [rand(1, 2.2), SLAB, rand(0.8, 1.8)], [rand(-0.3, 0.3), rand(0, 3), rand(-0.3, 0.3)], 0x737982);
        }
        rubble.done(g);

        // Rubble chute down the east facade into a skip
        const chute = new Batch(new THREE.CylinderGeometry(0.42, 0.34, 1.0, 12, 1, true), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, side: THREE.DoubleSide }), 32);
        for (let y = 1.9; y < floorY(8) + 0.6; y += 0.95) {
            chute.box([10.3, y, 3.8], [1, 1, 1], [0, 0, 0], Math.round(y / 0.95) % 2 ? C.signal : 0x3a4252);
        }
        chute.done(g);

        const skip = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 2.0), new THREE.MeshStandardMaterial({ color: C.signal, roughness: 0.55, metalness: 0.35 }));
        skip.position.set(10.9, 0.7, 4.6);
        g.add(skip);
    }

    buildScaffold() {
        const g = new THREE.Group();
        this.world.add(g);

        const steel = new THREE.MeshStandardMaterial({ color: C.scaffold, roughness: 0.38, metalness: 0.75 });
        const tubes = new Batch(new THREE.CylinderGeometry(0.045, 0.045, 1, 6), steel, 900);
        const unit = new THREE.BoxGeometry(1, 1, 1);
        const boards = new Batch(unit, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }), 40);

        const xs = [-9.6, -7.1, -4.6, -2.1, 0.4, 2.9];
        const zIn = 6.85;
        const zOut = 7.95;
        const yBottom = 4 * FH;
        const yTop = 31.2;
        const levels = [];
        for (let y = yBottom; y <= 30.9; y += 2) levels.push(y);

        // Cantilever brackets anchored to slab 4 (scaffold is suspended above the clean facade)
        for (const x of xs) {
            boards.box([x, yBottom - 0.16, 7.15], [0.16, 0.26, 2.0], [0, 0, 0], C.steelDark);
            tubes.tube([x, yBottom - 2.4, HD + 0.3], [x, yBottom - 0.2, zOut], 1.4);
        }

        for (const x of xs) {
            tubes.tube([x, yBottom, zIn], [x, yTop, zIn]);
            tubes.tube([x, yBottom, zOut], [x, yTop, zOut]);
        }
        const x0 = xs[0];
        const x1 = xs[xs.length - 1];
        const midX = (x0 + x1) / 2;
        levels.forEach((y, k) => {
            tubes.tube([x0, y, zIn], [x1, y, zIn]);
            tubes.tube([x0, y, zOut], [x1, y, zOut]);
            tubes.tube([x0, y + 1, zOut], [x1, y + 1, zOut]); // guard rail
            for (const x of xs) tubes.tube([x, y, zIn], [x, y, zOut]);
            if (y + 2 <= yTop) {
                for (let i = 0; i < xs.length - 1; i++) {
                    const up = (i + k) % 2 === 0;
                    tubes.tube([xs[i], up ? y : y + 2, zOut + 0.06], [xs[i + 1], up ? y + 2 : y, zOut + 0.06]);
                }
            }
            boards.box([midX, y + 0.05, (zIn + zOut) / 2], [x1 - x0, 0.05, 1.05], [0, 0, 0], 0x7a6247);
            boards.box([midX, y + 0.12, zOut], [x1 - x0, 0.15, 0.03], [0, 0, 0], C.signal);
        });
        tubes.done(g);
        boards.done(g);

        // Safety netting on the outer face
        const net = this.textures.net.clone();
        net.needsUpdate = true;
        const netW = x1 - x0;
        const netH = yTop - yBottom;
        net.repeat.set(netW / 0.5, netH / 0.5);
        const netMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(netW, netH),
            new THREE.MeshStandardMaterial({
                color: C.signal,
                alphaMap: net,
                transparent: true,
                opacity: 0.55,
                side: THREE.DoubleSide,
                depthWrite: false,
                emissive: C.signal,
                emissiveIntensity: 0.15,
            }),
        );
        netMesh.position.set(midX, yBottom + netH / 2, zOut + 0.12);
        netMesh.renderOrder = 3;
        g.add(netMesh);
    }

    buildCrane() {
        const base = new THREE.Group();
        base.position.set(CRANE.x, 0, CRANE.z);
        this.world.add(base);

        const paint = new THREE.MeshStandardMaterial({ color: C.signal, roughness: 0.5, metalness: 0.45 });
        const lattice = new THREE.CylinderGeometry(0.07, 0.07, 1, 6);

        const foundation = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1, 4.5), this.materials.concrete);
        foundation.position.y = 0.5;
        base.add(foundation);

        // Mast
        const mast = new Batch(lattice, paint, 200);
        const s = 0.8;
        const corners = [[-s, -s], [s, -s], [s, s], [-s, s]];
        for (const [x, z] of corners) mast.tube([x, 1, z], [x, CRANE.mast, z]);
        for (let y = 1; y < CRANE.mast; y += 2) {
            for (let i = 0; i < 4; i++) {
                const [ax, az] = corners[i];
                const [bx, bz] = corners[(i + 1) % 4];
                mast.tube([ax, y, az], [bx, y, bz], 0.8);
                mast.tube([ax, y, az], [bx, Math.min(y + 2, CRANE.mast), bz], 0.7);
            }
        }
        mast.done(base);

        // Slewing part
        const top = new THREE.Group();
        top.position.y = CRANE.mast;
        top.rotation.y = -0.39;
        base.add(top);
        this.craneTop = top;

        const jib = new Batch(lattice, paint, 220);
        const L = 30;
        const CL = 10;
        for (let x = 0; x < L; x += 2) {
            const x2 = Math.min(x + 2, L);
            jib.tube([x, 0, -0.6], [x2, 0, -0.6], 0.9);
            jib.tube([x, 0, 0.6], [x2, 0, 0.6], 0.9);
            jib.tube([x, 1.4, 0], [x2, 1.4, 0], 0.9);
            jib.tube([x, 0, -0.6], [x, 0, 0.6], 0.6);
            jib.tube([x, 0, -0.6], [x2, 1.4, 0], 0.6);
            jib.tube([x, 0, 0.6], [x2, 1.4, 0], 0.6);
        }
        for (let x = 0; x > -CL; x -= 2) {
            jib.tube([x, 0, -0.7], [x - 2, 0, -0.7], 0.9);
            jib.tube([x, 0, 0.7], [x - 2, 0, 0.7], 0.9);
            jib.tube([x, 0, -0.7], [x - 2, 0, 0.7], 0.6);
        }
        // Apex + ties
        for (const [x, z] of [[-0.7, -0.7], [0.7, -0.7], [0.7, 0.7], [-0.7, 0.7]]) jib.tube([x, 0, z], [0, 7, 0], 0.9);
        jib.done(top);

        const ties = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 7, 0), new THREE.Vector3(20, 1.4, 0),
            new THREE.Vector3(0, 7, 0), new THREE.Vector3(-CL, 0, 0),
        ]);
        top.add(new THREE.LineSegments(ties, new THREE.LineBasicMaterial({ color: 0x9aa4b2 })));

        const weight = new THREE.Mesh(new THREE.BoxGeometry(2, 2.4, 1.6), this.materials.concrete);
        weight.position.set(-CL + 1.2, -0.8, 0);
        const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.4), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 }));
        cab.position.set(1.2, -0.6, 1.4);
        const cabGlass = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 1.2), new THREE.MeshBasicMaterial({ color: C.tech }));
        cabGlass.position.set(2.03, -0.35, 1.4);
        top.add(weight, cab, cabGlass);

        // Trolley, hoist rope and load (pallet of Tektalan panels)
        const tx = 18;
        const drop = 5.2;
        const trolley = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.4), new THREE.MeshStandardMaterial({ color: 0x334155 }));
        trolley.position.set(tx, -0.2, 0);
        const rope = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(tx, -0.3, 0), new THREE.Vector3(tx, -drop, 0)]),
            new THREE.LineBasicMaterial({ color: 0xcbd5e1 }),
        );
        const load = new THREE.Group();
        load.position.set(tx, -drop, 0);
        const hook = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.3), new THREE.MeshStandardMaterial({ color: C.signal }));
        hook.position.y = -0.25;
        const pallet = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.15, 1.2), new THREE.MeshStandardMaterial({ color: 0x6b5a45 }));
        pallet.position.y = -1.9;
        const stack = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.9, 1.1),
            new THREE.MeshStandardMaterial({ color: C.tektalan, map: this.textures.wool, roughness: 1 }),
        );
        stack.position.y = -1.37;
        const slings = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(-1, -0.9, -0.55),
                new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(1, -0.9, -0.55),
                new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(-1, -0.9, 0.55),
                new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(1, -0.9, 0.55),
            ]),
            new THREE.LineBasicMaterial({ color: 0xcbd5e1 }),
        );
        load.add(hook, pallet, stack, slings);
        top.add(trolley, rope, load);
        this.craneLoad = load;

        // Aviation warning light
        const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff3b30 }));
        beacon.position.set(0, 7.25, 0);
        top.add(beacon);
        this.beacon = beacon;
    }

    buildYard() {
        const g = new THREE.Group();
        this.world.add(g);
        const unit = new THREE.BoxGeometry(1, 1, 1);

        // Site office containers
        const containerMat = new THREE.MeshStandardMaterial({ color: 0x3b4a60, roughness: 0.6, metalness: 0.4 });
        const windowMat = new THREE.MeshBasicMaterial({ color: 0x8fd6ff });
        for (const [y, z] of [[1.3, 13], [3.95, 13]]) {
            const c = new THREE.Mesh(new THREE.BoxGeometry(6, 2.6, 2.4), containerMat);
            c.position.set(-20, y, z);
            const w = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 0.02), windowMat);
            w.position.set(-20, y + 0.3, z + 1.22);
            g.add(c, w);
        }

        // Material staging: pallets with Tektalan stacks, blocks, bagged goods
        const yard = new Batch(unit, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }), 80);
        const loads = [C.tektalan, 0x9ca3af, 0xe5e7eb, C.tektalan, 0x8b95a5];
        let i = 0;
        for (const x of [-15.5, -13.2]) {
            for (const z of [3.8, 6.2, 8.6]) {
                const h = rand(0.6, 1.3);
                yard.box([x, 0.08, z], [1.25, 0.15, 1.05], [0, 0, 0], 0x6b5a45);
                yard.box([x, 0.16 + h / 2, z], [1.15, h, 0.95], [0, rand(-0.05, 0.05), 0], loads[i++ % loads.length]);
            }
        }
        // Logistics lane markings
        for (let x = -24; x < 14; x += 2) yard.box([x, 0.02, 16.4], [1.1, 0.02, 0.16], [0, 0, 0], C.signal);
        for (let z = -10; z < 16; z += 2) yard.box([-10.6, 0.02, z], [0.16, 0.02, 1.1], [0, 0, 0], C.signal);
        yard.done(g);

        const skip = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 2), new THREE.MeshStandardMaterial({ color: C.signal, roughness: 0.55, metalness: 0.35 }));
        skip.position.set(-13, 0.7, 12.4);
        g.add(skip);

        // Site fence
        const posts = new Batch(new THREE.CylinderGeometry(0.06, 0.06, 1, 6), new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6, roughness: 0.4 }), 120);
        const [fx0, fx1, fz0, fz1] = [-27, 17, -13, 19];
        for (let x = fx0; x <= fx1; x += 3) {
            posts.tube([x, 0, fz0], [x, 2, fz0]);
            posts.tube([x, 0, fz1], [x, 2, fz1]);
        }
        for (let z = fz0; z <= fz1; z += 3) {
            posts.tube([fx0, 0, z], [fx0, 2, z]);
            posts.tube([fx1, 0, z], [fx1, 2, z]);
        }
        posts.done(g);

        const fenceTex = this.textures.net.clone();
        fenceTex.needsUpdate = true;
        fenceTex.repeat.set(30, 1.5);
        const fenceMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, alphaMap: fenceTex, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
        const fence = (w, x, z, ry) => {
            const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 2), fenceMat);
            m.position.set(x, 1, z);
            m.rotation.y = ry;
            g.add(m);
        };
        fence(fx1 - fx0, (fx0 + fx1) / 2, fz0, 0);
        fence(fx1 - fx0, (fx0 + fx1) / 2, fz1, 0);
        fence(fz1 - fz0, fx0, (fz0 + fz1) / 2, Math.PI / 2);
        fence(fz1 - fz0, fx1, (fz0 + fz1) / 2, Math.PI / 2);
    }

    buildBlueprint() {
        const g = new THREE.Group();
        this.world.add(g);
        const lineMat = new THREE.LineBasicMaterial({ color: C.tech, transparent: true, opacity: 0.55 });

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(15.4, 15.5, 128),
            new THREE.MeshBasicMaterial({ color: C.tech, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.03;
        g.add(ring);
        this.ring = ring;

        const ticks = [];
        for (let i = 0; i < 72; i++) {
            const a = (i / 72) * Math.PI * 2;
            const r1 = 15.5;
            const r2 = i % 6 === 0 ? 16.6 : 16;
            ticks.push(Math.cos(a) * r1, 0.03, Math.sin(a) * r1, Math.cos(a) * r2, 0.03, Math.sin(a) * r2);
        }
        // Dimension lines: width (front) and height (east-back corner)
        const dz = HD + 3.6;
        ticks.push(-HW, 0.04, dz, HW, 0.04, dz, -HW, 0.04, dz - 0.5, -HW, 0.04, dz + 0.5, HW, 0.04, dz - 0.5, HW, 0.04, dz + 0.5);
        const hx = HW + 3.2;
        const hz = -HD - 1;
        const H = FLOORS * FH + SLAB / 2;
        ticks.push(hx, 0, hz, hx, H, hz, hx - 0.5, 0, hz, hx + 0.5, 0, hz, hx - 0.5, H, hz, hx + 0.5, H, hz);
        const tickGeo = new THREE.BufferGeometry();
        tickGeo.setAttribute('position', new THREE.Float32BufferAttribute(ticks, 3));
        g.add(new THREE.LineSegments(tickGeo, lineMat));

        const wLabel = labelSprite('18.00 M', { scale: 1.1 });
        wLabel.position.set(0, 0.9, dz);
        const hLabel = labelSprite(`${H.toFixed(2)} M`, { scale: 1.1 });
        hLabel.position.set(hx + 1.6, H / 2, hz);
        const tag = labelSprite('GB · STRUCT-01', { color: '#ff8a33', scale: 1.2 });
        tag.position.set(-4, FLOORS * FH + 3.4, 0);
        g.add(wLabel, hLabel, tag);
    }

    buildHighlights() {
        this.zones = {};
        for (const [key, boxes] of Object.entries(ZONES)) {
            const group = new THREE.Group();
            const lineMat = new THREE.LineBasicMaterial({ color: C.signal, transparent: true, opacity: 0, depthTest: false });
            const fillMat = new THREE.MeshBasicMaterial({ color: C.signal, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
            const scanMat = new THREE.LineBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0, depthTest: false });
            const scans = [];

            for (const [min, max] of boxes) {
                const size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
                const center = [(max[0] + min[0]) / 2, (max[1] + min[1]) / 2, (max[2] + min[2]) / 2];
                const geo = new THREE.BoxGeometry(...size);

                const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat);
                edges.position.set(...center);
                edges.renderOrder = 10;
                const fill = new THREE.Mesh(geo, fillMat);
                fill.position.set(...center);
                fill.renderOrder = 9;

                const [hx, hz] = [size[0] / 2, size[2] / 2];
                const scan = new THREE.LineLoop(
                    new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(-hx, 0, -hz), new THREE.Vector3(hx, 0, -hz),
                        new THREE.Vector3(hx, 0, hz), new THREE.Vector3(-hx, 0, hz),
                    ]),
                    scanMat,
                );
                scan.position.set(center[0], min[1], center[2]);
                scan.renderOrder = 11;
                scans.push({ line: scan, y0: min[1], y1: max[1] });

                group.add(edges, fill, scan);
            }
            this.world.add(group);
            this.zones[key] = { group, lineMat, fillMat, scanMat, scans };
        }
    }

    buildParticles() {
        const dot = this.textures.dot;

        // Ambient site dust
        const n = this.lowPower ? 700 : 1800;
        const pos = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
            pos[i * 3] = rand(-70, 70);
            pos[i * 3 + 1] = rand(0, 55);
            pos[i * 3 + 2] = rand(-70, 70);
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        this.dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
            size: 0.16, map: dot, color: 0xb9d4ee, transparent: true, opacity: 0.45,
            depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        this.world.add(this.dust);

        // Construction dust swirling on the fit-out floor (Baureinigung)
        const fn = this.lowPower ? 120 : 280;
        const fpos = new Float32Array(fn * 3);
        this.floorDustSpeed = new Float32Array(fn);
        for (let i = 0; i < fn; i++) {
            fpos[i * 3] = rand(-1, HW);
            fpos[i * 3 + 1] = rand(floorY(3), ceilY(3));
            fpos[i * 3 + 2] = rand(-HD, HD);
            this.floorDustSpeed[i] = rand(0.1, 0.45);
        }
        const fGeo = new THREE.BufferGeometry();
        fGeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
        this.floorDust = new THREE.Points(fGeo, new THREE.PointsMaterial({
            size: 0.12, map: dot, color: 0xe4d3b4, transparent: true, opacity: 0.6, depthWrite: false,
        }));
        this.world.add(this.floorDust);

        // Cutting sparks (Abbruch)
        const sn = 320;
        this.sparks = {
            n: sn,
            pos: new Float32Array(sn * 3),
            col: new Float32Array(sn * 3),
            vel: new Float32Array(sn * 3),
            life: new Float32Array(sn),
            maxLife: new Float32Array(sn),
            cursor: 0,
            carry: 0,
        };
        this.sparks.pos.fill(-999);
        const sGeo = new THREE.BufferGeometry();
        sGeo.setAttribute('position', new THREE.BufferAttribute(this.sparks.pos, 3));
        sGeo.setAttribute('color', new THREE.BufferAttribute(this.sparks.col, 3));
        this.sparkPoints = new THREE.Points(sGeo, new THREE.PointsMaterial({
            size: 0.2, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        this.sparkPoints.frustumCulled = false;
        this.world.add(this.sparkPoints);

        // Glints on the polished facade (Bauendreinigung)
        const gn = 46;
        const gpos = new Float32Array(gn * 3);
        this.glintPhase = new Float32Array(gn);
        for (let i = 0; i < gn; i++) {
            const side = i % 2;
            gpos[i * 3] = side ? HW + 0.32 : rand(-HW, HW);
            gpos[i * 3 + 1] = rand(0.4, 3 * FH - 0.4);
            gpos[i * 3 + 2] = side ? rand(-HD, HD) : HD + 0.32;
            this.glintPhase[i] = rand(0, Math.PI * 2);
        }
        const gGeo = new THREE.BufferGeometry();
        gGeo.setAttribute('position', new THREE.BufferAttribute(gpos, 3));
        gGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(gn * 3), 3));
        this.glints = new THREE.Points(gGeo, new THREE.PointsMaterial({
            size: 0.55, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        this.world.add(this.glints);
    }

    /* ------------------------------------------------------------------ */
    /* Frame loop                                                          */
    /* ------------------------------------------------------------------ */

    updateSparks(dt) {
        const s = this.sparks;
        const floor = floorY(8) + 0.03;

        s.carry += this.sparkRate * dt;
        while (s.carry >= 1) {
            s.carry -= 1;
            const i = s.cursor;
            s.cursor = (s.cursor + 1) % s.n;
            s.pos[i * 3] = SPARK_ORIGIN.x + rand(-0.1, 0.1);
            s.pos[i * 3 + 1] = SPARK_ORIGIN.y + rand(-0.05, 0.05);
            s.pos[i * 3 + 2] = SPARK_ORIGIN.z + rand(-0.1, 0.1);
            s.vel[i * 3] = rand(-3.2, 1.2);
            s.vel[i * 3 + 1] = rand(0.5, 3.8);
            s.vel[i * 3 + 2] = rand(-2.4, 2.4);
            s.life[i] = s.maxLife[i] = rand(0.5, 1.3);
        }

        for (let i = 0; i < s.n; i++) {
            if (s.life[i] <= 0) continue;
            s.life[i] -= dt;
            const k = i * 3;
            s.vel[k + 1] -= 9.8 * dt;
            s.pos[k] += s.vel[k] * dt;
            s.pos[k + 1] += s.vel[k + 1] * dt;
            s.pos[k + 2] += s.vel[k + 2] * dt;
            if (s.pos[k + 1] < floor && s.vel[k + 1] < 0 && Math.abs(s.pos[k]) < HW + 0.3 && Math.abs(s.pos[k + 2]) < HD + 0.3) {
                s.pos[k + 1] = floor;
                s.vel[k + 1] *= -0.28;
                s.vel[k] *= 0.55;
                s.vel[k + 2] *= 0.55;
            }
            const t = Math.max(s.life[i] / s.maxLife[i], 0);
            s.col[k] = 1.0 * t;
            s.col[k + 1] = (0.35 + 0.55 * t * t) * t;
            s.col[k + 2] = 0.08 * t * t;
            if (s.life[i] <= 0) s.pos[k + 1] = -999;
        }
        this.sparkPoints.geometry.attributes.position.needsUpdate = true;
        this.sparkPoints.geometry.attributes.color.needsUpdate = true;
    }

    tick() {
        this.raf = requestAnimationFrame(this.tick);
        const dt = Math.min(this.clock.getDelta(), 0.05);
        if (!this.active || document.hidden) return;
        const t = this.clock.elapsedTime;
        const motion = this.reducedMotion ? 0.15 : 1;

        // Mouse parallax (lerped)
        this.parallax.lerp(this.pointer, 0.045);
        this.world.rotation.y = this.parallax.x * 0.05;
        this.world.rotation.x = this.parallax.y * 0.012;

        // Crane slewing + load sway
        this.craneTop.rotation.y = -0.39 + Math.sin(t * 0.11 * motion) * 0.45;
        this.craneLoad.rotation.z = Math.sin(t * 0.9) * 0.03 * motion;
        this.beacon.visible = Math.sin(t * 4) > 0;

        // Particles
        this.dust.rotation.y = t * 0.008 * motion;
        this.dust.position.y = Math.sin(t * 0.25) * 0.6;
        const fp = this.floorDust.geometry.attributes.position;
        const y0 = floorY(3);
        const y1 = ceilY(3);
        for (let i = 0; i < fp.count; i++) {
            let y = fp.getY(i) + this.floorDustSpeed[i] * dt * motion;
            if (y > y1) y = y0;
            fp.setY(i, y);
            fp.setX(i, fp.getX(i) + Math.sin(t * 0.7 + i) * dt * 0.12 * motion);
        }
        fp.needsUpdate = true;

        this.updateSparks(dt * motion);
        this.sparkLight.intensity = 22 + Math.random() * 38;

        const gc = this.glints.geometry.attributes.color;
        for (let i = 0; i < gc.count; i++) {
            const v = Math.pow(Math.max(Math.sin(t * 1.3 + this.glintPhase[i]), 0), 12);
            gc.setXYZ(i, v * 0.8, v * 0.95, v);
        }
        gc.needsUpdate = true;

        // Active zone scan line
        const zone = this.zones[this.current];
        if (zone) {
            const p = (Math.sin(t * 1.4) + 1) / 2;
            for (const s of zone.scans) s.line.position.y = s.y0 + (s.y1 - s.y0) * p;
        }

        this.ring.material.opacity = 0.25 + Math.sin(t * 1.5) * 0.1;

        this.controls.update(dt);
        this.renderer.render(this.scene, this.camera);
    }

    onPointer(e) {
        this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    }

    onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.renderer.setSize(w, h, false);
        this.camera.aspect = w / h;
        if (this.viewShift) {
            this.camera.setViewOffset(w, h, -w * this.viewShift, 0, w, h);
        } else {
            this.camera.clearViewOffset();
        }
        this.camera.updateProjectionMatrix();
    }

    dispose() {
        cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('pointermove', this.onPointer);
        this.controls.dispose();
        this.renderer.dispose();
    }
}
