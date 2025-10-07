import { createMemoryHistory, createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

export const RoutePath = {
  Home: '/',
  Catalog: '/catalog',
  Basket: '/basket',
  OrderRegistration: '/order',
  Articles: '/articles',
  ArticleReading: '/articlereading',
  Brends: '/brends',
  Sales: '/sales',
  Mistake404: '/mistake404',
  ProductDescription: '/productdescription',
  

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
      props: (route) => ({
        query: route.query
      })
    },

    {
      path: RoutePath.Basket,
      name: 'basket',
      component: () => import('../pages/Basket.vue'),
    },

    {
      path: RoutePath.OrderRegistration,
      name: 'order',
      component: () => import('../pages/OrderRegistration.vue'),
    },

    {
      path: RoutePath.Articles,
      name: 'articles',
      component: () => import('../pages/Articles.vue'),
    },

    {
      path: '/articlereading/:id',
      name: 'articlereading',
      component: () => import('../pages/ArticleReading.vue'),
    },

    {
      path: RoutePath.Brends,
      name: 'brends',
      component: () => import('../pages/Brends.vue'),
    },

    {
      path: RoutePath.Sales,
      name: 'sales',
      component: () => import('../pages/Sales.vue'),
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/Mistake404.vue')
    },

    {
      path: '/productdescription/:id',
      name: 'productdescription',
      component: () => import('../pages/ProductDescription.vue'),
    },

    

    
  ],
})




// Обработка ошибок маршрутизации
router.onError((error) => {
  console.error('Router error:', error)
  // Перенаправляем на страницу 404 при ошибке загрузки компонента
  router.push('/404')
})

export default router

