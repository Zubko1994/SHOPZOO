<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import Catalog from '../components/Catalog.vue'
import PopularGoods from '../components/PopularGoods.vue'
import ArticleAll from '../components/ArticleAll.vue'
import { ref } from 'vue';

const isFiltersOpen = ref(false);

const handleFiltersActive = (isActive: boolean) => {
  isFiltersOpen.value = isActive;
};

// Функция для обработки клика на крестик
const handleCrossClick = (isActive: boolean) => {
  isFiltersOpen.value = isActive;
};

</script>

<template>
 <Layout :isActive="isFiltersOpen"  @update:isActive="isFiltersOpen = $event"
 @crossClick="handleCrossClick">
  <Catalog @isActive="handleFiltersActive" :isFiltersOpen="isFiltersOpen"/>
  <PopularGoods/>
  <ArticleAll/>
  
 </Layout>
</template>

<style lang="scss" scoped>
</style>
