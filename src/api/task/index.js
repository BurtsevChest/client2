import AxiosRequest from '@/api/index';

class Tasks {
   async getTasks(param) {
      return await AxiosRequest.get(`task/${param}`)
   }

   async setTask(task) {
      return await AxiosRequest.post('task', JSON.stringify({task}))
   }

   async updateTask(task) {
      return await AxiosRequest.put('task', JSON.stringify({task}))
   }
}

export default new Tasks()