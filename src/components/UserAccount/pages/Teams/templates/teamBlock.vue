<template>
   <div @click="toTeam" class="flex a-items-center flex-center teemBlock radius-block box-shadow p-16">
      {{ team.name }}
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
   background-color: white;
   height: 250px;
   width: 250px;
   text-align: center;
   cursor: pointer;
   transition: 0.2s;

   &:hover {
      margin-top: -15px;
      transform: scale(1.1);
   }
}

</style>