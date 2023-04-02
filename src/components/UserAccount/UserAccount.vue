<template>
   <div class="flex flex-nowrap app">
    <!-- Sidebar -->
    <Sidebar/>

    <!-- Content -->
    <main>
      <router-view/>
    </main>

    <!-- RightAside -->
    <RightAiside/>
  </div>
</template>

<script>
import Sidebar from '@/components/UserAccount/Sidebar/Sidebar.vue';
import RightAiside from '@/components/UserAccount/RightAside/RightAside.vue';

export default {
   // eslint-disable-next-line
   name: "UserAccount",
   components: {
      Sidebar, RightAiside
   }
}
</script>

<style lang="less">
   @import '@/components/UserAccount/Common/styles/styles';

</style>