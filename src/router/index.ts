import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/page/Main.vue')
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: () => import('@/page/ContactUs.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/page/Policy.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      // return {selector: to.hash}
      //Or for Vue 3:
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  },
})
export default router