<template>
  <router-view/>

  <!-- Модалка -->
  <ModalView/>
</template>

<script>
import ModalView from '@/components/Common/modalView/modalView.vue';
import store from './store';
import { setPageName } from '@/components/Common/helpers/setPageName';
import seoData from '@/components/Index/CommonIndex/seoData.json';

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

    // if(!localStorage.token) {
    //   this.$router.push('/login')
    //   localStorage.setItem('sidebar', false)
    //   this.activeURL = localStorage.sidebar
    // }
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

body {
  min-width: 375px;
  
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
      padding: @i*1px !important;
    }
  }

  .pv-xm-@{i} {
    @media (max-width: 800px) {
      padding-left: @i*1px !important;
      padding-right: @i*1px !important;
    }
  }

  .ph-xm-@{i} {
    @media (max-width: 800px) {
      padding-top: @i*1px !important;
      padding-left: @i*1px !important;
    }
  }

  .pt-xm-@{i} {
    @media (max-width: 800px) {
      padding-top: @i*1px !important;
    }
  }

  .pb-xm-@{i} {
    @media (max-width: 800px) {
      padding-bottom: @i*1px !important;
    }
  }

  .pr-xm-@{i} {
    @media (max-width: 800px) {
      padding-right: @i*1px !important;
    }
  }

  .pl-xm-@{i} {
    @media (max-width: 800px) {
      padding-left: @i*1px !important;
    }
  }

  // margin tablet
  .m-xm-@{i} {
    @media (max-width: 800px) {
      margin: @i*1px !important;
    }
  }

  .mv-xm-@{i} {
    @media (max-width: 800px) {
      margin-left: @i*1px !important;
      margin-right: @i*1px !important;
    }
  }

  .mh-xm-@{i} {
    @media (max-width: 800px) {
      margin-top: @i*1px !important;
      margin-left: @i*1px !important;
    }
  }

  .mt-xm-@{i} {
    @media (max-width: 800px) {
      margin-top: @i*1px !important;
    }
  }

  .mb-xm-@{i} {
    @media (max-width: 800px) {
      margin-bottom: @i*1px !important;
    }
  }

  .mr-xm-@{i} {
    @media (max-width: 800px) {
      margin-right: @i*1px !important;
    }
  }

  .ml-xm-@{i} {
    @media (max-width: 800px) {
      margin-left: @i*1px !important;
    }
  }

  // padding mobile
  .p-sm-@{i} {
    @media (max-width: 400px) {
      padding: @i*1px !important;
    }
  }

  .pv-sm-@{i} {
    @media (max-width: 400px) {
      padding-left: @i*1px !important;
      padding-right: @i*1px !important;
    }
  }

  .ph-sm-@{i} {
    @media (max-width: 400px) {
      padding-top: @i*1px !important;
      padding-left: @i*1px !important;
    }
  }

  .pt-sm-@{i} {
    @media (max-width: 400px) {
      padding-top: @i*1px !important;
    }
  }

  .pb-sm-@{i} {
    @media (max-width: 400px) {
      padding-bottom: @i*1px !important;
    }
  }

  .pr-sm-@{i} {
    @media (max-width: 400px) {
      padding-right: @i*1px !important;
    }
  }

  .pl-sm-@{i} {
    @media (max-width: 400px) {
      padding-left: @i*1px !important;
    }
  }

  // margin mobile
  .m-sm-@{i} {
    @media (max-width: 400px) {
      margin: @i*1px !important;
    }
  }

  .mv-sm-@{i} {
    @media (max-width: 400px) {
      margin-left: @i*1px !important;
      margin-right: @i*1px !important;
    }
  }

  .mh-sm-@{i} {
    @media (max-width: 400px) {
      margin-top: @i*1px !important;
      margin-left: @i*1px !important;
    }
  }

  .mt-sm-@{i} {
    @media (max-width: 400px) {
      margin-top: @i*1px !important;
    }
  }

  .mb-sm-@{i} {
    @media (max-width: 400px) {
      margin-bottom: @i*1px !important;
    }
  }

  .mr-sm-@{i} {
    @media (max-width: 400px) {
      margin-right: @i*1px !important;
    }
  }

  .ml-sm-@{i} {
    @media (max-width: 400px) {
      margin-left: @i*1px !important;
    }
  }

  .generateStandartGutters(@n, @i+2)
}

.generateStandartColumns(12); //сетка 12ти-колоночная
.generateStandartGutters(40); //отступы сгенерируются от 0 до 40(только четные)
</style>
