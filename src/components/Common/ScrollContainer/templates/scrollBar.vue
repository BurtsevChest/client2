<template>
   <div class="scrollBar">
      <div class="scrollBar-wrapper">
         <div ref="scrollBody" class="scrollBar-body"></div>
      </div>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "scrollBar",
}
</script>

<style lang="less">
.scrollBar {
   height: 100%;
   position: absolute;
   left: 0;
   width: 24px;

   &-wrapper {
      position: relative;
   }

   &-body {
      height: 200px;
      position: absolute;
      border-radius: 20px;
      background-color: rgba(128, 128, 128, 0.3);
   }
}
</style>
