import Tasks from '@/api/task/index.js';

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
      setTask(task) {
         Tasks.setTask(task)
      }
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks
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