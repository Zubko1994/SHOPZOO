<!-- @format -->

<script setup lang="ts">

import Button from './Button.vue';
const props = defineProps<{
  list: string[]
}>()
</script>

<template>
  <div class="wrapper-quantity">
    <Button v-for="item in props.list" kind="quantity">
      {{ item }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>

.wrapper-quantity {
  display: flex;
  flex-direction: row;
  gap: 4px;
}


</style>
