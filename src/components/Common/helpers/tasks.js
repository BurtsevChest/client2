import Task from '@/api/task';
import {openAside} from '@/components/UserAccount/RightAside/index.js';

export function getOneTask(task_id) {
   return new Promise((resolve, reject) => {
      Task.getOneTask(task_id).then((res) => {
         resolve(res.data);
      }).catch((err) => {
         reject(err);
      })
   })
}

export function getSubTaskList(task_id) {
   return new Promise((resolve, reject) => {
      Task.getSubTasks(task_id).then((res) => {
         resolve(res.data);
      }).catch((err) => {
         reject(err);
      })
   })
}

export function openTask(task, opener) {
   openAside({
      template: 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue',
      opener: opener,
      templateProps: {
         task
      }
   })
}

export function openAddTask(options, opener) {
   openAside({
      template: 'components/UserAccount/Common/AddTaskPage/AddTaskPage.vue',
      opener: opener,
      templateProps: options
   })
}
