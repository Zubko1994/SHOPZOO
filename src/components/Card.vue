<!-- @format -->

<script setup lang="ts">
import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'

const props = defineProps({

  img: {
    type: String,
  },
  title: {
    type: String,
  },
  quantity: {
    type: Array,
  },
  price: {
    type: Number,
  },

})

const dataCard = [
  {
    id: 1,
    img: "/src/assets/image/royalCaninkonserv .png",
    title: "Консервы ROYAL CANIN STERILISED для взрослых кастрированных котов..FRESH STEP CAT LITTER CLAY EXTREME – Фреш Степ наполнитель..",
    quantity: ['85 г.'],
    price: '12',
  },

  {
    id: 2,
    img: "/src/assets/image/freshStepCat.png",
    title: "FRESH STEP CAT LITTER CLAY EXTREME – Фреш Степ наполнитель..",
    quantity: ['6 л.', '12 л.', '18 л.', '30 л.'],
    price: '95',
  },

  {
    id: 3,
    img: "/src/assets/image/furminatorHair.png",
    title: "FURMINATOR SHORT HAIR LARGE CAT M/L Фурминатор для короткошерстных кошек..",
    quantity: ['1 шт.'],
    price: '95',
  },

  {
    id: 4,
    img: "/src/assets/image/royalcaninKorm.png",
    title: "Сухой корм ROYAL CANIN STERILISED 37 для взрослых кастрированных котов и..",
    quantity: ['0,2 кг.', '0,4 кг.', '1,2 кг.', '2 кг.', '4 кг.', '10 кг.', 'Задать вес'],
    price: '5',
  },
]

const array = ['85 г.']

</script>

<template>
  <div :class="'card'">
    <div class="wrapper-image">
      <ImageCard src="/src/assets/image/royalCaninkonserv .png" />
    </div>
    <div class="wrapper-title">
      <Text title="Консервы ROYAL CANIN STERILISED для взрослых кастрированных котов.." />
    </div>
    <div class="wrapper-quantity">
      <Quantity :list="array" />
    </div>
    <div class="cost-info">
      <span class="cost">12 BYN</span> <Button title="" kind="basket-adding" />
    </div>
    <Button kind="buying">Купить в 1 клик</Button>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 11px;
  max-width: 270px;
  padding: 8px;
}

.wrapper-image {
  margin-bottom: 5px;
}

.wrapper-title {
  margin-bottom: 10px;
}

.wrapper-quantity {
  margin-bottom: 10px;
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
</style>
