// отказ от proxy
import {defineAsyncComponent, markRaw} from "vue";

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
      // в config можно прокинуть все необходимые данные для компонента(замена props) и сразу расчехлить в data()
      openTask(state, cfg) {
         state.status = true
         state.openedTemplate = markRaw(defineAsyncComponent(()=>import ('@/components/RightAside/templates/taskPage/taskPage.vue')))
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