import store from "@/store";
import { getUser } from "@/components/Common/helpers/user";
import {openAside} from '@/components/UserAccount/RightAside/index.js';

export function getTasks() {
   if(store.getters.returnTasks.length === 0) {
      store.dispatch('getTask', getUser().user_id)
      .then((taskList) => {
         store.commit('setTasks', taskList);
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

// Open/Close Task
export function openTask(task, opener) {
   openAside({
      template: 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue',
      opener,
      templateProps: {
         task
      }
   })
}

export function closeTask(task) {
   store.commit('close');
   store.commit('closeTask', task);
}
