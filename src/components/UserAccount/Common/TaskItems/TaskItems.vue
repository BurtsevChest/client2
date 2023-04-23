<template>
   <ScrollContainerNew :hideScrollBar="true">
      <template v-slot:content>
         <TaskItem
            v-for="item in tasks"
            :task="item"
            v-bind:key="item.task_id"
            @openTask="openTask"
            :itemClass="itemClass"
            :descClass="descClass"
            :titleClass="titleClass"
            :dateClass="dateClass"
         />
      </template>
   </ScrollContainerNew>
</template>
<script>
import TaskItem from '@/components/UserAccount/Common/TaskItems/templates/taskItem.vue';

export default {
   // eslint-disable-next-line
   name: "TaskItems",
   components: {TaskItem},
   props: {
      Tasks: {
         type: Array
      },
      itemClass: {
         type: String
      },
      titleClass: {
         type: String
      },
      descClass: {
         type: String
      },
      dateClass: {
         type: String
      }
   },
   watch: {
      Tasks() {
         this.tasks = this.Tasks
      }
   },
   data() {
      return {
         activeTask: '',
         tasks: []
      }
   },
   methods: {
      openTask(task) {
         this.activeTask = task,
         this.$emit('onClickTask', task)
      },
   },
   beforeMount() {
      this.tasks = this.Tasks
   }
}
</script>

<style lang="less">
</style>
