<template>
   <div v-if="errorLoad" style="color: red;">
     {{ errorLoad }}
   </div>
   <component v-else :is="templateName" v-bind:options="options"/>
</template>

<script>

/**
 * Компонент для загрузки простых шаблонов с помощью пути до компонента.
 * Не предусматривает подписку на события контрола, но можно передавать опции.
 */

export default {
   // eslint-disable-next-line
   name: "control",
   props: {
      template: {
         type: String
      },
      options: {
         type: Object
      }
   },
   data() {
      return {
         templateName: '',
         errorLoad: true
      }
   },
   methods: {
      async loadTemplate() {
         const templateSrc = this.template.split('@/')[1];
         await import(`@/${templateSrc}`)
            .then((resolve) => {
               this.templateName = resolve.default;
               this.errorLoad = false
            })
            .catch((err) => {
               this.errorLoad = err
            })
      }
   },
   beforeMount() {
      this.loadTemplate()
   }
}
</script>
<style>
</style>