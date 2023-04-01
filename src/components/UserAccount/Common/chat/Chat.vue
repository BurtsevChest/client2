<template>
<div class="Chat">
   <div class="Chat-wrapper">
      <div class="Chat-content flex-column">
         <div class="Chat-scroll">
            <div class="Chat-messages flex flex-column flex-end flex-nowrap pr-8 pb-20" id="messageList">
               <div v-for="item in Messages" v-bind:key="item.id">
                  <div v-if="userId === item.user_id" class="Chat-msg Chat-msg-my radius-block mt-16 pv-16 ph-10">
                     {{ item.text }}
                  </div>
                  <div v-else class="Chat-msg radius-block mt-16 pv-16 ph-10">
                     {{ item.text }}
                  </div>
               </div>
            </div>
         </div>
         <div class="Chat-menu radius-block ph-10 pv-10 flex flex-space">
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
      }
   },
   watch: {
      Messages() {
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
            this.$emit('sendMessage', this.inputText);
         }
         this.inputText = '';
         this.scroolItem();
      },
      scroolItem() {
         var objDiv = document.getElementById("messageList");
         objDiv.scrollTop = objDiv.scrollHeight;
      },
      clickEnter() {
         this.addMsg()
      }
   },
   mounted() {
      this.scroolItem();
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
      background-color: var(--text-block-hover);
      box-shadow: var(--block-box-shadow);
      width: 100%;
   }

   &-messages {
      margin-top: auto;
      width: 100%;
   }

   &-scroll {
      overflow: hidden;
      max-height: 680px;
      overflow-y: scroll;
   }

   &-msg {
      background-color: white;
      max-width: 60%;
      margin-right: auto;
      background-color: var(--text-block-hover);
      box-shadow: var(--block-box-shadow);

      &-my {
         margin-left: auto;
         margin-right: 0;
      }
   }
}
</style>