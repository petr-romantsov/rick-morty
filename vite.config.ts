import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';

const isPreview = process.env.PREVIEW === 'true';

// https://vite.dev/config/
export default defineConfig({
  base: isPreview ? '/rick-morty/preview/' : '/rick-morty/',
  plugins: [
    react(),
    svgr(),
    stylelint({
      include: ['src/**/*.css', 'src/**/*.scss', 'src/**/*.sass'],
      fix: true,
      cache: false
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
