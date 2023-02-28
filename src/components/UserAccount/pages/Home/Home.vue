<template>
   <div class="Home">
      <div class="flex pb-32">
         <div class="flex-col">
            <div class="Home-avatar flex">
               <img :src="user_avatar" alt="">
            </div>
         </div>
         <div class="flex-col flex-col-4">
            <div class="Home-user_name-wrapper pt-20">
               <div class="flex a-items-center pb-8">
                  <h1 class="user_account-h1">{{ user.name }} {{ user.last_name }}</h1>
                  <div @click="openPro" class="Home-user-label ml-16 flex a-items-center box-shadow ph-10 pv-10 pointer radius-block">
                     <span class="material-icons">star</span>
                     <p class="flex a-items-center pl-10">PRO</p>
                  </div>
               </div>
               <p class="Home-user-emal Home-user-label pointer pb-16">
                  <a href="mailto:{{ user.email }}">
                     {{ user.email }}
                  </a>
               </p>
               <div class="Home-user-label pointer mb-16" @click="clearLocalStorage">
                  Выйти
               </div>
               
            </div>
         </div>
      </div>
      <div class="">
         <h2 class="user_account-h2 pb-20">Обучение и навыки</h2>
         <div class="flex">
            <div class="flex-col">
               <div class="Home-user_skill">Node.js</div>
            </div>
            <div class="flex-col">
               <div class="Home-user_skill">Webpack</div>
            </div>
            <div class="flex-col">
               <div class="Home-user_skill">JavaScript</div>
            </div>
            <div class="flex-col">
               <div class="Home-user_skill">Vue3</div>
            </div>
            <div class="flex-col">
               <div class="Home-user_skill">Ассемблер</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// import Lang from '@/components/lang/lang.js'\
import { mapGetters } from 'vuex';
import { openDialog } from '@/components/Common/modalView';

export default {
   // eslint-disable-next-line
   name: "Home",
   data() {
      return {
         user: JSON.parse(localStorage.user),
         theme: document.documentElement,
         user_avatar: 'empty_avatar.png'
      }
   },
   methods: {
      clearLocalStorage() {
         this.theme.setAttribute('data-theme', 'light');
         localStorage.clear()
         // Фиксим выход из приложения. Какого-то хуя если уйти на главную через router-link, при следующем заходе сервер шлёт 500 ошибку
         window.location.href = '/'
      },
      loadImageUser() {
         try {
            this.user_avatar = require(`@/components/UserAccount/pages/Home/resources/images/users/${this.user.avatar}`)
         } catch(err) {
            this.user_avatar = require(`@/components/UserAccount/pages/Home/resources/images/users/empty_avatar.png`) 
         }
         if(this.user.user_id === 4) {
            this.user_avatar = require(`@/components/UserAccount/pages/Home/resources/images/users/andrey.jpg`) 
         }
         if(this.user.user_id === 5) {
            this.user_avatar = require(`@/components/UserAccount/pages/Home/resources/images/users/dominic.jpg`) 
         }
      },
      openPro() {
         openDialog({
            template: 'components/UserAccount/pages/Home/templates/proView.vue'
         })
      }
   },
   computed: mapGetters(['getUser']),
   beforeMount() {
      this.loadImageUser();
      // Lang.getTranslate('Home').then((res) => {
      //    this.lang = res.default
      // })
   }
}
</script>

<style lang="less" scoped>
.Home {
   &-avatar {
      overflow: hidden;
      width: 200px;
      height: 200px;
      border-radius: 50%;

      &>img{
         width: 100%;
         max-width: none;
      }
   }

   &-user_name-wrapper {

   }
   
   &-user-emal {
      &>a {
         color: #00c0ff;
      }
   }

   &-user_skill {
      font-size: 20px;
   }

   &-user-label {
      width: fit-content;
      &>span {
         color: rgb(255, 153, 0);
      }
   }
}
</style>