import store from "@/store";

// В LocalSrorage хранится юзер в виде JSON
const USER = JSON.parse(localStorage.user)

export function getTasks() {
   if(USER.user_id && USER.token) {
      store.dispatch('getTask', USER.user_id)
   }
}

// Создаем таск и обновляем список тасков у себя
export function setTask(task) {
   if(task && USER.user_id && USER.token) {
      store.dispatch('setTask', task).then(() => {
         store.dispatch('getTask', USER.user_id);
      })
   }
}

// Редачим задачу и обновляем у себя
export function updateTask(task) {
   if(task && USER.user_id && USER.token) {
      store.dispatch('updateTask', task).then(() => {
         store.dispatch('getTask', USER.user_id);
      })
   }
}
