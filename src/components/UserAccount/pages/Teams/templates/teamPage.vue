<template>
<div class="teamPage p-20">
   <div class="flex a-items-center mb-40">
      <router-link class="teamPage-linkBack fit-content flex a-items-center" to='/user_account/teams'>
         <span class="material-icons">home</span>
         <span class="pl-10">К командам</span>
      </router-link>
      <div class="pl-20">
         <h2 class="user_account-h2">
            {{ teamName }}
         </h2>
      </div>
   </div>
   <div class="flex" style="height: 92%;">
      <div class="flex-col flex-col-8">
         <component :is="openedTemplate"/>
      </div>
      <div class="flex-col flex-col-2">
         <div class="teamPage-filtres radius-block box-shadow">
            <div class="flex flex-wrap pt-10">
               <div v-for="item in filterItems" v-bind:key="item" class="flex-col flex-col-12">
                  <div @click="onClicklTab(item.nameTemplate, item.template)" v-if="activeTemplate === item.nameTemplate" class="radius-block teamPage-filtres-item active box-shadow ph-6 pv-10 pointer">
                     {{ item.name }}
                  </div>
                  <div @click="onClicklTab(item.nameTemplate, item.template)" v-else class="radius-block teamPage-filtres-item ph-6 pv-10 pointer">
                     {{ item.name }}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import Chat from '@/components/UserAccount/Common/chat/Chat.vue';
import TeamChat from '@/components/UserAccount/pages/Teams/templates/teamPageTemplates/TeamChat/TeamChat.vue';
import TeamFiles from '@/components/UserAccount/pages/Teams/templates/teamPageTemplates/TeamFiles/TeamFiles.vue';
import TeamBoards from '@/components/UserAccount/pages/Teams/templates/teamPageTemplates/TeamBoards/TeamBoards.vue';
import TeamTasks from '@/components/UserAccount/pages/Teams/templates/teamPageTemplates/TeamTasks/TeamTasks.vue';
import { openRightAside } from '@/components/UserAccount/RightAside';

export default {
   // eslint-disable-next-line
   name: "teamPage",
   components: {Chat},
   data() {
      return {
         teamName: this.$route.params.teamId,
         openedTemplate: TeamChat,
         activeTemplate: 'TeamChat',
         filterItems: [
            {
               name: 'Чат',
               nameTemplate: 'TeamChat',
               template: TeamChat
            },
            {
               name: 'Файлы',
               nameTemplate: 'TeamFiles',
               template: TeamFiles
            },
            {
               name: 'Доски',
               nameTemplate: 'TeamBoards',
               template: TeamBoards
            },
            {
               name: 'Задачи',
               nameTemplate: 'TeamTasks',
               template: TeamTasks
            },
            {
               name: 'Участники',
               nameTemplate: 'TeamPeoples'
            }
         ]
      }
   },
   methods: {
      onClicklTab(nameTemplate, template) {
         if(nameTemplate === 'TeamPeoples') {
            openRightAside({
               template: 'components/UserAccount/pages/Teams/templates/teamPageTemplates/TeamPeoples/TeamPeoples.vue'
            })
            return;
         }
         this.activeTemplate = nameTemplate;
         this.openedTemplate = template;
      }
   }
}
</script>

<style lang="less">
   .teamPage {
      background-color: var(--background-color-wrapper);
      color: var(--text-color);
      height: 100%;
      &-linkBack {
         color: var(--text-color);
      }

      &-filtres {
         background-color: var(--background-color);
         color: var(--text-color);

         &-item {
            &:hover {
               background-color: var(--text-block-hover);
            }

            &.active {
               background-color: var(--text-block-hover);
            }
         }
      }
   }
</style>