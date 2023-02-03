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
      <div class="Tasks-itemsWrapper">
         <div class="flex flex-column">
            <div v-for="item in tasks" v-bind:key="item.task_id" class="flex-col flex-col-8">
               <div @click="openTask(item)" class="Tasks-item greyBlock">
                  <h2 class="Tasks-item-title">{{ item.title }}</h2>
                  <p class="Tasks-item-desc">{{ item.description }}</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Tasks from '@/api/task/index.js';
import {mapMutations} from 'vuex'

export default {
   // eslint-disable-next-line
   name: "",
   data() {
      return {
         tasks: [],
         params: {
            userId: 4
         },
         filterString: '',
         filteredArr: [],
         activeTab: 'my'
      }
   },
   methods: {
      ...mapMutations(['openTask', 'openAddTaskView']),
      setTab(name) {
         this.activeTab = name
      },
      getTask() {
         Tasks.getTasks(this.params.userId).then((res)=> {
            this.tasks = res.data
         })
      }
   },
   computed: {
      filterList() {
         let filt = this.filterString
         return this.tasks.filter((item) => {
            if( filt === '') return true
            else return item.title.includes(this.filterString) || item.description.includes(this.filterString)
         })
      }
   },
   mounted() {
      // this.filterList
   },
   beforeMount() {
      this.getTask()
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
   }

   &-item {
      &-title {
         font-size: 25px;
      }

      &-desc {
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
      }
   }
}

.empty_flex {
   flex: 1 1 0%;
}
</style>