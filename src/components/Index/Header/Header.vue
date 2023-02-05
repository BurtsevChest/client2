<template>
   <div class="Header">
      <div class="Header-body ph-30">
         <div class="container">
            <div class="flex flex-space flex-noGutter">
               <div class="flex-col">
                  <router-link to="/main">
                     <div class="Header-logo">
                        ProjectManager
                     </div>
                  </router-link>
               </div>
               <div class="flex a-items-center flex-col">
                  <a class="pointer Header-signUp" @click="signUp">Войти</a>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';

export default {
   // eslint-disable-next-line
   name: "Header",
   methods: {
      signUp() {
         if(localStorage.token) {
            this.$router.push('/user_account/home')
         }else {
            openDialog({
               template: 'components/Index/Header/templates/Login/Login.vue'
            })
         }
      }
   }
}
</script>


<style lang="less" scoped>
.Header {
   position: fixed;
   top: 0;
   width: 100%;
   background: rgb(255 255 255 / 80%);
   -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);

   &-body {
      
   }

   &-logo {
      font-size: 22px;
      // color: #334155;
      color: black;

      @media (max-width: 400px) {
         font-size: 18px;
      }
   }

   &-signUp {
      font-size: 20px;
      // color: #334155;
      color: black;

      @media (max-width: 400px) {
         font-size: 16px;
      }
   }
}

</style>