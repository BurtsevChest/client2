<template>
   <div class="ListItems flex flex-column">
      <button class="flex flex-end  a-items-end ml-16" @click="close">
          <span class="material-icons box-shadow-hover radius-block p-6">close</span>
        </button>
        <p>
         Не знаю зачем, но пускай тут побудет
        </p>
   </div>
</template>

<script>
import { closeRightAside } from '@/components/UserAccount/RightAside';

export default {
   // eslint-disable-next-line
   name: "ListItems",
   data() {
      return {
         template: ''
      }
   },
   props: {
      items: {
         type: Array
      },
      itemTemplate: {
         type: String
      }
   },
   methods: {
      loadTemplate() {
         import(`@/${this.itemTemplate}`).then((res) => {
            this.template = res.default;
         })
      },
      close() {
         closeRightAside()
      }
   }
}
</script>

<style lang="less">
.ListItems {

}
</style>