<template>
   <div class="scrollBar">
      <div ref="scrollWrapper" class="scrollBar-wrapper">
         <div ref="scrollBody" class="scrollBar-body"></div>
      </div>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "scrollBar",
   props: {
      scrollParent: {
         type: Number
      },
      scrollBarHeight: {
         type: Number
      }
   },
   watch: {
      scrollParent(newValue, old) {
         this.$refs.scrollBody.style.top = `${old}px`;
      },
      scrollBarHeight(newValue) {
         this.$refs.scrollBody.style.height = `${newValue}px`;
      }
   },
   data() {
      return {
         scrollPosition: 0,
         scrollPositionMoved: 0,
         wrapperHeight: 0
      }
   },
   methods: {
      dragStart(_event) {
         _event.preventDefault();
         this.scrollPosition = _event.clientY;
         document.addEventListener("mousemove", this.moveScrollBar);
         document.addEventListener("mouseup", this.stopScroll);

         // Подумать надо-ли
         // document.addEventListener("mouseout", this.stopScroll);
      },
      moveScrollBar(_event, parentScroll) {
         this.scrollPositionMoved = this.scrollPosition - _event.clientY;
         this.scrollPosition = _event.clientY;
         let scroll = this.$refs.scrollBody.offsetTop - this.scrollPositionMoved;

         if(parentScroll) {
            scroll = parentScroll;
         }         

         if(scroll < 0) {
            scroll = 0;
         }

         if(scroll > this.wrapperHeight - 200) {
            scroll = this.wrapperHeight - 200;
         }
   
         this.$refs.scrollBody.style.top = `${scroll}px`;
      },
      stopScroll() {
         document.removeEventListener("mousemove", this.moveScrollBar);
      }
   },
   mounted() {
      this.$refs.scrollBody.addEventListener('mousedown', this.dragStart);
      this.$refs.scrollBody.style.height = `${this.scrollBarHeight}px`;
      this.wrapperHeight = this.$refs.scrollWrapper.scrollHeight;
   }
}
</script>

<style lang="less">
.scrollBar {
   height: 100%;
   position: absolute;
   right: 0;
   top: 0;
   width: 8px;
   transition: 0.3s;

   &:hover {
      width: 16px;
   }

   &-wrapper {
      position: relative;
      height: 100%;
      cursor: pointer;
   }

   &-body {
      width: 100%;
      position: absolute;
      border-radius: 20px;
      background-color: rgba(128, 128, 128, 0.3);
   }
}
</style>
