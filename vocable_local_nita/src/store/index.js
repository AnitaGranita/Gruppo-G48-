import { createStore } from 'vuex';
import auth from './auth'; // Importa il modulo auth

const store = createStore({
  modules: {
    auth
  }
});

export default store;