import store from "@/store";
import { getUser } from "@/components/Common/helpers/user";
import { openRightAside, closeRightAside } from '@/components/UserAccount/RightAside';

const TASK_TEMPLATE = 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue';

export function getTasks() {
   if(store.getters.returnTasks.length === 0) {
      store.dispatch('getTask', getUser().user_id)
      .then((taskList) => {
         store.commit('setTasks', taskList);
         filterTasks();
      });
   }
}

export function updateTask(task) {
   store.dispatch('updateTask', task)
   .then((updatedTask) => {
      store.commit('setUpdatedTask', updatedTask)
   })
}

export function setTask(task) {
   if(task) {
      store.dispatch('setTask', task)
      .catch(() => {
         alert('Неизвестная ошибка')
      })
   }
}

export function SocketGetTask(task) {
   store.commit('setOneTask', task);
   filterTasks()
}

// Open/Close Task
export function openTask(task) {
   if(store.getters.returnOpenedTaskId != task.task_id) {
      Promise.all([
         store.dispatch('getSubTasks', task.task_id),
         store.dispatch('getParentTask', task.parent_id)
      ])
      .then(()=> {
         store.commit('setopenedTaskId', task.task_id);
         openRightAside({template: TASK_TEMPLATE, options:{ task }});
      })
      .catch(()=>{
         closeRightAside();
         alert('Ошибка загрузки данных');
      })
   }
}

export function closeTask(task) {
   store.commit('close');
   store.commit('closeTask', task);
}

// Задаем фильтры
// Пофиксить фильтр при переходе между страницами
function filterTasks() {
   store.commit('filterTasks', getUser().user_id)
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

// Чистим фильтры
export function clearDateFilter() {
   store.commit('clearDateFilter');
   filterTasks();
}

export function clearTextFilter() {
   store.commit('clearFilterText');
   filterTasks();
}
