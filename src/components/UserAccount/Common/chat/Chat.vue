<template>
<div class="Chat">
   <div class="Chat-wrapper">
      <div class="Chat-content flex-column">
         <div class="Chat-messages" id="messageList">
            <div v-for="item in Messages" v-bind:key="item.id">
               <div v-if="userId === item.user_id" class="Chat-msg Chat-msg-my radius-block mt-16 pv-16 ph-10">
                  {{ item.text }}
               </div>
               <div v-else class="Chat-msg radius-block mt-16 pv-16 ph-10">
                  {{ item.text }}
               </div>
            </div>
         </div>
         <div class="Chat-menu mt-20 radius-block ph-10 pv-10 flex flex-space">
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
   name: "Chat",
   props: {
      Messages: {
         type: Array,
         required: true
      }
   },
   data() {
      return {
         inputText: '',
         userId: USER.user_id,
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
      }
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
      align-items: flex-end;
   }

   &-menu {
      background-color: var(--text-block-hover);
      box-shadow: var(--block-box-shadow);
      width: 100%;
   }

   &-messages {
      margin-top: auto;
      width: 100%;
      overflow: hidden;
      height: 680px;
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