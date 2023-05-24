import User from "@/api/user";
import AxiosRequest from '@/api/index';

export default {
   actions: {
      authUser(state) {
         User.login()
            .then((res) => {
               const data = res.data;
               state.commit('setUser', data.user);
               localStorage.accessToken = data.accessToken;
               AxiosRequest.headers.Authorization = `Bearer ${data.accessToken}`;
               state.commit('setAuth', true);
            })
            .catch(() => {
               state.commit('setUser', {});
               localStorage.removeItem('accessToken')
               AxiosRequest.headers.Authorization = ` `;
               state.commit('setAuth', false);
            })
      },
      getUsersList(state) {
         if(!state.state.CommandUsersList) {
            User.getCommandUsers().then((res) => {
               state.commit('setCommandUsersList', res.data)
            })
         }
      },
      loginUser(state, param) {
         User.signUp(param)
         .then((res) => {
            const data = res.data;
            state.commit('setUser', data.user);
            localStorage.accessToken = data.accessToken;
            AxiosRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            state.commit('setAuth', true);
         })
      }
   },
   mutations: {
      setUser(state, user) {
         state.user = user
      },
      setCommandUsersList(state, userList) {
         state.CommandUsersList = userList
      },
      setAuth(state, value) {
         state.ifAuthenticated = value
      }
   },
   state: {
      user: {},
      CommandUsersList: '',
      ifAuthenticated: false
   },
   getters: {
      getUser(state) {
         return state.user
      },
      getUsersCommandList(state) {
         return state.CommandUsersList
      },
      ifAuthenticated(state) {
         return state.ifAuthenticated
      }
   }
}