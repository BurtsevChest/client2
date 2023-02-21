<template>
   <div class="Home">
      <div class="flex pb-32">
         <div class="flex-col">
            <div class="Home-avatar flex">
               <img :src="require(`@/components/UserAccount/pages/Home/resources/images/users/${user.avatar}`)" alt="">
            </div>
         </div>
         <div class="flex-col flex-col-4">
            <div class="Home-user_name-wrapper pt-20">
               <h1 class="user_account-h1 pb-8">{{ user.name }} {{ user.last_name }}</h1>
               <p class="Home-user-emal pointer pb-16">
                  <a href="mailto:{{ user.email }}">
                     {{ user.email }}
                  </a>
               </p>
               <div @click="clearLocalStorage">
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

export default {
   // eslint-disable-next-line
   name: "Home",
   data() {
      return {
         user: JSON.parse(localStorage.user),
         theme: document.documentElement
      }
   },
   methods: {
      clearLocalStorage() {
         this.theme.setAttribute('data-theme', 'light');
         localStorage.clear()
         // Фиксим выход из приложения. Какого-то хуя если уйти на главную через router-link, при следующем заходе сервер шлёт 500 ошибку
         window.location.href = '/'
      }
   },
   computed: mapGetters(['getUser']),
   beforeMount() {
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
         width: 150%;
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
}
</style>