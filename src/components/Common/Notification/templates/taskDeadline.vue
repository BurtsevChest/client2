<template>
   <div @click.stop="toTask" class="taskDeadline flex flex-column p-10">
      <div class="taskDeadline-body flex">
         <div class="empty_flex">
            {{ options.length }} задачи в превышении срока!
         </div>
         <span @click.stop @click="closeNotice()" class="material-icons">close</span>
      </div>
   </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
   // eslint-disable-next-line
   name: "taskDeadline",
   props: {
      options: {
         type: Object
      }
   },
   methods: {
      ...mapMutations(['closeNotice']),
      toTask() {
         this.$router.push('/user_account/tasks')
         this.$emit('closeNotice');
      }
   }
}
</script>

<style lang="less">
   .taskDeadline {
      height: 100%;
   }
</style>