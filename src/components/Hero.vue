<script setup>
defineProps({
  title: {
    type: String,
    default: 'Check for Deepfakes',
  },
  subtitle: {
    type: String,
    default: "Upload your video to detect if it's real or fake using advanced AI technology.",
  },
});
</script>

<template>
  <section class="custom-bg py-20 mb-4"> <!-- Use the custom background class -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <h1 class="custom-title sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p class="custom-subtitle my-4">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom background color for the section */
.custom-bg {
  background-color: #4e4e4e; /* Tailwind's bg-blue-800 color, or any color you choose */
}
  
/* Title styling */
.custom-title {
  color: #fbbf24; /* Tailwind's text-yellow-400 color */
  font-size: 2.5rem; /* Default size */
  font-weight: 800; /* Bold font */
  line-height: 1.2; /* Tighter line height */
  letter-spacing: 0.5px; /* Slight letter spacing */
}

/* Subtitle styling */
.custom-subtitle {
  color: #e5e7eb; /* Tailwind's text-gray-200 color */
  font-size: 1.25rem; /* Default size */
  font-weight: 400; /* Normal font weight */
  line-height: 1.5; /* Taller line height */
  text-align: center; /* Ensure it's center aligned */
}
</style>
