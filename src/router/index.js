import { createRouter, createWebHistory } from 'vue-router'
import config from '@/components/UserAccount/Sidebar/config'
import indexConfig from '@/components/Index/config'

// Тянем страницы Indexа
const indexPages = indexConfig.map(function(item) {
   return {
      path: item.path,
      component: item.component
   }
})

// Тянем страницы сайдбара
const sidebarRoutes = config.map(function(item) {
   return {
      path: item.href,
      component: item.component,
      beforeEnter() {
         // сохраняем в localStorage активную страницу
         if(localStorage.getItem('activePage') != '') {
            localStorage.setItem('activePage', item.id)
         }
      }
   }
})

// Основной роутер, делящий приложение на две части. Index и UserAccount
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

export default router