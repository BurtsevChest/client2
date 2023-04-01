<template>
   <Header v-if="!pageData?.hideHeader || false" />
      <div class="Index">
         <router-view 
            v-bind:pageProps="pageData?.pageProps || {}"
         />
      </div>
   <Footer v-if="!pageData?.hideFooter || false" />
</template>

<script>
import Header from '@/components/Index/Header/Header.vue';
import Footer from '@/components/Index/Footer/Footer.vue';
import { closeHeaderMenu } from '@/websync/header';
import {default as getPageData} from '@/components/Index/pageOptions';
import {default as SEO, setSeo} from '@/components/Common/helpers/meta';

export default {
   // eslint-disable-next-line
   name: "Index",
   components: {Header, Footer},
   watch: {
    '$route.path'() {
      this.setNewPageOptions(this.$route.path);
      closeHeaderMenu();
    }
  },
  data() {
   return {
      // default page Settings
      pageData: {},
      defaultSeo: {
         title: 'Project Manager',
         description: 'Project Manager is better for you'
      },
      defaultPageTitle: 'ProjectManager'
   }
  },
  methods: {
      setNewSeo(path) {
         // Исключаем страницы личного кабинета. Придумать регулярку, так безопаснее.
         if(!path.includes('/user_account')) {
            const pageSeoOption = this.pageData?.seo || this.defaultSeo;

            Object.keys(pageSeoOption).forEach((item) => {
               setSeo(SEO[item], pageSeoOption[item]);
            });
         }
      },
      setNewPageOptions(path) {
         this.pageData = getPageData[path];
         this.setNewSeo(path);
         document.title = this.pageData?.titlePage || this.defaultPageTitle;
      }
  },
  beforeMount() {
      this.setNewPageOptions(this.$route.path);
  }
}
</script>

<style lang="less">
@import '@/components/Index/MainCssTheme/index';
</style>