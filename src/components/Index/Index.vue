<template>
<Header/>
   <div class="Index">
      <router-view/>
   </div>
<Footer/>
</template>

<script>
import Header from '@/components/Index/Header/Header.vue';
import Footer from '@/components/Index/Footer/Footer.vue';

export default {
   // eslint-disable-next-line
   name: "Index",
   components: {Header, Footer}

}
</script>

<style lang="less">
@import '@/components/Index/MainCssTheme/index';

.Index {
   
}

</style>