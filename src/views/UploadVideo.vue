<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const router = useRouter();
const toast = useToast();

// Form fields and data
const title = ref('');
const description = ref('');
const file_path = ref('');
const duration = ref(0);
const videoFile = ref(null);
const videoUrl = ref(null);
const uploadedDate = ref(new Date().toISOString()); // Set the current date and time

const onVideoFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Set title to the file name without extension
    title.value = file.name.replace(/\.[^/.]+$/, "");

    // Create a video element to load metadata
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';

    // Create a temporary blob URL for the video file
    const videoURL = URL.createObjectURL(file);
    videoElement.src = videoURL;

    videoElement.onloadedmetadata = () => {
      // Update duration only if it's a valid number
      if (!isNaN(videoElement.duration)) {
        duration.value = videoElement.duration;
      } else {
        duration.value = 0;
      }

      // Release memory used by the blob URL
      URL.revokeObjectURL(videoURL);
    };

    // Set the video file to the reactive ref
    videoFile.value = file;

    // Cannot access the real file path in browser, so just store the name
    file_path.value = file.name;
  }
};



// Handling the form submission
const handleUpload = async () => {
  if (!videoFile.value) {
    toast.error('Please select a video to upload');
    return;
  }

  if (!title.value || !duration.value || !file_path.value) {
    toast.error('All fields are required');
    return;
  }

  const formData = new FormData();
  formData.append('video', videoFile.value);
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('duration', duration.value);
  formData.append('file_path', file_path.value);  // Include the file_path field in the formData
  formData.append('uploadedDate', uploadedDate.value);  // Include the uploaded date

  try {
    // Make the real POST request to your API
    const response = await axios.post('/api/upload_video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Assuming you're sending a file
      },
    });

    // On success
    toast.success('Deepfake uploaded successfully');
    router.push(`/deepfakes/${response.data.id}`); // Redirect to the uploaded deepfake view
  } catch (error) {
    console.error('Error uploading deepfake', error);

    // Show error message
    toast.error('Failed to upload deepfake');
  }
};

</script>

<template>
  <div class="container mx-auto py-12">
    <h1 class="text-3xl font-bold mb-8 text-center">Upload a Deepfake Video</h1>

    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <!-- Upload Form -->
      <form @submit.prevent="handleUpload">

        <div class="mb-4">
          <label for="video" class="block text-gray-700 font-medium mb-2">Upload Video</label>
          <input id="video" type="file" accept="video/mp4, video/avi" @change="onVideoFileChange"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
          <input id="title" v-model="title" type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of the video" />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
          <textarea id="description" v-model="description" rows="3"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the deepfake video"></textarea>
        </div>

        <div class="mb-4">
          <label for="duration" class="block text-gray-700 font-medium mb-2">Duration (in seconds)</label>
          <input id="duration" v-model="duration" type="number"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Duration of the video" readonly />
        </div>

        <div class="mb-4">
          <label for="file_path" class="block text-gray-700 font-medium mb-2">Video File Path</label>
          <input id="file_path" v-model="file_path" type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Location of the video (Auto-detected)" readonly />
        </div>

        <div class="flex justify-center mt-6">
          <button type="submit"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
            Upload Deepfake
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
