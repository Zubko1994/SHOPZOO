<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'

</script>

<template>
  <section class="promotion">
    <div class="promotion-wrapper">
      <div class="container">
        <div class="wrapper-cards">
          <div class="promo item-left">
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
  <div class="promo item-right">
    <div class="wrapper-info">
      <Text tag="h4" print="title" title="Получите игрушку в подарок при сумме заказа от 200BYN" />
      <div>
      <Button kind="'btn'">Перейти к выбору товара</Button>
    </div>
    </div>
    <div>
      <img src="../assets/image/catGrey.png" alt="изображение животного">
    </div>
  </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.promotion-wrapper {
  background: var(--bg-default);
  padding: 56px 5px 56px 5px;
}

.wrapper-cards {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

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

.item-right {
  background: var(--bg-surface-success);
}


</style>
