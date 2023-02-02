<template>
   <div class="IndexMain">
         <section class="section-padding">
            <div class="container">
               <Banner
                  :title = "'Ведите проекты не выходя из дома'"
                  :desc = "'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dicta voluptatibus enim aspernatur deserunt quis, tenetur ipsam, vero odio veniam rerum eius corrupti voluptatem molestias itaque deleniti amet facilis minus!'"
                  :img="'components/Index/pages/Main/resources/images/banner_img.png'"
               />
            </div>
         </section>
         <section class="section-padding">
            <div class="container">
               <h2 class="h2 pb-32">Назначайте свои задачи</h2>
               <img src="@/components/Index/pages/Main/resources/images/tasks.jpg" alt="">
            </div>
         </section>
         <section class="section-padding">
            <div class="container">
               <h2 class="h2 pb-32">Используйте доски Канбана</h2>
               <div class="box-shadow radius-block ovefflow-hidden p-40">
                  <div class="flex">
                     <div class="flex-col flex-col-6 flex-col-xm-12">
                        <img src="@/components/Index/pages/Main/resources/images/canban_boards.jpg" alt="">
                     </div>
                     <div class="flex-col flex-col-6 flex-col-xm-12 pt-40">
                        <h3 class="h3 pb-24">К достоинствам Канбан относят:</h3>
                        <ul class="pl-22">
                           <li class="li-circle pb-8">гибкое планирование с возможностью изменения приоритетов — важно для проектов в IT-сфере;</li>
                           <li class="li-circle pb-8">высокую степень вовлеченности сотрудников, благодаря совместным обсуждениям задач;</li>
                           <li class="li-circle pb-8">быстрый поиск проблем из-за лимитов WIP;</li>
                           <li class="li-circle pb-8">экономию пространства на складах из-за сбалансированного потока транспортировки товаров;</li>
                           <li class="li-circle pb-8">прозрачность рабочих процессов.</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>
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