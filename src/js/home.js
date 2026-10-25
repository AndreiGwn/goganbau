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

    pauseWhenHidden(scene);
}

function heroIntro(reducedMotion) {
    const items = document.querySelectorAll('[data-hero-item]');
    if (reducedMotion || !items.length) return;
    gsap.from(items, { y: 28, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.15 });
}

/** The building only sits behind the hero; stop drawing it once the hero is scrolled away. */
function pauseWhenHidden(scene) {
    const hero = document.getElementById('top');
    new IntersectionObserver(([entry]) => scene.setActive(entry.isIntersecting), { threshold: 0 }).observe(hero);
}
