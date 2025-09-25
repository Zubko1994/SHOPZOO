<!-- @format -->

<script setup lang="ts">
import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import Presentation from '../components/Presentation.vue'
import PromotionAll from '../components/PromotionAll.vue'
import PopularGoods from '../components/PopularGoods.vue'
import NewGoods from '../components/NewGoods.vue'
import BrendAll from '../components/BrendAll.vue'
import FeedbackAll from '../components/FeedbackAll.vue'
import ArticleAll from '../components/ArticleAll.vue'
import AboutZoo from '../components/AboutZoo.vue'
import Contacts from '../components/Contacts.vue'
import { useAnimalStore } from '../store/animalStore'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const animalStore = useAnimalStore()
const currentCategory = ref<number | null>(null)

// Функция для обработки обновления категории
const handleCategoryUpdate = (categoryId: number | null) => {
  currentCategory.value = categoryId
  console.log('Категория обновлена:', categoryId)

  if (categoryId) {
    animalStore.setSelectedAnimal(categoryId)
  }
  // Если выбрано животное, переходим в каталог
  if (categoryId) {
    router.push({
      path: '/catalog',
      query: { animal: categoryId.toString() }
    });
  }
}


// Обработка query параметров при загрузке
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const animalId = urlParams.get('animal');
  if (animalId) {
    currentCategory.value = parseInt(animalId);
  }
})

const searchQuery = ref('')
const emit = defineEmits(['searchProduct']);

const searchProduct = (query: string) => {
  searchQuery.value = query
  emit('searchProduct', searchQuery.value);
  console.log(searchQuery.value)
}


</script>

<template>
  <Layout @searchProduct="searchProduct" :searchQuery="searchQuery">
    <CardsAnimal @updateCategory="handleCategoryUpdate" :selectedCategory="currentCategory" />
    <Presentation />
    <PromotionAll />
    <PopularGoods />
    <NewGoods />
    <BrendAll />
    <FeedbackAll />
    <ArticleAll />
    <AboutZoo />
    <Contacts />
    
    


  </Layout>
</template>

<style lang="scss" scoped>
</style>
