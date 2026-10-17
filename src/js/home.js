import gsap from 'gsap';

function webglAvailable() {
    try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
        return false;
    }
}

export async function initHome(canvas, { reducedMotion }) {
    heroIntro(reducedMotion);

    if (!webglAvailable()) {
        canvas.parentElement.classList.add('scene-fallback');
        canvas.remove();
        return;
    }

    const { BuildingScene } = await import('./scene/BuildingScene.js');
    let scene;
    try {
        scene = new BuildingScene(canvas, { reducedMotion });
    } catch (err) {
        console.warn('3D scene unavailable:', err);
        canvas.parentElement.classList.add('scene-fallback');
        canvas.remove();
        return;
    }
    gsap.to(canvas, { opacity: 1, duration: reducedMotion ? 0 : 1.4, ease: 'power2.out' });

    const desktop = window.matchMedia('(min-width: 1024px)');
    // Phones: pull the camera back and push the building right, so it shows beside the text.
    const applyFraming = () => (desktop.matches ? scene.setFraming(0.17, 1) : scene.setFraming(0.3, 1.5));
    applyFraming();
    desktop.addEventListener('change', applyFraming);

    wireServices(scene);
    wireSections(scene);
}

function heroIntro(reducedMotion) {
    const items = document.querySelectorAll('[data-hero-item]');
    if (reducedMotion || !items.length) return;
    gsap.from(items, { y: 28, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.15 });
}

/** Desktop: hovering a service row moves the camera to its zone of the building. */
function wireServices(scene) {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const cards = [...document.querySelectorAll('[data-service-card]')];
    let hoverTimer = null;

    const activate = (card) => {
        cards.forEach((c) => c.classList.toggle('is-active', c === card));
        scene.focus(card.dataset.serviceCard);
    };

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => activate(card), 140);
        });
        card.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
    });
}

/** Section-level camera presets + pausing the renderer when the model is covered. */
function wireSections(scene) {
    const hero = document.getElementById('top');
    const services = document.getElementById('leistungen');
    const visible = new Set();

    const io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
            }
            scene.setActive(visible.size > 0);
        },
        { threshold: 0 },
    );
    io.observe(hero);
    io.observe(services);

    // Switch preset when a section crosses the middle of the viewport
    const presetIo = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                if (entry.target === hero) {
                    document.querySelectorAll('[data-service-card].is-active').forEach((c) => c.classList.remove('is-active'));
                    scene.focus('overview');
                } else if (!document.querySelector('[data-service-card].is-active')) {
                    scene.focus('services');
                }
            }
        },
        { rootMargin: '-45% 0px -45% 0px' },
    );
    presetIo.observe(hero);
    presetIo.observe(services);
}
