import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './components/Common/global'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

const app = createApp(App, {
   store
})

app
   .use(store)
   .use(router)
   .use(VCalendar)
   .mount('#app')

global.forEach(element => {
   app.component(element.name, element)
});

export default app;