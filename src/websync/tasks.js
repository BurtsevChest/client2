import store from "@/store";

let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export function getTasks() {
   if(USER.user_id) {
      store.dispatch('getTask', USER.user_id)
   }
}

export function setTask(task) {
   if(task && USER.user_id) {
      store.dispatch('setTask', task)
   }
}

export function updateTask(task) {
   if(task && USER.user_id) {
      store.dispatch('updateTask', task).then(() => {
         store.dispatch('getTask', USER.user_id);
      })
   }
}
