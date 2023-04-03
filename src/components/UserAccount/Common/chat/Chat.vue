<template>
<div class="Chat">
   <div class="Chat-wrapper">
      <div ref="chatContent" class="Chat-content flex-column">
         <div ref="chatscroll" class="Chat-scroll">
            <div class="Chat-messages flex flex-column flex-end flex-nowrap pr-8 pb-20" id="messageList">
               <div v-for="item in Messages" v-bind:key="item.id">
                  <div v-if="userId === item.creator_message_id" :class="[msgStyle]" class="Chat-msg Chat-msg-my radius-block mt-16 pv-16 ph-10">
                     {{ item.content }}
                  </div>
                  <div v-else :class="[msgStyle]" class="Chat-msg radius-block mt-16 pv-16 ph-10">
                     {{ item.content }}
                  </div>
               </div>
            </div>
         </div>
         <div ref="ChatMenu" class="Chat-menu radius-block ph-10 pv-10 flex flex-space" :class="[menuStyle]">
            <span class="material-icons pointer">person</span>
            <span class="material-icons pointer pl-4">attach_file</span>
            <input type="text" v-model.trim="inputText" v-on:keyup.enter="clickEnter" :placeholder="placeholder" class="empty_flex pl-6">
            <span @click="addMsg" class="material-icons pointer">send</span>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { getUser } from '@/components/Common/helpers/user';

export default {
   // eslint-disable-next-line
   name: "Chat",
   props: {
      Messages: {
         type: Array,
         required: true
      },
      colorTheme: {
         type: String
      },
      msgStyle: {
         type: String
      },
      menuStyle: {
         type: String
      },
      chat_room_id: {
         type: String
      }
   },
   watch: {
      'Messages.length'() {
         this.scroolItem();
      }
   },
   data() {
      return {
         messageList: this.Messages,
         inputText: '',
         userId: getUser().user_id,
         placeholder: this.$i18n.t('user_account_common_ui_chat_placeholder')
      }
   },
   methods: {
      addMsg() {
         if(this.inputText) {
            const newMessage = {
               chat_room_id: this.chat_room_id,
               creator_message_id: this.userId,
               content: this.inputText,
               date_of_creation: new Date()
            }
            this.$emit('sendMessage', newMessage);
         }
         this.inputText = '';
      },
      scroolItem() {
         this.$refs.chatscroll.scrollTop = this.$refs.chatscroll.scrollHeight;
      },
      clickEnter() {
         this.addMsg()
      },
      setHeight(maxHeight) {
         this.$refs.chatscroll.style.height = `${maxHeight}px`;
      },
      afterResize() {
         this.setHeight(this.getContentHeight());
      },
      getContentHeight() {
         return this.$refs.chatContent.offsetHeight - this.$refs.ChatMenu.offsetHeight;
      }
   },
   mounted() {
      this.scroolItem();
      this.setHeight(this.getContentHeight());
      window.addEventListener('resize', this.afterResize(), true);
   },
   beforeUnmount() {
      window.removeEventListener('resize', this.afterResize(), true);
   }
}
</script>

<style lang="less">

.Chat {
   flex: 1 1 0%;
   height: 100%;

   &-wrapper {
      height: 100%;
   }

   &-content {
      height: 100%;
      display: flex;
   }

   &-menu {
      width: 100%;
   }

   &-messages {
      margin-top: auto;
      width: 100%;
      min-height: 100%;
   }

   &-scroll {
      overflow: hidden;
      display: flex;
      flex-direction: column-reverse;
      overflow-y: auto;
   }

   &-msg {
      max-width: 60%;
      margin-right: auto;

      &-my {
         margin-left: auto;
         margin-right: 0;
      }
   }
}
</style>