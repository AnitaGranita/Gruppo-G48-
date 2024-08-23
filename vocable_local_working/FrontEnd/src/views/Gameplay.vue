<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';  // Assicurati di avere axios installato
import SimpleKeyboard from '../components/SimpleKeyboard.vue';
import WordRow from '../components/WordRow.vue';
import { getRandomWord } from '../components/Words.vue';

const state = reactive({
  solution: getRandomWord(),
  guesses: ["", "", "", "", "", ""],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  },
});

const wonGame = computed(() =>
  state.guesses[state.currentGuessIndex - 1] === state.solution.word
);

const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);

const refreshPage = () => {
  window.location.reload(); // Ricarica la pagina corrente
};

const handleInput = (key) => {
  if (state.currentGuessIndex >= 6 || wonGame.value) {
    if (wonGame.value || lostGame.value) {
      updateUserStats(wonGame.value, state.currentGuessIndex); // Aggiorna le statistiche dell'utente
    }
    return;
  }

  const currentGuess = state.guesses[state.currentGuessIndex];
  if (key == "{enter}") {
    if (currentGuess.length == state.solution.word.length) {
      state.currentGuessIndex++;
      for (var i = 0; i < currentGuess.length; i++) {
        let c = currentGuess.charAt(i);
        if (c == state.solution.word.charAt(i)) {
          state.guessedLetters.found.push(c.toUpperCase());
        } else if (state.solution.word.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c.toUpperCase());
        } else {
          state.guessedLetters.miss.push(c.toUpperCase());
        }
      }
    }
  } else if (key == "{bksp}") {
    state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1);
  } else if (currentGuess.length < state.solution.word.length) {
    const alphaRegex = /[A-Za-z]/;
    if (alphaRegex.test(key)) {
      state.guesses[state.currentGuessIndex] += key.toLowerCase();
    }
  }
};

const updateUserStats = async (won, attempts) => {
  try {
    // Recupera le statistiche correnti dell'utente
    const response = await axios.get('/api/utente/get-stats');
    const currentStats = response.data;

    // Prepara le nuove statistiche
    const updatedStats = {
      email: currentStats.email,
      totalgames: currentStats.totalgames + 1, // Incrementa il numero totale di giochi
      gameswon: won ? currentStats.gameswon + 1 : currentStats.gameswon,
      gameslost: !won ? currentStats.gameslost + 1 : currentStats.gameslost,
      won1: won && state.currentGuessIndex === 1 ? currentStats.won1 + 1 : currentStats.won1,
      won2: won && state.currentGuessIndex === 2 ? currentStats.won2 + 1 : currentStats.won2,
      won3: won && state.currentGuessIndex === 3 ? currentStats.won3 + 1 : currentStats.won3,
      won4: won && state.currentGuessIndex === 4 ? currentStats.won4 + 1 : currentStats.won4,
      won5: won && state.currentGuessIndex === 5 ? currentStats.won5 + 1 : currentStats.won5,
      won6: won && state.currentGuessIndex === 6 ? currentStats.won6 + 1 : currentStats.won6
    };

    // Invia le statistiche aggiornate al server
    await axios.post('/api/utente/update-stats', updatedStats);
    console.log('Statistiche aggiornate con successo');
  } catch (error) {
    console.error('Errore durante l\'aggiornamento delle statistiche:', error);
  }
};

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    let key =
      e.code == "Enter"
        ? "{enter}"
        : e.code == "Backspace"
        ? "{bksp}"
        : e.key;
    handleInput(key);
  });
});
</script>

<template>
  <div class="wrapperwords">
    <div>
      <word-row
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="state.solution.word"
        :submitted="i < state.currentGuessIndex"
      />
    </div>
    <p v-if="wonGame" class="text-center">
      Congratulations! Solution found :D
    </p>
    <p v-else-if="lostGame" class="text-center">
      Out of tries. :(
    </p>
    <p class="text-center">
      <span>
        <p class="rounded font-semibold text-blue-700">Definizione:</p>
        <p class="rounded font-medium font-italic text-black"> {{ state.solution.definition }}</p>
      </span>
    </p>
    <simple-keyboard @onKeyPress="handleInput" :guessedLetters="state.guessedLetters" />
  </div>
  <div>
    <button 
      v-if="wonGame || lostGame"
      @click="refreshPage" 
      class="refresh-button">
      Prossima parola
    </button>
  </div>
</template>

<style scoped>
.refresh-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #1a56db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-button:hover {
  background-color: #1445ae;
}
</style>
