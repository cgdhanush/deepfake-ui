<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png'; // This is correct as long as the logo is stored in the correct folder.

const isActiveLink = (routePath) => {
  const route = useRoute();
  // Ensure exact path matching or handle trailing slashes
  return route.fullPath === routePath;
};
</script>

<template>
  <nav class="navbar">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Deepfakes" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >Deepfake</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/deepfakes/upload"
                :class="[
                  isActiveLink('/deepfakes/upload')  // Corrected the active path
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Check for Deepfakes</RouterLink
              >
              <RouterLink
                to="/about"
                :class="[
                  isActiveLink('/about')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >About</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333; /* Add background color to navbar */
  color: green; /* Optional: You can remove this if you want to change other colors */
}

.navbar a {
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth hover transitions */
}

.navbar .active-link {
  background-color: #3b820c; /* Active link background color */
  color: white; /* Active link text color */
}
</style>
