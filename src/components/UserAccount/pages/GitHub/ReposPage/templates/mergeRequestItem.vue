<template>
   <div class="mergeRequestItem">
      {{ merge.title }}
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "mergeRequestItem",
   props: {
      merge: {
         type: Object
      }
   }
}
</script>

<style lang="less">
.mergeRequestItem {

}
</style>