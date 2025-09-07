import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia'
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';

import { isLoggedIn, accessToken } from './authState'

// Check localStorage for existing token on app startup
const token = localStorage.getItem('access_token')
if (token) {
  accessToken.value = token
  isLoggedIn.value = true
}

const pinia = createPinia()

const app = createApp(App);

app.use(router);
app.use(pinia)
app.use(Toast);

app.mount('#app');
