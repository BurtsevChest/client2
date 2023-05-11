<template>
      <textarea @input="inputText" :placeholder="placeholder" ref="TextField" class="TextField" :value="value" name="" id=""></textarea>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "TextField",
   props: {
      placeholder: {
         type: String
      },
      value: {
         type: String
      }
   },
   methods: {
      inputText() {
         this.$refs.TextField.style.height = this.$refs.TextField.scrollHeight + 'px';
         if(this.$refs.TextField.value === '') {
            this.$refs.TextField.style.height = '37px';
         }
         this.$emit('inputText', this.$refs.TextField.value)
      }
   },
   mounted() {
      if(this.value) {
         this.$refs.TextField.style.height = this.$refs.TextField.scrollHeight + 'px';
      }
   }
}
</script>

<style lang="less">
.TextField {
   width: 100%;
   height: 37px;
   border-bottom: 1px solid rgba(128, 128, 128, 0.5);
   min-height: 37px;
   padding: 6px;

   &:hover,&:focus {
      border-bottom: 1px solid rgba(128, 128, 128, 0.9)
   }
}
</style>