<template>
   <div class="AddTaskView radius-block p-20 p-sm-10">
      <h2 class="user_account-h2 text-center pb-8">Добавить задачу</h2>
      <div class="flex pb-10">
         <div class="flex-col flex-col-6 flex-col-sm-12 relative">
            <div class="flex a-items-center">
               <h3 class="user_account-h3">Исполнитель</h3>
               <span @click="openPersonView" class="material-icons pl-4 AddTaskView-pointer">person</span>
               <div class="flex a-items-center pl-4">
                  {{ user.name }} {{ user.last_name }}
               </div>
            </div>
            <p class="error AddTaskView-error_position" v-if="errorParams.responsible_id">Исполнитель не выбран</p>
         </div>
         <div class="flex-col flex-col-6 flex-col-sm-12 relative">
            <div class="flex flex-noGutter">
               <div class="flex-col">
                  <h3 class="user_account-h3">Срок</h3>
               </div>
               <div class="flex-col flex a-items-center">
                  <div class="pl-8">
                     {{ date }}
                  </div>
               </div>
               <div class="flex-col flex a-items-center ">
                  <span @click="openDate" class="material-icons pl-8 AddTaskView-pointer">calendar_month</span>
               </div>
            </div>
            <p class="error AddTaskView-error_position" v-if="errorParams.date_of_completion">Дата не может быть меньше текущей даты</p>
         </div>
         <div class="flex-col flex-col-12 relative">
            <h3 class="user_account-h3 pb-8">Задача</h3>
            <input type="text" class="input" v-model.trim="taskParams.title">
            <p class="error AddTaskView-error_position" v-if="errorParams.title">Задача не написана</p>
         </div>
         <div class="flex-col flex-col-12 relative">
            <h3 class="user_account-h3 pb-8">Описание</h3>
            <textarea class="textarea" v-model.trim="taskParams.description" style="resize: none; " name="" id="" cols="30" rows="10"></textarea>
            <p class="error AddTaskView-error_position" v-if="errorParams.description">Нет описания к задаче</p>
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

let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getModalViewConfig"]),
   props: {
      options: {
         type: Object
      }
   },
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
         errorParams: {
            title: '',
            description: '',
            responsible_id: '',
            date_of_completion: '',
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
         this.checkParams()
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
      },
      setUser(user) {
         this.user = user,
         this.showPersonView = false
         this.taskParams.responsible_id = user.user_id
      },
      checkParams() {
         if(!this.taskParams.title) {
            this.errorParams.title = true
         } else {
            this.errorParams.title = false
         }
         if(!this.taskParams.description) {
            this.errorParams.description = true
         } else {
            this.errorParams.description = false
         }
         if(!this.taskParams.responsible_id) {
            this.errorParams.responsible_id = true
         } else {
            this.errorParams.responsible_id = false
         }
         if(this.taskParams.date_of_completion < this.taskParams.date_of_creation) {
            this.errorParams.date_of_completion = true
         } else {
            this.errorParams.date_of_completion = false
         }
      },
      createParams() {
         this.taskParams.date_of_completion = this.date1;
         if(this.options.task_id) {
            this.taskParams.parent_id = this.options.task_id;
         }
      }
   }

}
</script>


<style lang="less" scoped>
@wrapper-width: 1000px;
.AddTaskView {
   background: white;
   width: extract(@wrapper-width, 1);

   @media (max-width: 1000px) {
      width: 100%;
   }
   &-pointer {
      cursor: pointer;
   }

   &-error_position {
      position: absolute;
      bottom: -5px;
   }
}

</style>