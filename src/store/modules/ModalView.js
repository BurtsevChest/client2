import modalView from'@/components/Common/modalView/templates/AddTaskView.vue'

export default {
   actions: {},
   mutations: {
      closeModalView(state) {
         state.ModalViewStatus = false
         state.ModalViewTemplate = ''
      },
      openAddTaskView(state, cfg) {
         state.ModalViewTemplate = modalView,
         state.ModalViewStatus = true,
         state.config = cfg
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