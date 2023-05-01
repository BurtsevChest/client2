<template>
   <div class="Teams">
      <div class="Teams-header background-grey flex box-shadow pt-12 pv-10">
         <div class="flex flex-col-8">
            <div class="flex-col flex a-items-center">
            <button @click="openAddTeamView" class="Teams-addTask-btn flex flex-center a-items-center">
               <span class="material-icons Teams-addTask-btn-icon">add</span>
            </button>
            </div>
            <div class="flex-col flex flex-nowrap a-items-center">
               <SearchField @clickSearchEnter="filterOnName" @clickSearch="filterOnName" @clearSearch="clearFilterName"/>
            </div>
            <div class="flex flex-col a-items-center">
               <PopupBtn v-model:show="showPopup" :hideBtn='true' :positionStyle="'Teams-filterBtn-popup'">
                  <template v-slot:popupBtn>
                     <div class="background-grey white-color ph-6 pv-16 radius-block pointer">
                        {{ filterSootvet[activeTeamsFilterRule] }}
                     </div>
                  </template>
                  <template v-slot:popupTemplate>
                     <div class="Teams-filtres-popup p-10">
                        <div @click="setFilter(filter.text)" v-for="filter in filtres" v-bind:key="filter" class="Teams-filtres-popup-item ph-6 pv-16 radius-block pointer mb-8">
                           {{ filter.text }}
                        </div>
                     </div>
                  </template>
               </PopupBtn>
            </div>
            <div class="empty_flex"></div>
         </div>
      </div>
      <div class="Teams-maincontent">
         <ScrollContainerNew>
            <template v-slot:content>
               <div class="Teams-comandlist p-20">
                  <div class="flex-container">
                     <div v-for="item in filteredTeamList" v-bind:key="item" class="flex-col flex-col-3">
                        <teamBlock
                           :team="item"
                        />
                     </div>
                  </div>
               </div>
            </template>
         </ScrollContainerNew>
      </div>
   </div>
   <ModalDialog
      :dialogStatus="dialogStatus"
      :title = "'Новая команда'"
      @onCloseClick="() => {this.dialogStatus=false}"
      :template="'components/UserAccount/pages/Teams/templates/addTeamView.vue'"
   />
</template>

<script>
import teamBlock from '@/components/UserAccount/pages/Teams/templates/teamBlock.vue';
import { mapGetters } from 'vuex';
import { getTeamsAny, setFilterText, filterObjects2, filterOnName } from '@/websync/teams';

export default {
   // eslint-disable-next-line
   name: "Teams",
   components: {teamBlock},
   data() {
      return {
         dialogStatus: false,
         showPopup: false,
         activeFilter: 'Я админ',
         filtres: [
            {
               text: 'Я админ',
            },
            {
               text: 'Я участник',
            },
            {
               text: 'Все',
            }
         ],
         filterSootvet: filterObjects2
      }
   },
   computed: mapGetters(['filteredTeamList', 'activeTeamsFilterRule']),
   methods: {
      openAddTeamView() {
         this.dialogStatus = true;
      },
      setFilter(rule) {
         this.activeFilter = rule;
         setFilterText(rule);
         this.showPopup = false;
      },
      openFilter() {
         this.showPopup = true;
      },
      filterOnName(name) {
         filterOnName(name);
      },
      clearFilterName() {
         filterOnName('');
      }
   },
   beforeMount() {
      getTeamsAny();
   }
}
</script>

<style lang="less">
.Teams {
   background-color: var(--background-color-wrapper);
   height: 100vh;

   &-addTask-btn {
      cursor: pointer;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.3);
      border-radius: 50%;   

      &-icon {
         font-size: 30px;
      }
   }

   &-filterBtn {
      &-popup {
         top: calc(100% + 15px);
      }
   }

   &-comandlist {
      height: 100%;
      
   }

   &-header {
      position: fixed;
      width: 100%;
      z-index: 1;
      background-color: var(--background-color);
      color: var(--text-color);
   }

   &-maincontent {
      height: 100%;
      padding-top: 64px;
   }

   &-filtres-popup {
      background-color: var(--background-color);
      width: max-content;

      &-item {
         &:hover {
            background-color: var(--text-block-hover);
         }
      }
   }
}
</style>