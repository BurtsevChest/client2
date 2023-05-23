<template>
  <router-view/>
  <ModalView/>
  <Notification/>
  <FileReader/>
</template>

<script>
import ModalView from '@/components/Common/modalView/modalView.vue';
import store from '@/store';
import { startLocale } from '@/lang/lang';
import Notification from '@/components/Common/Notification/Notification.vue';
import FileReader from '@/components/Common/FileReader/FileReader.vue';

export default {
  name: 'App',
  watch: {
    '$route.path'() {
      store.commit('closeModalView');
    }
  },
  components: {ModalView, Notification, FileReader},
  beforeCreate() {
    store.commit('setTheme', 'dark');
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
  border-radius: 12px;
}

.vc-pane-container {
  background-color: var(--background-color);
  color: var(--text-color);border-radius: 12px;
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
