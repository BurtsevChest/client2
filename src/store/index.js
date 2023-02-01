import Vuex from 'vuex'
import RightAiside from './modules/RightAiside'
import ModalView from './modules/ModalView'
import user from './modules/user'

export default new Vuex.Store({
   modules: {
      RightAiside,
      ModalView,
      user
   }
})