// придумать защиту от дурака при повторном открытии RightAside с теми же параметрами (мешает Proxy)

const ANIMATION_TIMEOUT = 300;

export default {
   actions: {},
   mutations: {
      close(state) {
         state.status = false
         setTimeout(() => {
            state.openedTemplate = ''
            state.config = ''
         }, ANIMATION_TIMEOUT);
      },
      openRightAside(state, options) {
         state.templateSRC = options.template;
         state.openedTemplate = '';
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
      templateSRC: '',
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