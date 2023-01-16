<template>
<div class="Task">
   <h2 class="h2 pb-16">
      {{ getConfig.title }}
   </h2>
   <p>
      {{ getConfig.desc }}
   </p>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   // eslint-disable-next-line
   name: "",
   computed: mapGetters(["getConfig"]) // лучше сразу использовать геттер, чтобы компонент рендерил с новым конфигом
}
</script>

<style lang="less" scoped>
.Task {

}
</style>