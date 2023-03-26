<template>
   <Header
      v-if="!hideHeader"
   />
      <div class="Index">
         <router-view/>
      </div>
   <Footer
      v-if="!hideFooter"
   />
</template>

<script>
import Header from '@/components/Index/Header/Header.vue';
import Footer from '@/components/Index/Footer/Footer.vue';
import config from './config';
import { closeHeaderMenu } from '@/websync/header';

export default {
   // eslint-disable-next-line
   name: "Index",
   components: {Header, Footer},
   watch: {
    '$route.path'() {
      this.hideHeaderOrFooter(this.$route.path);
      closeHeaderMenu();
    }
  },
  data() {
   return {
      hideHeader: false,
      hideFooter: false
   }
  },
  methods: {
      hideHeaderOrFooter(path) {
         config.forEach((item) => {
            if(item && item.path === path) {
               this.hideHeader = item.hideHeader
               this.hideFooter = item.hideFooter
            }
         })
      }
  }
}
</script>

<style lang="less">
@import '@/components/Index/MainCssTheme/index';
</style>