import { createApp } from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'
import router from "./router"
import SvgIcon from "./components/SvgIcon.vue"


createApp(App).use(router).component('SvgIcon',SvgIcon).mount('#app')
