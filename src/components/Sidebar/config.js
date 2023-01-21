export default [
   {
      id: 'home',
      title: 'Домашняя страница',
      href: '/',
      component: () => import('@/components/pages/Home/Home.vue'),
      icon: 'home'
   },
   {
      id: 'tasks',
      title: 'Задачи',
      href: '/tasks',
      component: () => import('@/components/pages/Tasks/Tasks.vue'),
      icon: 'task'
   },
   {
      id: 'calendar',
      title: 'Календарь',
      href: '/calendar',
      component: () => import('@/components/pages/Calendar/Calendar.vue'),
      icon: 'calendar_month'
   },
   {
      id: 'plans',
      title: 'Планы',
      href: '/plans',
      component: () => import('@/components/pages/Plans/Plans.vue'),
      icon: 'rule'
   },
   {
      id: 'board',
      title: 'Доски',
      href: '/board',
      component: () => import('@/components/pages/Boards/Boards.vue'),
      icon: 'dashboard'
   },
   {
      id: 'teams',
      title: 'Команды',
      href: '/teams',
      component: () => import('@/components/pages/Teams/Teams.vue'),
      icon: 'group'
   }
]