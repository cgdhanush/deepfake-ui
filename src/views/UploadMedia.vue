<script setup>
import { ref } from "vue";
import UploadVideo from "./UploadVideo.vue";
import UploadImage from "./UploadImage.vue";

const mode = ref("video"); // Default mode
</script>

<template>
  <div class="container mx-auto py-12">
    <h1 class="text-3xl font-bold mb-8 text-center">Upload Media</h1>

    <!-- Mode Switcher -->
    <div class="flex justify-center mb-6">
      <button
        :class="['px-4 py-2 rounded-l-full', mode === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700']"
        @click="mode = 'video'"
      >
        🎥 Video
      </button>
      <button
        :class="['px-4 py-2 rounded-r-full', mode === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700']"
        @click="mode = 'image'"
      >
        🖼️ Image
      </button>
    </div>

    <!-- Render Based on Mode -->
    <UploadVideo v-if="mode === 'video'" />
    <UploadImage v-else />
  </div>
</template>
