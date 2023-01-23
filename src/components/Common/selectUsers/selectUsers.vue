<template>
   <div class="SelectUsers">
      <div class="flex">
         <div class="flex-col flex-col-12">
            <input type="text" class="input pv-8 ph-4" placeholder="Найти...">
         </div>
         <div v-for="user in users" v-bind:key="user.userId" class="flex-col flex-col-12">
            <div class="SelectUsers-user flex a-items-center" @click="setUser(user)">
               <div class="flex-col flex-col-1">
                  <span class="material-icons">person</span>
               </div>
               <div class="flex-col flex-col-11">
                  {{ user.name }} {{ user.family }}
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
   date() {
      return {
         users: []
      }
   },
   methods: {
      setUser(user) {
         this.$emit('onClickUser', user)
      }
   },
   beforeMount() {
      this.users = [  
         {
            userId: 1,
            name: 'Андрей',
            family: 'Чурилов'
         },
         {
            userId: 2,
            name: 'Илья',
            family: 'Бурцев'
         },
         {
            userId: 3,
            name: 'Татьяна',
            family: 'Химкова'
         },
         {
            userId: 4,
            name: 'Алексей',
            family: 'Навальный'
         },
         {
            userId: 5,
            name: 'Владимир',
            family: 'Пу....'
         },
         {
            userId: 6,
            name: 'Хуба',
            family: 'Петрович'
         },
         {
            userId: 7,
            name: 'И Буба',
            family: 'Петрович'
         },
         {
            userId: 8,
            name: 'Крутое',
            family: 'Пике'
         }
      ]
   }
}
</script>

<style lang="less" scoped>
.SelectUsers {
   width: 300px;
   height: 300px;
   overflow: hidden;
   overflow-y: scroll;

   &-user {
      cursor: pointer;

      &:hover, :focus {
         background: rgba(30, 41, 59, 0.1);
      }
   }
}
</style>