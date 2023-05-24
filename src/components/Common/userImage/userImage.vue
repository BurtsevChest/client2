<template>
   <div :style="{'width': width + 'px', 'height': height + 'px',}" class="userImage">
      <img ref="userAvatar" :src="userPhotoBaseUrl">
   </div>
</template>

<script>
import { downloadImageUser } from '@/components/Common/helpers/imageLoader';

export default {
   // eslint-disable-next-line
   name: "userImage",
   props: {
      user_id: {
         type: Number
      },
      width: {
         type: Number
      },
      height: {
         type: Number
      }
   },
   watch: {
      user_id(newValue) {
         this.userPhotoBaseUrl = `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_MAIN_API}/apiV0/photo/${newValue}`;
      }
   },
   data() {
      return {
         userPhotoBaseUrl: `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_MAIN_API}/apiV0/photo/${this.user_id}`
      }
   },
   mounted() {
      if(this.user_id === 523) {
         this.userPhotoBaseUrl = require('@/components/UserAccount/pages/Home/resources/images/users/statham.png')
      } else {
         downloadImageUser.call(this, 'userAvatar')
      }
   }
}
</script>

<style lang="less">
.userImage {
   width: 40px;
   height: 40px;
   overflow: hidden;
   display: flex;
   justify-content: center;
   border-radius: 50%;

   &>img{
      max-width: none;
      height: auto;
   }
}
</style>