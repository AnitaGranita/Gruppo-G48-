<template>
  <div class="wrapper">
    <v-sheet>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <img src="/logoVuoto.png" alt="Vocable Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

        <v-form v-model="isFormValid" lazy-validation @submit.prevent="onRegistrati">
          <v-text-field
            class="required"
            :rules="nicknameRules"
            v-model="nickname"
            label="Nickname"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            class="required"
            :rules="emailRules"
            v-model="email"
            label="Email"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            class="required"
            :rules="passwordRules"
            v-model="password"
            type="password"
            label="Password"
            variant="underlined"
          ></v-text-field>
        </v-form>

        <v-btn
          :disabled="!isFormValid || loading"
          @click="onRegistrati"
          color="blue"
          size="large"
          variant="elevated"
          block
        >
          Registrati
        </v-btn>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isFormValid: false,
      email: '',
      password: '',
      nickname: '',
      loading: false,
      nicknameRules: [
        v => !!v || 'Obbligatorio',
        v => v.length >= 3 || 'Username troppo corto, almeno 3 caratteri'
      ],
      passwordRules: [
        v => !!v || 'Obbligatorio',
        v => v.length >= 6 || 'Password troppo corta, almeno 6 caratteri'
      ],
      emailRules: [
        v => !!v || 'Obbligatorio',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida'
      ]
    };
  },
  methods: {
    async onRegistrati() {
      this.loading = true;
      try {
        const userResponse = await axios.post('/api/utente/create', {
          email: this.email,
          password: this.password,
          nickname: this.nickname
        });

        if (userResponse.data.status) {
          const statsResponse = await axios.post('/api/utente/createstats', {
            email: this.email,
            gameswon: 0,
            gameslost: 0,
            totalgames: 0,
            won1: 0,
            won2: 0,
            won3: 0,
            won4: 0,
            won5: 0,
            won6: 0
          });

          if (statsResponse.data.status) {
            this.$router.push('/registrationcomplete'); // Usa Vue Router per la navigazione
          } else {
            alert('Errore durante la creazione delle statistiche.');
          }
        } else {
          alert('Errore di registrazione.');
        }
      } catch (error) {
        console.error('Errore durante la registrazione:', error);
        alert('Errore di rete o del server.');
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
