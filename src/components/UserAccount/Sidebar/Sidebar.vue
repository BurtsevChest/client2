<template>
   <control :template="'@/components/UserAccount/Sidebar/templates/sidebarIcons.vue'" class="hide"/>
   <aside class="sidebar flex flex-column">
      <router-link class="white-color logo" to="/">
            ProjectManager      
      </router-link>
      <h3 class="menu_title">Menu</h3>
      <div class="menu">
         <router-link  v-for="item in menuList" v-bind:key="item.id" :to="item.href" class="pl-8 white-color sidebar_button radius-block flex a-items-center" :class="{'active': $route.path.includes(item.href)}">
            <svg v-if="item.customIcon" height="24" viewBox="0 0 24 24" width="24" >
               <use :style="item.customIconUseStyle" :href="item.customIcon"/>
            </svg>
            <span v-else class="material-icons">{{ item.icon }}</span>
            <span class="sidebar_link">{{ $t(item.title) }}</span>
         </router-link>
      </div>
      <div class="sidebar-background empty_flex">
         <div class="sidebar-shadow"></div>
      </div>
      <router-link class="pl-8 sidebar_button radius-block flex a-items-center mb-12" to="/settings">
         <span class="material-icons">settings</span>
         <span class="sidebar_link">{{ $t('user_account_sidebar_menu_settings') }}</span>
      </router-link>
   </aside>
</template>

<script>
import config from '@/components/UserAccount/Sidebar/config'

export default {
   // eslint-disable-next-line
   name: "",
   data() {
      return {
         menuList: config
      }
   }
}
</script>

<style lang="less">
.sidebar {
   min-width: 300px;
   background: var(--background-color);
   padding: 0 12px 12px 12px;
   box-shadow: 0 0 8px rgba(128, 128, 128, 0.1);
   transition: 0.3s;
}

.light {
   transition: 0.3s;
   color: var(--text-color);
}

.logo {
   padding: 12px 0 40px 12px;
   font-size: 30px;
}

.menu {
   display: flex;
   flex-direction: column;
}

.sidebar_button {
   width: 100%;
   margin-bottom: 5px;
   color: var(--text-color);

   &:hover {
      background-color: var(--text-block-hover);
   }

   &.active {
      background-color: var(--text-block-hover);
   }
}

.router-link-exact-active {
   background-color: var(--text-block-hover);
}

.router-link-exact-active>span {
   color: var(--text-color)
}

.sidebar_link {
   display: block;
   padding: 12px;
}

.settings {
   padding: 0 0 24px 12px;
   color: var(--text-color);
}

.empty_flex {
   flex: 1 1 0%;
}

.menu_title {
   color: #64748b;
   padding-left: 12px;
   padding-bottom: 12px;
}

.sidebar-background {
   /* background: url('@/components/UserAccount/Sidebar/resources/images/sidebar.png') no-repeat; */
   background-size: contain;
   background-position: bottom;
   margin-bottom: 16px;
   position: relative;
}


</style>