<template>
   <div class="AddTask flex">
      <div class="flex-col-6">
         Исполнитель
      </div>
      <div class="flex-col-6 flex">
         <div>
            Срок
         </div>
         <input type="text" class="AddTask-date-input ml-8">
         <PopupBtn :hideBtn=true>
            <template v-slot:popupBtn>
               <div class="flex a-items-center">
                  <span class="material-icons pl-8">calendar_month</span>
               </div>
            </template>
            <template v-slot:popupTemplate>
               <v-date-picker :locale="locale" mode="date" v-model="date1"  @dayclick="setDate"/>
            </template>
         </PopupBtn>
      </div>
      <div class="flex-col-12 pb-8">
         <p>
            Задача
         </p>
         <input type="text " class="AddTask-task-title-input flex-col-12 ph-4 pv-4">
      </div>
   </div>
</template>

<script>
import { getLocale } from '@/lang/lang'

export default {
   // eslint-disable-next-line
   name: "AddTask",
   data() {
      return {
         date1: new Date(),
         locale: getLocale()
      }
   }
}
</script>

<style lang="less">
.AddTask {
   &-date {
      &-input {
         width: inherit;
         border-bottom: 1px solid rgba(128, 128, 128, 0.2);

         &:hover,&:focus {
            border-bottom: 1px solid rgba(128, 128, 128, 0.8);
         }
      }
   }

   &-task-title {
      &-input {
         width: inherit;
         border-bottom: 1px solid rgba(128, 128, 128, 0.2);

         &:hover,&:focus {
            border-bottom: 1px solid rgba(128, 128, 128, 0.8);
         }
      }
   }
}
</style>