import User from "@/api/user";
import AxiosRequest from '@/api/index';

export default {
   actions: {
      async authUser() {
         const response = await AxiosRequest.get(`${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_MAIN_API}/apiV0/refresh`, { withCredentials: true });
         localStorage.setItem('accessToken',  response.data.accessToken);
         AxiosRequest.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            console.log(config.headers);
            return config;
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