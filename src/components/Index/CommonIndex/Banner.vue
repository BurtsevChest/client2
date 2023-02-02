<template>
   <div class="Banner p-40 p-sm-20 box-shadow radius-block">
      <div class="flex flex-noGutter h-100">
         <div class="flex-col flex-col-6 flex-col-xm-12">
            <div class="Banner-text ">
               <h1 class="h1 pb-32">{{ title }}</h1>
               <p class="Banner-desc">{{ desc }}</p>
            </div>
         </div>
         <div class="flex-col flex-col-6 flex-col-xm-12">
            <div class="Banner-img flex flex-center">
               <img :src="require(`@/${img}`)" alt="">
            </div>
         </div>
      </div>
   </div>
</template>
<script>

export default {
   // eslint-disable-next-line
   name: "Banner",
   props: {
      title: {
         type: String,
         required: true
      },
      desc: {
         type: String,
         required: true
      },
      img: {
         type: String,
         required: true
      }
   }

}
</script>


<style lang="less" scoped>
.Banner {
   width: 100%;
   background: #334155;
   color: white;

   &-desc {
      font-size: 18px;
   }
}
</style>