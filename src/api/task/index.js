import API from '@/api/index';

class Tasks {
   async getTasks(param) {
      return await API.get(`task/${param}`)
   }

   async setTask(task) {
      return await API.post('task', JSON.stringify({task}))
   }

   async updateTask(task) {
      return await API.put('task', JSON.stringify({task}))
   }
}

export default new Tasks()