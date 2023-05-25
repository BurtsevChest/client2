<template>
   <div class="ScrollContainer">
      <div ref="ScrollContainer" class="ScrollContainer-content flex flex-column">
         <div ref="wrapper" :style="{'height': contentHeight + 'px'}" class="ScrollContainer-scroll">
            <div ref="scrollContent">
               <slot name="content"></slot>
            </div>
         </div>
      </div>
      <div v-if="!hideScrollBar" class="ScrollContainer-scrollbar-wrapper">
         <div ref="scrollbar" class="ScrollContainer-scrollbar pointer"></div>
      </div>
   </div>
</template>

<script>
export default {
   // eslint-disable-next-line
   name: "ScrollContainer",
   props: {
      hideScrollBar: {
         type: Boolean
      },
      newScrollValue: {
         type: Number
      }
   },
   watch: {
      newScrollValue(newValue) {
         this.$refs.wrapper.scrollTop = newValue;
         this.setScrollValue(newValue);
      }
   },
   data() {
      return {
         contentHeight: null,
         scrollValue: 0,
         scrollMoved: 0,
         pos1: 0,
         pos2: 0,
         scrollBarHeight: 0,
         resizeObserver: null
      }
   },
   methods: {
      setContentHeight() {
         this.contentHeight = this.$refs.ScrollContainer.clientHeight;
      },
      setScrollValue() {
         this.scrollValue = this.$refs.wrapper.scrollTop;
      },
      moveSidebar(scrollBarOffsetTop) {
         this.$refs.scrollbar.style.transform = `translateY(${scrollBarOffsetTop}px)`;
      },
      whenPageScroll() {
         this.setScrollValue();
         if(!this.hideScrollBar) {
            const scrollBarOffsetTop = this.contentHeight / (this.$refs.wrapper.scrollHeight/this.scrollValue);
            this.moveSidebar(scrollBarOffsetTop);
         }
         this.$emit('_scroll', this.scrollValue);
      },
      stopScroll() {
         document.removeEventListener('mousemove', this.moveScrollBar);
      },
      setScrollBarHeight() {
         // FIXME: хуйня какая-то с высчитываением скроллящейся области.
         setTimeout(() => {
            this.scrollBarHeight = this.$refs.wrapper.clientHeight * (this.$refs.wrapper.clientHeight / this.$refs.scrollContent.scrollHeight);
            if(this.$refs.wrapper.clientHeight >= this.$refs.scrollContent.scrollHeight) {
               this.scrollBarHeight = 0;
            } else {
               this.$refs.scrollbar.style.minHeight  = '40px';
            }
            this.$refs.scrollbar.style.height = this.scrollBarHeight + 'px';
         }, 100);
      },
      dragStart(e) {
         e.preventDefault();
         this.pos1 = e.clientY;
         document.addEventListener("mousemove", this.moveBar);
      },
      moveBar(e) {
         e.preventDefault();
         this.pos1 = this.pos2 - e.clientY;
         this.pos2 = e.clientY;
         this.moveSidebar(this.pos1);
      },
      stopDrag() {
         document.removeEventListener("mousemove", this.moveBar);
      },
      start() {
         this.setContentHeight();
         window.addEventListener('resize', this.setContentHeight, true);
         this.$refs.wrapper.addEventListener('scroll', this.whenPageScroll);

         if(!this.hideScrollBar) {
            this.setScrollBarHeight()
         }

         // this.$refs.scrollbar.addEventListener('mousedown', this.dragStart, true);
         // document.addEventListener("mouseup", this.stopDrag, true);
      }
   },
   mounted() {
      this.resizeObserver = new ResizeObserver(this.start);
      this.resizeObserver.observe(this.$refs.scrollContent);
   },
   beforeUnmount() {
      window.removeEventListener('resize', this.setContentHeight, true);
      this.resizeObserver.unobserve(this.$refs.scrollContent);
   }
}
</script>

<style lang="less">
   .ScrollContainer {
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
         top: 0;
         transition: 0.2s;

         &:hover {
            width: 16px;
         }
      }

      &-scrollbar {
         width: 100%;
         background-color: rgba(255, 255, 255, 0.3);
         border-radius: 16px;
      }
   }
</style>
