<template>
   <div class="SearchField flex a-items-center input radius-block ph-6 pv-10">
      <input v-model.trim="text" type="text" class="SearchField-input" :placeholder="placeholder">
      <span @click="clickSearch" class="material-icons pl-16 pointer">search</span>
   </div>
</template>
<script>

export default {
   // eslint-disable-next-line
   name: "SearchField",
   props: {
      placeholder: {
         type: String
      }
   },
   data() {
      return {
         text: ''
      }
   },
   methods: {
      clickSearch() {
         this.$emit('clickSearch',this.text)
      }
   }
}
</script>

<style lang="less">
.SearchField {
   &-input {
      width: auto;
   }
}
</style>