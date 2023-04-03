<template>
   <div class="TaskChat empty_flex">
      <Chat
         :Messages="taskMessages"
         @sendMessage="sendMsg"
         :msgStyle="'TaskChat-chat-msg'"
         :menuStyle="'TaskChat-chat-msg'"
         :chat_room_id="chat_room_id"
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
         user: getUser(),
         chat_room_id: `taskId${this.task_id}`
      }
   },
   methods: {
      sendMsg(message) {
         this.setNewMessage(message);
         chatSocket.emit("PRIVATE_MESSAGE", message);
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
.TaskChat {
   &-chat {
      &-msg {
         background-color: var(--text-block-hover);
         box-shadow: var(--block-box-shadow);
      }
   }
}
</style>