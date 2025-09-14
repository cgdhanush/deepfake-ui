<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import BackButton from "@/components/BackButton.vue";
import { reactive, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const route = useRoute();
const router = useRouter();
const toast = useToast();

const deepfakeId = route.params.id;

const state = reactive({
  deepfake: {},
  isLoading: true,
});

// Chart Data
const detectionChartData = ref(null);
const confidenceChartData = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/deepfakes/${deepfakeId}`);
    state.deepfake = response.data;

    if (state.deepfake?.result) {
      detectionChartData.value = {
          labels: ["Real Probability", "Fake Probability"],
          datasets: [
            {
              data: [
                state.deepfake.result.real_score ?? 0,
                state.deepfake.result.fake_score ?? 0,
              ],
              backgroundColor: ["#10b981", "#ef4444"], // green for real, red for fake
            },
          ],
        };

      confidenceChartData.value = {
        labels: ["Confidence", "Remaining"],
        datasets: [
          {
            data: [
              state.deepfake.result.confidence ?? 0,
              1 - (state.deepfake.result.confidence ?? 0),
            ],
            backgroundColor: ["#10b981", "#d1d5db"],
          },
        ],
      };
    }
  } catch (error) {
    console.error("Error fetching deepfake", error);
    toast.error("Failed to load deepfake");
  } finally {
    state.isLoading = false;
  }
});

const videoUrl = computed(() => {
  if (!state.deepfake || !state.deepfake.video_filename) return null;
  return `/api/uploads/${state.deepfake.video_filename}`;
});

const imageUrl = computed(() => {
  if (!state.deepfake || !state.deepfake.image_filename) return null;
  return `/api/uploads/${state.deepfake.image_filename}`;
});

const deleteDeepfake = async () => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deepfake?"
    );
    if (!confirmed) return;

    await axios.delete(`/api/deepfakes/${deepfakeId}`);
    toast.success("Deepfake Deleted Successfully");
    router.push("/deepfakes");
  } catch (error) {
    console.error("Error deleting deepfake", error);
    toast.error("Deepfake Not Deleted");
  }
};
</script>

<template>
  <BackButton />

  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <!-- Info Section -->
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">
              {{ state.deepfake.type || "Deepfake" }}
            </div>
            <h1 class="text-3xl font-bold mb-4">
              {{ state.deepfake.title }}
            </h1>
            <div class="text-gray-500 mb-4 flex justify-center md:justify-start">
              <p class="text-gray-700">
                Duration: {{ state.deepfake.duration ?? "Unknown" }}s
              </p>
              <p class="ml-6 text-gray-700">
                Uploaded on:
                {{
                  state.deepfake.uploadedDate
                    ? new Date(state.deepfake.uploadedDate).toLocaleString()
                    : "Unknown"
                }}
              </p>
            </div>
          </div>

          <!-- Media Preview -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6 max-w-screen-md mx-auto">
            <h3 class="text-green-800 text-lg font-bold mb-6">Media Preview</h3>

            <div class="relative w-full overflow-hidden rounded-lg video-container">
              <template v-if="videoUrl">
                <video
                  controls
                  class="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                >
                  <source :src="videoUrl" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </template>

              <template v-else-if="imageUrl">
                <img
                  :src="imageUrl"
                  alt="Deepfake Image"
                  class="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
              </template>

              <p
                v-else
                class="text-gray-500 absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                No media available
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Deepfake Description
            </h3>
            <p class="mb-4">
              {{ state.deepfake.description || "No description available" }}
            </p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Analysis Result -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Analysis Result</h3>
            <hr class="my-4" />

            <p>
              <strong>Model:</strong>
              {{ state.deepfake.result?.analysis_model || "Not available" }}
            </p>
            
            <p
              class="mt-4 font-bold"
              :class="state.deepfake.result?.deepfake_detected ? 'text-red-600' : 'text-green-600'"
            >
              <strong>Result:</strong>
              {{ state.deepfake.result?.deepfake_detected ? "DEEPFAKE" : "REAL" }}
            </p>


            <div class="my-4">
              <h4 class="font-semibold mb-2">Detection Score</h4>
              <Pie v-if="detectionChartData" :data="detectionChartData" />
            </div>

            <div class="my-4">
              <h4 class="font-semibold mb-2">Confidence</h4>
              <Pie v-if="confidenceChartData" :data="confidenceChartData" />
            </div>

          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Deepfake</h3>
            <button
              @click="deleteDeepfake"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
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
.video-container {
  padding-bottom: 56.25%; /* Default 16:9 aspect ratio */
  position: relative;
}
</style>
