/*
 * Generates the site's HTML pages (site/render.js) before Vite builds them, registers
 * every page as a build input, and regenerates + reloads in dev when site/ changes.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const render = (root, base) =>
    JSON.parse(execFileSync(process.execPath, [path.join(root, 'site/render.js'), base], { encoding: 'utf8' }));

export default function sitePages() {
    let root;
    let base;

    return {
        name: 'goganbau-site-pages',

        config(config) {
            root = path.resolve(config.root ?? process.cwd());
            base = config.base ?? '/';
            const files = render(root, base);
            return {
                build: { rollupOptions: { input: Object.fromEntries(files.map((f) => [f.replace(/\/?index\.html$|\.html$/, '') || 'index', path.join(root, f)])) } },
            };
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
