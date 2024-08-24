<template>
  <v-sheet>
    <!-- Passa i dati dell'utente come props al componente BarChart -->
    <BarChart 
      :won1="user.won1 !== undefined ? user.won1 : 0"
      :won2="user.won2 !== undefined ? user.won2 : 0"
      :won3="user.won3 !== undefined ? user.won3 : 0"
      :won4="user.won4 !== undefined ? user.won4 : 0"
      :won5="user.won5 !== undefined ? user.won5 : 0"
      :won6="user.won6 !== undefined ? user.won6 : 0"
    />
    <!-- Il resto del template rimane invariato -->
    <div>
      <v-sheet class="text-center bg-slate-500 flex mx-auto">
        <v-card rounded class="bg-slate-500">
          <p>Partite giocate:</p>
          <p>{{ user.totalgames !== undefined ? user.totalgames : 'Dati non disponibili' }}</p>
        </v-card>
        <v-card rounded>
          <p>Partite vinte:</p>
          <p>{{ user.gameswon !== undefined ? user.gameswon : 'Dati non disponibili' }}</p>
        </v-card>
        <v-card rounded>
          <p>Partite perse:</p>
          <p>{{ user.gameslost !== undefined ? user.gameslost : 'Dati non disponibili' }}</p>
        </v-card>
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
import BarChart from '@/components/BarChart.vue'
import axios from 'axios';

export default {
  components: {
    BarChart,
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
    async fetchUserStats() {
      try {
        const response = await axios.get('/api/utente/get-stats');
        console.log('User stats received:', response.data);
        this.$store.commit('auth/SET_USER', response.data); // Assicurati di aggiornare lo stato
      } catch (error) {
        console.error('Errore durante l\'ottenimento delle statistiche:', error);
      }
    }
  },
  mounted() {
    this.fetchUserStats(); // Chiama il metodo quando il componente viene montato
  }
}
</script>



<style scoped>
h1 {
  text-align: center;
}

h2 {
  font-weight: bold;
  font-size: xx-large;
  text-align: center;
  color: #050780;
}

h3 {
  font-size: larger;
  font-weight: bold;
  text-align: center;
  color: black;
}

h4 {
  font-size: large;
  font-weight: bold;
  text-align: center;
  color: red;
}
</style>