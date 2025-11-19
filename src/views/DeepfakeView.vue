<script setup>
import { reactive, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const route = useRoute();
const router = useRouter();
const toast = useToast();

const deepfakeId = route.params.id;

// -----------------------------------------
// GAUGE STATE
// -----------------------------------------
const gaugeValue = ref(10);
const currentAngle = ref(-90);
const targetAngle = ref(-90);

const ticks = [-90, -45, 0, 45, 90];

// angle calculation
const targetAngleComputed = computed(() => {
  return (gaugeValue.value / 100) * 180 - 90;
});

// Needle coordinates
const needle = computed(() => {
  const angleRad = (currentAngle.value * Math.PI) / 180;
  const r = 36;
  const cx = 50;
  const cy = 50;

  return {
    x: (cx + r * Math.cos(angleRad)).toFixed(2),
    y: (cy + r * Math.sin(angleRad)).toFixed(2),
  };
});

// Needle color: green = no deepfake, red = deepfake
const needleColor = computed(() =>
  state.deepfake.result?.deepfake_detected ? "#ef4444" : "#22c55e"
);

// -----------------------------------------
// TICK POSITION
// -----------------------------------------
const tickPos = (deg) => {
  const rad = (deg * Math.PI) / 180;
  const outer = 40;
  const inner = 36;
  const cx = 50;
  const cy = 50;

  return {
    x1: cx + outer * Math.cos(rad),
    y1: cy + outer * Math.sin(rad),
    x2: cx + inner * Math.cos(rad),
    y2: cy + inner * Math.sin(rad),
  };
};

// -----------------------------------------
// NEEDLE ANIMATION
// -----------------------------------------
const animateNeedle = () => {
  const step = () => {
    const desired = targetAngle.value;
    currentAngle.value += (desired - currentAngle.value) * 0.12;

    if (Math.abs(desired - currentAngle.value) > 0.01) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

const applyDetection = (value) => {
  gaugeValue.value = Math.max(0, Math.min(100, value));
  targetAngle.value = (gaugeValue.value / 100) * 180 - 90;
  animateNeedle();
};

// -----------------------------------------
// API STATE
// -----------------------------------------
const state = reactive({
  deepfake: {},
  isLoading: true,
});

// Exposed fields
const fileName = ref("");
const user = ref("");
const scanDate = ref("");
const fileSize = ref("");

// Status text + class
const statusText = computed(() =>
  state.deepfake.result?.deepfake_detected
    ? "DEEPFAKE DETECTED"
    : "NO DEEPFAKE DETECTED"
);

const statusClass = computed(() =>
  state.deepfake.result?.deepfake_detected
    ? "text-red-600"
    : "text-green-600"
);

onMounted(async () => {
  // initial gauge
  targetAngle.value = targetAngleComputed.value;
  animateNeedle();

  try {
    const response = await axios.get(`/api/deepfakes/${deepfakeId}`);
    state.deepfake = response.data;

    fileName.value = state.deepfake.result?.title || "";
    user.value = state.deepfake.result?.user?.username || "";
    scanDate.value = state.deepfake.result?.uploadedDate || "";
    fileSize.value = state.deepfake.result?.fileSize || "";

    // apply gauge from API
    applyDetection(state.deepfake.result?.score || 10);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load deepfake");
  } finally {
    state.isLoading = false;
  }
});

// -----------------------------------------
// VIDEO / IMAGE URLS
// -----------------------------------------
const videoUrl = computed(() =>
  state.deepfake?.video_filename
    ? `/api/uploads/${state.deepfake.video_filename}`
    : null
);

const imageUrl = computed(() =>
  state.deepfake?.image_filename
    ? `/api/uploads/${state.deepfake.image_filename}`
    : null
);

// -----------------------------------------
// DELETE
// -----------------------------------------
const deleteDeepfake = async () => {
  try {
    if (!window.confirm("Delete this deepfake?")) return;

    await axios.delete(`/api/deepfakes/${deepfakeId}`);
    toast.success("Deepfake Deleted Successfully");
    router.push("/deepfakes");
  } catch (err) {
    console.error(err);
    toast.error("Deepfake Not Deleted");
  }
};
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 p-6">

    <!-- Top summary with gauge -->
    <section class="bg-gray-100 p-6 rounded-xl shadow-xl mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">

          <!-- Gauge -->
          <div class="w-48 h-28">
            <svg viewBox="0 0 100 60" class="w-full h-full">

              <!-- segmented arc -->
              <path d="M10 50 A40 40 0 0 1 40 20" stroke="#22c55e" stroke-width="6" fill="none" stroke-linecap="round" />
              <path d="M40 20 A40 40 0 0 1 60 20" stroke="#eab308" stroke-width="6" fill="none" stroke-linecap="round" />
              <path d="M60 20 A40 40 0 0 1 90 50" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round" />

              <!-- center cap -->
              <circle cx="50" cy="50" r="3" fill="#e5e7eb" stroke="#111" stroke-width="0.6" />

              <!-- needle -->
              <line
                :x1="50"
                :y1="50"
                :x2="needle.x"
                :y2="needle.y"
                :stroke="needleColor"
                stroke-width="2.5"
                stroke-linecap="round"
              />

              <!-- ticks -->
              <g v-for="t in ticks" :key="t">
                <line
                  :x1="tickPos(t).x1"
                  :y1="tickPos(t).y1"
                  :x2="tickPos(t).x2"
                  :y2="tickPos(t).y2"
                  stroke="#9ca3af"
                  stroke-width="1"
                />
              </g>
            </svg>
          </div>

          <div>
            <h2 :class="statusClass">{{ statusText }}</h2>
            <p class="text-sm text-gray-500">{{ fileName }} • {{ fileSize }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p><span class="text-gray-500">Name:</span> {{ fileName }}</p>
        </div>
        <div>
          <p><span class="text-gray-500">User:</span> {{ user }}</p>
        </div>

        <!-- FIXED WRONG SYNTAX -->
        <div v-if="state.deepfake.result?.type === 'video'">
          <h4 class="font-semibold mb-2">Video</h4>
          <p>Duration: {{ state.deepfake.result?.duration }}</p>
        </div>

        <div>
          <p><span class="text-gray-500">Scan Date:</span> {{ scanDate }}</p>
        </div>
      </div>
    </section>

    <!-- Details section -->
    <section class="bg-gray-100 p-6 rounded-xl shadow-xl mb-8">
      <h3 class="text-center text-gray-500 mb-6 tracking-wide">DETAILS</h3>

      <div class="bg-gray-200 h-80 rounded-xl mb-6 flex items-center justify-center">
        <div class="relative w-full overflow-hidden rounded-lg video-container">

          <template v-if="videoUrl">
            <video controls class="absolute top-0 left-0 w-full h-full object-cover rounded-lg">
              <source :src="videoUrl" type="video/mp4" />
            </video>
          </template>

          <template v-else-if="imageUrl">
            <img :src="imageUrl" alt="Deepfake Image"
                 class="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
          </template>

          <p v-else class="text-gray-500 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            No media available
          </p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div>
          <h4 class="font-semibold mb-2">Model Results</h4>
          <p>
            {{ state.deepfake.result?.analysis_model || "Not available" }}:
            <span :class="statusClass">{{ statusText }}</span>
          </p>

          <div class="mt-4 flex items-center gap-4">
            <h3 class="text-xl font-bold">Manage Deepfake</h3>

            <button
              @click="deleteDeepfake"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Delete Deepfake
            </button>
          </div>
        </div>
      </div>

    </section>

    <footer class="text-center text-gray-500 text-sm mt-10">
      <p>deepfake © 2025</p>
    </footer>

  </div>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
