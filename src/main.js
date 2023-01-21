import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './components/Common/global'

const app = createApp(App, {
   store
})

app.use(store).use(router).mount('#app')

global.forEach(element => {
   app.component(element.name, element)
})

