import { createRouter, createWebHashHistory } from 'vue-router'
// 引入新建的5个页面组件
import Bar from '../views/Bar.vue'
import Area from '../views/Area.vue'
import Bar2 from '../views/Bar2.vue'
import Pie from '../views/Pie.vue'
import Line from '../views/Line.vue'

const routes = [
  { path: '/', redirect: '/bar' }, // 默认跳转
  { path: '/bar', component: Bar },
  { path: '/area', component: Area },
  { path: '/bar2', component: Bar2 },
  { path: '/pie', component: Pie },
  { path: '/line', component: Line }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router