import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store'; // Assicurati di importare correttamente Vuex store

import '../node_modules/flowbite-vue/dist/index.css';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// Usa Vuex store
app.use(store);

// Configura axios
//app.config.globalProperties.$axios = axios;
app.use(axios);
// Usa Vuetify
app.use(vuetify);

// Monta l'app
app.use(router).mount('#app');
