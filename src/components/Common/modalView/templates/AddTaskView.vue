<template>
   <div class="AddTaskView">
      <h2 class="h2 text-center pb-8">Добавить задачу</h2>
      <div class="flex">
         <div class="flex-col flex-col-6">
            <div class="flex a-items-center">
               <h3 class="h3">Исполнитель</h3>
               <span @click="openPersonView" class="material-icons pl-4 AddTaskView-pointer">person</span>
               <div class="flex a-items-center pl-4">
                  {{ user.name }} {{ user.last_name }}
               </div>
            </div>
         </div>
         <div class="flex-col flex-col-6">
            <div class="flex">
               <div class="flex-col">
                  <h3 class="h3">Срок</h3>
               </div>
               <div class="flex-col flex a-items-center">
                  <div class="">
                     {{ date }}
                  </div>
               </div>
               <div class="flex-col flex a-items-center">
                  <span @click="openDate" class="material-icons pl-4 AddTaskView-pointer">calendar_month</span>
               </div>
            </div>
         </div>
         <div class="flex-col flex-col-12">
            <h3 class="h3 pb-8">Задача</h3>
            <input type="text" class="input mb-8" v-model.trim="taskParams.title">
         </div>
         <div class="flex-col flex-col-12">
            <h3 class="h3 pb-8">Описание</h3>
            <textarea class="textarea" v-model.trim="taskParams.description" style="resize: none; " name="" id="" cols="30" rows="10"></textarea>
         </div>
      </div>
      <button @click="setTask" class="button">Добавить</button>
   </div>

   <!-- Для календаря -->
   <SuperPopup
      v-model:show="showDate"
      :config="configDate"
      :btn="'check_circle'"
      :colorBtn = "'green'"
   >
   <v-date-picker mode="date" v-model="date1"  @dayclick="setDate"/>
   </SuperPopup>

   <!-- Для выбора исполнителя -->
   <SuperPopup
      v-model:show="showPersonView"
      :config="configPersonView"
   >
      <SelectUsers
         @onClickUser = "setUser"
      />
   </SuperPopup>
</template>

<script>
import { mapGetters } from "vuex";
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';
import { setTask } from "@/websync/tasks";
import { closeDialog } from '@/components/Common/modalView/index';

const USER = JSON.parse(localStorage.user);

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getModalViewConfig"]),
   data() {
      return {
         taskParams: {
            title: "",
            description: "",
            creator_id: USER.user_id,
            responsible_id: '',
            date_of_creation: new Date(),
            date_of_completion: this.date1,
            parent_id: null,
            status_task_id: null
         },
         showDate: false,
         configDate: {},
         showPersonView: false,
         configPersonView: {},
         date1: new Date(),
         date: dateToNumbers(new Date()),
         user: []
      }
   },
   methods: {
      setTask() {
         this.createParams();
         setTask(this.taskParams);
         closeDialog()
      },
      openDate(e) {
         this.showDate = true
         this.configDate = e
      },
      openPersonView(e) {
         this.showPersonView = true
         this.configPersonView = e
      },
      setDate(date) {
         this.date = dateToNumbers(date.date)
         this.taskParams.time = date.date
      },
      setUser(user) {
         this.user = user,
         this.showPersonView = false
         this.taskParams.responsible_id = user.user_id
      },
      createParams() {
         this.taskParams.date_of_completion = this.date1;
         if(this.getModalViewConfig) {
            this.taskParams.parent_id = this.getModalViewConfig;
         }
         delete this.taskParams.time
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