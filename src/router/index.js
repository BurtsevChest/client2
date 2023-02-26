import { createRouter, createWebHistory } from 'vue-router';
import config from '@/components/UserAccount/Sidebar/config';
import indexConfig from '@/components/Index/config';

const indexPages = indexConfig.map(function(item) {
   return {
      path: item.path,
      component: item.component
   }
})

const sidebarRoutes = config.map(function(item) {
   return {
      path: item.href,
      component: item.component
   }
})

const ifAuthenticated = (to, from, next) => {
   if (localStorage.accessToken && localStorage.user) {
     next()
   } else {
     next('/main')
   }
 }

let routes = [
   {
      path: '/',
      component: () => import('@/components/Index/Index.vue'),
      children: indexPages,
      redirect: '/main'
   },
   {
      path: '/user_account',
      component: () => import('@/components/UserAccount/UserAccount.vue'),
      beforeEnter: ifAuthenticated,
      children: sidebarRoutes.concat(
         {
            path: '/settings',
            component: () => import('@/components/UserAccount/pages/Settings/Settings.vue')
         }
      )
   }
]

const router = createRouter( {
   routes: routes,
   history: createWebHistory(process.env.BASE_URL)
})

export default router;