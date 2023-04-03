import AxiosRequest from '@/api/index';

class Teams {
   async getTeams(param) {
      return await AxiosRequest.post('someUrl', JSON.stringify(param));
   }

   async createTeam(team) {
      return await AxiosRequest.post('someUrl', JSON.stringify(team));
   }
}

export default new Teams()