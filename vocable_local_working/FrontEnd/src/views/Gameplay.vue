<script setup>
import { stringifyQuery } from 'vue-router';
import SimpleKeyboard from '../components/SimpleKeyboard.vue';
import WordRow from '../components/WordRow.vue';
import {getRandomWord, words} from '../components/Words.vue';
import { reactive, onMounted, computed, ref } from 'vue';

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

const wonGame = computed( //valore che ti dice se hai vinto il gioco
  ()=>
    state.guesses[state.currentGuessIndex - 1] === state.solution.word
);

const lostGame = computed(()=> !wonGame.value //valore che ti dice se hai perso 
  && state.currentGuessIndex >= 6
);

const refreshPage = () => {
      window.location.reload(); // Ricarica la pagina corrente
    }

const handleInput = (key) => {  //funzione che gestisce gl'input della tastiera
  //console.log(key);
  if (state.currentGuessIndex >= 6 || wonGame.value) { //se hai finito i tentativi o hai vinto, return
    return;
    //qua da mettere il caricamento dei dati
    //bisogna vedere se l'utente è loggato (esiste il token), se esiste si apre il file nel database e si aggiornano i dati,
    //leggendo totalgames e aggiungendo 1, leggendo gameswon/gameslost e aggiungendo uno in base a wongame.value
    //aggiungere 1 a won[currenguessIndex].
  }
  const currentGuess = state.guesses[state.currentGuessIndex];  //currentGuess è l'elemento dell'array delle guess attuale
  if (key=="{enter}"){  //come primo controllo, si verifica se il pulsante di invio è stato schiacciato
    if (currentGuess.length == state.solution.word.length) {  //controlla poi che la lunghezza della guess sia uguale a quella della soluzione
      state.currentGuessIndex++;  //viene aggiornato l'index
      for (var i = 0; i < currentGuess.length; i++) { //il for smista le lettere trovate, assenti e nella posizione sbagliata nei vari arrai corrispondenti
        let c = currentGuess.charAt(i);
        if  (c==state.solution.word.charAt(i)) { 
          state.guessedLetters.found.push(c.toUpperCase()); //array lettere trovate
        } else if (state.solution.word.indexOf(c)!=-1) {
          state.guessedLetters.hint.push(c.toUpperCase());  //array lettere pos. sbagliata
        } else {
          state.guessedLetters.miss.push(c.toUpperCase());  //array lettere assenti
           //console.log(state.guessedLetters.miss);
        }
      }
    }
  } else if (key=="{bksp}") { //se viene premuto il pulsate "backspace" viene tolto l'ultimo carattere
    state.guesses[state.currentGuessIndex] =
    currentGuess.slice(0, -1);
  } else if (currentGuess.length < state.solution.word.length) { // si controlla che le lettere inserite dall'utente non superino le caselle presenti
    const alphaRegex = /[A-Za-z]/;
    console.log(key);
    if (alphaRegex.test(key)) {  //se viene inserito un altro carattere si controlla che sia alfanumerico
      state.guesses[state.currentGuessIndex] += key.toLowerCase();
    }
  }
};

onMounted(() =>{ 
  window.addEventListener("keyup", (e) => {  //se usi la tastiera a schermo, restituisce le lettere come se fossero inserite da tastiera
    e.preventDefault();
    console.log(e.key.toLowerCase());
    let key =
      e.code == "Enter"
      ? "{enter}"
      : e.code== "Backspace"
      ? "{bksp}"
      : e.code== "Tab"
      ? ""
      : e.code== "ControlLeft"
      ? ""
      : e.code== "ControlRight"
      ? ""
      : e.code== "ShiftLeft"
      ? ""
      : e.code== "CapsLock"
      ? ""
      : e.code== "AltRight"
      ? ""
      :e.key;
      handleInput(key);
  });
});

</script>

<template>
     <div class="wrapperwords">
    <div>
      <word-row
        v-for ="(guess,i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="state.solution.word"
        :submitted="i<state.currentGuessIndex"
        
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
    <simple-keyboard @onKeyPress="handleInput"
    :guessedLetters="state.guessedLetters"
    />
  </div>
  <div>
    <button 
      v-if="wonGame||lostGame"
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