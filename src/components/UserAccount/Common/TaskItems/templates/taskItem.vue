<template>
   <div @click="openTask(task)" :class="[itemClass] " class="TaskItem pointer flex flex-space ph-10 pv-16 mb-8">
      <div class="flex">
         <div class="TaskItem-image">
            <img :src="userAvatar">
         </div>
         <div class="pl-16">
            <span class="TaskItem-title" :class="[titleClass]">{{ task.creator_title }}</span>
            <p class="TaskItem-desc pl-10" :class="[descClass]">{{ task.title }}</p>
         </div>
      </div>
      <div class="empty_flex"></div>
      <div class="pl-16" :class="dateClass">
         {{ setDate(task.date_of_completion) }}
      </div>
   </div>
</template>

<script>
import { dateToMonthText } from '@/components/Common/helpers/dateToNumbers';
import { loadUserImage } from '@/components/Common/helpers/imageLoader';

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
      }
   },
   data() {
      return {
         userAvatar: ''
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
      loadUserImage(this.task.creator_id).then((imageUrl) => {
         this.userAvatar = imageUrl;
      })
   }
}
</script>

<style lang="less">
.TaskItem {
   transition: 0.2s;

   &-title {
      font-size: 18px;
   }

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