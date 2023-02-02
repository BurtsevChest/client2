<template>
   <div class="IndexMain">
      <div class="container">
         <section  class="section-padding">
            <Banner
               :title = "'Ведите проекты не выходя из дома'"
               :desc = "'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dicta voluptatibus enim aspernatur deserunt quis, tenetur ipsam, vero odio veniam rerum eius corrupti voluptatem molestias itaque deleniti amet facilis minus!'"
               :img="'components/Index/pages/Main/resources/images/banner_img.png'"
            />
         </section>
      </div>
   </div>
</template>

<script>
import Banner from '../../CommonIndex/Banner.vue';

export default {
   // eslint-disable-next-line
   name: "IndexMain",
   components: {Banner}

}
</script>


<style lang="less" scoped>
@offset-top: 100px;
.IndexMain {
   padding-top: extract(@offset-top, 1);
}
</style>