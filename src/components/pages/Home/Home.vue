<template>
   {{ lang.title }}
</template>

<script>
import Lang from '@/components/lang/lang.js'

export default {
   // eslint-disable-next-line
   name: "Home",
   data() {
      return {
         lang: {}
      }
   },
   beforeMount() {
      Lang.getTranslate('Home').then((res) => {
         this.lang = res.default
      })
   }

}
</script>


<style scoped>


</style>