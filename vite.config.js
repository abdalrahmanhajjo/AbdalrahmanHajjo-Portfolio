import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  // Keep the output dir as `build` so existing Netlify / gh-pages setups keep working.
  build: {
    outDir: 'build',
  },
});
