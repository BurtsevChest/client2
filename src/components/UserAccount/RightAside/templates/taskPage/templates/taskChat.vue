<template>
   <div class="TaskChat empty_flex">
      <Chat
         :Messages="taskMessages"
         @sendMessage="sendMsg" 
      />
   </div>
</template>

<script>
import Chat from '@/components/UserAccount/Common/chat/Chat.vue';
import chatSocket from "@/vue_socket/chatSocket"
import { getUser } from '@/components/Common/helpers/user';
import Tasks from '@/api/task';

export default {
   // eslint-disable-next-line
   name: "TaskChat",
   components: {Chat},
   props: {
      task_id: {
         type: Number
      }
   },
   data() {
      return {
         taskMessages: [],
         user: getUser()
      }
   },
   methods: {
      sendMsg(message) {
         const data = {
            text: message,
            user_id: this.user.user_id,
            to: this.task_id
         }
         this.setNewMessage(data);
         chatSocket.emit("PRIVATE_MESSAGE", data);
      },
      getMessages() {
         Tasks.getTaskMessages(this.task_id)
            .then((res) => {
               this.taskMessages = res.data;
            })
            .catch((err) => {
               throw err;
            })
      },
      setNewMessage(msg) {
         this.taskMessages.push(msg);
      }
   },
   beforeMount() {
      // Чтоб получить сообщения чата
      // getTaskMessages()
      chatSocket.emit('JOIN_ROOM', 'taskId' + this.task_id);

      chatSocket.on('PRIVATE_MESSAGE', (data) => {
         this.setNewMessage(data);
      })
   },
   beforeUnmount() {
      chatSocket.emit('DISCONNECTION_ROOM', this.task_id);
   }
}
</script>

<style lang="less">

</style>