export default [
   {
      id: 'home',
      title: 'Домашняя страница',
      href: '/',
      component: () => import('@/components/pages/Home.vue'),
      icon: 'home'
   },
   {
      id: 'tasks',
      title: 'Задачи',
      href: '/tasks',
      component: () => import('@/components/pages/Tasks.vue'),
      icon: 'task'
   },
   {
      id: 'calendar',
      title: 'Календарь',
      href: '/calendar',
      icon: 'calendar_month'
   },
   {
      id: 'plans',
      title: 'Планы',
      href: '/plans',
      icon: 'rule'
   },
   {
      id: 'board',
      title: 'Доски',
      href: '/board',
      icon: 'dashboard'
   },
   {
      id: 'teams',
      title: 'Команды',
      href: '/teams',
      icon: 'group'
   }
]