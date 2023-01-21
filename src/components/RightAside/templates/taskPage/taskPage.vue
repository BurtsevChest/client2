<template>
<div class="Task">
   <h2 class="h2 pb-16">
      {{ getConfig.title }}
   </h2>
   <p class="pb-32">
      {{ getConfig.description }}
   </p>
   <div class="flex">
      <div class="flex-col flex-col-3">
         <div @click="openAddTaskView(getConfig.task_id)" class="flex a-items-center Task-subTask">
            <span class="material-icons">
               task
            </span>
            <p class="pl-4 Task-subTask-text">Подзадача</p>
         </div>
      </div>
      <div class="flex-col flex-col-3">
         <div class="flex a-items-center Task-subTask" @click="openAddFile">
            <!-- <span class="material-icons">attach_file_add</span> хуйня какая-то -->
            <p class="pl-4 Task-subTask-text">Прикрепить</p>
         </div>
      </div>
   </div>
</div>

<!-- Окно для добавления файлов -->
<SuperPopup
   v-model:show="showAddFile"
   :config="configAddFile"
>
   <input type="file" name="" id="">
   <input type="file" name="" id="">
</SuperPopup>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getConfig"]), // лучше сразу использовать геттер, чтобы компонент рендерил с новым конфигом
   methods: {
      ...mapMutations(['openAddTaskView']),
      openAddFile(e) {
         this.showAddFile = true
         this.configAddFile = {
            x: e.clientX,
            y: e.clientY
         }
      }
   },
   data() {
      return {
         showAddFile: false,
         configAddFile: {}
      }
   }
}
</script>

<style lang="less" scoped>
.Task {
   &-subTask {
      cursor: pointer;
      font-size: 15px;
      &-text {
         &:hover, :focus {
            text-decoration: underline;
         }
      }
   }
}
</style>