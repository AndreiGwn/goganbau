import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitePages from './site/vite-plugin.js';

export default defineConfig({
    // GitHub Pages serves a project site under /<repo>/; the deploy workflow passes that path in BASE_PATH.
    base: `${process.env.BASE_PATH ?? ''}/`,
    plugins: [sitePages(), tailwindcss()],
    server: {
        // Same port as before, so http://<laptop-ip>:8080 still works from a phone.
        host: true,
        port: 8080,
    },
    preview: {
        host: true,
        port: 8080,
    },
    build: {
        chunkSizeWarningLimit: 900,
    },
});
