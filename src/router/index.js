/*
 * @Des: 页面、组件说明
 * @Author: ur name
 * @Date: 2020-09-21 11:30:36
 * @query: {string} p1  内容ID
 * @props: {string} p1  数据源
 * @event: {string} p1  des
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: require('@/views/index.vue').default
  },
  {
    path: '/about',
    component: require('@/views/about.vue').default
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router