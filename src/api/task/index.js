import axios from 'axios'

const API_URL = 'http://localhost:5763/apiV0/'

class Tasks {
   async getTasks(param) {
      return await axios.get(`${API_URL}task/${param}`, JSON.stringify(param), { headers: { 
         "Content-Type": "application/json",
         "Authorization": "Bearer " + localStorage.token 
      } })
   }

   async setTask(param) {
      return await axios.post(`${API_URL}task`, JSON.stringify(param), {
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token 
         }
      })
   }
}

export default new Tasks()