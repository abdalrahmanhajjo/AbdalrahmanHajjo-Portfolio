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
    // Split rarely-changing vendor code into its own long-cacheable chunks so
    // repeat visits only re-download the app code that actually changed.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion';
          if (id.includes('react-icons')) return 'icons';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
});
