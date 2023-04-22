export default [
   {
      path: '/',
      component: () => import('@/components/Index/pages/Landing/Landing.vue')
   },
   {
      path: '/register',
      component: () => import('@/components/Index/pages/Register/Register.vue'),
   },
   {
      path: '/landing',
      component: () => import('@/components/Index/pages/Main/Main.vue'),
   },
   {
      path: '/:pathMatch(.*)*',
      component: () => import('@/components/Index/pages/PageNotFound/PageNotFound.vue'),
   }
]