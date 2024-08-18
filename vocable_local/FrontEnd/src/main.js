import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import '../node_modules/flowbite-vue/dist/index.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store'

const vuetify = createVuetify({
    components,
    directives,
  })
  
const app = createApp(App)
app.use(router)
app.use(axios)
app.use(vuetify)
app.use(store)
app.mount('#app')


