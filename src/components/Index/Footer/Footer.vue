<template>
   <div class="Footer">
      <div class="container">
         <div class="flex flex-space pb-36">
            <div class="">
               <span class="Footer-title block pb-26">Project Manager</span>
               <p>
                  Photographers & videographers capturing the world around us.
               </p>
            </div>
            <div class="flex">
               <div class="flex flex-column">
                  <div class="Footer-right-title pb-10">
                     Business areas
                  </div>
                  <div class="Footer-right-item pb-10">
                     Product Photography
                  </div>
                  <div class="Footer-right-item pb-10">
                     Architecture Photography
                  </div>
                  <div class="Footer-right-item pb-10">
                     Drone Photography
                  </div>
                  <div class="Footer-right-item pb-10">
                     Wildlife Photography
                  </div>
               </div>
               <div class="flex flex-column pl-56">
                  <div class="Footer-right-title pb-10">
                     Pages
                  </div>
                  <div class="Footer-right-item pb-10">
                     Gear cage
                  </div>
                  <div class="Footer-right-item pb-10">
                     Featured images
                  </div>
                  <div class="Footer-right-item pb-10">
                     Contact
                  </div>
                  <div class="Footer-right-item pb-10">
                     Style guide
                  </div>
                  <div class="Footer-right-item pb-10">
                     Instructions
                  </div>
                  <div class="Footer-right-item pb-10">
                     Changelog
                  </div>
               </div>
            </div>
         </div>
         <div class="white-line"></div>
         <div class="flex flex-space ph-36">
            <div class="">
               <span class="block pb-20 Footer-subscribe-title">Subscribe to our newsletter</span>
               <p>
                  Read about all the things we do.
               </p>
            </div>
            <div class="flex a-items-center">
               <SearchField/>
            </div>
         </div>
         <div class="white-line mb-56"></div>
      </div>
   </div>
</template>

<script>
import SearchField from '@/components/Common/SearchField/SearchField.vue'

export default {
  components: { SearchField },
   // eslint-disable-next-line
   name: "Footer",

}
</script>


<style lang="less">
.Footer {
   padding-top: 100px;
   background: black;
   padding-bottom: 100px;
   font-size: 13px;
   line-height: 20px;
   color: #C0C0C0;

   &-title {
      font-size: 28px;
      line-height: 42px;
      color: #FFFFFF;
   }

   &-right {
      &-title {
         font-size: 14px;
         line-height: 20px;
         letter-spacing: 2px;
         text-transform: uppercase;
         color: #C0C0C0;
      }

      &-item {
         font-size: 14px;
         line-height: 20px;
         color: #FFFFFF;
      }
   }

   &-subscribe {
      &-title {
         font-size: 14px;
         line-height: 20px;
         letter-spacing: 2px;
         text-transform: uppercase;
         color: #FFFFFF;
      }
   }
}

</style>