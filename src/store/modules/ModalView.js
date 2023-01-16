import modalView from'@/components/Common/modalView/templates/AddTaskView.vue'

export default {
   actions: {},
   mutations: {
      closeModalView(state) {
         state.ModalViewStatus = false
         state.ModalViewTemplate = ''
      },
      openAddTaskView(state) {
         state.ModalViewTemplate = modalView,
         state.ModalViewStatus = true
      }
   },
   state: {
      ModalViewStatus: false,
      ModalViewTemplate: ''
   },
   getters: {
      getModalViewStatus(state) {
         return state.ModalViewStatus
      },
      getModalViewTemplate(state) {
         return state.ModalViewTemplate
      }
   }
}