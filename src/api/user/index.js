import axios from 'axios'

const API_URL = 'http://localhost:5763/apiV0/'

class User {
   async signUp(param) {
      return await axios.post(`${API_URL}login`, JSON.stringify(param), { headers: { 
         "Content-Type": "application/json"
      }})
   }

   async getCommandUsers() {
      return await axios.get(`${API_URL}userOnTeam/1`, { headers: { 
         "Content-Type": "application/json"
      }})
   }
}

export default new User()