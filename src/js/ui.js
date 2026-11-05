export function initNav() {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = nav.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('overflow-hidden', open);
    };
    toggle.addEventListener('click', () => setOpen(menu.hidden));
    menu.querySelectorAll('a, button').forEach((el) => el.addEventListener('click', () => setOpen(false)));
    window.addEventListener('keydown', (e) => e.key === 'Escape' && !menu.hidden && setOpen(false));
}

export function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length || !document.documentElement.classList.contains('js-motion')) return;

    const io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
}

/** Vorher/Nachher sliders: the range input drives the split position. */
export function initCompare() {
    document.querySelectorAll('[data-compare]').forEach((figure) => {
        const range = figure.querySelector('[data-compare-range]');
        range.addEventListener('input', () => figure.style.setProperty('--pos', `${range.value}%`));
    });
}


// Hero video: plays muted on loop; buttons for play/pause, restart from the beginning, and sound.
export function initHeroVideo() {
    document.querySelectorAll('[data-hero-video]').forEach((wrap) => {
        const video = wrap.querySelector('video');
        const play = wrap.querySelector('[data-video-play]');
        const sound = wrap.querySelector('[data-video-sound]');
        // Show one of the two icons inside a button.
        const show = (button, on, off, flag) => {
            button.querySelector(`[data-icon="${on}"]`).classList.toggle('hidden', !flag);
            button.querySelector(`[data-icon="${off}"]`).classList.toggle('hidden', flag);
        };
        const sync = () => {
            show(play, 'pause', 'play', !video.paused);
            play.setAttribute('aria-label', video.paused ? 'Video abspielen' : 'Video pausieren');
            show(sound, 'sound', 'muted', !video.muted);
            sound.setAttribute('aria-label', video.muted ? 'Ton an' : 'Ton aus');
            sound.setAttribute('aria-pressed', String(!video.muted));
        };
        ['play', 'pause', 'volumechange'].forEach((e) => video.addEventListener(e, sync));
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();

        play.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
        wrap.querySelector('[data-video-restart]').addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
        });
        sound.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.paused) video.play();
        });
        sync();
    });
}
