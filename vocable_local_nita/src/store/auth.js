import axios from 'axios';

export default {
  state: {
    token: null,
    user: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('SET_TOKEN', token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        // Qui potresti fare una richiesta per ottenere i dati dell'utente, se necessario.
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getUser(state) {
      return state.user;
    }
  }
};
