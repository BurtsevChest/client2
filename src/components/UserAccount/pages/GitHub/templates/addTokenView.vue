<template>
   <div class="addTokenView radius-block">
      <TextField @inputText="getToken" class="mb-14"/>
      <button @click="setToken" class="button">Добавить</button>
   </div>
</template>

<script>
import User from '@/api/user';

export default {
   // eslint-disable-next-line
   name: "addTokenView",
   data() {
      return {
         token_git_lab: ''
      }
   },
   methods: {
      close() {
         this.$emit('closeModalDialog');
      },
      getToken(text) {
         this.token_git_lab = text.trim();
      },
      setToken() {
         if(this.token_git_lab) {
            User.setGitLabToken(this.token_git_lab).then((res) => {
               console.log(res);
               // this.$emit('closeModalDialog');
            })
         }
      }
   }
}
</script>

<style lang="less">
.addTokenView {
   background-color: var(--background-color);
   color: var(--text-color);
}
</style>