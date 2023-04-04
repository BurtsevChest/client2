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

   async getSubTasks(task_id) {
      return await AxiosRequest.get(`subtask/${task_id}`)
   }

   async getOneTask(task_id) {
      return await AxiosRequest.get(`oneTask/${task_id}`)
   }

   async getTaskMessages(task_id) {
      return await AxiosRequest.get(`message/taskId${task_id}`)
   }
}

export default new Tasks()