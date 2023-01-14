<template>
   <aside class="sidebar flex flex-column">
      <div class="light logo">
         ProjectManager
      </div>
      <h3 class="menu_title">Menu</h3>
      <div class="menu">
         <router-link  v-for="item in menuList" v-bind:key="item.id" :to="item.href" @click="setProperty(item.id, item.title)" class="light sidebar_button">
            <span class="sidebar_link">{{ item.title }}</span>
         </router-link>
      </div>
      <div class="empty_flex"></div>
      <router-link @click="setProperty('settings', 'Настройки')" class="light sidebar_button" to="/settings">
            <span class="sidebar_link">Настройки</span>
      </router-link>
   </aside>
</template>

<script>
import config from '@/components/Sidebar/config'

export default {
   // eslint-disable-next-line
   name: "",
   data() {
      return {
         menuList: config
      }
   },
   methods: {
      setProperty(id, title) {
         localStorage.setItem('activePage', id)
         document.title = title
      }
   }

}
</script>


<style scoped>
.sidebar {
   width: 300px;
   height: 100vh;
   background-color: var(--background-color);
   padding: 0 12px;
   box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);
}

.light {
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
   display: block;
   border-radius: 10px;
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
</style>