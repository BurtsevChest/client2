<template>
   <div class="Index">
      <ScrollContainerNew :hideScrollBar="true" @_scroll="scrollPage" :newScrollValue="pageScroll">
         <template v-slot:content>
            <Header :scrollValue="pageScroll" v-if="!pageData?.hideHeader || false" />
            <router-view 
               v-bind:pageProps="pageData?.pageProps || {}"
            />
            <Footer v-if="!pageData?.hideFooter || false" />
         </template>
      </ScrollContainerNew>
   </div>
   <RightAiside/>
   <div v-if="pageScroll > 600" @click="setNewScrollValue" class="Index-top-btn pointer flex a-items-center flex-center">
      <span class="Index-top-btn-icon material-icons">expand_less</span>
   </div>
</template>

<script>
import Header from '@/components/Index/Header/Header.vue';
import Footer from '@/components/Index/Footer/Footer.vue';
import { closeHeaderMenu } from '@/websync/header';
import {default as getPageData} from '@/components/Index/pageOptions';
import {default as SEO, setSeo} from '@/components/Common/helpers/meta';
import RightAiside from '@/components/UserAccount/RightAside/RightAside.vue';

export default {
   // eslint-disable-next-line
   name: "Index",
   components: {Header, Footer, RightAiside},
   watch: {
    '$route.path'() {
      this.setNewPageOptions(this.$route.path);
      closeHeaderMenu();
      this.setNewScrollValue();
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
      defaultPageTitle: 'ProjectManager',
      pageScroll: 0
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
         } else {
            Object.keys(this.defaultSeo).forEach((item) => {
               setSeo(SEO[item], this.defaultSeo[item]);
            });
         }
      },
      setNewPageOptions(path) {
         this.pageData = getPageData[path];
         this.setNewSeo(path);
         document.title = this.pageData?.titlePage || this.defaultPageTitle;
      },
      scrollPage(scrollValue) {
         this.pageScroll = scrollValue;
         closeHeaderMenu();
      },
      setNewScrollValue() {
         this.pageScroll = 0;
         closeHeaderMenu();
      }
  },
  beforeMount() {
      this.setNewPageOptions(this.$route.path);
  }
}
</script>

<style lang="less">
@import '@/components/Index/MainCssTheme/index';

.Index {
   height: 100vh;

   &-top-btn {
      position: fixed;
      width: 50px;
      height: 50px;
      background: #181818;
      border-radius: 50%;
      bottom: 30px;
      right: 30px;

      &-icon {
         font-size: 35px;
         color: white;

      }
   }
}
</style>