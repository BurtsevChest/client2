<template>
   <div class="addColumnView p-12">
      <p>
         Название
      </p>
      <input type="text" v-model.trim="columnName" class="addColumnView-input mh-4">
      <button @click="addColumn" class="button mt-16">{{ $t('user_account_tasks_add_addBtn') }}</button>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "addColumnView",
   data() {
      return {
         columnName: ''
      }
   },
   methods: {
      addColumn() {
         if(this.columnName) {
            this.$emit('addColumn', this.columnName);
            this.columnName = '';
         }
      }
   }
}
</script>


<style lang="less">
.addColumnView {
   &-input {
      width: 100%;
      border-bottom: 1px solid rgba(128, 128, 128, 0.2);

      &:hover,&:focus {
         border-bottom: 1px solid rgba(128, 128, 128, 0.8);
      }
   }
}
</style>