<!-- @format -->

<script setup lang="ts">
import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'

const props = defineProps<{
image_prev: string
title: string
countitemproduct_set: string[]
price: number
}>()

</script>

<template>
  <div :class="'card'">
    <div class="wrapper-ceil">
      <ImageCard class="image-good" :src="props.image_prev" />
      <div class="wrapper-title">
        <Text tag="h3" print="title" :title="props.title"/>
      </div>
    </div>
    <div class="wrapper-quantity">
      <Quantity :list="props.countitemproduct_set || []" />
    </div>
    <div class="wrapper-basket">
    <div class="cost-info">
      <span class="cost">{{price}} BYN</span> <Button title="" kind="basket-adding" />
    </div>
      <Button kind="buying">Купить в 1 клик</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  max-width: 270px;
  padding: 8px;
  background-color: var(--white);
}

.image-good {
  text-align: center;
}

// .wrapper-image {
//   margin-bottom: 5px;
// }

// .wrapper-title {
//   margin-bottom: 10px;
// }

.wrapper-quantity {
  // margin-bottom: 10px;
  align-items: center;
}

.cost-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.cost {
  display: block;
  font-family: 'SFProText';
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
  color: var(--text-default);
}

.wrapper-basket {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.wrapper-ceil {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
