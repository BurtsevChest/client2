export default [
   {
      id: 'main',
      path: '/main',
      component: () => import('@/components/Index/pages/Main/Main.vue'),
   },
   {
      id: 'register',
      path: '/register',
      component: () => import('@/components/Index/pages/Register/Register.vue'),
   }
]