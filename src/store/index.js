import Vuex from 'vuex'
import RightAiside from './modules/RightAiside'
import ModalView from './modules/ModalView'
import user from './modules/user'
import tasks from './modules/tasks'
import header from './modules/header'
import teams from './modules/teams'
import notification from './modules/notification'
import themes from './modules/themes'
import fileReader from './modules/fileReader'

export default new Vuex.Store({
   modules: {
      RightAiside,
      ModalView,
      user,
      tasks,
      header,
      teams,
      notification,
      themes,
      fileReader
   }
})