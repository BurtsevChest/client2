import User from "@/api/user"

export default {
   actions: {
      getUsersList(state) {
         // Кэшируем список прилетевших юзеров. Кэш сбросится, когда пользователь обновит страницу
         if(!state.state.CommandUsersList) {
            User.getCommandUsers().then((res) => {
               state.commit('setCommandUsersList', res.data)
            })
         }
      }
   },
   mutations: {
      setUser(state, user) {
         state.user = user
      },
      setCommandUsersList(state, userList) {
         state.CommandUsersList = userList
      }
   },
   state: {
      user: {},
      CommandUsersList: ''
   },
   getters: {
      getUser(state) {
         return state.user
      },
      getUsersCommandList(state) {
         return state.CommandUsersList
      }
   }
}