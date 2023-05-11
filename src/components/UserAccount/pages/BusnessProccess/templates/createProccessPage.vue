<template>
   <div class="createProccessPage">
      <div class="createProccessPage-content height-100 flex flex-column">
         <h1 class="user_account-h1 pb-40 pt-20 pl-20 pr-20">{{ $route.params.proccessId }}</h1>
         <div class="empty_flex">
            <ScrollContainerNew :hideScrollBar="true">
               <template v-slot:content>
                  <div class="pl-20 pr-20">
                     <phaseVue/>
                  </div>
               </template>
            </ScrollContainerNew>
         </div>
      </div>
   </div>
</template>

<script>
import phaseVue from '@/components/UserAccount/pages/BusnessProccess/templates/phase.vue';

export default {
   // eslint-disable-next-line
   name: "createProccessPage",
   components: {phaseVue}
}
</script>

<style lang="less">
.createProccessPage {
   height: 100%;
}
</style>