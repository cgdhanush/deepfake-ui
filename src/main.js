import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';

import { isLoggedIn, accessToken } from './authState'

// Check localStorage for existing token on app startup
const token = localStorage.getItem('token')
if (token) {
  accessToken.value = token
  isLoggedIn.value = true
}

const app = createApp(App);

app.use(router);
app.use(Toast);

app.mount('#app');
