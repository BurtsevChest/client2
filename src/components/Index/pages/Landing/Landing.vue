<template>
<div class="LandingPage">
   <section class="section-padding">
      <div class="container">
         <h1 class="h1 pb-20">
            LangingPage
         </h1>
         <div class="LandingPage-container box-shadow radius-block">
            <ScrollContainer :height="200">
               <template v-slot:content>
                  <SelectUsers
                     :userList="getUsersCommandList"
                  />
                  <SelectUsers
                     :userList="getUsersCommandList"
                  />
               </template>
            </ScrollContainer>
         </div>
      </div>
   </section>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUsersList } from '@/websync/user';

export default {
   // eslint-disable-next-line
   name: 'LandingPage',
   computed: mapGetters(['getUsersCommandList']),
   beforeMount() {
      getUsersList()
   }
}
</script>

<style lang="less" scope>
// body {
//    overflow: hidden;
// }


@offset-top: 100px;

.LandingPage {
   padding-top: extract(@offset-top, 1);

   &-container {
      margin: 0 auto;
      width: 500px;
      height: 500px;
      background-color: white;
   }
}
</style>