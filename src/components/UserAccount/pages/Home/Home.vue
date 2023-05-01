<template>
   <div class="Home p-20">
      <div class="flex pb-32">
         <div class="flex-col">
            <div class="Home-avatar flex">
               <img ref="userAvatar" :src="userPhotoBaseUrl">
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
                  {{ $t('user_account_home_signOut') }}
               </div>
            </div>
         </div>
      </div>
      <div class="">
         <h2 class="user_account-h2 pb-20">{{ $t('user_account_home_skills') }}</h2>
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
import { openDialog } from '@/components/Common/modalView';
import { downloadImageUser } from '@/components/Common/helpers/imageLoader';
import { api_domain, protocol } from '@/components/Common/helpers/host';
import { getUser } from '@/components/Common/helpers/user';
import user from '@/api/user';

export default {
   // eslint-disable-next-line
   name: "Home",
   data() {
      return {
         user: getUser(),
         userPhotoBaseUrl: `${protocol}${api_domain}/apiV0/photo/${getUser().user_id}`
      }
   },
   methods: {
      clearLocalStorage() {
         localStorage.removeItem('accessToken');
         localStorage.removeItem('user');
         user.logout();
         window.location.href = '/';
      },
      openPro() {
         openDialog({
            template: 'components/UserAccount/pages/Home/templates/proView.vue'
         })
      }
   },
   mounted() {
      downloadImageUser.call(this, 'userAvatar');
   }
}
</script>

<style lang="less" scoped>
.Home {
   background-color: var(--background-color-wrapper);
   color: var(--text-color);
   height: 100vh;
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