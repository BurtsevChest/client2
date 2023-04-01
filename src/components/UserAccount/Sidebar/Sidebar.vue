<template>
   <aside class="sidebar flex flex-column">
      <router-link class="light logo" to="/main">
            ProjectManager      
      </router-link>
      <h3 class="menu_title">Menu</h3>
      <div class="menu">
         <router-link  v-for="item in menuList" v-bind:key="item.id" :to="item.href" class="light pl-8 sidebar_button radius-block flex a-items-center">
            <span class="material-icons">{{ item.icon }}</span>
            <span class="sidebar_link">{{ $t(item.title) }}</span>
         </router-link>
      </div>
      <div class="sidebar-background empty_flex">
         <div class="sidebar-shadow"></div>
      </div>
      <router-link class="light pl-8 sidebar_button radius-block flex a-items-center mb-12" to="/settings">
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

<style scoped>
.sidebar {
   min-width: 300px;
   background-color: var(--background-color);
   padding: 0 12px 12px 12px;
   box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);
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
}

.sidebar_button:hover {
   background-color: var(--text-block-hover);
}

.sidebar_button:hover>span {
   color: var(--text-hover);
}

.router-link-exact-active {
   background-color: var(--text-block-hover);
}

.router-link-exact-active>span {
   color: var(--text-hover);
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
   background: url('@/components/UserAccount/Sidebar/resources/images/sidebar-2.png') no-repeat;
   background-size: contain;
   background-position: bottom;
   margin-bottom: 16px;
   position: relative;
}


</style>