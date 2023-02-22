<template>
   <div class="AddTaskView radius-block p-20 p-sm-10">
      <h2 class="user_account-h2 text-center pb-8">Добавить задачу</h2>
      <div class="flex pb-10">
         <div class="flex-col flex-col-6 flex-col-sm-12 relative">
            <PopupBtn :positionStyle="'AddTaskView-personView'" v-model:show="showUserView" :hideBtn=true>
               <template v-slot:popupBtn>
                  <div class="flex a-items-center">
                     <h3 class="user_account-h3">Исполнитель</h3>
                     <div class="flex">
                        <span class="material-icons pl-4">person</span>
                        <div class="flex a-items-center pl-4">
                           {{ user.name }} {{ user.last_name }}
                        </div>
                     </div>
                  </div>
               </template>
               <template v-slot:popupTemplate>
                  <SelectUsers
                     @onClickUser = "setUser"
                     :userList="getUsersCommandList"
                  />
               </template>
            </PopupBtn>
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
               <div class="flex-col flex a-items-center relative">
                  <PopupBtn :positionStyle="'AddTaskView-dateView'" :hideBtn=true>
                     <template v-slot:popupBtn>
                        <span class="material-icons pl-8">calendar_month</span>
                     </template>
                     <template v-slot:popupTemplate>
                        <v-date-picker mode="date" v-model="date1"  @dayclick="setDate"/>
                     </template>
                  </PopupBtn>
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
</template>

<script>
import { mapGetters } from "vuex";
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';
import { setTask } from "@/websync/tasks";
import { closeDialog } from '@/components/Common/modalView/index';
import { getUsersList } from '@/websync/user';

let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getModalViewConfig", 'getUsersCommandList']),
   props: {
      options: {
         type: Object
      }
   },
   data() {
      return {
         errorParams: {
            title: '',
            description: '',
            responsible_id: '',
            date_of_completion: '',
         },
         date1: new Date(),
         date: dateToNumbers(new Date()),
         user: [],
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
         showUserView: false
      }
   },
   methods: {
      setTask() {
         this.createParams();
         if(this.checkParams()) {
            setTask(this.taskParams);
            closeDialog()
         }
      },
      setDate(date) {
         this.date = dateToNumbers(date.date)
      },
      setUser(user) {
         this.showUserView = false
         this.user = user,
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

         if((this.errorParams.responsible_id === true) || (this.errorParams.description === true) || (this.errorParams.title === true) || (this.errorParams.date_of_completion === true)) {
            return false
         }else {
            return true
         }
      },
      createParams() {
         this.taskParams.date_of_completion = this.date1;
         if(this.options?.task_id) {
            this.taskParams.parent_id = this.options.task_id;
         }
      }
   }, 
   beforeMount() {
      getUsersList()
   }
}
</script>

<style lang="less">
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

   &-dateView {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
   }

   &-personView {
      top: 100%;
      left: 0;
   }
}
</style>