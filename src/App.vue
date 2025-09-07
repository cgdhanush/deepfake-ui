<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
import { loginPrompt } from '@/authState'
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'

const closePopup = () => {
  loginPrompt.value = false
}

const auth = useAuthStore()

onMounted(() => {
  auth.restoreToken()
})

</script>

<template>
  <Navbar />
  <RouterView />

  <transition name="fade">
    <div
      v-if="loginPrompt"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-sm text-center">
        <p class="mb-4 text-lg font-semibold">Please log in first to access this page.</p>
        <router-link
          to="/login"
          class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="closePopup"
        >
          Go to Login
        </router-link>
        <button
          class="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          @click="closePopup"
        >
          Cancel
        </button>
      </div>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
