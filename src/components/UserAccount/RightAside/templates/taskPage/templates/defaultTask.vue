<template>
   <div class="DefaultTask">
      <div class="DefaultTask-header flex flex-nowrap mb-10">
         <div class="DefaultTask-header-creator flex-shrink-0">
            <userImage :user_id="task.creator_id"/>
         </div>
         <div class="DefaultTask-header-title pl-12">
            <div class="">{{ task.creator_title }}</div>
            <div class=" user_account-h2">{{ task.title }}</div>
         </div>
      </div>
      <div class="DefaultTask-main mb-30">
         <div class="pb-10">Исполнитель</div>
         <div class="flex flex-nowrap">
            <div class="DefaultTask-main-responsible  flex-shrink-0">
               <userImage :user_id="updateTaskParams.responsible_id"/>
            </div>
            <div class="pl-10 empty_flex">
               <div class="pb-6">{{ updateTaskParams.responsible_title }}</div>
               <TextField @inputText="updateDesc" v-if="isEditMode" :value="updateTaskParams.description"/>
               <div v-else class="">{{ updateTaskParams.description }}</div>
            </div>
            <div class="pl-10">
               <PopupBtn :accessShow="isEditMode" :right="'0px'" :hideBtn=true>
                  <template v-slot:popupBtn>
                     <span :class="{ 'error': errorParams.date_of_completion }">{{ showDate(updateTaskParams.date_of_completion) }}</span>
                  </template>
                  <template v-slot:popupTemplate>
                     <div class="box-shadow" style="border-radius: 12px; box-shadow: 0 0 18px rgba(128, 128, 128, 0.5);">
                        <v-date-picker @dayclick="setDate" :locale="locale" mode="date" borderless  :is-dark="true" v-model="updateTaskParams.date_of_completion"/>
                     </div>
                  </template>
               </PopupBtn>
            </div>
         </div>
      </div>
      <div class="pb-20 flex a-items-start">
         <span @click="openPullRequestView" class="flex-shrink-0 pr-16 pointer">Pull request</span>
      </div>
      <div class="flex a-items-center pointer pb-12">
         <span class="material-icons">
            attach_file
         </span>
         <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_attach') }}</p>
      </div>
      <div class="flex-container flex-wrap pb-20">
         <div v-for="file in taskFiles" v-bind:key="file" class="flex-col flex-col-3">
            <div class="ph-8 pv-10 radius-block background-grey pointer">
               {{file}}
            </div>
         </div>
      </div>
      <PopupBtn :accessShow="true" class="pb-20" v-model:show="reglamentDialog" :positionStyle="'DefaultTask-reglament-popup-position'" :hideBtn=true>
         <template v-slot:popupBtn>
            <div class="flex a-items-center pointer fit-content">
               <span class="material-icons">
                  task
               </span>
               <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_subtask') }}</p>
            </div>
         </template>
         <template v-slot:popupTemplate>
            <div class="DefaultTask-reglament-popup ph-8 pv-10 radius-block box-shadow">
               <div v-for="item in taskReglaments" v-bind:key="item.name"  @click="openAddTaskView(item)" class="DefaultTask-reglament-popup-item pointer radius-block ph-6 pv-10">
                  {{ item.name }}
               </div>
            </div>
         </template>
      </PopupBtn>
      <TaskItems
         :Tasks = "subTaskList"
         @onClickTask="openTask"
         :itemClass="'DefaultTask-subTask'"
         :descClass="'standart-text-grey'"
         :titleClass="'DefaultTask-subTask-titleClass'"
         :dateClass="'DefaultTask-subTask-titleClass'"
      />
   </div>
<ModalDialog v-model:dialogStatus="dialogStatus" :title = "'Pull request'">
   <template v-slot:content>
      <addPullRequestVue/>
   </template>
</ModalDialog>
</template>

<script>
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import { mapGetters } from 'vuex';
import { openAddTask } from '@/components/Common/helpers/tasks';
import addPullRequestVue from '@/components/UserAccount/RightAside/templates/taskPage/templates/addPullRequest.vue';
import { dateToNumbers, dayDiff } from '@/components/Common/helpers/dateToNumbers';
import { getLocale } from '@/lang/lang';
import Task from '@/api/task';

export default {
   // eslint-disable-next-line
   name: "DefaultTask",
   components: {
      TaskItems, addPullRequestVue
   },
   props: {
      task_id: {
         type: Number
      },
      task: {
         type: Object
      },
      subTaskList: {
         type: Array
      },
      isEditMode: {
         type: Boolean
      }
   },
   watch: {
      task() {
         this.dialogStatus = false;
         this.updateTaskParams = {
            task_id: this.task.task_id,
            title: this.task.title,
            description: this.task.description,
            creator_id: this.task.creator_id,
            responsible_id: this.task.responsible_id,
            date_of_creation: this.task.date_of_creation,
            date_of_completion: this.task.date_of_completion,
            parent_id: this.task.parent_id,
            status_task_id: this.task.status_task_id,
         };
      },
      isEditMode(newValue) {
         if(!newValue) {
            this.checkUpdateParams();
         }
      }
   },
   data() {
      return {
         reglamentDialog: false,
         taskFiles: [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg',
            'image4.jpg',
            'image5.jpg',
         ],
         dialogStatus: false,
         locale: getLocale(),
         updateTaskParams: {
            task_id: this.task.task_id,
            title: this.task.title,
            description: this.task.description,
            creator_id: this.task.creator_id,
            responsible_id: this.task.responsible_id,
            date_of_creation: this.task.date_of_creation,
            date_of_completion: this.task.date_of_completion,
            parent_id: this.task.parent_id,
            status_task_id: this.task.status_task_id,
         },
         errorParams: {
            date_of_completion: false
         },
         paramsChecked: false
      }
   },
   computed: mapGetters(['taskReglaments']),
   methods: {
      openTask(task) {
         this.$emit('openTask', task)
      },
      openAddTaskView(reglament) {
         this.reglamentDialog = false;
         openAddTask({reglament, parentTask: this.task}, this);
      },
      openPullRequestView() {
         this.dialogStatus = true;
      },
      showDate(date) {
         return dateToNumbers(date);
      },
      setDate() {
         const daysDiff = dayDiff(this.updateTaskParams.date_of_completion, new Date());
         console.log(daysDiff);
         if (daysDiff > 0) {
            this.errorParams.date_of_completion = false;
            this.paramsChecked = true;
         } else {
            this.errorParams.date_of_completion = true;
            this.paramsChecked = false;
         }
         console.log(this.updateTaskParams.date_of_completion);
      },
      updateDesc(newDesc) {
         if(newDesc) {
            this.updateTaskParams.description = newDesc;
         } else {
            this.paramsChecked = false;
         }
      },
      checkUpdateParams() {
         this.paramsChecked = true;
         if(!this.paramsChecked) {
            this.updateTaskParams = {
               task_id: this.task.task_id,
               title: this.task.title,
               description: this.task.description,
               creator_id: this.task.creator_id,
               responsible_id: this.task.responsible_id,
               date_of_creation: this.task.date_of_creation,
               date_of_completion: this.task.date_of_completion,
               parent_id: this.task.parent_id,
               status_task_id: this.task.status_task_id,
         };
            this.errorParams.date_of_completion = false;
         }
         Task.updateTask(this.updateTaskParams);
      },
   }
}
</script>

<style lang="less">
.DefaultTask {
   height: 100%;
   &-header {
      &-creator {
         width: 40px;
         height: 40px;
         overflow: hidden;
         display: flex;
         justify-content: center;
         border-radius: 50%;

         &>img{
            max-width: none;
            height: auto;
         }
      }
   }

   &-main {
      &-responsible {
         width: 40px;
         height: 40px;
         overflow: hidden;
         display: flex;
         justify-content: center;
         border-radius: 50%;

         &>img{
            max-width: none;
            height: auto;
         }
      }
   }

   &-subTask {
      border-radius: 20px;
      background-color: var(--text-block-hover);
      font-size: 14px;

      &-titleClass {
         color: var(--task-title-color);
      }
   }

   &-reglament-popup {
      background-color: var(--background-popup-color);
      color: var(--text-color);
      width: max-content;

      &-position {
         top: 0;
         left: -12px;
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