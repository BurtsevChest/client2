<template>
   <div v-if="getModalViewStatus" class="ModalView" @click.stop="closeModalView">
      <div @click.stop class="ModalView-body">
         <component :is="getModalViewTemplate" />
      </div>
   </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(['getModalViewStatus', 'getModalViewTemplate']),
   methods: {
      ...mapMutations(['closeModalView'])
   }
}
</script>

<style lang="less" scoped>
.ModalView {
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   position: fixed;
   display: flex;
   background: rgba(0, 0, 0, 0.5);
   z-index: 100;
   overflow-y: scroll;
   cursor: pointer;

   &-body {
      margin: auto;
      background-color: white;
      border-radius: 12px;
      padding: 20px;
      cursor: default;
   }
}

</style>