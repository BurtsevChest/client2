<template>
   <div class="BusnessProccess flex flex-column">
      <div class="BusnessProccess-header flex ph-12">
         <div class="BusnessProccess-header-addBtn flex pointer a-aitems-center flex-center p-6 ml-12">
            <span class="material-icons">add</span>
         </div>
      </div>
      <div class="BusnessProccess-content empty_flex">
         <div class="flex-container height-100">
            <div class="flex-col height-100 flex-col-9">
               <div class="BusnessProccess-content-reglamentList p-20 height-100">
                  <ScrollContainer :hideScrollBar="true">
                     <template v-slot:content>
                        <router-link v-for="reglament in taskReglaments" v-bind:key="reglament.name" :to="`/user_account/business_proccess/${reglament.name}`" class="BusnessProccess-content-reglamentList-item block radius-block pointer mb-12 box-shadow-hover ph-10 pv-12">
                           {{ reglament.name }}
                        </router-link>
                     </template>
                  </ScrollContainer>
               </div>
            </div>
            <div class="flex-col height-100 flex-col-3">

            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
   // eslint-disable-next-line
   name: "BusnessProccess",
   computed: mapGetters(['taskReglaments'])
}
</script>

<style lang="less">
.BusnessProccess {
   height: 100%;
   &-header {
      background-color: var(--background-color);

      &-addBtn {
         border-radius: 50%;
         background-color: var(--text-block-hover);

         &>span {
            font-size: 30px;
         }
      }
   }

   &-content {
      &-reglamentList {
         height: 100%;

         &-item {
            background-color: var(--text-block-hover);
            color: var(--text-color);
         }
      }
   }
}
</style>