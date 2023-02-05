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
      /**
       * @param {*} cfg принимает любой набор данных, которые идут в date(), заменяет props
       * @result При клике на задачу открывает правый сайдбар с этой задачей
       */
      openTask(state, cfg) {
         state.status = true
         state.openedTemplate = markRaw(defineAsyncComponent(()=>import ('@/components/UserAccount/RightAside/templates/taskPage/taskPage.vue')))
         state.config = cfg
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