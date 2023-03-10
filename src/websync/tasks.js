import store from "@/store";
import { getUser } from "@/components/Common/helpers/user";
import { generateDateMonth, setOneTaskDate, setOneTaskMonthDate } from '@/components/Common/helpers/dateToNumbers';
import { openRightAside, closeRightAside } from '@/components/UserAccount/RightAside';

const TASK_TEMPLATE = 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue';

export function getTasks() {
   if(store.getters.returnTasks.length === 0) {
      store.dispatch('getTask', getUser().user_id)
      .then((taskList) => {
         store.commit('setTasks', generateDateMonth(taskList));
         filterTasks();
      });
   }
}

export function updateTask(task) {
   store.dispatch('updateTask', task)
   .then((updatedTask) => {
      store.commit('setUpdatedTask', setOneTaskMonthDate(updatedTask))
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
   store.commit('setOneTask', setOneTaskDate(task));
   filterTasks()
}

// Open/Close Task
export function openTask(task) {
   if(store.getters.returnOpenedTaskId != task.task_id) {
      const allToLoadTask = [
         store.dispatch('getSubTasks', task.task_id),
         store.dispatch('getParentTask', task.parent_id)
      ]

      Promise.all(allToLoadTask)
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

// Task messages
export function setNewMessage(message) {
   store.commit('setNewMessage', message)
}

export function getTaskMessages(task_id) {
   if(task_id) {
      store.dispatch('getTaskMessages', task_id).then((res) => {
         store.commit('setTaskMessages', res);
      })
   }
}
