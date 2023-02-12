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
         Tasks.getSubTasks(task_id).then((res) => {
            state.commit('setSubTasks', res.data)
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