import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './store/subscriber';  // Importa subscriber.js per assicurarti che venga eseguito

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

// Usa i plugin in questo ordine
app.use(store);  // Assicurati che lo store sia registrato prima degli altri
app.use(router); // Registra il router
app.use(vuetify); // Registra Vuetify
app.use(axios);

app.mount('#app');
