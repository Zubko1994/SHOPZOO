<script setup lang="ts">

import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'

const array = ['1 кг', '2 кг', '3 кг']
</script>

<template>
  <div :class="'card'">
    <ImageCard src="/src/assets/image/royalcaninKorm.png" />
    <Text title="Консервы ROYAL CANIN STERILISED для взрослых кастрированных котов.." />
    <Quantity :list="array" />
    <span>12 BYN</span> <Button title="" kind="basket-adding" />
    <Button kind="buying">Купить в 1 клик</Button>
  </div>
</template>

<style lang="scss" scoped>

.card {
  display: flex;
  flex-direction: column;
  gap: 11px;
  max-width: 270px;
}

</style>
