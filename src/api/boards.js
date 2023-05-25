import AxiosRequest from '@/api/index';

class BoardsApi {
   async getBoards(param) {
      return await AxiosRequest.get(`boards/${param}`);
   }
}

export default new BoardsApi()