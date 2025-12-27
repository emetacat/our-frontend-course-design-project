import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue' // 新增
import Bar from '../views/Bar.vue'
import Area from '../views/Area.vue'
import Bar2 from '../views/Bar2.vue'
import Pie from '../views/Pie.vue'
import Line from '../views/Line.vue'

const routes = [
  { path: '/', redirect: '/dashboard' }, // 默认跳转到看板
  { path: '/dashboard', component: Dashboard },
  { path: '/bar', component: Bar },
  { path: '/area', component: Area },
  { path: '/bar2', component: Bar2 },
  { path: '/pie', component: Pie },
  { path: '/line', component: Line },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
