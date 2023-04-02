<template>
   <div class="ListItems flex flex-column">
      <component :is="template" v-for="item in items" v-bind:key="item" v-bind:options="item"></component>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "ListItems",
   data() {
      return {
         template: ''
      }
   },
   props: {
      items: {
         type: Array
      },
      itemTemplate: {
         type: String
      }
   },
   methods: {
      loadTemplate() {
         import(`@/${this.itemTemplate}`).then((res) => {
            this.template = res.default;
         })
      }
   }
}
</script>

<style lang="less">
.ListItems {

}
</style>