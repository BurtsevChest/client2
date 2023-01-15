export default {
   actions: {},
   mutations: {
      open(state) {
         state.status = true
      },
      close(state) {
         state.status = false
      }
   },
   state: {
      status: false
   },
   getters: {
      getStatus(state) {
         return state.status
      }
   }
}