<template>
   <div class="Notification" :class="{ 'active' : showNotificate }">
      <div class="Notification-body pointer radius-block" >
         <component :options="noticeData" :is="noticeTemplate"/>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
   // eslint-disable-next-line
   name: "Notification",
   computed: mapGetters(['showNotificate', 'noticeTemplate', 'noticeData'])
}
</script>

<style lang="less">
.Notification {
   position: fixed;
   right: 30px;
   bottom: -100%;
   z-index: 101;
   transition: 0.3s;

   &.active {
      right: 30px;
      bottom: 30px;
   }

   &-body {
      background-color: rgb(43, 43, 43);
      color: var(--text-color);
      width: 400px;
      height: 130px;
      transition: 0.3s;

      &:hover {
         box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);
      }
   }
}
</style>