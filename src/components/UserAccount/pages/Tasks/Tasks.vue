<template>
   <div class="Tasks flex flex-column">
      <div class="flex box-shadow pt-12 pv-10">
         <div class="flex flex-col-8">
            <div class="flex-col flex a-items-center">
            <button @click="openAddTaskView" class="Tasks-addTask-btn flex flex-center a-items-center">
               <span class="material-icons Tasks-addTask-btn-icon">add</span>
            </button>
            <div class="secondare-text-color pl-10">Тест новой модалки</div>
            <span class="material-icons pl-10 pointer" @click="openNewModal" style="color: red;">
               favorite
            </span>
            </div>
            <div class="flex-col flex flex-nowrap a-items-center">
               <SearchField @clickSearchEnter="filterToString" @clickSearch="filterToString" @clearSearch="clearFilterText"/>
            </div>
            <div class="empty_flex"></div>
            <div class="flex a-self-end">
               <div class="flex-col">
                  <div class="select_tab" :class="{'active' : activeTab === 'my'}" @click="setTab('my')">
                     {{ $t('user_account_tasks_filter_my') }}
                  </div>
               </div>
               <div class="flex-col">
                  <div class="select_tab" :class="{'active' : activeTab === 'from'}" @click="setTab('from')">
                     {{ $t('user_account_tasks_filter_from') }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="flex">
         <div class="flex-col pt-16 flex-col-8 flex flex-noGutter flex-column Tasks-itemsWrapper">
            <div v-if="returnTasks.length > 0" class="flex flex-noGutter flex-column">
               <TaskItems
                  :Tasks = "returnTasks"
                  @onClickTask = OpenTask
                  :itemClass="'Tasks-item'"
                  :titleClass="'secondary-text-color'"
                  :descClass="'standart-text-grey'"
                  :dateClass="'secondary-text-color'"
               />
            </div>
            <p v-else class="standart-text-grey">Задач нет</p>
         </div>
         <div class="flex-col pt-16 flex flex-column">
            <div class="flex-col pb-16">
               {{ $t('user_account_tasks_filtres_text') }}
            </div>
            <div class="flex-col flex">
               <PopupBtn :positionStyle="'Tasks-filter-popupDate'" :hideBtn=true>
                  <template v-slot:popupBtn>
                     <div class="flex pointer a-items-center">
                        <span class="flex a-items-center material-icons">calendar_month</span>
                        <span class="pl-10">{{ dateFilterToShow }}</span>
                     </div>
                  </template>
                  <template v-slot:popupTemplate>
                     <v-date-picker :locale="locale" mode="date" v-model="dateToFilter" @dayclick="setDate"/>
                  </template>
               </PopupBtn>
               <span v-if="dateFilterToShow" @click="deleteDate" class="material-icons pl-10 pointer">close</span>
            </div>
            <div class="flex-col">
               <div class="flex pointer  a-items-center">
                  <span class="flex a-items-center material-icons">person</span>
               </div>
            </div>
            <div class="flex-col">
               <div class="flex pointer a-items-center">
                  <span class="flex a-items-center material-icons">group</span>
               </div>
            </div>
         </div>
      </div>
   </div>

   <ModalDialog
      :dialogStatus="dialogStatus"
      :title = "'Новая задача'"
      @onCloseClick="() => {this.dialogStatus=false}"
      :template="'components/UserAccount/pages/Tasks/templates/addTaskDialog.vue'"
   />
</template>

<script>
import { mapGetters } from 'vuex';
import { getTasks, openTask, filterOnDate, filterOnTab, clearDateFilter, filterOnText, SocketGetTask } from '@/websync/tasks';
import { openDialog } from '@/components/Common/modalView';
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';
import { getLocale } from "@/lang/lang";
import mainSocket from "@/vue_socket/mainSocket"


export default {
   // eslint-disable-next-line
   name: "",
   components: {
      TaskItems
   },
   data() {
      return {
         filterString: '',
         filteredArr: [],
         activeTab: 'my',
         activeTask: 'Tasks-item',
         tasks: [],
         date: new Date(),
         dateToFilter: '',
         dateFilterToShow: '',
         locale: getLocale(),
         dialogStatus: false
      }
   },
   methods: {
      OpenTask(task) {
         openTask(task)
      },
      openAddTaskView() {
         openDialog({template: 'components/Common/modalView/templates/AddTaskView.vue'});
      },
      openNewModal() {
         this.dialogStatus = true;
      },
      setTab(name) {
         this.activeTab = name;
         filterOnTab(name);
      },
      filterToString(text) {
         filterOnText(text);
      },
      clearFilterText() {
         filterOnText('');
      },
      setDate(date) {
         this.dateToFilter = date;
         this.dateFilterToShow = dateToNumbers(date.date); 
         filterOnDate(date.date);
      },
      deleteDate() {
         this.dateToFilter = '';
         this.dateFilterToShow = '';
         clearDateFilter()
      }
   },
   computed: mapGetters(["returnTasks"]),
   beforeMount() {
      getTasks()
      console.log(localStorage.task)
      mainSocket.on('SET_TASK', data => {
        SocketGetTask(data.task)
      }
      getTasks();
   }
}
</script>

<style lang="less">
.Tasks {
   height: 100%;
   flex-wrap: unset;

   &-search-field {
      width: auto;
   }

   &-addTask-btn {
      color: black;
      cursor: pointer;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.3);
      border-radius: 50%;   

      &-icon {
         font-size: 30px;
      }
   }

   &-itemsWrapper {
      overflow: hidden;
      overflow-y: scroll;
      height: 90vh;
   }

   &-item {
      border-radius: 20px;
      transition: 0.2s;
      &:hover, &:focus {
         background: #f1f5f9;
      }

      &-active {
         background: #f1f5f9;
      }

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

   &-filter {
      &-popupDate {
         left: 0;
      }
   }
}

.empty_flex {
   flex: 1 1 0%;
}
</style>