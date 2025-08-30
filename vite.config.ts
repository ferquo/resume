import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        logo: resolve(__dirname, 'logo-generator.html'),
      },
    },
  },
  esbuild: {
    // Strip all comments in JS output and drop debug code
    legalComments: 'none',
    drop: ['console', 'debugger'],
  },
});
