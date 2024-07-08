/*import UserStats from './components/UserStats'
import Home from './components/Home'
import { createRouter, createWebHistory} from 'vue-router'

const routes= [
    {
        name: 'Home',
        component: Home,
        path:'/'
    },
    {
        name: 'UserStats',
        component: UserStats,
        path:'/UserStats'
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;*/

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import UserStats from '../components/UserStats.vue'
import Gameplay from '../components/Gameplay.vue'
import Login from '../components/Login.vue'
import RegistrationPietro from'../components/RegistrationPietro.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user-stats', component: UserStats},
  { path: '/gameplay', component: Gameplay},
  { path: '/login', component: Login},
  { path: '/registration', component: RegistrationPietro}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
