<template>
   <div class="RightAside flex flex-column p-20" :class="{ 'RightAside-active': getStatus }">
      <component :is="getOpenedTemplate" v-bind:options="getConfig"/>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   // eslint-disable-next-line
   name: "RightAside",
   computed: mapGetters(["getStatus", "getOpenedTemplate", "getConfig"]),
}
</script>

<style lang="less">
.RightAside {
   position: fixed;
   width: 600px;
   height: 100%;
   top: 0;
   right: -615px;
   box-shadow: 0 0 8px rgb(128 128 128 / 10%);
   background-color: var(--background-right-aside-color);
   color: var(--text-color);
   transition: 0.3s;
   z-index: 100;
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