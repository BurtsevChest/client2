<template>
   <div class="ScrollContainer">
      <div ref="scrollContainerBody" class="ScrollContainer-body" :style="{'height': height + 'px'}">
         <slot ref="content" name="content"></slot>
         <scrollBar 
            :scrollParent = "scrollValue"
            :scrollBarHeight = "scrollBarHeight"
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
   props: {
      height: {
         type: Number
      }
   },
   methods: {
      setScrollValue() {
         this.scrollValue = this.$refs.scrollContainerBody.scrollTop;
      }
   },
   watch: {
      scrollValue(newValue, oldValue) {
         if(newValue - oldValue >= this.heightContent - this.height) {
            this.scrollValue = oldValue;
         }
      }
   },
   data() {
      return {
         scrollValue: 0,
         heightContent: 0,
         scrollInPercent: 0,
         scrollBarHeight: 0
      }
   },
   mounted() {
      const bodyScroll = this.$refs.scrollContainerBody;
      this.heightContent = bodyScroll.scrollHeight;
      bodyScroll.addEventListener('scroll', this.setScrollValue);
      console.log(this.height - this.heightContent);
      this.scrollBarHeight = (this.height / this.heightContent) * this.height;
   }
}
</script>

<style lang="less">
.ScrollContainer {
   display: flex;
   flex-direction: column-reverse;

   &-body {
      overflow-y: auto;
      position: relative;
   }
}
</style>