import store from "@/store";
let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export function getTasks() {
   if(USER.user_id) {
      store.dispatch('getTask', USER.user_id).then((res) => {
         if(res.data) {
            filterTasks();
         } else {
            filterTasks();
         }
      });
   }
}

export function updateTask(task) {
   if(task) {
      store.dispatch('updateTask', task)
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

// set filters
function filterTasks() {
   store.commit('filterTasks', USER.user_id)
}

export function filterOnDate(date) {
   store.commit('setFilterDate', date);
   filterTasks();
}

export function filterOnTab(tab) {
   store.commit('setFilterTab', tab);
   filterTasks();
}

export function filterOnText(text) {
   store.commit('setFilterText', text);
   filterTasks();
}

// clear filters
export function clearDateFilter() {
   store.commit('clearDateFilter');
   filterTasks();
}

export function clearTextFilter() {
   store.commit('clearFilterText');
   filterTasks();
}

export function setNewMessage(message) {
   // хардкод, ибо опять же я хз в каком виде msg передавать будем
   var msg = {
      user_id: USER.user_id,
      text: message
   }
   store.commit('setNewMessage', msg)
}

export function getTaskMessages(task_id) {
   if(task_id) {
      store.dispatch('getTaskMessages', task_id).then((res) => {
         store.commit('setTaskMessages', res);
      })
   }
}
