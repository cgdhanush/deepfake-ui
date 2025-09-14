import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn, loginPrompt } from '@/authState'

import HomeView from '@/views/HomeView.vue'
import DeepfakesView from '@/views/DeepfakesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DeepfakeView from '@/views/DeepfakeView.vue'
import UploadDeepfake from '@/views/UploadMedia.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/Register.vue'
import About from '@/views/About.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/deepfakes', name: 'deepfakes', component: DeepfakesView, meta: { requiresAuth: true } },
  { path: '/deepfakes/:id', name: 'deepfake', component: DeepfakeView , meta: { requiresAuth: true }},

  // Protect this route - only logged-in users
  { path: '/deepfakes/upload', name: 'uploadDeepfake', component: UploadDeepfake, meta: { requiresAuth: true } },

  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: RegisterView },
  { path: '/about', name: 'about', component: About },
  { path: '/:catchAll(.*)', name: 'not-found', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    loginPrompt.value = true  // trigger the popup
    next(false)               // cancel navigation
  } else if ((to.name === 'login' || to.name === 'signup') && isLoggedIn.value) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
