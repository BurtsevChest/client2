<template>
   <div class="oneMessage">
      <div v-if="user_id === message.creator_message_id" class="oneMessage-msg oneMessage-msg-my flex flex-nowrap a-items-center mt-16 pointer">
         <div :class="[msgStyle]" class="radius-block oneMessage-arrow pr-10 pl-14 pb-6 pt-10">
            {{ message.content }}
            <div class="oneMessage-arrow-date">
               {{ returnDate(message.date_of_creation) }}
            </div>
         </div>
         <img ref="userAvatar" class="oneMessage-avatar ml-10 a-self-start" :src="userPhotoBaseUrl">
      </div>
      <div v-else class="oneMessage-msg oneMessage-msg flex flex-nowrap a-items-center mt-16 pointer">
         <img ref="userAvatar" class="oneMessage-avatar mr-10 a-self-start" :src="userPhotoBaseUrl">
         <div :class="[msgStyle]" class="radius-block oneMessage-arrow-right pr-10 pl-14 pb-6 pt-10">
            {{ message.content }}
            <div class="oneMessage-arrow-date">
               {{ returnDate(message.date_of_creation) }}
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { api_domain, protocol } from '@/components/Common/helpers/host';
import { downloadImageUser } from '@/components/Common/helpers/imageLoader';
import { dateToNumbers } from '@/components/Common/helpers/dateToNumbers';

export default {
   // eslint-disable-next-line
   name: "oneMessage",
   props: {
      message: {
         type: Object
      },
      user_id: {
         type: Number
      },
      msgStyle: {
         type: String
      }
   },
   data() {
      return {
         userPhotoBaseUrl: `${protocol}${api_domain}/apiV0/photo/${this.user_id}`
      }
   },
   methods: {
      returnDate(date) {
         return dateToNumbers(date)
      }
   },
   mounted() {
      downloadImageUser.call(this, 'userAvatar');
   }
}
</script>

<style lang="less">
   .oneMessage {
      &-msg {
         width: fit-content;

         &-my {
            margin-left: auto;
         }
      }

      &-avatar {
         width: 30px;
         height: 30px;
         object-fit: cover;
         border-radius: 50%;
      }

      &-arrow {
         position: relative;
         z-index: 6;

         &-date {
            text-align: end;
            font-size: 10px;
            color: grey;
         }

         &::before {
            content: '';
            display: block;
            position: absolute;
            width: 15px;
            height: 15px;
            background: inherit;
            /* z-index: 0; */
            z-index: -1;
            right: -2px;
            transform: rotate(17deg);
         }

         &-right {
            position: relative;
            z-index: 6;

            &::before {
               content: '';
               display: block;
               position: absolute;
               width: 15px;
               height: 15px;
               background: inherit;
               /* z-index: 0; */
               z-index: -1;
               left: -2px;
               transform: rotate(-17deg);
            }
         }
      }
   }
</style>