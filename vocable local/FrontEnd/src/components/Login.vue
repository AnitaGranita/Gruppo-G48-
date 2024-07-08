<template>
    <div class="wrapper">
        <v-sheet>
            <v-card class="mx-auto px-6 py-8" max-width="344">
                <img src="/logoVuoto.png" alt="Vocable Logo" /> <!-- logo , scritta qua sotto -->
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

                <v-form v-model="isFormValid" lazy-validation @submit.prevent="onLogin">
                    <v-text-field class="required" type="email":rules="emailRules" v-model="email" label="Email" variant="underlined"></v-text-field>
                    <v-text-field class="required" type="password":rules="passwordRules" v-model="password" label="Password" variant="underlined"></v-text-field>
                </v-form>
                <v-btn :disabled="!isFormValid" @click.native="onLogin" color="blue" size="large" variant="elevated" block>Registrati</v-btn>

            </v-card>
        </v-sheet>
    </div>
</template>



<script>
import axios from "axios";
export default{
    data:() =>
    ({
      isFormValid:false, //in automatico vuetify controlla le rules e mette true e false
      //i dati possono essere inviati solo se isFormValid viene settato a true da vuetify
      email: '',
      password:'',
      loading: false, //quando sta caricando i dati, non possono essere modificati
      //le regole definiscono dei requisiti da superare per poter mandare i dati al server
      //se una regola non è rispettata, viene dato un messaggio
      //il messaggio restituito corrisponde alla regola che viene prima tra le non rispettate
      passwordRules:[ //la password deve essere non vuota e di almeno 3 caratteri
        v => !!v || 'Obbligatorio',
        v => v && v.length>=6 || 'Password troppo corta, almeno 6 caratteri'
      ],
      emailRules:[ //la email deve essere non vuota e valida, controlla che sia valida solo se la lunghezza è più di zero
        v =>!!v || 'Obbligatorio',
        v =>v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida'
      ]
    }),
    methods:{
      onLogin(){
        axios.post(
          '/api/utente/login',
          {
            email:this.email,
            password:this.password
          }).then((response)=>
           {alert(response.statusText)});
    },
  },
}
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