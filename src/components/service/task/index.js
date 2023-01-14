import axios from 'axios'

const API_URL = 'http://localhost:5763/apiV0/'

class Tasks {
   async getTasks(param) {
      return await axios.get(`${API_URL}task`, JSON.stringify(param), { headers: { "Content-Type": "application/json" } })
   }
}

export default new Tasks()