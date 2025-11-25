import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    stylelint({
      include: ['src/**/*.css', 'src/**/*.scss', 'src/**/*.sass'],
      fix: true
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
