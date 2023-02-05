<template>
   <div class="SelectUsers">
      <div class="flex">
         <div class="flex-col flex-col-12">
            <input type="text" class="input pv-8 ph-4" placeholder="Найти...">
         </div>
         <div v-for="user in getUsersCommandList" v-bind:key="user.user_id" class="flex-col flex-col-12">
            <div class="SelectUsers-user flex flex-noGutter a-items-center p-10 radius-block" @click="setUser(user)">
               <div class="flex-col flex a-items-center flex-col-1">
                  <span class="material-icons">person</span>
               </div>
               <div class="flex-col flex a-items-center flex-col-11">
                  <div class="pl-8">
                     {{ user.name }} {{ user.last_name }}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { getUsersList } from '@/websync/user';
import { mapGetters } from 'vuex';

/**
 * @purpose Компонент для отображения юзеров.
 * @event При клике создает событие 'onClickUser' и отдает обьект с юзером
 */
export default {
   // eslint-disable-next-line
   name: "SelectUsers",
   date() {
      return {
         users: []
      }
   },
   computed: mapGetters(['getUsersCommandList']),
   methods: {
      setUser(user) {
         this.$emit('onClickUser', user)
      }
   },
   beforeMount() {
      getUsersList()
   }
}
</script>

<style lang="less" scoped>
.SelectUsers {
   width: 300px;
   max-height: 300px;
   overflow: hidden;
   overflow-y: scroll;

   &-user {
      cursor: pointer;
      transition: 0.3s;
      &:hover, :focus {
         background: rgba(30, 41, 59, 0.1);
      }
   }
}
</style>