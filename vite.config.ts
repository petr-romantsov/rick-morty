import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { type PluginOption, defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/rick-morty/',
  plugins: [
    react(),
    svgr(),
    stylelint({
      include: ['src/**/*.css', 'src/**/*.scss', 'src/**/*.sass'],
      fix: true,
      cache: false
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as PluginOption
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/styles/mixins" as *;`
      }
    }
  }
});
