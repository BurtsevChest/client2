<template>
   <div class="Tasks flex flex-column">
      <div class="Tasks-header flex box-shadow pt-12 pv-10">
         <div class="flex flex-col-8">
            <div class="flex-col flex a-items-center">
            <PopupBtn v-model:show="reglamentDialog" :positionStyle="'Tasks-reglament-popup-position'" :hideBtn=true>
               <template v-slot:popupBtn>
                  <button class="Tasks-addTask-btn flex flex-center a-items-center">
                     <span class="material-icons Tasks-addTask-btn-icon">add</span>
                  </button>
               </template>
               <template v-slot:popupTemplate>
                  <div class="Tasks-reglament-popup ph-8 pv-10 fit-content radius-block box-shadow">
                     <div v-for="item in taskReglaments" v-bind:key="item.name"  @click="openAddTaskView" class="Tasks-reglament-popup-item pointer radius-block ph-6 pv-10">
                        {{ item.name }}
                     </div>
                  </div>
               </template>
            </PopupBtn>
            </div>
            <div class="flex-col flex flex-nowrap a-items-center">
               <SearchField @clickSearchEnter="filterToString" @clickSearch="filterToString" @clearSearch="clearFilterText"/>
            </div>
            <div class="empty_flex"></div>
            <div class="flex a-self-end">
               <div class="flex-col">
                  <div class="Tasks-tabs ph-8 pv-12 radius-block pointer" :class="{'active' : activeTab === 'my'}" @click="setTab('my')">
                     {{ $t('user_account_tasks_filter_my') }}
                  </div>
               </div>
               <div class="flex-col">
                  <div class="Tasks-tabs ph-8 pv-12 radius-block pointer" :class="{'active' : activeTab === 'from'}" @click="setTab('from')">
                     {{ $t('user_account_tasks_filter_from') }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="flex">
         <div class="flex-col pt-16 flex-col-9 flex flex-noGutter flex-column Tasks-itemsWrapper">
            <div v-if="returnTasks.length > 0" class="flex flex-noGutter flex-column">
               <TaskItems
                  :Tasks = "returnTasks"
                  @onClickTask = OpenTask
                  :itemClass="'Tasks-item'"
                  :descClass="'standart-text-grey'"
               />
            </div>
            <p v-else class="standart-text-grey">Задач нет</p>
         </div>
         <div class="flex-col flex-col-3 pt-16 flex flex-column">
            <div class="Tasks-filtres p-10 radius-block">
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
                     <div class="Tasks-filtres-popupCalendar">
                        <v-date-picker :locale="locale" mode="date" v-model="dateToFilter" @dayclick="setDate"/>
                     </div>
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
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
   getTasks, 
   openTask,
   filterOnDate,
   filterOnTab,
   clearDateFilter,
   filterOnText,
   SocketGetTask 
} from '@/websync/tasks';
import { openDialog } from '@/components/Common/modalView';
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';
import { getLocale } from "@/lang/lang";
import mainSocket from "@/vue_socket/mainSocket";

export default {
   // eslint-disable-next-line
   name: "Tasks",
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
         reglamentDialog: false
      }
   },
   methods: {
      OpenTask(task) {
         openTask(task)
      },
      openAddTaskView() {
         this.reglamentDialog = false;
         openDialog({template: 'components/Common/modalView/templates/AddTaskView.vue'});
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
   computed: mapGetters(["returnTasks",'taskReglaments']),
   beforeMount() {
      mainSocket.on('SET_TASK', data => {
        SocketGetTask(data.task)
      })
      getTasks();
   }
}
</script>

<style lang="less">
.Tasks {
   height: 100%;
   flex-wrap: unset;
   background-color: var(--background-color-wrapper);

   &-header {
      background-color: var(--background-color);
      color: var(--text-color);
   }

   &-search-field {
      width: auto;
   }

   &-addTask-btn {
      cursor: pointer;
      width: 40px;
      height: 40px;
      background: var(--text-block-hover);
      border-radius: 50%;   

      &-icon {
         font-size: 30px;
      }
   }

   &-itemsWrapper {
   }

   &-item {
      border-radius: 20px;
      transition: 0.2s;
      color: white;

      &:hover, &:focus {
         background: var(--text-block-hover);
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

   &-filtres {
      background-color: var(--background-color);
      color: var(--text-color);

      &-popupCalendar {
         box-shadow: var(--block-box-shadow);
      }
   }

   &-tabs {
      color: var(--text-color);
      &.active {
         background-color: var(--text-block-hover);
      }

      &:hover {
         background-color: var(--text-block-hover);
      }
   }

   &-reglament-popup {
      background-color: var(--background-color);
      color: var(--text-color);
      width: max-content;

      &-position {
         top: 0;
         left: 0;
      }

      &-item {
         margin-bottom: 8px;
         &:last-child {
            margin-bottom: 0;
         }
         &:hover {
            transition: 0.2s;
            background-color: var(--text-block-hover);
         }
      }
   }
}

.empty_flex {
   flex: 1 1 0%;
}
</style>
