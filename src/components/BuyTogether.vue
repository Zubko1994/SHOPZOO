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

const currentSliderIndex = ref(0); 


console.log(dataCards)

const nextSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value + 1) % length.value; 
   dataCards.value?.results.push(dataCards.value.results.shift())
   console.log(dataCards.value?.results)
    
}; 

const prevSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value - 1 + length.value) % length.value; 
    dataCards.value?.results.unshift(dataCards.value?.results.pop())
}; 


</script>

<template>
  <section class="goods-popular">
    <div class="goods-popular_wrapper">
      <div class="container">
        <div class="goods-popular_ceil">
          <Text tag="h2" print="title" title="Вместе с этим товаром покупают" />
          <div class="wrapper-button">
            <Button @click = "prevSlide"  class="button-strela" kind="indicator-left"
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
          <Card  v-for="(card, index) in dataCards?.results.reverse().slice(0, length)" :key="index" :image_prev="card.image_prev" :title="card.title" :price="card.price" :countitemproduct_set="card.countitemproduct_set"  />
        </div>
        <Button class="show-goods" kind="primary"><RouterLink to="/catalog" class="link_button" :class="['item']"
          >Смотреть больше товаров</RouterLink></Button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.goods-popular_wrapper {
  padding: 4px 5px 20px 5px;
  background: var(--bg-default);
}

.link_button {
  color: var(--white);
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
  gap: 10px;
  flex-wrap: nowrap;
  margin-bottom: 25px;
  justify-content: center;
  // overflow: hidden;
  // transform: translateX(0);

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
