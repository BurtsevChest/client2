<template>
  <router-view/>

  <!-- Модалка -->
  <ModalView/>
</template>

<script>
import ModalView from '@/components/Common/modalView/modalView.vue';
import store from './store';
import { setPageName } from '@/components/Common/helpers/setPageName';
import { setSeo } from './components/Index/Common/helpers/seo';
import { startLocale } from './lang/lang';

export default {
  name: 'App',
  watch: {
    // Отслеживаем перемещение по ссылкам
    '$route.path'() {
      // Задаем Title страницe
      setPageName(this.$route.path);

      setSeo(this.$route.path)

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
  beforeCreate() {
    if(localStorage.theme) {
      document.documentElement.setAttribute('data-theme', localStorage.theme)
    }else{
      document.documentElement.setAttribute('data-theme', 'light')
    }
    startLocale();
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
@import '@/assets/css/flag-icon.min.css';

main {
  width: 100%;
}

body {
  min-width: 375px;
}
.vc-container {
  border: none !important;
}

aside {
  z-index: 1;
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
