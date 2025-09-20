<!-- @format -->

!
<script setup lang="ts">
import Text from '../components/Text.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  title: string
  text: string
  image: string
  date_create: string
  read_time: string
}>()

const route = useRoute()
const article = ref({
  id: 0,
  title: '',
  text: '',
  image: '',
  date_create: '',
  read_time: ''
})


onMounted(() => {
  // Получаем данные из localStorage
  const storedArticle = localStorage.getItem('currentArticle')
  if (storedArticle) {
    article.value = JSON.parse(storedArticle)
  }
  
  // Очищаем localStorage после использования
  localStorage.removeItem('currentArticle')
})

const formattedDate = computed(() => {
  return article.value.date_create.slice(0, 10)
})





</script>

<template>
  <section class="article">
    <div class="article__wrapper">
      <div class="container">
        <Text
          tag="h2"
          print="article-title"
          :title="article.title"
          class="article__title"
        />
        <div class="wrapper_info">
          <div class="time">
            <img src="../assets/svg/clock_minor.svg" alt="часы" />
            <Text
              tag="p"
              print="article_indicator"
              :title="`Время чтения: ${article.read_time}`"
            ></Text>
          </div>
          <div class="date">
            <img src="../assets/svg/calendar_minor.svg" alt="календарь" />
            <Text tag="p" print="article_indicator" :title="formattedDate" />
          </div>
        </div>
          <img class="article__image" :src="article.image" alt="изображение в статье">
          <div 
          class="article-subtitle" 
          v-html="article.text"
        ></div>
        </div>
      </div>
    
  </section>
</template>

<style lang="scss" scoped>

.article {
  background-color: var(--bg-default);
  padding: 24px 5px 76px 5px;
}

.article__title {
  max-width: 771px;
  text-align: left;
  margin-bottom: 24px;
}

.wrapper_info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.time,
.date {
  display: flex;
  align-items: center;
  gap: 6px;
}

.article__image {
  width: 100%;
 height: auto;
  
  display: block;
  margin: 0 auto;
  background-color: var(--bg-default);
mix-blend-mode: multiply;
margin-bottom: 32px;
}

.article-subtitle {
  max-width: 770px;
  margin: 0 auto;
  color: var(--text-default);
    font-family: 'SFProText';
    font-size: 20px;
    font-weight: 400;
    line-height: 145%;
    letter-spacing: 0px;
    text-align: left;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.article__title {
  margin-top: 24px;
  margin-bottom: 12px;
}

.wrapper_info {
  margin-bottom: 24px;
}

.article {
  padding: 16px 5px 48px 5px;
}


}


</style>
