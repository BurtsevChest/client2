<template>
   <div class="flex flex-noGutter flex-column">
      <div v-for="item in tasks" v-bind:key="item.task_id" class="flex-col">
         <div @click="openTask(item)" :class="[itemClass] " class="TaskItem pointer flex flex-space ph-10 pv-16 mb-8">
            <div class="flex">
               <div class="TaskItem-image">
                  <img src="@/components/UserAccount/pages/Home/resources/images/users/andrey.jpg" class="">
               </div>
               <div class="pl-16">
                  <h2 class="TaskItem-title">Andrey Churilov</h2>
                  <p class="TaskItem-desc pl-10">{{ item.title }}</p>
               </div>
            </div>
            <div class="">
               {{ item.date }}
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';

export default {
   // eslint-disable-next-line
   name: "TaskItem",
   props: {
      Tasks: {
         type: Array
      },
      itemClass: {
         type: String
      },
      activeItemClass: {
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
         tasks: [],
         dates: []
      }
   },
   methods: {
      openTask(task) {
         this.activeTask = task
         this.$emit('onClickTask', task)
      },
      changeDateVision() {
         var self = this;
         return new Promise((function(resolve, reject) {
            if(self.Tasks) {
               self.Tasks.forEach((item) => {
                  var dat = new Date(item.date_of_creation);
                  this.dates.push(dateToNumbers(dat));
                  item.date = dateToNumbers(dat);
               });
               resolve(self.Tasks)
            } else {
               reject('Не удалось загрузить задачи')
            }
         }))
      }
   },
   beforeMount() {
      this.changeDateVision().then((resolve) => {
         this.tasks = resolve
      })
   }
}
</script>

<style lang="less">
.TaskItem {
   border-radius: 10px;
   transition: 0.2s;

   &-title {
      font-size: 18px;
      font-weight: bold;
   }

   &-desc {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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
