import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/LoginUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ConTian',
    name: 'ConTian',
    component: () => import('../views/ConTian.vue')
  },
  {
    path: '/CustomerEntry',
    name: 'CustomerEntry',
    component: () => import('../views/CustomerEntry.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
