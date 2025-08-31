<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

// Define props for the component
const props = defineProps({
  deepfake: {
    type: Object,
    required: true,
  },
});

const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

// Computed property for truncated description
const truncatedDescription = computed(() => {
  const description = props.deepfake.result.analysis_model || ''; // Default to empty string if no description
  if (!showFullDescription.value) {
    return description.length > 90 ? description.substring(0, 90) + '...' : description;
  }
  return description;
});

// Computed property to show confidence and detection status
const detectionDetails = computed(() => {
  const { deepfake_detected, confidence, detection_score } = props.deepfake.result;
  return {
    deepfake_detected,
    confidence,
    detection_score: (detection_score * 100).toFixed(2),  // Show score as percentage
  };
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <!-- Deepfake Title and Type -->
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ deepfake.type }}</div>
        <h3 class="text-xl font-bold">{{ deepfake.title }}</h3>
      </div>

      Description with Toggle
      <div class="mb-5">
        <div>{{ truncatedDescription }}</div>
        <button
          @click="toggleFullDescription"
          class="text-blue-500 hover:text-green-600 mt-2"
        >
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <!-- Confidence Level -->
      <h3 class="text-green-500 mb-2">
        Confidence: {{ detectionDetails.confidence }} ({{ detectionDetails.detection_score }}%)
      </h3>

      <!-- Detection Status -->
      <div v-if="detectionDetails.deepfake_detected" class="text-red-500 mb-2">
        Deepfake Detected: Yes
      </div>
      <div v-else class="text-gray-500 mb-2">
        Deepfake Detected: No
      </div>

      <!-- Divider -->
      <div class="border border-gray-100 mb-5"></div>

      <!-- Read More Link -->
      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <RouterLink
          :to="'/deepfakes/' + deepfake.id"
          class="h-[36px] bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
