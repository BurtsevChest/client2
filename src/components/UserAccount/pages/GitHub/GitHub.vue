<template>
   <div class="GitHub flex flex-column">
      <div class="GitHub-header user_account-header">
         <div class="flex-container">
            <div class="flex-col">
               <button @click="openAddRep" class="GitHub-addTask-btn flex flex-center a-items-center">
                  <span class="material-icons GitHub-addTask-btn-icon">add</span>
               </button>
            </div>
            <div class="flex-col flex-col-3">
               <SearchField/>
            </div>
            <div class="flex-col flex flex-center a-items-center">
               <div @click="openAddToken" class="button pointer">
                  <span>
                     Добавить токен доступа
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div class="GitHub-content empty_flex p-12">
         <div class="flex-container height-100">
            <div class="flex-col flex-col-9">
               <ScrollContainer :hideScrollBar="true">
                  <template v-slot:content>
                     <repositoryItemVue v-for="item in reposList" v-bind:repos="item" v-bind:key="item.id" :itemStyle="'background-grey-hover pointer mb-12'"/>
                  </template>
               </ScrollContainer>
            </div>
            <div class="flex-col flex-col-3">
               <div class="GitHub-filtres radius-block p-10 flex flex-column">
                  <div class="GitHub-filtres-item box-shadow ph-6 pv-10 pointer radius-block">
                     <span>Мои репозитории</span>
                  </div>
                  <div class="GitHub-filtres-item box-shadow ph-6 pv-10 pointer radius-block">
                     <span>По проекту</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <ModalDialog
      v-model:dialogStatus="dialogStatus"
      :title="'Токен доступа'"
      :template="'components/UserAccount/pages/GitHub/templates/addTokenView.vue'"
   />
</template>

<script>
import {openAside} from '@/components/UserAccount/RightAside/index.js';
import repositoryItemVue from '@/components/UserAccount/pages/GitHub/templates/repositoryItem.vue';
import GitLabApi from '@/GitHubApi';

export default {
   // eslint-disable-next-line
   name: "GitHub",
   components: {repositoryItemVue},
   data() {
      return {
         dialogStatus: false,
         reposList: []
      }
   },
   methods: {
      openAddRep() {
         openAside({
            template: 'components/UserAccount/pages/GitHub/templates/addRepView.vue',
            opener: this
         });
      },
      openAddToken() {
         this.dialogStatus = true;
      },
      setPageData(reposList) {
         this.reposList = reposList;
      }
   },
   beforeRouteEnter(to, from, next) {
      GitLabApi.getRepos().then((response) => {
         next(vm => {
            vm.setPageData(response.data);
         });
      }).catch((err) => {
         if(err.response.status === 401) {
            next(vm => {
               vm.dialogStatus = true;
            })
         }
      })
   }
}
</script>

<style lang="less">
.GitHub {
   background-color: var(--background-color-wrapper);
   color: var(--text-color);
   height: 100vh;
   width: 100%;

   &-addTask-btn {
      cursor: pointer;
      width: 40px;
      height: 40px;
      background: var(--text-block-hover);
      border-radius: 50%;   

      &-icon {
         font-size: 30px;
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
            margin-bottom: 0px;
         }
      }
   }

   &-content {
      &-repItem {
         
      }
   }
}
</style>