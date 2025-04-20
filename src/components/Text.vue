<!-- @format -->

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    // default: 'Перейти к выбору товара',
  },
})
</script>

<template>
  <h3 :class="'title-card'">{{ title }}</h3>
</template>

<style lang="scss" scoped>


.title-card {
  font-family: 'SFProText';
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  color: var(--text-default);
}


</style>
