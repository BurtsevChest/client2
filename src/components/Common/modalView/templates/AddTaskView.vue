<template>
   <div class="AddTaskView">
      <h2 class="h2 text-center pb-8">Добавить задачу</h2>
      <div class="flex">
         <div class="flex-col flex-col-6">
            <h3 class="h3 pb-8">Исполнитель</h3>
            <input type="text" class="input mb-8">
         </div>
         <div class="flex-col flex-col-6">
            <h3 class="h3 pb-8">Срок</h3>
            <input type="text" class="input mb-8">
         </div>
         <div class="flex-col flex-col-12">
            <h3 class="h3 pb-8">Задача</h3>
            <input type="text" class="input mb-8">
         </div>
         <div class="flex-col flex-col-12">
            <h3 class="h3 pb-8">Описание</h3>
            <textarea class="textarea" style="resize: none; " name="" id="" cols="30" rows="10"></textarea>
         </div>
      </div>
      <button class="button">Добавить</button>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "",

}
</script>


<style lang="less" scoped>
.AddTaskView {
   width: 1000px;
}

</style>