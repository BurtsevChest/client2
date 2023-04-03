<template>
   <div class="TeamPeoples">
      <div class="Close-btn flex flex-end">
         <button class="button" @click="closeWindow">
            <span class="material-icons flex flex-center a-items-center">close</span>
         </button>
      </div>
   </div>
</template>

<script>
import { closeRightAside } from '@/components/UserAccount/RightAside'

export default {
   // eslint-disable-next-line
   name: "TeamPeoples",
   methods: {
      closeWindow() {
         closeRightAside()
      }
   }
}
</script>


<style lang="less">
.TeamPeoples {

}

</style>