import { createMemoryHistory, createRouter } from 'vue-router'

export const RoutePath = {
  Home: '/',
  Catalog: '/catalog',
  

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
      path: RoutePath.Catalog,
      name: 'catalog',
      component: () => import('../pages/Сatalog.vue'),
    }
  ],
})
