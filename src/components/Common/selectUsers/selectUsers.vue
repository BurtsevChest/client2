<template>
   <div class="SelectUsers pt-10">
      <div class="flex">
         <div class="flex-col flex-col-12">
            <SearchField :placeholder="'Найти...'"/>
         </div>
         <div v-for="user in userList" v-bind:key="user.user_id" class="SelectUsers-user-lastItem flex-col flex-col-12">
            <div class="SelectUsers-user flex flex-noGutter a-items-center p-10 radius-block" @click="setUser(user)">
               <div class="flex-col flex a-items-center flex-col-1">
                  <span class="material-icons">person</span>
               </div>
               <div class="flex-col flex a-items-center flex-col-11">
                  <div class="pl-8 ">
                     {{ user.name }} {{ user.last_name }}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

/**
 * @purpose Компонент для отображения юзеров.
 * @event При клике создает событие 'onClickUser' и отдает обьект с юзером
 */
export default {
   // eslint-disable-next-line
   name: "SelectUsers",
   props: {
      userList: {
         type: Array,
         required: true
      }
   },
   date() {
      return {
         users: []
      }
   },
   methods: {
      setUser(user) {
         this.$emit('onClickUser', user)
      }
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

      &-lastItem:last-child {
         padding-bottom: 0;
      }
   }
}
</style>