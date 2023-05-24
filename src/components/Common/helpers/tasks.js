import {openAside} from '@/components/UserAccount/RightAside/index.js';

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
