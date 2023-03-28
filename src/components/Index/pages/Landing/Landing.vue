<template>
   <ScrollContainer>
      <div class="LandingPage">
         <section class="section-padding">
            <div class="container">
               <h1 class="h1">
                  LangingPage
               </h1>
            </div>
         </section>
      </div>
   </ScrollContainer>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: 'LandingPage'
}
</script>

<style lang="less">
@offset-top: 100px;

.LandingPage {
   padding-top: extract(@offset-top, 1);
}
</style>