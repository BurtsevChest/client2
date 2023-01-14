<template>
   Задачи
   <div v-for="item in tasks" v-bind:key="item.id" class="">
      {{ item }}
   </div>
</template>

<script>
import Tasks from '@/components/service/task/index.js';

export default {
   // eslint-disable-next-line
   name: "",
   data() {
      return {
         tasks: [],
         params: {
            userId: '2'
         }
      }
   },
   beforeMount() {
      Tasks.getTasks(this.params).then((res)=>{
         console.log(res.data);
      })
   }

}
</script>


<style lang="less" scoped>

</style>