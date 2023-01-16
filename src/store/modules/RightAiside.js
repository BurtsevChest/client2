// делаем импорты шаблонов для rightAside
import taskPage from '@/components/RightAside/templates/taskPage/taskPage.vue'

export default {
   actions: {},
   mutations: {
      close(state) {
         state.status = false
         // чистим rightAside
         state.openedTemplate = ''
         state.config = ''
      },
      // заводим мутации для различных шаблонов и прокидываем конфиг, если нужно
      openTask(state, cfg) {
         state.status = true
         state.openedTemplate = taskPage
         state.config = cfg
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