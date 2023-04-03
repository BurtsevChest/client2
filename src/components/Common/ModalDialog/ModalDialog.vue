<template>
   <div class="ModalDialog flex flex-column" ref="modalContent" :class="{ 'ModalDialog-active' : dialogStatus, 'ModalDialog-grabbing' : grabbingStatus}">
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
         />
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
   methods: {
      loadTemplate(template) {
         import(`@/${template}`)
            .then((resolvedTemplate) => {
               this.dialogTemplate = resolvedTemplate.default
            })
            .then(() => {
               this.$nextTick(() => {
                  this.$refs.modalHeader.addEventListener("mousedown", this.dragModal);
                  document.addEventListener("mouseup", this.stopDrag);
               });
            })
            .catch(()=> {
               this.close()
            })
      },
      close() {
         this.$emit('onCloseClick', false)
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
   z-index: -1000;
   overflow: inherit;
   cursor: default;
   opacity: 0;
   width: 500px;
   background: white;
   height: fit-content;
   border-radius: 12px;
   color: var(--text-hover);
   background-color: var(--background-color);
   box-shadow: 0 0 12px rgba(128, 128, 128, 0.5);

   &-grabbing {
      transition: none;
   }

   &-active {
      z-index: 1000;
      opacity: 1;
      transform: translate(-50%, -50%);
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