<template>
   <div @click="openTask(task)" :class="[itemClass] " class="TaskItem pointer flex flex-space ph-10 pv-16 mb-8">
      <div class="flex">
         <div class="TaskItem-image">
            <img ref="userAvatar" :src="userAvatar">
         </div>
         <div class="pl-16">
            <span class="TaskItem-title" :class="[titleClass]">{{ task.creator_title }}</span>
            <p class="TaskItem-desc pl-10" :class="[descClass]">{{ task.title }}</p>
         </div>
      </div>
      <div class="empty_flex"></div>
      <div v-if="new Date(task.date_of_completion).getTime() < new Date().getTime() && !hideStatus" class="error">Просрочено</div>
      <div v-if="!hideDate" class="pl-16" :class="dateClass">
         {{ setDate(task.date_of_completion) }}
      </div>
   </div>
</template>

<script>
import { dateToMonthText } from '@/components/Common/helpers/dateToNumbers';
import { downloadImageUser } from '@/components/Common/helpers/imageLoader';
import { api_domain, protocol } from '@/components/Common/helpers/host';

export default {
   // eslint-disable-next-line
   name: "TaskItem",
   props: {
      task: {
         type: Object
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
      },
      hideDate: {
         type: Boolean
      },
      hideStatus: {
         type: Boolean
      }
   },
   data() {
      return {
         userAvatar: `${protocol}${api_domain}/apiV0/photo/${this.task.creator_id}`
      }
   },
   methods: {
      openTask(task) {
         this.$emit('openTask', task);
      },
      setDate(date) {
         return dateToMonthText(date);
      }
   },
   mounted() {
      if(this.task.creator_id === 523) {
         this.userAvatar = require('@/components/UserAccount/pages/Home/resources/images/users/statham.png')
      } else {
         downloadImageUser.call(this, 'userAvatar')
      }
   }
}
</script>

<style lang="less">
.TaskItem {
   transition: 0.2s;

   &-desc {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 200px;

      @media (max-width: 800px) {
         width: 150px;
      }
   }

   &-image {
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
</style>