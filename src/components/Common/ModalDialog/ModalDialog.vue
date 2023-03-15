<template>
   <div class="ModalDialog box-shadow flex flex-column" :class="{ 'ModalDialog-active' : dialogStatus }">
      <div class="ModalDialog-content ">
         <div class="ModalDialog-header ph-10 pv-10 flex flex-space">
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
         dialogTemplate: ''
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
            .catch(()=> {
               this.close()
            })
      },
      close() {
         this.$emit('onCloseClick', false)
      }
   },
   beforeMount() {
      this.loadTemplate(this.template)
   }
}
</script>

<style lang="less">
.ModalDialog {
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%) scale(0.5);
   position: fixed;
   display: flex;
   z-index: -1000;
   overflow: inherit;
   cursor: default;
   opacity: 0;
   transition: 0.2s;
   width: 500px;
   background: white;
   height: fit-content;
   border-radius: 12px;

   &-active {
      z-index: 1000;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
   }

   &-header {

      &-btnClose {
         color: grey;
         font-size: 14px;
         transition: 0.3s;

         &:hover {
            color: #1e293b;
         }
      }
   }
}
</style>