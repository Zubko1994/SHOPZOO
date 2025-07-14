<script setup lang="ts">
import Button from './Button.vue'
</script>

<template>
  <div class="slider-wrapper">
    <div class="indicator-left">
  <img class="strela" src="../assets/svg/highlightPointer.svg" alt="указатель влево">
    <Button kind="slider">Предыдущая</Button>
    </div>
    <div class="indicator-number">
      <Button kind="slider-number">1</Button>
      <Button kind="slider-number">2</Button>
      <Button kind="slider-number">3</Button>
    </div>
    <div class="indicator-right">
      <Button kind="slider">Следующая</Button>
      <img class="strela" src="../assets/svg/highlightPointerRight.svg" alt="указатель вправо">
</div>

  </div>
</template>

<style lang="scss" scoped>

.indicator-left {
  display: flex;
  gap: 8px;
  align-items: baseline;
  text-wrap: nowrap;
  padding-left: 5px;
  cursor: pointer;
}

.strela {
  display: block ;
}

.indicator-number {
  display: flex;
  gap: 32px;
}

.indicator-right {
  display: flex;
  gap: 8px;
  align-items: baseline;
  text-wrap: nowrap;
  padding-right: 5px;
  cursor: pointer;
}

.slider-wrapper {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: baseline;
}

</style>
