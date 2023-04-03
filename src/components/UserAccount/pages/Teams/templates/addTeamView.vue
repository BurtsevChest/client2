<template>
   <div class="addTeamView radius-block">
      <p>
         Название
      </p>
      <input type="text" v-model.trim="newTeam.name" class="addTeamView-task-title-input flex-col-12 mh-4">
      <button @click="addTeam" class="button mt-16">{{ $t('user_account_tasks_add_addBtn') }}</button>
   </div>
</template>

<script>
import { getUser } from '@/components/Common/helpers/user';
import { createTeam } from '@/websync/teams';

export default {
   // eslint-disable-next-line
   name: "addTeamView",
   data() {
      return {
         newTeam: {
            creator_id: getUser().user_id,
            name: '',
            backgroundColor: '',
            color: '',
         }
      }
   },
   methods: {
      addTeam() {
         if(this.newTeam.name) {
            createTeam(this.newTeam);
         }
      }
   }
}
</script>

<style lang="less">
.addTeamView {

   &-task-title {
      &-input {
         width: 100%;
         border-bottom: 1px solid rgba(128, 128, 128, 0.2);

         &:hover,&:focus {
            border-bottom: 1px solid rgba(128, 128, 128, 0.8);
         }
      }
   }
}
</style>