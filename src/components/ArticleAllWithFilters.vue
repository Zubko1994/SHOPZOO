<!-- @format -->

<script setup lang="ts">

import { ref, computed } from 'vue'
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
  animal: number
}

interface ArticleObj {
  count: number
  next: string | null
  previous: string | null
  results: Article[]
}

const props = defineProps<{
  selectedCategory?: number | null
}>()

const emit = defineEmits(['updateCategory'])

const length = ref(3)
const lengthArray = () => {
  length.value = length.value + 3
}


const dataArticle = ref<ArticleObj | null>(null)
  const allArticles = ref<Article[]>([])


fetch('https://oliver1ck.pythonanywhere.com/api/get_articles_list/')
  .then(resp => resp.json())
  .then(data => dataArticle.value = data)

  console.log(dataArticle.value?.results)


  const selectedCategory = ref<number | null>(null)
const updateCategory = (categoryId: number | null) => {
  selectedCategory.value = categoryId
  console.log(categoryId)
}


  const title = computed(() => {
  if(props.selectedCategory === 1) {
    console.log(props.selectedCategory)
   return ' о собаках'
  } else if(props.selectedCategory === 2) {
    return ' о кошках'
  } else if(props.selectedCategory === 3) {
    return ' о грызунах'
  } else if(props.selectedCategory === 4) {
    return ' о птицах'
  } else if(props.selectedCategory === 5) {
    return ' о рыбках'
  }
  }
  )

  const filteredCards = computed(() => {
if(!dataArticle.value) return[]

if(!props.selectedCategory) {
return dataArticle.value.results
} else {
return dataArticle.value?.results.filter(article => article.animal === props.selectedCategory).slice(0, length.value)
  }
  }
  

)

</script>

<template>
  <section class="article-information">
    <div class="article-all_wrapper">
      <div class="container">
        <div class="article_ceil">
            <Text class="article_title" tag="h2" print="article-title " kind="article-title" title="Полезные статьи">{{ title }}</Text>
      </div>
      <div class="info_wrapper">
          <Article v-for="article in filteredCards" :animal="article.animal" :key="article.id" :image="article.image" :title="article.title" :text="article.text" :date_create="article.date_create" :read_time="article.read_time" />
        </div>
        <div class="no-article" v-if="filteredCards.length == 0 && props.selectedCategory">
          <span>На данную тему статей нет</span>
        </div>
          <Button v-if="filteredCards.length > 0" @click="lengthArray"  class="show-article" kind="buying">Показать еще</Button>
    </div>
      </div>
  </section>
</template>

<style lang="scss" scoped>

.article-information {
    background-color: var(--bg-default);
    padding: 26px 5px 60px 5px;
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

.no-article {
  color: var(--text-default);
    font-family: 'SFProDisplay';
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: center;
    margin-bottom: 100px;
}

.wrapper_button {
//   margin: 0 auto;
  display: flex;
  gap: 10px;
  max-width: 221px;
  align-items: center;
  justify-content: center;
}

.article_title {
  margin-bottom: 40px;
}

.button-strela {
  background-color: var(--white)
}

.info_wrapper {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: flex-start;
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
  justify-content: center;
  margin-bottom: 16px;
}

.info_wrapper::-webkit-scrollbar {width:0px;} 
}

@media (max-width: 360px) {

  .show-article {
  width: 340px;
}


}


</style>
