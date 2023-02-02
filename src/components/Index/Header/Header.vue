<template>
   <div class="Header">
      <div class="Header-body ph-30">
         <div class="container">
            <div class="flex flex-space flex-noGutter">
               <div class="flex-col">
                  <div class="Header-logo">
                     ProjectManager
                  </div>
               </div>
               <div class="flex a-items-center flex-col">
                  <a class="pointer Header-signUp" @click="openLoginView">Войти</a>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
   // eslint-disable-next-line
   name: "Header",
   methods: {
      ...mapMutations(['openLoginView'])
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