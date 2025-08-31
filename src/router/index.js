import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DeepfakesView from '@/views/DeepfakesView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import DeepfakeView from '@/views/DeepfakeView.vue';
import UploadDeepfake from '@/views/UploadVideo.vue';
import About from '@/views/About.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/deepfakes',
      name: 'deepfakes',
      component: DeepfakesView,
    },
    {
      path: '/deepfakes/:id',
      name: 'deepfake',
      component: DeepfakeView,
    },
    {
      path: '/deepfakes/upload',
      name: 'upload-deepfake',
      component: UploadDeepfake,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
