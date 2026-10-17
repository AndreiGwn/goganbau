import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import { initNav, initReveal, initCompare } from './ui.js';
import { initInquiryForms } from './inquiry.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) document.documentElement.classList.add('js-motion');

initNav();
initReveal();
initCompare();
initInquiryForms();

const canvas = document.getElementById('scene-canvas');
if (canvas) {
    import('./home.js').then(({ initHome }) => initHome(canvas, { reducedMotion }));
}
