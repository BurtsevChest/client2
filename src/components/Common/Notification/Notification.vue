<template>
   <div class="Notification" :class="{ 'active' : showNotificate }">
      <div class="Notification-body pointer radius-block" >
         <component @closeNotice="closeNotice" :options="noticeData" :is="noticeTemplate"/>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Task from '@/api/task';
import { getUser } from '@/components/Common/helpers/user';
import { dayDiff } from '@/components/Common/helpers/dateToNumbers';

export default {
   // eslint-disable-next-line
   name: "Notification",
   computed: mapGetters(['showNotificate', 'noticeTemplate', 'noticeData']),
   methods: {
      ...mapMutations(['showNotice', 'closeNotice'])
   },
   mounted() {
      if(localStorage.accessToken) {
         const user_id = getUser().user_id;
         Task.getTasks(user_id).then((res) => {
            const userTasks = res.data.filter((item) => {
               const daysDiff = dayDiff(new Date(), item.date_of_completion);
               if(item.responsible_id === user_id && (daysDiff > -1)) {
                  return true;
               }
            });
            if(userTasks.length > 0) {
               this.showNotice({
                  data: userTasks,
                  event: 'task_deadline'
               });
            }
      })
      }
   }
}
</script>

<style lang="less">
.Notification {
   position: fixed;
   right: 30px;
   bottom: -100%;
   z-index: 101;
   transition: 0.3s;

   &.active {
      right: 30px;
      bottom: 30px;
   }

   &-body {
      background-color: rgb(43, 43, 43);
      color: var(--text-color);
      width: 400px;
      transition: 0.3s;

      &:hover {
         box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);
      }
   }
}
</style>