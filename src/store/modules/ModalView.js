export default {
   actions: {},
   mutations: {
      closeModalView(state) {
         state.ModalViewStatus = false
         state.ModalViewTemplate = ''
      },
      openModalView(state, template, options) {
         import('@/' + template).then((res)=>{
            state.ModalViewTemplate = res.default
            state.ModalViewStatus = true
            state.config = options
         })
      }
   },
   state: {
      ModalViewStatus: false,
      ModalViewTemplate: '',
      config: []
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