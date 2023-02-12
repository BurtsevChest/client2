export default {
   actions: {},
   mutations: {
      close(state) {
         state.status = false
         state.openedTemplate = ''
         state.config = ''
      },
      openRightAside(state, options) {
         import('@/' + options.template).then((res)=>{
            state.openedTemplate = res.default
            state.status = true
            state.config = options.options
         })
      }
   },
   state: {
      status: false,
      openedTemplate: '',
      config: []
   },
   getters: {
      getStatus(state) {
         return state.status
      },
      getOpenedTemplate(state) {
         return state.openedTemplate
      },
      getConfig(state) {
         return state.config
      }
   }
}