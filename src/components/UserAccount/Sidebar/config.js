export default [
   {
      id: 'home',
      title: 'user_account_sidebar_menu_home',
      href: '/user_account/home',
      component: () => import('@/components/UserAccount/pages/Home/Home.vue'),
      icon: 'home'
   },
   {
      id: 'tasks',
      title: 'user_account_sidebar_menu_tasks',
      href: '/user_account/tasks',
      component: () => import('@/components/UserAccount/pages/Tasks/Tasks.vue'),
      icon: 'task'
   },
   {
      id: 'calendar',
      title: 'user_account_sidebar_menu_calendar',
      href: '/user_account/calendar',
      component: () => import('@/components/UserAccount/pages/Calendar/Calendar.vue'),
      icon: 'calendar_month'
   },
   {
      id: 'plans',
      title: 'user_account_sidebar_menu_plans',
      href: '/user_account/plans',
      component: () => import('@/components/UserAccount/pages/Plans/Plans.vue'),
      icon: 'rule'
   },
   {
      id: 'board',
      title: 'user_account_sidebar_menu_board',
      href: '/user_account/board',
      component: () => import('@/components/UserAccount/pages/Boards/Boards.vue'),
      icon: 'dashboard'
   },
   {
      id: 'teams',
      title: 'user_account_sidebar_menu_teams',
      href: '/user_account/teams',
      component: () => import('@/components/UserAccount/pages/Teams/Teams.vue'),
      icon: 'group'
   }
]