<template>
   <div class="IndexMain">
         <section class="section-padding IndexMain-banner mb-40">
            <div class="IndexMain-banner-grey"></div>
         </section>
         <section class="section-padding">
            <div class="container">
               <h2 class="h2 pb-32">{{ $t('index_main_section_1-title') }}</h2>
               <img src="@/components/Index/pages/Main/resources/images/tasks.jpg" class="radius-block box-shadow">
            </div>
         </section>
         <section class="section-padding">
            <div class="container">
               <h2 class="h2 pb-32">{{ $t('index_main_section_2-title') }}</h2>
               <div class="box-shadow radius-block ovefflow-hidden p-40 p-xm-20">
                  <div class="flex">
                     <div class="flex-col flex-col-6 flex-col-xm-12">
                        <img src="@/components/Index/pages/Main/resources/images/canban_boards.jpg" alt="">
                     </div>
                     <div class="flex-col flex-col-6 flex-col-xm-12 pt-40">
                        <h3 class="h3 pb-24">{{ $t('index_main_section_2-advantages-title') }}</h3>
                        <ul class="pl-22">
                           <li class="li-circle pb-8">{{ $t('index_main_section_2-advantages-item1') }}</li>
                           <li class="li-circle pb-8">{{ $t('index_main_section_2-advantages-item2') }}</li>
                           <li class="li-circle pb-8">{{ $t('index_main_section_2-advantages-item3') }}</li>
                           <li class="li-circle pb-8">{{ $t('index_main_section_2-advantages-item4') }}</li>
                           <li class="li-circle pb-8">{{ $t('index_main_section_2-advantages-item5') }}</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "IndexMain",
   components: {}
}
</script>

<style lang="less" scoped>
.IndexMain {
   &-banner {
      background: url('./resources/main_banner.jpg') no-repeat;
      background-size: cover;
      background-position: center;
      height: 100vh;

      &-grey {
         position: absolute;
         width: 100%;
         height: 100%;
         background: rgb(128, 128, 128, 0.5);
         opacity: 0.3;
      }
   }
}
</style>