import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App.vue';
import store from '@/store/store.js';
import router from "./router";
import "@/assets/css/style.css";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Toast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';


// Composables
import { createApp } from 'vue'
import vuetify from './plugins/vuetify'

// Plugins
import { registerPlugins } from '@/plugins'
import vue3GoogleLogin from 'vue3-google-login' // Import the Vue 3 Google Login plugin

const app = createApp(App)

registerPlugins(app)

app.use(router)

app.use(vuetify)

app.use(store)
app.use(ToastPlugin);
app.use(Toast, {
    position: 'top' // Set the position to 'top-mid' for top middle
  })
app.use(vue3GoogleLogin, {
    clientId: '647318104905-1seibsq3nk58501f551f1erb1k3pkk0m.apps.googleusercontent.com' 
})


app.mount('#app')
