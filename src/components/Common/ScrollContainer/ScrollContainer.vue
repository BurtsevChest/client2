<template>
   <div class="ScrollContainer">
      <div ref="ScrollContainer" class="ScrollContainer-content flex flex-column">
         <div ref="wrapper" :style="{'height': contentHeight + 'px'}" class="ScrollContainer-scroll">
            <div class="height-100" ref="scrollContent">
               <slot  name="content"></slot>
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
         pos2: 0,
         scrollBarHeight: 0
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
      scrollbarDragStart(_event) {
         _event.preventDefault();
         this.scrollValue = _event.clientY;
         document.addEventListener("mousemove", this.moveScrollBar);
      },
      moveScrollBar(event) {
         this.pos2 = this.scrollMoved - event.clientY;
         this.scrollMoved = event.clientY;
         console.log(this.$refs.scrollbar.offsetTop + ' ' + this.pos2);
         this.moveSidebar(this.$refs.scrollbar.offsetTop - this.pos2);
      },
      stopScroll() {
         document.removeEventListener('mousemove', this.moveScrollBar);
      }
   },
   mounted() {
      this.setContentHeight();
      window.addEventListener('resize', this.setContentHeight, true);
      this.$refs.wrapper.addEventListener('scroll', this.whenPageScroll);

      if(!this.hideScrollBar) {
         // FIXME: хуйня какая-то с высчитываением скроллящейся области. 
         setTimeout(() => {
            this.scrollBarHeight = this.$refs.wrapper.clientHeight * (this.$refs.wrapper.clientHeight / this.$refs.scrollContent.clientHeight);
            this.$refs.scrollbar.style.height = this.scrollBarHeight + 'px';
         }, 100);

         this.$refs.scrollbar.addEventListener('mousedown', this.scrollbarDragStart);
         document.addEventListener("mouseup", this.stopScroll);
      }
   },
   beforeUnmount() {
      window.removeEventListener('resize', this.setContentHeight, true);
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
         min-height: 40px;
         background-color: rgba(0, 0, 0, 0.3);
         border-radius: 16px;
      }
   }
</style>
