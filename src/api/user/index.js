import AxiosRequest from '@/api/index';

class User {
   async signUp(param) {
      return await AxiosRequest.post('login', JSON.stringify(param));
   }

   async login() {
      return await AxiosRequest.post('loginCheck');
   }

   async getCommandUsers() {
      return await AxiosRequest.get('userOnTeam/1');
   }
}

export default new User()