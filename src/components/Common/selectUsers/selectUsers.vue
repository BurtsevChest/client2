<template>
   <div class="SelectUsers radius-block p-10">
      <div class="flex-container flex-wrap">
         <div v-for="user in userList" v-bind:key="user.user_id" class="SelectUsers-user-lastItem flex-col flex-col-12">
            <div class="SelectUsers-user flex radius-block" @click="setUser(user)">
               <div class="flex a-items-center flex-col-1">
                  <userImage v-model:user_id="user.user_id"/>
               </div>
               <div class="flex a-items-center flex-col-11">
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
      },
   }
}
</script>

<style lang="less" scoped>
.SelectUsers {
   overflow: hidden;
   overflow-y: scroll;
   width: 500px;
   background-color: var(--background-color-wrapper);
   box-shadow: 0 0 18px rgb(128 128 128 / 30%);
   height: 162px;

   &-user {
      cursor: pointer;
      transition: 0.3s;
      &:hover {
         background-color: var(--text-block-hover);
      }

      &-lastItem:last-child {
         padding-bottom: 0;
      }
   }
}
</style>