export default {
   actions: {},
   mutations: {
      closeFileReader(state) {
         state.type = null;
         state.files = null;
         state.show = false;
      },
      openFileReader(state, options) {
         state.type = options.type;
         state.files = options.files;
         state.show = true;
      }
   },
   state: {
      show: false,
      files: [],
      type: ''
   },
   getters: {
      fileReaderShow(state) {
         return state.show;
      },
      fileReaderFiles(state) {
         return state.files;
      },
      fileReaderType(state) {
         return state.type;
      }
   }
}