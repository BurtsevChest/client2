<template>
   <div class="addTaskRightAside pt-60">
      <draggable item-key="task_id" :list="testTasks" group="tasks" class="boardPage-column-body-drggabble">
         <template #item="{ element }">
            <div class="boardPage-column-body-item radius-block pointer">
               <TaskItem :task="element" :hideDate="true" :hideStatus="true"/>
            </div>
         </template>
      </draggable>
   </div>
</template>

<script>
import TaskItem from '@/components/UserAccount/Common/TaskItems/templates/taskItem.vue';
// import { getUser } from '@/components/Common/helpers/user';
import draggable from 'vuedraggable';
import { closeRightAside } from '@/components/UserAccount/RightAside';

export default {
   // eslint-disable-next-line
   name: "addTaskRightAside",
   components: {TaskItem, draggable},
   data() {
      return {
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
         ]
      }
   },
   methods: {
      close() {
         closeRightAside()
      }
   }
}
</script>

<style lang="less">
.addTaskRightAside {
height: 100%;
}
</style>