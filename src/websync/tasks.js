import store from "@/store";

let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export function getTasks() {
   if(USER.user_id) {
      store.dispatch('getTask', USER.user_id).then((res) => {
         if(res) {
            store.commit('filterTaskOnResponsible', {user_id: USER.user_id, filterRule: 'my'});
         }
      });
   }
}

export function setTask(task) {
   if(task && USER.user_id) {
      store.dispatch('setTask', task)
   }
}

export function openTask(task) {
   store.dispatch('openTask', task)
}

export function closeTask(task) {
   store.commit('close');
   store.commit('closeTask', task);
}

export function filterTaskOnDate(date) {
   store.commit('filterTaskOnDate', date);
}

export function filterTaskOnResponsible(param) {
   store.commit('filterTaskOnResponsible', {user_id: USER.user_id, filterRule: param} );
}