<template>
  <router-view/>

  <ModalView/>
</template>

<script>
import ModalView from '@/components/Common/modalView/modalView.vue';
import store from '@/store';
import { startLocale } from '@/lang/lang';

export default {
  name: 'App',
  watch: {
    '$route.path'() {
      store.commit('closeModalView')
    }
  },
  components: {ModalView},
  beforeCreate() {
    if(localStorage.theme) {
      document.documentElement.setAttribute('data-theme', localStorage.theme)
    }else{
      document.documentElement.setAttribute('data-theme', 'light')
    }
    startLocale();
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
