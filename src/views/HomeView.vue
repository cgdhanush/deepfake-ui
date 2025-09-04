<script setup>
import Hero from '@/components/Hero.vue'
// No other script needed for now
</script>

<template>
  <Hero />

  <section class="max-w-7xl mx-auto px-6 py-12">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-extrabold text-gray-900 mb-4">
        Deepfake Face Swap Detection
      </h1>
      <p class="text-xl text-gray-700 max-w-3xl mx-auto">
        Detect manipulated videos and images with cutting-edge AI technology. Protect yourself and your community from misinformation and digital fraud.
      </p>
      <router-link
        to="/deepfakes/upload"
        class="mt-8 inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded hover:bg-blue-700 transition"
      >
        Upload a Video or Image
      </router-link>
    </div>

    <!-- Why Detect Deepfakes? -->
    <div class="grid md:grid-cols-3 gap-10 mb-16">
      <div class="text-center p-6 border rounded shadow hover:shadow-lg transition">
        <h2 class="text-2xl font-bold mb-3">What Are Deepfakes?</h2>
        <p class="text-gray-700">
          Deepfakes are synthetic media in which a person’s likeness is replaced with someone else’s. This technology can be used maliciously to create misleading videos or images.
        </p>
      </div>
      <div class="text-center p-6 border rounded shadow hover:shadow-lg transition">
        <h2 class="text-2xl font-bold mb-3">Why Detection Matters</h2>
        <p class="text-gray-700">
          Identifying deepfakes is crucial to combat misinformation, protect personal privacy, and maintain trust in digital media.
        </p>
      </div>
      <div class="text-center p-6 border rounded shadow hover:shadow-lg transition">
        <h2 class="text-2xl font-bold mb-3">Our Technology</h2>
        <p class="text-gray-700">
          We use advanced AI and facial recognition models trained on millions of samples to analyze videos and images for face swaps and manipulations.
        </p>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mb-16">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Features</h2>
      <ul class="max-w-4xl mx-auto space-y-6 text-gray-700 list-disc list-inside">
        <li>Upload videos or images for instant deepfake analysis</li>
        <li>Accurate detection with confidence scoring</li>
        <li>User-friendly dashboard to track your checks</li>
        <li>Secure authentication and data privacy</li>
        <li>Regular updates to stay ahead of new deepfake methods</li>
      </ul>
    </div>

    <!-- FAQ Section -->
    <div>
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      <div class="max-w-3xl mx-auto space-y-6">
        <details class="border rounded p-4">
          <summary class="cursor-pointer font-semibold text-lg">What types of deepfakes can you detect?</summary>
          <p class="mt-2 text-gray-700">
            Our AI focuses on detecting face swap deepfakes in videos and images, but we continuously improve to cover other manipulations.
          </p>
        </details>
        <details class="border rounded p-4">
          <summary class="cursor-pointer font-semibold text-lg">Is my data secure?</summary>
          <p class="mt-2 text-gray-700">
            Absolutely. We use industry-standard security practices to protect your uploaded content and personal data.
          </p>
        </details>
        <details class="border rounded p-4">
          <summary class="cursor-pointer font-semibold text-lg">How long does the analysis take?</summary>
          <p class="mt-2 text-gray-700">
            Typically, results are available within seconds to a few minutes depending on the file size and server load.
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add subtle hover effect on details */
details[open] summary::after {
  content: "▲";
  float: right;
  font-weight: bold;
}
summary::after {
  content: "▼";
  float: right;
  font-weight: bold;
}
</style>
