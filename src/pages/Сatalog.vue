<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import Catalog from '../components/Catalog.vue'
import PopularGoods from '../components/PopularGoods.vue'
import ArticleAll from '../components/ArticleAll.vue'
import { useAnimalStore } from '../store/animalStore.js'
import { ref, onMounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const isFiltersOpen = ref(false);
const selectedAnimalId = ref<number | null>(null);


const handleFiltersActive = (isActive: boolean) => {
  isFiltersOpen.value = isActive;
};

// Функция для обработки клика на крестик
const handleCrossClick = (isActive: boolean) => {
  isFiltersOpen.value = isActive;
};

// Обработка query параметров при загрузке
onMounted(() => {
  const animalParam = route.query.animal;
  if (animalParam) {
    selectedAnimalId.value = parseInt(animalParam as string);
  }
})

watch(() => route.query.animal, (newAnimalId) => {
  if (newAnimalId) {
    selectedAnimalId.value = parseInt(newAnimalId as string);
  } else {
    selectedAnimalId.value = null;
  }
});

onMounted(() => {
  const animalParam = route.query.animal;
  if (animalParam) {
    selectedAnimalId.value = parseInt(animalParam as string);
    const animalStore = useAnimalStore();
    animalStore.setSelectedAnimal(selectedAnimalId.value);
  }
})


// Обработка query параметров при загрузке
onMounted(() => {
  const animalParam = route.query.animal;
  if (animalParam) {
    selectedAnimalId.value = parseInt(animalParam as string);
    console.log('Animal ID from URL:', selectedAnimalId.value);
  }
})

// Следим за изменениями query параметров
watch(() => route.query.animal, (newAnimalId) => {
  if (newAnimalId) {
    selectedAnimalId.value = parseInt(newAnimalId as string);
  } else {
    selectedAnimalId.value = null;
  }
});

onMounted(() => {
  const animalParam = route.query.animal;
  console.log('Route query animal:', animalParam);
  if (animalParam) {
    selectedAnimalId.value = parseInt(animalParam as string);
    // Сохраняем в глобальное хранилище
    const animalStore = useAnimalStore();
    animalStore.setSelectedAnimal(selectedAnimalId.value);
    console.log('Animal ID from URL and saved to store:', selectedAnimalId.value);
  }
})

const searchQuery = ref('')
const emit = defineEmits(['searchProduct', 'selectProduct']);

const searchProduct = (query: string) => {
  searchQuery.value = query
  emit('searchProduct', searchQuery.value);
}



const selectProduct = (product: any) => {
  console.log('Product selected in App:', product);
  // Переход на страницу товара
  if (product && product.id) {
    router.push(`/productdescription/${product.id}`);
  }
}
</script>

<template>
 <Layout @searchProduct="searchProduct"  @selectProduct="selectProduct" :searchQuery="searchQuery" :isActive="isFiltersOpen"  @update:isActive="isFiltersOpen = $event"
 @crossClick="handleCrossClick">
  <Catalog :searchQuery="searchQuery" @searchProduct="searchProduct"  @selectProduct="selectProduct" @isActive="handleFiltersActive" :isFiltersOpen="isFiltersOpen" :selectedAnimalId="selectedAnimalId" />
  <PopularGoods/>
  <ArticleAll/>
  
 </Layout>
</template>

<style lang="scss" scoped>
</style>
