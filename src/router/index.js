import { createRouter, createWebHistory } from 'vue-router';
import userAccountRouter from '@/components/UserAccount/router';
import indexConfig from '@/components/Index/router';

const indexPages = indexConfig.map(function(item) {
   return item;
})

const sidebarRoutes = userAccountRouter.map(function(item) {
   return item;
})

const ifAuthenticated = (to, from, next) => {
   if (localStorage.accessToken && localStorage.user) {
     next()
   } else {
     next()
   }
}

let routes = [
   {
      path: '/',
      component: () => import('@/components/Index/Index.vue'),
      children: indexPages,
   },
   {
      path: '/user_account',
      component: () => import('@/components/UserAccount/UserAccount.vue'),
      beforeEnter: ifAuthenticated,
      children: sidebarRoutes
   }
]

const router = createRouter( {
   routes: routes,
   history: createWebHistory(process.env.BASE_URL)
})

export default router;