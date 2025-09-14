<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { isLoggedIn } from '@/authState'
import logo from '@/assets/img/logo.png'
import { useAuthStore } from '@/store/auth'

const router = useRouter()

const auth = useAuthStore()


const logout = () => {
  auth.logout(); // Your logout logic (clear tokens, user state)
  router.push('/').then(() => {
    // Force a page refresh after redirect
    window.location.reload();
  });
};

</script>

<template>
  <nav class="navbar">
    <div class="mx-auto max-w-7x2 px-2 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-700 to-black">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Deepfakes" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">
              Deepfake
            </span>
          </RouterLink>

          <!-- Navigation Links -->
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink to="/" active-class="bg-green-900"
                class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                Home
              </RouterLink>
              
              <RouterLink to="/about" active-class="bg-green-900"
                  class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                  About
                </RouterLink>

              <!-- Conditionally rendered links -->
              <template v-if="!isLoggedIn">
                <RouterLink to="/login" active-class="bg-green-900"
                  class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                  Login
                </RouterLink>
                <RouterLink to="/signup" active-class="bg-green-900"
                  class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                  Sign Up
                </RouterLink>
              </template>

              <template v-else>
                <RouterLink to="/deepfakes/upload" active-class="bg-green-900"
                  class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                  Check for Deepfakes
                </RouterLink>
                <RouterLink to="/deepfakes" active-class="bg-green-900"
                  class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                  Deepfakes
                </RouterLink>
                <button @click="logout"
                  class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white bg-red-600">
                  Logout
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333;
}

.navbar a,
.navbar button {
  transition: background-color 0.3s ease, color 0.3s ease;
  border: none;
  cursor: pointer;
}
</style>
