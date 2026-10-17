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

