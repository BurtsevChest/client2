<template>
   <div class="Tasks flex flex-column">
      <button class="Tasks-addTask-btn flex flex-center a-items-center mb-16">
         <span class="material-icons Tasks-addTask-btn-icon">add</span>
      </button>
      <div class="Tasks-itemsWrapper">
         <div class="flex flex-column">
            <div v-for="item in tasks" v-bind:key="item.id" class="flex-col flex-col-8">
               <div @click="open" class="Tasks-item greyBlock">
                  <h2 class="Tasks-item-title">{{ item.title }}</h2>
                  <p class="Tasks-item-desc">{{ item.desc }}</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// import Tasks from '@/components/service/task/index.js';
import {mapMutations} from 'vuex'

export default {
   // eslint-disable-next-line
   name: "",
   data() {
      return {
         tasks: [
            {
               id: '1',
               title: 'task 1',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '2',
               title: 'task 2',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '3',
               title: 'task 3',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '4',
               title: 'task 4',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '1',
               title: 'task 1',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '2',
               title: 'task 2',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '3',
               title: 'task 3',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '4',
               title: 'task 4',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '1',
               title: 'task 1',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '2',
               title: 'task 2',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '3',
               title: 'task 3',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '4',
               title: 'task 4',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '1',
               title: 'task 1',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '2',
               title: 'task 2',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '3',
               title: 'task 3',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '4',
               title: 'task 4',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '1',
               title: 'task 1',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '2',
               title: 'task 2',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '3',
               title: 'task 3',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            },
            {
               id: '4',
               title: 'task 4',
               desc: 'descrwefjweofiwejoiewjewj weoijweoif wefjwe wiejfweoifj ergu rge herogner erghero erog erg eg  eogei erhgoe oerighe oerhergorgherou rh'
            }
         ],
         params: {
            userId: '2'
         }
      }
   },
   methods: {
      ...mapMutations(['open']),
   }
}
</script>


<style lang="less" scoped>
.Tasks {
   &-addTask-btn {
      color: var(--text-block-hover);
      cursor: pointer;
      width: 40px;
      height: 40px;
      background: rgba(128, 128, 128, 0.3);
      border-radius: 50%;

      &-icon {
         font-size: 30px;
      }
   }

   &-itemsWrapper {
      overflow: hidden;
      overflow-y: scroll;
      height: 100vh;
   }

   &-item {
      &-title {
         font-size: 25px;
      }

      &-desc {
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
      }
   }
}
</style>