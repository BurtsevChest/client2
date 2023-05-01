<template>
<div class="PopupBtn">
   <div class="pointer PopupBtn-btn" @click="openPopup">
      <slot name="popupBtn"></slot>
   </div>
   <div v-if="showPopup" class="PopupBtn-template" :class="[positionStyle]">
      <div class="PopupBtn-wrapper">
         <div v-if="!hideBtn" class="flex flex-end pb-4">
            <span @click="close" class="material-icons pointer" :style="{ color : btnColor }"> {{ btnIcon ? btnIcon : 'close' }}</span>
         </div>
         <slot name="popupTemplate" class="PopupBtn-content"></slot>
      </div>
   </div>
</div>
</template>

<script>
export default {
   // eslint-disable-next-line
   name: "PopupBtn",
   props: {
      btnIcon: {
         type: String
      },
      btnColor: {
         type: String
      },
      positionStyle: {
         type: String
      },
      hideBtn: {
         type: Boolean
      },
      show: {
         type: Boolean
      }
   },
   watch: {
      show() {
         if(this.show === false) {
            this.close()
         }
      }
   },
   data() {
      return {
         showPopup: false
      }
   },
   methods: {
      openPopup() {
         this.$emit('update:show', true);
         this.showPopup = true
      },
      close() {
         this.showPopup = false;
         this.$emit('update:show', false);
      },
      closePopupInsideBody(event) {
         const target = event.target;
         if (!target.closest('.PopupBtn-template') && !target.closest('.PopupBtn-btn')) {
            this.close()
         }
      }
   },
   beforeMount() {
      window.addEventListener('click', e => {
         this.closePopupInsideBody(e)
      }, true)
   },
   beforeUnmount() {
      window.removeEventListener('click', e => {
         this.closePopupInsideBody(e)
      }, true)
   }
}
</script>

<style lang="less">
.PopupBtn {
   position: relative;

   &-template {
      position: absolute;
      z-index: 11111;

      &-active {
         opacity: 1;
      }

      &-wrapper {

      }

      &-content {
         overflow: hidden;
         overflow-y: scroll;
      }
   }
}
</style>