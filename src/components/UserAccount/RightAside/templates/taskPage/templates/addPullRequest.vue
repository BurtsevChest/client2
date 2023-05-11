<template>
<div class="addPullRequest text-center pv-10 pb-10">
   <TextField class="mb-10" :placeholder="'Хранилище'"/>
   <TextField class="mb-10" :placeholder="'Ветка'"/>
   <button class="button">Добавить</button>
</div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "addPullRequest",

}
</script>

<style lang="less">
.addPullRequest {
   font-size: 14px;
   color: var(--text-color);
}
</style>