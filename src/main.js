import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './components/Common/global'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import VueSocket from '@/vue_socket';

const app = createApp(App, {
   store
})

app
   .use(store)
   .use(router)
   .use(VCalendar)
   .use(VueSocket)
   .mount('#app')

global.forEach(element => {
   app.component(element.name, element)
})