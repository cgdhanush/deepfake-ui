<script setup>
import { RouterLink } from 'vue-router';
import DeepfakeListing from './DeepfakeListing.vue';
import { reactive, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

// Define props for the component
defineProps({
  limit: {
    type: Number,
    default: 10,
  },
  showButton: {
    type: Boolean,
    default: false,
  },
});

// Reactive state
const state = reactive({
  deepfakes: [],  // Use the static data from the JSON file
  isLoading: false,          // Set isLoading to false as we're not making an API call anymore
});

// Fetch deepfakes from the API
onMounted(async () => {
  try {
    const response = await axios.get('/api/deepfakes');
    state.deepfakes = response.data;
  } catch (error) {
    console.error('Error fetching deepfakes', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-black-500 mb-6 text-center">
        Browse Deepfakes
      </h2>

      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show deepfake listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DeepfakeListing
          v-for="deepfake in state.deepfakes.slice(0, limit || state.deepfakes.length)"
          :key="deepfake.id"
          :deepfake="deepfake"
        />
      </div>
    </div>
  </section>

  <!-- Show "View All Deepfakes" button if showButton is true -->
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/deepfakes"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Deepfakes
    </RouterLink>
  </section>
</template>
