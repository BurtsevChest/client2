<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar/>

    <!-- Content -->
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<style>
@import '@/assets/css/flex.css';
@import '@/assets/css/reset.css';
@import '@/assets/css/themes.css';

 * {
  margin: 0;
  padding: 0;
 }

main {
  padding: 24px;
  width: 100%;
}
</style>
