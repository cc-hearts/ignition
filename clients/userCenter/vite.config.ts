import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {},
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`,
      },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 10010,
    proxy: {
      '/api': {
        // 所要代理的目标地址
        target: 'http://localhost:4000/',
        changeOrigin: true,
      },
    },
  },
});
