<template>
   <div class="Tasks flex flex-column">
      <div class="Tasks-header flex box-shadow pt-12 pv-10">
         <div class="flex flex-col-8">
            <div ref="AddTaskBtn" class="flex-col flex a-items-center">
            <PopupBtn :accessShow="true" v-model:show="reglamentDialog" :top="'0px'" :left="'-18px'" :hideBtn=true>
               <template v-slot:popupBtn>
                  <button class="Tasks-addTask-btn flex flex-center a-items-center">
                     <span class="material-icons Tasks-addTask-btn-icon">add</span>
                  </button>
               </template>
               <template v-slot:popupTemplate>
                  <div class="Tasks-reglament-popup ph-8 pv-10 radius-block box-shadow">
                     <div v-for="item in taskReglaments"  v-bind:key="item.name"  @click="openAddTaskView(item)" class="Tasks-reglament-popup-item pointer radius-block ph-6 pv-10">
                        {{ item.name }}
                     </div>
                  </div>
               </template>
            </PopupBtn>
            </div>
            <div class="flex-col flex flex-nowrap a-items-center">
               <SearchField @clickSearchEnter="filterText" @clickSearch="filterText" @clearSearch="clearTextFilter"/>
            </div>
            <div class="empty_flex"></div>
            <div class="flex a-self-end">
               <div class="flex-col">
                  <div class="Tasks-tabs ph-8 pv-12 radius-block pointer" :class="{'active' : filterRules.tabFilter === 'my'}" @click="filterTab('my')">
                     {{ $t('user_account_tasks_filter_my') }}
                  </div>
               </div>
               <div class="flex-col">
                  <div class="Tasks-tabs ph-8 pv-12 radius-block pointer" :class="{'active' : filterRules.tabFilter === 'from'}" @click="filterTab('from')">
                     {{ $t('user_account_tasks_filter_from') }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="flex-container height-100">
         <div class="flex-col pt-16 mb-16 flex-col-9 flex flex-noGutter flex-column Tasks-itemsWrapper">
            <TaskItems
               v-if="filteredTasks.length > 0"
               :Tasks = "filteredTasks"
               @onClickTask = OpenTask
               :itemClass="'Tasks-item'"
               :descClass="'standart-text-grey'"
            />
            <p v-else class="standart-text-grey">Задач нет</p>
         </div>
         <div class="flex-col flex-col-3 pt-16 flex flex-column">
            <div class="Tasks-filtres p-10 radius-block">
               <div class="flex-col pb-16">
               {{ $t('user_account_tasks_filtres_text') }}
            </div>
            <div class="flex-col flex">
               <PopupBtn :accessShow="true" :hideBtn=true>
                  <template v-slot:popupBtn>
                     <div class="flex pointer a-items-center">
                        <span class="flex a-items-center material-icons">calendar_month</span>
                        <span class="pl-10">{{ dateFilterToShow }}</span>
                     </div>
                  </template>
                  <template v-slot:popupTemplate>
                     <div class="Tasks-filtres-popupCalendar">
                        <v-date-picker :locale="locale" mode="date" :is-dark="true" v-model="filterRules.date_of_completion" @dayclick="filterDate"/>
                     </div>
                  </template>
               </PopupBtn>
               <span v-if="dateFilterToShow" @click="clearDateFilter" class="material-icons pl-10 pointer">close</span>
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
import { openTask, openAddTask } from '@/components/Common/helpers/tasks.js';
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';
import { dateToNumbers, dayDiff } from '@/components/Common/helpers/dateToNumbers';
import { getLocale } from "@/lang";
import mainSocket from "@/vue_socket/mainSocket";
import Task from '@/api/task';
import { getUser } from '@/components/Common/helpers/user';

export default {
   // eslint-disable-next-line
   name: "Tasks",
   components: {
      TaskItems
   },
   data() {
      return {
         tasks: [],
         filterRules: {
            date_of_completion: '',
            tabFilter: 'my',
            filterText: ''
         },
         filteredTasks: [],
         date: new Date(),
         dateFilterToShow: '',
         locale: getLocale(),
         reglamentDialog: false,
         user_id: getUser().user_id
      }
   },
   methods: {
      OpenTask(task) {
         openTask(task, this)
      },
      openAddTaskView(reglament) {
         this.reglamentDialog = false;
         openAddTask({reglament}, this.$refs.AddTaskBtn);
      },
      setTasks(tasks) {
         this.tasks = tasks;
         this.filterTasks();
      },
      setSocketTask(task) {
         const indexExistTask = this.tasks.findIndex(item => item.task_id === task.task_id);
         if(indexExistTask >= 0) {
            this.tasks.splice(indexExistTask, 1, task);
         } else {
            this.tasks.push(task);
         }
         this.filterTasks();
      },
      filterTasks() {
         this.filteredTasks = this.tasks.filter((item) => {
            for(var key in this.filterRules) {
               // On Date
               if(this.filterRules.date_of_completion != '' && key != undefined) {
                  const diffTime = dayDiff(this.filterRules.date_of_completion, item.date_of_completion);
                  if(diffTime < 0) {
                     return false;
                  }
               }
               // Если я ответственный
               if(this.filterRules.tabFilter === 'my') {
                  if(item.responsible_id != this.user_id) {
                     return false;
                  }
               }
               // Если я создатель
               if(this.filterRules.tabFilter === 'from') {
                  if(item.creator_id != this.user_id) {
                     return false;
                  }
               }
               // Поиск по тексту
               if(this.filterRules.filterText != '') {
                  if(!(item.title.toLowerCase().includes(this.filterRules.filterText.toLowerCase()) || item.description.toLowerCase().includes(this.filterRules.filterText.toLowerCase()))) {
                     return false;
                  }
               }
            }
            return true;
         })
      },
      filterDate(date) {
         this.dateFilterToShow = dateToNumbers(date.date);
         this.filterRules.date_of_completion = date.date;
         this.filterTasks();
      },
      filterTab(tab) {
         this.filterRules.tabFilter = tab;
         this.filterTasks();
      },
      filterText(text) {
         this.filterRules.filterText = text;
         this.filterTasks();
      },
      clearTextFilter() {
         this.filterRules.filterText = '';
         this.filterTasks();
      },
      clearDateFilter() {
         this.dateFilterToShow = '';
         this.filterRules.date_of_completion = '';
         this.filterTasks();
      }
   },
   computed: mapGetters(['taskReglaments']),
   beforeMount() {
      mainSocket.on('SET_TASK', data => {
         this.setSocketTask(data.task)
      })
   },
   beforeRouteEnter(to, from, next) {
      Task.getTasks(getUser().user_id)
      .then((res) => {
         next(component => component.setTasks(res.data));
      })
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
      height: 100%;
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
         left: -18px;
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
