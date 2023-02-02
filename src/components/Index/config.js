// Обязательно задаем title. Он пойдет в title страницы

export default [
   {
      id: 'main',
      path: '/main',
      component: () => import('@/components/Index/pages/Main/Main.vue'),
      title: 'Project Manager'
   },
   {
      id: 'register',
      path: '/register',
      component: () => import('@/components/Index/pages/Register/Register.vue'),
      title: 'Регистрация'
   }
]