<template>
   <div class="Tasks flex flex-column">
      <div class="flex">
         <div class="flex flex-col-8">
            <div class="flex-col">
            <button @click="openAddTaskView" class="Tasks-addTask-btn flex flex-center a-items-center mb-16">
               <span class="material-icons Tasks-addTask-btn-icon">add</span>
            </button>
            </div>
            <div class="flex-col">
               <input type="text" class="input" @input="filterList" v-model.trim="filterString" placeholder="Найти по тексту">
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
            <div v-if="returnTasks" class="flex flex-noGutter flex-column">
               <TaskItems
                  :Tasks = "returnTasks"
                  @onClickTask = openTask
               />
            </div>
            <p v-else class="user_account-h2">Задач нет</p>
         </div>
         <div class="flex-col flex flex-column">
            <div class="flex-col">
               <div class="greyBlock ph-10 pv-16">
                  По Дате
               </div>
            </div>
            <div class="flex-col">
               <div class="greyBlock ph-10 pv-16">
                  По Создателю
               </div>
            </div>
            <div class="flex-col">
               <div class="greyBlock ph-10 pv-16">
                  По Команде
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTasks } from '@/websync/tasks';
import { openDialog } from '@/components/Common/modalView';
import { openRightAside } from '@/components/UserAccount/RightAside/index';
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';
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
         activeTask: '',
         tasks: []
      }
   },
   methods: {
      openTask(task) {
         this.activeTask = task
         openRightAside({
            template: 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue',
            options: task
         })
      },
      openAddTaskView() {
         openDialog({
            template: 'components/Common/modalView/templates/AddTaskView.vue'
         })
      },
      setTab(name) {
         this.activeTab = name
      },
      convertDates() {
         this.tasks.forEach((item) => {
            item.date_of_creation = new Date(item.date_of_creation)
            item.date_of_creation = dateToNumbers(item.date_of_creation)
         })
      }
   },
   computed: mapGetters(["returnTasks"]),
   beforeMount() {
      getTasks()
   },
   mounted() {
      this.tasks = this.returnTasks
      this.convertDates()
   }
}
</script>

<style lang="less" scoped>
.Tasks {
   height: 100%;
   flex-wrap: unset;

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
      border-radius: 10px;
      transition: 0.2s;
      &:hover, &:focus {
         background: #f1f5f9;
      }

      &.active {
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
}

.empty_flex {
   flex: 1 1 0%;
}
</style>