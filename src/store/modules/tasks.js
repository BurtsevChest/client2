import Tasks from '@/api/task/index.js';
import { generateDate } from '@/components/Common/helpers/dateToNumbers';

let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export default {
   actions: {
      updateTask(task) {
         Tasks.updateTask(task)
      },
      getTask(state, userId) {
         if(state.getters.returnTasks.length === 0) {
            setTimeout(() => {
               Tasks.getTasks(userId).then((res)=>{
                  state.commit('setTasks', generateDate(res.data));
               });
            }, 2000) 
         }
      },
      setTask(state, task) {
         Tasks.setTask(task).then((res)=>{
            if(res.data.responsible_id === USER.user_id) {
               state.commit('setOneTask', res.data)
            }
         })
      },
      getSubTasks(state, task_id) {
         Tasks.getSubTasks(task_id).then((res) => {
            if(res.data) {
               state.commit('setSubTasks', generateDate(res.data));
            }
         })
      }
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks
      },
      setOneTask(state, Task) {
         state.tasks.push(Task) 
      },
      setSubTasks(state, subTasks) {
         state.subTask = subTasks
      },
      clearSubTasks(state) {
         state.setSubTasks = []
      },
      filterResponsibleTask(state, param) {
         state.tasks.filter((item) => {
            if(param === 'my' && item.responsible_id === USER.user_id) {
               return true;
            }

            if(param === 'from' && item.creator_id === USER.user_id) {
               return true;
            }
            return false;
         })
      },
      
   },
   state: {
      tasks: [],
      subTask: []
   },
   getters: {
      returnTasks(state) {
         return state.tasks
      },

      returnSubTasks(state) {
         return state.subTask
      }
   }
}