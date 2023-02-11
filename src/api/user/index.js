import API from '@/api/index';

class User {
   async signUp(param) {
      return await API.post('login', JSON.stringify(param));
   }

   async getCommandUsers() {
      return await API.get('userOnTeam/1');
   }
}

export default new User()