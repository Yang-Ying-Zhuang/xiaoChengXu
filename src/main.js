import Vue from 'vue'
import App from './App'

//引入https
import $https from "@/utils/https.js"
//通过构造
Vue.prototype.$https = $https 

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()