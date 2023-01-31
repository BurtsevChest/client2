<template>
   {{ lang.title }}
   {{ getUser.name }}
   {{ getUser.last_name }}
</template>

<script>
// import Lang from '@/components/lang/lang.js'
import locale from '@/components/lang/Home/en.json'
import { mapGetters } from 'vuex';

export default {
   // eslint-disable-next-line
   name: "Home",
   data() {
      return {
         lang: locale,
         ...mapGetters(['getUser'])
      }
   },
   beforeMount() {
      // Lang.getTranslate('Home').then((res) => {
      //    this.lang = res.default
      // })
   }

}
</script>


<style scoped>


</style>