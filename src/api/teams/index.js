import AxiosRequest from '@/api/index';

class Teams {
   async getTeams(param) {
      return await AxiosRequest.post('login', JSON.stringify(param));
   }
}

export default new Teams()