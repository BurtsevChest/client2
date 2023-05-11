<template>
   <div class="phase">
      <TextField class="mb-16" :placeholder="'Название фазы'"/>
      <PopupBtn :accessShow="true" :closeAfterClick="true" :top="'100%'" v-model:show="selectUsersPopup" :hideBtn=true>
         <template v-slot:popupBtn>
            <div class="flex pb-10">
               <div class="flex-shrink-0">
                  <userImage v-model:user_id="user.user_id"/>
               </div>
               <p class="pl-8">{{ user.name }}</p>
            </div>
         </template>
         <template v-slot:popupTemplate>
            <SelectUsers @onClickUser="setUser" :userList="getUsersCommandList"/>
         </template>
      </PopupBtn>
      <TextField :placeholder="'Результат работы'"/>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUsersList } from '@/websync/user';

export default {
   // eslint-disable-next-line
   name: "phase",
   props: {
      title: {
         type: String
      }
   },
   computed: mapGetters(['getUsersCommandList']),
   data() {
      return {
         selectUsersPopup: false,
         user: {
            user_id: null,
            name: 'Hho am i?',
         }
      }
   },
   methods: {
      setUser(user) {
         this.user = {
            user_id: user.user_id,
            name: `${user.name} ${user.last_name}`
         }
      }
   },
   mounted() {
      getUsersList()
   }
}
</script>

<style lang="less">
.phase {

}
</style>