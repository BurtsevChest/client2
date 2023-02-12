<template>
   <div class="RightAside flex flex-column p-20" :class="{ 'RightAside-active': getStatus }">
      <button class="RightAside-closeBtn a-self-end" @click="close">
      <span class="material-icons flex flex-center a-items-center">close</span>
      </button>
      <!-- достаем из стора открываемый компонент -->
      <component :is="getOpenedTemplate" v-bind:options="getConfig"/>
   </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
   // eslint-disable-next-line
   name: "RightAside",
   computed: mapGetters(["getStatus", "getOpenedTemplate", "getConfig"]),
   methods: {
    ...mapMutations(['close']),
   }
}
</script>

<style lang="less">
.RightAside {
   position: absolute;
   width: 600px;
   height: 100%;
   top: 0;
   right: -600px;
   box-shadow: 0 0 15px rgb(128 128 128 / 50%);
   background-color: var(--background-right-aside-color);
   color: var(--text-color);
   transition: 0.3s ease;

   @media (max-width: 1600px) {
      width: 400px;
      right: -400px;
   }

   &-active {
      right: 0;
   }

   &-closeBtn {
      display: block;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.2);
      border-radius: 50%;
   }
}
</style>