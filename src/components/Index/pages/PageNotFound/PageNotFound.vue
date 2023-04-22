<template>
<div class="PageNotFound PageNotFound-h100vh">
   <div class="container PageNotFound-h100">
      <section class="PageNotFound-main PageNotFound-h100">
      </section>
   </div>
</div>

</template>

<script>

export default {
   // eslint-disable-next-line
   name: "PageNotFound",
}
</script>

<style lang="less">
@offset-top: 100px;

.PageNotFound {
   padding-top: @offset-top;

   &-main {
      background: url('@/components/Index/pages/PageNotFound/resources/images/error_404.png') no-repeat;
      height: 100%;
   }

   &-h100 {
      height: 100%;
   }

   &-h100vh {
      height: 100vh;
   }
}
</style>