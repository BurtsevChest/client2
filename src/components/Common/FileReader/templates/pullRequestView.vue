<template>
   <div class="pullRequestView">
      <VueDiff
         :mode="'unified'"
         :theme="'dark'"
         :language="'javascript'"
         :current="mergeDiffs[0].diff"
         :folding="true"
      />
   </div>
</template>

<script>
import GitLabApi from '@/GitHubApi';

export default {
   // eslint-disable-next-line
   name: "pullRequestView",
   props: {
      merge: {
         type: Object
      }
   },
   data() {
      return {
         mergeDiffs:[
            {
               diff: ''
            }
         ]
      }
   },
   methods: {
      getPullRequestDiffs() {
         GitLabApi.getMergeRequestDiffs(this.merge.project_id, this.merge.iid)
         .then((res) => {
            this.mergeDiffs = res.data;
         })
      }
   },
   mounted() {
      this.getPullRequestDiffs();
   }
}
</script>

<style lang="less">
.pullRequestView {

}
</style>