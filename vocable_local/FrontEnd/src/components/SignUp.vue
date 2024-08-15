<script>
import { ref } from 'vue'

const selected = ref('')
const countries = [
  { value: 'us', name: 'United States' },
  { value: 'ca', name: 'Canada' },
  { value: 'fr', name: 'France' },
]

export default {
    data: () => ({
      rules: {
        required: value => !!value || 'Field is required',
      },
    }),
  }

</script>

<template>
  <div class="wrapper">
    <img src="/logoVuoto.png" alt="Vocable Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>
   <div class="wrapperInp">
    <input type="text" placeholder="Nome">
    <input type="text" placeholder="Email">
    <input type="password" placeholder="Password">
    <button>Accedi</button>
    
   </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: block;
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  padding-top: 5%;
}

input{
  width: 300px;
  height:40px;
  padding: 2%;
  margin: 2%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

button{
  width: 300px;
  height:40px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(164, 202, 255);

}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
  height: auto;
}
</style>