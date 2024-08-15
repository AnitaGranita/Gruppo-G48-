<template>
  <div class="wrapper">
    <v-sheet>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <img src="/logoVuoto.png" alt="Vocable Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

        <v-form v-model="isFormValid" lazy-validation @submit.prevent="onLogin">
          <v-text-field class="required" type="email" :rules="emailRules" v-model="email" label="Email"
            variant="underlined"></v-text-field>
          <v-text-field class="required" type="password" :rules="passwordRules" v-model="password" label="Password"
            variant="underlined"></v-text-field>
        </v-form>
        <v-btn :disabled="!isFormValid" @click.native="onLogin" color="blue" size="large" variant="elevated"
          block>Login</v-btn>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios';

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
    async onLogin() {
      try {
        this.loading = true;

        const response = await fetch('/api/utente/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();
        console.log('Response Data:', data); // Verifica se il token è presente in `data`

        if (data.status) {
          localStorage.setItem('token', data.token); // Assicurati che `data.token` sia definito
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
          console.log('Token:', data.token);
          alert('Login effettuato con successo');
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
</style>
