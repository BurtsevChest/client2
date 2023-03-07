<template>
<div class="Task flex flex-column empty_flex">
   <button class="Task-closeBtn a-self-end" @click="close">
      <span class="material-icons flex flex-center a-items-center">close</span>
   </button>
   <h2 class="user_account-h2 pb-16">
      {{ options.task.title }}
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
            <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_subtask') }}</p>
         </div>
      </div>
      <div class="flex-col">
         <div class="flex a-items-center pointer">
            <span class="material-icons">attach_file</span>
            <div class="Task-addFileBtn Task-tabs">{{ $t('user_account_tasks_opentask_attach') }}</div>
         </div>
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
         @openTask="OpenTask"/>
   </keep-alive>
</div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';
import DefaultTask from '@/components/UserAccount/RightAside/templates/taskPage/templates/defaultTask.vue';
import TaskChat from '@/components/UserAccount/RightAside/templates/taskPage/templates/taskChat.vue';
import { openTask, closeTask } from '@/websync/tasks';
import { tr } from '@/lang/lang';

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
         chatStatus: {
            open: false,
            tabText: tr('user_account_tasks_opentask_discuss')
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
      OpenTask(task) {
         openTask(task)
      },
      close() {
         closeTask()
      },
      loadBuffer() {
         console.log(navigator.clipboard.read);
      },
      openChat() {
         if(this.chatStatus.open) {
            this.tabTamplate = DefaultTask
            this.chatStatus.open = false;
            this.chatStatus.tabText = tr('user_account_tasks_opentask_discuss');
         } else {
            this.tabTamplate = TaskChat
            this.chatStatus.open = true;
            this.chatStatus.tabText = tr('user_account_tasks_opentask_close');
         }
      },
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

   &-closeBtn {
      display: block;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.2);
      border-radius: 50%;
   }
}
</style>