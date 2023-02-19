<template>
   <div class="TaskChat">
      <div class="TaskChat-wrapper">
         <div class="TaskChat-content">
            <div class="TaskChat-menu radius-block ph-10 pv-10 flex flex-space">
               <span class="material-icons pointer">attach_file</span>
               <input type="text" placeholder="Сообщение..." class="empty_flex pl-6">
               <span class="material-icons pointer">send</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "TaskChat",
   props: {
      task_id: {
         type: Number
      }
   }
}
</script>

<style lang="less">
.TaskChat {
   flex: 1 1 0%;

   &-wrapper {
      height: 100%;
   }

   &-content {
      height: 100%;
      display: flex;
      align-items: flex-end;
   }

   &-menu {
      background-color: var(--text-block-hover);
      width: 100%;
   }
}
</style>