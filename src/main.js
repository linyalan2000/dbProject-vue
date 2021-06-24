import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import App from './App.vue'
import Login from "~/component/Login.vue";
import VueRouter from 'vue-router'
import Score from "~/component/Score";
import Info from "~/component/Info";
import Test from "~/component/Test";
import Common from "~/component/Common";
Vue.prototype.$axios = axios    //注册为全局变量，使用方法为:this.$axios
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.Common = Common;

const routes=[
  {
    path: '/login',
    component: Login
  },
  {
    path: '/info',
    component: Info
  },
  {
    path: '/score',
    component: Score
  },
  {
    path: '/test',
    component: Test
  }
]

    const router = new VueRouter(
    {routes}
)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
