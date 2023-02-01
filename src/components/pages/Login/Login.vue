<template>
   <div class="Login flex flex-center a-items-center">
      <div class="Login-view p-12">
         <div class="flex flex-column">
            <div class="flex-col flex flex-center">
               <div class="Login-view-nameSite">
                  ProjectManager
               </div>
            </div>
            <div class="flex-col">
               <p class="pb-8">Введите email</p>
               <input type="email" class="input" v-model.trim="params.email">
               <p v-if="error.email" class="Login-view-error">Введите email</p>
            </div>
            <div class="flex-col">
               <p class="pb-8">Введите пароль</p>
               <input type="password" class="input" v-model.trim="params.password">
               <p v-if="error.password" class="Login-view-error">Введите пароль</p>
            </div>
            <div class="flex-col flex flex-center">
               <button @click="signUp" class="button">Войти</button>
            </div>
            <div class="flex-col flex flex-center">
               <a href="">Зарегистрироваться</a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import User from '@/api/user';
import { mapMutations } from 'vuex';
import store from '@/store';

export default {
   // eslint-disable-next-line
   name: "Login",
   data() {
      return {
         params: {
            email: '',
            password: ''
         },
         error: {
            email: '',
            password: ''
         }
      }
   },
   methods: {
      signUp() {
         if(this.validation()) {
            User.signUp(this.params).then((res) => {
               switch(res.status) {
                  case 400:
                     this.checkApiAnswer(res.data.message)
                     break;

                  case 200:
                     localStorage.setItem('token', res.data.token)
                     localStorage.setItem('user', res.data.user)
                     store.commit('setUser', res.data.user)
                     // this.setUser(res.data.user)
                     console.log(res.data);
                     this.$router.push('/')
                     break;
               }
            })
         }
      },
      validation() {
         if(!this.params.email) {
            this.error.email = 'Введите email'
         }else {
            this.error.email = false
         }

         if(!this.params.password) {
            this.error.password = 'Введите пароль'
         }else{
            this.error.password = false
         }

         if( this.error.password ===  this.error.email === true) {
            return true
         }else {
            return false
         }
      },
      checkApiAnswer(message) {
         switch(message) {
            case 'Пользователь не найден':
               this.error.email = 'Пользователь не найден'
               return false

            case 'Неверный пароль':
               this.error.email = 'Неверный пароль'
               return false
            }

         return true
      },
      ...mapMutations(['setUser'])
   }
}
</script>

<style lang="less" scoped>
.Login {
   height: 100%;

   &-view {
      box-shadow: 0 0 12px rgba(128, 128, 128, 0.3);
      border-radius: 12px;
      width: 500px;

      &-nameSite {
         font-size: 30px;
         text-shadow: 0 0 15px rgba(128, 128, 128, 0.3);
      }

      &-error {
         color: red;
      }
   }
}
</style>