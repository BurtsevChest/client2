<template>
   <div v-for="aside in getAsides" v-bind:key="aside.opener">
      <div class="RightAside flex flex-column p-14" :class="{'RightAside-close': !aside.status}" :style="{'z-index': aside.zindex}">
         <div @click="close(aside.opener)" class="RightAside-closeBtn flex a-items-center flex-center pointer">
            <span class="material-icons">close</span>
         </div>
         <component :is="aside.openedTemplate" @closeSidebar="close(aside.opener)" v-bind:options="aside.templateProps"/>
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import { closeAsideNew } from '@/components/UserAccount/RightAside/index.js';

export default {
   // eslint-disable-next-line
   name: "RightAside",
   computed: mapGetters(["getStatus", "getOpenedTemplate", "getConfig", 'getAsides']),
   methods: {
      close(opener) {
         closeAsideNew(opener);
      }
   }
}
</script>

<style lang="less">
.RightAside {
   position: fixed;
   width: 600px;
   height: 100%;
   top: 0;
   box-shadow: 0 0 8px rgb(128 128 128 / 10%);
   background-color: var(--background-right-aside-color);
   color: var(--text-color);
   transition: 0.3s;
   z-index: 100;
   animation: asideMove 0.3s forwards;

   &-close {
      animation: closeAside 0.3s forwards;
   }

   &-closeBtn {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.2);
      border-radius: 50%;
   }
}

@keyframes asideMove {
   from {
      right: -615px;
  }

  to {
      right: 0;
  }
}

@keyframes closeAside {
   from {
      right: 0;
  }

  to {
      right: -615px;
  }
}
</style>