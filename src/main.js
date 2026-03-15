/* -- src\main.js -- */
// import Vue from 'vue'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// App
import App from './App.vue';
import { router } from './router';
// CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import '@/assets/main.css';

const pinia = createPinia();
const app = createApp(App);

// MarkdownDepp used in the ShowNotes.vue component
// eslint-disable-next-line no-undef
app.config.globalProperties.$MD = MarkdownDeep; //

app.use(pinia);
app.use(router);
app.mount('#app');
