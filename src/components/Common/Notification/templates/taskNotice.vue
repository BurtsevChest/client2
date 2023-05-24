<template>
   <div @click.stop="openTask" class="taskNotice flex flex-column p-10">
      <div class="taskNotice-header pb-8 flex">
         <div class="empty_flex">
            <div class="taskNotice-header-user flex">
               <userImage :width="60" :height="60" :user_id="options.creator_id"/>
               <div class="flex flex-column pl-6">
                  <div class="taskNotice-header-user-name">{{ options.creator_title }}</div>
                  <div class="taskNotice-header-user-title">{{ options.title }}</div>
               </div>
            </div>
         </div>
         <span @click.stop @click="closeNotice(options)" class="material-icons">close</span>
      </div>
      <div class="taskNotice-body">
         {{ options.description }}
      </div>
   </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { openTask } from '@/components/Common/helpers/tasks.js';

export default {
   // eslint-disable-next-line
   name: "taskNotice",
   props: {
      options: {
         type: Object
      }
   },
   methods: {
      ...mapMutations(['closeNotice']),
      openTask() {
         openTask(this.options, this),
         this.closeNotice();
      }
   }
}
</script>

<style lang="less">
.taskNotice {
   height: 100%;
   &-header {
      width: 100%;

      &-user {
         &-title {
            font-size: 20px;
         }
      }
   }
}
</style>