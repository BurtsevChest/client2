<template>
   <div class="TeamChat">
      <Chat
         :Messages="teamMessages"
         @sendMessage="sendMsg"
         :msgStyle="'TeamChat-msg'"
         :menuStyle="'TeamChat-menu'"
         :chat_room_id="chat_room_id"
      />
   </div>
</template>

<script>
import Chat from '@/components/UserAccount/Common/chat/Chat.vue';
import { getUser } from '@/components/Common/helpers/user';

export default {
   // eslint-disable-next-line
   name: "TeamChat",
   props: {
      teamId: {
         type: Number
      }
   },
   components: {Chat},
   data() {
      return {
         teamMessages: [],
         user: getUser(),
         chat_room_id: `teamId${this.teamId}`
      }
   },
   methods: {
      sendMsg(message) {
         this.setNewMessage(message);
      },
      setNewMessage(message) {
         this.teamMessages.push(message)
      }
   }
}
</script>

<style lang="less">
   .TeamChat {
      height: 100%;
      &-msg {
         background-color: var(--text-block-hover);
         box-shadow: 0 0 12px rgba(128, 128, 128, 0.2);
      }

      &-menu {
         background-color: var(--text-block-hover);
         box-shadow: 0 0 12px rgba(128, 128, 128, 0.2);
      }
   }
</style>