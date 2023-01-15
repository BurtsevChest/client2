import { createRouter, createWebHistory } from 'vue-router'
import config from '@/components/Sidebar/config'

// Для других роутов вдруг если что
let routes = [
   {
      path: '/settings',
      component: () => import('@/components/SidebarPages/Settings/Settings.vue')
   }
]

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

const router = createRouter( {
   routes: routes.concat(sidebarRoutes),
   history: createWebHistory(process.env.BASE_URL)
})

export default router