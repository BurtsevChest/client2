<template>
   <div @click.stop="toTeam" class="flex a-items-center flex-center teemBlock background-grey radius-block box-shadow p-16 user_account-h3">
      <span class="white-color">
         {{ team.name }}
      </span>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "teemBlock",
   props: {
      team: {
         type: Object
      }
   },
   methods: {
      toTeam() {
         this.$router.push(`/user_account/teams/${this.team.name}`)
      }
   }
}
</script>

<style lang="less">
.teemBlock {
   height: 250px;
   text-align: center;
   cursor: pointer;
   transition: 0.2s;

   &:hover {
      margin-top: -10px;
   }
}

</style>