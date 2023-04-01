<template>
   <div class="ScrollContainer">
      <div ref="scrollContainerBody" class="ScrollContainer-body">
         <slot name="content"></slot>
         <div class="">
            {{ scrollValue }}
         </div>
         <scrollBar 
            :scrollParent = "scrollValue"
         />
      </div>
   </div>
</template>

<script>
import scrollBar from '@/components/Common/ScrollContainer/templates/scrollBar.vue';

export default {
   // eslint-disable-next-line
   name: "ScrollContainer",
   components: {scrollBar},
   data() {
      return {
         scrollValue: 0
      }
   },
   mounted() {
      this.$refs.scrollContainerBody.addEventListener('wheel', (_event) => {
         let scroll = _event.wheelDelta;
         // if(scroll > 0) {
         //    scroll = 0;
         // }
         this.scrollValue += scroll;

         if(this.scrollValue > 0) {
            this.scrollValue = 0;
            scroll = 0;
         }

         if(this.scrollValue <= -300) {
            this.scrollValue = -300;
            scroll = 0;
         }
      })
   }
}
</script>

<style lang="less">
.ScrollContainer {
   width: 100%;
   height: 100%;

   &-body {
      position: relative;
      height: 100%;
   }
}
</style>