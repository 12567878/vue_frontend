import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {sha256} from "js-sha256";
import { Base64 } from 'js-base64'
axios.defaults.baseURL = "http://8.140.12.78:85/api"
Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  axios,
  router,
  sha256,
  Base64,
  render: h => h(App)
});
import App from "@/App";
export default {

}