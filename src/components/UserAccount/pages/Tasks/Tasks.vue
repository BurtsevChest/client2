<template>
   <div class="Tasks flex flex-column">
      <div class="flex mb-20">
         <div class="flex flex-col-8">
            <div class="flex-col flex a-items-center">
            <button @click="openAddTaskView" class="Tasks-addTask-btn flex flex-center a-items-center">
               <span class="material-icons Tasks-addTask-btn-icon">add</span>
            </button>
            </div>
            <div class="flex-col flex a-items-center">
               <SearchField :placeholder="'Найти...'" @clickSearch="filterToString"/>
            </div>
            <div class="empty_flex"></div>
            <div class="flex a-self-end">
               <div class="flex-col">
                  <div class="select_tab" :class="{'active' : activeTab === 'my'}" @click="setTab('my')">
                     Мои
                  </div>
               </div>
               <div class="flex-col">
                  <div class="select_tab" :class="{'active' : activeTab === 'from'}" @click="setTab('from')">
                     От меня
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="flex">
         <div class="flex-col flex-col-8 flex flex-noGutter flex-column Tasks-itemsWrapper">
            <div v-if="tasks" class="flex flex-noGutter flex-column">
               <TaskItems
                  :Tasks = "returnTasks"
                  @onClickTask = OpenTask
                  :itemClass="'Tasks-item'"
                  :activeItemClass = "'Tasks-item-active'"
               />
            </div>
            <p v-else class="user_account-h2">Задач нет</p>
         </div>
         <div class="flex-col flex flex-column">
            <div class="flex-col">
               <PopupBtn :positionStyle="'Tasks-filter-popupDate'" :hideBtn=true>
                  <template v-slot:popupBtn>
                     <div class="flex box-shadow ph-10 pv-10 radius-block pointer a-items-center">
                        <span class="flex a-items-center material-icons">calendar_month</span>
                        <span class="flex a-items-center pl-10">По дате</span>
                     </div>
                  </template>
                  <template v-slot:popupTemplate>
                     <v-date-picker mode="date" v-model="dateToFilter" @dayclick="setDate"/>
                  </template>
               </PopupBtn>
            </div>
            <div class="flex-col">
               <div class="greyBlock radius-block ph-10 pv-16">
                  По Создателю
               </div>
            </div>
            <div class="flex-col">
               <div class="greyBlock radius-block ph-10 pv-16">
                  По Команде
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTasks, openTask, filterTaskOnDate, filterTaskOnResponsible } from '@/websync/tasks';
import { openDialog } from '@/components/Common/modalView';
import TaskItems from '@/components/UserAccount/Common/TaskItems/TaskItems.vue';

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
         dateToFilter: ''
      }
   },
   methods: {
      OpenTask(task) {
         openTask(task)
      },
      openAddTaskView() {
         openDialog({template: 'components/Common/modalView/templates/AddTaskView.vue'});
      },
      setTab(name) {
         this.activeTab = name;
         filterTaskOnResponsible(name);
      },
      filterToString(text) {
         console.log(text);
      },
      setDate(date) {
         this.dateToFilter = date;
         filterTaskOnDate(date.date);
      }
   },
   computed: mapGetters(["returnTasks"]),
   beforeMount() {
      getTasks()
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