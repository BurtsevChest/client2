<template>
   <div v-if="getModalViewStatus" class="ModalView" @click.stop="closeModalView">
      <div @click.stop class="ModalView-body">
         <component :is="getModalViewTemplate" v-bind:options="getModalViewConfig"/>
      </div>
   </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(['getModalViewStatus', 'getModalViewTemplate', 'getModalViewConfig']),
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
   background: rgba(0, 0, 0, 0.2);
   z-index: 100;
   overflow-y: scroll;
   cursor: pointer;

   &-body {
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      cursor: default;
      padding: 0 12px;
   }
}

</style>