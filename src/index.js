import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import './style/main.css'
import './style/weui.min.css'

Vue.use(VueResource);

const app = new Vue({
  router,
  ...App
})

app.$mount('#app')
