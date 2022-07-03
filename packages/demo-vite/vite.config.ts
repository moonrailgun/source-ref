import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sourceRef from 'rollup-plugin-source-ref-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    sourceRef({
      opener: {
        type: 'github',
        url: 'https://github.com/moonrailgun/source-ref',
        branch: 'master',
        cwd: resolve(__dirname, '../../'),
      },
    }),
    vue(),
  ],
});
