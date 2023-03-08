<template>
   <div class="Header">
      <div class="Header-body  ph-30" :class="{ 'Header-body scroll' : scrollPage }">
         <div class="container">
            <div class="flex flex-space flex-noGutter">
               <div class="flex-col flex a-items-center">
                  <router-link to="/main">
                     <div class="Header-logo">
                        ProjectManager
                     </div>
                  </router-link>
               </div>
               <div class="flex a-items-center flex-col">
                  <PopupBtn :positionStyle="'Header-popup'" v-model:show="showPopup" :hideBtn=true >
                     <template v-slot:popupBtn>
                        <span class="flag-icon" :class="flag"></span>
                     </template>
                     <template v-slot:popupTemplate>
                        <div v-for="item in langItems" v-bind:key="item.locale" class="Header-popup-item-pb-8">
                           <div class="Header-popup-item ph-10 pv-16 pointer radius-block flex a-items-center" @click="closePopup(item.locale)">
                              <span class="flag-icon" :class="item.flag"></span>
                              <div class="pl-8">{{item.name}}</div>
                           </div>
                        </div>
                     </template>
                  </PopupBtn>
                  <a class="pointer Header-signUp ml-18" @click="signUp">{{ $t('index_header_enter_btn') }}</a>
                  <div class="flex a-items-center pl-40">
                     <div class="Header-burger pointer" @click="openMenu" :class="{ 'Header-burger-active' : HeaderStatus }">
                        <span></span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="Header-dropMenu" :class="{ 'Header-dropMenu-active' : HeaderStatus }">
         <div class="container">
            <div class="flex pt-20">
               <div class="flex-col flex-col-4 flex-col-xm-6 flex-col-sm-12">
                  <router-link class="greyBlock radius-block ph-12 pv-16" to="/landing">
                     LandingPage
                  </router-link>
               </div>
               <div class="flex-col flex-col-4 flex-col-xm-6 flex-col-sm-12">
                  <div class="greyBlock radius-block ph-12 pv-16">
                     sdsd
                  </div>
               </div>
               <div class="flex-col flex-col-4 flex-col-xm-6 flex-col-sm-12">
                  <div class="greyBlock radius-block ph-12 pv-16">
                     sdsd
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { openDialog } from '@/components/Common/modalView';
import { openHeaderMenu, closeHeaderMenu } from '@/websync/header';
import { mapGetters } from 'vuex';
import { loadLanguageAsync, getLocale, translatedlanguages } from '@/lang/lang';

export default {
   // eslint-disable-next-line
   name: "Header",
   data() {
      return {
         stasusMenu: false,
         scrollPage: false,
         showPopup: false,
         flag: 'flag-icon-',
         locale: getLocale(),
         langItems: translatedlanguages
      }
   },
   methods: {
      signUp() {
         if(localStorage.accessToken) {
            this.$router.push('/user_account/home')
         }else {
            openDialog({template: 'components/Index/Header/templates/Login/Login.vue'});
         }
      },
      openMenu() {
         if(this.HeaderStatus) {
            closeHeaderMenu()
         }else {
            openHeaderMenu()
         }
      },
      openPopup() {
         this.showPopup = true
      },
      closePopup(locale) {
         this.locale = locale;
         this.showPopup = false;
         loadLanguageAsync(locale);
         if(locale === 'en') {
            locale = 'us'
         }
         this.flag = 'flag-icon-' + locale;
         window.location.href = '/main';
      },
      getFlag() {
         var fl = getLocale();
         if(fl === 'en') {
            fl = 'us'
         }
         this.flag = 'flag-icon-' + fl;
      }
   },
   computed: mapGetters(['HeaderStatus']),
   beforeCreate() {
      window.addEventListener("scroll", () => {
         if(window.scrollY > 0) {
            this.scrollPage = true
         }else {
            this.scrollPage = false
         }
      });
   },
   beforeMount() {
      this.getFlag()
   }
}
</script>

<style lang="less">
.Header {
   position: fixed;
   top: 0;
   width: 100%;
   z-index: 100;

   &-body {
      transition: 0.3s;
      &.scroll {
         background: rgb(255 255 255 / 80%);
         -webkit-backdrop-filter: blur(8px);
         backdrop-filter: blur(8px);
      }
   }

   &-dropMenu {
      position: absolute;
      width: 100%;
      height: 500px;
      bottom: 0;
      background-color: white;
      border-radius: 0 0 24px 24px;
      top: -100vh;
      z-index: -1;
      transition: 0.5s;
      padding-top: 100px;
      box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);

      &-active {
         top: 0;
      }
   }

   &-logo {
      font-size: 22px;
      // color: #334155;
      color: black;

      @media (max-width: 400px) {
         font-size: 18px;
      }
   }

   &-signUp {
      font-size: 20px;
      // color: #334155;
      color: black;

      @media (max-width: 400px) {
         font-size: 16px;
      }
   }

   &-burger {
      width: 35px;
      height: 35px;
      position: relative;

      &>span, &::after, &::before  {
         position: absolute;
         width: 100%;
         height: 2px;
         background-color: black;
      }

      &>span {
         top: 50%;
         transform: translateY(-50%);
      }

      &::after, &::before {
         content: '';
         transition: 0.3s;
      }

      &::after {
         top: 5px;
      }

      &::before {
         bottom: 5px;
      }

      &-active {
         &>span, &::after, &::before  {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: black;
         }

         &>span {
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
         }

         &::after, &::before {
            content: '';
         }

         &::after {
            top: 50%;
            transform: rotate(-45deg) translateY(-50%);
         }

         &::before {
            bottom: 50%;
            transform: rotate(45deg) translateY(50%);
         }
      }
   }

   &-popup {
      top: -5px;
      right: -5px;

      &-item {
         &:hover {
            box-shadow: 0 0 12px rgba(128, 128, 128, 0.5);
         }

         &-pb-8 {
            padding-bottom: 8px;
            &:last-child {
               padding-bottom: 0;
            }
         }
      }
   }
}

</style>