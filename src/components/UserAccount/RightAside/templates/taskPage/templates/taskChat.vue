<template>
   <div class="TaskChat empty_flex">
      <Chat
         :Messages="taskMessages"
         @sendMessage="sendMsg" />
   </div>
</template>

<script>
import Chat from '@/components/UserAccount/Common/chat/Chat.vue';
import { mapGetters } from 'vuex';
import { setNewMessage } from '@/websync/tasks';
import socket from "@/vue_socket/index"
let USER;
if(localStorage.user) {
   // eslint-disable-next-line no-unused-vars
   USER = JSON.parse(localStorage.user);
}
// import {getTaskMessages} from '@/websync/tasks';
// Можно сюда сокет импортировать и работать с эмиатми. А слушать уже в сторе
export default {
   // eslint-disable-next-line
   name: "TaskChat",
   components: {Chat},
   props: {
      task_id: {
         type: Number
      }
   },
   methods: {
      sendMsg(message) {
         // some socket emits
         // Пока что в message просто текст сообщения я хз, в каком виде мы будем сообщения делать
         const data = {
            text: message,
            user_id: USER.user_id,
            to: this.task_id
         }
         socket.emit("PRIVATE_MESSAGE", data)
         setNewMessage(data)
      }
   },
   computed: mapGetters(['taskMessages']),
   beforeMount() {
      // Чтоб получить сообщения чата
      // getTaskMessages()
      socket.emit('JOIN_ROOM', this.task_id)
      socket.on('PRIVATE_MESSAGE', (data) => {
         console.log(data)
         setNewMessage(data);
      })
   },
   beforeUnmount() {
      socket.emit('DISCONNECTION_ROOM', this.task_id)
   }
}
</script>

<style lang="less">

</style>