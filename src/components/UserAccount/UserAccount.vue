<template>
   <div class="flex flex-nowrap app">
    <Sidebar/>
    <main class="UserAccount-main">
      <router-view/>
    </main>
    <RightAiside/>
  </div>
</template>

<script>
import Sidebar from '@/components/UserAccount/Sidebar/Sidebar.vue';
import RightAiside from '@/components/UserAccount/RightAside/RightAside.vue';

export default {
   // eslint-disable-next-line
   name: "UserAccount",
   components: {Sidebar, RightAiside}
}
</script>

<style lang="less">
@import '@/components/UserAccount/Common/styles/styles';

.UserAccount {
   &-main {
      background-color: var(--background-color-wrapper);
      color: var(--text-color);
   }
}
</style>