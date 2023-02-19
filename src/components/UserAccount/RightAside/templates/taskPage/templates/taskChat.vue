<template>
   <div class="TaskChat">
      <div class="TaskChat-wrapper">
         <div class="TaskChat-content flex-column">
            <div class="TaskChat-messages" id="messageList">
               <div v-for="item in Messages" v-bind:key="item.id">
                  <div v-if="userId === item.user_id" class="TaskChat-msg TaskChat-msg-my radius-block mt-16 pv-16 ph-10 box-shadow">
                     {{ item.text }}
                  </div>
                  <div v-else class="TaskChat-msg radius-block mt-16 pv-16 ph-10 box-shadow">
                     {{ item.text }}
                  </div>
                  
               </div>
            </div>
            <div class="TaskChat-menu mt-20 radius-block ph-10 pv-10 flex flex-space box-shadow">
               <span class="material-icons pointer">person</span>
               <span class="material-icons pointer pl-4">attach_file</span>
               <input type="text" v-model.trim="inputText" placeholder="Сообщение..." class="empty_flex pl-6">
               <span @click="addMsg" class="material-icons pointer">send</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
let USER;
if(localStorage.user) {
   USER = JSON.parse(localStorage.user);
}

export default {
   // eslint-disable-next-line
   name: "TaskChat",
   props: {
      task_id: {
         type: Number
      }
   },
   data() {
      return {
         inputText: '',
         userId: USER.user_id,
         Messages: [
            {
               id: 1,
               text: 'Message one',
               user_id: 4
            },
            {
               id: 2,
               text: 'Message two',
               user_id: 5
            },
            {
               id: 3,
               text: 'Message three',
               user_id: 5
            },
            {
               id: 4,
               text: 'Message four',
               user_id: 5
            },
            {
               id: 5,
               text: 'Илья хватит хуй пинать, пора уже все сделать',
               user_id: 4
            }
         ],
         messageBox: ''
      }
   },
   methods: {
      addMsg() {
         if(this.inputText) {
            var count = this.Messages.length;
            count++;
            this.Messages.push({
               id: count,
               text: this.inputText,
               user_id: this.userId
            });
            this.inputText = '';
            this.scroolItem()
         }
      },
      scroolItem() {
         var objDiv = document.getElementById("messageList");
         objDiv.scrollTop = objDiv.scrollHeight;
      }
   }
}
</script>

<style lang="less">
.TaskChat {
   flex: 1 1 0%;

   &-wrapper {
      height: 100%;
   }

   &-content {
      height: 100%;
      display: flex;
      align-items: flex-end;
   }

   &-menu {
      background-color: var(--text-block-hover);
      width: 100%;
   }

   &-messages {
      margin-top: auto;
      width: 100%;
      overflow: hidden;
      max-height: 680px;
      padding-bottom: 15px;
      overflow-y: scroll;
   }

   &-msg {
      background-color: white;
      max-width: 60%;
      margin-right: auto;
      background-color: var(--text-block-hover);
      &-my {
         margin-left: auto;
         margin-right: 0;
         
      }
   }
}
</style>