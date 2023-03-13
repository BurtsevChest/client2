<template>
   <div class="Settings p-20">
      <h2 class="user_account-h2 pb-16">{{ $t('user_account_settings_title') }}</h2>
      <h3 class="user_account-h3 pb-8">{{ $t('user_account_settings_themes') }}</h3>
      <div class="Settings-themesWrapper">
         <div class="flex">
            <div class="flex-col">
               <div class="Settings-themesWrapper-item p-6" :class="{ 'Settings-themesWrapper-item-active' : activeTheme == 'dark'}">
                  <img class="image" src="@/components/UserAccount/pages/Settings/resources/images/dark_theme.jpg" alt="Темная тема" @click="setTheme('dark')">
               </div>
            </div>
            <div class="flex-col">
               <div class="Settings-themesWrapper-item p-6" :class="{ 'Settings-themesWrapper-item-active' : activeTheme == 'light'}">
                  <img class="image" src="@/components/UserAccount/pages/Settings/resources/images/light_theme.jpg" alt="Светлая тема" @click="setTheme('light')">
               </div>
            </div>
         </div>
      </div>
      <h3 class="user_account-h3 pb-8">{{ $t('user_account_settings_languages') }}</h3>
      <div class="flex">
         <div v-for="item in languages" v-bind:key="item.locale" class="flex-col">
            <div @click="setLocale(item.locale)" v-if="item.locale === activeLocale" class="ph-10 pv-16 pointer box-shadow-hover Settings-lnguages-item-active radius-block flex a-items-center">
               <span class="flag-icon" :class="item.flag"></span>
               <div class="pl-8">{{item.name}}</div>
            </div>
            <div @click="setLocale(item.locale)" v-else class="ph-10 pv-16 pointer box-shadow-hover radius-block flex a-items-center">
               <span class="flag-icon" :class="item.flag"></span>
               <div class="pl-8">{{item.name}}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { getLocale, loadLanguageAsync, translatedlanguages } from '@/lang/lang';

export default {
   // eslint-disable-next-line
   name: "Settings",
   data() {
      return {
         activeTheme: '',
         theme: document.documentElement,
         languages: translatedlanguages,
         activeLocale: getLocale()
      }
   },
   methods: {
      setTheme(theme) {
         this.theme.setAttribute('data-theme', theme);
         this.activeTheme = theme
         localStorage.setItem('theme', theme)
      },
      setLocale(locale) {
         loadLanguageAsync(locale);
         this.activeLocale = getLocale()
      }
   },
   mounted() {
      if(localStorage.theme) {
         this.activeTheme = localStorage.theme
      } else {
         this.activeTheme = 'light'
      }
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

   &-lnguages {
      &-item {
         &-active {
            box-shadow: 0 0 12px rgb(128 128 128 / 20%);
         }
      }
   }
}
</style>