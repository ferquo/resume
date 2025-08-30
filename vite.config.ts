import { defineConfig } from 'vite';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';

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
  plugins: [
    // Ensure static folders are present in the built site
    copy({
      hook: 'writeBundle',
      targets: [
        { src: 'images/**/*', dest: 'dist/images' },
        { src: 'css/**/*', dest: 'dist/css' },
      ],
    }),
  ],
});
