/*
 * Page templates. renderPages() returns every page of the site as { file, html };
 * site/render.js writes them to disk and Vite builds them (see site/vite-plugin.js).
 */
import fs from 'node:fs';
import path from 'node:path';
import gb from './content.js';

const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const each = (list, fn) => list.map(fn).join('');
const services = Object.entries(gb.services);
const wa = (text) => `https://wa.me/${gb.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/* ---------------------------------------------------------------- icons */

const icon = {
    arrow: (cls = 'size-4') => `<svg viewBox="0 0 24 24" class="${cls}" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    chevronRight: (cls = 'size-4') => `<svg viewBox="0 0 24 24" class="${cls}" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6"/></svg>`,
    chevronDown: '<svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    check: (cls = 'size-5') => `<svg viewBox="0 0 24 24" class="${cls} shrink-0 text-signal" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 5 5L20 7"/></svg>`,
    whatsapp: (cls = 'size-5') =>
        `<svg viewBox="0 0 24 24" class="${cls} shrink-0" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.35-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02"/></svg>`,
};

// GoganBau logo mark: tower crane over three buildings. Same drawing as public/favicon.svg and public/images/logo.svg.
const logoMark = (cls = 'size-10') => `<svg viewBox="0 0 64 64" class="${cls} shrink-0" aria-hidden="true">
    <rect width="64" height="64" fill="#0A0E17" stroke="rgba(255,255,255,.14)"/>
    <g fill="#FF6B00">
        <path d="M13 50V5M7 13h49M13 5 7 13M13 5l31 8" fill="none" stroke="#FF6B00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M48 13v10" fill="none" stroke="#FF6B00" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="5.5" y="13" width="5" height="4"/>
        <rect x="44.5" y="23" width="7" height="4.5"/>
    </g>
    <path d="M19 50V30l9-4v24M31 50V19l9 4v27M43 50V35l8 3v12" fill="none" stroke="#E2E8F0" stroke-width="3" stroke-linejoin="round"/>
    <path d="M7 54c14-6 36-6 50 0" fill="none" stroke="#FF6B00" stroke-width="4" stroke-linecap="round"/>
</svg>`;

const logo = () => `<span class="flex items-center gap-3">
    ${logoMark()}
    <span class="leading-none">
        <span class="block font-display text-lg font-bold tracking-tight text-white">Gogan<span class="text-signal">Bau</span></span>
        <span class="mt-1 block font-mono text-[9px] tracking-[0.2em] text-mist uppercase">&amp; Gebäudereinigung</span>
    </span>
</span>`;

/* ------------------------------------------------------------- partials */

function nav(ctx) {
    const { url, anchor, current } = ctx;
    return `<header data-nav class="group/nav fixed inset-x-0 top-0 z-50 transition-colors duration-300 [&.is-scrolled]:border-b [&.is-scrolled]:border-white/10 [&.is-scrolled]:bg-obsidian/85 [&.is-scrolled]:backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="${url()}" class="shrink-0" aria-label="${esc(gb.name)} – Startseite">${logo()}</a>

        <nav class="hidden items-center gap-8 text-sm text-slate-300 lg:flex" aria-label="Hauptnavigation">
            <div class="group/dd relative">
                <a href="${anchor('leistungen')}" class="flex items-center gap-1.5 py-2 transition hover:text-white">
                    Leistungen <span class="inline-flex transition group-focus-within/dd:rotate-180 group-hover/dd:rotate-180">${icon.chevronDown}</span>
                </a>
                <div class="invisible absolute top-full -left-4 pt-2 opacity-0 transition group-focus-within/dd:visible group-focus-within/dd:opacity-100 group-hover/dd:visible group-hover/dd:opacity-100">
                    <ul class="glass-strong w-64 py-2 shadow-2xl">
                        ${each(services, ([key, s]) => `<li><a href="${url(`leistungen/${key}/`)}" class="block px-4 py-2.5 hover:bg-white/5 hover:text-white ${current === key ? 'text-signal' : ''}">${esc(s.title)}</a></li>`)}
                    </ul>
                </div>
            </div>
            <a href="${anchor('ueber-uns')}" class="transition hover:text-white">Über uns</a>
            <a href="${anchor('kontakt')}" class="transition hover:text-white">Kontakt</a>
        </nav>

        <div class="flex items-center gap-3">
            <a href="${gb.contact.phoneHref}" class="hidden items-center gap-2.5 font-mono text-xs text-slate-200 xl:flex">
                <span class="live-dot"></span>
                <span><span class="text-signal">24/7</span> ${esc(gb.contact.phone)}</span>
            </a>
            <a href="${wa()}" target="_blank" rel="noopener" class="btn-ghost btn-sm hidden lg:inline-flex">${icon.whatsapp('size-4')} WhatsApp</a>
            <a href="${anchor('kontakt')}" class="btn-primary btn-sm hidden lg:inline-flex">Anfrage stellen</a>
            <!-- Phones: calling, WhatsApp and the form live in the bottom bar. -->
            <button type="button" data-nav-toggle aria-expanded="false" aria-controls="mobile-menu" class="grid size-11 place-items-center border border-white/15 text-white lg:hidden">
                <span class="sr-only">Menü</span>
                <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
            </button>
        </div>
    </div>

    <div id="mobile-menu" data-nav-menu hidden class="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-white/10 bg-obsidian/95 px-4 pb-4 backdrop-blur-xl lg:hidden">
        <nav class="flex flex-col font-display text-xl font-semibold text-white" aria-label="Mobile Navigation">
            <a href="${url()}" class="border-b border-white/10 py-4">Startseite</a>
            <details class="group/acc border-b border-white/10"${current ? ' open' : ''}>
                <summary class="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                    Leistungen <span class="inline-flex text-mist transition group-open/acc:rotate-180">${icon.chevronDown}</span>
                </summary>
                <ul class="pb-3 pl-4 font-sans text-base font-normal">
                    ${each(services, ([key, s]) => `<li><a href="${url(`leistungen/${key}/`)}" class="block py-2.5 ${current === key ? 'text-signal' : 'text-slate-300'}">${esc(s.title)}</a></li>`)}
                    <li><a href="${anchor('leistungen')}" class="block py-2.5 font-semibold text-white">Alle Leistungen ansehen →</a></li>
                </ul>
            </details>
            <a href="${anchor('ueber-uns')}" class="border-b border-white/10 py-4">Über uns</a>
            <a href="${anchor('kontakt')}" class="py-4">Kontakt</a>
        </nav>
    </div>
</header>`;
}

function footer({ url }) {
    return `<footer class="relative z-10 border-t border-white/10 bg-obsidian">
    <div class="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
            ${logo()}
            <p class="mt-4 text-sm text-mist">${esc(gb.motto)}</p>
        </div>
        <ul class="flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
            <li><a href="${gb.contact.phoneHref}" class="font-mono text-white transition hover:text-signal">${esc(gb.contact.phone)}</a></li>
            <li><a href="mailto:${gb.contact.email}" class="font-mono text-white transition hover:text-signal">${esc(gb.contact.email)}</a></li>
            <li><a href="${wa()}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-mono text-white transition hover:text-signal">${icon.whatsapp('size-4')} WhatsApp</a></li>
        </ul>
    </div>
    <div class="border-t border-white/10">
        <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 font-mono text-[11px] tracking-wider text-slate-500 uppercase sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <span>© ${gb.founded}–${new Date().getFullYear()} ${esc(gb.name)}</span>
            <span class="flex gap-6">
                <a href="${url('impressum/')}" class="hover:text-white">Impressum</a>
                <a href="${url('datenschutz/')}" class="hover:text-white">Datenschutz</a>
            </span>
        </div>
    </div>
</footer>`;
}

// Phones: the three ways to reach us, always one tap away.
function mobileBar({ anchor }) {
    return `<nav class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-obsidian/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden" aria-label="Schnellkontakt">
    <a href="${gb.contact.phoneHref}" class="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-slate-200">
        <svg viewBox="0 0 24 24" class="size-5 text-signal" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
        Anrufen
    </a>
    <a href="${wa()}" target="_blank" rel="noopener" class="flex flex-col items-center gap-1 border-x border-white/10 py-2.5 text-[11px] font-medium text-slate-200">
        ${icon.whatsapp('size-5 text-[#25D366]')}
        WhatsApp
    </a>
    <a href="${anchor('kontakt')}" class="flex flex-col items-center gap-1 bg-signal py-2.5 text-[11px] font-semibold text-white">
        <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>
        Anfrage
    </a>
</nav>`;
}

/**
 * Short contact form. With a Web3Forms key it posts there (via fetch in src/js/inquiry.js,
 * or as a plain form POST without JavaScript); without a key it opens the visitor's mail app.
 */
function inquiryForm({ url }) {
    const field = (name) => `<p class="field-error" data-error-for="${name}" hidden></p>`;
    return `<div>
    <form action="https://api.web3forms.com/submit" method="POST" data-inquiry-form data-whatsapp="${gb.contact.whatsapp}" data-mailto="${esc(gb.inquiryEmail)}" novalidate class="grid gap-5">
        <input type="hidden" name="access_key" value="${esc(gb.web3formsKey)}">
        <input type="hidden" name="subject" value="Neue Anfrage über die Website">
        <input type="hidden" name="from_name" value="${esc(gb.shortName)} Website">
        <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true">

        <div>
            <label for="f-name" class="field-label">Name *</label>
            <input id="f-name" name="name" class="field" autocomplete="name" required maxlength="120">
            ${field('name')}
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label for="f-phone" class="field-label">Telefon</label>
                <input id="f-phone" type="tel" name="phone" class="field" autocomplete="tel" inputmode="tel" maxlength="40">
                ${field('phone')}
            </div>
            <div>
                <label for="f-email" class="field-label">E-Mail</label>
                <input id="f-email" type="email" name="email" class="field" autocomplete="email" inputmode="email" maxlength="160">
                ${field('email')}
            </div>
            <p class="-mt-3 text-xs text-mist sm:col-span-2">Telefon oder E-Mail genügt.</p>
        </div>

        <div>
            <label for="f-service" class="field-label">Leistung <span class="normal-case tracking-normal">(optional)</span></label>
            <select id="f-service" name="service" class="field">
                <option value="">Noch offen</option>
                ${each(services, ([key, s]) => `<option value="${esc(s.title)}" data-key="${key}">${esc(s.title)}</option>`)}
            </select>
        </div>

        <div>
            <label for="f-message" class="field-label">Nachricht</label>
            <textarea id="f-message" name="message" rows="4" class="field resize-y" maxlength="3000" placeholder="Was, wo und wann?"></textarea>
            ${field('message')}
        </div>

        <p data-form-error hidden role="alert" class="border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"></p>

        <div class="grid gap-3 sm:grid-cols-2">
            <button type="submit" class="btn-primary">Per E-Mail senden ${icon.arrow()}</button>
            <button type="button" data-send-whatsapp class="btn-ghost">${icon.whatsapp('size-4 text-[#25D366]')} Per WhatsApp senden</button>
        </div>

        <p class="text-xs text-mist">Ihre Angaben nutzen wir nur für die Antwort auf Ihre Anfrage. <a href="${url('datenschutz/')}" class="underline underline-offset-2 hover:text-white">Datenschutz</a></p>
    </form>

    <div data-inquiry-success hidden tabindex="-1" class="py-10 text-center outline-none">
        <div class="mx-auto grid size-14 place-items-center border border-signal/50 bg-signal/10 text-signal">
            <svg viewBox="0 0 24 24" class="size-7" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 5 5L20 7"/></svg>
        </div>
        <p class="mt-5 font-display text-2xl font-bold text-white">Anfrage gesendet.</p>
        <p class="mx-auto mt-3 max-w-md text-sm">Danke! Wir melden uns so schnell wie möglich.</p>
    </div>
</div>`;
}

// Vorher/Nachher slider. Drag (or use arrow keys) to compare; without JS it shows a 50/50 split.
function beforeAfter(project) {
    return `<figure data-compare style="--pos: 50%">
    <div class="relative aspect-[4/3] overflow-hidden bg-steel select-none">
        <img src="/${project.after}" alt="Nachher: ${esc(project.title)}" loading="lazy" class="absolute inset-0 size-full object-cover">
        <img src="/${project.before}" alt="Vorher: ${esc(project.title)}" loading="lazy" class="absolute inset-0 size-full object-cover" style="clip-path: inset(0 calc(100% - var(--pos)) 0 0)">
        <span class="pointer-events-none absolute top-3 left-3 bg-obsidian/80 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase">Vorher</span>
        <span class="pointer-events-none absolute top-3 right-3 bg-signal px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase">Nachher</span>
        <div class="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style="left: var(--pos)">
            <span class="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-obsidian shadow-lg">
                <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 7-5 5 5 5M15 7l5 5-5 5"/></svg>
            </span>
        </div>
        <input type="range" min="0" max="100" value="50" data-compare-range aria-label="Vorher und Nachher vergleichen" class="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0">
    </div>
    <figcaption class="mt-3 flex items-baseline justify-between gap-4 text-sm">
        <span class="font-display font-semibold text-white">${esc(project.title)}</span>
        ${project.symbolbild ? '<span class="font-mono text-[10px] tracking-[0.15em] text-mist uppercase">Symbolbild</span>' : ''}
    </figcaption>
</figure>`;
}

/**
 * Machine-readable company card for Google (schema.org LocalBusiness): name, address, contact,
 * area and services. Helps Google match the site to the Google Business Profile and local searches.
 */
function structuredData() {
    const url = (p = '') => `${gb.siteUrl}/${p}`;
    const data = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': url('#firma'),
        name: gb.name,
        alternateName: gb.shortName,
        description: gb.homeDescription,
        url: url(),
        telephone: gb.contact.phone.replace(/\s/g, ''),
        email: gb.contact.email,
        logo: url('apple-touch-icon.png'),
        image: url('apple-touch-icon.png'),
        foundingDate: String(gb.founded),
        address: {
            '@type': 'PostalAddress',
            streetAddress: gb.contact.street,
            addressLocality: gb.contact.city,
            ...(gb.contact.postalCode && { postalCode: gb.contact.postalCode }),
            addressCountry: 'DE',
        },
        areaServed: { '@type': 'City', name: 'München' },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Leistungen',
            itemListElement: services.map(([key, s]) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.title, description: s.description, url: url(`leistungen/${key}/`) },
            })),
        },
    };
    return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

/* --------------------------------------------------------------- layout */

// title: the full browser-tab / Google title. description: the text under the Google result.
// head: extra tags for <head>, e.g. structured data.
function layout(ctx, { title, description = gb.homeDescription, head = '', body }) {
    const canonical = ctx.path === null ? '' : `
    <link rel="canonical" href="${gb.siteUrl}/${ctx.path}">
    <meta property="og:url" content="${gb.siteUrl}/${ctx.path}">`;
    return `<!DOCTYPE html>
<html lang="de" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="theme-color" content="#0A0E17">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:type" content="website">${canonical}
    <!-- Bump ?v= whenever the logo changes, so browsers drop their cached tab icon. -->
    <link rel="icon" href="/favicon.ico?v=2" sizes="32x32">
    <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2">
    <link rel="stylesheet" href="/src/css/app.css">
    <script type="module" src="/src/js/app.js"></script>
    ${head}
</head>
<body class="min-h-screen bg-obsidian pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans text-slate-300 antialiased lg:pb-0">
    <a href="#main" class="sr-only z-[100] bg-signal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Zum Inhalt springen</a>
    ${nav(ctx)}
    <main id="main">
        ${body}
    </main>
    ${footer(ctx)}
    ${mobileBar(ctx)}
</body>
</html>
`;
}

/* ---------------------------------------------------------------- pages */

function homePage(ctx, projects) {
    const { url } = ctx;
    const channels = [
        ['Telefon · 24/7', esc(gb.contact.phone), gb.contact.phoneHref, false],
        ['WhatsApp', 'Nachricht schreiben', wa(), true],
        ['E-Mail', esc(gb.contact.email), `mailto:${gb.contact.email}`, false],
    ];

    return layout(ctx, {
        title: gb.homeTitle,
        head: structuredData(),
        body: `
    <!-- Fixed 3D canvas behind hero + services; later sections are opaque and cover it. -->
    <div class="fixed inset-0 z-0" aria-hidden="true">
        <canvas id="scene-canvas" class="block h-full w-full opacity-0"></canvas>
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent lg:via-obsidian/30"></div>
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent"></div>
    </div>

    <section id="top" class="pointer-events-none relative z-10 flex min-h-[100svh] items-center pt-24 pb-16">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="pointer-events-auto max-w-xl">
                <!-- The keyword line is the h1 for search engines; the big claim below is styled text. -->
                <h1 data-hero-item class="eyebrow">${esc(gb.eyebrow)}</h1>
                <p data-hero-item class="mt-6 font-display text-5xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">Wir sind da,<br>wenn es zählt.</p>
                <p data-hero-item class="mt-8 text-lg text-slate-300">${esc(gb.tagline)}</p>
                <div data-hero-item class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <a href="#kontakt" class="btn-primary">Anfrage stellen ${icon.arrow()}</a>
                    <a href="#leistungen" class="btn-ghost">Unsere Leistungen</a>
                </div>
                <p data-hero-item class="mt-12 font-mono text-[11px] tracking-[0.2em] text-mist uppercase">
                    Seit ${gb.founded} <span class="text-signal">·</span> ${esc(gb.region)} <span class="text-signal">·</span> 24/7
                </p>
            </div>
        </div>
    </section>

    <section id="leistungen" class="pointer-events-none relative z-10 scroll-mt-16 py-24 lg:py-32">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="pointer-events-auto max-w-md">
                <p class="eyebrow">Leistungen</p>
                <h2 class="section-title mt-4">Was wir machen.</h2>
                <!-- Phones: narrow, title-only rows so the building stays visible on the right. -->
                <ul class="mt-10 w-[62%] min-w-[13rem] divide-y divide-white/10 border-y border-white/10 bg-obsidian/60 backdrop-blur-sm sm:w-full">
                    ${each(services, ([key, s]) => `<li>
                        <a href="${url(`leistungen/${key}/`)}" data-service-card="${key}" class="service-card group flex items-center gap-3 px-3 py-3.5 transition-colors duration-300 hover:bg-steel/60 sm:gap-4 sm:px-4">
                            <span class="hidden font-mono text-xs text-signal sm:inline">${s.number}</span>
                            <span class="min-w-0 flex-1">
                                <span class="block font-display text-[15px] font-semibold text-white sm:text-base">${esc(s.title)}</span>
                                <span class="mt-0.5 hidden text-sm text-slate-400 sm:block">${esc(s.short)}</span>
                            </span>
                            ${icon.chevronRight('size-4 shrink-0 text-mist transition group-hover:translate-x-0.5 group-hover:text-signal')}
                        </a>
                    </li>`)}
                </ul>
                <a href="#kontakt" class="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-signal uppercase hover:text-signal-soft">Passende Leistung dabei? Anfrage stellen ${icon.arrow()}</a>
            </div>
        </div>
    </section>

    <section id="schwerpunkte" class="relative z-10 scroll-mt-16 border-t border-white/10 bg-obsidian py-24 lg:py-32">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-reveal class="max-w-2xl">
                <p class="eyebrow">Schwerpunkte</p>
                <h2 class="section-title mt-4">Abbruch und Reinigung aus einer Hand.</h2>
            </div>
            <div class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
                ${each(gb.focusAreas, (area, i) => `<div data-reveal style="--reveal-delay: ${i * 100}ms" class="border-t-2 ${i === 1 ? 'border-emerald-400' : 'border-signal'} pt-6">
                    <h3 class="font-display text-xl font-bold text-white">${esc(area.title)}</h3>
                    <p class="mt-3 text-slate-400">${esc(area.text)}</p>
                    <ul class="mt-5 space-y-2 text-sm">
                        ${each(area.services, (key) => `<li><a href="${url(`leistungen/${key}/`)}" class="inline-flex items-center gap-2 text-white hover:text-signal-soft">${icon.arrow('size-3.5 text-signal')} ${esc(gb.services[key].title)}</a></li>`)}
                    </ul>
                </div>`)}
            </div>
        </div>
    </section>

    ${
        projects.length
            ? `<section id="projekte" class="relative z-10 scroll-mt-16 border-t border-white/10 bg-obsidian-2 py-24 lg:py-32">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-reveal>
                <p class="eyebrow">Vorher / Nachher</p>
                <h2 class="section-title mt-4">Ergebnisse, die man sieht.</h2>
                <p class="mt-4 text-mist">Regler ziehen zum Vergleichen.</p>
            </div>
            <div class="mt-12 grid gap-10 md:grid-cols-2">${each(projects, (p) => `<div data-reveal>${beforeAfter(p)}</div>`)}</div>
        </div>
    </section>`
            : ''
    }

    <section id="ueber-uns" class="relative z-10 scroll-mt-16 border-t border-white/10 bg-obsidian py-24 lg:py-32">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div data-reveal>
                <p class="eyebrow">Über uns</p>
                <h2 class="section-title mt-4">Ein Partner, der mitdenkt.</h2>
                <p class="mt-6 text-lg text-slate-400">Seit ${gb.founded} unterstützen wir Bauunternehmen in ${esc(gb.region)}.</p>
                ${each(gb.about, (p) => `<p class="mt-4 text-slate-400">${esc(p)}</p>`)}
            </div>
            <ul data-reveal style="--reveal-delay: 120ms" class="self-end">
                ${each(gb.highlights, (item) => `<li class="flex items-center gap-4 border-b border-white/10 py-4 text-white sm:text-lg">${icon.check()} ${esc(item)}</li>`)}
            </ul>
        </div>
    </section>

    <!-- Answers stay collapsed until tapped, so the page stays short while search engines read the full text. -->
    <section id="fragen" class="relative z-10 scroll-mt-16 border-t border-white/10 bg-obsidian-2 py-24 lg:py-32">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div data-reveal class="lg:col-span-4">
                <p class="eyebrow">Häufige Fragen</p>
                <h2 class="section-title mt-4">Kurz beantwortet.</h2>
            </div>
            <div data-reveal style="--reveal-delay: 120ms" class="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
                ${each(gb.faq, ({ q, a }) => `<details class="group/faq">
                    <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                        ${esc(q)} <span class="inline-flex shrink-0 text-signal transition group-open/faq:rotate-180">${icon.chevronDown}</span>
                    </summary>
                    <p class="pb-5 text-slate-400">${esc(a)}</p>
                </details>`)}
            </div>
        </div>
    </section>

    <section id="kontakt" class="relative z-10 scroll-mt-16 border-t border-white/10 bg-obsidian-2 py-24 lg:py-32">
        <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div data-reveal class="lg:col-span-5">
                <p class="eyebrow">Kontakt</p>
                <h2 class="section-title mt-4">Sprechen wir über Ihr Projekt.</h2>
                <p class="mt-6 text-lg text-slate-400">Rund um die Uhr erreichbar.</p>
                <ul class="mt-10 divide-y divide-white/10 border-y border-white/10">
                    ${each(channels, ([label, value, href, isWhatsapp]) => `<li>
                        <a href="${href}"${isWhatsapp ? ' target="_blank" rel="noopener"' : ''} class="group flex items-center justify-between gap-4 py-4">
                            <span>
                                <span class="block font-mono text-[11px] tracking-[0.2em] text-mist uppercase">${label}</span>
                                <span class="mt-1 flex items-center gap-2 font-display text-lg font-bold text-white transition group-hover:text-signal-soft">${isWhatsapp ? icon.whatsapp('size-5 text-[#25D366]') : ''} ${value}</span>
                            </span>
                            ${icon.arrow('size-4 shrink-0 text-mist transition group-hover:text-signal')}
                        </a>
                    </li>`)}
                </ul>
            </div>
            <div data-reveal style="--reveal-delay: 120ms" class="glass p-5 sm:p-8 lg:col-span-7">
                <p class="mb-6 font-display text-xl font-bold text-white">Anfrage senden</p>
                ${inquiryForm(ctx)}
            </div>
        </div>
    </section>`,
    });
}

function servicePage(ctx, key, projects) {
    const { url } = ctx;
    const s = gb.services[key];
    return layout(ctx, {
        title: s.seoTitle,
        description: s.description,
        body: `
    <section class="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <a href="${url('#leistungen')}" class="inline-flex items-center gap-2 py-2 text-sm text-mist hover:text-white">
                <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6"/></svg>
                Alle Leistungen
            </a>
            <p class="eyebrow mt-8">Leistung ${s.number}</p>
            <h1 class="section-title mt-4">${esc(s.title)} in München</h1>
            <p class="mt-6 text-lg text-slate-300">${esc(s.text)}</p>
            ${each(s.body, (p) => `<p class="mt-4 text-slate-400">${esc(p)}</p>`)}
            <ul class="mt-10 border-t border-white/10">
                ${each(s.points, (p) => `<li class="flex items-center gap-4 border-b border-white/10 py-4 text-white">${icon.check()} ${esc(p)}</li>`)}
            </ul>
            ${s.note ? `<p class="mt-6 border-l-2 border-tech/60 bg-tech/5 px-4 py-3 text-sm text-slate-300">${esc(s.note)}</p>` : ''}
            <div class="mt-12 grid gap-3 sm:grid-cols-2">
                <a href="${url(`?leistung=${key}#kontakt`)}" class="btn-primary">Anfrage stellen ${icon.arrow()}</a>
                <a href="${wa(`Hallo, ich interessiere mich für ${s.title}.`)}" target="_blank" rel="noopener" class="btn-ghost">${icon.whatsapp('size-4 text-[#25D366]')} Per WhatsApp fragen</a>
            </div>
            <p class="mt-4 text-sm text-mist">Oder direkt anrufen, rund um die Uhr: <a href="${gb.contact.phoneHref}" class="text-white underline underline-offset-2">${esc(gb.contact.phone)}</a></p>
        </div>
    </section>

    ${
        projects.length
            ? `<section class="border-t border-white/10 py-16 lg:py-24">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <p class="eyebrow">Vorher / Nachher</p>
            <div class="mt-6 grid gap-10">${each(projects, beforeAfter)}</div>
        </div>
    </section>`
            : ''
    }

    <section class="border-t border-white/10 bg-obsidian-2 py-16 lg:py-24">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <p class="eyebrow">Weitere Leistungen</p>
            <ul class="mt-6 divide-y divide-white/10 border-y border-white/10">
                ${each(
                    services.filter(([k]) => k !== key),
                    ([k, o]) => `<li>
                    <a href="${url(`leistungen/${k}/`)}" class="group flex items-center gap-4 py-4">
                        <span class="font-mono text-xs text-signal">${o.number}</span>
                        <span class="flex-1 font-display font-semibold text-white group-hover:text-signal-soft">${esc(o.title)}</span>
                        ${icon.chevronRight('size-4 shrink-0 text-mist group-hover:text-signal')}
                    </a>
                </li>`,
                )}
            </ul>
        </div>
    </section>`,
    });
}

// draft: shows a warning box while the page still contains placeholder text.
function legalPage(ctx, title, body, { draft = false } = {}) {
    return layout(ctx, {
        title: `${title} · ${gb.name}`,
        body: `
    <section class="pt-28 pb-24 lg:pt-36">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <p class="eyebrow">Rechtliches</p>
            <h1 class="mt-3 font-display text-4xl font-bold text-white">${title}</h1>
            ${draft ? '<div class="mt-6 border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-signal-soft">Platzhalter – vor der Veröffentlichung durch rechtlich geprüfte Angaben ersetzen.</div>' : ''}
            <div class="mt-10 space-y-6 leading-relaxed text-slate-300 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white">${body}</div>
        </div>
    </section>`,
    });
}

const cityLine = `${gb.contact.postalCode || '[PLZ]'} ${gb.contact.city}`;
const address = `${esc(gb.name)}<br>${esc(gb.contact.street)}<br>${esc(cityLine)}`;

const impressum = (ctx) =>
    legalPage(
        ctx,
        'Impressum',
        `
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>${esc(gb.name)}<br>Inhaber: ${esc(gb.legal.owner)} (${esc(gb.legal.legalForm)})<br>${esc(gb.contact.street)}<br>${esc(cityLine)}</p>
        <h2>Kontakt</h2>
        <p>Telefon: ${esc(gb.contact.phone)}<br>E-Mail: ${esc(gb.contact.email)}</p>
        ${gb.legal.vatId ? `<h2>Umsatzsteuer-ID</h2>\n        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: ${esc(gb.legal.vatId)}</p>` : ''}
        <h2>Verantwortlich für den Inhalt</h2>
        <p>${esc(gb.legal.owner)}<br>${esc(gb.contact.street)}<br>${esc(cityLine)}</p>`,
    );

const datenschutz = (ctx) =>
    legalPage(
        ctx,
        'Datenschutzerklärung',
        `
        <h2>Verantwortlicher</h2>
        <p>${address}<br>${esc(gb.contact.email)}</p>
        <h2>Hosting</h2>
        <p>Diese Website wird über GitHub Pages (GitHub Inc., USA) bereitgestellt. Beim Aufruf verarbeitet GitHub technisch notwendige Daten wie Ihre IP-Adresse in Server-Logfiles.</p>
        <h2>Anfragen über das Kontaktformular</h2>
        <p>Die im Anfrageformular angegebenen Daten (Name, Telefon, E-Mail, gewünschte Leistung, Nachricht) verarbeiten wir ausschließlich zur Bearbeitung Ihrer Anfrage und zur Anbahnung eines Auftrags (Art. 6 Abs. 1 lit. b DSGVO). Für den Versand per E-Mail nutzen wir den Dienst Web3Forms, der Ihre Angaben an unser Postfach weiterleitet.</p>
        <h2>Kontakt per WhatsApp</h2>
        <p>Wenn Sie uns über WhatsApp schreiben, wird Ihre Nachricht über den Dienst WhatsApp (Meta Platforms Ireland Ltd.) übermittelt. Unsere Website überträgt dabei selbst keine Daten an WhatsApp; die Nachricht wird erst gesendet, wenn Sie sie in der WhatsApp-App bestätigen.</p>
        <h2>Cookies</h2>
        <p>Wir setzen keine Cookies ein. Schriftarten werden lokal ausgeliefert; es werden keine Tracking-Dienste eingebunden.</p>
        <h2>Ihre Rechte</h2>
        <p>[Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit, Beschwerderecht bei der Aufsichtsbehörde]</p>`,
        { draft: true },
    );

const notFound = (ctx) =>
    layout(ctx, {
        title: `Seite nicht gefunden · ${gb.name}`,
        body: `
    <section class="flex min-h-[70svh] items-center pt-28 pb-24">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <p class="eyebrow">404</p>
            <h1 class="section-title mt-4">Diese Seite gibt es nicht.</h1>
            <a href="${ctx.url()}" class="btn-primary mt-10">Zur Startseite ${icon.arrow()}</a>
        </div>
    </section>`,
    });

/* --------------------------------------------------------------- render */

/**
 * @param {{ base: string, publicDir: string }} options  base = Vite base, e.g. '/' or '/goganbau/'
 * @returns {{ file: string, html: string }[]}  file paths are relative to the project root
 */
export function renderPages({ base, publicDir }) {
    // Only projects whose photos are actually in public/ are shown.
    const projects = gb.projects.filter((p) => fs.existsSync(path.join(publicDir, p.before)) && fs.existsSync(path.join(publicDir, p.after)));

    // path: the page's address below the site root (null = not a real page, e.g. 404).
    const context = (page, path, current = null) => {
        const url = (p = '') => base + p;
        return { url, path, current, anchor: (id) => (page === 'home' ? `#${id}` : url(`#${id}`)) };
    };

    return [
        { file: 'index.html', html: homePage(context('home', ''), projects) },
        ...services.map(([key]) => ({
            file: `leistungen/${key}/index.html`,
            html: servicePage(context('service', `leistungen/${key}/`, key), key, projects.filter((p) => p.service === key)),
        })),
        { file: 'impressum/index.html', html: impressum(context('legal', 'impressum/')) },
        { file: 'datenschutz/index.html', html: datenschutz(context('legal', 'datenschutz/')) },
        { file: '404.html', html: notFound(context('404', null)) },
    ];
}
