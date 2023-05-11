import taskNotice from '@/components/Common/Notification/templates/taskNotice.vue';
import taskDeadline from '@/components/Common/Notification/templates/taskDeadline.vue';

const TASKS_URL = '/user_account/tasks';
const NOTICE_SOUND = 'components/UserAccount/pages/Home/resources/images/users/notice_sound_4.mp3'

const timeTask = {
   task_id: 5,
   creator_title: 'Джейсон ХренЗавалишь Стетхем',
   title: 'Тестовый таск',
   description: "тестим канбану",
   creator_id: 523,
   responsible_id: '',
   date_of_creation: new Date(),
   date_of_completion: new Date(),
   parent_id: null,
   status_task_id: null
}

export default {
   actions: {},
   mutations: {
      showNotice(state, opt) {
         switch(opt.event) {
            case 'SET_TASK':
               if(window.location.pathname != TASKS_URL) {
                  const audio = new Audio(require(`@/${NOTICE_SOUND}`));
                  audio.volume = 0.2;
                  audio.play();
                  state.data = opt.data;
                  state.template = taskNotice;
                  state.show = true;
               }
               break;
            case 'task_deadline':
               state.data = opt.data;
               state.template = taskDeadline;
               state.show = true;
               break;
         }
      },
      closeNotice(state) {
         state.data = null;
         state.template = null;
         state.show = false;
      },
      showNoticeTime(state) {
         if(window.location.pathname != TASKS_URL) {
            const audio = new Audio(require(`@/${NOTICE_SOUND}`));
            audio.volume = 0.2;
            audio.play();
            state.data = timeTask;
            state.template = taskNotice;
            state.show = true;
         }
      },
      hideNotificate(state) {
         state.showNotificate = false;
      },
      playNotice() {
         console.log('hello');
         
      }
   },
   state: {
      show: false,
      template: {},
      data: {}
   },
   getters: {
      showNotificate(state) {
         return state.show;
      },
      noticeTemplate(state) {
         return state.template;
      },
      noticeData(state) {
         return state.data;
      }
   }
}
