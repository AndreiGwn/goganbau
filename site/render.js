/*
 * Writes every page from site/pages.js to disk as plain HTML files (index.html,
 * leistungen/<key>/index.html, …), which Vite then builds. Run by site/vite-plugin.js
 * in a fresh Node process, so edits to content.js / pages.js are always picked up.
 *
 * Usage: node site/render.js <base>     → prints the written file paths as JSON
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPages } from './pages.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.argv[2] ?? '/';

const pages = renderPages({ base, publicDir: path.join(root, 'public') });
for (const { file, html } of pages) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
}
process.stdout.write(JSON.stringify(pages.map((p) => p.file)));
