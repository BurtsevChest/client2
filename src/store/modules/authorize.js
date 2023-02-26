import AxiosRequest from '@/api/index';

export default {
   actions: {
   },
   mutations: {
      registerUser(state, response) {
         localStorage.setItem('accessToken', response.data.accessToken);
         AxiosRequest.headers["Authorization"] = `Bearer ${response.data.access_token}`;
         state.isAuthorize = true;
         state.isAuthorize = response.data.user;
      }
   },
   state: {
      isAuthorize: false,
      user: {}
   },
   getters: {
      user(state) {
         return state.user
      },
      IfAuthorize(state) {
         return state.IsAuthorize
      }
   }
}