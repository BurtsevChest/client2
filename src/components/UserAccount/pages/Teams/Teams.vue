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
      <div class="Teams-maincontent p-20">
         <h3 class="user_account-h3 pb-20">Мои команды</h3>
         <div class="Teams-comandlist">
            <div class="ScrollContainer">
               <div class="flex-container">
                  <div v-for="item in commadList" v-bind:key="item" class="flex-col">
                     <teamBlock
                        :team="item"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';
import teamBlock from '@/components/UserAccount/pages/Teams/templates/teamBlock.vue';

export default {
   // eslint-disable-next-line
   name: "Teams",
   components: {teamBlock},
   data() {
      return {
         commadList: [
            {
               name: 'Команда Дизайнеров',
            },
            {
               name: 'Команда Маркетологов',
            },
            {
               name: 'Команда Тестировщиков',
            },
            {
               name: 'Руководство',
            },
            {
               name: 'Персонал',
            },
            {
               name: 'WEB-разработка',
            },
            {
               name: 'Мобильная разработка',
            },
            {
               name: 'Сборка',
            },
            {
               name: 'Системные администраторы',
            }
         ]
      }
   },
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

   &-comandlist {
      height: 100%;
      
   }
}
</style>