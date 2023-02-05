export default {
   actions: {},
   mutations: {
      closeModalView(state) {
         state.ModalViewStatus = false
         state.ModalViewTemplate = ''
         state.config = ''
      },
      openModalView(state, options) {
         import('@/' + options.template).then((res)=>{
            state.ModalViewTemplate = res.default
            state.ModalViewStatus = true
            state.config = options.options
         })
      }
   },
   state: {
      ModalViewStatus: false,
      ModalViewTemplate: '',
      config: null
   },
   getters: {
      getModalViewStatus(state) {
         return state.ModalViewStatus
      },
      getModalViewTemplate(state) {
         return state.ModalViewTemplate
      },
      getModalViewConfig(state) {
         return state.config
      }
   }
}