import Tasks from '@/api/task/index.js';
import { generateDate } from '@/components/Common/helpers/dateToNumbers';
import { openRightAside } from '@/components/UserAccount/RightAside';

const TASK_TEMPLATE = 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue';

export default {
   actions: {
      updateTask(task) {
         Tasks.updateTask(task)
      },
      getTask(state, userId) {
         if(state.getters.returnTasks.length === 0) {
            Tasks.getTasks(userId).then((res)=>{
               state.commit('setTasks', generateDate(res.data));
            });
         }
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
      }
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks
      },
      setOneTask(state, Task) {
         state.tasks.unshift(Task) 
      },
      setSubTasks(state, subTasks) {
         state.subTask = subTasks
      },
      clearSubTasks(state) {
         state.setSubTasks = []
      },
      setopenedTaskId(state, id) {
         state.openedTaskId = id
      }
   },
   state: {
      tasks: [],
      subTask: [],
      openedTaskId: ''
   },
   getters: {
      returnTasks(state) {
         return state.tasks
      },
      returnSubTasks(state) {
         return state.subTask
      },
      returnOpenedTaskId(state) {
         return state.openedTaskId
      }
   }
}