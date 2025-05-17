<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'

const props = defineProps({
  src: {
    type: String,
  },
})
</script>

<template>
  <div class="promo">
    <div class="wrapper-info">
      <Text tag="h4" print="title" title="Скидка 25% на первый заказ любого товара на сумму от 50BYN" />
      <div>
      <Button kind="'btn'">Перейти к выбору товара</Button>
    </div>
    </div>
    <div>
      <img src="../assets/image/animal.png" alt="изображение животного">
    </div>
  </div>
</template>

<style lang="scss" scoped>

.promo {
  padding: 4px 23px 4px 23px;
  border-radius: 5px;
  background: var(--bg-surface-warning);
  display: flex;
  gap: 18px;
  align-items: center;
  max-width: 569px;
}

.wrapper-info {
  display: flex;
  flex-direction: column;
  gap: 17px;
}


</style>
