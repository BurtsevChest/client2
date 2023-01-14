<template>
   Настройки<br>
   Изменить цветовую тему<br>
   <button @click="changeColorTheme">Нажми меня</button>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "Settings",
   methods: {
      changeColorTheme() {
         const theme = document.documentElement;
         switch (theme.getAttribute('data-theme')) {
            case 'light':
               theme.setAttribute('data-theme', 'dark');
               break;
            case 'dark':
               theme.setAttribute('data-theme', 'light');
               break;
         }
      }
   }
}
</script>


<style scoped>


</style>