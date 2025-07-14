<!-- @format -->

<script setup lang="ts">

import { ref } from 'vue'
import Text from './Text.vue'
import Article from './Article.vue'
import Button from './Button.vue'


interface Article  {
  id: number
  title: string
  text: string
  image: string
  date_create: string
  read_time: string
}

interface ArticleObj {
  count: number
  next: string | null
  previous: string | null
  results: Article[]
}

const dataArticle = ref<ArticleObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_articles_list/')
  .then(resp => resp.json())
  .then(data => dataArticle.value = data)


  const length = ref(3)

const lengthArray = () => {
  length.value = length.value + 3
}

const currentSliderIndex = ref(0); 

const nextSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value + 1) % length.value; 
   dataArticle.value?.results.push(dataArticle.value.results.shift())
   
    
}; 

const prevSlide = () => { 
    currentSliderIndex.value = (currentSliderIndex.value - 1 + length.value) % length.value; 
    dataArticle.value?.results.unshift(dataArticle.value?.results.pop())
}; 


</script>

<template>
  <section class="article-information">
    <div class="article-all_wrapper">
      <div class="container">
        <div class="article_ceil">
            <Text class="article_title" tag="h2" print="title" title="Полезные статьи" />
            <div class="wrapper_button">
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
      <div class="info_wrapper">
          <Article v-for="article in dataArticle?.results.slice(0, length)" :key="article.id" :image="article.image" :title="article.title" :text="article.text" :date_create="article.date_create" :read_time="article.read_time" />
        </div>
          <Button @click="lengthArray"  class="show-article" kind="primary">Читать больше статей</Button>
    </div>
      </div>
  </section>
</template>

<style lang="scss" scoped>

.article-information {
    background-color: var(--bg-default);
    padding: 56px 5px 56px 5px;
}

.show-article {
  display: block;
  margin: 0 auto;
}

.article_ceil {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
}

.wrapper_button {
//   margin: 0 auto;
  display: flex;
  gap: 10px;
  max-width: 221px;
  align-items: center;
  justify-content: center;
}

.button-strela {
  background-color: var(--white)
}

.info_wrapper {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 24px;

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

.article-information {
    padding: 24px 10px 33px 10px;
}

.wrapper_button {
  display: none;
}

.info_wrapper {
  overflow: scroll;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin-bottom: 16px;
}

.info_wrapper::-webkit-scrollbar {width:0px;} 
}


</style>
