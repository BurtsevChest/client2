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
      }
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks
      },
      setOneTask(state, Task) {
         state.tasks.push(Task) 
      }
   },
   state: {
      tasks: []
   },
   getters: {
      returnTasks(state) {
         return state.tasks
      }
   }
}