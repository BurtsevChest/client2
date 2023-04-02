<template>
   <div class="filterItem">
      {{ options }}
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "filterItem",
   props: {
      options: {
         type: Object
      }
   }
}
</script>


<style lang="less">
.filterItem {

}
</style>