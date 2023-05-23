<template>
   <div class="ReposPage flex flex-column height-100 ">
      <div class="p-20 flex flex-column">
         <div @click="() => {$router.go(-1)}" class="ReposPage-linkBack flex a-items-center pb-12 pointer">
            <span class="material-icons">arrow_back</span>
            <span class="pl-10">Назад</span>
         </div>
         <div class="user_account-h1 pb-20">{{ repos.name }}</div>
         <div class="flex ReposPage-tabs">
            <div class="ReposPage-tabs-item ph-10 pointer active">
               <span>Merge requests</span>
            </div>
            <div class="ReposPage-tabs-item ml-12 ph-10 pointer">
               <span>Files</span>
            </div>
         </div>
      </div>
      <div class="empty_flex">
         <ScrollContainerNew :hideScrollBar="true">
            <template v-slot:content>
               <div class="pv-20 pb-20">
                  <div class="flex-container">
                     <div class="flex-col flex-col-9">
                        <div v-if="mergeList.length === 0" class="standart-text-grey">
                           Список Merge Request пуст
                        </div>
                        <mergeRequestItemVue v-else @click="openFileReader(merge)" v-for="merge in mergeList" v-bind:key="merge.id" v-bind:merge="merge" class='background-grey-hover radius-block pv-12 ph-10 pointer mb-12'/>
                     </div>
                     <div class="flex-col flex-col-3">
                        <div class="ReposPage-filtres radius-block p-10 flex flex-column">
                           <div class="ReposPage-filtres-item box-shadow ph-6 pv-10 pointer radius-block">
                              Какие-то фильтры
                           </div>
                           <div class="ReposPage-filtres-item box-shadow ph-6 pv-10 pointer radius-block">
                              Какие-то фильтры
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </template>
         </ScrollContainerNew>
      </div>
   </div>
</template>

<script>
import GitLabApi from '@/GitHubApi';
import mergeRequestItemVue from './templates/mergeRequestItem.vue';
import { openFileReader } from '@/components/Common/FileReader';

export default {
   // eslint-disable-next-line
   name: "ReposPage",
   components: {mergeRequestItemVue},
   data() {
      return {
         repos: {},
         mergeList: []
      }
   },
   methods: {
      setPageData(repos, mergeList) {
         this.repos = repos;
         this.mergeList = mergeList;
      },
      openFileReader(merge) {
         openFileReader({
            type: 'merge_request',
            files: merge
         });
      }
   },
   beforeRouteEnter(to, from, next) {
      Promise.all([
         GitLabApi.getOneRepos(to.params.reposId),
         GitLabApi.getReposMergeRequestList(to.params.reposId)
      ])
      .then(([repos, mergeList]) => {
         next(vm => vm.setPageData(repos.data, mergeList.data));
      })
   }
}
</script>

<style lang="less">
.ReposPage {
   &-linkBack {
      color: var(--text-color);
   }
   &-tabs {
      &-item {
         border-bottom: 2px solid transparent;
         &:hover, &.active {
            border-bottom: 2px solid var(--text-color);
         }
      }
   }
   &-filtres {
      background-color: var(--background-color);
      width: 100%;
      height: 300px;

      &-item {
         background-color: var(--text-block-hover);
         margin-bottom: 12px;
         &:last-child {
            margin-bottom: 0;
         }
      }
   }
}
</style>