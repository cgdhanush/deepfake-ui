<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const router = useRouter();
const toast = useToast();

const title = ref("");
const description = ref("");
const file_path = ref("");
const imageFile = ref(null);

const onImageFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    title.value = file.name.replace(/\.[^/.]+$/, "");
    file_path.value = file.name;
    imageFile.value = file;
  }
};

const handleUpload = async () => {
  if (!imageFile.value) {
    toast.error("Please select an image to upload");
    return;
  }
  if (!title.value) {
    toast.error("Title is required");
    return;
  }

  let current_user;
  try {
    const res = await axios.get("/api/users/me", {});
    current_user = res.data;
  } catch (error) {
    toast.error("Could not retrieve user info");
    return;
  }

  const formData = new FormData();
  formData.append("user_id", current_user.id);
  formData.append("image", imageFile.value);
  formData.append("title", title.value);
  formData.append("description", description.value || "");

  try {
    const response = await axios.post("/api/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Image uploaded successfully");
    router.push(`/deepfakes/${response.data.id}`);
  } catch (error) {
    toast.error("Failed to upload image");
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg shadow-md">
    <form @submit.prevent="handleUpload">
      <div class="mb-4">
        <label for="image" class="block text-gray-700 font-medium mb-2">Select Image</label>
        <input id="image" type="file" accept="image/png, image/jpeg" @change="onImageFileChange"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
        <input id="title" v-model="title" type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter image title" />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
        <textarea id="description" v-model="description" rows="3"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the image"></textarea>
      </div>

      <div class="mb-4">
        <label for="file_path" class="block text-gray-700 font-medium mb-2">File Name</label>
        <input id="file_path" v-model="file_path" type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" readonly />
      </div>

      <div class="flex justify-center mt-6">
        <button type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full">
          Upload Image
        </button>
      </div>
    </form>
  </div>
</template>
