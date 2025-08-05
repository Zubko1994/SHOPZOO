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
      <Text class="promotion_title" tag="h4" print="title" title="Скидка 25% на первый заказ любого товара на сумму от 50BYN" />
      <div>
        <Button kind="'btn'"><RouterLink to="/catalog" class="link_button" :class="['item']"
          >Перейти к выбору товара</RouterLink></Button>
    </div>
    </div>
    <div>
      <img class="animal" src="../assets/image/animal.png" alt="изображение животного">
    </div>
  </div>
  <div class="promo item-right">
    <div class="wrapper-info">
      <Text class="promotion_title" tag="h4" print="title" title="Получите игрушку в подарок при сумме заказа от 200BYN" />
      <div>
        <Button kind="'btn'"><RouterLink to="/catalog" class="link_button" :class="['item']"
          >Перейти к выбору товара</RouterLink></Button>
    </div>
    </div>
    <div>
      <img class="animal" src="../assets/image/catGrey.png" alt="изображение животного">
    </div>
  </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.link_button {
  color: var(--text-default);
}
.promotion-wrapper {
  background: var(--bg-default);
  padding: 56px 5px 56px 5px;
}

.wrapper-cards {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.promo {
  padding: 4px 23px 4px 23px;
  border-radius: 5px;
  background: var(--bg-surface-warning);
  display: flex;
  gap: 18px;
  align-items: center;
  max-width: 569px;
  justify-content: center;
}

.wrapper-info {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.item-right {
  background: var(--bg-surface-success);
}


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.promotion-wrapper {
  padding: 33px 10px 32px 10px;
}


}

@media (max-width: 576px) {

.container {
    max-width: 576px;
}

.item-right, .item-left {
  width: 100%;
}

.promotion_title {
  font-size: 15px;
}

.promo {
  padding: 8px;
  gap: 2px;
}

.wrapper-info {
  max-width: 215px;
}
.animal {
  width: 116px;
  height: 114px;
}
}




</style>
