<!-- @format -->

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="logo">
    <RouterLink class="block" to="/">
    <img src="../assets/svg/logo.svg" alt="иконка логотипа" />
    <p class="logo-title">Территория ZOO</p>
  </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.block {
  display: flex;
  gap: 6px;
  text-wrap: nowrap;
  margin-right: 5px;
}
// .block {
//   display: block;
// }
.logo-title {
  font-family: 'SFProText';
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  text-transform: uppercase;
  color: var(--white);
  text-wrap: nowrap;
}


</style>
