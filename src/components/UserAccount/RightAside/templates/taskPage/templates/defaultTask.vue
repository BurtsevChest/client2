<template>
   <div class="DefaultTask">
      <div class="DefaultTask-header flex flex-nowrap mb-10">
         <div class="DefaultTask-header-creator flex-shrink-0">
            <img class="DefaultTask-header-creator-image" ref="creatorAvatar" :src="creatorAvatar">
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
               <img ref="responsibleAvatar" :src="responsibleAvatar">
            </div>
            <div class="pl-10">
               <div class="pb-6">{{ task.creator_title }}</div>
               <div class="">{{ task.description }}</div>
            </div>
         </div>
      </div>
      <div class="flex  pb-12">
         <PopupBtn v-model:show="reglamentDialog" :positionStyle="'Task-reglament-popup-position'" :hideBtn=true>
            <template v-slot:popupBtn>
               <div class="flex a-items-center pointer fit-content">
                  <span class="material-icons">
                     task
                  </span>
                  <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_subtask') }}</p>
               </div>
            </template>
            <template v-slot:popupTemplate>
               <div class="Task-reglament-popup ph-8 pv-10 fit-content radius-block box-shadow">
                  <div v-for="item in taskReglaments" v-bind:key="item.name"  @click="openAddTaskView(item)" class="Task-reglament-popup-item pointer radius-block ph-6 pv-10">
                     {{ item.name }}
                  </div>
               </div>
            </template>
         </PopupBtn>
         <div v-if="!taskFiles" class="flex a-items-center pointer fit-content pl-12">
            <span class="material-icons">
               attach_file
            </span>
            <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_attach') }}</p>
         </div>
      </div>
      <div v-if="returnSubTasks">
         <TaskItems
            :Tasks = "returnSubTasks"
            @onClickTask="openTask"
            :itemClass="'DefaultTask-subTask'"
            :descClass="'standart-text-grey'"
            :titleClass="'DefaultTask-subTask-titleClass'"
            :dateClass="'DefaultTask-subTask-titleClass'"
         />
      </div>
      <div v-if="taskFiles">
         <div class="flex a-items-center pointer fit-content pb-12">
            <span class="material-icons">
               attach_file
            </span>
            <p class="pl-4 Task-tabs">{{ $t('user_account_tasks_opentask_attach') }}</p>
         </div>
         <div class="flex-container flex-wrap">
            <div v-for="file in taskFiles" v-bind:key="file" class="flex-col flex-col-3">
               <div class="ph-8 pv-10 radius-block background-grey pointer">
                  {{file}}
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import { mapGetters } from 'vuex';
import { downloadImageUser } from '@/components/Common/helpers/imageLoader';
import { api_domain, protocol } from '@/components/Common/helpers/host';
import { openDialog } from '@/components/Common/modalView';

export default {
   // eslint-disable-next-line
   name: "DefaultTask",
   components: {
      TaskItems
   },
   props: {
      task_id: {
         type: Number
      },
      task: {
         type: Object
      }
   },
   data() {
      return {
         creatorAvatar: `${protocol}${api_domain}/apiV0/photo/${this.task.creator_id}`,
         responsibleAvatar: `${protocol}${api_domain}/apiV0/photo/${this.task.responsible_id}`,
         reglamentDialog: false,
         taskFiles: [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg',
            'image4.jpg',
            'image5.jpg',
         ]
      }
   },
   computed: mapGetters(['returnSubTasks','taskReglaments']),
   methods: {
      openTask(task) {
         this.$emit('openTask', task)
      },
      openAddTaskView(reglament) {
         this.reglamentDialog = false;
         openDialog({
            template: 'components/Common/modalView/templates/AddTaskView.vue',
            options: {
               reglament,
               task_id: this.task_id
            }
         })
      },
   },
   mounted() {
      downloadImageUser.call(this, 'creatorAvatar');
      downloadImageUser.call(this, 'responsibleAvatar');
   }
}
</script>

<style lang="less">
.DefaultTask {
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