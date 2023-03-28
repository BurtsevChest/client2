<template>
   <div class="ScrollContainer">
      <div class="ScrollContainer-body">
         <slot></slot>
         <scrollBar/>
      </div>
   </div>
</template>

<script>
import scrollBar from '@/components/Common/ScrollContainer/templates/scrollBar.vue';

export default {
   // eslint-disable-next-line
   name: "ScrollContainer",
   components: {scrollBar}
}
</script>

<style lang="less">
.ScrollContainer {
   width: 100%;
   height: 100vh;

   &-body {
      position: relative;
   }
}
</style>