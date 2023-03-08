<template>
   <div class="DefaultTask">
      <TaskItems
         :Tasks = "returnSubTasks"
         @onClickTask="openTask"
         :itemClass="'DefaultTask-subTask'"
         :descClass="'standart-text-grey'"
         :titleClass="'DefaultTask-subTask-titleClass'"
         :dateClass="'DefaultTask-subTask-titleClass'"
      />
   </div>
</template>

<script>
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import { mapGetters } from 'vuex';

export default {
   // eslint-disable-next-line
   name: "DefaultTask",
   components: {
      TaskItems
   },
   props: {
      task_id: {
         type: Number
      }
   },
   computed: mapGetters(['returnSubTasks']),
   methods: {
      openTask(task) {
         this.$emit('openTask', task)
      }
   }
}
</script>

<style lang="less">
.DefaultTask {
   &-subTask {
      border-radius: 20px;
      background-color: var(--text-block-hover);

      &-titleClass {
         color: var(--task-title-color);
      }
   }
}
</style>