<template>
   <div v-if="tasks.length != 0">
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
               <div>
                  {{ item.date }}
               </div>
            </div>
         </div>
      </div>
   </div>
   <div v-else>
      <div class="flex flex-noGutter flex-column">
         <div v-for="item in sceletonTasks" v-bind:key="item" class="greyBlock mb-20 radius-block ph-30 pv-10"></div>
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
         taskStyle: this.itemClass,
         activeTask: '',
         tasks: [],
         sceletonTasks: new Array(6),
      }
   },
   methods: {
      openTask(task) {
         this.activeTask = task,
         this.$emit('onClickTask', task)
      }
   },
   beforeMount() {
      this.tasks = this.Tasks
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
