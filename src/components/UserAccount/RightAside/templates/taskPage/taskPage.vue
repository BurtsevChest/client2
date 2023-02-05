<template>
<div class="Task">
   <h2 class="user_account-h2 pb-16">
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
            <span class="material-icons">attach_file</span>
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
   <div class="flex Task-addFiles-wrapper">
      <div class="flex-col flex-col-12">
         <label for="addFiles" class="flex a-items-center">
            <span class="material-icons">desktop_windows</span>
            <p class="pl-4">
               С устройства
            </p>
         </label>
         <input type="file" class="image" name="" id="addFiles" multiple style="display: none;">
      </div>
      <div class="flex-col flex-col-12">
         <label @click="loadBuffer" class="flex a-items-center">
            <span class="material-icons">upload_file</span>
            <p class="pl-4">
               Из буфера обмена
            </p>
         </label>
      </div>
   </div>
</SuperPopup>
</template>

<script>
import { mapGetters } from "vuex";
import { openDialog } from '@/components/Common/modalView';

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getConfig"]), // лучше сразу использовать геттер, чтобы компонент рендерил с новым конфигом
   methods: {
      openAddTaskView(task_id) {
         openDialog({
            template: 'components/Common/modalView/templates/AddTaskView.vue',
            options: task_id
         })
      },
      openAddFile(e) {
         this.showAddFile = true
         this.configAddFile = e
      },
      loadBuffer() {
         console.log(navigator.clipboard.read);
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

   &-addFiles-wrapper {
      width: 200px;
   }
}
</style>