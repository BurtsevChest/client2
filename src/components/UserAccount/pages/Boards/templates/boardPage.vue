<template>
   <!-- <PopupBtn :closeAfterClick="true" :accessShow="true" :hideBtn="true" :right="'0px'" :top="'0'">
                     <template v-slot:popupBtn>
                        <span class="material-icons boardPage-header-add-icon a-self-end pointer">
                           add
                        </span>
                     </template>
                     <template v-slot:popupTemplate>
                        <div class="boardPage-column-addPopup ph-8 pv-10 radius-block box-shadow">
                           <div class="boardPage-column-addPopup-item pointer radius-block ph-6 pv-10">Новая задача</div>
                           <div @click="addTask" class="boardPage-column-addPopup-item pointer radius-block ph-6 pv-10">Мои задачи</div>
                        </div>
                     </template>
                  </PopupBtn> -->
   <div class="boardPage flex flex-column">
      <div class="boardPage-header p-14 flex a-items-center ">
         <div @click="back" class="boardPage-header-backlink pointer fit-content">
            <span class="material-icons">
               arrow_back
            </span>
         </div>
         <div @click="openAddColumnView()" class="boardPage-header-add flex flex-center a-items-center pointer ml-12">
            <span class="material-icons boardPage-header-add-icon">
               add
            </span>
         </div>
      </div>
      <div class="boardPage-content empty_flex pv-20 pb-20 flex flex-nowrap">
         <div class="flex-container flex-nowrap">
            <div v-for="column in columns" v-bind:key="column.name" class="flex-col pb-0">
               <columnBoardVue v-bind:column="column"/>
            </div>
         </div>
      </div>
   </div>
   <ModalDialog v-model:dialogStatus="dialogStatus" :title = "'Новая колонка'">
      <template v-slot:content>
         <addColumnView @addColumn="addColumn"/>
      </template>
   </ModalDialog>
</template>

<script>
import { mapGetters } from 'vuex';
import {openTask} from '@/components/Common/helpers/tasks.js';
import addColumnView from '@/components/UserAccount/pages/Boards/templates/addColumnView.vue';
import { openAside } from '@/components/UserAccount/RightAside';
import columnBoardVue from '@/components/UserAccount/pages/Boards/templates/columnBoard.vue';

export default {
   // eslint-disable-next-line
   name: "boardPage",
   components: {addColumnView, columnBoardVue},
   data() {
      return {
         dialogStatus: false,
         boardId: this.$route.params.boardId,
         addTaskPopup: false,
         columns: [
            {
               name: 'To Do',
               items: []
            },
            {
               name: 'Doing',
               items: []
            },
            {
               name: 'Done',
               items: []
            }
         ]
      }
   },
   computed: mapGetters(["returnTasks"]),
   methods: {
      back() {
         this.$router.go(-1);
      },
      openTask(task) {
         openTask(task, this);
      },
      openAddColumnView() {
         this.dialogStatus = true;
      },
      addColumn(name) {
         this.columns.push({
            name,
            items: []
         });
         this.dialogStatus = false;
      },
      addTask() {
         this.addTaskPopup = false;
         openAside({
            template: 'components/UserAccount/pages/Boards/templates/addTaskRightAside.vue',
            opener: this
         });
      }
   }
}
</script>

<style lang="less">
.boardPage {
   height: 100%;

   &-header {
      &-add {
         cursor: pointer;
         width: 40px;
         height: 40px;
         background: rgba(128, 128, 128, 0.3);
         border-radius: 50%;   

         &-icon {
            font-size: 30px;
         }
      }
   }

   &-content {
      width: 1620px;
      overflow: auto;
      overflow-x: auto;
      overflow-y: hidden;
   }

   &-column {
      top: 0;
      min-width: 400px;
      max-width: 400px;
      padding-right: 12px;

      &:last-child {padding-right: 0;}

      &-body {
         height: 100%;
         width: 388px;
         background-color: var(--text-block-hover);

         &-title {
            font-size: 20px;
         }

         &-item {
            margin-bottom: 12px;
            background-color: var(--text-block-hover);
            &:last-child {
               margin-bottom: 0;
            }
         }

         &-drggabble {
            height: 100%;
         }
      }

      &-addPopup {
         background-color: var(--background-color);
         color: var(--text-color);
         width: max-content;
         font-size: 15px;
         text-align: start;

         &-position {
            top: 0;
            right: 0;
         }

         &-item {
            margin-bottom: 8px;
            &:last-child {
               margin-bottom: 0;
            }
            &:hover {
               transition: 0.2s;
               background-color: var(--text-block-hover);
            }
         }
      }

   }
}
</style>