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

  const length = ref(4)

const lengthArray = () => {
  length.value = length.value + 4
}

const currentSliderIndex = ref(0); 

const nextSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value + 1) % length.value; 
   dataCards.value?.results.push(dataCards.value.results.shift())
   
    
}; 

const prevSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value - 1 + length.value) % length.value; 
    dataCards.value?.results.unshift(dataCards.value?.results.pop())
}; 



</script>

<template>
  <section class="goods-new">
    <div class="goods-new_wrapper">
    <div class="container">
        <div class="goods-new_ceil">
          <Text tag="h2" print="title" title="Ранее вы смотрели" />
          <div class="wrapper-button">
            <Button @click = "prevSlide" class="button-strela" kind="indicator-left"
              ><img
                class="strela"
                src="../assets/image/Primaryfillleft.svg"
                alt="стрелка влево"
            /></Button>
            <Button @click="nextSlide" class="button-strela" kind="indicator-right"
              ><img
                class="strela"
                src="../assets/image/Primaryfill.svg"
                alt="стрелка вправо"
            /></Button>
          </div>
        </div>
        <div class="wrapper-cards">
          <Card class="new-goods"
            v-for="card in dataCards?.results.slice(0, length)"
            :key="card.id"
            :image_prev="card.image_prev"
            :title="card.title"
            :price="card.price"
            :countitemproduct_set="card.countitemproduct_set"
          />
        </div>
        <Button class="show-goods" kind="primary"><RouterLink to="/catalog" class="link_button" :class="['item']"
          >Смотреть больше товаров</RouterLink></Button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.goods-new {
  background-color: var(--bg-default);
}
.goods-new_wrapper {
  padding: 24px 5px 24px 5px;
}

.link_button {
  color: var(--white);
}

.button-strela {
  background-color: var(--white);
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
  gap: 10px;
  flex-wrap: nowrap;
  margin-bottom: 25px;
  justify-content: center;
}

.show-goods {
  display: block;
  margin: 0 auto;
}

.new-goods {
  background: var(--bg-default);
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


.wrapper-button {
  display: none;
}

.wrapper-cards {
overflow: scroll;
flex-wrap: nowrap;
justify-content: flex-start;
}

.wrapper-cards::-webkit-scrollbar {width:0px;}

.new-goods {
  background: var(--white);
}

.goods-new_wrapper {
  background: var(--bg-default);
  padding: 0px 10px 33px 10px
}
}
</style>
