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
      <div class="flex-col relative">
         <div class="flex a-items-center pointer" @click="openAddFile">
            <span class="material-icons">attach_file</span>
            <p class="pl-4 Task-tabs">Прикрепить</p>
         </div>
         <SuperPopup
            v-model:show="showAddFile"
            :config="configAddFile"
            :positionStyle="'Task-addFileView'">
            <div v-if="showAddFile" class="flex Task-addFiles-wrapper">
               <div class="flex-col flex-col-12">
                  <label for="addFiles" class="flex a-items-center">
                     <span class="material-icons">desktop_windows</span>
                     <p class="pl-4">
                        С устройства
                     </p>
                  </label>
                  <input type="file" class="image" name="" id="addFiles" multiple style="display: none;">
               </div>
               <div class="flex-col flex-col-12">
                  <label @click="loadBuffer" class="flex a-items-center">
                     <span class="material-icons">upload_file</span>
                     <p class="pl-4">
                        Из буфера обмена
                     </p>
                  </label>
               </div>
            </div>
         </SuperPopup>
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
         showAddFile: false,
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
      openAddFile(e) {
         this.showAddFile = true
         this.configAddFile = e
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

   &-addFiles-wrapper {
      width: 200px;
   }

   &-addFileView {
      position: absolute;
      top: 30px;
      right: -130%;
   }
}
</style>