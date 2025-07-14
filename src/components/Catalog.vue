<!-- @format -->

<script setup lang="ts">
import DropdownList from '../components/DropdownList.vue'
import Checkbox from '../components/Checkbox.vue'
import FilterAniml from '../components/FilterAniml.vue'
import BrendsNamesFiltersAll from '../components/BrendsNamesFiltersAll.vue'
import Button from './Button.vue'
import Text from './Text.vue'
import Card from './Card.vue'
import SliderPageCatalog from './SliderPageCatalog.vue'

import { ref } from 'vue'

interface Cards {
  id: number
  image_prev: string
  title: string
  price: number
  countitemproduct_set: string[]
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
  <section class="catalog">
    <div class="container">
      <div class="catalog__wrapper">
        <div class="catalog__info">
          <Text tag="h1" print="title_catalog" title="Каталог товаров" />
          <div class="wrapper-sort">
            <span class="name-sort">Сортировать по:</span><DropdownList />
          </div>
        </div>
        <div class="wrapper__goods">
          <div class="filters">
            <div class="goods__action">
              <Checkbox />
            </div>
            <FilterAniml />
            <BrendsNamesFiltersAll />
          </div>
          <div>
          <div class="wrapper-cards">
        <Card  v-for="(card, index) in dataCards?.results" :key="index" :image_prev="card.image_prev" :title="card.title" :price="card.price" :countitemproduct_set="card.countitemproduct_set"   />
      </div>
      <SliderPageCatalog/>
    </div>
          
          
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.catalog {
  background-color: var(--bg-default);
  padding: 0px 5px 56px 5px;
}

.catalog__info {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.name-sort {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: right;
}

.wrapper-sort {
  display: flex;
  gap: 9px;
  align-items: center;
}

.goods__action {
  padding: 18px 16px;
  background-color: var(--white);
  border-radius: 5px;
  max-width: 270px;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wrapper__goods {
  display: flex;
  gap: 15px;
}

.wrapper-cards {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  justify-content: space-between;
  overflow: hidden;
  transform: translateX(0);
}
</style>
