<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const deepfakeId = route.params.id;

const state = reactive({
  deepfake: {},
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/deepfakes/${deepfakeId}`);
    state.deepfake = response.data;
  } catch (error) {
    console.error('Error fetching deepfake', error);
    toast.error('Failed to load deepfake');
  } finally {
    state.isLoading = false;
  }
});

const videoUrl = computed(() => {
  if (!state.deepfake || !state.deepfake.video_filename) return null;
  return `/api/uploads/${state.deepfake.video_filename}`;
});

const deleteDeepfake = async () => {
  try {
    const confirmed = window.confirm('Are you sure you want to delete this deepfake?');
    if (!confirmed) return;

    await axios.delete(`/api/deepfakes/${deepfakeId}`);
    toast.success('Deepfake Deleted Successfully');
    router.push('/deepfakes');
  } catch (error) {
    console.error('Error deleting deepfake', error);
    toast.error('Deepfake Not Deleted');
  }
};
</script>

<template>
  <BackButton />

  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">
              {{ state.deepfake.type || 'Deepfake' }}
            </div>
            <h1 class="text-3xl font-bold mb-4">
              {{ state.deepfake.title }}
            </h1>
            <div class="text-gray-500 mb-4 flex justify-center md:justify-start">
              <p class="text-gray-700">
                Duration: {{ state.deepfake.duration ?? 'Unknown' }}s
              </p>
              <p class="ml-6 text-gray-700">
                Uploaded on: {{
                  state.deepfake.uploadedDate
                    ? new Date(state.deepfake.uploadedDate).toLocaleString()
                    : 'Unknown'
                }}
              </p>
            </div>
          </div>

          <!-- Video Player -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6 max-w-screen-md mx-auto">
            <h3 class="text-green-800 text-lg font-bold mb-6">Video</h3>

            <div class="relative w-full overflow-hidden rounded-lg video-container">
              <template v-if="videoUrl">
                <video controls class="absolute top-0 left-0 w-full h-full object-cover rounded-lg">
                  <source :src="videoUrl" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </template>

              <p v-else class="text-gray-500 absolute top-0 left-0 w-full h-full flex items-center justify-center">
                No video available
              </p>
            </div>
          </div>


          <!-- Description -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Deepfake Description</h3>
            <p class="mb-4">
              {{ state.deepfake.description || 'No description available' }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Other Information</h3>
            <p class="mb-4">Additional metadata or tags can be shown here.</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Analysis Result -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Analysis Result</h3>
            <hr class="my-4" />
            <p><strong>Model:</strong> {{ state.deepfake.result?.analysis_model || 'Not available' }}</p>
            <p><strong>Detection Score:</strong> {{ state.deepfake.result?.detection_score ?? 'Not available' }}</p>
            <p><strong>Deepfake Detected:</strong> {{ state.deepfake.result?.deepfake_detected ? 'Yes' : 'No' }}</p>
            <p><strong>Confidence:</strong> {{ state.deepfake.result?.confidence || 'Not available' }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Deepfake</h3>
            <button @click="deleteDeepfake"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Deepfake
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>


<style scoped>
/* Default: portrait aspect ratio 9:16 (mobile) */
.video-container {
  padding-bottom: 177.78%; /* 16:9 rotated to 9:16 (height/width * 100%) */
  position: relative;
}

/* For landscape orientation or wider screens (e.g. min-width 768px) */
@media (min-width: 768px), (orientation: landscape) {
  .video-container {
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
}
</style>