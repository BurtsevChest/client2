<template>
   <div class="Settings">
      <h2 class="h2 pb-16">Настройки интерфейса</h2>
      <h3 class="h3 pb-8">Тема оформления</h3>
      <div class="Settings-themesWrapper">
         <div class="flex">
            <div class="flex-col flex-col-2">
               <div class="Settings-themesWrapper-item p-6" :class="{ 'Settings-themesWrapper-item-active' : activeTheme == 'dark'}">
                  <img class="image" src="@/components/pages/Settings/resources/images/dark_theme.jpg" alt="Темная тема" @click="setTheme('dark')">
               </div>
            </div>
            <div class="flex-col flex-col-2">
               <div class="Settings-themesWrapper-item p-6" :class="{ 'Settings-themesWrapper-item-active' : activeTheme == 'light'}">
                  <img class="image" src="@/components/pages/Settings/resources/images/light_theme.jpg" alt="Светлая тема" @click="setTheme('light')">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import settingItem from './templates/settingItem.vue';

export default {
   // eslint-disable-next-line
   name: "Settings",
   data() {
      return {
         activeTheme: '',
         theme: document.documentElement
      }
   },
   methods: {
      setTheme(theme) {
         this.theme.setAttribute('data-theme', theme);
         this.activeTheme = theme
         localStorage.setItem('theme', theme)
      }
   },
   mounted() {
      this.activeTheme = localStorage.theme,
      console.log(settingItem.data)
   }
}
</script>

<style lang="less" scoped>
.Settings{
   &-themesWrapper {
      &-item {
         border-radius: 10px;
         cursor: pointer;

         &-active {
            background: rgba(30, 41, 59, 0.1);
         }
      }
   }
}
</style>