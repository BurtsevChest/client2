export default {
   actions: {},
   mutations: {
      closeHeaderMenu(state) {
         state.headerStatus = false
      },
      openHeaderMenu(state) {
         state.headerStatus = true
      }
   },
   state: {
      headerStatus: false
   },
   getters: {
      HeaderStatus(state) {
         return state.headerStatus
      }
   }
}