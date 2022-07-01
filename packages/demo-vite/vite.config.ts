import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import sourceRef from 'rollup-plugin-source-ref';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // sourceRef(),
    vue(),
  ],
});
