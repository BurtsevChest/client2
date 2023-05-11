<template>
<div class="Task flex flex-column empty_flex">
      <div class="flex flex-space pb-10 pr-58 pt-16">
        <div @click="OpenTask(parentTask)" class="pointer Task-parentTask standart-text-grey flex a-items-center">
          <p class="Task-parentTask-text">
            {{ parentTask.title }}  {{ parentTask.description }}
          </p>
        </div>
        <div class="empty_flex"></div>
        <div v-if="isResponsible" class="flex a-items-center">
         <PopupBtn :accessShow="true" :hideBtn=true>
            <template v-slot:popupBtn>
               <p>Статус таска</p>
            </template>
            <template v-slot:popupTemplate>
               <div class="Task-reglament-popup ph-8 pv-10 radius-block box-shadow">
                  <div class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">выполнить</div>
                  <div class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">уточнить</div>
                  <div class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">переназначить</div>
               </div>
            </template>
         </PopupBtn>
        </div>
        <div v-if="isResponsible || isCreator" class="flex a-items-center pl-12">
         <span v-if="isEditMode" @click="edit" class="material-icons pointer">check</span>
         <span v-else @click="edit" class="material-icons pointer">edit</span>
        </div>
        <div class="flex a-items-center pl-12">
         <span v-if="!chatStatus.open" @click="openChat" class="material-icons pointer">chat</span>
         <span v-else @click="openChat" class="material-icons pointer">close</span>
        </div>
      </div>
      <component
         :is="tabTamplate"
         :task="task"
         :subTaskList="subTaskList"
         :task_id = "options.task.task_id"
         @openTask="OpenTask"
         :isEditMode="isEditMode"
      />
    </div>
</template>

<script>
import DefaultTask from '@/components/UserAccount/RightAside/templates/taskPage/templates/defaultTask.vue';
import TaskChat from '@/components/UserAccount/RightAside/templates/taskPage/templates/taskChat.vue';
import { openTask } from '@/websync/tasks';
import { mapGetters } from 'vuex';
import { getUser } from '@/components/Common/helpers/user';
import Task from '@/api/task';
import mainSocket from "@/vue_socket/mainSocket";

export default {
   // eslint-disable-next-line
   name: "",
   props: {
      options: {
         type: Object
      }
   },
   watch: {
      options(newValue) {
         this.task = newValue.task;
         this.allToLoadTask();
         this.tabTamplate = DefaultTask
         this.chatStatus.open = false;
      }
   },
   data() {
      return {
         configAddFile: {},
         tabTamplate: DefaultTask,
         chatStatus: {
            open: false
         },
         isCreator: false,
         isResponsible: false,
         task: {...this.options.task},
         parentTask: {},
         subTaskList: [],
         user_id: getUser().user_id,
         isEditMode: false
      }
   },
   methods: {
      edit() {
         this.isEditMode = !this.isEditMode;
      },
      OpenTask(task) {
         openTask(task, null)
      },
      loadBuffer() {
         console.log(navigator.clipboard.read);
      },
      openChat() {
         if(this.chatStatus.open) {
            this.tabTamplate = DefaultTask
            this.chatStatus.open = false;
         } else {
            this.tabTamplate = TaskChat
            this.chatStatus.open = true;
         }
      },
      allToLoadTask() {
         // Дабы не валить в консоль ошибки, что нет таска
         if(this.task.parent_id) {
            Task.getOneTask(this.task.parent_id).then((res) => {
               this.parentTask = res.data;
            }).catch(()=> {
               this.parentTask = [];
            })
         } else {
            this.parentTask = [];
         }
         Task.getSubTasks(this.task.task_id).then((res) => {
            this.subTaskList = res.data;
         }).catch(() => {
            this.subTaskList = [];
         })
      }
   },
   computed: mapGetters(['taskReglaments']),
   beforeMount() {
      if(this.task.creator_id === this.user_id) this.isCreator = true;
      if(this.task.responsible_id === this.user_id) this.isResponsible = true;
   },
   mounted() {
      this.allToLoadTask();
      mainSocket.on('SET_TASK', data => {
         if(this.task.task_id === data.task.parent_id) {
            this.subTaskList.push(data.task);
         } else if (this.task.task_id === data.task.task_id) {
            this.task = data.task;
         }
      })
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