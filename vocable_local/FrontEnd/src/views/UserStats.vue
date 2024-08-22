<template>
  <div>
    <h3>Ciao, {{user.nickname}}!</h3>
    <linechart/>
  </div>
    <div>
    <button @click= "onLogin">
      
      tipregofunziona
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import linechart from '../components/LineChart.vue'
import axios from 'axios'


export default {
  components: {
    linechart,
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
      async onLogin() {
        await axios.post('/api/utente/getter')
    }
  }
  
}
</script>


<style scoped>
h1 {
    text-align:center;
}
h2 {
  font-weight: bold;
  font-size:xx-large;
  text-align: center;
  color: #050780;
}
h3 {
font-size: larger;
font-weight: bold;
text-align: center;
color:black;
}
h4{
  font-size: large;
  font-weight: bold;
  text-align: center;
  color: red;
}
</style>