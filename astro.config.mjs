import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://www.welzijnswerking.be', output: 'static', devToolbar: { enabled: false }, vite: { optimizeDeps: { include: ['lottie-web/build/player/lottie_light'] } } });
