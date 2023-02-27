import Tasks from '@/api/task/index.js';
import { generateDate } from '@/components/Common/helpers/dateToNumbers';
import { openRightAside } from '@/components/UserAccount/RightAside';

const TASK_TEMPLATE = 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue';

export default {
   actions: {
      getTask(state, userId) {
         return new Promise((resolve, reject) => {
            if(state.getters.returnTasks.length === 0) {
               Tasks.getTasks(userId).then((res)=>{
                  state.commit('setTasks', generateDate(res.data));
                  if(res.data) {
                     resolve(true)
                  } else {
                     reject(false)
                  }
               });
            }
         })
      },
      SOCKET_SETTASK(state, task) {
         state.commit('setOneTask', task);
      },
      setTask(state, task) {
         Tasks.setTask(task);
      },
      getSubTasks(state, task_id) {
         return new Promise(function(resolve, reject) {
            Tasks.getSubTasks(task_id).then((res) => {
               if(res.data) {
                  state.commit('setSubTasks', generateDate(res.data));
                  resolve(true);
               } else {
                  state.commit('setSubTasks', []);
                  reject(false);
               }
            })
         })
      },
      openTask(state, task) {
         if(state.getters.returnOpenedTaskId != task.task_id) {
            state.dispatch('getSubTasks', task.task_id).then(res => {
               if(res) {
                  state.commit('setopenedTaskId', task.task_id);
                  openRightAside({
                     template: TASK_TEMPLATE,
                     options: { task }
                  })
               }
            })
         }
      },
      
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks,
         state.filteredTasks = Tasks
      },
      setOneTask(state, Task) {
         state.tasks.unshift(Task),
         state.filteredTasks.unshift(Task)
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
      filterTaskOnDate(state, date) {
         state.filteredTasks = state.filteredTasks.filter((item) => {
            var taskDate = new Date(item.date_of_completion);
            if(taskDate <= date) {
               return true;
            } else {
               return false;
            }
         })
      },
      filterTaskOnResponsible(state, params) {
         state.filteredTasks = state.tasks.filter((item) => {
            if(params.filterRule === 'my') {
               if(params.user_id === item.responsible_id) {
                  return true;
               } else {
                  return false;
               }
            }
            if(params.filterRule === 'from') {
               if(params.user_id === item.creator_id) {
                  return true;
               } else {
                  return false;
               }
            }
         })
      }
   },
   state: {
      tasks: [],
      filteredTasks: [],
      subTask: [],
      openedTaskId: '',
      filterRules: {
         onDate: false,
         onCommand: false,
         onCreator: false,
         onResponsible: true
      }
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
      }
   }
}