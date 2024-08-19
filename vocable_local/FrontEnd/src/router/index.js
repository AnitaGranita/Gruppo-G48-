import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Gameplay from '../views/Gameplay.vue'
import UserStats from '../views/UserStats.vue'
import Login from '../views/Login.vue'
import RegistrationPietro from '../views/RegistrationPietro.vue'
import RegistrationComplete from '@/views/RegistrationComplete.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
  { path: '/gameplay', component: Gameplay, name: 'gameplay'  },
  { path: '/login', component: Login, name: 'login'  },
  { path: '/user-stats', component: UserStats, name: 'userstats',  meta: { requiresAuth: true } },
  { path: '/registration', component: RegistrationPietro, name: 'registration'  },
  { path: '/registrationcomplete', component: RegistrationComplete, name: 'registrationcomplete'  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
