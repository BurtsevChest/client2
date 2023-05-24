
export default {
   actions: {},
   mutations: {},
   state: {
      taskReglaments: [
         {
            name: 'Задача в разработку',
         },
         {
            name: 'Поручение',
         },
         {
            name: 'Разработка API',
         },
         {
            name: 'Компоненты'
         },
         {
            name: 'Андрей дай урл'
         },
         {
            name: 'Новый лендинг'
         },
         {
            name: 'Pull Request'
         }
      ]
   },
   getters: {
      taskReglaments(state) {
         return state.taskReglaments;
      }
   }
}