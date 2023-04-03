<template>
   <div class="AddTaskView radius-block p-20 p-sm-10">
      <h2 class="user_account-h2 text-center pb-8">{{ $t('user_account_tasks_add_task') }}</h2>
      <div class="flex pb-10">
         <div class="flex-col flex-col-6 flex-col-sm-12 relative">
            <PopupBtn :positionStyle="'AddTaskView-personView'" v-model:show="showUserView" :hideBtn=true>
               <template v-slot:popupBtn>
                  <div class="flex a-items-center">
                     <h3 class="user_account-h3">{{ $t('user_account_tasks_add_responsible') }}</h3>
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
            <p class="error AddTaskView-error_position" v-if="errorParams.responsible_id">{{ $t('user_account_tasks_add_responsible_error') }}</p>
         </div>
         <div class="flex-col flex-col-6 flex-col-sm-12 relative">
            <PopupBtn :positionStyle="'AddTaskView-dateView'" :hideBtn=true>
               <template v-slot:popupBtn>
                  <div class="flex flex-noGutter">
                     <div class="flex-col">
                        <h3 class="user_account-h3">{{ $t('user_account_tasks_add_deadline') }}</h3>
                     </div>
                     <div class="flex-col flex a-items-center">
                        <div class="pl-8">
                           {{ date }}
                        </div>
                     </div>
                     <div class="flex-col flex a-items-center">
                        <span class="material-icons pl-8">calendar_month</span>
                     </div>
                  </div>
               </template>
               <template v-slot:popupTemplate>
                  <v-date-picker :locale="locale" mode="date" v-model="date1"  @dayclick="setDate"/>
               </template>
            </PopupBtn>
            <p class="error AddTaskView-error_position" v-if="errorParams.date_of_completion">{{ $t('user_account_tasks_add_deadline_error') }}</p>
         </div>
         <div class="flex-col flex-col-12 relative">
            <h3 class="user_account-h3 pb-8">{{ $t('user_account_tasks_add_task_title') }}</h3>
            <input type="text" class="input" v-model.trim="taskParams.title">
            <p class="error AddTaskView-error_position" v-if="errorParams.title">{{ $t('user_account_tasks_add_task_title_error') }}</p>
         </div>
         <div class="flex-col flex-col-12 relative">
            <h3 class="user_account-h3 pb-8">{{ $t('user_account_tasks_add_desc') }}</h3>
            <textarea class="textarea" v-model.trim="taskParams.description" style="resize: none; " name="" id="" cols="30" rows="10"></textarea>
            <p class="error AddTaskView-error_position" v-if="errorParams.description">{{ $t('user_account_tasks_add_desc_error') }}</p>
         </div>
      </div>
      <button @click="setTask" class="button">{{ $t('user_account_tasks_add_addBtn') }}</button>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';
import { setTask } from "@/websync/tasks";
import { closeDialog } from '@/components/Common/modalView/index';
import { getUsersList } from '@/websync/user';
import { getLocale } from "@/lang/lang";
import { getUser } from "@/components/Common/helpers/user";


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
            creator_id: getUser().user_id,
            responsible_id: '',
            date_of_creation: new Date(),
            date_of_completion: this.date1,
            parent_id: null,
            status_task_id: null
         },
         showUserView: false,
         locale: getLocale()
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
      left: 0;
   }

   &-personView {
      top: 100%;
      left: 0;
   }
}
</style>