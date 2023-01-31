<template>
   <div v-if="show" class="SuperPopup p-8" :style="{left: cfg.clientX + 'px', top: cfg.clientY + 'px'}">
      <div class="SuperPopup-wrapper">
         <div class="flex flex-end pb-4">
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
      config: {
         type: Object,
         required: true
      },
      btn: {
         type: String
      },
      colorBtn: {
         type: String
      }
   },
   watch: {
      config() {
         this.cfg = this.config
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
         cfg: this.config,
         button: this.btn
      }
   }
}
</script>


<style lang="less" scoped>
.SuperPopup {
   position: fixed;
   min-width: 200px;
   background: white;
   box-shadow: 0 0 15px rgba(128, 128, 128, 0.4);
   border-radius: 12px;
   z-index: 11111;
   transform: translateX(-50%);
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