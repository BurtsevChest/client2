export default [
   {
      path: '/user_account/home',
      component: () => import('@/components/UserAccount/pages/Home/Home.vue'),
   },
   {
      path: '/user_account/tasks',
      component: () => import('@/components/UserAccount/pages/Tasks/Tasks.vue'),
   },
   {
      path: '/user_account/calendar',
      component: () => import('@/components/UserAccount/pages/Calendar/Calendar.vue'),
   },
   {
      path: '/user_account/projects',
      component: () => import('@/components/UserAccount/pages/Projects/Projects.vue'),
   },
   {
      path: '/user_account/board',
      component: () => import('@/components/UserAccount/pages/Boards/Boards.vue'),
   },
   {
      path: '/user_account/board/:boardId',
      component: () => import('@/components/UserAccount/pages/Boards/templates/boardPage.vue'),
   },
   {
      path: '/user_account/teams',
      component: () => import('@/components/UserAccount/pages/Teams/Teams.vue'),
   },
   {
      path: '/user_account/teams/:teamId',
      component: () => import('@/components/UserAccount/pages/Teams/templates/teamPage.vue'),
   },
   {
      path: '/user_account/business_proccess',
      component: () => import('@/components/UserAccount/pages/BusnessProccess/BusnessProccess.vue'),
   },
   {
      path: '/user_account/business_proccess/:proccessId',
      component: () => import('@/components/UserAccount/pages/BusnessProccess/templates/createProccessPage.vue'),
   },
   {
      path: '/settings',
      component: () => import('@/components/UserAccount/pages/Settings/Settings.vue')
   }
]
