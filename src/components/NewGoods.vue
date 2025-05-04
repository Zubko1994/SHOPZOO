<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'
import Card from './Card.vue'
import { ref } from 'vue'

interface Cards {
  id: number
  image_prev: string
  title: string
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
  .then((resp) => resp.json())
  .then((data) => (dataCards.value = data))
</script>

<template>
  <section class="goods-new">
    <div class="goods-new_wrapper">
    <div class="container">
        <div class="goods-new_ceil">
          <Text tag="h2" print="title" title="Новинки" />
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
          <Card class="new-goods"
            v-for="card in dataCards?.results"
            :key="card.id"
            :image_prev="card.image_prev"
            :title="card.title"
            :price="card.price"
            :countitemproduct_set="card.countitemproduct_set"
          />
        </div>
        <Button class="show-goods" kind="primary">Смотреть больше товаров</Button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.goods-new_wrapper {
  padding: 24px 5px 24px 5px;
}

.goods-new_ceil {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.wrapper-button {
  display: flex;
  gap: 16px;
}

.button-strela {
  background: var(--bg-default);
}

.wrapper-cards {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.show-goods {
  display: block;
  margin: 0 auto;
}

.new-goods {
  background: var(--bg-default);
}
</style>
