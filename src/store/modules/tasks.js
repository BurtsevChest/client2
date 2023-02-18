import Tasks from '@/api/task/index.js';
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
         Tasks.getTasks(userId).then((res)=>{
            state.commit('setTasks', res.data)
         })
      },
      setTask(state, task) {
         Tasks.setTask(task).then((res)=>{
            if(res.data.responsible_id === USER.user_id) {
               state.commit('setOneTask', res.data)
            }
         })
      },
      getSubTasks(state, task_id) {
         return new Promise(function(resolve, reject) {
            Tasks.getSubTasks(task_id).then((res) => {
               if(res.data) {
                  state.commit('setSubTasks', res.data)
                  resolve(res.data)
               }
            }).catch((err) => {
               reject(err)
            })
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
      }
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