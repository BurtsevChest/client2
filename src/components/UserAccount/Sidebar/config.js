export default [
   {
      id: 'home',
      title: 'Домашняя страница',
      href: '/user_account/home',
      component: () => import('@/components/UserAccount/pages/Home/Home.vue'),
      icon: 'home'
   },
   {
      id: 'tasks',
      title: 'Задачи',
      href: '/user_account/tasks',
      component: () => import('@/components/UserAccount/pages/Tasks/Tasks.vue'),
      icon: 'task'
   },
   {
      id: 'calendar',
      title: 'Календарь',
      href: '/user_account/calendar',
      component: () => import('@/components/UserAccount/pages/Calendar/Calendar.vue'),
      icon: 'calendar_month'
   },
   {
      id: 'plans',
      title: 'Планы',
      href: '/user_account/plans',
      component: () => import('@/components/UserAccount/pages/Plans/Plans.vue'),
      icon: 'rule'
   },
   {
      id: 'board',
      title: 'Доски',
      href: '/user_account/board',
      component: () => import('@/components/UserAccount/pages/Boards/Boards.vue'),
      icon: 'dashboard'
   },
   {
      id: 'teams',
      title: 'Команды',
      href: '/user_account/teams',
      component: () => import('@/components/UserAccount/pages/Teams/Teams.vue'),
      icon: 'group'
   }
]