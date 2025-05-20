<!-- @format -->

<script setup lang="ts">
import Button from './Button.vue'
import Text from './Text.vue'
import Card from './Card.vue'
import { ref } from 'vue'

interface Cards {
  id: number
  image_prev: string
  title: string
  // countitemproduct_set: QuantityObj[]
  price: number
}

interface CardsObj {
  count: number
  next: string | null
  previous: string | null
  results: Cards[]
}

const dataCards = ref<CardsObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
  .then(resp => resp.json())
  .then(data => dataCards.value = data)

const length = ref(4)

const lengthArray = () => {
  length.value = length.value + 4
}



</script>

<template>
  <section class="goods-popular">
    <div class="goods-popular_wrapper">
      <div class="container">
        <div class="goods-popular_ceil">
          <Text tag="h2" print="title" title="Популярные товары" />
          <div class="wrapper-button">
            <Button class="button-strela" kind="indicator-left"
              ><img
                class="strela"
                src="../assets/image/Primaryfillleft.svg"
                alt="стрелка влево"
            /></Button>
            <Button class="button-strela" kind="indicator-right"
              ><img
                class="strela"
                src="../assets/image/Primaryfill.svg"
                alt="стрелка вправо"
            /></Button>
          </div>
        </div>
        <div class="wrapper-cards">
          <Card  v-for="(card, index) in dataCards?.results.slice(0, length)" :key="index" :image_prev="card.image_prev" :title="card.title" :price="card.price" :countitemproduct_set="card.countitemproduct_set"  />
        </div>
        <Button @click="lengthArray" class="show-goods" kind="primary">Смотреть больше товаров</Button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.goods-popular_wrapper {
  padding: 4px 5px 56px 5px;
  background: var(--bg-default);
}

.goods-popular_ceil {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.wrapper-button {
  display: flex;
  gap: 16px;
}

.wrapper-cards {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 25px;
  justify-content: center;
  

}

.show-goods {
  display: block;
  margin: 0 auto;
}

.button-strela {
  background-color: var(--white);
  &:hover{
    .strela {
  filter: brightness(0) invert(1);
}
  }
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.goods-popular_wrapper {
  padding: 1px 10px 32px 10px;
}

.wrapper-button {
  display: none;
}

.wrapper-cards {
overflow: scroll;
flex-wrap: nowrap;
justify-content: flex-start;
}


.wrapper-cards::-webkit-scrollbar {width:0px;}
}
</style>
