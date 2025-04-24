import { createMemoryHistory, createRouter } from 'vue-router'

export const RoutePath = {
  Home: '/',
  About: '/about',

} as const

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: RoutePath.Home,
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },

    {
      path: RoutePath.About,
      name: 'about',
      component: () => import('../pages/About.vue'),
    }
  ],
})
