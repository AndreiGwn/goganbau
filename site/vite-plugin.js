/*
 * Generates the site's HTML pages (site/render.js) before Vite builds them, registers
 * every page as a build input, adds sitemap.xml + robots.txt to the build, and
 * regenerates + reloads in dev when site/ changes.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import content from './content.js';

const render = (root, base) =>
    JSON.parse(execFileSync(process.execPath, [path.join(root, 'site/render.js'), base], { encoding: 'utf8' }));

// 'leistungen/abbruch/index.html' → 'leistungen/abbruch/'; the 404 page is not a real page.
const pagePaths = (files) => files.filter((f) => f !== '404.html').map((f) => f.replace(/index\.html$/, ''));

function sitemap(files) {
    const today = new Date().toISOString().slice(0, 10);
    const urls = pagePaths(files)
        .map((p) => `  <url><loc>${content.siteUrl}/${p}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default function sitePages() {
    let root;
    let base;
    let files = [];

    return {
        name: 'goganbau-site-pages',

        config(config) {
            root = path.resolve(config.root ?? process.cwd());
            base = config.base ?? '/';
            files = render(root, base);
            return {
                build: { rollupOptions: { input: Object.fromEntries(files.map((f) => [f.replace(/\/?index\.html$|\.html$/, '') || 'index', path.join(root, f)])) } },
            };
        },

        generateBundle() {
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(files) });
            this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${content.siteUrl}/sitemap.xml\n` });
        },

        configureServer(server) {
            const siteDir = path.join(root, 'site');
            server.watcher.add(siteDir);
            server.watcher.on('change', (file) => {
                if (!path.resolve(file).startsWith(siteDir)) return;
                try {
                    render(root, base);
                    server.ws.send({ type: 'full-reload' });
                } catch (err) {
                    server.config.logger.error(`[site] ${err.message}`);
                }
            });
        },
    };
}
