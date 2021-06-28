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
import StuInfo from "~/component/StuInfo";
import TeacherInfo from "~/component/TeacherInfo";
import StuTable from "~/component/StuTable";
import TeaTable from "~/component/TeaTable";
import StuScore from "~/component/StuScore";
import TeaInfo from "~/component/TeaInfo";
import TeaCourse from "~/component/TeaCourse";
import Course from "~/component/Course";
import Admin from "~/component/Admin";
import TeaAddScore from "~/component/TeaAddScore";
import AllStuTable from "~/component/AllStuTable";
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
  },
  {
    path: '/stuinfo',
    component: StuInfo
  },
  {
    path: '/teacherinfo',
    component: TeacherInfo
  },
  {
    path: '/stutable',
    component: StuTable
  },
  {
    path: '/stuscore',
    component: StuScore
  },
  {
    path: '/teainfo',
    component: TeaInfo
  },
  {
    path: '/teacourse',
    component: TeaCourse
  },
  {
    path: '/teatable',
    component: TeaTable
  },
  {
    path: '/course',
    component: Course
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/teaaddscore',
    component: TeaAddScore
  },
  {
    path: '/allstutable',
    component: AllStuTable
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
