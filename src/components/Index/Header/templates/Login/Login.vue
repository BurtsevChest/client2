<template>
   <div class="Login flex flex-center a-items-center">
      <div class="Login-view radius-block">
         <div class="flex flex-column">
            <div class="flex-col flex flex-center">
               <div class="Login-view-nameSite">
                  ProjectManager
               </div>
            </div>
            <div class="flex-col">
               <p class="pb-8">{{ $t('index_header_login_email') }}</p>
               <input type="email" class="input" v-model.trim="params.email">
               <p v-if="error.email" class="Login-view-error">{{ $t('index_header_login_email') }}</p>
            </div>
            <div class="flex-col">
               <p class="pb-8">{{ $t('index_header_login_password') }}</p>
               <input type="password" class="input" v-model.trim="params.password">
               <p v-if="error.password" class="Login-view-error">{{ $t('index_header_login_password') }}</p>
            </div>
            <p v-if="error.api_err" class="Login-view-error text-center ph-8">{{error.api_err}}</p>
            <div class="flex-col flex flex-center">
               <button @click="signUp" class="button">{{ $t('index_header_enter_btn') }}</button>
            </div>
            <div class="flex-col flex flex-center">
               <router-link to="/register">
                  {{ $t('index_header_login_register') }}
               </router-link>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import User from '@/api/user';
import AxiosRequest from '@/api/index';

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
            password: '',
            api_err: ''
         }
      }
   },
   methods: {
      signUp() {
         this.error.api_err = '';
         if(this.validation()) {
            User.signUp(this.params)
               .then((res) => {
                  if(res) {
                     this.registerUser(res);
                  }
                  else {
                     this.error.api_err = 'Неверный логин или пароль';
                  }
               });
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
      registerUser(res) {
         localStorage.setItem('accessToken', res.data.accessToken);
         AxiosRequest.defaults.headers = {
            "Authorization": "Bearer " + localStorage.accessToken,
         }
         localStorage.setItem('user', JSON.stringify(res.data.user));
         this.$router.push('/user_account/home');
      }
   }
}
</script>

<style lang="less" scoped>
.Login {
   &-view {
      padding: 15px;
      width: 500px;
      background: white;
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