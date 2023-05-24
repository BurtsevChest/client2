import AxiosRequest from '@/api/index';

class User {
   async signUp(param) {
      return await AxiosRequest.post('login', JSON.stringify(param));
   }

   async login() {
      return await AxiosRequest.post('loginCheck');
   }

   async logout() {
      return await AxiosRequest.post('logout');
   }

   async getCommandUsers() {
      return await AxiosRequest.get('userOnTeam/1');
   }

   async setGitLabToken(token) {
      return await AxiosRequest.post('addTokenGitLab', JSON.stringify({tokenGitLab: token}))
   }
}

export default new User()