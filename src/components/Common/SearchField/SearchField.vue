<template>
   <div class="SearchField flex flex-space a-items-center input radius-block ph-6 pv-10">
      <input v-on:keyup.enter="clickEnter" v-model.trim="text" type="text" class="SearchField-input empty_flex" :placeholder="placeholder">
      <div class="flex a-items-center">
         <span v-if="text" @click="clearSearch" class="material-icons pl-16 pointer">close</span>
         <span v-else style="width: 40px; height: 24px;"></span>
         <span @click="clickSearch" class="material-icons pl-8 pointer">search</span>
      </div>
   </div>
</template>
<script>

export default {
   // eslint-disable-next-line
   name: "SearchField",
   data() {
      return {
         text: '',
         placeholder: this.$i18n.t('common_ui_searchfield_placeholder')
      }
   },
   methods: {
      clickSearch() {
         this.$emit('clickSearch',this.text)
      },
      clearSearch() {
         this.text='';
         this.$emit('clearSearch')
      },
      clickEnter() {
         this.$emit('clickSearchEnter',this.text)
      }
   }
}
</script>

<style lang="less">
.SearchField {
   &-input {
      width: inherit;
   }
}
</style>