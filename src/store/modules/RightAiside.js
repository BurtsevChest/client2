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
      newClose(state) {
         return new Promise((resolve)=> {
            state.status = false;
            setTimeout(() => {
               state.openedTemplate = '';
               state.config = '';
               resolve()
            }, ANIMATION_TIMEOUT);
         })
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
      },
      openAsideNew(state, options) {
         let openNewAside = true;
         let changeAside = false;

         state.openedAsides.forEach((item) => {
            if((item.opener === options.opener) || options.opener === null) {
               openNewAside = false;
               if(options.templateProps && (item.templateProps != options.templateProps)) {
                  changeAside = true;
               }
            }
         });

         if(openNewAside) {
            if(state.openedAsides.length > 0) {
               state.zindex = state.zindex + 1;
            }
            import('@/' + options.template)
                .then((res)=>{
                  state.openedAsides.push({
                     status: true,
                     openedTemplate: res.default,
                     opener: options.opener,
                     templateProps: options.templateProps,
                     zindex: state.zindex
                  })
               });
         }

         if(changeAside) {
            state.openedAsides = state.openedAsides.map((item) => {
               if((item.opener === options.opener) || options.opener === null) {
                  item.templateProps = options.templateProps;
                  if(item.zindex < state.zindex) {
                     state.zindex = state.zindex + 1;
                     item.zindex = state.zindex;
                  }
               }
               return item;
            })
         }
      },
      closeAsideNew(state, opener) {
         state.openedAsides.forEach((item, index) => {
            if(item.opener === opener) {
               item.status = false;
               setTimeout(() => {
                  state.openedAsides.splice(index, 1);
                  return;
               }, ANIMATION_TIMEOUT)
            }
         })
         if(state.openedAsides.length === 0) {
            state.zindex = 100;
         }
      }
   },
   state: {
      openedAsides: [],
      status: false,
      openedTemplate: null && HTMLTemplateElement,
      templateSRC: '',
      config: {},
      zindex: 100
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
      },
      getAsides(state) {
         return state.openedAsides
      }
   }
}