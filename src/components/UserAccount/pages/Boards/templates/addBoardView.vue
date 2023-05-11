<template>
<div class="addBoardView pv-10 pb-10">
   <TextField class="mb-20" @inputText="inputText" :placeholder="'Название'"/>
   <button @click="addBoard" class="button">Добавить</button>
</div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "addBoardView",
   data() {
      return {
         name: ''
      }
   },
   methods: {
      inputText(name) {
         this.name = name;
      },
      addBoard() {
         if(this.name) {
            this.$emit('addBoard', this.name);
            this.name = '';
         }
      }
   }
}
</script>

<style lang="less">
.addBoardView {

}
</style>