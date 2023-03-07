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
// import {getTaskMessages} from '@/websync/tasks';
// Можно сюда сокет импортировать и работать с эмиатми. А слушать уже в сторе
export default {
   // eslint-disable-next-line
   name: "TaskChat",
   components: {Chat},
   sockets: {
      
   },
   props: {
      task_id: {
         type: Number
      }
   },
   methods: {
      sendMsg(message) {
         // some socket emits
         // Пока что в message просто текст сообщения я хз, в каком виде мы будем сообщения делать
         setNewMessage(message);
      }
   },
   computed: mapGetters(['taskMessages']),
   beforeMount() {
      // Чтоб получить сообщения чата
      // getTaskMessages()
   }
}
</script>

<style lang="less">

</style>