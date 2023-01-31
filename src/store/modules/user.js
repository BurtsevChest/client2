export default {
   actions: {},
   mutations: {
      setUser(state, user) {
         state.user = user
      }
   },
   state: {
      user: {}
   },
   getters: {
      getUser(state) {
         return state.user
      }
   }
}