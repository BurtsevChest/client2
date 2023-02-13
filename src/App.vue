<template>
  <router-view/>

  <!-- Модалка -->
  <ModalView/>
</template>

<script>
import ModalView from '@/components/Common/modalView/modalView.vue';
import store from './store';
import { setPageName } from '@/components/Common/helpers/setPageName';
import seoData from '@/components/Index/Common/seoData.json';

const SEO_PAGE_TITLE = document.querySelector('meta[name="title"]');
const SEO_PAGE_DESCRIPTION = document.querySelector('meta[name="description"]');

export default {
  name: 'App',
  watch: {
    // Отслеживаем перемещение по ссылкам
    '$route.path'() {
      // Задаем Title страницe
      setPageName(this.$route.path);

      // Задаем SEO странице
      this.setSeoData(this.$route.path)

      // Закрываем модальное окно
      store.commit('closeModalView')
    }
  },
  components: {ModalView},
  data() {
    return {
      activeURL: true
    }
  },
  methods: {
    setSeoData(path) {
      try {
        if(!path.includes('/user_account')) {
          SEO_PAGE_TITLE.setAttribute("content", seoData[path].title)
          SEO_PAGE_DESCRIPTION.setAttribute("content", seoData[path].description)
        }else {
          SEO_PAGE_TITLE.setAttribute("content", '')
          SEO_PAGE_DESCRIPTION.setAttribute("content", '')
        }
      } catch(error) {
        console.log('Cannot define seo');
      }
      }
  },
  beforeCreate() {
    if(localStorage.theme) {
      document.documentElement.setAttribute('data-theme', localStorage.theme)
    }else{
      document.documentElement.setAttribute('data-theme', 'light')
    }
  },
  beforeMount() {
    // Определяем локаль и сохраняем в истории бразуера
    localStorage.setItem('locale', navigator.language)
  }
}
</script>

<style lang="less">
@import '@/assets/css/flex.css';
@import '@/assets/css/reset.css';
@import '@/assets/css/themes.css';
@import '@/assets/css/ui_styles.css';
@import '@/assets/css/grid.less';

main {
  padding: 24px;
  width: 100%;
}

body {
  min-width: 375px;
  
}
.vc-container {
  border: none !important;
}

.app {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
