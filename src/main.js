import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

createApp(App).use(router).mount('#app')

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')