<template>
   <div class="boardPage">
      <div class="boardPage-header p-14 flex a-items-center">
         <div @click="back" class="boardPage-header-backlink pointer fit-content">
            <span class="material-icons">
               arrow_back
            </span>
         </div>
         <div @click="openAddColumnView()" class="boardPage-header-add flex flex-center a-items-center pointer ml-12">
            <span class="material-icons boardPage-header-add-icon">
               add
            </span>
         </div>
      </div>
      <div class="boardPage-content p-20 flex flex-nowrap">
         <div v-for="column in columns" v-bind:key="column.name" class="boardPage-column ">
            <div class="boardPage-column-body p-10 radius-block flex flex-nowrap flex-column">
               <div class="boardPage-column-body-title text-center pb-20 flex a-items-center flex-grow-1">
                  <div class="empty_flex">{{ column.name }}</div>
                  <PopupBtn v-model:show="addTaskPopup" :hideBtn="true" :positionStyle="'boardPage-column-addPopup-position'">
                     <template v-slot:popupBtn>
                        <span class="material-icons boardPage-header-add-icon a-self-end pointer">
                           add
                        </span>
                     </template>
                     <template v-slot:popupTemplate>
                        <div class="boardPage-column-addPopup ph-8 pv-10 fit-content radius-block box-shadow">
                           <div class="boardPage-column-addPopup-item pointer radius-block ph-6 pv-10">Новая задача</div>
                           <div @click="addTask" class="boardPage-column-addPopup-item pointer radius-block ph-6 pv-10">Мои задачи</div>
                        </div>
                     </template>
                  </PopupBtn>
               </div>
               <ScrollContainerNew :hideScrollBar="true">
                  <template v-slot:content>
                     <draggable item-key="task_id" :list="column.items" group="tasks" class="boardPage-column-body-drggabble">
                        <template #item="{ element }">
                           <div class="boardPage-column-body-item radius-block pointer">
                              <TaskItem :task="element"  @openTask="openTask" :hideDate="true" :hideStatus="true"/>
                           </div>
                        </template>
                     </draggable>
                  </template>
               </ScrollContainerNew>
            </div>
         </div>
      </div>
   </div>
   <ModalDialog :dialogStatus="dialogStatus" :title = "'Новая колонка'" @onCloseClick="() => {this.dialogStatus=false}">
      <template v-slot:content>
         <addColumnView @addColumn="addColumn"/>
      </template>
   </ModalDialog>
</template>

<script>
import TaskItem from '@/components/UserAccount/Common/TaskItems/templates/taskItem.vue';
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';
// import { getUser } from '@/components/Common/helpers/user';
import {openTask} from '@/websync/tasks';
import addColumnView from '@/components/UserAccount/pages/Boards/templates/addColumnView.vue';
import { openRightAside } from '@/components/UserAccount/RightAside';

export default {
   // eslint-disable-next-line
   name: "boardPage",
   components: {draggable, TaskItem, addColumnView},
   data() {
      return {
         dialogStatus: false,
         boardId: this.$route.params.boardId,
         addTaskPopup: false,
         testTasks: [
            {
               task_id: 1,
               creator_title: 'Джейсон ХренЗавалишь Стетхем',
               title: 'Тестовый таск',
               description: "тестим канбану",
               creator_id: 523,
               responsible_id: '',
               date_of_creation: new Date(),
               date_of_completion: new Date(),
               parent_id: null,
               status_task_id: null
            },
            {
               task_id: 2,
               creator_title: 'Джейсон ХренЗавалишь Стетхем',
               title: 'Тестовый таск',
               description: "тестим канбану",
               creator_id: 523,
               responsible_id: '',
               date_of_creation: new Date(),
               date_of_completion: new Date(),
               parent_id: null,
               status_task_id: null
            },
            {
               task_id: 3,
               creator_title: 'Джейсон ХренЗавалишь Стетхем',
               title: 'Тестовый таск',
               description: "тестим канбану",
               creator_id: 523,
               responsible_id: '',
               date_of_creation: new Date(),
               date_of_completion: new Date(),
               parent_id: null,
               status_task_id: null
            },
            {
               task_id: 4,
               creator_title: 'Джейсон ХренЗавалишь Стетхем',
               title: 'Тестовый таск',
               description: "тестим канбану",
               creator_id: 523,
               responsible_id: '',
               date_of_creation: new Date(),
               date_of_completion: new Date(),
               parent_id: null,
               status_task_id: null
            },
            {
               task_id: 5,
               creator_title: 'Джейсон ХренЗавалишь Стетхем',
               title: 'Тестовый таск',
               description: "тестим канбану",
               creator_id: 523,
               responsible_id: '',
               date_of_creation: new Date(),
               date_of_completion: new Date(),
               parent_id: null,
               status_task_id: null
            }
         ],
         columns: [
            {
               name: 'To Do',
               items: [
                  {
                     task_id: 1,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 2,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 3,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 4,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 5,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  }
               ]
            },
            {
               name: 'Doing',
               items: [
                  {
                     task_id: 1,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 2,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 3,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 4,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 5,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  }
               ]
            },
            {
               name: 'Done',
               items: [
                  {
                     task_id: 1,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 2,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 3,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 4,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  },
                  {
                     task_id: 5,
                     creator_title: 'Джейсон ХренЗавалишь Стетхем',
                     title: 'Тестовый таск',
                     description: "тестим канбану",
                     creator_id: 523,
                     responsible_id: '',
                     date_of_creation: new Date(),
                     date_of_completion: new Date(),
                     parent_id: null,
                     status_task_id: null
                  }
               ]
            }
         ]
      }
   },
   computed: mapGetters(["returnTasks"]),
   methods: {
      back() {
         this.$router.go(-1);
      },
      openTask(task) {
         openTask(task);
      },
      openAddColumnView() {
         this.dialogStatus = true;
      },
      addColumn(name) {
         this.columns.push({
            name,
            items: []
         });
         this.dialogStatus = false;
      },
      addTask() {
         this.addTaskPopup = false;
         openRightAside({
            template: 'components/UserAccount/pages/Boards/templates/addTaskRightAside.vue'
         })
      }
   },
   mounted() {
      console.log(this.columns[0]);
   }
}
</script>

<style lang="less">
.boardPage {
   height: 100vh;
   width: 100%;
   position: relative;

   &-header {
      position: absolute;

      &-add {
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

   &-content {
      height: 100%;
      width: 100%;
      padding-top: 80px !important;;
      padding-bottom: 20px;
   }

   &-column {
      top: 0;
      min-width: 400px;
      padding-right: 12px;
      &:last-child {padding-right: 0;}

      &-body {
         height: 100%;
         background-color: var(--text-block-hover);

         &-title {
            font-size: 20px;
         }

         &-item {
            margin-bottom: 12px;
            background-color: var(--text-block-hover);
            &:last-child {
               margin-bottom: 0;
            }
         }

         &-drggabble {
            height: 100%;
         }
      }

      &-addPopup {
         background-color: var(--background-color);
         color: var(--text-color);
         width: max-content;
         font-size: 15px;
         text-align: start;

         &-position {
            top: 0;
            right: 0;
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
}
</style>