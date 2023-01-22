<template>
   <div class="AddTaskView">
      <h2 class="h2 text-center pb-8">Добавить задачу</h2>
      <div class="flex">
         <div class="flex-col flex-col-6">
            <div class="flex">
               <h3 class="h3 pb-8">Исполнитель</h3>
               <span @click="openPersonView" class="material-icons pl-4 AddTaskView-pointer">person</span>
            </div>
         </div>
         <div class="flex-col flex-col-6">
            <div class="flex">
               <h3 class="h3">Срок</h3>
               <span @click="openDate" class="material-icons pl-4 AddTaskView-pointer">calendar_month</span>
            </div>
         </div>
         <div class="flex-col flex-col-12">
            <h3 class="h3 pb-8">Задача</h3>
            <input type="text" class="input mb-8">
         </div>
         <div class="flex-col flex-col-12">
            <h3 class="h3 pb-8">Описание</h3>
            <textarea class="textarea" style="resize: none; " name="" id="" cols="30" rows="10"></textarea>
         </div>
      </div>
      <button class="button">Добавить</button>
   </div>

   <!-- Для календаря -->
   <SuperPopup
      v-model:show="showDate"
      :config="configDate"
      :btn="'check_circle'"
      :colorBtn = "'green'"
   >
   <v-calendar is-expanded />
   </SuperPopup>

   <!-- Для выбора исполнителя -->
   <SuperPopup
      v-model:show="showPersonView"
      :config="configPersonView"
   >
      Тут будет выбор исполнителя
   </SuperPopup>
</template>

<script>
import { mapGetters } from "vuex";
import Tasks from '@/components/service/task'

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getModalViewConfig"]),
   data() {
      return {
         taskParams: {
            userId: '2',
            response: '',
            date: '',
            title: '',
            desc: '',
            parent: this.getModalViewConfig
         },
         showDate: false,
         configDate: {},
         showPersonView: false,
         configPersonView: {}
      }
   },
   methods: {
      setTask() {
         Tasks.setTask()
      },
      openDate(e) {
         this.showDate = true
         this.configDate = {
            x: e.clientX,
            y: e.clientY
         }
      },
      openPersonView(e) {
         this.showPersonView = true
         this.configPersonView = {
            x: e.clientX,
            y: e.clientY
         }
      }
   }

}
</script>


<style lang="less" scoped>
.AddTaskView {
   width: 1000px;

   &-pointer {
      cursor: pointer;
   }
}

</style>