<template>
   <div class="Boards relative">
      <div class="Boards-header flex flex-nowrap box-shadow ph-12 pv-16">
         <div @click="openAddBoardView" class="Boards-header-add flex a-items-center flex-center">
            <span class="material-icons Boards-header-add-icon">add</span>
         </div>
         <div class="Boards-header-search pl-12">
            <SearchField/>
         </div>
      </div>
      <div class="Boards-main pt-64">
         <ScrollContainer>
            <template v-slot:content>
               <div class="Boards-main-list p-20 flex-container">
                  <div v-for="board in boards" v-bind:key="board.id" class="flex-col flex-col-4">
                     <div @click="openBoard(board.name)" class="Boards-main-list-item flex a-items-center flex-center radius-block pointer">
                        {{ board.name }}
                     </div>
                  </div>
               </div>
            </template>
         </ScrollContainer>
      </div>
   </div>
   <ModalDialog v-model:dialogStatus="dialogStatus" :title="'Новая доска'">
      <template v-slot:content>
         <addBoardView @addBoard="addBoard"/>
      </template>
   </ModalDialog>
</template>

<script>
import addBoardView from '@/components/UserAccount/pages/Boards/templates/addBoardView.vue';

export default {
   // eslint-disable-next-line
   name: "Boards",
   components: {addBoardView},
   data() {
      return {
         dialogStatus: false,
         boards: [
            {
               id: 0,
               name: 'Доска 1'
            }
         ]
      }
   },
   methods: {
      openAddBoardView() {
         this.dialogStatus = true;
      },
      openBoard(href) {
         this.$router.push(`/user_account/board/${href}`);
      },
      addBoard(name) {
         this.dialogStatus = false;
         this.boards.push({
            id: this.boards.length,
            name
         })
      }
   }
}
</script>

<style lang="less">
.Boards {
   width: 100%;
   height: 100vh;

   &-header {
      background-color: var(--background-color);
      width: 100%;
      position: absolute;
      z-index: 1;
      
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

      &-search {
         max-width: 500px;
      }
   }

   &-main {
      height: 100%;
      &-list {
         height: 100%;
         width: 100%;

         &-item {
            background-color: var(--text-block-hover);
            height: 150px;
         }
      }
   }
}
</style>