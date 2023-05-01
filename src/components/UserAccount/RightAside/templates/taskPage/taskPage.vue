<template>
<div class="Task flex flex-column empty_flex">
      <div class="flex flex-space pb-10">
        <div @click="OpenTask(parentTask)" class="pointer Task-parentTask standart-text-grey flex a-items-center">
          <p class="Task-parentTask-text">
            {{ parentTask.title }}
          </p>
        </div>
        <div class="empty_flex"></div>
        <div v-if="isResponsible" class="flex a-items-center">
         <PopupBtn :positionStyle="''" :hideBtn=true>
            <template v-slot:popupBtn>
               <p>Статус таска</p>
            </template>
            <template v-slot:popupTemplate>
               <div class="Task-reglament-popup ph-8 pv-10radius-block box-shadow">
                  <div class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">выполнить</div>
                  <div class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">уточнить</div>
                  <div class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">переназначить</div>
               </div>
            </template>
         </PopupBtn>
        </div>
        <div class="flex a-items-center pl-12">
         <span class="material-icons pointer">edit</span>
        </div>
        <div class="flex a-items-center pl-12">
         <span v-if="!chatStatus.open" @click="openChat" class="material-icons pointer">chat</span>
         <span v-else @click="openChat" class="material-icons pointer">close</span>
        </div>
        <button class="Task-closeBtn ml-16" @click="close">
          <span class="material-icons flex flex-center a-items-center">close</span>
        </button>
      </div>
      <!-- <h2 class="user_account-h2 pb-16 pointer">{{ options.task.title }}</h2>
      <div class="Task-responsible">
        <p class="standart-text-grey">Исполнитель</p>
      </div>
      <p class="pb-32">{{ options.task.description }}</p> -->
      <!-- <div class="flex">
         <PopupBtn v-model:show="reglamentDialog" :positionStyle="'Task-reglament-popup-position'" :hideBtn=true>
            <template v-slot:popupBtn>
               <div class="flex-col">
                  <div class="flex a-items-center pointer">
                     <span class="material-icons">
                        task
                     </span>
                     <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_subtask') }}</p>
                  </div>
               </div>
            </template>
            <template v-slot:popupTemplate>
               <div class="Task-reglament-popup ph-8 pv-10radius-block box-shadow">
                  <div v-for="item in taskReglaments" v-bind:key="item.name"  @click="openAddTaskView(item)" class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">
                     {{ item.name }}
                  </div>
               </div>
            </template>
         </PopupBtn>
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
      </div> -->
      <component
          :is="tabTamplate"
          :task="options.task"
          :task_id = "options.task.task_id"
          @openTask="OpenTask"
      />
    </div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';
import DefaultTask from '@/components/UserAccount/RightAside/templates/taskPage/templates/defaultTask.vue';
import TaskChat from '@/components/UserAccount/RightAside/templates/taskPage/templates/taskChat.vue';
import { openTask, closeTask, updateTask } from '@/websync/tasks';
import { mapGetters } from 'vuex';
import { getUser } from '@/components/Common/helpers/user';

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
            tabText: this.$i18n.t('user_account_tasks_opentask_discuss')
         },
         isCreator: false,
         isResponsible: false,
         updateTaskParams: {
            title: this.options.task.title,
            description: this.options.task.description
         },
         task: JSON.parse(JSON.stringify(this.options.task)),
         reglamentDialog: false
      }
   },
   methods: {
      openAddTaskView(reglament) {
         this.reglamentDialog = false;
         openDialog({
            template: 'components/Common/modalView/templates/AddTaskView.vue',
            options: {
               reglament,
               task_id: this.options.task.task_id
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
            this.chatStatus.tabText = this.$i18n.t('user_account_tasks_opentask_discuss');
         } else {
            this.tabTamplate = TaskChat
            this.chatStatus.open = true;
            this.chatStatus.tabText = this.$i18n.t('user_account_tasks_opentask_close');
         }
      },
      updateTask() {
         if(this.updateTaskParams.title != this.task.title || this.updateTaskParams.description != this.task.description) {
            this.task.title = this.updateTaskParams.title;
            this.task.description = this.updateTaskParams.description;
            updateTask(this.task)
         }
      }
   },
   computed: mapGetters(['parentTask','taskReglaments']),
   beforeMount() {
      if(this.options.task.creator_id === getUser().user_id) {
         this.isCreator = true
      }
      if(this.options.task.responsible_id === getUser().user_id) {
         this.isResponsible = true
      }
   },
   beforeUnmount() {
      this.updateTaskParams = ''
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

   &-parentTask {
      font-size: 14px;
      
      &:hover {
         text-decoration: underline;
      }

      &-text {
         max-width: 140px;
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
      }
   }

   &-edit {
      transition: 0.3s;
      &:hover {
         background-color: var(--text-block-hover);
      }
   }

   &-reglament-popup {
      background-color: var(--background-color);
      color: var(--text-color);
      width: max-content;

      &-position {
         top: 0;
         left: -18px;
      }

      &-item {
         margin-bottom: 8px;
         &:last-child {
            margin-bottom: 0;
         }
         &:hover {
            transition: 0.2s;
            background-color: var(--text-block-hover);
         }
      }
   }
}
</style>