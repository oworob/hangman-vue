import { createRouter, createWebHistory } from 'vue-router'
import HangmanView from '@/views/hangman/HangmanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Hangman',
      component: HangmanView
    }
  ]
})

export default router
