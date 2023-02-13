export default {
   actions: {},
   mutations: {
      close(state) {
         state.status = false
         setTimeout(() => {
            state.openedTemplate = ''
            state.config = ''
         }, 300);
      },
      openRightAside(state, options) {
         import('@/' + options.template).then((res)=>{
            state.openedTemplate = res.default
            state.config = options.options
         }).finally(() => {
            state.status = true
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