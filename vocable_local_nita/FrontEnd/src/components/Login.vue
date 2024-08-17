<template>
  <div class="wrapper">
    <v-sheet>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <img src="/logoVuoto.png" alt="Vocable Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Login</span>

        <v-form v-model="isFormValid" lazy-validation @submit.prevent="onLogin">
          <v-text-field class="required" type="email" :rules="emailRules" v-model="email" label="Email"
            variant="underlined"></v-text-field>
          <v-text-field class="required" type="password" :rules="passwordRules" v-model="password" label="Password"
            variant="underlined"></v-text-field>
        </v-form>
        <v-btn :disabled="!isFormValid" @click.native="onLogin" color="blue" size="large" variant="elevated"
          block>Login</v-btn>
        <span>
          <v-card-text class="black--text mt-8">
            <h3 class="text-center">Non hai ancora un profilo?</h3>
            <router-link to="/registration" id="registerButton"
              class=" font-semibold whitespace-nowrap  text-blue-700 ">Registrati</router-link>
          </v-card-text>
        </span>
      </v-card>
    </v-sheet>
  </div>
</template>
<!---->
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isFormValid: false,
      email: '',
      password: '',
      loading: false,
      passwordRules: [
        v => !!v || 'Obbligatorio',
        v => v && v.length >= 6 || 'Password troppo corta, almeno 6 caratteri'
      ],
      emailRules: [
        v => !!v || 'Obbligatorio',
        v => v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida'
      ]
    };
  },
  methods: {
    ...mapActions(['login']), // Mappa l'azione Vuex

    async onLogin() {
      try {
        this.loading = true;

        // Usa axios per fare la richiesta POST
        const response = await axios.post('/api/utente/login', {
          email: this.email,
          password: this.password
        });

        const data = response.data; // Dati dalla risposta
        console.log('Response Data:', data); // Verifica se il token è presente in `data`

        if (data.status) {
          // Usa l'azione Vuex per salvare il token e i dati utente
          this.login({ token: data.token, user: data.user });
          alert('Login effettuato con successo');
          this.$router.push('/dashboard'); // Reindirizza l'utente dopo il login
        } else {
          alert(data.msg);
        }

      } catch (error) {
        console.error('Errore durante il login:', error);
        alert('Errore durante il login');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
.wrapper {
  display: block;
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 15px;
  text-align: center;
  padding-top: 5%;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
  height: auto;
}

#registerButton:hover {
  text-decoration: underline;
  color: blue;
}
</style>
