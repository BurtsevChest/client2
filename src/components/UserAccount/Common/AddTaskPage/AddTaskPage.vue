<template>
   <div class="AddTaskPage flex flex-column empty_flex pt-16">
      <div class="AddTaskPage-parentTask flex pb-20">
         <span v-if="options?.parentTask" class="pointer">{{ options?.parentTask?.title }}: {{ options?.parentTask?.description }}</span>
         <div @click="createTask" class="AddTaskPage-sendBtn">отправить</div>
      </div>
      <div class="AddTaskPage-creatorTask flex flex-nowrap pb-20">
         <userImage :user_id="user.user_id"/>
         <div class="pl-8">
            <span class="AddTaskPage-creatorTask-name">{{ user.name }} {{ user.last_name }}</span><br>
            {{ options.reglament.name }}
         </div>
         <div class="empty_flex"></div>
         <div class="flex flex-nowrap">
            <PopupBtn :accessShow="true" :right="'0px'" :hideBtn=true>
               <template v-slot:popupBtn>
                  <div class="flex flex-noGutter">
                     <span v-if="errorParams.date_of_completion" class="error pr-6">{{ $t('user_account_tasks_add_deadline_error') }}</span>
                     {{ showDate(task.date_of_completion) }}
                  </div>
               </template>
               <template v-slot:popupTemplate>
                  <div class="box-shadow" style="border-radius: 12px; box-shadow: 0 0 18px rgba(128, 128, 128, 0.5);">
                     <v-date-picker @dayclick="setDate" :locale="locale" mode="date" borderless  :is-dark="true" v-model="task.date_of_completion"/>
                  </div>
               </template>
            </PopupBtn>
         </div>
      </div>
      <div class="AddTaskPage-responsible pb-20">
         <span>Исполнитель</span>
         <div class="flex flex-nowrap pt-8">
            <PopupBtn :accessShow="true" v-model:show="selectUsersPopup" :hideBtn=true>
               <template v-slot:popupBtn>
                     <userImage v-model:user_id="task.responsible_id"/>
               </template>
               <template v-slot:popupTemplate>
                  <SelectUsers @onClickUser = "setUser" :userList="getUsersCommandList"/>
               </template>
            </PopupBtn>
            <div class="flex flex-column empty_flex pl-8">
               <div class="AddTaskPage-responsible-name pb-8">
                  <span class="pointer" @click="openSelectUsers">{{ responsibleName || 'Исполнитель' }}</span>
                  <span v-if="errorParams.responsible_id" class="error pl-6">Не выбран исполнитель</span>
                  <span v-if="errorParams.description" class="error pl-20">Нет описания</span>
               </div>
               <TextField @inputText="inputText" :placeholder="'Описание'"/>
            </div>
         </div>
      </div>
      <div class="AddTaskPage-addFiles flex-container">
         <div class="flex flex-col a-items-center pointer">
            <span class="material-icons">
               attach_file
            </span>
            <p>{{ $t('user_account_tasks_opentask_attach') }}</p>
         </div>
      </div>
   </div>
</template>

<script>
import { getUser } from '@/components/Common/helpers/user';
import { getLocale } from "@/lang";
import { dateToNumbers, dayDiff } from '@/components/Common/helpers/dateToNumbers';
import { getUsersList } from '@/websync/user';
import { mapGetters } from "vuex"; 
import Task from '@/api/task';

export default {
   // eslint-disable-next-line
   name: "AddTaskPage",
   props: {
      options: {
         type: Object
      },
      opener: {
         type: Object
      },
   },
   watch: {
      options() {
         this.errorParams = {
            description: false,
            responsible_id: false,
            date_of_completion: false
         };
      }
   },
   computed: mapGetters(['getUsersCommandList']),
   data() {
      return {
         user: getUser(),
         task: {
            title: this.options.reglament.name,
            description: "",
            creator_id: getUser().user_id,
            responsible_id: '',
            date_of_creation: new Date(),
            date_of_completion: new Date(),
            parent_id: this.options?.parentTask?.task_id,
            status_task_id: null,
         },
         errorParams: {
            description: false,
            responsible_id: false,
            date_of_completion: false
         },
         responsibleName: '',
         locale: getLocale(),
         selectUsersPopup: false,
         paramsChecked: false
      }
   },
   methods: {
      showDate(date) {
         return dateToNumbers(date);
      },
      inputText(desc) {
         if(desc) {
            this.errorParams.description = false;
            this.task.description = desc;
         } else {
            this.errorParams.description = true;
            this.task.description = '';
         }
      },
      setUser(user) {
         this.task.responsible_id = user.user_id;
         this.responsibleName = `${user.name} ${user.last_name}`;
         this.selectUsersPopup = false;
         this.errorParams.responsible_id = false;
      },
      openSelectUsers() {
         this.selectUsersPopup = !this.selectUsersPopup;
      },
      setDate() {
         const daysDiff = dayDiff(this.task.date_of_creation, this.task.date_of_completion);
         if(daysDiff > -1) {
            this.errorParams.date_of_completion = true;
            this.paramsChecked = false;
         } else {
            this.errorParams.date_of_completion = false;
         }
      },
      checkParams() {
         this.paramsChecked = true;
         this.errorParams = {description: false, responsible_id: false, date_of_completion: false};
         if(!this.task.description) this.errorParams.description = true, this.paramsChecked = false;
         if(!this.task.responsible_id) this.errorParams.responsible_id = true, this.paramsChecked = false;
         this.setDate();
      },
      createTask() {
         this.checkParams();
         if(this.paramsChecked) {
            Task.setTask(this.task);
            this.$emit('closeSidebar');
         }
      }
   },
   mounted() {
      getUsersList()
   }
}
</script>

<style lang="less">
   .AddTaskPage {
      &-parentTask {
         // если родительского таска не будет
         min-height: 37px;
         color: grey;
         font-size: 14px;
         &>span {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 400px;
            display: block;
            text-decoration: underline;

            @media (max-width: 800px) {
               width: 150px;
            }
         }
      }
      &-areatext {
         border-radius: 6px;
         border: 1px solid transparent;
         &:focus {
            border: 1px solid grey;
         }
      }

      &-datePopup {
         right: 0;
      }

      &-responsible {
         &-name {
            min-height: 28px;
         }
      }

      &-sendBtn {
         margin-left: auto;
         margin-right: 60px;
         cursor: pointer;
         text-decoration: none;
         color: var(--text-color);
      }
   }
</style>