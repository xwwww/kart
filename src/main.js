// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
// import axios from 'axios'
import router from '@/router'


// Vue.prototype.$axios = axios
createApp(App).use(router).mount('#app')
