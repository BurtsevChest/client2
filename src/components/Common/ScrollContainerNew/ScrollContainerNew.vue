<template>
   <div class="ScrollContainerNew">
      <div ref="ScrollContainerNew" class="ScrollContainerNew-content flex flex-column">
         <div ref="wrapper" :style="{'height': contentHeight + 'px'}" class="ScrollContainerNew-scroll">
            <div>
               <slot  name="content"></slot>
            </div>
         </div>
      </div>
      <div class="ScrollContainerNew-scrollbar-wrapper">
         <div ref="scrollbar" class="ScrollContainerNew-scrollbar pointer"></div>
      </div>
   </div>
</template>

<script>
export default {
   // eslint-disable-next-line
   name: "ScrollContainerNew",
   data() {
      return {
         contentHeight: null,
         scrollValue: 0,
         scrollBarHeight: 0
      }
   },
   methods: {
      setContentHeight() {
         this.contentHeight = this.$refs.ScrollContainerNew.clientHeight;
      }
   },
   mounted() {
      this.setContentHeight();

      window.addEventListener('resize', this.setContentHeight(), true);

      this.$refs.wrapper.addEventListener('scroll', () => {
         this.scrollValue = this.$refs.wrapper.scrollTop;
         const scrollBarOffsetTop = this.contentHeight / (this.$refs.wrapper.scrollHeight/this.scrollValue);
         this.$refs.scrollbar.style.transform = `translateY(${scrollBarOffsetTop}px)`;
         this.$emit('_scroll', this.scrollValue);
      })

      this.scrollBarHeight = this.$refs.wrapper.clientHeight * (this.$refs.wrapper.clientHeight / this.$refs.wrapper.scrollHeight);
      this.$refs.scrollbar.style.height = this.scrollBarHeight + 'px';
   },
   beforeUnmount() {
      window.removeEventListener('resize', this.setContentHeight(), true);
   }
}
</script>

<style lang="less">
   .ScrollContainerNew {
      height: 100%;
      width: 100%;
      position: relative;

      &-content {
         height: 100%;
         width: 100%;
      }

      &-scroll {
         overflow: hidden;
         overflow-y: auto;
      }

      &-scrollbar-wrapper {
         position: absolute;
         right: 0;
         height: 100%;
         width: 8px;
         background-color: rgba(128, 128, 128, 0.2);
         top: 0;
         transition: 0.3s;

         &:hover {
            width: 16px;
         }
      }

      &-scrollbar {
         width: 100%;
         min-height: 40px;
         background-color: rgba(0, 0, 0, 0.3);
         border-radius: 16px;
      }
   }
</style>
