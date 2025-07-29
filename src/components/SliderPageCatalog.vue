<script setup lang="ts">
import Button from './Button.vue'

const emit = defineEmits(['page-two', 'page-three', 'page-one', 'page-four', 'page-five', 'page-six', 'page-seven', 'prev', 'next' ])


const sliderOne = () => {
  emit('page-one')
}

const sliderTwo = () => {
  emit('page-two')
}

const sliderThree = () => {
  emit('page-three')
}
const sliderFour = () => {
  emit('page-four')
}
const sliderFive = () => {
  emit('page-five')
}
const sliderSix = () => {
  emit('page-six')
}
const sliderSeven = () => {
  emit('page-seven')
}

const prevPage = () => {
  emit('prev')
}

const nextPage = () => {
  emit('next')
}


</script>

<template>
  <div class="slider-wrapper">
    <div class="indicator-left">
  <img class="strela" src="../assets/svg/highlightPointer.svg" alt="указатель влево">
    <Button kind="slider" @click="prevPage">Предыдущая</Button>
    </div>
    <div class="indicator-number">
      <Button kind="slider-number" @click="sliderOne">1</Button>
      <Button kind="slider-number" @click="sliderTwo">2</Button>
      <Button kind="slider-number" @click="sliderThree">3</Button>
      <Button kind="slider-number" @click="sliderFour">4</Button>
      <Button kind="slider-number" @click="sliderFive">5</Button>
      <Button kind="slider-number" @click="sliderSix">6</Button>
      <Button kind="slider-number" @click="sliderSeven">7</Button>
    </div>
    <div class="indicator-right">
      <Button kind="slider" @click="nextPage">Следующая</Button>
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
