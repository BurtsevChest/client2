import Vuex from 'vuex'
import RightAiside from './modules/RightAiside'
import ModalView from './modules/ModalView'

export default new Vuex.Store({
   modules: {
      RightAiside,
      ModalView
   }
})