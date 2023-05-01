import Notification from '@/components/Common/Notification/Notification.vue';

const TASKS_URL = '/user_account/tasks';

class Notice {
   showNotice(event, data) {
      switch(event) {
         case 'SET_TASK':
            if(window.location.pathname != TASKS_URL) {
               this.setType('newtask');
               this.setNotice(data.task);
               this.openNotice();
            }
      }
   }

   openNotice() {
      Notification.methods.open();
   }

   hideNotice() {
      Notification.methods.hide();
   }

   setType() {
      Notification.methods.setType();
   }

   setNotice() {
      Notification.methods.setNotice();
   }

   showTask() {
      this.setType('task');
      
   }
}

export default new Notice()