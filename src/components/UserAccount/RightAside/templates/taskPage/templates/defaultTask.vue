<template>
   <div class="DefaultTask">
      <TaskItems
         :Tasks = "subTasks"
         @onClickTask="openTask"
         :itemClass="'DefaultTask-subTask'"
      />
   </div>
</template>

<script>
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import Tasks from '@/api/task/index.js';
import { mapGetters } from 'vuex';
import { generateDate } from '@/components/Common/helpers/dateToNumbers';
// import { getSubTasks } from '@/websync/tasks';

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
   data() {
      return {
         subTasks: [],
      }
   },
   computed: mapGetters(['returnSubTasks']),
   methods: {
      openTask(task) {
         this.$emit('openTask', task)
      },
      getSubTaskList() {
         Tasks.getSubTasks(this.task_id).then((res) => {
            this.subTasks = generateDate(res.data)
         })
      }
   },
   beforeMount() {
      this.getSubTaskList()
   }
}
</script>

<style lang="less">
.DefaultTask {
   &-subTask {
      border-radius: 20px;
      background-color: var(--text-block-hover);
   }
}
</style>