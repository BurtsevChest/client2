<template>
   <div v-if="show" class="SuperPopup radius-block p-10" :class="[positionStyle]">
      <div class="SuperPopup-wrapper">
         <div v-if="!hideBtn" class="flex flex-end pb-4">
            <span @click="close" class="material-icons pointer" :style="{ color : colorBtn }"> {{ btn ? btn : 'close' }}</span>
         </div>
         <slot class="SuperPopup-content"></slot>
      </div>
   </div>
</template>

<script>

export default {
   props: {
      show: {
         type: Boolean,
         required: true
      },
      positionStyle: {
         type: String,
         required: true
      },
      btn: {
         type: String
      },
      colorBtn: {
         type: String
      },
      hideBtn: {
         type: Boolean
      }
   },
   // eslint-disable-next-line
   name: "SuperPopup",
   methods: {
      close() {
         this.$emit('update:show', false)
      }
   },
   date() {
      return {
         button: this.btn
      }
   }
}
</script>

<style lang="less">
.SuperPopup {
   position: absolute;
   min-width: 200px;
   background: white;
   box-shadow: 0 0 15px rgba(128, 128, 128, 0.4);
   z-index: 11111;
   overflow: hidden;
   color: black;

   &-wrapper {

   }

   &-content {
      overflow: hidden;
      overflow-y: scroll;
   }
}

</style>