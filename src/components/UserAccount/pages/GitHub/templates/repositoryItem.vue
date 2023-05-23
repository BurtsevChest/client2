<template>
   <div @click="openRepos" class="repositoryItem flex flex-space radius-block pv-12 ph-10" :class="itemStyle">
      <div class="repositoryItem-name flex">
         <div class="flex flex-column">
            <div class="user_account-h3">{{ repos.name }}</div>
            <div class="standart-text-grey">Последнее обновление: {{ showDate(repos.updated_at) }}</div>
         </div>
      </div>
      <div class="flex">
         <div class="">Ответственный: {{ repos.owner.name }}</div>
         <div class="repositoryItem-owner-img ml-8">
            <img :src="repos.owner.avatar_url">
         </div>
      </div>
   </div>
</template>

<script>
import { dateToMonthText } from '@/components/Common/helpers/dateToNumbers';

export default {
   // eslint-disable-next-line
   name: "repositoryItem",
   props: {
      itemStyle: {
         type: String
      },
      repos: {
         type: Object
      }
   },
   methods: {
      showDate(date) {
         return dateToMonthText(date);
      },
      openRepos() {
         this.$router.push(`/user_account/github/repository/${this.repos.id}`);
      }
   }
}
</script>

<style lang="less">
.repositoryItem {
   &-owner {
      &-img {
         width: 40px;
         height: 40px;
         border-radius: 50%;
         overflow: hidden;
      }
   }
}
</style>