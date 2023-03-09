<template>
   <div class="flex flex-noGutter flex-column">
      <div v-for="item in tasks" v-bind:key="item.task_id" class="flex-col">
         <div @click="openTask(item)" :class="[itemClass] " class="TaskItem pointer flex flex-space ph-10 pv-16 mb-8">
            <div class="flex">
               <div class="TaskItem-image">
                  <img src="@/components/UserAccount/pages/Home/resources/images/users/dominic.jpg" class="">
               </div>
               <div class="pl-16">
                  <span class="TaskItem-title" :class="[titleClass]">Andrey Churilov</span>
                  <p class="TaskItem-desc pl-10" :class="[descClass]">{{ item.title }}</p>
               </div>
            </div>
            <div class="empty_flex"></div>
            <div class="pl-16" :class="dateClass">
               {{ item.date }}
            </div>
         </div>
      </div>
   </div>
</template>
<script>

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
         taskStyle: this.itemClass,
         activeTask: '',
         tasks: [],
         user_avatar: 'empty_avatar.png'
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

   &-sceletonTask {
      
   }
}
</style>
