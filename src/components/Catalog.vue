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

// const dataCards = ref<CardsObj | null>(null)
// fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
//   .then((resp) => resp.json())
//   .then((data) => (dataCards.value = data))

const dataCardsOne = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsOne.value = data))

const dataCardsTwo = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=2'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsTwo.value = data))

const dataCardsThree = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=3'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsThree.value = data))

const dataCardsFour = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=4'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsFour.value = data))

const dataCardsFive = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=5'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsFive.value = data))

const dataCardsSix = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=6'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsSix.value = data))

const dataCardsSeven = ref<CardsObj | null>(null)
fetch(
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=7'
)
  .then((resp) => resp.json())
  .then((data) => (dataCardsSeven.value = data))

const pageNumber = ref(1)

const onePage = ref(true)
const twoPage = ref(false)
const threePage = ref(false)
const fourPage = ref(false)
const fivePage = ref(false)
const sixPage = ref(false)
const sevenPage = ref(false)

const showOne = () => {
  pageNumber.value == 1
  onePage.value = true
  twoPage.value = false
  threePage.value = false
  fourPage.value = false
  fivePage.value = false
  sixPage.value = false
  sevenPage.value = false
}

const showTwo = () => {
  pageNumber.value == 2
  onePage.value = false
  twoPage.value = true
  threePage.value = false
  fourPage.value = false
  fivePage.value = false
  sixPage.value = false
  sevenPage.value = false
}

const showThree = () => {
  pageNumber.value == 3
  onePage.value = false
  twoPage.value = false
  threePage.value = true
  fourPage.value = false
  fivePage.value = false
  sixPage.value = false
  sevenPage.value = false
}

const showFour = () => {
  pageNumber.value == 4
  onePage.value = false
  twoPage.value = false
  threePage.value = false
  fourPage.value = true
  fivePage.value = false
  sixPage.value = false
  sevenPage.value = false
}

const showFive = () => {
  pageNumber.value == 5
  onePage.value = false
  twoPage.value = false
  threePage.value = false
  fourPage.value = false
  fivePage.value = true
  sixPage.value = false
  sevenPage.value = false
}

const showSix = () => {
  pageNumber.value == 6
  onePage.value = false
  twoPage.value = false
  threePage.value = false
  fourPage.value = false
  fivePage.value = false
  sixPage.value = true
  sevenPage.value = false
}

const showSeven = () => {
  pageNumber.value == 7
  onePage.value = false
  twoPage.value = false
  threePage.value = false
  fourPage.value = false
  fivePage.value = false
  sixPage.value = false
  sevenPage.value = true
}

const showPrevPage = () => {
  pageNumber.value--
  if (pageNumber.value == 7) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = true
  } else if (pageNumber.value == 6) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = true
    sevenPage.value = false
  } else if (pageNumber.value == 5) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = true
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 4) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = true
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 3) {
    onePage.value = false
    twoPage.value = false
    threePage.value = true
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 2) {
    onePage.value = false
    twoPage.value = true
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 1) {
    onePage.value = true
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 0) {
    pageNumber.value = 7
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = true
  }
  console.log(pageNumber.value)
}

const showNextPage = () => {
  pageNumber.value++
  if (pageNumber.value == 7) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = true
  } else if (pageNumber.value == 6) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = true
    sevenPage.value = false
  } else if (pageNumber.value == 5) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = true
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 4) {
    onePage.value = false
    twoPage.value = false
    threePage.value = false
    fourPage.value = true
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 3) {
    onePage.value = false
    twoPage.value = false
    threePage.value = true
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 2) {
    onePage.value = false
    twoPage.value = true
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 1) {
    onePage.value = true
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  } else if (pageNumber.value == 8) {
    pageNumber.value = 1
    onePage.value = true
    twoPage.value = false
    threePage.value = false
    fourPage.value = false
    fivePage.value = false
    sixPage.value = false
    sevenPage.value = false
  }
  console.log(pageNumber.value)
}
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
              <Card
                v-if="onePage"
                v-for="(card, index) in dataCardsOne?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
              <Card
                v-if="twoPage"
                v-for="(card, index) in dataCardsTwo?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
              <Card
                v-if="threePage"
                v-for="(card, index) in dataCardsThree?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
              <Card
                v-if="fourPage"
                v-for="(card, index) in dataCardsFour?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
              <Card
                v-if="fivePage"
                v-for="(card, index) in dataCardsFive?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
              <Card
                v-if="sixPage"
                v-for="(card, index) in dataCardsSix?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
              <Card
                v-if="sevenPage"
                v-show="(pageNumber = 7)"
                v-for="(card, index) in dataCardsSeven?.results"
                :key="index"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set"
              />
            </div>
            <SliderPageCatalog
              @prev="showPrevPage"
              @next="showNextPage"
              @page-one="showOne"
              @page-two="showTwo"
              @page-three="showThree"
              @page-four="showFour"
              @page-five="showFive"
              @page-six="showSix"
              @page-seven="showSeven"
            />
          </div>
        </div>
      </div>
    </div>
    e
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
  justify-content: space-between;
}

.wrapper-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  justify-content: space-between;
  overflow: hidden;
  transform: translateX(0);
  height: 2050px;
}
</style>
