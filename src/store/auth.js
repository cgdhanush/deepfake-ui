// stores/auth.ts (or .js)
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // State
  const accessToken = ref('')
  const isLoggedIn = ref(false)

  // Actions
  function restoreToken() {
    const token = localStorage.getItem('access_token')
    if (token) {
      accessToken.value = token
      isLoggedIn.value = true
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  function logout() {
    accessToken.value = ''
    isLoggedIn.value = false
    localStorage.removeItem('access_token')
    delete axios.defaults.headers.common['Authorization']
  }

  function setToken(token) {
    accessToken.value = token
    isLoggedIn.value = true
    localStorage.setItem('access_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return {
    accessToken,
    isLoggedIn,
    restoreToken,
    logout,
    setToken,
  }
})
