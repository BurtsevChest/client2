<template>
   <div v-if="fileReaderShow" class="FileReader flex flex-column">
      <div class="FileReader-header box-shadow pv-12 ph-10 flex flex-end">
         <button @click="closeFileReader" class="flex flex-center a-items-center">
            <span class="material-icons FileReader-header-close">close</span>
         </button>
      </div>
      <div class="FileReader-content empty_flex flex flex-center a-items-center">
         <pullRequestView v-if="fileReaderType === 'merge_request'" v-bind:merge="fileReaderFiles"/>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import pullRequestView from '@/components/Common/FileReader/templates/pullRequestView.vue';

export default {
   // eslint-disable-next-line
   name: "FileReader",
   components: {pullRequestView},
   data() {
      return {
         type: 'image' || 'word, pdf' || 'video' || 'pull request',
         files: [],
         status: false
      }
   },
   methods: {
      ...mapMutations(['closeFileReader'])
   },
   computed: mapGetters(['fileReaderShow', 'fileReaderFiles', 'fileReaderType'])
}
</script>

<style lang="less">
.FileReader {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   z-index: 1000;

   &-header {
      background-color: var(--background-color);
      color: var(--text-color);
      z-index: 1;

      &-close {
         font-size: 30px;
      }
   }

   &-content {
      background-color: rgba(0, 0, 0, 0.8);
      width: 100%;
      color: var(--text-color);
   }
}
</style>