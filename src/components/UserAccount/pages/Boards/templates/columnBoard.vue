<template>
   <div class="columnBoard flex flex-column radius-block">
      <div class="columnBoard-head pv-12 pt-12 pb-10 flex flex-space a-items-center">
         <div class="flex a-items-center">
            {{ column.name }}
         </div>
         <div class="flex a-items-center pointer">
            <span class="material-icons">
               edit
            </span>
         </div>
      </div>
      <div class="columnBoard-body pv-12 pb-12 empty_flex">
         <ScrollContainer :hideScrollBar="true">
            <template v-slot:content>
               <draggable item-key="task_id" :list="column.items" group="tasks">
                  <template #item="{ element }">
                     <TaskItem :task="element"  :hideDate="true" :hideStatus="true"/>
                  </template>
               </draggable>
            </template>
         </ScrollContainer>
      </div>
   </div>
</template>

<script>
import draggable from 'vuedraggable';
import TaskItem from '@/components/UserAccount/Common/TaskItems/templates/taskItem.vue';

export default {
   // eslint-disable-next-line
   name: "columnBoard",
   components: {draggable, TaskItem},
   props: {
      column: {
         type: Object
      }
   }
}
</script>

<style lang="less">
.columnBoard {
   height: 100%;
   color: var(--text-color);
   width: 400px;
   background-color: var(--text-block-hover);
}
</style>