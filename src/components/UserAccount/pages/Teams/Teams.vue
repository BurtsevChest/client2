<template>
   <div class="Teams">
      <div class="flex box-shadow pt-12 pv-10">
         <div class="flex flex-col-8">
            <div class="flex-col flex a-items-center">
            <button @click="openAddTeamView" class="Teams-addTask-btn flex flex-center a-items-center">
               <span class="material-icons Teams-addTask-btn-icon">add</span>
            </button>
            </div>
            <div class="flex-col flex flex-nowrap a-items-center">
               <SearchField :placeholder="'Найти...'" @clickSearch="filterToString" @clearSearch="clearFilterText"/>
            </div>
            <div class="empty_flex"></div>
         </div>
      </div>
   </div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';

export default {
   // eslint-disable-next-line
   name: "Teams",
   methods: {
      openAddTeamView() {
         openDialog({
            template: 'components/UserAccount/pages/Teams/templates/addTeamView.vue'
         })
      }
   }
}
</script>


<style lang="less">
.Teams {
   &-addTask-btn {
      color: black;
      cursor: pointer;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.3);
      border-radius: 50%;   

      &-icon {
         font-size: 30px;
      }
   }
}
</style>