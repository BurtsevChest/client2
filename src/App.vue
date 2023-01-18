<template>
  <div class="flex flex-nowrap app">
    <!-- Sidebar -->
    <Sidebar v-if="activeURL != '/login'"/>

    <!-- Content -->
    <main>
      <router-view/>
    </main>

    <!-- RightAside -->
    <RightAiside/>

    <!-- Модальное окно -->
    <ModalView/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import RightAiside from '@/components/RightAside/RightAside.vue';
import ModalView from '@/components/Common/modalView/modalView.vue';

export default {
  name: 'App',
  components: {
    Sidebar, RightAiside, ModalView
  },
  data() {
    return {
      activeURL: ''
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
    const url = new URL(window.location)
    this.activeURL = url.pathname
  }
}
</script>

<style lang="less">
@import '@/assets/css/flex.css';
@import '@/assets/css/reset.css';
@import '@/assets/css/themes.css';
@import '@/assets/css/ui_styles.css';

main {
  padding: 24px;
  width: 100%;
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

// функция генерации колонок сетки
.generateStandartColumns(@n, @i: 1) when (@i =< @n) {
  .flex-col-@{i} {
    width: ((@i*100%) / @n);
  }

  .flex-col-xm-@{i} {
    @media (max-width: 800px) {
      width: ((@i*100%) / @n);
    }
  }

  .flex-col-sm-@{i} {
    @media (max-width: 400px) {
      width: ((@i*100%) / @n);
    }
  }

  .generateStandartColumns(@n, @i+1)
}

// функция генерации стандартных отступов
.generateStandartGutters(@n, @i: 0) when (@i =< @n) {
  // padding
  .p-@{i} {
    padding: @i*1px;
  }

  .pv-@{i} {
    padding-left: @i*1px;
    padding-right: @i*1px;
  }

  .ph-@{i} {
    padding-top: @i*1px;
    padding-bottom: @i*1px;
  }

  .pt-@{i} {
    padding-top: @i*1px;
  }

  .pb-@{i} {
    padding-bottom: @i*1px;
  }

  .pr-@{i} {
    padding-right: @i*1px;
  }

  .pl-@{i} {
    padding-left: @i*1px;
  }

  // margin
  .m-@{i} {
    margin: @i*1px;
  }

  .mv-@{i} {
    margin-left: @i*1px;
    margin-right: @i*1px;
  }

  .mh-@{i} {
    margin-top: @i*1px;
    margin-bottom: @i*1px;
  }

  .mt-@{i} {
    margin-top: @i*1px;
  }

  .mb-@{i} {
    margin-bottom: @i*1px;
  }

  .mr-@{i} {
    margin-right: @i*1px;
  }

  .ml-@{i} {
    margin-left: @i*1px;
  }

  // padding tablet
  .p-xm-@{i} {
    @media (max-width: 800px) {
      padding: @i*1px;
    }
  }

  .pv-xm-@{i} {
    @media (max-width: 800px) {
      padding-left: @i*1px;
      padding-right: @i*1px;
    }
  }

  .ph-xm-@{i} {
    @media (max-width: 800px) {
      padding-top: @i*1px;
      padding-left: @i*1px;
    }
  }

  .pt-xm-@{i} {
    @media (max-width: 800px) {
      padding-top: @i*1px;
    }
  }

  .pb-xm-@{i} {
    @media (max-width: 800px) {
      padding-bottom: @i*1px;
    }
  }

  .pr-xm-@{i} {
    @media (max-width: 800px) {
      padding-right: @i*1px;
    }
  }

  .pl-xm-@{i} {
    @media (max-width: 800px) {
      padding-left: @i*1px;
    }
  }

  // margin tablet
  .m-xm-@{i} {
    @media (max-width: 800px) {
      margin: @i*1px;
    }
  }

  .mv-xm-@{i} {
    @media (max-width: 800px) {
      margin-left: @i*1px;
      margin-right: @i*1px;
    }
  }

  .mh-xm-@{i} {
    @media (max-width: 800px) {
      margin-top: @i*1px;
      margin-left: @i*1px;
    }
  }

  .mt-xm-@{i} {
    @media (max-width: 800px) {
      margin-top: @i*1px;
    }
  }

  .mb-xm-@{i} {
    @media (max-width: 800px) {
      margin-bottom: @i*1px;
    }
  }

  .mr-xm-@{i} {
    @media (max-width: 800px) {
      margin-right: @i*1px;
    }
  }

  .ml-xm-@{i} {
    @media (max-width: 800px) {
      margin-left: @i*1px;
    }
  }

  // padding mobile
  .p-sm-@{i} {
    @media (max-width: 400px) {
      padding: @i*1px;
    }
  }

  .pv-sm-@{i} {
    @media (max-width: 400px) {
      padding-left: @i*1px;
      padding-right: @i*1px;
    }
  }

  .ph-sm-@{i} {
    @media (max-width: 400px) {
      padding-top: @i*1px;
      padding-left: @i*1px;
    }
  }

  .pt-sm-@{i} {
    @media (max-width: 400px) {
      padding-top: @i*1px;
    }
  }

  .pb-sm-@{i} {
    @media (max-width: 400px) {
      padding-bottom: @i*1px;
    }
  }

  .pr-sm-@{i} {
    @media (max-width: 400px) {
      padding-right: @i*1px;
    }
  }

  .pl-sm-@{i} {
    @media (max-width: 400px) {
      padding-left: @i*1px;
    }
  }

  // margin mobile
  .m-sm-@{i} {
    @media (max-width: 400px) {
      margin: @i*1px;
    }
  }

  .mv-sm-@{i} {
    @media (max-width: 400px) {
      margin-left: @i*1px;
      margin-right: @i*1px;
    }
  }

  .mh-sm-@{i} {
    @media (max-width: 400px) {
      margin-top: @i*1px;
      margin-left: @i*1px;
    }
  }

  .mt-sm-@{i} {
    @media (max-width: 400px) {
      margin-top: @i*1px;
    }
  }

  .mb-sm-@{i} {
    @media (max-width: 400px) {
      margin-bottom: @i*1px;
    }
  }

  .mr-sm-@{i} {
    @media (max-width: 400px) {
      margin-right: @i*1px;
    }
  }

  .ml-sm-@{i} {
    @media (max-width: 400px) {
      margin-left: @i*1px;
    }
  }

  .generateStandartGutters(@n, @i+2)
}

.generateStandartColumns(12); //сетка 12ти-колоночная
.generateStandartGutters(40); //отступы сгенерируются от 0 до 40(только четные)
</style>
