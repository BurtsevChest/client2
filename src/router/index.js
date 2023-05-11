import { createRouter, createWebHistory } from 'vue-router';
import userAccountRouter from '@/components/UserAccount/router';
import indexConfig from '@/components/Index/router';

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
      children: indexConfig,
   },
   {
      path: '/user_account',
      component: () => import('@/components/UserAccount/UserAccount.vue'),
      beforeEnter: ifAuthenticated,
      children: userAccountRouter
   }
]

const router = createRouter( {
   routes: routes,
   history: createWebHistory(process.env.BASE_URL)
})

export default router;