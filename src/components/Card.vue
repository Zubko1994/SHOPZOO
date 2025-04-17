<script setup lang="ts">

import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'

const array = ['1 кг', '2 кг', '3 кг']
</script>

<template>
  <div :class="'card'">
    <ImageCard src="/src/assets/image/royalcaninKorm.png" />
    <Text title="Консервы ROYAL CANIN STERILISED для взрослых кастрированных котов.." />
    <Quantity :list="array" />
  </div>
</template>

<style lang="scss" scoped>

.card {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

</style>
