<template>
  <section class="bg-gray-100 py-16">
    <div class="container-xl lg:container m-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-800">About Us</h1>
        <p class="mt-2 text-lg text-gray-600">
          Learn more about our mission and the technology behind our deepfake detection tool.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Mission Section -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-800">Our Mission 🎯</h2>
          <p class="mt-4 text-gray-600">
            We aim to combat the growing threat of deepfakes and synthetic media by providing accessible tools
            for individuals, organizations, and developers to verify content authenticity. With the rise of
            misinformation and manipulated media, we strive to protect digital integrity and security for all.
          </p>
        </div>

        <!-- Technology Section -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-800">The Technology 🤖</h2>
          <p class="mt-4 text-gray-600">
            Our system uses advanced AI models like CNN 🧠, LSTM ⏳, and ViT 🔍 to analyze spatial and temporal
            details in videos, spotting even tiny manipulations 🎭 that are hard to see with the human eye 👀.
          </p>
          <p class="mt-4 text-gray-600">
            With real-time detection ⚡, robust performance 💪, and support for multiple datasets 📊, our
            solution helps fight misinformation 🛡️ and keep the digital world safer 🌍.
          </p>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl font-semibold text-gray-800">Meet the Team 👥</h2>
        <p class="mt-2 text-lg text-gray-600">
          Our team consists of passionate professionals in the fields of UI 🎨, cybersecurity 🔐 and 
          machine learning 🤓. Together, we are committed to building a safer digital world for everyone.
        </p>
        
        <!-- Team Member Details -->
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-gray-800">Dhanush C G</h3>
            <p class="mt-2 text-gray-600">1HK22CS037</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-gray-800">Anushree A Kadwadkar</h3>
            <p class="mt-2 text-gray-600">1HK22CS019</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-gray-800">Doke Nishanth</h3>
            <p class="mt-2 text-gray-600">1HK22CS036</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-gray-800">D Prasanna Kumar</h3>
            <p class="mt-2 text-gray-600">1HK22CS038</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
/* Optional: Add custom styles for the About page */
</style>
