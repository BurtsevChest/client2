<template>
<div class="teamPage p-20">
   <div class="">
      <router-link class="teamPage-linkBack flex a-items-center secondary-text-color mb-40" to='/user_account/teams'>
         <span class="material-icons secondary-text-color">home</span>
         <span class="pl-10">Все команды</span>
      </router-link>
   </div>
   {{ teamName }}
   <div class="flex" style="height: 92%;">
      <div class="flex-col flex-col-8">
         <Chat 
            :Messages="teamMessages"
            @sendMessage="sendMsg" 
         />
      </div>
      <div class="flex-col flex-col-2">
         <div class="teamPage-filtres box-shadow">
            <div class="flex pt-10">
               <div v-for="item in filterItems" v-bind:key="item" class="flex-col flex-col-12">
                  <div class="radius-block box-shadow-hover ph-6 pv-10 pointer">
                     {{ item.name }}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import Chat from '@/components/UserAccount/Common/chat/Chat.vue';
import { getUser } from '@/components/Common/helpers/user';

export default {
   // eslint-disable-next-line
   name: "teamPage",
   components: {Chat},
   data() {
      return {
         teamName: this.$route.params.teamId,
         teamMessages: [],
         user: getUser(),
         filterItems: [
            {
               name: 'Чат'
            }
         ]
      }
   },
   methods: {
      sendMsg(message) {
         const data = {
            text: message,
            user_id: this.user.user_id
         }
         this.setNewMessage(data);
      },
      setNewMessage(message) {
         this.teamMessages.push(message)
      }
   }
}
</script>


<style lang="less">
   .teamPage {
      height: 100%;
      &-linkBack {

      }

      &-filtres {
         background-color: white;
         border-radius: 12px;
         height: 400px;
      }
   }
</style>