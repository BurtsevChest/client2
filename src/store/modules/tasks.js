import Tasks from '@/api/task/index.js';

const emptyArr = [];

export default {
   actions: {
      updateTask(state, task) {
         return new Promise((resolve, reject) => {
            Tasks.updateTask(task)
            .then((res) => {
               resolve(res.data)
            })
            .catch((err) => {
               reject(err)
            })
         })
      },
      getTask(state, userId) {
         return new Promise((resolve, reject) => {
            Tasks.getTasks(userId)
            .then((res)=>{
               resolve(res.data)
            })
            .catch((err) => {
               reject(err)
            });
         })
      },
      getParentTask(state, task_id) {
         return new Promise((resolve, reject) => {
            if(!task_id) {
               state.commit('setParentTask', emptyArr);
               resolve(true)
               return
            }
            Tasks.getOneTask(task_id)
            .then((res) => {
               state.commit('setParentTask', res.data);
               resolve(true)
            })
            .catch(() => {
               state.commit('setParentTask', emptyArr);
               reject(false)
            })
         })
      },
      setTask(state, task) {
         return new Promise((resolve, reject) => {
            Tasks.setTask(task)
            .then(res=> {
               resolve(res.data)
            })
            .catch((err) => {
               reject(err)
            });
         })
      },
      getSubTasks(state, task_id) {
         return new Promise(function(resolve, reject) {
            Tasks.getSubTasks(task_id)
            .then((res) => {
               if(res.data) {
                  state.commit('setSubTasks', res.data);
                  resolve(true);
               } else {
                  state.commit('setSubTasks', emptyArr);
                  reject(false);
               }
            })
         })
      }
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks,
         state.filteredTasks = Tasks
      },
      setOneTask(state, Task) {
         state.tasks.unshift(Task)
      },
      setSubTasks(state, subTasks) {
         state.subTask = subTasks
      },
      setopenedTaskId(state, id) {
         state.openedTaskId = id
      },
      closeTask(state) {
         state.openedTaskId = '';
      },
      filterTasks(state, user_id) {
         state.filteredTasks = state.tasks.filter((item) => {
            for(var key in state.filterRules) {
               // Фильтр по дате
               if(state.filterRules.date_of_completion != undefined && key != undefined) {
                  const date = new Date(item.date_of_completion).getTime();
                  const filterDate = new Date(state.filterRules.date_of_completion).getTime();
                  if(filterDate <= date) {
                     return false;
                  }
               }
               // Если я ответственный
               if(state.filterRules.tabFilter === 'my') {
                  if(item.responsible_id != user_id) {
                     return false;
                  }
               }
               // Если я создатель
               if(state.filterRules.tabFilter === 'from') {
                  if(item.creator_id != user_id) {
                     return false;
                  }
               }
               // Поиск по тексту
               if(state.filterRules.filterText != '') {
                  if(!(item.title.toLowerCase().includes(state.filterRules.filterText.toLowerCase()) || item.description.toLowerCase().includes(state.filterRules.filterText.toLowerCase()))) {
                     return false;
                  }
               }
            }
            return true;
         })
      },
      // Задачем фильтры
      setFilterDate(state, date) {
         state.filterRules.date_of_completion = date;
      },
      setFilterTab(state, tab) {
         state.filterRules.tabFilter = tab;
      },
      setFilterText(state, text) {
         state.filterRules.filterText = text;
      },
      // Чистка фильтров
      clearFilterText(state) {
         state.filterRules.filterText = '';
      },
      clearDateFilter(state) {
         state.filterRules.date_of_completion = undefined;
      },
      setParentTask(state, task) {
         state.parentTask = task
      },
      addChildrenTask(state, task) {
         state.subTask.push(task)
      },
      setUpdatedTask(state, task) {
         state.filteredTasks = state.filteredTasks.map((item)=>{
            if(item.task_id === task.task_id) {
               item = task
            }
            return item
         })
      }
   },
   state: {
      tasks: [],
      filteredTasks: [],
      subTask: [],
      openedTaskId: '',
      filterRules: {
         date_of_completion: undefined,
         tabFilter: 'my',
         filterText: ''
      },
      parentTask: {},
      taskReglaments: [
         {
            name: 'Задача в разработку',
         },
         {
            name: 'Поручение',
         },
         {
            name: 'Разработка API',
         },
         {
            name: 'Компоненты'
         },
         {
            name: 'Андрей дай урл'
         }
      ]
   },
   getters: {
      returnTasks(state) {
         return state.filteredTasks
      },
      returnSubTasks(state) {
         return state.subTask
      },
      returnOpenedTaskId(state) {
         return state.openedTaskId
      },
      parentTask(state) {
         return state.parentTask
      },
      taskReglaments(state) {
         return state.taskReglaments;
      }
   }
}