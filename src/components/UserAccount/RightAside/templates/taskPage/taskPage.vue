<template>
<div class="Task flex flex-column empty_flex">
   <h2 class="user_account-h2 pb-16">
      {{ options.task.title }}
      {{ options.task.task_id }}
   </h2>
   <p class="pb-32">
      {{ options.task.description }}
   </p>
   <div class="flex">
      <div class="flex-col">
         <div @click="openAddTaskView(options.task.task_id)" class="flex a-items-center pointer">
            <span class="material-icons">
               task
            </span>
            <p class="pl-4 Task-tabs">Подзадача</p>
         </div>
      </div>
      <div class="flex-col">
         <PopupBtn :positionStyle="'Task-addFilePopup'" :hideBtn=true>
            <template v-slot:popupBtn>
               <div class="flex a-items-center">
                  <span class="material-icons">attach_file</span>
                  <div class="Task-addFileBtn Task-tabs">Прикрепить</div>
               </div>
            </template>
            <template v-slot:popupTemplate>
               <div class="">
                  <div class="Task-addFilePopup-item ph-10 pv-16 pointer radius-block">
                     С устройства
                  </div>
               </div>
            </template>
         </PopupBtn>
      </div>
      <div class="flex-col">
         <div @click="openChat" class="flex a-items-center pointer">
            <span class="material-icons">chat</span>
            <p class="pl-4 Task-tabs">{{ chatStatus.tabText }}</p>
         </div>
      </div>
   </div>
   <keep-alive>
      <component 
         :is="tabTamplate" 
         :task_id = "this.options.task.task_id"
         @openTask="openTask"/>
   </keep-alive>
</div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';
import { openRightAside } from '@/components/UserAccount/RightAside/index';
import DefaultTask from '@/components/UserAccount/RightAside/templates/taskPage/templates/defaultTask.vue';
import TaskChat from '@/components/UserAccount/RightAside/templates/taskPage/templates/taskChat.vue';

export default {
   // eslint-disable-next-line
   name: "",
   props: {
      options: {
         type: Object
      }
   },
   data() {
      return {
         configAddFile: {},
         tabTamplate: DefaultTask,
         tabChatText: 'Обсудить',
         chatStatus: {
            open: false,
            tabText: 'Обсудить'
         }
      }
   },
   methods: {
      openAddTaskView(task_id) {
         openDialog({
            template: 'components/Common/modalView/templates/AddTaskView.vue',
            options: {
               task_id
            }
         })
      },
      openTask(task) {
         openRightAside({
            template: 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue',
            options: {
               task
            }
         })
      },
      loadBuffer() {
         console.log(navigator.clipboard.read);
      },
      openChat() {
         if(this.chatStatus.open) {
            this.tabTamplate = DefaultTask
            this.chatStatus.open = false;
            this.chatStatus.tabText = 'Обсудить';
         } else {
            this.tabTamplate = TaskChat
            this.chatStatus.open = true;
            this.chatStatus.tabText = 'Закрыть';
         }
      }
   }
}
</script>

<style lang="less">
.Task {
   &-tabs {
      &:hover {
         text-decoration: underline;
      }
   }

   &-addFilePopup {
      top: 0;
      right: 0;

      &-item {
         &:hover {
            box-shadow: 0 0 12px rgba(128, 128, 128, 0.5);
         }
      }
   }
}
</style>