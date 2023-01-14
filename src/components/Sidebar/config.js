export default [
   {
      id: 'home',
      title: 'Домашняя страница',
      href: '/',
      component: () => import('@/components/SidebarPages/Home.vue')
   },
   {
      id: 'tasks',
      title: 'Задачи',
      href: '/tasks',
      component: () => import('@/components/SidebarPages/Tasks.vue')
   },
   {
      id: 'calendar',
      title: 'Календарь',
      href: '/calendar'
   },
   {
      id: 'plans',
      title: 'Планы',
      href: '/plans'
   },
   {
      id: 'board',
      title: 'Доски',
      href: '/board'
   },
   {
      id: 'teams',
      title: 'Команды',
      href: '/teams'
   }
]