import Tasks from '@/api/task/index.js';
import { setOneTaskDate, generateDateMonth } from '@/components/Common/helpers/dateToNumbers';
import { openRightAside } from '@/components/UserAccount/RightAside';

const TASK_TEMPLATE = 'components/UserAccount/RightAside/templates/taskPage/taskPage.vue';
const emptyArr = [];
let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

// Сделать промисы по-нормальному
export default {
   actions: {
      updateTask(state, task) {
         return new Promise((resolve, reject) => {
            Tasks.updateTask(task).then((res) => {
               if(res != undefined) {
                  resolve(res.data)
               }else {
                  throw new Error('asdasd')
               }
            })
            .catch((err)=>{
               reject(err)
            })
         })
      },
      getTask(state, userId) {
         return new Promise((resolve, reject) => {
            if(state.getters.returnTasks.length === 0) {
               Tasks.getTasks(userId).then((res)=>{
                  state.commit('setTasks', generateDateMonth(res.data));
                  if(res.data) {
                     resolve(true)
                  }
               });
            } else {
               reject(false)
            }
         })
      },
      getOneTask(state, task_id) {
         return new Promise((resolve, reject) => {
            Tasks.getOneTask(task_id).then((res) => {
               if(res.data) {
                  resolve(res.data)
               }
            }).catch(() => {
               reject(emptyArr)
            })
         })
      },
      SOCKET_SET_TASK(state, task) {
         state.commit('setOneTask', setOneTaskDate(task));
         if(state.getters.openedTaskId === task.parent_id) {
            state.commit('addChildrenTask', setOneTaskDate(task))
         }
         state.commit('filterTasks', USER.user_id)
      },
      setTask(state, task) {
         Tasks.setTask(task);
      },
      getSubTasks(state, task_id) {
         return new Promise(function(resolve, reject) {
            Tasks.getSubTasks(task_id).then((res) => {
               if(res.data) {
                  state.commit('setSubTasks', generateDateMonth(res.data));
                  resolve(true);
               } else {
                  state.commit('setSubTasks', []);
                  reject(false);
               }
            })
         })
      },
      openTask(state, task) {
         if(state.getters.returnOpenedTaskId != task.task_id) {
            state.dispatch('getSubTasks', task.task_id).then(() => {
               if(task.parent_id) {
                  state.dispatch('getOneTask', task.parent_id).then((res)=> {
                     state.commit('setParentTask', res);
                  }).catch((res)=> {
                     state.commit('setParentTask', res);
                  })
               }else {
                  state.commit('setParentTask', []);
               }
               state.commit('setopenedTaskId', task.task_id);
               openRightAside({template: TASK_TEMPLATE, options:{ task }});
            })
         }
      },
      SOCKET_SENDMESSAGE(state, message) {
         state.commit('setNewMessage', message)
      },
      getTaskMessages(state, task_id) {
         return new Promise((resolve, reject) => {
            Tasks.getTaskMessages(task_id).then((res) => {
               if(res.data) {
                  resolve(res.data);
               } else { 
                  reject(new Array());
               }
            }).catch(() => {
               reject(new Array()); 
            })
         })
      }
   },
   mutations: {
      setTasks(state, Tasks) {
         state.tasks = Tasks,
         state.filteredTasks = Tasks
      },
      setOneTask(state, Task) {
         state.tasks.unshift(Task)
      },
      setSubTasks(state, subTasks) {
         state.subTask = subTasks
      },
      setopenedTaskId(state, id) {
         state.openedTaskId = id
      },
      closeTask(state) {
         state.openedTaskId = '';
      },
      filterTasks(state, user_id) {
         state.filteredTasks = state.tasks.filter((item) => {
            for(var key in state.filterRules) {
               // if Date
               if(state.filterRules.date_of_completion != undefined && key != undefined) {
                  var date = new Date(item.date_of_completion);
                  if(state.filterRules.date_of_completion < date) {
                     return false;
                  }
               }
               // if i responsible
               if(state.filterRules.tabFilter === 'my') {
                  if(item.responsible_id != user_id) {
                     return false;
                  }
               }
               // if i creator
               if(state.filterRules.tabFilter === 'from') {
                  if(item.creator_id != user_id) {
                     return false;
                  }
               }
               // if filter on text
               if(state.filterRules.filterText != '') {
                  if(!(item.title.toLowerCase().includes(state.filterRules.filterText.toLowerCase()) || item.description.toLowerCase().includes(state.filterRules.filterText.toLowerCase()))) {
                     return false;
                  }
               }
            }
            return true;
         })
      },
      // setFilterRules
      setFilterDate(state, date) {
         state.filterRules.date_of_completion = date;
      },
      setFilterTab(state, tab) {
         state.filterRules.tabFilter = tab;
      },
      setFilterText(state, text) {
         state.filterRules.filterText = text;
      },
      // clear FilterRules
      clearFilterText(state) {
         state.filterRules.filterText = '';
      },
      clearDateFilter(state) {
         state.filterRules.date_of_completion = undefined;
      },
      // messages
      setNewMessage(state, message) {
         state.taskMessages.push(message)
      },
      setTaskMessages(state, messageList) {
         state.taskMessages = messageList
      },
      setParentTask(state, task) {
         state.parentTask = task
      },
      addChildrenTask(state, task) {
         state.subTask.push(task)
      },
      updateTask(state, task) {
         state.filteredTasks.forEach((item)=>{
            if(item.id == task.task_id) {
               item = task
            }
         })
      }
   },
   state: {
      tasks: [],
      filteredTasks: [],
      subTask: [],
      openedTaskId: '',
      filterRules: {
         date_of_completion: undefined,
         tabFilter: 'my',
         filterText: ''
      },
      taskMessages: [],
      parentTask: {}
   },
   getters: {
      returnTasks(state) {
         return state.filteredTasks
      },
      returnSubTasks(state) {
         return state.subTask
      },
      returnOpenedTaskId(state) {
         return state.openedTaskId
      },
      taskMessages(state) {
         return state.taskMessages
      },
      parentTask(state) {
         return state.parentTask
      }
   }
}