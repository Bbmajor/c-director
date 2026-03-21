import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolve from 'unplugin-icons/resolver';
import { BootstrapVueNextResolver } from 'bootstrap-vue-next/resolvers';
import { fileURLToPath } from 'node:url';
import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'globalThis.__APP_VERSION__': JSON.stringify(packageJson.version),
  },

  build: {
    emptyOutDir: true,
    outDir: 'Root.webfolder',
    rolldownOptions: {
      external: 'cantabile-js',
    },
  },

  server: {
    open: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:35007',
        ws: true,
        changeOrigin: true,
      },
      '^/lib': {
        target: 'http://localhost:35007',
        changeOrigin: true,
      },
    },
  },

  devtools: {
    enabled: true,
  },

  resolve: {
    alias: {
      // vue$: 'vue/dist/vue.esm.js',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      cantabile$: 'cantabile-js/www/cantabile-js.js',
    },
  },

  plugins: [
    vue(),

    Components({
      resolvers: [BootstrapVueNextResolver(), IconsResolve()],
      dts: true,
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
});
