import { createApp } from 'vue';
import App from './App.vue';
import { start } from 'source-ref-runtime';

start();

createApp(App).mount('#app');
