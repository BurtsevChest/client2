<template>
  <router-view/>

  <ModalView/>
  <Notification/>
</template>

<script>
import ModalView from '@/components/Common/modalView/modalView.vue';
import store from '@/store';
import { startLocale } from '@/lang/lang';
import Notification from '@/components/Common/Notification/Notification.vue';

export default {
  name: 'App',
  watch: {
    '$route.path'() {
      store.commit('closeModalView')
    }
  },
  components: {ModalView, Notification},
  beforeCreate() {
    if(localStorage.theme) {
      document.documentElement.setAttribute('data-theme', 'dark')
    }else{
      document.documentElement.setAttribute('data-theme', 'dark')
    }
    startLocale();
  },
  mounted() {
    setTimeout(()=>{
      store.commit('showNoticeTime')
    }, 5000)
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

.vc-pane-container {
  background-color: var(--background-color);
  color: var(--text-color);
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
