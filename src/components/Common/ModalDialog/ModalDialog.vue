<template>
   <div v-if="dialogStatus" class="ModalDialog flex flex-column" ref="modalContent" :class="{'ModalDialog-grabbing' : grabbingStatus}">
      <div class="ModalDialog-content">
         <div :class="{ 'ModalDialog-header-grabbing' : grabbingStatus }" class="ModalDialog-header ph-10 pv-10 flex flex-space" ref="modalHeader">
            <div class="ModalDialog-header-title user_account-h3">{{ title }}</div>
            <div class="ModalDialog-header-btnClose">
               <span class="material-icons pointer" @click="close">close</span>
            </div>
         </div>
         <component 
            :is="dialogTemplate"
            class="pb-10 pv-10"
            @closeModalDialog="close"
         />
         <slot v-if="!template" name="content" class="pb-10 pv-10"></slot>
      </div>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "ModalDialog",
   data() {
      return {
         dialogTemplate: '',
         grabbingStatus: false,
         pos1: 0,
         pos2: 0,
         pos3: 0,
         pos4: 0
      }
   },
   props: {
      template: {
         type: String,
      },
      title: {
         type: String
      },
      dialogStatus: {
         type: Boolean
      }
   },
   watch: {
      dialogStatus() {
         if(this.dialogStatus === true) {
            setTimeout(() => {
               this.$refs.modalHeader.addEventListener("mousedown", this.dragModal, true);
               document.addEventListener("mouseup", this.stopDrag, true);
            }, 100)
         } else {
            this.$refs.modalHeader.removeEventListener("mousedown", this.dragModal, true);
            document.removeEventListener("mouseup", this.stopDrag, true);
         }
      }
   },
   methods: {
      loadTemplate(template) {
         import(`@/${template}`)
            .then((resolvedTemplate) => {
               this.dialogTemplate = resolvedTemplate.default
            })
            .catch(()=> {
               this.close()
            })
      },
      close() {
         this.$emit('update:dialogStatus', false)
      },
      dragModal(e) {
         e.preventDefault();
         this.pos3 = e.clientX;
         this.pos4 = e.clientY;
         document.addEventListener("mousemove", this.moveModal);
         this.grabbingStatus = true;
      },
      moveModal(e) {
         this.$refs.modalContent.style.removeProperty('transition');
         e.preventDefault();
         this.pos1 = this.pos3 - e.clientX;
         this.pos2 = this.pos4 - e.clientY;
         this.pos3 = e.clientX;
         this.pos4 = e.clientY;
         this.$refs.modalContent.style.top = `${this.$refs.modalContent.offsetTop - this.pos2}px`;
         this.$refs.modalContent.style.left = `${this.$refs.modalContent.offsetLeft - this.pos1}px`;
      },
      stopDrag() {
         document.removeEventListener("mousemove", this.moveModal);
         this.grabbingStatus = false;
      }
   },
   beforeMount() {
      if(this.template) {
         this.loadTemplate(this.template);
      } 
   },
   beforeUnmount() {
      if(this.dialogStatus === true) {
         this.$refs.modalHeader.removeEventListener("mousedown", this.dragModal, true);
         document.removeEventListener("mouseup", this.stopDrag, true);
      }
   }
}
</script>

<style lang="less">
.ModalDialog {
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   position: fixed;
   display: flex;
   z-index: 1000;
   overflow: inherit;
   cursor: default;
   width: 500px;
   background: white;
   height: fit-content;
   border-radius: 12px;
   color: white;
   background: #181818;
   box-shadow: 0 0 8px rgba(128, 128, 128, 0.1);

   &-grabbing {
      transition: none;
   }

   &-header {
      cursor: grab;

      &-grabbing {
         cursor: grabbing;
      }

      &-btnClose {
         font-size: 14px;
         transition: 0.3s;
      }
   }
}
</style>