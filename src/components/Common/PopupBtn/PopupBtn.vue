<template>
<div class="PopupBtn">
   <div class="pointer PopupBtn-btn" @click="openPopup">
      <slot name="popupBtn"></slot>
   </div>
   <div v-if="showPopup" class="PopupBtn-template" :class="[positionStyle]" :style="{inset: popupPosition}">
      <div @click="closeAfterSlotClick" class="PopupBtn-wrapper">
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
      },
      top: {
         type: String
      },
      right: {
         type: String
      },
      bottom: {
         type: String
      },
      left: {
         type: String
      },
      accessShow: {
         type: Boolean
      },
      closeAfterClick: {
         type: Boolean
      }
   },
   watch: {
      show() {
         if(this.show === false) {
            this.close()
         } else {
            this.openPopup()
         }
      }
   },
   data() {
      return {
         showPopup: false,
         popupSides: {
            top: this.top,
            right: this.right,
            bottom: this.bottom,
            left: this.left
         },
         popupPosition: ''
      }
   },
   methods: {
      closeAfterSlotClick() {
         if(this.accessShow != false && this.closeAfterClick) {
            this.showPopup = false;
            this.$emit('update:show', false);
         }
      },
      openPopup() {
         if(this.accessShow != false) {
            this.$emit('update:show', true);
            this.showPopup = true
         }
      },
      close() {
         if(this.accessShow != false) {
            this.showPopup = false;
            this.$emit('update:show', false);
         }
      },
      closePopupInsideBody(event) {
         if(this.accessShow != false) {
            const target = event.target;
            if (!target.closest('.PopupBtn-template') && !target.closest('.PopupBtn-btn')) {
               this.close()
            }
         }
      }
   },
   beforeMount() {
      Object.keys(this.popupSides).forEach((key) => {
         if(!this.popupSides[key]) {
            this.popupSides[key] = 'auto';
         }
         this.popupPosition = this.popupPosition + `${this.popupSides[key]} `;
      });
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