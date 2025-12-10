import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Favorites from '@/views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component:Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
  ],
})

export default router
