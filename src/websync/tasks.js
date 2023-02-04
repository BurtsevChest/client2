import store from "@/store";

// const CHECK_USER = localStorage.user.userId && localStorage.token;

export function getTasks() {
   if(localStorage.user_id && localStorage.token) {
      store.dispatch('getTask', localStorage.user_id)
   }
}

// Создаем таск и обновляем список тасков у себя
export function setTask(task) {
   if(task && localStorage.user_id && localStorage.token) {
      store.dispatch('setTask', task).then(() => {
         store.dispatch('getTask', localStorage.user_id);
      })
   }
}

// Редачим задачу и обновляем у себя
export function updateTask(task) {
   if(task && localStorage.user_id && localStorage.token) {
      store.dispatch('updateTask', task).then(() => {
         store.dispatch('getTask', localStorage.user_id);
      })
   }
}
