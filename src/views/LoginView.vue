<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { isLoggedIn, accessToken } from '@/authState.js'
import qs from 'qs'

const router = useRouter()


const username = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref(null)
const showModal = ref(true)


const login = async () => {
  error.value = null
  isLoading.value = true
  try {
    // Convert the data to URL-encoded format
    const formData = qs.stringify({
      username: username.value,
      password: password.value,
    })

    const response = await axios.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    showModal.value = false
    accessToken.value = response.data.access_token
    isLoggedIn.value = true

    // Optionally save to localStorage for persistence
    localStorage.setItem('access_token', response.data.access_token)
    if (accessToken.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
    }
    
    router.push({ name: 'home' })

    return true; // login successful
    
  } catch (err) {
    console.error('Login failed:', err)
    error.value = 'Invalid username or password.'
  } finally {
    isLoading.value = false
  } 
}


const closeModal = () => {
  showModal.value = false;
  window.history.back();  // Go back to previous page in history
}
</script>

<template>

  <!-- Main Content Area with gradient background -->
  <div class="min-h-screen pt-16 flex items-center justify-center">
    <!-- Modal Backdrop and Window -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-40"
        @click.self="closeModal"
      >
        <transition name="scale-fade">
          <div
            v-if="showModal"
            class="bg-blue-50 rounded-xl shadow-xl p-8 max-w-md w-full relative"
          >
            <button
              @click="closeModal"
              aria-label="Close modal"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>

            <form @submit.prevent="login" class="space-y-4">
              <div>
                <label for="username" class="block text-gray-600 mb-1">Username</label>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label for="password" class="block text-gray-600 mb-1">Password</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </button>

              <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
            </form>

            <p class="text-center text-gray-500 text-sm mt-6">
              Don’t have an account?
              <a href="/signup" class="text-blue-500 hover:underline">Sign up here</a>
            </p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.scale-fade-enter-active {
  transition: all 0.3s ease;
}
.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.scale-fade-leave-active {
  transition: all 0.2s ease;
}
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
